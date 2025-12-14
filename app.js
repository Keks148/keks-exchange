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

  // i18n targets
  tabExchange: $("tab-exchange"),
  tabRules: $("tab-rules"),
  tabFaq: $("tab-faq"),
  tabAccount: $("tab-account"),
  lblGive: $("lbl-give"),
  lblGet: $("lbl-get"),
  lblYouGet: $("lbl-youget"),
  btnCreate: $("createBtn"),
  rulesTitle: $("rules-title"),
  rule1: $("rule-1"),
  rule2: $("rule-2"),
  rule3: $("rule-3"),
  rule4: $("rule-4"),
  faqText: $("faq-text"),
  accTitle: $("acc-title"),
  accText: $("acc-text"),
  btnLogin: $("btn-login"),
  btnReg: $("btn-reg"),
  lockText: $("lockText"),

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
  giveNetIcon: $("giveNetIcon"),
  getNetIcon: $("getNetIcon"),

  picker: $("picker"),
  pickerOverlay: $("pickerOverlay"),
  pickerClose: $("pickerClose"),
  pickerTitle: $("pickerTitle"),
  pickerList: $("pickerList"),

  netPicker: $("netPicker"),
  netOverlay: $("netOverlay"),
  netClose: $("netClose"),
  netTitle: $("netTitle"),
  netList: $("netList"),

  langBtn: $("langBtn"),
  langLabel: $("langLabel"),
  langPop: $("langPop")
};

/* ---------- i18n ---------- */
const I18N = {
  UA: {
    tabs: { exchange:"Обмін", rules:"Правила", faq:"FAQ", account:"Акаунт" },
    give:"Віддаєте",
    get:"Отримуєте",
    youGet:"Ви отримаєте",
    create:"Створити заявку",
    lock:"Курс зафіксовано",
    rulesTitle:"Правила обміну",
    rule1:"<b>Час обробки:</b> до <b>40 хвилин</b>.",
    rule2:"У рідкісних випадках — до <b>72 годин</b> (залежить від банків/мереж).",
    rule3:"<b>Курс фіксується</b> після натискання “Створити заявку” на <b>3 хвилини</b>.",
    rule4:"Вказуйте коректний Telegram для зв’язку та правильні реквізити.",
    faq:"Пізніше додамо питання/відповіді.",
    accTitle:"Акаунт",
    accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти",
    reg:"Реєстрація",
    pickGive:"Виберіть що віддаєте",
    pickGet:"Виберіть що отримуєте",
    netTitle:"Мережа",
    rateLoading:"Оновлюємо курс…",
    rateOk:"WhiteBIT • оновлення кожні 30с",
    rateFail:"Курс недоступний (WhiteBIT)"
  },
  EN: {
    tabs: { exchange:"Exchange", rules:"Rules", faq:"FAQ", account:"Account" },
    give:"You give",
    get:"You get",
    youGet:"You will receive",
    create:"Create request",
    lock:"Rate locked",
    rulesTitle:"Exchange rules",
    rule1:"<b>Processing time:</b> up to <b>40 minutes</b>.",
    rule2:"In rare cases — up to <b>72 hours</b> (depends on banks/networks).",
    rule3:"<b>Rate is locked</b> after “Create request” for <b>3 minutes</b>.",
    rule4:"Provide correct Telegram contact and valid details.",
    faq:"FAQ will be added later.",
    accTitle:"Account",
    accText:"Login/registration and KYC will be here (not connected yet).",
    login:"Login",
    reg:"Register",
    pickGive:"Select what you give",
    pickGet:"Select what you get",
    netTitle:"Network",
    rateLoading:"Updating rate…",
    rateOk:"WhiteBIT • refresh every 30s",
    rateFail:"Rate unavailable (WhiteBIT)"
  },
  PL: {
    tabs: { exchange:"Wymiana", rules:"Zasady", faq:"FAQ", account:"Konto" },
    give:"Oddajesz",
    get:"Otrzymujesz",
    youGet:"Otrzymasz",
    create:"Utwórz zlecenie",
    lock:"Kurs zablokowany",
    rulesTitle:"Zasady wymiany",
    rule1:"<b>Czas realizacji:</b> do <b>40 minut</b>.",
    rule2:"W rzadkich przypadkach — do <b>72 godzin</b> (zależy od banków/sieci).",
    rule3:"<b>Kurs blokuje się</b> po “Utwórz zlecenie” na <b>3 minuty</b>.",
    rule4:"Podaj poprawny Telegram i prawidłowe dane.",
    faq:"FAQ dodamy później.",
    accTitle:"Konto",
    accText:"Tu będzie logowanie/rejestracja i KYC (jeszcze nie podłączone).",
    login:"Zaloguj",
    reg:"Rejestracja",
    pickGive:"Wybierz co oddajesz",
    pickGet:"Wybierz co otrzymujesz",
    netTitle:"Sieć",
    rateLoading:"Aktualizacja kursu…",
    rateOk:"WhiteBIT • odświeżanie co 30s",
    rateFail:"Kurs niedostępny (WhiteBIT)"
  }
};

