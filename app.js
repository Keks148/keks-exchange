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
  { id:"visamaster", name:"Visa/Master (UAH)", code:"UAH", icon:"logos/banks/visa-master.png", type:"bank" },
];

// Crypto
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
    networks:["ERC20","ARB","OP"]
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

// Network icons
const NET_ICON = {
  "TRC20":"logos/networks/trc20.png",
  "ERC20":"logos/networks/erc20.png",
  "BEP20":"logos/networks/bep20.png",
  "ARB":"logos/networks/arb.png",
  "POL":"logos/networks/pol.png",
  "SOL":"logos/networks/sol.png",
  "OP":"logos/networks/op.png",
  "BTC":"logos/networks/btc.png",
  "ETH":"logos/networks/eth.png",
  "LTC":"logos/networks/ltc.png",
  "TON":"logos/networks/ton.png",
  "TRX":"logos/networks/trx.png",
};

// ======= Translations =======
const I18N = {
  uk: {
    tabSwap:"Обмін", tabRules:"Правила", tabFaq:"FAQ", tabAccount:"Акаунт",
    give:"Віддаєте", get:"Отримуєте",
    youReceive:"Ви отримаєте",
    rate:"Курс:", create:"Створити заявку",
    rulesTitle:"Умови обміну", faqTitle:"FAQ",
    accTitle:"Акаунт",
    accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти", reg:"Реєстрація",
    pickGive:"Виберіть що віддаєте",
    pickGet:"Виберіть що отримуєте",
    pickNet:"Оберіть мережу",
    failed:"Не вдалося отримати курс",
  },
  en: {
    tabSwap:"Swap", tabRules:"Rules", tabFaq:"FAQ", tabAccount:"Account",
    give:"You give", get:"You get",
    youReceive:"You will receive",
    rate:"Rate:", create:"Create request",
    rulesTitle:"Exchange terms", faqTitle:"FAQ",
    accTitle:"Account",
    accText:"Login/registration & KYC (not connected yet).",
    login:"Login", reg:"Sign up",
    pickGive:"Choose what you give",
    pickGet:"Choose what you get",
    pickNet:"Choose network",
    failed:"Failed to fetch rate",
  },
  pl: {
    tabSwap:"Wymiana", tabRules:"Zasady", tabFaq:"FAQ", tabAccount:"Konto",
    give:"Dajesz", get:"Otrzymujesz",
    youReceive:"Otrzymasz",
    rate:"Kurs:", create:"Utwórz zgłoszenie",
    rulesTitle:"Warunki wymiany", faqTitle:"FAQ",
    accTitle:"Konto",
    accText:"Logowanie/rejestracja i KYC (jeszcze nie podłączone).",
    login:"Zaloguj", reg:"Rejestracja",
    pickGive:"Wybierz co dajesz",
    pickGet:"Wybierz co otrzymujesz",
    pickNet:"Wybierz sieć",
    failed:"Nie udało się pobrać kursu",
  }
};

// ===== Language Storage (Telegram Cloud + local) =====
const TG = window.Telegram?.WebApp || null;
const LANG_KEY = "keksswap_lang";

function mapTgLang(code) {
  const c = String(code || "").toLowerCase();
  if (c.startsWith("uk") || c.startsWith("ua")) return "uk";
  if (c.startsWith("pl")) return "pl";
  if (c.startsWith("en")) return "en";
  return null;
}

function getLocalLang() {
  try { return localStorage.getItem(LANG_KEY); } catch { return null; }
}
function setLocalLang(v) {
  try { localStorage.setItem(LANG_KEY, v); } catch {}
}

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

// ======= UI refs =======
const $ = (id) => document.getElementById(id);

const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};

const tabs = Array.from(document.querySelectorAll(".tab"));

let lang = getLocalLang() || "uk";
const ALL_ASSETS = [...CRYPTO, ...BANKS];

const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",
  getAsset: BANKS[1],
  giveAmount: 1000,
  rate: null,
  picking: null,
};

