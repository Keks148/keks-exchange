/* KeksSwap demo frontend
 * - UI tabs
 * - language switch (one button)
 * - bottom-sheet selector with search + types
 * - swap assets + amounts
 * - mock rate + calc
 */

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ========= DATA ========= */

const ASSETS = {
  banks: [
    { id: "monobank_uah", name: "Monobank", code: "UAH", icon: "logos/banks/mono.png" },
    { id: "privat_uah", name: "PrivatBank", code: "UAH", icon: "logos/banks/privat.png" },
    { id: "oschad_uah", name: "Oschadbank", code: "UAH", icon: "logos/banks/oschad.png" },
    { id: "pumb_uah", name: "PUMB", code: "UAH", icon: "logos/banks/pumb.png" },
    { id: "abank_uah", name: "A-Bank", code: "UAH", icon: "logos/banks/a-bank.png" },
    { id: "sense_uah", name: "Sense Bank", code: "UAH", icon: "logos/banks/sense.png" },
    { id: "ukrsib_uah", name: "UkrSib", code: "UAH", icon: "logos/banks/ukr-sib.png" },
    { id: "ukrbanki_uah", name: "UkrBanki", code: "UAH", icon: "logos/banks/ukr-banki.png" },
    { id: "otp_uah", name: "OTP", code: "UAH", icon: "logos/banks/otp.png" },
    { id: "izi_uah", name: "IZI", code: "UAH", icon: "logos/banks/izi.png" },
    { id: "reif_uah", name: "Raiffeisen", code: "UAH", icon: "logos/banks/reyf.png" },
    { id: "visa_master", name: "Visa/Master", code: "CARD", icon: "logos/banks/visa-master.png" },
  ],
  wallets: [
    { id: "paypal", name: "PayPal", code: "USD/EUR", icon: "logos/wallets/paypal.png" },
    { id: "payoneer", name: "Payoneer", code: "USD/EUR", icon: "logos/wallets/payoneer.png" },
    { id: "revolut", name: "Revolut", code: "EUR/GBP", icon: "logos/wallets/revolut.png" },
    { id: "valet", name: "Wallet", code: "WALLET", icon: "logos/wallets/valet.png" },
    { id: "vise", name: "Vise", code: "WALLET", icon: "logos/wallets/vise.png" },
  ],
  crypto: [
    { id: "btc", name: "Bitcoin", code: "BTC", icon: "logos/crypto/btc.png" },
    { id: "eth", name: "Ethereum", code: "ETH", icon: "logos/crypto/eth.png" },
    { id: "sol", name: "Solana", code: "SOL", icon: "logos/crypto/sol.png" },
    { id: "ton", name: "TON", code: "TON", icon: "logos/crypto/ton.png" },
    { id: "trx", name: "TRON", code: "TRX", icon: "logos/crypto/trx.png" },
    { id: "ltc", name: "Litecoin", code: "LTC", icon: "logos/crypto/ltc.png" },

    { id: "usdt_trc", name: "Tether", code: "USDT-TRC20", icon: "logos/crypto/usdt-trc.png" },
    { id: "usdt_eth", name: "Tether", code: "USDT-ERC20", icon: "logos/crypto/usdt-eth.png" },
    { id: "usdt_bep", name: "Tether", code: "USDT-BEP20", icon: "logos/crypto/usdt-bep.png" },
    { id: "usdt_sol", name: "Tether", code: "USDT-SOL", icon: "logos/crypto/usdt-sol.png" },
    { id: "usdt_pol", name: "Tether", code: "USDT-POL", icon: "logos/crypto/usdt-pol.png" },
    { id: "usdt_arb", name: "Tether", code: "USDT-ARB", icon: "logos/crypto/usdt-arb.png" },

    { id: "usdc_eth", name: "USDC", code: "USDC-ERC20", icon: "logos/crypto/usdc-eth.png" },
    { id: "usdc_sol", name: "USDC", code: "USDC-SOL", icon: "logos/crypto/usdc-sol.png" },
    { id: "usdc_pol", name: "USDC", code: "USDC-POL", icon: "logos/crypto/usdc-pol.png" },
  ]
};

const FALLBACK_ICON = "logos/crypto/crypto.png";

