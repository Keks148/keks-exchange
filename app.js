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

const CRYPTO = [
  { id:"usdt", name:"Tether (USDT)", code:"USDT", icon:"logos/crypto/tether-usdt.png", type:"crypto",
    networks:["TRC20","ERC20","BEP20","ARB","POL","SOL","OP"]
  },
  { id:"usdc", name:"USD Coin (USDC)", code:"USDC", icon:"logos/crypto/usdc.png", type:"crypto",
    networks:["ERC20","BEP20","ARB","POL","SOL","OP"]
  },
  { id:"btc", name:"Bitcoin (BTC)", code:"BTC", icon:"logos/crypto/btc.png", type:"crypto", networks:["BTC"] },
  { id:"eth", name:"Ethereum (ETH)", code:"ETH", icon:"logos/crypto/eth.png", type:"crypto", networks:["ERC20","ARB","OP"] },
  { id:"ltc", name:"Litecoin (LTC)", code:"LTC", icon:"logos/crypto/ltc.png", type:"crypto", networks:["LTC"] },
  { id:"sol", name:"Solana (SOL)", code:"SOL", icon:"logos/crypto/sol.png", type:"crypto", networks:["SOL"] },
  { id:"ton", name:"Toncoin (TON)", code:"TON", icon:"logos/crypto/ton.png", type:"crypto", networks:["TON"] },
  { id:"trx", name:"TRON (TRX)", code:"TRX", icon:"logos/crypto/trx.png", type:"crypto", networks:["TRX"] },
];

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

const I18N = {
  uk: {
    tabSwap:"Обмін", tabRules:"Правила", tabFaq:"FAQ", tabAccount:"Акаунт",
    give:"Віддаєте", get:"Отримуєте",
    youReceive:"Ви отримаєте",
    rate:"Курс:", create:"Створити заявку",
    rulesTitle:"Умови обміну", faqTitle:"FAQ",
    accTitle:"Акаунт", accText:"Тут буде вхід/реєстрація та KYC (поки без підключення).",
    login:"Увійти", reg:"Реєстрація",
    pickGive:"Виберіть що віддаєте",
    pickGet:"Виберіть що отримуєте",
    netTitle:"Оберіть мережу",
    rateLoading:"Оновлюю курс з WhiteBIT…",
    rateNoPair:"Немає пари на WhiteBIT",
  },
  en: {
    tabSwap:"Swap", tabRules:"Rules", tabFaq:"FAQ", tabAccount:"Account",
    give:"You give", get:"You get",
    youReceive:"You will receive",
    rate:"Rate:", create:"Create request",
    rulesTitle:"Exchange terms", faqTitle:"FAQ",
    accTitle:"Account", accText:"Login/registration & KYC (not connected yet).",
    login:"Login", reg:"Sign up",
    pickGive:"Choose what you give",
    pickGet:"Choose what you get",
    netTitle:"Choose network",
    rateLoading:"Updating rate from WhiteBIT…",
    rateNoPair:"No pair on WhiteBIT",
  },
  pl: {
    tabSwap:"Wymiana", tabRules:"Zasady", tabFaq:"FAQ", tabAccount:"Konto",
    give:"Dajesz", get:"Otrzymujesz",
    youReceive:"Otrzymasz",
    rate:"Kurs:", create:"Utwórz zgłoszenie",
    rulesTitle:"Warunki wymiany", faqTitle:"FAQ",
    accTitle:"Konto", accText:"Logowanie/rejestracja i KYC (jeszcze nie podłączone).",
    login:"Zaloguj", reg:"Rejestracja",
    pickGive:"Wybierz co dajesz",
    pickGet:"Wybierz co otrzymujesz",
    netTitle:"Wybierz sieć",
    rateLoading:"Aktualizuję kurs z WhiteBIT…",
    rateNoPair:"Brak pary na WhiteBIT",
  }
};

const $ = (id) => document.getElementById(id);
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

let lang = getLocalLang() || "uk";

const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",
  getAsset: BANKS[1],
  giveAmount: 1000,
  rate: null,
  picking: null,
};

const wb = { last: new Map(), timer: null, inFlight: false };

async function fetchWhitebitTickerAll() {
  if (wb.inFlight) return;
  wb.inFlight = true;
  try {
    const r = await fetch("https://whitebit.com/api/v4/public/ticker", { method: "GET" });
    const data = await r.json();
    if (data && typeof data === "object") {
      for (const [market, info] of Object.entries(data)) {
        const lp = info?.last_price ?? info?.last ?? info?.lastPrice;
        if (lp != null) wb.last.set(market, Number(lp));
      }
    }
  } catch (e) {
    // ignore
  } finally {
    wb.inFlight = false;
  }
}

function startWhitebitAuto() {
  fetchWhitebitTickerAll().then(recalc);
  if (wb.timer) clearInterval(wb.timer);
  wb.timer = setInterval(async () => {
    await fetchWhitebitTickerAll();
    recalc();
  }, 60_000);
}

function getRateFromWhitebit(give, get) {
  const giveCode = give.code;
  const getCode = get.code;

  const price = (a, b) => {
    const m1 = `${a}_${b}`;
    const m2 = `${b}_${a}`;
    if (wb.last.has(m1)) return { p: wb.last.get(m1), inv: false };
    if (wb.last.has(m2) && wb.last.get(m2) !== 0) return { p: wb.last.get(m2), inv: true };
    return null;
  };

  if (give.type === "crypto" && get.type === "bank") {
    const pr = price(giveCode, "UAH");
    if (!pr) return null;
    return pr.inv ? (1 / pr.p) : pr.p;
  }

  if (give.type === "bank" && get.type === "crypto") {
    const pr = price(getCode, "UAH");
    if (!pr) return null;
    const crypto_uah = pr.inv ? (1 / pr.p) : pr.p;
    if (!crypto_uah) return null;
    return 1 / crypto_uah;
  }

  if (give.type === "crypto" && get.type === "crypto") {
    const pr = price(giveCode, getCode);
    if (!pr) return null;
    return pr.inv ? (1 / pr.p) : pr.p;
  }

  return null;
}

