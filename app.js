/* KeksSwap – single-file app.js
   - Paths:
     logo:   logos/keks-logo.png
     banks:  logos/banks/*.png
     crypto: logos/crypto/*.png
   - Rate source: WhiteBIT Public HTTP API v4 ticker
   - Update: every 30s
   - Lock: 3 minutes (180s) after any change of pair/amount
*/

const state = {
  lang: "UA",
  tab: "exchange",

  // selection ids
  giveId: "USDT_TRC20",
  getId: "mono_uah",

  // rates
  lastRatesAt: 0,
  base: {
    USDT_UAH: null,   // UAH per 1 USDT
    BTC_USDT: null,
    ETH_USDT: null,
    LTC_USDT: null,
    SOL_USDT: null,
    TON_USDT: null,
    TRX_USDT: null,
    USDC_USDT: null
  },

  // lock
  lockUntil: 0,
  lockRate: null,  // final applied rate for current pair (give->get) including spread
  lockTimer: null,
  refreshTimer: null
};

const ASSETS = [
  // BANKS (UAH)
  { id:"privat_uah", type:"bank", code:"UAH", label:"PrivatBank (UAH)", icon:"logos/banks/privat.png", sub:"UAH" },
  { id:"mono_uah",   type:"bank", code:"UAH", label:"Monobank (UAH)",   icon:"logos/banks/mono.png",   sub:"UAH" },
  { id:"oschad_uah", type:"bank", code:"UAH", label:"Oschadbank (UAH)", icon:"logos/banks/oschad.png", sub:"UAH" },
  { id:"pumb_uah",   type:"bank", code:"UAH", label:"PUMB (UAH)",       icon:"logos/banks/pumb.png",   sub:"UAH" },
  { id:"abank_uah",  type:"bank", code:"UAH", label:"A-Bank (UAH)",     icon:"logos/banks/a-bank.png",sub:"UAH" },
  { id:"otp_uah",    type:"bank", code:"UAH", label:"OTP (UAH)",        icon:"logos/banks/otp.png",    sub:"UAH" },
  { id:"izi_uah",    type:"bank", code:"UAH", label:"IziBank (UAH)",    icon:"logos/banks/izi.png",    sub:"UAH" },
  { id:"sense_uah",  type:"bank", code:"UAH", label:"Sense (UAH)",      icon:"logos/banks/sense.png",  sub:"UAH" },
  { id:"ukrsib_uah", type:"bank", code:"UAH", label:"UkrSib (UAH)",     icon:"logos/banks/ukr-sib.png",sub:"UAH" },
  { id:"ukrbanki_uah", type:"bank", code:"UAH", label:"UkrBanki (UAH)", icon:"logos/banks/ukr-banki.png", sub:"UAH" },
  { id:"visa_master_uah", type:"bank", code:"UAH", label:"Visa/Master (UAH)", icon:"logos/banks/visa-master.png", sub:"UAH" },

  // CRYPTO (без wallets)
  { id:"BTC", type:"crypto", code:"BTC", label:"Bitcoin (BTC)", icon:"logos/crypto/btc.png", sub:"BTC" },
  { id:"ETH", type:"crypto", code:"ETH", label:"Ethereum (ETH)", icon:"logos/crypto/eth.png", sub:"ETH" },
  { id:"LTC", type:"crypto", code:"LTC", label:"Litecoin (LTC)", icon:"logos/crypto/ltc.png", sub:"LTC" },
  { id:"SOL", type:"crypto", code:"SOL", label:"Solana (SOL)", icon:"logos/crypto/sol.png", sub:"SOL" },
  { id:"TON", type:"crypto", code:"TON", label:"Toncoin (TON)", icon:"logos/crypto/ton.png", sub:"TON" },
  { id:"TRX", type:"crypto", code:"TRX", label:"TRON (TRX)", icon:"logos/crypto/trx.png", sub:"TRX" },

  // USDT networks
  { id:"USDT_TRC20", type:"crypto", code:"USDT", label:"USDT (TRC20)", icon:"logos/crypto/tether-usdt.png", sub:"USDT • TRC20" },
  { id:"USDT_ERC20", type:"crypto", code:"USDT", label:"USDT (ERC20)", icon:"logos/crypto/tether-usdt.png", sub:"USDT • ERC20" },
  { id:"USDT_BEP20", type:"crypto", code:"USDT", label:"USDT (BEP20)", icon:"logos/crypto/tether-usdt.png", sub:"USDT • BEP20" },
  { id:"USDT_POL",   type:"crypto", code:"USDT", label:"USDT (POL)",   icon:"logos/crypto/usdt-pol.png", sub:"USDT • Polygon" },
  { id:"USDT_ARB",   type:"crypto", code:"USDT", label:"USDT (ARB)",   icon:"logos/crypto/usdt-arb.png", sub:"USDT • Arbitrum" },
  { id:"USDT_SOL",   type:"crypto", code:"USDT", label:"USDT (SOL)",   icon:"logos/crypto/usdt-sol.png", sub:"USDT • Solana" },

  // USDC networks
  { id:"USDC_ETH", type:"crypto", code:"USDC", label:"USDC (ETH)", icon:"logos/crypto/usdc-eth.png", sub:"USDC • Ethereum" },
  { id:"USDC_SOL", type:"crypto", code:"USDC", label:"USDC (SOL)", icon:"logos/crypto/usdc-sol.png", sub:"USDC • Solana" },
  { id:"USDC_POL", type:"crypto", code:"USDC", label:"USDC (POL)", icon:"logos/crypto/usdc-pol.png", sub:"USDC • Polygon" }
];

