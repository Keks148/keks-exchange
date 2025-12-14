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
    rulesTitle:"Умови обміну",
    faqTitle:"FAQ",
    accTitle:"Акаунт",
    accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти", reg:"Реєстрація",
    pickGive:"Виберіть що віддаєте",
    pickGet:"Виберіть що отримуєте",
    pickNet:"Оберіть мережу",
    failed:"Не вдалося отримати курс",
    rulesT1:"Час обробки",
    rulesB1:"Зазвичай до <b>40 хвилин</b>.",
    rulesB1b:"У рідкісних випадках — до <b>72 годин</b>.",
    rulesT2:"Фіксація курсу",
    rulesB2:"Курс фіксується на момент створення заявки.",
    rulesT3:"Контакт у Telegram",
    rulesB3:"Вкажіть ваш Telegram для звʼязку.",
    rulesT4:"Підтвердження",
    rulesB4:"Оператор підтвердить реквізити та суму.",
    faqQ1:"Коли фіксується курс?",
    faqA1:"Після створення заявки.",
    faqQ2:"Скільки триває обмін?",
    faqA2:"Зазвичай до 40 хвилин.",
  },
  en: {
    tabSwap:"Swap", tabRules:"Rules", tabFaq:"FAQ", tabAccount:"Account",
    give:"You give", get:"You get",
    youReceive:"You will receive",
    rate:"Rate:", create:"Create request",
    rulesTitle:"Exchange terms",
    faqTitle:"FAQ",
    accTitle:"Account",
    accText:"Login/registration & KYC (not connected yet).",
    login:"Login", reg:"Sign up",
    pickGive:"Choose what you give",
    pickGet:"Choose what you get",
    pickNet:"Choose network",
    failed:"Failed to fetch rate",
    rulesT1:"Processing time",
    rulesB1:"Usually up to <b>40 minutes</b>.",
    rulesB1b:"In rare cases — up to <b>72 hours</b>.",
    rulesT2:"Rate lock",
    rulesB2:"The rate is locked at the moment you create the request.",
    rulesT3:"Telegram contact",
    rulesB3:"Provide your Telegram username for communication.",
    rulesT4:"Confirmation",
    rulesB4:"An operator will confirm details and the amount.",
    faqQ1:"When is the rate locked?",
    faqA1:"After you create the request.",
    faqQ2:"How long does the exchange take?",
    faqA2:"Usually up to 40 minutes.",
  },
  pl: {
    tabSwap:"Wymiana", tabRules:"Zasady", tabFaq:"FAQ", tabAccount:"Konto",
    give:"Dajesz", get:"Otrzymujesz",
    youReceive:"Otrzymasz",
    rate:"Kurs:", create:"Utwórz zgłoszenie",
    rulesTitle:"Warunki wymiany",
    faqTitle:"FAQ",
    accTitle:"Konto",
    accText:"Logowanie/rejestracja i KYC (jeszcze nie podłączone).",
    login:"Zaloguj", reg:"Rejestracja",
    pickGive:"Wybierz co dajesz",
    pickGet:"Wybierz co otrzymujesz",
    pickNet:"Wybierz sieć",
    failed:"Nie udało się pobrać kursu",
    rulesT1:"Czas realizacji",
    rulesB1:"Zwykle do <b>40 minut</b>.",
    rulesB1b:"W rzadkich przypadkach — do <b>72 godzin</b>.",
    rulesT2:"Blokada kursu",
    rulesB2:"Kurs jest blokowany w momencie utworzenia zgłoszenia.",
    rulesT3:"Kontakt w Telegramie",
    rulesB3:"Podaj swój Telegram do kontaktu.",
    rulesT4:"Potwierdzenie",
    rulesB4:"Operator potwierdzi dane i kwotę.",
    faqQ1:"Kiedy kurs jest blokowany?",
    faqA1:"Po utworzeniu zgłoszenia.",
    faqQ2:"Ile trwa wymiana?",
    faqA2:"Zwykle do 40 minut.",
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
    } catch {
      resolve(null);
    }
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
    } catch {
      resolve(false);
    }
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

const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",
  getAsset: BANKS[1],
  giveAmount: 1000,
  rate: null,
  picking: null,
};

