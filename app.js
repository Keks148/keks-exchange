const state = {
  lang: "UA",
  tab: "exchange",

  give: { asset: "USDT", type:"crypto", network:"TRC20" },
  get:  { asset: "mono_uah", type:"bank",  network:null },

  base: { USDT_UAH: null },
  lastRatesAt: 0,

  lockUntil: 0,
  lockRate: null,
  lockTimer: null,
  refreshTimer: null
};

const $ = (id)=>document.getElementById(id);

const ui = {
  tabs: [...document.querySelectorAll(".tab")],
  views: {
    exchange: $("view-exchange"),
    rules: $("view-rules"),
    faq: $("view-faq"),
    account: $("view-account"),
  },

  rateStatus: $("rateStatus"),
  rateLine: $("rateLine"),
  rateHint: $("rateHint"),
  lockPill: $("rateLockPill"),
  lockCountdown: $("lockCountdown"),

  giveSelectBtn: $("giveSelectBtn"),
  getSelectBtn: $("getSelectBtn"),
  giveIcon: $("giveIcon"),
  giveName: $("giveName"),
  giveSub: $("giveSub"),
  getIcon: $("getIcon"),
  getName: $("getName"),
  getSub: $("getSub"),
  giveAmount: $("giveAmount"),
  swapBtn: $("swapBtn"),
  resultValue: $("resultValue"),
  createBtn: $("createBtn"),

  giveNetBtn: $("giveNetBtn"),
  getNetBtn: $("getNetBtn"),
  giveNetLabel: $("giveNetLabel"),
  getNetLabel: $("getNetLabel"),

  picker: $("picker"),
  pickerOverlay: $("pickerOverlay"),
  pickerClose: $("pickerClose"),
  pickerTitle: $("pickerTitle"),
  pickerSearch: $("pickerSearch"),
  pickerList: $("pickerList"),

  netPicker: $("netPicker"),
  netOverlay: $("netOverlay"),
  netClose: $("netClose"),
  netTitle: $("netTitle"),
  netList: $("netList"),

  langBtn: $("langBtn"),
  langLabel: $("langLabel"),
  langMenu: $("langMenu")
};

/* -------------------- DATA -------------------- */
/* Крипта одна строка, сети отдельно (полный список как есть) */
const CRYPTO = [
  { asset:"BTC", name:"Bitcoin", icon:"logos/crypto/btc.png", networks:["BTC"] },
  { asset:"ETH", name:"Ethereum", icon:"logos/crypto/eth.png", networks:["ERC20","BEP20","ARB","OP","POL"] },
  { asset:"USDT", name:"Tether (USDT)", icon:"logos/crypto/tether-usdt.png", networks:["TRC20","ERC20","BEP20","ARB","POL","SOL"] },
  { asset:"USDC", name:"USD Coin (USDC)", icon:"logos/crypto/usdc-eth.png", networks:["ERC20","POL","ARB","SOL"] },
  { asset:"TRX", name:"TRON", icon:"logos/crypto/trx.png", networks:["TRC20"] },
  { asset:"LTC", name:"Litecoin", icon:"logos/crypto/ltc.png", networks:["LTC"] },
  { asset:"SOL", name:"Solana", icon:"logos/crypto/sol.png", networks:["SOL"] },
  { asset:"TON", name:"Toncoin", icon:"logos/crypto/ton.png", networks:["TON"] },
];

const BANKS = [
  { asset:"privat_uah", name:"PrivatBank", icon:"logos/banks/privat.png" },
  { asset:"mono_uah",   name:"Monobank",   icon:"logos/banks/mono.png" },
  { asset:"oschad_uah", name:"Oschadbank", icon:"logos/banks/oschad.png" },
  { asset:"pumb_uah",   name:"PUMB",       icon:"logos/banks/pumb.png" },
  { asset:"abank_uah",  name:"A-Bank",     icon:"logos/banks/a-bank.png" },
  { asset:"otp_uah",    name:"OTP",        icon:"logos/banks/otp.png" },
  { asset:"izi_uah",    name:"IziBank",    icon:"logos/banks/izi.png" },
  { asset:"sense_uah",  name:"Sense",      icon:"logos/banks/sense.png" },
  { asset:"ukrsib_uah", name:"UkrSib",     icon:"logos/banks/ukr-sib.png" },
  { asset:"ukrbanki_uah", name:"UkrBanki", icon:"logos/banks/ukr-banki.png" },
  { asset:"visa_master_uah", name:"Visa/Master", icon:"logos/banks/visa-master.png" },
];