function init(){
  try { TG?.ready?.(); TG?.expand?.(); } catch {}

  // IMPORTANT: на старте принудительно закрываем модалки (чтобы ничего не блокировало)
  forceCloseAllModals();

  // дефолты
  setAssetUI("give", state.giveAsset);
  ensureGiveNetworkVisibility();
  setNetworkUI(state.giveNet);

  setAssetUI("get", state.getAsset);
  $("giveAmount").value = String(state.giveAmount);

  // tabs
  tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      showView(btn.dataset.tab);
    });
  });

  // pickers
  $("giveAssetBtn").addEventListener("click", ()=> openAssetPicker("giveAsset"));
  $("getAssetBtn").addEventListener("click", ()=> openAssetPicker("getAsset"));

  // network
  $("giveNetBtn").addEventListener("click", ()=> openNetworkPicker());

  // swap
  $("swapBtn").addEventListener("click", onSwap);

  // amount
  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat(($("giveAmount").value || "0").replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  // create
  $("createBtn").addEventListener("click", ()=>{
    alert("Заявка: " + state.giveAmount + " " + state.giveAsset.code + (state.giveAsset.type==="crypto" ? " ("+state.giveNet+")" : "") + " → " + state.getAsset.name);
  });

  // language dropdown (не блокирует экран!)
  const langMenu = $("langMenu");
  const langBtn = $("langBtn");

  function placeLangMenu(){
    const r = langBtn.getBoundingClientRect();
    const x = Math.max(6, Math.min(window.innerWidth - 6 - 150, r.right - 140));
    const y = r.bottom + 6 + window.scrollY;
    langMenu.style.left = x + "px";
    langMenu.style.top = y + "px";
  }

  langBtn.addEventListener("click", (e)=>{
    e.stopPropagation();
    placeLangMenu();
    langMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", ()=> langMenu.classList.add("hidden"));
  window.addEventListener("resize", ()=> { if(!langMenu.classList.contains("hidden")) placeLangMenu(); });

  document.querySelectorAll(".pill[data-lang]").forEach(p=>{
    p.addEventListener("click", async (e)=>{
      e.stopPropagation();
      await setLangEverywhere(p.dataset.lang);
      langMenu.classList.add("hidden");
    });
  });

  // close handlers
  $("assetClose").addEventListener("click", closeAssetPicker);
  $("assetModal").addEventListener("click", (e)=>{
    if(e.target.id === "assetModal") closeAssetPicker();
  });

  $("netClose").addEventListener("click", closeNetworkPicker);
  $("netModal").addEventListener("click", (e)=>{
    if(e.target.id === "netModal") closeNetworkPicker();
  });

  // защитно: если случайно где-то открылась сеть — закрыть
  closeNetworkPicker();

  initLanguage().then(()=>{
    applyLang();
    hardHideRateStatusUI();
    recalc();
  });
}

function forceCloseAllModals(){
  const assetModal = $("assetModal");
  const netModal = $("netModal");
  if(assetModal) assetModal.classList.add("hidden");
  if(netModal) netModal.classList.add("hidden");
}

function hardHideRateStatusUI(){
  // Жестко скрываем элементы статус-строки, чтобы таймер/WhiteBIT не появлялись вообще
  const rateStatus = $("rateStatus");
  const rateLockedLabel = $("rateLockedLabel");
  const lockTimer = $("lockTimer");

  if(rateStatus){
    rateStatus.textContent = "";
    rateStatus.style.display = "none";
  }
  if(rateLockedLabel) rateLockedLabel.style.display = "none";
  if(lockTimer) lockTimer.style.display = "none";

  // если есть dot
  document.querySelectorAll(".statusRight .dot").forEach(x=>x.style.display="none");

  // скрыть правую плашку целиком
  const sr = document.querySelector(".statusRight");
  if(sr) sr.style.display = "none";

  // и строку целиком убираем (чтобы вообще не занимала место)
  const row = document.querySelector(".statusRow");
  if(row) row.style.display = "none";
}

async function setLangEverywhere(v) {
  if(!I18N[v]) v = "uk";
  lang = v;
  setLocalLang(v);
  await tgSetItem(LANG_KEY, v);
  $("langLabel").textContent = (v === "uk" ? "UA" : v.toUpperCase());
  applyLang();
  hardHideRateStatusUI();
}

async function initLanguage(){
  $("langLabel").textContent = (lang === "uk" ? "UA" : lang.toUpperCase());

  const cloud = await tgGetItem(LANG_KEY);
  if (cloud && I18N[cloud]) { await setLangEverywhere(cloud); return; }

  const local = getLocalLang();
  if (local && I18N[local]) { lang = local; return; }

  const mapped = mapTgLang(TG?.initDataUnsafe?.user?.language_code);
  if (mapped && I18N[mapped]) { await setLangEverywhere(mapped); return; }

  await setLangEverywhere("uk");
}

function showView(key){
  Object.values(views).forEach(v=>v.classList.remove("active"));
  views[key].classList.add("active");
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
  $("createBtn").textContent = t.create;

  $("rulesTitle").textContent = t.rulesTitle;
  $("faqTitle").textContent = t.faqTitle;
  $("accTitle").textContent = t.accTitle;
  $("accText").textContent = t.accText;
  $("btnLogin").textContent = t.login;
  $("btnReg").textContent = t.reg;

  const netTitle = $("netTitle");
  if(netTitle) netTitle.textContent = t.pickNet;
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

function ensureGiveNetworkVisibility(){
  if(state.giveAsset.type === "crypto"){
    const nets = state.giveAsset.networks || [];
    state.giveNet = nets.includes(state.giveNet) ? state.giveNet : (nets[0] || "TRC20");
    setNetworkUI(state.giveNet);
    $("giveNetBtn").style.display = "flex";
  } else {
    $("giveNetBtn").style.display = "none";
  }
}

function onSwap(){
  const oldGive = state.giveAsset;
  const oldGet  = state.getAsset;

  state.giveAsset = oldGet;
  state.getAsset  = oldGive;

  setAssetUI("give", state.giveAsset);
  setAssetUI("get", state.getAsset);

  ensureGiveNetworkVisibility();
  recalc();
}

function recalc(){
  const t = I18N[lang] || I18N.uk;

  if(!state.rate){
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    $("rateHint").textContent = t.failed;
    return;
  }

  const res = state.giveAmount * state.rate;
  $("resultValue").textContent = format(res);
  $("rateValue").textContent = format(state.rate);
  $("rateHint").textContent = "";
}

function format(n){
  if(!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {maximumFractionDigits: 6});
}

// ======= Asset picker (банки+крипта) =======
function openAssetPicker(which){
  state.picking = which;
  $("assetModal").classList.remove("hidden");

  const t = I18N[lang] || I18N.uk;
  $("assetTitle").textContent = which === "giveAsset" ? t.pickGive : t.pickGet;

  const list = $("assetList");
  list.innerHTML = "";

  ALL_ASSETS.forEach(it=>{
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
    btn.appendChild(left);

    btn.addEventListener("click", ()=>{
      if(which === "giveAsset"){
        state.giveAsset = it;
        setAssetUI("give", it);
        ensureGiveNetworkVisibility();
        // если после выбора это bank — сеть закрыта, чтобы не всплывала
        if(it.type !== "crypto") closeNetworkPicker();
      } else {
        state.getAsset = it;
        setAssetUI("get", it);
      }

      closeAssetPicker();
      recalc();
    });

    list.appendChild(btn);
  });
}

function closeAssetPicker(){
  $("assetModal").classList.add("hidden");
  state.picking = null;
}

// ======= Network picker =======
function openNetworkPicker(){
  if(state.giveAsset.type !== "crypto") return;

  $("netModal").classList.remove("hidden");
  const list = $("netList");
  list.innerHTML = "";

  const nets = state.giveAsset.networks || [];
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
    sub.textContent = state.giveAsset.code + " network";

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);
    btn.appendChild(left);

    btn.addEventListener("click", ()=>{
      state.giveNet = net;
      setNetworkUI(net);
      closeNetworkPicker();
      recalc();
    });

    list.appendChild(btn);
  });
}

function closeNetworkPicker(){
  $("netModal").classList.add("hidden");
}

// Boot
document.addEventListener("DOMContentLoaded", init);
