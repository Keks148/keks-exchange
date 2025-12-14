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
// Сети можно расширять, это “твоя матрица” (позже подтянешь с биржи)
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

// Network icons (твои файлы: logos/networks/*.png)
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

// ======= Translations (минимум, расширишь) =======
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
  }
};

let lang = "uk";

// ======= UI refs =======
const $ = (id) => document.getElementById(id);

const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};

const tabs = Array.from(document.querySelectorAll(".tab"));

const state = {
  giveAsset: CRYPTO[0],  // USDT
  giveNet: "TRC20",
  getAsset: BANKS[1],   // Monobank
  giveAmount: 1000,
  rate: null,
  lockSeconds: 180,
  lockTimerId: null,
  picking: null, // "giveAsset" | "getAsset"
};

// ======= Init =======
function init(){
  // set defaults icons/text
  setAssetUI("give", state.giveAsset);
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

  // open modals
  $("giveAssetBtn").addEventListener("click", ()=> openAssetPicker("giveAsset"));
  $("getAssetBtn").addEventListener("click", ()=> openAssetPicker("getAsset"));
  $("giveNetBtn").addEventListener("click", ()=> openNetworkPicker());

  // swap
  $("swapBtn").addEventListener("click", onSwap);

  // amount change
  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat(($("giveAmount").value || "0").replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  // create request
  $("createBtn").addEventListener("click", ()=>{
    alert("Заявка: " + state.giveAmount + " " + state.giveAsset.code + " ("+state.giveNet+") → " + state.getAsset.name);
  });

  // language
  $("langBtn").addEventListener("click", ()=> $("langMenu").classList.remove("hidden"));
  $("langClose").addEventListener("click", ()=> $("langMenu").classList.add("hidden"));
  $("langMenu").addEventListener("click", (e)=>{
    if(e.target.id === "langMenu") $("langMenu").classList.add("hidden");
  });
  document.querySelectorAll(".pill").forEach(p=>{
    p.addEventListener("click", ()=>{
      lang = p.dataset.lang;
      $("langLabel").textContent = (lang==="uk"?"UA":lang.toUpperCase());
      $("langMenu").classList.add("hidden");
      applyLang();
    });
  });

  // modals close
  $("assetClose").addEventListener("click", closeAssetPicker);
  $("assetModal").addEventListener("click", (e)=>{
    if(e.target.id === "assetModal") closeAssetPicker();
  });

  $("netClose").addEventListener("click", closeNetworkPicker);
  $("netModal").addEventListener("click", (e)=>{
    if(e.target.id === "netModal") closeNetworkPicker();
  });

  // start lock timer
  startLockTimer();

  applyLang();
  recalc();
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
  $("rateStatus").textContent = state.rate ? "" : t.rateUnavailable;
  $("rateLockedLabel").textContent = t.locked;
  $("createBtn").textContent = t.create;

  $("rulesTitle").textContent = t.rulesTitle;
  $("faqTitle").textContent = t.faqTitle;
  $("accTitle").textContent = t.accTitle;
  $("accText").textContent = t.accText;
  $("btnLogin").textContent = t.login;
  $("btnReg").textContent = t.reg;
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
  // swap: crypto <-> bank, keep amount
  const oldGive = state.giveAsset;
  const oldGet = state.getAsset;

  // если слева крипта, справа банк -> меняем местами
  state.giveAsset = oldGet.type === "bank" ? CRYPTO[0] : oldGet; // защитный
  state.getAsset = oldGive.type === "crypto" ? BANKS[1] : oldGive; // защитный

  // если слева стало крипто — сеть подставим
  if(state.giveAsset.type === "crypto"){
    const nets = state.giveAsset.networks || [];
    state.giveNet = nets.includes(state.giveNet) ? state.giveNet : (nets[0] || "TRC20");
    setNetworkUI(state.giveNet);
  }

  setAssetUI("give", state.giveAsset.type === "crypto" ? state.giveAsset : CRYPTO[0]);
  setAssetUI("get", state.getAsset.type === "bank" ? state.getAsset : BANKS[1]);

  // Здесь оставляем твою логику: обмен всегда crypto->UAH или UAH->crypto
  // Если хочешь — сделаю реальный “swap” по правилам пары.

  recalc();
}

function recalc(){
  // Тут потом подключим WhiteBIT и расчет твоей маржи.
  // Сейчас просто выводим "—" пока нет курса.

  if(!state.rate){
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    $("rateHint").textContent = "Failed to fetch";
    return;
  }

  // пример: если give crypto -> UAH
  // result = amount * rate
  const res = state.giveAmount * state.rate;
  $("resultValue").textContent = format(res);
  $("rateValue").textContent = format(state.rate);
  $("rateHint").textContent = "";
}

function format(n){
  if(!isFinite(n)) return "—";
  return n.toLocaleString(undefined, {maximumFractionDigits: 6});
}

// ======= Asset picker (no search) =======
function openAssetPicker(which){
  state.picking = which;
  $("assetModal").classList.remove("hidden");

  const title = which === "giveAsset" ? (lang==="en"?"Choose what you give":"Виберіть що віддаєте")
                                     : (lang==="en"?"Choose what you get":"Виберіть що отримуєте");
  $("assetTitle").textContent = title;

  const list = $("assetList");
  list.innerHTML = "";

  const items = (which === "giveAsset") ? CRYPTO : BANKS;

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

    btn.addEventListener("click", ()=>{
      if(which === "giveAsset"){
        state.giveAsset = it;
        setAssetUI("give", it);

        // сеть показываем только для крипты
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
      // тут позже: авто-обновление курса
    } else {
      $("lockTimer").textContent = state.lockSeconds + "s";
    }
  }, 1000);
}

// Boot
document.addEventListener("DOMContentLoaded", init);