const $ = (id) => document.getElementById(id);

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

  picker: $("picker"),
  pickerOverlay: $("pickerOverlay"),
  pickerClose: $("pickerClose"),
  pickerTitle: $("pickerTitle"),
  pickerSearch: $("pickerSearch"),
  pickerList: $("pickerList"),

  langBtn: $("langBtn"),
  langLabel: $("langLabel"),
  langMenu: $("langMenu")
};

let pickerContext = null; // "give" | "get"

function assetById(id){
  return ASSETS.find(a => a.id === id) || null;
}

/* ---------- Tabs ---------- */
ui.tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    ui.tabs.forEach(b=>b.classList.remove("isActive"));
    btn.classList.add("isActive");
    const tab = btn.dataset.tab;
    Object.keys(ui.views).forEach(k => ui.views[k].classList.toggle("hidden", k !== tab));
    state.tab = tab;
  });
});

/* ---------- Language (one button) ---------- */
ui.langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  ui.langMenu.classList.toggle("hidden");
});
document.addEventListener("click", () => ui.langMenu.classList.add("hidden"));
ui.langMenu.addEventListener("click", (e) => {
  const b = e.target.closest(".langItem");
  if(!b) return;
  state.lang = b.dataset.lang;
  ui.langLabel.textContent = state.lang;
  ui.langMenu.classList.add("hidden");
});

/* ---------- Picker modal (без глюков закрытия) ---------- */
function openPicker(title, context){
  pickerContext = context;
  ui.pickerTitle.textContent = title;
  ui.picker.classList.remove("hidden");
  ui.pickerSearch.value = "";
  renderPickerList("");
  ui.pickerSearch.focus({preventScroll:true});
  document.addEventListener("keydown", onEscClose);
}
function closePicker(){
  ui.picker.classList.add("hidden");
  pickerContext = null;
  document.removeEventListener("keydown", onEscClose);
}
function onEscClose(e){
  if(e.key === "Escape") closePicker();
}

ui.pickerOverlay.addEventListener("click", closePicker);
ui.pickerClose.addEventListener("click", closePicker);

