const $ = (id) => document.getElementById(id);

// Tabs
const tabs = document.querySelectorAll(".tab");
const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};

// Language
const langBtn = $("langBtn");
const langMenu = $("langMenu");
const langLabel = $("langLabel");

// Swap UI
const giveAssetBtn = $("giveAssetBtn");
const getAssetBtn = $("getAssetBtn");
const giveNetBtn = $("giveNetBtn");
const getNetBtn = $("getNetBtn");

const giveIcon = $("giveIcon");
const giveName = $("giveName");
const giveSub = $("giveSub");

const getIcon = $("getIcon");
const getName = $("getName");
const getSub = $("getSub");

const giveNetIcon = $("giveNetIcon");
const giveNetLabel = $("giveNetLabel");
const getNetIcon = $("getNetIcon");
const getNetLabel = $("getNetLabel");

const giveAmount = $("giveAmount");
const resultValue = $("resultValue");
const rateValue = $("rateValue");
const rateHint = $("rateHint");

const swapBtn = $("swapBtn");
const createBtn = $("createBtn");

// Modals
const assetModal = $("assetModal");
const assetClose = $("assetClose");
const assetTitle = $("assetTitle");
const assetList = $("assetList");

const netModal = $("netModal");
const netClose = $("netClose");
const netTitle = $("netTitle");
const netList = $("netList");

// ---- Icons (пути оставил как у тебя) ----
const ICONS = {
  USDT: "logos/crypto/usdt.png",
  USDC: "logos/crypto/usdc.png",
  BTC:  "logos/crypto/btc.png",
  ETH:  "logos/crypto/eth.png",
  LTC:  "logos/crypto/ltc.png",
  TON:  "logos/crypto/ton.png",

  MONO: "logos/banks/mono.png",
  PRIVAT: "logos/banks/privat.png",
  PUMB: "logos/banks/pumb.png",
  OTP: "logos/banks/otp.png",
  IZI: "logos/banks/izi.png",
  SENSE: "logos/banks/sense.png",
  UKRSIB: "logos/banks/ukrsib.png",
  ABANK: "logos/banks/abank.png",
  VISA: "logos/banks/visamaster.png",

  // network icons (если нет — не страшно)
  TRC20: "logos/crypto/trx.png",
  ERC20: "logos/crypto/eth.png",
  TONNET: "logos/crypto/ton.png",
  BTCNET: "logos/crypto/btc.png",
  LTCNET: "logos/crypto/ltc.png",
};

const assets = [
  // crypto
  { id:"USDT", type:"crypto",
    name:{uk:"Tether (USDT)",en:"Tether (USDT)",pl:"Tether (USDT)",tr:"Tether (USDT)"},
    sub:"USDT", iconKey:"USDT", networks:["TRC20","ERC20","TON"]
  },
  { id:"USDC", type:"crypto",
    name:{uk:"USD Coin (USDC)",en:"USD Coin (USDC)",pl:"USD Coin (USDC)",tr:"USD Coin (USDC)"},
    sub:"USDC", iconKey:"USDC", networks:["ERC20","TRC20"]
  },
  { id:"BTC", type:"crypto",
    name:{uk:"Bitcoin (BTC)",en:"Bitcoin (BTC)",pl:"Bitcoin (BTC)",tr:"Bitcoin (BTC)"},
    sub:"BTC", iconKey:"BTC", networks:["BTC"]
  },
  { id:"ETH", type:"crypto",
    name:{uk:"Ethereum (ETH)",en:"Ethereum (ETH)",pl:"Ethereum (ETH)",tr:"Ethereum (ETH)"},
    sub:"ETH", iconKey:"ETH", networks:["ERC20"]
  },
  { id:"LTC", type:"crypto",
    name:{uk:"Litecoin (LTC)",en:"Litecoin (LTC)",pl:"Litecoin (LTC)",tr:"Litecoin (LTC)"},
    sub:"LTC", iconKey:"LTC", networks:["LTC"]
  },
  { id:"TON", type:"crypto",
    name:{uk:"Toncoin (TON)",en:"Toncoin (TON)",pl:"Toncoin (TON)",tr:"Toncoin (TON)"},
    sub:"TON", iconKey:"TON", networks:["TON"]
  },

  // banks (ВНИМАНИЕ: UkrBanki УБРАЛ, остальное оставил)
  { id:"MONO", type:"bank",
    name:{uk:"Monobank (UAH)",en:"Monobank (UAH)",pl:"Monobank (UAH)",tr:"Monobank (UAH)"},
    sub:"UAH", iconKey:"MONO"
  },
  { id:"PRIVAT", type:"bank",
    name:{uk:"PrivatBank (UAH)",en:"PrivatBank (UAH)",pl:"PrivatBank (UAH)",tr:"PrivatBank (UAH)"},
    sub:"UAH", iconKey:"PRIVAT"
  },
  { id:"PUMB", type:"bank",
    name:{uk:"PUMB (UAH)",en:"PUMB (UAH)",pl:"PUMB (UAH)",tr:"PUMB (UAH)"},
    sub:"UAH", iconKey:"PUMB"
  },
  { id:"OTP", type:"bank",
    name:{uk:"OTP (UAH)",en:"OTP (UAH)",pl:"OTP (UAH)",tr:"OTP (UAH)"},
    sub:"UAH", iconKey:"OTP"
  },
  { id:"IZI", type:"bank",
    name:{uk:"IziBank (UAH)",en:"IziBank (UAH)",pl:"IziBank (UAH)",tr:"IziBank (UAH)"},
    sub:"UAH", iconKey:"IZI"
  },
  { id:"SENSE", type:"bank",
    name:{uk:"Sense (UAH)",en:"Sense (UAH)",pl:"Sense (UAH)",tr:"Sense (UAH)"},
    sub:"UAH", iconKey:"SENSE"
  },
  { id:"UKRSIB", type:"bank",
    name:{uk:"UkrSib (UAH)",en:"UkrSib (UAH)",pl:"UkrSib (UAH)",tr:"UkrSib (UAH)"},
    sub:"UAH", iconKey:"UKRSIB"
  },
  { id:"ABANK", type:"bank",
    name:{uk:"A-bank (UAH)",en:"A-bank (UAH)",pl:"A-bank (UAH)",tr:"A-bank (UAH)"},
    sub:"UAH", iconKey:"ABANK"
  },
  { id:"VISA", type:"bank",
    name:{uk:"Visa/Master (UAH)",en:"Visa/Master (UAH)",pl:"Visa/Master (UAH)",tr:"Visa/Master (UAH)"},
    sub:"UAH", iconKey:"VISA"
  },
];