function findCrypto(asset){ return CRYPTO.find(x=>x.asset===asset) || null; }
function findBank(asset){ return BANKS.find(x=>x.asset===asset) || null; }

function codeOf(sel){
  if(sel.type==="bank") return "UAH";
  return sel.asset; // crypto ticker
}

/* -------------------- UI: tabs -------------------- */
ui.tabs.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    ui.tabs.forEach(b=>b.classList.remove("isActive"));
    btn.classList.add("isActive");
    const tab = btn.dataset.tab;
    Object.keys(ui.views).forEach(k=>ui.views[k].classList.toggle("hidden", k!==tab));
    state.tab = tab;
  });
});

/* -------------------- Language -------------------- */
ui.langBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  ui.langMenu.classList.toggle("hidden");
});
document.addEventListener("click", ()=>ui.langMenu.classList.add("hidden"));
ui.langMenu.addEventListener("click", (e)=>{
  const b = e.target.closest(".langItem");
  if(!b) return;
  state.lang = b.dataset.lang;
  ui.langLabel.textContent = state.lang;
  ui.langMenu.classList.add("hidden");
});

/* -------------------- Pickers -------------------- */
let pickerContext = null; // "give"|"get"

function openPicker(title, ctx){
  pickerContext = ctx;
  ui.pickerTitle.textContent = title;
  ui.picker.classList.remove("hidden");
  ui.pickerSearch.value = "";
  renderPicker("");
  ui.pickerSearch.focus({preventScroll:true});
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onEscAsset);
}
function closePicker(){
  ui.picker.classList.add("hidden");
  pickerContext = null;
  ui.pickerSearch.value = "";
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onEscAsset);
}
function onEscAsset(e){ if(e.key==="Escape") closePicker(); }

ui.pickerOverlay.addEventListener("click", closePicker);
ui.pickerClose.addEventListener("click", closePicker);
ui.pickerSearch.addEventListener("input", ()=>renderPicker(ui.pickerSearch.value));

function renderPicker(q){
  const query = (q||"").trim().toLowerCase();
  // список: крипта + банки
  const items = [
    ...CRYPTO.map(c=>({ kind:"crypto", ...c })),
    ...BANKS.map(b=>({ kind:"bank", ...b })),
  ].filter(it=>{
    if(!query) return true;
    return (it.name||"").toLowerCase().includes(query) || (it.asset||"").toLowerCase().includes(query);
  });

  ui.pickerList.innerHTML = "";
  items.forEach(it=>{
    const row = document.createElement("button");
    row.type="button";
    row.className="item";
    row.dataset.kind = it.kind;
    row.dataset.asset = it.asset;

    const left = document.createElement("div");
    left.className="itemLeft";

    const img = document.createElement("img");
    img.className="icon";
    img.src = it.icon;
    img.alt = it.name;

    const txt = document.createElement("div");
    txt.style.minWidth = "0";

    const name = document.createElement("div");
    name.className="name";
    name.textContent = it.kind==="bank" ? `${it.name} (UAH)` : it.name;

    const sub = document.createElement("div");
    sub.className="sub";
    sub.textContent = it.kind==="bank" ? "UAH" : it.asset;

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);
    row.appendChild(left);

    row.addEventListener("click", ()=>{
      if(pickerContext==="give"){
        if(it.kind==="bank"){
          state.give = { asset: it.asset, type:"bank", network:null };
        }else{
          // crypto: default network first
          state.give = { asset: it.asset, type:"crypto", network: it.networks?.[0] || null };
        }
      }else{
        if(it.kind==="bank"){
          state.get = { asset: it.asset, type:"bank", network:null };
        }else{
          state.get = { asset: it.asset, type:"crypto", network: it.networks?.[0] || null };
        }
      }
      applySelectionsToUI();
      startLock();
      recalc();
      closePicker();
    });

    ui.pickerList.appendChild(row);
  });
}

ui.giveSelectBtn.addEventListener("click", ()=>openPicker("Виберіть що віддаєте", "give"));
ui.getSelectBtn.addEventListener("click", ()=>openPicker("Виберіть що отримуєте", "get"));

/* --- Networks picker --- */
let netContext = null; // "give"|"get"

