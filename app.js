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

const ASSETS_ALL = [...CRYPTO, ...BANKS];

// Network icons (если каких-то файлов нет — просто оставь trc20.png как заглушку)
const NET_ICON = {
  "TRC20":"logos/networks/trc20.png",
  "ERC20":"logos/networks/erc20.png",
  "BEP20":"logos/networks/bep20.png",
  "ARB":"logos/networks/arb.png",
  "POL":"logos/networks/pol.png",
  "SOL":"logos/networks/sol.png",
  "OP":"logos/networks/op.png",
  "BTC":"logos/networks/btc.png",
  "LTC":"logos/networks/ltc.png",
  "TON":"logos/networks/ton.png",
  "TRX":"logos/networks/trx.png",
  "ERC":"logos/networks/erc20.png",
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
    pickNet:"Оберіть мережу",
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
    pickNet:"Choose network",
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
    pickNet:"Wybierz sieć",
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

// ======= UI =======
const $ = (id) => document.getElementById(id);
const tabs = Array.from(document.querySelectorAll(".tab"));

const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};

let lang = getLocalLang() || "uk";

const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",

  getAsset: BANKS[1],
  getNet: "TRC20",

  giveAmount: 1000,
  rate: null,

  lockSeconds: 180,
  lockTimerId: null,

  picking: null, // give|get
};

// ======= helpers =======
function isCrypto(a){ return a?.type === "crypto"; }

function setAssetUI(prefix, asset){
  $(prefix+"Icon").src = asset.icon;
  $(prefix+"Icon").alt = asset.code;
  $(prefix+"Name").textContent = asset.name;
  $(prefix+"Sub").textContent = asset.code;
}

function setNetUI(prefix, net){
  $(prefix+"NetLabel").textContent = net;
  $(prefix+"NetIcon").src = NET_ICON[net] || "logos/networks/trc20.png";
  $(prefix+"NetIcon").alt = net;
}

function ensureNet(prefix){
  const asset = prefix === "give" ? state.giveAsset : state.getAsset;
  const btn = $(prefix+"NetBtn");

  if(!isCrypto(asset)){
    btn.style.display = "none";
    return;
  }

  btn.style.display = "flex";
  const nets = asset.networks || ["TRC20"];
  const cur = prefix === "give" ? state.giveNet : state.getNet;
  const next = nets.includes(cur) ? cur : nets[0];

  if(prefix === "give") state.giveNet = next;
  else state.getNet = next;

  setNetUI(prefix, next);
}

function showView(key){
  Object.values(views).forEach(v=>v.classList.remove("active"));
  views[key].classList.add("active");
}

// ======= Language =======
async function setLangEverywhere(v) {
  lang = v;
  setLocalLang(v);
  await tgSetItem(LANG_KEY, v);
  $("langLabel").textContent = (v === "uk" ? "UA" : v.toUpperCase());
  applyLang();
}

async function initLanguage(){
  $("langLabel").textContent = (lang === "uk" ? "UA" : lang.toUpperCase());

  const cloud = await tgGetItem(LANG_KEY);
  if (cloud && I18N[cloud]) { await setLangEverywhere(cloud); return; }

  const local = getLocalLang();
  if (local && I18N[local]) { lang = local; applyLang(); return; }

  const mapped = mapTgLang(TG?.initDataUnsafe?.user?.language_code);
  if (mapped && I18N[mapped]) { await setLangEverywhere(mapped); return; }

  // first run: just default uk (без блокирующего экрана)
  applyLang();
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
  $("rateStatus").textContent = state.rate ? "" : t.rateUnavailable;
  $("rateLockedLabel").textContent = t.locked;
  $("createBtn").textContent = t.create;
  $("rulesTitle").textContent = t.rulesTitle;
  $("faqTitle").textContent = t.faqTitle;
  $("accTitle").textContent = t.accTitle;
  $("accText").textContent = t.accText;
  $("btnLogin").textContent = t.login;
  $("btnReg").textContent = t.reg;

  $("netTitle").textContent = t.pickNet;
}