function renderPickerList(q){
  const query = (q || "").trim().toLowerCase();
  const items = ASSETS.filter(a => {
    if(!query) return true;
    return a.label.toLowerCase().includes(query) || a.code.toLowerCase().includes(query);
  });

  ui.pickerList.innerHTML = "";
  for(const it of items){
    const row = document.createElement("button");
    row.type = "button";
    row.className = "item";
    row.dataset.id = it.id;

    const left = document.createElement("div");
    left.className = "itemLeft";

    const img = document.createElement("img");
    img.className = "icon";
    img.src = it.icon;
    img.alt = it.label;

    const txt = document.createElement("div");
    txt.style.minWidth = "0";

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = it.label;

    const sub = document.createElement("div");
    sub.className = "sub";
    sub.textContent = it.sub || it.code;

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = it.type === "bank" ? "Bank" : "Crypto";

    row.appendChild(left);
    row.appendChild(badge);

    row.addEventListener("click", () => {
      if(pickerContext === "give") state.giveId = it.id;
      if(pickerContext === "get") state.getId = it.id;
      applySelectionsToUI();
      startLock();       // фиксация курса на 3 мин
      recalc();
      closePicker();
    });

    ui.pickerList.appendChild(row);
  }
}

ui.pickerSearch.addEventListener("input", () => renderPickerList(ui.pickerSearch.value));

ui.giveSelectBtn.addEventListener("click", () => openPicker("Виберіть що віддаєте", "give"));
ui.getSelectBtn.addEventListener("click", () => openPicker("Виберіть що отримуєте", "get"));

/* ---------- Swap ---------- */
ui.swapBtn.addEventListener("click", () => {
  const tmp = state.giveId;
  state.giveId = state.getId;
  state.getId = tmp;
  applySelectionsToUI();
  startLock();
  recalc();
});

/* ---------- Input ---------- */
ui.giveAmount.addEventListener("input", () => {
  startLock();
  recalc();
});

/* ---------- UI selection render ---------- */
function applySelectionsToUI(){
  const give = assetById(state.giveId);
  const get = assetById(state.getId);

  if(give){
    ui.giveIcon.src = give.icon;
    ui.giveName.textContent = give.label;
    ui.giveSub.textContent = give.sub || give.code;
  }
  if(get){
    ui.getIcon.src = get.icon;
    ui.getName.textContent = get.label;
    ui.getSub.textContent = get.sub || get.code;
  }
}

/* ---------- WhiteBIT rates ---------- */
/*
  Public HTTP API V4:
  Base URL: https://whitebit.com/api/v4/public/{endpoint}
  We'll use /ticker and read needed markets.
*/
async function fetchWhitebitTicker(){
  const url = "https://whitebit.com/api/v4/public/ticker";
  const r = await fetch(url, { method:"GET" });
  if(!r.ok) throw new Error("Ticker HTTP " + r.status);
  return await r.json();
}

function pickMarket(tickerObj, nameCandidates){
  for(const n of nameCandidates){
    if(tickerObj && tickerObj[n] && tickerObj[n].last_price) return Number(tickerObj[n].last_price);
  }
  return null;
}