// ---- i18n ----
const I18N = {
  uk: {
    tabs:{swap:"Обмін",rules:"Правила",faq:"FAQ",account:"Акаунт"},
    give:"Віддаєте", get:"Отримуєте", recv:"Ви отримаєте",
    rate:"Курс:", create:"Створити заявку",
    pickGive:"Виберіть що віддаєте", pickGet:"Виберіть що отримуєте",
    pickNet:"Оберіть мережу",
    updating:"Оновлюю курс з WhiteBIT…",
    noRate:"Курс тимчасово недоступний",
    rulesTitle:"Умови обміну",
    faqTitle:"FAQ",
    accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти", reg:"Реєстрація",
  },
  en: {
    tabs:{swap:"Swap",rules:"Rules",faq:"FAQ",account:"Account"},
    give:"You give", get:"You get", recv:"You will receive",
    rate:"Rate:", create:"Create request",
    pickGive:"Select what you give", pickGet:"Select what you get",
    pickNet:"Select network",
    updating:"Updating rate from WhiteBIT…",
    noRate:"Rate temporarily unavailable",
    rulesTitle:"Exchange terms",
    faqTitle:"FAQ",
    accText:"Login/registration & KYC (not connected yet).",
    login:"Login", reg:"Sign up",
  },
  pl: {
    tabs:{swap:"Wymiana",rules:"Zasady",faq:"FAQ",account:"Konto"},
    give:"Oddajesz", get:"Otrzymujesz", recv:"Otrzymasz",
    rate:"Kurs:", create:"Utwórz zlecenie",
    pickGive:"Wybierz co oddajesz", pickGet:"Wybierz co otrzymujesz",
    pickNet:"Wybierz sieć",
    updating:"Aktualizuję kurs z WhiteBIT…",
    noRate:"Kurs chwilowo niedostępny",
    rulesTitle:"Warunki wymiany",
    faqTitle:"FAQ",
    accText:"Logowanie/rejestracja & KYC (jeszcze nie podłączone).",
    login:"Zaloguj", reg:"Rejestracja",
  },
  tr: {
    tabs:{swap:"Takas",rules:"Kurallar",faq:"SSS",account:"Hesap"},
    give:"Veriyorsun", get:"Alıyorsun", recv:"Alacaksın",
    rate:"Kur:", create:"Talep oluştur",
    pickGive:"Ne verdiğini seç", pickGet:"Ne aldığını seç",
    pickNet:"Ağ seç",
    updating:"WhiteBIT’ten kur güncelleniyor…",
    noRate:"Kur geçici olarak yok",
    rulesTitle:"Değişim şartları",
    faqTitle:"SSS",
    accText:"Giriş/kayıt & KYC (henüz bağlı değil).",
    login:"Giriş", reg:"Kayıt ol",
  }
};