function openNetPicker(ctx){
  netContext = ctx;
  const sel = (ctx==="give") ? state.give : state.get;
  if(sel.type!=="crypto") return;

  const c = findCrypto(sel.asset);
  const nets = c?.networks || [];
  if(nets.length <= 1) return;

  ui.netTitle.textContent = "Network";
  ui.netPicker.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onEscNet);

  ui.netList.innerHTML = "";
  nets.forEach(n=>{
    const row = document.createElement("button");
    row.type="button";
    row.className="item";
    const left = document.createElement("div");
    left.className="itemLeft";

    const img = document.createElement("div");
    img.className="icon";
    img.style.display="flex";
    img.style.alignItems="center";
    img.style.justifyContent="center";
    img.style.fontWeight="950";
    img.style.fontSize="12px";
    img.textContent = n;

    const txt = document.createElement("div");
    txt.style.minWidth="0";
    const name = document.createElement("div");
    name.className="name";
    name.textContent = n;
    const sub = document.createElement("div");
    sub.className="sub";
    sub.textContent = `${sel.asset} network`;
    txt.appendChild(name); txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);
    row.appendChild(left);

    row.addEventListener("click", ()=>{
      if(netContext==="give") state.give.network = n;
      if(netContext==="get")  state.get.network  = n;
      applySelectionsToUI();
      startLock();
      recalc();
      closeNetPicker();
    });

    ui.netList.appendChild(row);
  });
}

function closeNetPicker(){
  ui.netPicker.classList.add("hidden");
  netContext = null;
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onEscNet);
}
function onEscNet(e){ if(e.key==="Escape") closeNetPicker(); }

ui.netOverlay.addEventListener("click", closeNetPicker);
ui.netClose.addEventListener("click", closeNetPicker);
ui.giveNetBtn.addEventListener("click", ()=>openNetPicker("give"));
ui.getNetBtn.addEventListener("click", ()=>openNetPicker("get"));

/* -------------------- Swap -------------------- */
ui.swapBtn.addEventListener("click", ()=>{
  const tmp = state.give;
  state.give = state.get;
  state.get = tmp;
  applySelectionsToUI();
  startLock();
  recalc();
});

/* -------------------- Input -------------------- */
ui.giveAmount.addEventListener("input", ()=>{
  startLock();
  recalc();
});

/* -------------------- WhiteBIT rate -------------------- */
async function fetchWhitebitTicker(){
  const url = "https://whitebit.com/api/v4/public/ticker";
  const r = await fetch(url, { method:"GET" });
  if(!r.ok) throw new Error("Ticker HTTP " + r.status);
  return await r.json();
}

function pickMarket(obj, candidates){
  for(const m of candidates){
    if(obj?.[m]?.last_price) return Number(obj[m].last_price);
  }
  return null;
}

async function refreshRates(){
  ui.rateStatus.textContent = "Оновлюємо курс…";
  try{
    const t = await fetchWhitebitTicker();
    const usdtUah = pickMarket(t, ["USDT_UAH","UAH_USDT"]);
    if(!usdtUah) throw new Error("No USDT_UAH market");
    // normalize if reversed
    state.base.USDT_UAH = t["USDT_UAH"] ? usdtUah : (1/usdtUah);
    state.lastRatesAt = Date.now();
    ui.rateStatus.textContent = "WhiteBIT • оновлення кожні 30с";
    ui.rateHint.textContent = "";
    if(!isLocked()) recalc();
  }catch(e){
    ui.rateStatus.textContent = "Курс недоступний (WhiteBIT)";
    ui.rateHint.textContent = String(e?.message || e);
  }
}

/* -------------------- Spread model -------------------- */
function toNumberSafe(v){
  const s = String(v||"").replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}
function spreadForUAH(uah){
  if(!isFinite(uah) || uah<=0) return 0.0065;
  return (uah >= 29000) ? 0.0025 : 0.0065;
}

/* -------------------- Lock 3 minutes -------------------- */
function isLocked(){
  return state.lockUntil && Date.now() < state.lockUntil && state.lockRate !== null;
}
function startLock(){
  if(state.base.USDT_UAH === null) return;
  state.lockUntil = Date.now() + 180000;
  state.lockRate = null;
  updateLockUI();
  if(state.lockTimer) clearInterval(state.lockTimer);
  state.lockTimer = setInterval(updateLockUI, 250);
}
function updateLockUI(){
  const leftMs = Math.max(0, state.lockUntil - Date.now());
  const leftS = Math.ceil(leftMs/1000);
  if(leftS > 0 && state.lockUntil){
    ui.lockPill.hidden = false;
    ui.lockCountdown.textContent = leftS + "s";
  }else{
    ui.lockPill.hidden = true;
    state.lockUntil = 0;
    state.lockRate = null;
    if(state.lockTimer){
      clearInterval(state.lockTimer);
      state.lockTimer = null;
    }
    recalc();
  }
}