// ======= Modals =======
function openAssetPicker(which){
  state.picking = which; // "give" | "get"
  $("assetModal").classList.remove("hidden");

  const t = I18N[lang] || I18N.uk;
  $("assetTitle").textContent = which === "give" ? t.pickGive : t.pickGet;

  const list = $("assetList");
  list.innerHTML = "";

  // ВАЖНО: в обоих полях показываем и банки и крипту
  ASSETS_ALL.forEach(it=>{
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
    sub.textContent = it.type === "crypto" ? (it.code + " • Crypto") : (it.code + " • Bank"); // без бейджа справа

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);

    btn.appendChild(left);

    btn.addEventListener("click", ()=>{
      if(which === "give"){
        state.giveAsset = it;
        setAssetUI("give", it);
        ensureNet("give");
      } else {
        state.getAsset = it;
        setAssetUI("get", it);
        ensureNet("get");
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

function openNetPicker(prefix){
  const asset = prefix === "give" ? state.giveAsset : state.getAsset;
  if(!isCrypto(asset)) return;

  $("netModal").classList.remove("hidden");
  const list = $("netList");
  list.innerHTML = "";

  const nets = asset.networks || [];
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
    sub.textContent = asset.code + " network";

    txt.appendChild(name);
    txt.appendChild(sub);

    left.appendChild(img);
    left.appendChild(txt);
    btn.appendChild(left);

    btn.addEventListener("click", ()=>{
      if(prefix === "give") state.giveNet = net;
      else state.getNet = net;

      setNetUI(prefix, net);
      closeNetPicker();
      recalc();
    });

    list.appendChild(btn);
  });
}

function closeNetPicker(){
  $("netModal").classList.add("hidden");
}

// ======= Swap =======
function onSwap(){
  // меняем местами ассеты
  const a1 = state.giveAsset;
  const n1 = state.giveNet;
  const a2 = state.getAsset;
  const n2 = state.getNet;

  state.giveAsset = a2;
  state.getAsset = a1;

  state.giveNet = n2;
  state.getNet = n1;

  setAssetUI("give", state.giveAsset);
  setAssetUI("get", state.getAsset);

  ensureNet("give");
  ensureNet("get");

  // анимация кнопки
  const btn = $("swapBtn");
  btn.classList.remove("spin");
  void btn.offsetWidth;
  btn.classList.add("spin");

  recalc();
}

// ======= Calc =======
function recalc(){
  // пока нет fetch — оставим заглушку
  $("rateValue").textContent = "—";
  $("resultValue").textContent = "—";
  $("rateHint").textContent = "Failed to fetch";
}

// ======= Lock timer =======
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

// ======= Init =======
function init(){
  try { TG?.ready?.(); TG?.expand?.(); } catch {}

  setAssetUI("give", state.giveAsset);
  setNetUI("give", state.giveNet);

  setAssetUI("get", state.getAsset);
  setNetUI("get", state.getNet);

  $("giveAmount").value = String(state.giveAmount);

  ensureNet("give");
  ensureNet("get");

  tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      showView(btn.dataset.tab);
    });
  });

  $("giveAssetBtn").addEventListener("click", ()=> openAssetPicker("give"));
  $("getAssetBtn").addEventListener("click", ()=> openAssetPicker("get"));

  $("giveNetBtn").addEventListener("click", ()=> openNetPicker("give"));
  $("getNetBtn").addEventListener("click", ()=> openNetPicker("get"));

  $("swapBtn").addEventListener("click", onSwap);

  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat(($("giveAmount").value || "0").replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  $("createBtn").addEventListener("click", ()=>{
    alert(`Заявка: ${state.giveAmount} ${state.giveAsset.code}${isCrypto(state.giveAsset)?` (${state.giveNet})`:``} → ${state.getAsset.name}${isCrypto(state.getAsset)?` (${state.getNet})`:``}`);
  });

  // language dropdown
  const langMenu = $("langMenu");
  $("langBtn").addEventListener("click", (e)=>{
    e.stopPropagation();
    langMenu.classList.toggle("hidden");
  });

  document.querySelectorAll(".pill[data-lang]").forEach(p=>{
    p.addEventListener("click", async ()=>{
      await setLangEverywhere(p.dataset.lang);
      langMenu.classList.add("hidden");
    });
  });

  // click outside closes dropdown
  document.addEventListener("click", ()=> langMenu.classList.add("hidden"));

  // modals close
  $("assetClose").addEventListener("click", closeAssetPicker);
  $("assetModal").addEventListener("click", (e)=>{ if(e.target.id==="assetModal") closeAssetPicker(); });

  $("netClose").addEventListener("click", closeNetPicker);
  $("netModal").addEventListener("click", (e)=>{ if(e.target.id==="netModal") closeNetPicker(); });

  startLockTimer();
  initLanguage().then(()=>{ applyLang(); recalc(); });
}

document.addEventListener("DOMContentLoaded", init);