// ---- State ----
let lang = loadLang();
let pickingSide = null;   // "give" | "get"
let pickingNetSide = null;

let state = {
  give: { assetId:"USDT", net:"TRC20" },
  get:  { assetId:"MONO", net:null }
};

let rateTimer = null;
let lastUsdtUah = null;

// ---- Helpers ----
function loadLang(){
  const s = localStorage.getItem("keks_lang");
  return (s && I18N[s]) ? s : "uk";
}
function setLang(next){
  lang = next;
  localStorage.setItem("keks_lang", next);
  langLabel.textContent = next.toUpperCase();
  applyLang();
  renderAll();
}

function assetById(id){ return assets.find(a => a.id === id); }
function iconPath(key){ return ICONS[key] || ""; }

function isCrypto(assetId){
  const a = assetById(assetId);
  return a && a.type === "crypto";
}

function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }

// ---- Apply language everywhere ----
function applyLang(){
  const t = I18N[lang];

  $("tabSwap").textContent = t.tabs.swap;
  $("tabRules").textContent = t.tabs.rules;
  $("tabFaq").textContent = t.tabs.faq;
  $("tabAccount").textContent = t.tabs.account;

  $("lblGive").textContent = t.give;
  $("lblGet").textContent = t.get;
  $("lblResult").textContent = t.recv;

  $("rateLineLabel").textContent = t.rate;
  $("createBtn").textContent = t.create;

  $("rulesTitle").textContent = t.rulesTitle;
  $("faqTitle").textContent = t.faqTitle;
  $("accTitle").textContent = t.tabs.account;
  $("accText").textContent = t.accText;

  $("btnLogin").textContent = t.login;
  $("btnReg").textContent = t.reg;
}

// ---- Render selects + networks ----
function renderSide(side){
  const s = state[side];
  const a = assetById(s.assetId);

  const iconEl = side === "give" ? giveIcon : getIcon;
  const nameEl = side === "give" ? giveName : getName;
  const subEl  = side === "give" ? giveSub  : getSub;

  iconEl.src = iconPath(a.iconKey);
  nameEl.textContent = a.name[lang] || a.name.uk;
  subEl.textContent = a.sub;

  // networks visibility
  const netBtn = side === "give" ? giveNetBtn : getNetBtn;
  const netLabelEl = side === "give" ? giveNetLabel : getNetLabel;
  const netIconEl  = side === "give" ? giveNetIcon  : getNetIcon;

  if(a.type === "crypto"){
    // ensure net exists
    if(!s.net){
      s.net = (a.networks && a.networks[0]) ? a.networks[0] : "TRC20";
    }
    netLabelEl.textContent = s.net;

    // set net icon
    let netIconKey = s.net === "TON" ? "TONNET" :
                     s.net === "BTC" ? "BTCNET" :
                     s.net === "LTC" ? "LTCNET" :
                     s.net;
    netIconEl.src = iconPath(netIconKey) || iconPath(a.iconKey);
    show(netBtn);
  } else {
    s.net = null;
    hide(netBtn);
  }
}

function renderAll(){
  renderSide("give");
  renderSide("get");
  calc();
}

// ---- Modals ----
function openAssetPicker(side){
  pickingSide = side;
  assetTitle.textContent = (side === "give") ? I18N[lang].pickGive : I18N[lang].pickGet;

  assetList.innerHTML = "";
  assets.forEach(a => {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      <div class="itemLeft">
        <img class="icon" src="${iconPath(a.iconKey)}" alt="" />
        <div class="itemText">
          <div class="itemMain">${a.name[lang] || a.name.uk}</div>
          <div class="itemSub">${a.sub}</div>
        </div>
      </div>
      <div class="itemRight">▸</div>
    `;
    row.onclick = () => {
      state[side].assetId = a.id;
      // reset net based on crypto/bank
      if(a.type === "crypto") state[side].net = a.networks[0];
      else state[side].net = null;

      hide(assetModal);
      renderAll();
      // обновим курс (если нужно)
      updateRateOnce();
    };
    assetList.appendChild(row);
  });

  show(assetModal);
}

function openNetPicker(side){
  const s = state[side];
  const a = assetById(s.assetId);
  if(!a || a.type !== "crypto") return;

  pickingNetSide = side;
  netTitle.textContent = I18N[lang].pickNet;
  netList.innerHTML = "";

  a.networks.forEach(n => {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      <div class="itemLeft">
        <img class="netIcon" src="${iconPath(n) || iconPath(a.iconKey)}" alt="" />
        <div class="itemText">
          <div class="itemMain">${n}</div>
          <div class="itemSub">${a.sub}</div>
        </div>
      </div>
      <div class="itemRight">▸</div>
    `;
    row.onclick = () => {
      state[side].net = n;
      hide(netModal);
      renderAll();
      updateRateOnce();
    };
    netList.appendChild(row);
  });

  show(netModal);
}

