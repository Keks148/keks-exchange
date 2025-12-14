// ======= Data =======

// Banks (UAH)
const BANKS = [
  { id:"privat", name:"PrivatBank (UAH)", code:"UAH", icon:"logos/banks/privat.png", type:"bank" },
  { id:"mono", name:"Monobank (UAH)", code:"UAH", icon:"logos/banks/mono.png", type:"bank" },
  { id:"oschad", name:"Oschadbank (UAH)", code:"UAH", icon:"logos/banks/oschad.png", type:"bank" },
  { id:"pumb", name:"PUMB (UAH)", code:"UAH", icon:"logos/banks/pumb.png", type:"bank" },
  { id:"abank", name:"A-Bank (UAH)", code:"UAH", icon:"logos/banks/a-bank.png", type:"bank" },
  { id:"otp", name:"OTP (UAH)", code:"UAH", icon:"logos/banks/otp.png", type:"bank" },
  { id:"izi", name:"IziBank (UAH)", code:"UAH", icon:"logos/banks/izi.png", type:"bank" },
  { id:"sense", name:"Sense (UAH)", code:"UAH", icon:"logos/banks/sense.png", type:"bank" },
  { id:"ukrsib", name:"UkrSib (UAH)", code:"UAH", icon:"logos/banks/ukr-sib.png", type:"bank" },
  { id:"ukrbanki", name:"UkrBanki (UAH)", code:"UAH", icon:"logos/banks/ukr-banki.png", type:"bank" },
  { id:"visamaster", name:"Visa/Master (UAH)", code:"UAH", icon:"logos/banks/visa-master.png", type:"bank" },
];

// Crypto (сетевые варианты только там, где реально нужно)
const CRYPTO = [
  { id:"usdt", name:"Tether (USDT)", code:"USDT", icon:"logos/crypto/tether-usdt.png", type:"crypto",
    networks:["TRC20","ERC20","BEP20","ARB","POL","SOL","OP"]
  },
  { id:"usdc", name:"USD Coin (USDC)", code:"USDC", icon:"logos/crypto/usdc.png", type:"crypto",
    networks:["ERC20","BEP20","ARB","POL","SOL","OP"]
  },
  { id:"btc", name:"Bitcoin (BTC)", code:"BTC", icon:"logos/crypto/btc.png", type:"crypto",
    networks:["BTC"]
  },
  { id:"eth", name:"Ethereum (ETH)", code:"ETH", icon:"logos/crypto/eth.png", type:"crypto",
    networks:["ERC20"]
  },
  { id:"ltc", name:"Litecoin (LTC)", code:"LTC", icon:"logos/crypto/ltc.png", type:"crypto",
    networks:["LTC"]
  },
  { id:"sol", name:"Solana (SOL)", code:"SOL", icon:"logos/crypto/sol.png", type:"crypto",
    networks:["SOL"]
  },
  { id:"ton", name:"Toncoin (TON)", code:"TON", icon:"logos/crypto/ton.png", type:"crypto",
    networks:["TON"]
  },
  { id:"trx", name:"TRON (TRX)", code:"TRX", icon:"logos/crypto/trx.png", type:"crypto",
    networks:["TRX"]
  },
];

// Network icons (только те, что у тебя реально есть в logos/networks)
const NET_ICON = {
  "TRC20":"logos/networks/trc20.png",
  "ERC20":"logos/networks/erc20.png",
  "BEP20":"logos/networks/bep20.png",
  "ARB":"logos/networks/arb.png",
  "POL":"logos/networks/pol.png",
  "SOL":"logos/networks/sol.png",
  "OP":"logos/networks/op.png",
};

