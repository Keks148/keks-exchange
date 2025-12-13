/* =========================
   KeksSwap — app.js
   - без “оверлея”, который ломает клики
   - одна кнопка языка (dropdown)
   - корректные пути к логотипам
   - полный список (добавляй сколько хочешь)
========================= */

const state = {
  lang: "UA",
  tab: "exchange",
  give: { type: "bank", key: "privat", amount: 100 },
  get:  { type: "crypto", key: "btc",  amount: 0 },
  modal: { open:false, mode:"give", query:"" }
};

// === ПУТИ К ЛОГО ===
// ВАЖНО: у тебя структура такая:
// logos/banks/*.png
// logos/crypto/*.png
// logos/wallets/*.png
// + logo.png в корне (или замени на свой файл)
const PATHS = {
  brandLogo: "logo.png", // если у тебя другое имя — поменяй тут
  banks:   "logos/banks/",
  crypto:  "logos/crypto/",
  wallets: "logos/wallets/",
};

// === ДАННЫЕ ===
// Добавил сразу “полный норм список” под твои файлы, которые видно на скринах.
// Если у тебя есть ещё — просто допиши объект.
const BANKS = {
  privat:   { name:{UA:"ПриватБанк", EN:"PrivatBank", PL:"PrivatBank"}, code:"UAH", logo:"privat.png" },
  mono:     { name:{UA:"Monobank", EN:"Monobank", PL:"Monobank"}, code:"UAH", logo:"mono.png" },
  oschad:   { name:{UA:"Ощадбанк", EN:"Oschadbank", PL:"Oschadbank"}, code:"UAH", logo:"oschad.png" },
  pumb:     { name:{UA:"ПУМБ", EN:"PUMB", PL:"PUMB"}, code:"UAH", logo:"pumb.png" },
  abank:    { name:{UA:"A-Bank", EN:"A-Bank", PL:"A-Bank"}, code:"UAH", logo:"a-bank.png" },
  sense:    { name:{UA:"Sense Bank", EN:"Sense Bank", PL:"Sense Bank"}, code:"UAH", logo:"sense.png" },
  otp:      { name:{UA:"OTP Bank", EN:"OTP Bank", PL:"OTP Bank"}, code:"UAH", logo:"otp.png" },
  ukrsib:   { name:{UA:"Укрсиббанк", EN:"UkrSibbank", PL:"UkrSibbank"}, code:"UAH", logo:"ukr-sib.png" },
  ukrbanki: { name:{UA:"Укрбанкi", EN:"UkrBanki", PL:"UkrBanki"}, code:"UAH", logo:"ukr-banki.png" },
  izi:      { name:{UA:"izibank", EN:"izibank", PL:"izibank"}, code:"UAH", logo:"izi.png" },
  reif:     { name:{UA:"Raiffeisen", EN:"Raiffeisen", PL:"Raiffeisen"}, code:"UAH", logo:"reyf.png" },
  visam:    { name:{UA:"Visa/Mastercard", EN:"Visa/Mastercard", PL:"Visa/Mastercard"}, code:"UAH", logo:"visa-master.png" },
};