// ---- Close modals by backdrop ----
assetModal.addEventListener("click", (e) => { if(e.target === assetModal) hide(assetModal); });
netModal.addEventListener("click", (e) => { if(e.target === netModal) hide(netModal); });

// ---- Tabs ----
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    Object.values(views).forEach(v => v.classList.remove("active"));
    views[tab].classList.add("active");

    hide(langMenu);
    hide(assetModal);
    hide(netModal);
  });
});

// ---- Language menu ----
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if(langMenu.classList.contains("hidden")) show(langMenu);
  else hide(langMenu);
});
document.addEventListener("click", () => hide(langMenu));
langMenu.querySelectorAll(".pill").forEach(p => {
  p.addEventListener("click", () => {
    setLang(p.dataset.lang);
    hide(langMenu);
  });
});

// ---- Buttons ----
giveAssetBtn.onclick = () => openAssetPicker("give");
getAssetBtn.onclick = () => openAssetPicker("get");
giveNetBtn.onclick = () => openNetPicker("give");
getNetBtn.onclick = () => openNetPicker("get");

assetClose.onclick = () => hide(assetModal);
netClose.onclick = () => hide(netModal);

swapBtn.onclick = () => {
  const g = { ...state.give };
  state.give = { ...state.get };
  state.get = { ...g };
  renderAll();
  updateRateOnce();
};

giveAmount.addEventListener("input", () => calc());

createBtn.onclick = () => {
  // пока демо
};

// ---- Rate (USDT/UAH) from WhiteBIT ----
async function fetchWhitebitTicker(){
  const res = await fetch("https://whitebit.com/api/v2/public/ticker", { cache:"no-store" });
  if(!res.ok) throw new Error("bad_response");
  return res.json();
}

async function updateRateOnce(){
  // only show loader text briefly; don't break UI
  rateHint.textContent = I18N[lang].updating;

  try{
    const gA = assetById(state.give.assetId);
    const tA = assetById(state.get.assetId);

    const involvesUAH = (gA.sub === "UAH") || (tA.sub === "UAH");
    const involvesUSDT = (gA.id === "USDT") || (tA.id === "USDT");

    if(!(involvesUAH && involvesUSDT)){
      rateValue.textContent = "—";
      rateHint.textContent = "";
      lastUsdtUah = null;
      calc();
      return;
    }

    const data = await fetchWhitebitTicker();
    const pair = data["USDT_UAH"];
    if(!pair || !pair.last) throw new Error("pair_missing");

    const last = parseFloat(pair.last);
    if(!Number.isFinite(last)) throw new Error("bad_rate");

    lastUsdtUah = last;
    rateValue.textContent = `1 USDT = ${last.toFixed(2)} UAH`;
    rateHint.textContent = "";
    calc();
  }catch(e){
    rateValue.textContent = "—";
    rateHint.textContent = I18N[lang].noRate;
    lastUsdtUah = null;
    calc();
  }
}

function startAutoRate(){
  if(rateTimer) clearInterval(rateTimer);
  updateRateOnce();
  rateTimer = setInterval(updateRateOnce, 60000);
}

// ---- Calc ----
function parseAmount(v){
  const x = String(v || "").replace(",", ".").replace(/[^\d.]/g, "");
  const n = parseFloat(x);
  return Number.isFinite(n) ? n : 0;
}

function calc(){
  const amount = parseAmount(giveAmount.value);
  if(!amount){
    resultValue.textContent = "—";
    return;
  }

  const gA = assetById(state.give.assetId);
  const tA = assetById(state.get.assetId);

  // only USDT<->UAH calc for now
  if(lastUsdtUah){
    if(gA.id === "USDT" && tA.sub === "UAH"){
      resultValue.textContent = (amount * lastUsdtUah).toFixed(2);
      return;
    }
    if(gA.sub === "UAH" && tA.id === "USDT"){
      resultValue.textContent = (amount / lastUsdtUah).toFixed(4);
      return;
    }
  }

  resultValue.textContent = "—";
}

// ---- Init ----
(function init(){
  langLabel.textContent = lang.toUpperCase();
  applyLang();
  renderAll();
  startAutoRate();
})();