// ======= Translations =======
const I18N = {
  uk: {
    tabSwap:"Обмін", tabRules:"Правила", tabFaq:"FAQ", tabAccount:"Акаунт",
    give:"Віддаєте", get:"Отримуєте",
    youReceive:"Ви отримаєте",
    rate:"Курс:", rateUnavailable:"Курс недоступний (WhiteBIT)",
    locked:"Курс зафіксовано",
    create:"Створити заявку",
    rulesTitle:"Умови обміну",
    faqTitle:"FAQ",
    accTitle:"Акаунт",
    accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти", reg:"Реєстрація",
    pickGive:"Виберіть що віддаєте",
    pickGet:"Виберіть що отримуєте",
    network:"Мережа",
    fetching:"Оновлюємо курс…",
    fetchFail:"Failed to fetch",
  },
  en: {
    tabSwap:"Swap", tabRules:"Rules", tabFaq:"FAQ", tabAccount:"Account",
    give:"You give", get:"You get",
    youReceive:"You will receive",
    rate:"Rate:", rateUnavailable:"Rate unavailable (WhiteBIT)",
    locked:"Rate locked",
    create:"Create request",
    rulesTitle:"Exchange terms",
    faqTitle:"FAQ",
    accTitle:"Account",
    accText:"Login/registration & KYC (not connected yet).",
    login:"Login", reg:"Sign up",
    pickGive:"Choose what you give",
    pickGet:"Choose what you get",
    network:"Network",
    fetching:"Refreshing rate…",
    fetchFail:"Failed to fetch",
  },
  pl: {
    tabSwap:"Wymiana", tabRules:"Zasady", tabFaq:"FAQ", tabAccount:"Konto",
    give:"Dajesz", get:"Otrzymujesz",
    youReceive:"Otrzymasz",
    rate:"Kurs:", rateUnavailable:"Kurs niedostępny (WhiteBIT)",
    locked:"Kurs zablokowany",
    create:"Utwórz zgłoszenie",
    rulesTitle:"Warunki wymiany",
    faqTitle:"FAQ",
    accTitle:"Konto",
    accText:"Logowanie/rejestracja i KYC (jeszcze nie podłączone).",
    login:"Zaloguj", reg:"Rejestracja",
    pickGive:"Wybierz co dajesz",
    pickGet:"Wybierz co otrzymujesz",
    network:"Sieć",
    fetching:"Odświeżanie kursu…",
    fetchFail:"Failed to fetch",
  }
};

// ===== Telegram + storage =====
const TG = window.Telegram?.WebApp || null;
const LANG_KEY = "keksswap_lang";

function mapTgLang(code) {
  const c = String(code || "").toLowerCase();
  if (c.startsWith("uk") || c.startsWith("ua")) return "uk";
  if (c.startsWith("pl")) return "pl";
  if (c.startsWith("en")) return "en";
  return null;
}
function getLocalLang() { try { return localStorage.getItem(LANG_KEY); } catch { return null; } }
function setLocalLang(v) { try { localStorage.setItem(LANG_KEY, v); } catch {} }

function tgGetItem(key) {
  return new Promise((resolve) => {
    try {
      if (TG?.CloudStorage?.getItem) {
        TG.CloudStorage.getItem(key, (err, value) => resolve(err ? null : (value ?? null)));
        return;
      }
      resolve(null);
    } catch { resolve(null); }
  });
}
function tgSetItem(key, value) {
  return new Promise((resolve) => {
    try {
      if (TG?.CloudStorage?.setItem) {
        TG.CloudStorage.setItem(key, String(value), () => resolve(true));
        return;
      }
      resolve(false);
    } catch { resolve(false); }
  });
}

// ======= UI helpers =======
const $ = (id) => document.getElementById(id);

const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};
const tabs = Array.from(document.querySelectorAll(".tab"));

let lang = "uk";

// ======= State =======
const state = {
  // режим: crypto->bank или bank->crypto
  mode: "crypto_to_bank",

  giveCrypto: CRYPTO[0],     // USDT
  giveNet: "TRC20",
  giveBank: BANKS[1],        // Monobank
  giveAmount: 1000,

  // выбранная сторона "get"
  getBank: BANKS[1],
  getCrypto: CRYPTO[0],

  rate: null,
  lockSeconds: 180,
  lockTimerId: null,

  picking: null, // "give" | "get"
};

// ======= WhiteBIT rate =======
// Public endpoint: https://whitebit.com/api/v4/public/ticker (всё) 0
async function fetchWhitebitTicker() {
  const r = await fetch("https://whitebit.com/api/v4/public/ticker", { method: "GET" });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return await r.json();
}