async function refreshRates(){
  ui.rateStatus.textContent = "Оновлюємо курс…";
  try{
    const t = await fetchWhitebitTicker();

    // base USDT/UAH
    const usdtUah = pickMarket(t, ["USDT_UAH","UAH_USDT"]); // обычно USDT_UAH
    if(!usdtUah) throw new Error("No USDT_UAH market in ticker");

    // majors vs USDT (fallbacks included)
    const btcUsdt  = pickMarket(t, ["BTC_USDT","USDT_BTC"]);
    const ethUsdt  = pickMarket(t, ["ETH_USDT","USDT_ETH"]);
    const ltcUsdt  = pickMarket(t, ["LTC_USDT","USDT_LTC"]);
    const solUsdt  = pickMarket(t, ["SOL_USDT","USDT_SOL"]);
    const tonUsdt  = pickMarket(t, ["TON_USDT","USDT_TON"]);
    const trxUsdt  = pickMarket(t, ["TRX_USDT","USDT_TRX"]);
    const usdcUsdt = pickMarket(t, ["USDC_USDT","USDT_USDC"]);

    // normalize reverse markets if needed (if USDT_BTC then BTC_USDT = 1/USDT_BTC)
    state.base.USDT_UAH = usdtUah;

    state.base.BTC_USDT = btcUsdt ? (t["BTC_USDT"] ? btcUsdt : 1 / btcUsdt) : null;
    state.base.ETH_USDT = ethUsdt ? (t["ETH_USDT"] ? ethUsdt : 1 / ethUsdt) : null;
    state.base.LTC_USDT = ltcUsdt ? (t["LTC_USDT"] ? ltcUsdt : 1 / ltcUsdt) : null;
    state.base.SOL_USDT = solUsdt ? (t["SOL_USDT"] ? solUsdt : 1 / solUsdt) : null;
    state.base.TON_USDT = tonUsdt ? (t["TON_USDT"] ? tonUsdt : 1 / tonUsdt) : null;
    state.base.TRX_USDT = trxUsdt ? (t["TRX_USDT"] ? trxUsdt : 1 / trxUsdt) : null;
    state.base.USDC_USDT = usdcUsdt ? (t["USDC_USDT"] ? usdcUsdt : 1 / usdcUsdt) : 1; // если нет — считаем ~1

    state.lastRatesAt = Date.now();
    ui.rateStatus.textContent = "WhiteBIT • оновлення кожні 30с";
    ui.rateHint.textContent = "";

    // если нет lock — пересчитать сразу
    if(!isLocked()){
      recalc();
    }
  }catch(err){
    ui.rateStatus.textContent = "Курс недоступний — перевіряємо джерела";
    ui.rateHint.textContent = String(err.message || err);
  }
}

/* ---------- Spread model (плавающая) ---------- */
/*
  Цель: быть "топ", значит минимальная маржа на больших суммах.
  - Если эквивалент > 29000 грн: маржа 0.25%
  - Иначе: 0.65%
*/
function spreadForUAHEquiv(uah){
  if(!isFinite(uah) || uah <= 0) return 0.0065;
  return (uah >= 29000) ? 0.0025 : 0.0065;
}

/* ---------- Convert helper ---------- */
function toNumberSafe(v){
  const s = String(v || "").replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function isLocked(){
  return state.lockUntil && Date.now() < state.lockUntil && state.lockRate !== null;
}

function startLock(){
  // Fix only when rates are known
  const baseOk = state.base.USDT_UAH !== null;
  if(!baseOk) return;

  state.lockUntil = Date.now() + 180000;
  state.lockRate = null; // will be computed on recalc with current base & spread
  updateLockUI();
  if(state.lockTimer) clearInterval(state.lockTimer);
  state.lockTimer = setInterval(updateLockUI, 250);
}

function updateLockUI(){
  const now = Date.now();
  const leftMs = Math.max(0, state.lockUntil - now);
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
    // when unlock -> recalc by fresh base
    recalc();
  }
}

function midRate(fromCode, toCode){
  // returns "to per 1 from"
  const U = state.base.USDT_UAH;
  if(U === null) return null;

  if(fromCode === toCode) return 1;

  // UAH <-> USDT
  if(fromCode === "USDT" && toCode === "UAH") return U;
  if(fromCode === "UAH" && toCode === "USDT") return 1 / U;

  // USDC ~ USDT
  if(fromCode === "USDC" && toCode === "USDT") return state.base.USDC_USDT ?? 1;
  if(fromCode === "USDT" && toCode === "USDC") return 1 / (state.base.USDC_USDT ?? 1);

  // crypto -> USDT
  const map = {
    BTC: state.base.BTC_USDT,
    ETH: state.base.ETH_USDT,
    LTC: state.base.LTC_USDT,
    SOL: state.base.SOL_USDT,
    TON: state.base.TON_USDT,
    TRX: state.base.TRX_USDT
  };
  if(map[fromCode] && toCode === "USDT") return map[fromCode];
  if(map[toCode] && fromCode === "USDT") return 1 / map[toCode];

  // crypto -> UAH via USDT
  if(map[fromCode] && toCode === "UAH") return map[fromCode] * U;
  if(map[toCode] && fromCode === "UAH") return 1 / (map[toCode] * U);

  // crypto <-> crypto via USDT
  if(map[fromCode] && map[toCode]) return map[fromCode] / map[toCode];

  // USDC -> UAH via USDT
  if(fromCode === "USDC" && toCode === "UAH") return (state.base.USDC_USDT ?? 1) * U;
  if(fromCode === "UAH" && toCode === "USDC") return 1 / ((state.base.USDC_USDT ?? 1) * U);

  // USDC -> crypto via USDT
  if(fromCode === "USDC" && map[toCode]) return (state.base.USDC_USDT ?? 1) / map[toCode];
  if(map[fromCode] && toCode === "USDC") return map[fromCode] / (state.base.USDC_USDT ?? 1);

  return null;
}