const CRYPTO = {
  btc:   { name:{UA:"Bitcoin", EN:"Bitcoin", PL:"Bitcoin"}, code:"BTC", logo:"btc.png" },
  eth:   { name:{UA:"Ethereum", EN:"Ethereum", PL:"Ethereum"}, code:"ETH", logo:"eth.png" },
  ltc:   { name:{UA:"Litecoin", EN:"Litecoin", PL:"Litecoin"}, code:"LTC", logo:"ltc.png" },
  sol:   { name:{UA:"Solana", EN:"Solana", PL:"Solana"}, code:"SOL", logo:"sol.png" },
  ton:   { name:{UA:"TON", EN:"TON", PL:"TON"}, code:"TON", logo:"ton.png" },
  trx:   { name:{UA:"TRON", EN:"TRON", PL:"TRON"}, code:"TRX", logo:"trx.png" },

  usdt:  { name:{UA:"Tether", EN:"Tether", PL:"Tether"}, code:"USDT", logo:"tether-usdt.png" },
  usdt_trc:{ name:{UA:"Tether (TRC20)", EN:"Tether (TRC20)", PL:"Tether (TRC20)"}, code:"USDT", logo:"usdt-trc.png" },
  usdt_eth:{ name:{UA:"Tether (ERC20)", EN:"Tether (ERC20)", PL:"Tether (ERC20)"}, code:"USDT", logo:"usdt-eth.png" },
  usdt_bep:{ name:{UA:"Tether (BEP20)", EN:"Tether (BEP20)", PL:"Tether (BEP20)"}, code:"USDT", logo:"usdt-bep.png" },
  usdt_pol:{ name:{UA:"Tether (Polygon)", EN:"Tether (Polygon)", PL:"Tether (Polygon)"}, code:"USDT", logo:"usdt-pol.png" },
  usdt_sol:{ name:{UA:"Tether (Solana)", EN:"Tether (Solana)", PL:"Tether (Solana)"}, code:"USDT", logo:"usdt-sol.png" },
  usdt_arb:{ name:{UA:"Tether (Arbitrum)", EN:"Tether (Arbitrum)", PL:"Tether (Arbitrum)"}, code:"USDT", logo:"usdt-arb.png" },

  usdc_eth:{ name:{UA:"USD Coin (ETH)", EN:"USD Coin (ETH)", PL:"USD Coin (ETH)"}, code:"USDC", logo:"usdc-eth.png" },
  usdc_pol:{ name:{UA:"USD Coin (Polygon)", EN:"USD Coin (Polygon)", PL:"USD Coin (Polygon)"}, code:"USDC", logo:"usdc-pol.png" },
  usdc_sol:{ name:{UA:"USD Coin (Solana)", EN:"USD Coin (Solana)", PL:"USD Coin (Solana)"}, code:"USDC", logo:"usdc-sol.png" },
};

const WALLET = {
  paypal:   { name:{UA:"PayPal", EN:"PayPal", PL:"PayPal"}, code:"USD", logo:"paypal.png" },
  payoneer: { name:{UA:"Payoneer", EN:"Payoneer", PL:"Payoneer"}, code:"USD", logo:"payoneer.png" },
  revolut:  { name:{UA:"Revolut", EN:"Revolut", PL:"Revolut"}, code:"EUR", logo:"revolut.png" },
  vise:     { name:{UA:"Vise", EN:"Vise", PL:"Vise"}, code:"USD", logo:"vise.png" },
  valet:    { name:{UA:"Valet", EN:"Valet", PL:"Valet"}, code:"USD", logo:"valet.png" },
};

const I18N = {
  UA: { tab_exchange:"Обмін", tab_rules:"Правила", tab_account:"Акаунт", tab_more:"Ще",
        give:"Віддаєте", get:"Отримуєте", rate:"Курс", create:"Створити заявку",
        account_title:"Акаунт", login:"Увійти", register:"Реєстрація", placeholder:"0",
        choose_give:"Вибір (віддаєте)", choose_get:"Вибір (отримуєте)", search:"Пошук..." },
  EN: { tab_exchange:"Exchange", tab_rules:"Rules", tab_account:"Account", tab_more:"More",
        give:"You give", get:"You get", rate:"Rate", create:"Create request",
        account_title:"Account", login:"Login", register:"Register", placeholder:"0",
        choose_give:"Choose (give)", choose_get:"Choose (get)", search:"Search..." },
  PL: { tab_exchange:"Wymiana", tab_rules:"Zasady", tab_account:"Konto", tab_more:"Więcej",
        give:"Oddajesz", get:"Otrzymujesz", rate:"Kurs", create:"Utwórz zgłoszenie",
        account_title:"Konto", login:"Zaloguj", register:"Rejestracja", placeholder:"0",
        choose_give:"Wybór (oddajesz)", choose_get:"Wybór (otrzymujesz)", search:"Szukaj..." },
};

function t(key){ return I18N[state.lang][key] || key; }
function byLang(obj){ return obj?.[state.lang] || obj?.UA || ""; }

function el(id){ return document.getElementById(id); }

function getCatalog(type){
  if(type==="bank") return BANKS;
  if(type==="crypto") return CRYPTO;
  return WALLET;
}
function getPath(type){
  if(type==="bank") return PATHS.banks;
  if(type==="crypto") return PATHS.crypto;
  return PATHS.wallets;
}
function getItem(type, key){
  const cat = getCatalog(type);
  return cat[key];
}