// ======= Init =======
function init(){
  try { TG?.ready?.(); TG?.expand?.(); } catch {}

  setAssetUI("give", state.giveAsset);
  setNetworkUI(state.giveNet);
  setAssetUI("get", state.getAsset);
  $("giveAmount").value = String(state.giveAmount);

  tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      showView(btn.dataset.tab);
    });
  });

  $("giveAssetBtn").addEventListener("click", ()=> openAssetPicker("giveAsset"));
  $("getAssetBtn").addEventListener("click", ()=> openAssetPicker("getAsset"));
  $("giveNetBtn").addEventListener("click", ()=> openNetworkPicker());

  $("swapBtn").addEventListener("click", onSwap);

  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat(($("giveAmount").value || "0").replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  $("createBtn").addEventListener("click", ()=>{
    alert("Request: " + state.giveAmount + " " + state.giveAsset.code + " ("+state.giveNet+") → " + state.getAsset.name);
  });

  $("langBtn").addEventListener("click", (e)=> {
    e.stopPropagation();
    $("langMenu").classList.toggle("hidden");
  });

  document.addEventListener("click", ()=>{
    $("langMenu").classList.add("hidden");
  });

  document.querySelectorAll(".pill[data-lang]").forEach(p=>{
    p.addEventListener("click", async (e)=>{
      e.stopPropagation();
      await setLangEverywhere(p.dataset.lang);
      $("langMenu").classList.add("hidden");
    });
  });

  $("assetClose").addEventListener("click", closeAssetPicker);
  $("assetModal").addEventListener("click", (e)=>{
    if(e.target.id === "assetModal") closeAssetPicker();
  });

  $("netClose").addEventListener("click", closeNetworkPicker);
  $("netModal").addEventListener("click", (e)=>{
    if(e.target.id === "netModal") closeNetworkPicker();
  });

  initLanguage().then(()=>{
    applyLang();
    recalc();
  });
}

async function setLangEverywhere(v) {
  lang = v;
  setLocalLang(v);
  await tgSetItem(LANG_KEY, v);
  $("langLabel").textContent = (v === "uk" ? "UA" : v.toUpperCase());
  applyLang();
  recalc();
}

async function initLanguage(){
  $("langLabel").textContent = (lang === "uk" ? "UA" : lang.toUpperCase());

  const cloud = await tgGetItem(LANG_KEY);
  if (cloud && I18N[cloud]) {
    await setLangEverywhere(cloud);
    return;
  }

  const local = getLocalLang();
  if (local && I18N[local]) {
    lang = local;
    return;
  }

  const mapped = mapTgLang(TG?.initDataUnsafe?.user?.language_code);
  if (mapped && I18N[mapped]) {
    await setLangEverywhere(mapped);
    return;
  }
}

function showView(key){
  Object.values(views).forEach(v=>v.classList.remove("active"));
  views[key].classList.add("active");
}

function setHTML(id, html){
  const el = $(id);
  if(!el) return;
  el.innerHTML = html;
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

  // Rules / FAQ full i18n (fix)
  if($("rulesT1")) $("rulesT1").textContent = t.rulesT1;
  if($("rulesT2")) $("rulesT2").textContent = t.rulesT2;
  if($("rulesT3")) $("rulesT3").textContent = t.rulesT3;
  if($("rulesT4")) $("rulesT4").textContent = t.rulesT4;

  setHTML("rulesB1", t.rulesB1);
  setHTML("rulesB1b", t.rulesB1b);
  setHTML("rulesB2", t.rulesB2);
  setHTML("rulesB3", t.rulesB3);
  setHTML("rulesB4", t.rulesB4);

  if($("faqQ1")) $("faqQ1").textContent = t.faqQ1;
  if($("faqA1")) $("faqA1").textContent = t.faqA1;
  if($("faqQ2")) $("faqQ2").textContent = t.faqQ2;
  if($("faqA2")) $("faqA2").textContent = t.faqA2;
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

function onSwap(){
  const a = state.giveAsset;
  const b = state.getAsset;

  state.giveAsset = b;
  state.getAsset = a;

  if(state.giveAsset.type === "crypto"){
    const nets = state.giveAsset.networks || [];
    state.giveNet = nets.includes(state.giveNet) ? state.giveNet : (nets[0] || "TRC20");
    setNetworkUI(state.giveNet);
    $("giveNetBtn").style.display = "flex";
  } else {
    $("giveNetBtn").style.display = "none";
  }

  setAssetUI("give", state.giveAsset);
  setAssetUI("get", state.getAsset);

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

// ======= Asset picker (banks + crypto in BOTH) =======
function openAssetPicker(which){
  state.picking = which;
  $("assetModal").classList.remove("hidden");

  const t = I18N[lang] || I18N.uk;
  $("assetTitle").textContent = which === "giveAsset" ? t.pickGive : t.pickGet;

  const list = $("assetList");
  list.innerHTML = "";

  const items = [...CRYPTO, ...BANKS];

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

    btn.appendChild(left);

    btn.addEventListener("click", ()=>{
      if(which === "giveAsset"){
        state.giveAsset = it;
        setAssetUI("give", it);

        if(it.type === "crypto"){
          const nets = it.networks || [];
          state.giveNet = nets[0] || "TRC20";
          setNetworkUI(state.giveNet);
          $("giveNetBtn").style.display = "flex";
        } else {
          $("giveNetBtn").style.display = "none";
        }
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

  const t = I18N[lang] || I18N.uk;
  $("netTitle").textContent = t.pickNet;

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

document.addEventListener("DOMContentLoaded", init);