function recalc(){
  const give = assetById(state.giveId);
  const get  = assetById(state.getId);
  if(!give || !get){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    return;
  }

  const giveAmount = toNumberSafe(ui.giveAmount.value);
  if(!(giveAmount > 0)){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    return;
  }

  const baseRate = midRate(give.code, get.code);
  if(baseRate === null || !isFinite(baseRate)){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    ui.rateHint.textContent = "Курс недоступний — перевіряємо джерела";
    return;
  }

  // Determine UAH equivalent for spread decision
  let uahEquiv = null;
  // if user gives UAH directly
  if(give.code === "UAH"){
    uahEquiv = giveAmount;
  }else{
    // convert give -> UAH
    const rToUAH = midRate(give.code, "UAH");
    uahEquiv = rToUAH ? giveAmount * rToUAH : null;
  }

  const spread = spreadForUAHEquiv(uahEquiv);

  // Final customer rate (we take spread)
  // If user gives A and gets B: they receive a bit less => multiply by (1 - spread)
  const finalRate = baseRate * (1 - spread);

  // Lock logic: once locked, keep finalRate stable until lock ends
  let appliedRate = finalRate;
  if(isLocked()){
    if(state.lockRate === null){
      state.lockRate = finalRate;
    }
    appliedRate = state.lockRate;
  }else{
    state.lockRate = null;
  }

  const result = giveAmount * appliedRate;

  ui.resultValue.textContent = formatNumber(result, get.code);
  ui.rateLine.textContent = `Курс: 1 ${give.code} ≈ ${formatPlain(appliedRate)} ${get.code}`;

  // hint about spread tier
  if(uahEquiv && uahEquiv >= 29000){
    ui.rateHint.textContent = "Велика сума: кращий курс (мінімальна маржа)";
  }else{
    ui.rateHint.textContent = "";
  }
}

function formatPlain(n){
  if(!isFinite(n)) return "—";
  // adapt decimals by magnitude
  const abs = Math.abs(n);
  if(abs >= 1000) return n.toFixed(2);
  if(abs >= 1) return n.toFixed(4);
  return n.toFixed(8);
}

function formatNumber(n, code){
  if(!isFinite(n)) return "—";
  if(code === "UAH") return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if(code === "USDT" || code === "USDC") return n.toFixed(2);
  return n.toFixed(6);
}

/* ---------- Create order (stub) ---------- */
ui.createBtn.addEventListener("click", () => {
  const give = assetById(state.giveId);
  const get  = assetById(state.getId);
  alert(
    `Заявка (демо)\n\nВіддаєте: ${give.label}\nСума: ${ui.giveAmount.value}\nОтримуєте: ${get.label}\n\n(Далі підключимо бек/бота)`
  );
});

/* ---------- Init ---------- */
function initDefaults(){
  // default selections (как на твоем скрине: USDT -> Monobank)
  state.giveId = "USDT_TRC20";
  state.getId  = "mono_uah";
  applySelectionsToUI();
  ui.giveAmount.value = "1000";
  recalc();
}

function startAutoRefresh(){
  refreshRates();
  if(state.refreshTimer) clearInterval(state.refreshTimer);
  state.refreshTimer = setInterval(refreshRates, 30000);
}

// Start
initDefaults();
startAutoRefresh();