function t(){ return I18N[state.lang] || I18N.UA; }

function applyI18n(){
  const tr = t();
  ui.tabExchange.textContent = tr.tabs.exchange;
  ui.tabRules.textContent = tr.tabs.rules;
  ui.tabFaq.textContent = tr.tabs.faq;
  ui.tabAccount.textContent = tr.tabs.account;

  ui.lblGive.textContent = tr.give;
  ui.lblGet.textContent = tr.get;
  ui.lblYouGet.textContent = tr.youGet;
  ui.btnCreate.textContent = tr.create;
  ui.lockText.textContent = tr.lock;

  ui.rulesTitle.textContent = tr.rulesTitle;
  ui.rule1.innerHTML = tr.rule1;
  ui.rule2.innerHTML = tr.rule2;
  ui.rule3.innerHTML = tr.rule3;
  ui.rule4.innerHTML = tr.rule4;

  ui.faqText.textContent = tr.faq;
  ui.accTitle.textContent = tr.accTitle;
  ui.accText.textContent = tr.accText;
  ui.btnLogin.textContent = tr.login;
  ui.btnReg.textContent = tr.reg;

  // Titles for pickers will be set on open
}

/* -------------------- DATA -------------------- */
const CRYPTO = [
  { asset:"BTC", name:"Bitcoin", icon:"logos/crypto/btc.png", networks:["BTC"] },
  { asset:"ETH", name:"Ethereum", icon:"logos/crypto/eth.png", networks:["ERC20","BEP20","ARB","OP","POL"] },
  { asset:"USDT", name:"Tether (USDT)", icon:"logos/crypto/tether-usdt.png", networks:["TRC20","ERC20","BEP20","ARB","OP","POL","SOL"] },
  { asset:"USDC", name:"USD Coin (USDC)", icon:"logos/crypto/usdc.png", networks:["ERC20","POL","ARB","SOL"] },
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
  { asset:"visa_master_uah", name:"Visa/Master", icon:"logos/banks/visa-master.png" },
];

function findCrypto(asset){ return CRYPTO.find(x=>x.asset===asset) || null; }
function findBank(asset){ return BANKS.find(x=>x.asset===asset) || null; }

function codeOf(sel){
  if(sel.type==="bank") return "UAH";
  return sel.asset;
}

function netIconPath(net){
  const n = String(net||"").toLowerCase();
  return `logos/networks/${n}.png`;
}

/* -------------------- Tabs -------------------- */
ui.tabs.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    ui.tabs.forEach(b=>b.classList.remove("isActive"));
    btn.classList.add("isActive");
    const tab = btn.dataset.tab;
    Object.keys(ui.views).forEach(k=>ui.views[k].classList.toggle("hidden", k!==tab));
    state.tab = tab;
  });
});

/* -------------------- Language (compact) -------------------- */
ui.langBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  ui.langPop.classList.toggle("hidden");
});
document.addEventListener("click", ()=>ui.langPop.classList.add("hidden"));
ui.langPop.addEventListener("click", (e)=>{
  const b = e.target.closest(".langChip");
  if(!b) return;
  state.lang = b.dataset.lang;
  ui.langLabel.textContent = state.lang;
  ui.langPop.classList.add("hidden");
  applyI18n();
});

/* -------------------- Pickers (NO SEARCH) -------------------- */
let pickerContext = null; // "give"|"get"

function openPicker(ctx){
  pickerContext = ctx;
  ui.pickerTitle.textContent = (ctx==="give") ? t().pickGive : t().pickGet;
  ui.picker.classList.remove("hidden");
  renderPicker();
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onEscAsset);
}
function closePicker(){
  ui.picker.classList.add("hidden");
  pickerContext = null;
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onEscAsset);
}
function onEscAsset(e){ if(e.key==="Escape") closePicker(); }

ui.pickerOverlay.addEventListener("click", closePicker);
ui.pickerClose.addEventListener("click", closePicker);

function addSectionTitle(text){
  const h = document.createElement("div");
  h.className = "sectionTitle";
  h.textContent = text;
  ui.pickerList.appendChild(h);
}

function renderPicker(){
  ui.pickerList.innerHTML = "";

  addSectionTitle("CRYPTO");
  CRYPTO.forEach(it=>addPickerItem("crypto", it));

  addSectionTitle("BANKS");
  BANKS.forEach(it=>addPickerItem("bank", it));
}