function format(n){
  if(!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {maximumFractionDigits: 6});
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
  $("giveNetBtn").style.display = (state.giveAsset.type === "crypto") ? "flex" : "none";
}

function recalc(){
  const t = I18N[lang] || I18N.uk;

  if (wb.last.size === 0) {
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    $("rateHint").textContent = t.rateLoading;
    return;
  }

  const r = getRateFromWhitebit(state.giveAsset, state.getAsset);
  state.rate = r;

  if(!state.rate || !isFinite(state.rate)){
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    $("rateHint").textContent = t.rateNoPair;
    return;
  }

  const res = state.giveAmount * state.rate;
  $("resultValue").textContent = format(res);
  $("rateValue").textContent = format(state.rate);
  $("rateHint").textContent = "WhiteBIT";
}

function onSwap(){
  const oldGive = state.giveAsset;
  const oldGet = state.getAsset;

  state.giveAsset = oldGet;
  state.getAsset = oldGive;

  if(state.giveAsset.type === "crypto"){
    const nets = state.giveAsset.networks || [];
    state.giveNet = nets.includes(state.giveNet) ? state.giveNet : (nets[0] || "TRC20");
  }

  setAssetUI("give", state.giveAsset);
  setNetworkUI(state.giveNet);
  setAssetUI("get", state.getAsset);

  recalc();
}

/* MODALS */
function closeAssetPicker(){
  $("assetModal").classList.add("hidden");
  state.picking = null;
}
function closeNetworkPicker(){
  $("netModal").classList.add("hidden");
}
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
        }
        setNetworkUI(state.giveNet);
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

function openNetworkPicker(){
  if(state.giveAsset.type !== "crypto") return;

  $("netModal").classList.remove("hidden");

  const t = I18N[lang] || I18N.uk;
  $("netTitle").textContent = t.netTitle;

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

/* LANG MENU */
function isLangMenuOpen(){ return !$("langMenu").classList.contains("hidden"); }
function closeLangMenu(){
  $("langMenu").classList.add("hidden");
  $("langMenu").setAttribute("aria-hidden","true");
}
function openLangMenu(){
  $("langMenu").classList.remove("hidden");
  $("langMenu").setAttribute("aria-hidden","false");
}
function toggleLangMenu(){ isLangMenuOpen() ? closeLangMenu() : openLangMenu(); }

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
  if (cloud && I18N[cloud]) { await setLangEverywhere(cloud); return; }

  const local = getLocalLang();
  if (local && I18N[local]) { lang = local; return; }

  const mapped = mapTgLang(TG?.initDataUnsafe?.user?.language_code);
  if (mapped && I18N[mapped]) { await setLangEverywhere(mapped); return; }

  await setLangEverywhere("uk");
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
}

/* VIEWS */
const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};
const tabs = Array.from(document.querySelectorAll(".tab"));
function showView(key){
  Object.values(views).forEach(v=>v.classList.remove("active"));
  views[key].classList.add("active");
}

/* INIT */
function init(){
  try { TG?.ready?.(); TG?.expand?.(); } catch {}

  // FORCE CLOSE ON START (fix “ничего не кликается”)
  closeAssetPicker();
  closeNetworkPicker();
  closeLangMenu();

  setAssetUI("give", state.giveAsset);
  setNetworkUI(state.giveNet);
  setAssetUI("get", state.getAsset);
  $("giveAmount").value = String(state.giveAmount);

  tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      showView(btn.dataset.tab);
      closeLangMenu();
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
    alert("Заявка створена (демо).");
  });

  $("langBtn").addEventListener("click", (e)=>{
    e.stopPropagation();
    toggleLangMenu();
  });

  document.addEventListener("click", (e)=>{
    if (!isLangMenuOpen()) return;
    const menu = $("langMenu");
    const btn = $("langBtn");
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeLangMenu();
  });

  document.querySelectorAll(".pill[data-lang]").forEach(p=>{
    p.addEventListener("click", async (e)=>{
      e.stopPropagation();
      await setLangEverywhere(p.dataset.lang);
      closeLangMenu();
    });
  });

  $("assetClose").addEventListener("click", closeAssetPicker);
  $("netClose").addEventListener("click", closeNetworkPicker);

  // close on backdrop click + touch
  const closeOnBackdrop = (modalId, closeFn) => (e)=>{
    if (e.target && e.target.id === modalId) closeFn();
  };
  $("assetModal").addEventListener("click", closeOnBackdrop("assetModal", closeAssetPicker));
  $("netModal").addEventListener("click", closeOnBackdrop("netModal", closeNetworkPicker));
  $("assetModal").addEventListener("touchstart", closeOnBackdrop("assetModal", closeAssetPicker), {passive:true});
  $("netModal").addEventListener("touchstart", closeOnBackdrop("netModal", closeNetworkPicker), {passive:true});

  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") { closeLangMenu(); closeAssetPicker(); closeNetworkPicker(); }
  });

  initLanguage().then(()=>{
    applyLang();
    startWhitebitAuto();
  });
}

document.addEventListener("DOMContentLoaded", init);