/* ========= I18N ========= */
const I18N = {
  uk: {
    tab_exchange: "Обмін",
    tab_rules: "Правила",
    tab_account: "Акаунт",
    tab_more: "Ще",
    give: "Віддаєте",
    get: "Отримуєте",
    rate: "Курс:",
    create_order: "Створити заявку",
    rules_title: "Правила",
    rules_text: "Тут будуть правила обміну (поки заглушка).",
    account_title: "Акаунт",
    account_text: "Тут буде вхід/реєстрація та далі KYC (поки без підключення).",
    login: "Увійти",
    register: "Реєстрація",
    more_title: "Ще",
    faq: "FAQ",
    contacts: "Контакти",
    reviews: "Відгуки",
    type_banks: "Банки",
    type_wallets: "Гаманці",
    type_crypto: "Крипто",
    search_ph: "Пошук...",
    sheet_pick_give: "Вибір (віддаєте)",
    sheet_pick_get: "Вибір (отримуєте)",
    toast_created: "Заявку створено (демо). Далі підключимо бек/бот.",
  },
  en: {
    tab_exchange: "Exchange",
    tab_rules: "Rules",
    tab_account: "Account",
    tab_more: "More",
    give: "You send",
    get: "You get",
    rate: "Rate:",
    create_order: "Create request",
    rules_title: "Rules",
    rules_text: "Exchange rules will be here (placeholder).",
    account_title: "Account",
    account_text: "Login/registration + KYC later (not connected yet).",
    login: "Login",
    register: "Sign up",
    more_title: "More",
    faq: "FAQ",
    contacts: "Contacts",
    reviews: "Reviews",
    type_banks: "Banks",
    type_wallets: "Wallets",
    type_crypto: "Crypto",
    search_ph: "Search...",
    sheet_pick_give: "Select (send)",
    sheet_pick_get: "Select (receive)",
    toast_created: "Request created (demo). Next: connect backend/bot.",
  },
  pl: {
    tab_exchange: "Wymiana",
    tab_rules: "Zasady",
    tab_account: "Konto",
    tab_more: "Więcej",
    give: "Oddajesz",
    get: "Otrzymujesz",
    rate: "Kurs:",
    create_order: "Utwórz zlecenie",
    rules_title: "Zasady",
    rules_text: "Zasady wymiany będą tutaj (placeholder).",
    account_title: "Konto",
    account_text: "Logowanie/rejestracja + KYC później (jeszcze bez integracji).",
    login: "Zaloguj",
    register: "Rejestracja",
    more_title: "Więcej",
    faq: "FAQ",
    contacts: "Kontakt",
    reviews: "Opinie",
    type_banks: "Banki",
    type_wallets: "Portfele",
    type_crypto: "Krypto",
    search_ph: "Szukaj...",
    sheet_pick_give: "Wybór (oddajesz)",
    sheet_pick_get: "Wybór (otrzymujesz)",
    toast_created: "Zlecenie utworzone (demo). Następnie: backend/bot.",
  }
};

let state = {
  lang: "uk",
  tab: "exchange",
  give: ASSETS.banks[0],
  get: ASSETS.crypto[0],
  giveAmount: 100,
  getAmount: 0,
  sheet: {
    open: false,
    mode: "give",   // give | get
    type: "banks",  // banks | wallets | crypto
    query: ""
  }
};

/* ========= HELPERS ========= */

function safeImg(img, src){
  img.src = src;
  img.onerror = () => {
    img.onerror = null;
    img.src = FALLBACK_ICON;
  };
}

function formatNum(x, decimals = 8){
  if (!isFinite(x)) return "0";
  const d = Math.max(0, Math.min(12, decimals));
  return Number(x).toFixed(d).replace(/\.?0+$/,'');
}

function parseNum(str){
  const s = String(str).replace(",", ".").replace(/[^\d.]/g,"");
  const n = parseFloat(s);
  return isFinite(n) ? n : 0;
}

/* MOCK rate
 * We do: UAH -> BTC ~ 0.0000000625 BTC per 1 UAH (пример)
 * Other crypto/wallet: simple fake mapping.
 */