function marketKey(base, quote) {
  return `${base}_${quote}`;
}

async function updateRate() {
  const t = I18N[lang] || I18N.uk;
  $("rateHint").textContent = t.fetching;

  try {
    const ticker = await fetchWhitebitTicker();

    // считаем только пары с UAH
    if (state.mode === "crypto_to_bank") {
      const base = state.giveCrypto.code;
      const key = marketKey(base, "UAH");
      const row = ticker[key];
      if (!row?.last_price) throw new Error("No market " + key);

      state.rate = parseFloat(row.last_price);
      $("rateStatus").textContent = "";
    } else {
      // bank_to_crypto: нужно сколько crypto за 1 UAH => 1 / (UAH price)
      const base = state.getCrypto.code;
      const key = marketKey(base, "UAH");
      const row = ticker[key];
      if (!row?.last_price) throw new Error("No market " + key);

      const priceUAH = parseFloat(row.last_price); // 1 crypto = X UAH
      state.rate = 1 / priceUAH;                   // 1 UAH = Y crypto
      $("rateStatus").textContent = "";
    }

    $("rateHint").textContent = "";
    recalc();
  } catch (e) {
    state.rate = null;
    $("rateStatus").textContent = t.rateUnavailable;
    $("rateHint").textContent = t.fetchFail;
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
  }
}

// ======= Init =======
async function init() {
  try { TG?.ready?.(); TG?.expand?.(); } catch {}

  // язык: cloud > local > tg auto > uk
  const cloud = await tgGetItem(LANG_KEY);
  const local = getLocalLang();
  const mapped = mapTgLang(TG?.initDataUnsafe?.user?.language_code);

  lang = (cloud && I18N[cloud]) ? cloud :
         (local && I18N[local]) ? local :
         (mapped && I18N[mapped]) ? mapped : "uk";

  setLangLabel();
  applyLang();

  // initial UI
  applyModeUI();
  $("giveAmount").value = String(state.giveAmount);

  // tabs
  tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      showView(btn.dataset.tab);
    });
  });

  // dropdown language
  $("langBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    $("langDropdown").classList.toggle("hidden");
  });
  document.addEventListener("click", () => $("langDropdown").classList.add("hidden"));
  document.querySelectorAll(".langItem[data-lang]").forEach(b=>{
    b.addEventListener("click", async (e)=>{
      e.stopPropagation();
      await setLangEverywhere(b.dataset.lang);
      $("langDropdown").classList.add("hidden");
    });
  });

  // asset modals
  $("giveAssetBtn").addEventListener("click", ()=> openAssetPicker("give"));
  $("getAssetBtn").addEventListener("click", ()=> openAssetPicker("get"));
  $("assetClose").addEventListener("click", closeAssetPicker);
  $("assetModal").addEventListener("click", (e)=>{ if(e.target.id==="assetModal") closeAssetPicker(); });

  // network modal
  $("giveNetBtn").addEventListener("click", ()=> openNetworkPicker());
  $("netClose").addEventListener("click", closeNetworkPicker);
  $("netModal").addEventListener("click", (e)=>{ if(e.target.id==="netModal") closeNetworkPicker(); });

  // swap button
  $("swapBtn").addEventListener("click", onSwap);

  // amount change
  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat(($("giveAmount").value || "0").replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  // create
  $("createBtn").addEventListener("click", ()=>{
    if (!state.rate) return alert((I18N[lang]||I18N.uk).fetchFail);

    if (state.mode === "crypto_to_bank") {
      alert(`Заявка: ${state.giveAmount} ${state.giveCrypto.code} (${state.giveNet}) → ${state.getBank.name}`);
    } else {
      alert(`Заявка: ${state.giveAmount} ${state.giveBank.code} → ${state.getCrypto.name} (${state.giveNet})`);
    }
  });

  // timer + rate
  startLockTimer();
  await updateRate();
}