function setSafeText(node, text){ node.textContent = text; }

function render(){
  // header logo
  const brandLogo = document.querySelector(".brand-logo");
  if(brandLogo) brandLogo.src = PATHS.brandLogo;

  // tabs
  setSafeText(el("tabExchange"), t("tab_exchange"));
  setSafeText(el("tabRules"), t("tab_rules"));
  setSafeText(el("tabAccount"), t("tab_account"));
  setSafeText(el("tabMore"), t("tab_more"));

  document.querySelectorAll(".tab").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.tab === state.tab);
  });

  // lang button text
  setSafeText(el("langBtnText"), state.lang);

  // exchange labels
  setSafeText(el("lblGive"), t("give"));
  setSafeText(el("lblGet"), t("get"));
  setSafeText(el("lblRate"), t("rate"));
  setSafeText(el("btnCreate"), t("create"));

  // account page
  setSafeText(el("accountTitle"), t("account_title"));
  setSafeText(el("btnLogin"), t("login"));
  setSafeText(el("btnRegister"), t("register"));

  // exchange selected
  const giveItem = getItem(state.give.type, state.give.key);
  const getItemObj = getItem(state.get.type, state.get.key);

  // names
  setSafeText(el("giveName"), byLang(giveItem.name));
  setSafeText(el("giveSub"), giveItem.code);

  setSafeText(el("getName"), byLang(getItemObj.name));
  setSafeText(el("getSub"), getItemObj.code);

  // logos
  el("giveLogo").src = getPath(state.give.type) + giveItem.logo;
  el("getLogo").src  = getPath(state.get.type) + getItemObj.logo;

  // amount inputs
  el("giveAmount").value = state.give.amount ?? "";
  el("giveAmount").placeholder = t("placeholder");

  // demo rate (потом подключим API)
  const rate = calcFakeRate(state.give.key, state.get.key);
  const getAmount = (Number(state.give.amount||0) * rate);
  state.get.amount = isFinite(getAmount) ? getAmount : 0;

  el("getAmount").value = formatAmount(state.get.amount, state.get.key);
  el("getAmount").placeholder = t("placeholder");

  // rate string
  el("rateText").textContent = `1 UAH ≈ ${formatAmount(rate, state.get.key)} ${getItemObj.code}`;

  // pages
  document.querySelectorAll("[data-page]").forEach(p=>{
    p.style.display = (p.dataset.page === state.tab) ? "block" : "none";
  });

  // modal
  renderModal();
}

function formatAmount(val, key){
  const n = Number(val||0);
  if(!isFinite(n)) return "0";
  // крипта — больше знаков, фиат — меньше
  if(key.includes("usdt") || key.includes("usdc")) return n.toFixed(2);
  if(key==="btc" || key==="eth" || key==="ltc" || key==="sol" || key==="ton" || key==="trx") return n.toFixed(8);
  return n.toFixed(2);
}

// простой демо-курс (потом поменяем на настоящий)
function calcFakeRate(giveKey, getKey){
  // give всегда UAH в демо
  const base = {
    btc: 0.00000000625,
    eth: 0.00000010,
    ltc: 0.0000030,
    sol: 0.000035,
    ton: 0.00028,
    trx: 0.016,
    usdt: 0.025,
    usdt_trc:0.025,
    usdt_eth:0.025,
    usdt_bep:0.025,
    usdt_pol:0.025,
    usdt_sol:0.025,
    usdt_arb:0.025,
    usdc_eth:0.025,
    usdc_pol:0.025,
    usdc_sol:0.025
  };
  return base[getKey] ?? 0.01;
}

/* =========================
   EVENTS
========================= */