function getMockRate(give, get){
  // base: 1 UAH value in USD
  const uahUsd = 1 / 41; // rough demo
  const usdTo = {
    BTC: 1 / 98000,
    ETH: 1 / 3500,
    SOL: 1 / 200,
    TON: 1 / 6,
    TRX: 1 / 0.25,
    LTC: 1 / 110,
  };

  const getCode = get.code;
  // if crypto network: USDT-TRC20 etc -> treat as USDT
  const isUSDT = getCode.startsWith("USDT");
  const isUSDC = getCode.startsWith("USDC");

  let usdPerGet = 1;
  if (isUSDT || isUSDC) usdPerGet = 1;
  else if (usdTo[getCode]) usdPerGet = 1 / usdTo[getCode]; // USD per 1 coin
  else if (getCode === "BTC") usdPerGet = 98000;

  // Give side:
  // Banks UAH: 1 give = 1 UAH
  // Wallets: treat 1 giveAmount as USD-ish if not UAH
  let giveValueUsd;
  if (give.code === "UAH") giveValueUsd = uahUsd;
  else if (give.code === "CARD") giveValueUsd = uahUsd; // still demo
  else giveValueUsd = 1; // USD/EUR etc placeholder

  // Rate: 1 giveUnit -> how many getUnits
  // giveUnit in USD divided by usdPerGet
  const rate = giveValueUsd / usdPerGet;
  return rate;
}

function recalc(){
  const rate = getMockRate(state.give, state.get);
  state.getAmount = state.giveAmount * rate;

  $("#rateText").textContent =
    `1 ${state.give.code} ≈ ${formatNum(rate, 10)} ${state.get.code}`;

  $("#getAmount").value = formatNum(state.getAmount, 10);
}

/* ========= UI RENDER ========= */

function applyI18n(){
  const dict = I18N[state.lang] || I18N.uk;

  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // placeholders
  $("#sheetSearch").placeholder = dict.search_ph;
  $("#langBtnText").textContent = state.lang === "uk" ? "UA" : (state.lang === "en" ? "EN" : "PL");
}

function renderTopLang(){
  $("#langBtn").setAttribute("aria-expanded", $("#langMenu").hidden ? "false" : "true");
  $$("#langMenu .lang-item").forEach(b=>{
    b.classList.toggle("is-active", b.dataset.lang === state.lang);
  });
}

function renderPair(){
  $("#giveName").textContent = state.give.name;
  $("#giveCode").textContent = state.give.code;
  safeImg($("#giveIcon"), state.give.icon);

  $("#getName").textContent = state.get.name;
  $("#getCode").textContent = state.get.code;
  safeImg($("#getIcon"), state.get.icon);

  $("#giveAmount").value = formatNum(state.giveAmount, 2);
}

function setTab(tab){
  state.tab = tab;

  $$(".tab").forEach(b => b.classList.toggle("is-active", b.dataset.tab === tab));
  $$(".panel").forEach(p => p.classList.toggle("is-active", p.dataset.panel === tab));
}

function toast(msg){
  const t = $("#orderToast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._tm);
  toast._tm = setTimeout(()=>{ t.hidden = true; }, 2200);
}

/* ========= SHEET ========= */

function openSheet(mode){
  state.sheet.open = true;
  state.sheet.mode = mode;
  state.sheet.query = "";
  $("#sheetSearch").value = "";

  // default type
  state.sheet.type = (mode === "give") ? "banks" : "crypto";
  setSheetType(state.sheet.type);

  $("#sheetTitle").textContent = (I18N[state.lang] || I18N.uk)[mode === "give" ? "sheet_pick_give" : "sheet_pick_get"];

  $("#sheetBackdrop").hidden = false;
  $("#sheet").hidden = false;

  // focus for mobile
  setTimeout(()=>$("#sheetSearch").focus(), 50);
}

function closeSheet(){
  state.sheet.open = false;
  $("#sheetBackdrop").hidden = true;
  $("#sheet").hidden = true;
}

function setSheetType(type){
  state.sheet.type = type;
  $$(".sheet-tab").forEach(b => b.classList.toggle("is-active", b.dataset.type === type));
  renderSheetList();
}

function renderSheetList(){
  const q = state.sheet.query.trim().toLowerCase();
  const items = ASSETS[state.sheet.type] || [];

  const filtered = q
    ? items.filter(it => (it.name + " " + it.code).toLowerCase().includes(q))
    : items;

  const list = $("#sheetList");
  list.innerHTML = "";

  filtered.forEach(it => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sheet-item";

    const left = document.createElement("div");
    left.className = "sheet-left";

    const ico = document.createElement("span");
    ico.className = "ico";
    const img = document.createElement("img");
    img.alt = "";
    safeImg(img, it.icon);
    ico.appendChild(img);

    const txt = document.createElement("div");
    txt.style.minWidth = "0";

    const nm = document.createElement("div");
    nm.className = "sheet-name";
    nm.textContent = it.name;

    const sb = document.createElement("div");
    sb.className = "sheet-sub";
    sb.textContent = it.code;

    txt.appendChild(nm);
    txt.appendChild(sb);

    left.appendChild(ico);
    left.appendChild(txt);

    btn.appendChild(left);

    btn.addEventListener("click", () => {
      if (state.sheet.mode === "give") {
        state.give = it;
      } else {
        state.get = it;
      }
      renderPair();
      recalc();
      closeSheet();
    });

    list.appendChild(btn);
  });
}