// ======= UI / language =======
function setLangLabel() {
  $("langLabel").textContent = (lang === "uk" ? "UA" : lang.toUpperCase());
}

async function setLangEverywhere(v) {
  if (!I18N[v]) return;
  lang = v;
  setLocalLang(v);
  await tgSetItem(LANG_KEY, v);
  setLangLabel();
  applyLang();
  recalc();
}

function applyLang(){
  const t = I18N[lang] || I18N.uk;

  $("tabSwap").textContent = t.tabSwap;
  $("tabRules").textContent = t.tabRules;
  $("tabFaq").textContent = t.tabFaq;
  $("tabAccount").textContent = t.tabAccount;

  $("lblGive").textContent = t.give;
  $("lblGet").textContent = t.get;

  $("lblResult").textContent = t.youReceive;
  $("rateLineLabel").textContent = t.rate;
  $("rateLockedLabel").textContent = t.locked;
  $("createBtn").textContent = t.create;

  $("rulesTitle").textContent = t.rulesTitle;
  $("faqTitle").textContent = t.faqTitle;
  $("accTitle").textContent = t.accTitle;
  $("accText").textContent = t.accText;
  $("btnLogin").textContent = t.login;
  $("btnReg").textContent = t.reg;

  if(!state.rate) $("rateStatus").textContent = t.rateUnavailable;
}

function showView(key){
  Object.values(views).forEach(v=>v.classList.remove("active"));
  views[key].classList.add("active");
}

function setAssetUI(prefix, asset){
  $(prefix+"Icon").src = asset.icon;
  $(prefix+"Icon").alt = asset.code;
  $(prefix+"Name").textContent = asset.name;
  $(prefix+"Sub").textContent = asset.code;
}

function setNetworkUI(net){
  $("giveNetLabel").textContent = net;
  $("giveNetIcon").src = NET_ICON[net] || "logos/networks/trc20.png";
  $("giveNetIcon").alt = net;
}

// ======= Mode logic =======
function applyModeUI() {
  if (state.mode === "crypto_to_bank") {
    setAssetUI("give", state.giveCrypto);
    setAssetUI("get", state.getBank);

    // network button visibility
    const nets = state.giveCrypto.networks || [];
    if (nets.length > 1) {
      $("giveNetBtn").style.display = "flex";
      if (!nets.includes(state.giveNet)) state.giveNet = nets[0];
      setNetworkUI(state.giveNet);
    } else {
      $("giveNetBtn").style.display = "none";
      state.giveNet = nets[0] || "TRC20";
    }
  } else {
    // bank -> crypto
    setAssetUI("give", state.giveBank);
    setAssetUI("get", state.getCrypto);

    // network shown для "получаемой" crypto (мы всё равно выбираем сеть)
    const nets = state.getCrypto.networks || [];
    $("giveNetBtn").style.display = (nets.length > 1) ? "flex" : "none";
    state.giveNet = nets[0] || "ERC20";
    if (nets.length > 1) setNetworkUI(state.giveNet);
  }
}

function onSwap(){
  // анимация кнопки
  const btn = $("swapBtn");
  btn.classList.remove("anim");
  void btn.offsetWidth;
  btn.classList.add("anim");
  setTimeout(()=>btn.classList.remove("anim"), 420);

  state.mode = (state.mode === "crypto_to_bank") ? "bank_to_crypto" : "crypto_to_bank";
  applyModeUI();
  updateRate();
}

// ======= Calc =======
function recalc(){
  if(!state.rate){
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    return;
  }

  const res = state.giveAmount * state.rate;
  $("resultValue").textContent = format(res);
  $("rateValue").textContent = format(state.rate);
}

function format(n){
  if(!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {maximumFractionDigits: 6});
}