function addPickerItem(kind, it){
  const row = document.createElement("button");
  row.type="button";
  row.className="item";

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
  name.textContent = (kind==="bank") ? `${it.name} (UAH)` : it.name;

  const sub = document.createElement("div");
  sub.className="sub";
  sub.textContent = (kind==="bank") ? "UAH" : it.asset;

  txt.appendChild(name);
  txt.appendChild(sub);

  left.appendChild(img);
  left.appendChild(txt);
  row.appendChild(left);

  row.addEventListener("click", ()=>{
    if(pickerContext==="give"){
      if(kind==="bank"){
        state.give = { asset: it.asset, type:"bank", network:null };
      }else{
        state.give = { asset: it.asset, type:"crypto", network: it.networks?.[0] || null };
      }
    }else{
      if(kind==="bank"){
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
}

ui.giveSelectBtn.addEventListener("click", ()=>openPicker("give"));
ui.getSelectBtn.addEventListener("click", ()=>openPicker("get"));

/* --- Networks picker (with icons) --- */
let netContext = null; // "give"|"get"

function openNetPicker(ctx){
  netContext = ctx;
  const sel = (ctx==="give") ? state.give : state.get;
  if(sel.type!=="crypto") return;

  const c = findCrypto(sel.asset);
  const nets = c?.networks || [];
  if(nets.length <= 1) return;

  ui.netTitle.textContent = t().netTitle;
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

    const img = document.createElement("img");
    img.className="icon";
    img.src = netIconPath(n);
    img.alt = n;
    img.onerror = ()=>{ img.style.display="none"; }; // если нет иконки

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
async function fetchWhitebitTickerAll(){
  const url = "https://whitebit.com/api/v4/public/ticker";
  const r = await fetch(url, { method:"GET" });
  if(!r.ok) throw new Error("HTTP " + r.status);
  return await r.json();
}

function pickMarket(obj, candidates){
  for(const m of candidates){
    if(obj?.[m]?.last_price) return { market:m, price:Number(obj[m].last_price) };
  }
  return null;
}

async function refreshRates(){
  ui.rateStatus.textContent = t().rateLoading;
  try{
    const tkr = await fetchWhitebitTickerAll();
    const found = pickMarket(tkr, ["USDT_UAH","UAH_USDT"]);
    if(!found) throw new Error("No USDT_UAH market");

    state.base.USDT_UAH = (found.market === "USDT_UAH") ? found.price : (1/found.price);
    state.lastRatesAt = Date.now();

    ui.rateStatus.textContent = t().rateOk;
    ui.rateHint.textContent = "";
    if(!isLocked()) recalc();
  }catch(e){
    ui.rateStatus.textContent = t().rateFail;
    ui.rateHint.textContent = "";
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
      ui.giveNetIcon.src = netIconPath(ui.giveNetLabel.textContent);
      ui.giveNetIcon.onerror = ()=>{ ui.giveNetIcon.style.display="none"; };
      ui.giveNetIcon.style.display="block";
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
      ui.getNetIcon.src = netIconPath(ui.getNetLabel.textContent);
      ui.getNetIcon.onerror = ()=>{ ui.getNetIcon.style.display="none"; };
      ui.getNetIcon.style.display="block";
    }else{
      ui.getNetBtn.classList.add("hidden");
      state.get.network = nets[0] || null;
    }
  }
}

/* -------------------- Calculate (USDT<->UAH) -------------------- */
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

  const giveCode = codeOf(state.give);
  const getCode  = codeOf(state.get);

  let baseRate = null; // get per 1 give
  if(giveCode==="USDT" && getCode==="UAH") baseRate = state.base.USDT_UAH;
  if(giveCode==="UAH" && getCode==="USDT") baseRate = 1/state.base.USDT_UAH;

  if(baseRate === null){
    ui.resultValue.textContent = "—";
    ui.rateLine.textContent = "Курс: —";
    ui.rateHint.textContent = "Поки що авто-курс тільки для USDT⇄UAH (наступний крок — всі монети).";
    return;
  }

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
  ui.langLabel.textContent = state.lang;
  applyI18n();

  state.give = { asset:"USDT", type:"crypto", network:"TRC20" };
  state.get  = { asset:"mono_uah", type:"bank",  network:null };

  ui.giveAmount.value = "1000";
  applySelectionsToUI();
  recalc();
  startAutoRefresh();
}

/* Close language popover if scroll/touch outside */
document.addEventListener("scroll", ()=>ui.langPop.classList.add("hidden"), { passive:true });

init();