/* ========= EVENTS ========= */

function bindEvents(){
  // tabs
  $$(".tab").forEach(b=>{
    b.addEventListener("click", ()=> setTab(b.dataset.tab));
  });

  // language
  $("#langBtn").addEventListener("click", (e)=>{
    const menu = $("#langMenu");
    menu.hidden = !menu.hidden;
    renderTopLang();
    e.stopPropagation();
  });

  $$("#langMenu .lang-item").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.lang = b.dataset.lang;
      $("#langMenu").hidden = true;
      applyI18n();
      renderTopLang();
      // also rerender sheet title if open
      if (state.sheet.open) {
        $("#sheetTitle").textContent = (I18N[state.lang] || I18N.uk)[state.sheet.mode === "give" ? "sheet_pick_give" : "sheet_pick_get"];
      }
    });
  });

  // close menus on outside click
  document.addEventListener("click", ()=>{
    $("#langMenu").hidden = true;
    renderTopLang();
  });

  // selects
  $("#giveSelectBtn").addEventListener("click", ()=> openSheet("give"));
  $("#getSelectBtn").addEventListener("click", ()=> openSheet("get"));

  // sheet
  $("#sheetClose").addEventListener("click", closeSheet);
  $("#sheetBackdrop").addEventListener("click", closeSheet);

  $$(".sheet-tab").forEach(b=>{
    b.addEventListener("click", ()=> setSheetType(b.dataset.type));
  });

  $("#sheetSearch").addEventListener("input", (e)=>{
    state.sheet.query = e.target.value;
    renderSheetList();
  });

  // amounts
  $("#giveAmount").addEventListener("input", (e)=>{
    state.giveAmount = parseNum(e.target.value);
    recalc();
  });

  $("#getAmount").addEventListener("input", (e)=>{
    // allow editing receive side too (reverse calc)
    const val = parseNum(e.target.value);
    const rate = getMockRate(state.give, state.get);
    if (rate > 0){
      state.giveAmount = val / rate;
      $("#giveAmount").value = formatNum(state.giveAmount, 2);
    }
    state.getAmount = val;
    $("#rateText").textContent = `1 ${state.give.code} ≈ ${formatNum(rate, 10)} ${state.get.code}`;
  });

  // swap
  $("#swapBtn").addEventListener("click", ()=>{
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;

    // swap amounts too
    const tmpA = state.giveAmount;
    state.giveAmount = state.getAmount;
    state.getAmount = tmpA;

    renderPair();
    recalc();
  });

  // create order
  $("#createOrderBtn").addEventListener("click", ()=>{
    const dict = I18N[state.lang] || I18N.uk;
    toast(dict.toast_created);
  });

  // account buttons
  $("#loginBtn").addEventListener("click", ()=> toast("Login (demo)"));
  $("#registerBtn").addEventListener("click", ()=> toast("Register (demo)"));
  $("#faqBtn").addEventListener("click", ()=> toast("FAQ (demo)"));
  $("#contactsBtn").addEventListener("click", ()=> toast("Contacts (demo)"));
  $("#reviewsBtn").addEventListener("click", ()=> toast("Reviews (demo)"));
}

/* ========= INIT ========= */

function init(){
  applyI18n();
  renderTopLang();
  renderPair();
  setTab("exchange");
  recalc();
  bindEvents();

  // Ensure icons are set initially
  safeImg($("#giveIcon"), state.give.icon);
  safeImg($("#getIcon"), state.get.icon);

  // If your logo path differs: fix here quickly
  const logo = $("#brandLogo");
  logo.onerror = () => {
    logo.onerror = null;
    // fallback to old logo if new not found:
    logo.src = "logo.png";
  };
}

init();