function bind(){
  // tabs
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.tab = btn.dataset.tab;
      render();
    });
  });

  // language dropdown
  el("langBtn").addEventListener("click", ()=>{
    el("langMenu").classList.toggle("open");
  });
  document.addEventListener("click", (e)=>{
    const box = document.querySelector(".lang");
    if(!box) return;
    if(!box.contains(e.target)) el("langMenu").classList.remove("open");
  });
  document.querySelectorAll(".lang-item").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.lang = b.dataset.lang;
      el("langMenu").classList.remove("open");
      render();
    });
  });

  // open modal (give/get)
  el("giveSelect").addEventListener("click", ()=>{
    openModal("give");
  });
  el("getSelect").addEventListener("click", ()=>{
    openModal("get");
  });

  // swap
  el("swapBtn").addEventListener("click", ()=>{
    const tmp = { ...state.give };
    state.give = { type: state.get.type, key: state.get.key, amount: state.give.amount };
    state.get  = { type: tmp.type, key: tmp.key, amount: state.get.amount };
    render();
  });

  // input
  el("giveAmount").addEventListener("input", ()=>{
    const v = String(el("giveAmount").value).replace(/[^\d.,]/g,"").replace(",",".");
    state.give.amount = v === "" ? "" : Number(v);
    render();
  });

  // modal
  el("modalClose").addEventListener("click", closeModal);
  el("modalSearch").addEventListener("input", ()=>{
    state.modal.query = el("modalSearch").value.trim().toLowerCase();
    renderModal();
  });

  // create request (demo)
  el("btnCreate").addEventListener("click", ()=>{
    alert("Заявка створена (демо). Далі додамо реквізити/чат/статуси.");
  });

  // account buttons demo
  el("btnLogin").addEventListener("click", ()=> alert("Login (demo)"));
  el("btnRegister").addEventListener("click", ()=> alert("Register (demo)"));
}

function openModal(mode){
  state.modal.open = true;
  state.modal.mode = mode;
  state.modal.query = "";
  el("modalSearch").value = "";
  renderModal();
}

function closeModal(){
  state.modal.open = false;
  renderModal();
}

function renderModal(){
  const modal = el("modal");
  if(!modal) return;

  modal.classList.toggle("open", state.modal.open);

  if(!state.modal.open) return;

  const isGive = state.modal.mode === "give";
  const currentType = isGive ? state.give.type : state.get.type;

  // В ЭТОЙ ВЕРСИИ:
  // give = только банки (пока)
  // get  = только крипта (пока)
  const type = isGive ? "bank" : "crypto";
  const cat = getCatalog(type);

  el("modalTitle").textContent = isGive ? t("choose_give") : t("choose_get");
  el("modalSearch").placeholder = t("search");

  const q = state.modal.query;
  const list = el("modalList");
  list.innerHTML = "";

  Object.entries(cat).forEach(([key, item])=>{
    const title = byLang(item.name);
    const sub = item.code;

    if(q){
      const hay = (title + " " + sub + " " + key).toLowerCase();
      if(!hay.includes(q)) return;
    }

    const row = document.createElement("div");
    row.className = "item";

    const left = document.createElement("div");
    left.className = "item-left";

    const ic = document.createElement("div");
    ic.className = "icon";
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = getPath(type) + item.logo;
    img.onerror = ()=>{ img.remove(); ic.textContent = "•"; };
    ic.appendChild(img);

    const txt = document.createElement("div");
    txt.style.minWidth = "0";

    const t1 = document.createElement("div");
    t1.className = "item-title";
    t1.textContent = title;

    const t2 = document.createElement("div");
    t2.className = "item-sub";
    t2.textContent = sub;

    txt.appendChild(t1);
    txt.appendChild(t2);

    left.appendChild(ic);
    left.appendChild(txt);

    row.appendChild(left);

    row.addEventListener("click", ()=>{
      if(isGive){
        state.give.type = "bank";
        state.give.key = key;
      } else {
        state.get.type = "crypto";
        state.get.key = key;
      }
      closeModal();
      render();
    });

    list.appendChild(row);
  });
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", ()=>{
  // НУЖНЫЕ ЭЛЕМЕНТЫ должны быть в index.html:
  // ids:
  // tabExchange tabRules tabAccount tabMore
  // langBtn langBtnText langMenu (items with class=lang-item data-lang)
  // lblGive lblGet lblRate rateText
  // giveSelect giveLogo giveName giveSub giveAmount
  // getSelect getLogo getName getSub getAmount
  // swapBtn btnCreate
  // modal modalTitle modalClose modalSearch modalList
  // accountTitle btnLogin btnRegister
  bind();
  render();
});