// ======= Asset picker =======
function openAssetPicker(which){
  state.picking = which;
  $("assetModal").classList.remove("hidden");

  const t = I18N[lang] || I18N.uk;
  $("assetTitle").textContent = (which === "give") ? t.pickGive : t.pickGet;

  const list = $("assetList");
  list.innerHTML = "";

  const items = buildItemsForPicker(which);

  items.forEach(it=>{
    const btn = document.createElement("button");
    btn.className = "item";
    btn.type = "button";

    const left = document.createElement("div");
    left.className = "itemLeft";

    const img = document.createElement("img");
    img.className = "icon";
    img.src = it.icon;
    img.alt = it.code;

    const txt = document.createElement("div");
    txt.style.minWidth = "0";

    const name = document.createElement("div");
    name.className = "itemName";
    name.textContent = it.name;

    const sub = document.createElement("div");
    sub.className = "itemSub";
    sub.textContent = it.code;

    txt.appendChild(name);
    txt.appendChild(sub);
    left.appendChild(img);
    left.appendChild(txt);

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = it.type === "crypto" ? "Crypto" : "Bank";

    btn.appendChild(left);
    btn.appendChild(badge);

    btn.addEventListener("click", async ()=>{
      applyPicked(which, it);
      closeAssetPicker();
      await updateRate();
    });

    list.appendChild(btn);
  });
}

function buildItemsForPicker(which){
  // правило: одна сторона crypto, другая bank
  if (state.mode === "crypto_to_bank") {
    return (which === "give") ? CRYPTO : BANKS;
  } else {
    // bank_to_crypto
    return (which === "give") ? BANKS : CRYPTO;
  }
}

function applyPicked(which, it){
  if (state.mode === "crypto_to_bank") {
    if (which === "give") {
      state.giveCrypto = it;
      const nets = it.networks || [];
      state.giveNet = nets[0] || "TRC20";
    } else {
      state.getBank = it;
    }
  } else {
    // bank_to_crypto
    if (which === "give") {
      state.giveBank = it;
    } else {
      state.getCrypto = it;
      const nets = it.networks || [];
      state.giveNet = nets[0] || "ERC20";
    }
  }
  applyModeUI();
}

function closeAssetPicker(){
  $("assetModal").classList.add("hidden");
  state.picking = null;
}

// ======= Network picker =======
function openNetworkPicker(){
  const t = I18N[lang] || I18N.uk;
  $("netTitle").textContent = t.network;

  let nets = [];
  let coinCode = "";

  if (state.mode === "crypto_to_bank") {
    nets = state.giveCrypto.networks || [];
    coinCode = state.giveCrypto.code;
  } else {
    nets = state.getCrypto.networks || [];
    coinCode = state.getCrypto.code;
  }

  if (nets.length <= 1) return;

  $("netModal").classList.remove("hidden");
  const list = $("netList");
  list.innerHTML = "";

  nets.forEach(net=>{
    const btn = document.createElement("button");
    btn.className = "item";
    btn.type = "button";

    const left = document.createElement("div");
    left.className = "itemLeft";

    const img = document.createElement("img");
    img.className = "netIcon";
    img.src = NET_ICON[net] || "logos/networks/trc20.png";
    img.alt = net;

    const txt = document.createElement("div");
    const name = document.createElement("div");
    name.className = "itemName";
    name.textContent = net;

    const sub = document.createElement("div");
    sub.className = "itemSub";
    sub.textContent = `${coinCode} network`;

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);

    btn.appendChild(left);

    btn.addEventListener("click", async ()=>{
      state.giveNet = net;
      setNetworkUI(net);
      closeNetworkPicker();
      await updateRate();
    });

    list.appendChild(btn);
  });
}

function closeNetworkPicker(){
  $("netModal").classList.add("hidden");
}

// ======= Lock timer (3 min) =======
function startLockTimer(){
  if(state.lockTimerId) clearInterval(state.lockTimerId);
  state.lockSeconds = 180;
  $("lockTimer").textContent = state.lockSeconds + "s";

  state.lockTimerId = setInterval(()=>{
    state.lockSeconds -= 1;
    if(state.lockSeconds <= 0){
      state.lockSeconds = 0;
      $("lockTimer").textContent = "0s";
      clearInterval(state.lockTimerId);
      state.lockTimerId = null;
    } else {
      $("lockTimer").textContent = state.lockSeconds + "s";
    }
  }, 1000);
}

// Boot
document.addEventListener("DOMContentLoaded", init);