/* -------------------- Render selection & nets -------------------- */
function applySelectionsToUI(){
  // give
  if(state.give.type==="bank"){
    const b = findBank(state.give.asset);
    ui.giveIcon.src = b?.icon || "";
    ui.giveName.textContent = b ? `${b.name} (UAH)` : "—";
    ui.giveSub.textContent = "UAH";
    ui.giveNetBtn.classList.add("hidden");
    state.give.network = null;
  }else{
    const c = findCrypto(state.give.asset);
    ui.giveIcon.src = c?.icon || "";
    ui.giveName.textContent = c ? c.name : "—";
    ui.giveSub.textContent = c ? c.asset : "—";
    const nets = c?.networks || [];
    if(nets.length > 1){
      ui.giveNetBtn.classList.remove("hidden");
      ui.giveNetLabel.textContent = state.give.network || nets[0];
    }else{
      ui.giveNetBtn.classList.add("hidden");
      state.give.network = nets[0] || null;
    }
  }

  // get
  if(state.get.type==="bank"){
    const b = findBank(state.get.asset);
    ui.getIcon.src = b?.icon || "";
    ui.getName.textContent = b ? `${b.name} (UAH)` : "—";
    ui.getSub.textContent = "UAH";
    ui.getNetBtn.classList.add("hidden");
    state.get.network = null;
  }else{
    const c = findCrypto(state.get.asset);
    ui.getIcon.src = c?.icon || "";
    ui.getName.textContent = c ? c.name : "—";
    ui.getSub.textContent = c ? c.asset : "—";
    const nets = c?.networks || [];
    if(nets.length > 1){
      ui.getNetBtn.classList.remove("hidden");
      ui.getNetLabel.textContent = state.get.network || nets[0];
    }else{
      ui.getNetBtn.classList.add("hidden");
      state.get.network = nets[0] || null;
    }
  }
}

/* -------------------- Calculate (пока считаем по USDT_UAH) -------------------- */
function recalc(){
  const giveAmount = toNumberSafe(ui.giveAmount.value);
  if(!(giveAmount > 0)){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    return;
  }
  if(state.base.USDT_UAH === null){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    return;
  }

  // Сейчас делаем основу: USDT <-> UAH (для других монет позже добавим кросс через USDT)
  const giveCode = codeOf(state.give);
  const getCode  = codeOf(state.get);

  let baseRate = null; // get per 1 give
  if(giveCode==="USDT" && getCode==="UAH") baseRate = state.base.USDT_UAH;
  if(giveCode==="UAH" && getCode==="USDT") baseRate = 1/state.base.USDT_UAH;

  // если выбрали другие монеты — пока выводим подсказку (чтобы не ломалось)
  if(baseRate === null){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    ui.rateHint.textContent = "Поки що авто-курс тільки для USDT⇄UAH. Інші пари додамо наступним кроком.";
    return;
  }

  // UAH эквивалент для спреда
  const uahEquiv = (giveCode==="UAH") ? giveAmount : (giveAmount * state.base.USDT_UAH);
  const spread = spreadForUAH(uahEquiv);

  const finalRate = baseRate * (1 - spread);

  let applied = finalRate;
  if(state.lockUntil && Date.now() < state.lockUntil){
    if(state.lockRate === null) state.lockRate = finalRate;
    applied = state.lockRate;
  }else{
    state.lockRate = null;
  }

  const result = giveAmount * applied;

  ui.resultValue.textContent = formatNumber(result, getCode);
  ui.rateLine.textContent = `Курс: 1 ${giveCode} ≈ ${formatPlain(applied)} ${getCode}`;
  ui.rateHint.textContent = (uahEquiv >= 29000) ? "Велика сума: кращий курс" : "";
}

function formatPlain(n){
  if(!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if(abs >= 1000) return n.toFixed(2);
  if(abs >= 1) return n.toFixed(4);
  return n.toFixed(8);
}
function formatNumber(n, code){
  if(!isFinite(n)) return "—";
  if(code==="UAH") return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return n.toFixed(2);
}

/* -------------------- Create order (stub) -------------------- */
ui.createBtn.addEventListener("click", ()=>{
  startLock();
  alert("Заявка створена (демо). Далі підключимо бек/бота.");
});

/* -------------------- Init -------------------- */
function startAutoRefresh(){
  refreshRates();
  if(state.refreshTimer) clearInterval(state.refreshTimer);
  state.refreshTimer = setInterval(refreshRates, 30000);
}

function init(){
  // defaults
  state.give = { asset:"USDT", type:"crypto", network:"TRC20" };
  state.get  = { asset:"mono_uah", type:"bank",  network:null };
  ui.giveAmount.value = "1000";
  applySelectionsToUI();
  recalc();
  startAutoRefresh();
}

init();
