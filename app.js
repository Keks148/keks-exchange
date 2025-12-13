// =====================
// KeksSwap (Vanilla JS)
// =====================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/** Полные переводы (без “частично”) */
const I18N = {
  uk: {
    tabs: { exchange: "Обмін", rules: "Правила", account: "Аккаунт", more: "Ще" },
    exchange: {
      title: "Обмін",
      give: "Віддаєте",
      get: "Отримуєте",
      create: "Створити заявку",
      rate: "Курс",
      statusCreated: "Заявка створена. Статус: очікує підтвердження."
    },
    rules: { title: "Правила", text: "Тут будуть правила обміну. (Поки заглушка)" },
    account: {
      title: "Аккаунт",
      text: "Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
      login: "Войти",
      register: "Регистрация"
    },
    more: { title: "Ще", reviews: "Відгуки", faq: "FAQ", contacts: "Контакти", hint: "Вибери розділ." },
    picker: { title: "Вибір", search: "Search..." },
    tags: { crypto:"Crypto", banks:"Banks", wallets:"Wallets", all:"All" }
  },
  en: {
    tabs: { exchange: "Exchange", rules: "Rules", account: "Account", more: "More" },
    exchange: {
      title: "Exchange",
      give: "You give",
      get: "You get",
      create: "Create request",
      rate: "Rate",
      statusCreated: "Request created. Status: pending confirmation."
    },
    rules: { title: "Rules", text: "Exchange rules will be here. (Placeholder)" },
    account: {
      title: "Account",
      text: "Login/registration and KYC will be here (not connected yet).",
      login: "Login",
      register: "Sign up"
    },
    more: { title: "More", reviews: "Reviews", faq: "FAQ", contacts: "Contacts", hint: "Choose a section." },
    picker: { title: "Select", search: "Search..." },
    tags: { crypto:"Crypto", banks:"Banks", wallets:"Wallets", all:"All" }
  },
  pl: {
    tabs: { exchange: "Wymiana", rules: "Zasady", account: "Konto", more: "Więcej" },
    exchange: {
      title: "Wymiana",
      give: "Dajesz",
      get: "Otrzymujesz",
      create: "Utwórz zlecenie",
      rate: "Kurs",
      statusCreated: "Zlecenie utworzone. Status: oczekuje potwierdzenia."
    },
    rules: { title: "Zasady", text: "Zasady wymiany będą tutaj. (Wersja robocza)" },
    account: {
      title: "Konto",
      text: "Logowanie/rejestracja i KYC będą tutaj (jeszcze nie podłączone).",
      login: "Zaloguj",
      register: "Rejestracja"
    },
    more: { title: "Więcej", reviews: "Opinie", faq: "FAQ", contacts: "Kontakt", hint: "Wybierz sekcję." },
    picker: { title: "Wybór", search: "Search..." },
    tags: { crypto:"Crypto", banks:"Banks", wallets:"Wallets", all:"All" }
  }
};

// --- Данные (под твои папки logos/...) ---
// ВАЖНО: пути соответствуют твоей структуре:
// logos/crypto/*.png, logos/banks/*.png, logos/wallets/*.png
const OPTIONS = [
  // BANKS (UAH)
  { id:"mono_uah",    cat:"banks",  name:"Monobank",  code:"UAH", label:"Monobank (UAH)",  logo:"logos/banks/mono.png",   rateUSD: 1/41 },
  { id:"privat_uah",  cat:"banks",  name:"PrivatBank",code:"UAH", label:"PrivatBank (UAH)",logo:"logos/banks/privat.png", rateUSD: 1/41 },
  { id:"abank_uah",   cat:"banks",  name:"A-Bank",    code:"UAH", label:"A-Bank (UAH)",    logo:"logos/banks/a-bank.png", rateUSD: 1/41 },
  { id:"oschad_uah",  cat:"banks",  name:"Oschadbank",code:"UAH", label:"Oschadbank (UAH)",logo:"logos/banks/oschad.png", rateUSD: 1/41 },
  { id:"pumb_uah",    cat:"banks",  name:"PUMB",      code:"UAH", label:"PUMB (UAH)",      logo:"logos/banks/pumb.png",   rateUSD: 1/41 },
  { id:"otp_uah",     cat:"banks",  name:"OTP Bank",  code:"UAH", label:"OTP Bank (UAH)",  logo:"logos/banks/otp.png",    rateUSD: 1/41 },
  { id:"sense_uah",   cat:"banks",  name:"Sense",     code:"UAH", label:"Sense (UAH)",     logo:"logos/banks/sense.png",  rateUSD: 1/41 },
  { id:"izi_uah",     cat:"banks",  name:"izibank",   code:"UAH", label:"izibank (UAH)",   logo:"logos/banks/izi.png",    rateUSD: 1/41 },

  // CRYPTO
  { id:"btc",  cat:"crypto", name:"Bitcoin",  code:"BTC", label:"Bitcoin (BTC)",  logo:"logos/crypto/btc.png",  rateUSD: 95000 },
  { id:"eth",  cat:"crypto", name:"Ethereum", code:"ETH", label:"Ethereum (ETH)", logo:"logos/crypto/eth.png",  rateUSD: 3500  },
  { id:"ltc",  cat:"crypto", name:"Litecoin", code:"LTC", label:"Litecoin (LTC)", logo:"logos/crypto/ltc.png",  rateUSD: 120   },
  { id:"sol",  cat:"crypto", name:"Solana",   code:"SOL", label:"Solana (SOL)",   logo:"logos/crypto/sol.png",  rateUSD: 180   },
  { id:"ton",  cat:"crypto", name:"Toncoin",  code:"TON", label:"Toncoin (TON)",  logo:"logos/crypto/ton.png",  rateUSD: 6     },
  { id:"trx",  cat:"crypto", name:"TRON",     code:"TRX", label:"TRON (TRX)",     logo:"logos/crypto/trx.png",  rateUSD: 0.25  },

  // USDT сети (как у тебя)
  { id:"usdt_trc", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (TRC20)", logo:"logos/crypto/usdt-trc.png", rateUSD: 1 },
  { id:"usdt_eth", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (ERC20)", logo:"logos/crypto/usdt-eth.png", rateUSD: 1 },
  { id:"usdt_bep", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (BEP20)", logo:"logos/crypto/usdt-bep.png", rateUSD: 1 },
  { id:"usdt_sol", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (SOL)",   logo:"logos/crypto/usdt-sol.png", rateUSD: 1 },
  { id:"usdt_pol", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (POL)",   logo:"logos/crypto/usdt-pol.png", rateUSD: 1 },
  { id:"usdt_arb", cat:"crypto", name:"Tether", code:"USDT", label:"USDT (ARB)",   logo:"logos/crypto/usdt-arb.png", rateUSD: 1 },

  // USDC сети (как у тебя)
  { id:"usdc_eth", cat:"crypto", name:"USD Coin", code:"USDC", label:"USDC (ERC20)", logo:"logos/crypto/usdc-eth.png", rateUSD: 1 },
  { id:"usdc_sol", cat:"crypto", name:"USD Coin", code:"USDC", label:"USDC (SOL)",   logo:"logos/crypto/usdc-sol.png", rateUSD: 1 },
  { id:"usdc_pol", cat:"crypto", name:"USD Coin", code:"USDC", label:"USDC (POL)",   logo:"logos/crypto/usdc-pol.png", rateUSD: 1 },

  // WALLETS
  { id:"paypal_usd",   cat:"wallets", name:"PayPal",   code:"USD", label:"PayPal (USD)",   logo:"logos/wallets/paypal.png",  rateUSD: 1 },
  { id:"payoneer_usd", cat:"wallets", name:"Payoneer", code:"USD", label:"Payoneer (USD)", logo:"logos/wallets/payooneer.png", rateUSD: 1 },
  { id:"revolut_usd",  cat:"wallets", name:"Revolut",  code:"USD", label:"Revolut (USD)",  logo:"logos/wallets/revolut.png", rateUSD: 1 },
  { id:"wise_usd",     cat:"wallets", name:"Wise",     code:"USD", label:"Wise (USD)",     logo:"logos/wallets/vise.png",    rateUSD: 1 },
  { id:"valet_usd",    cat:"wallets", name:"Valet",    code:"USD", label:"Valet (USD)",    logo:"logos/wallets/valet.png",   rateUSD: 1 }
];

// Fallback если картинка не найдена
function setImgSafe(imgEl, src){
  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.onerror = null;
    imgEl.src = "logos/crypto/crypto.png"; // если есть, иначе просто оставит пусто
  };
}

// --- STATE ---
let lang = "uk";
let currentView = "exchange";
let pickerTarget = "give"; // 'give' | 'get'
let filter = "all";
let give = OPTIONS.find(x => x.id === "mono_uah") || OPTIONS[0];
let get  = OPTIONS.find(x => x.id === "btc") || OPTIONS[0];

// --- DOM ---
const views = {
  exchange: $("#viewExchange"),
  rules: $("#viewRules"),
  account: $("#viewAccount"),
  more: $("#viewMore")
};

const tabBtns = {
  exchange: $("#tabExchange"),
  rules: $("#tabRules"),
  account: $("#tabAccount"),
  more: $("#tabMore")
};

const giveSelectBtn = $("#giveSelectBtn");
const getSelectBtn  = $("#getSelectBtn");
const giveAmountEl  = $("#giveAmount");
const getAmountEl   = $("#getAmount");
const swapBtn       = $("#swapBtn");
const rateLine      = $("#rateLine");
const statusBox     = $("#statusBox");
const submitBtn     = $("#submitBtn");

// header / lang
const langBtn     = $("#langBtn");
const langBtnLabel= $("#langBtnLabel");
const langMenu    = $("#langMenu");

// modal
const pickerModal  = $("#pickerModal");
const modalBackdrop= $("#modalBackdrop");
const modalCloseBtn= $("#modalCloseBtn");
const searchInput  = $("#searchInput");
const optionsList  = $("#optionsList");
const pickerTitle  = $("#pickerTitle");

// chips
const chipButtons = $$("#chipsRow .chip");

// --- UI Helpers ---
function setActiveView(view){
  currentView = view;
  Object.keys(views).forEach(k => views[k].classList.toggle("is-hidden", k !== view));
  Object.keys(tabBtns).forEach(k => tabBtns[k].classList.toggle("is-active", k === view));
}

function formatNumber(n){
  if (!isFinite(n)) return "0";
  // убираем “бесконечные” хвосты
  const s = n.toFixed(8);
  return s.replace(/\.?0+$/,"");
}

function calcRate(giveOpt, getOpt){
  // rate = (give in USD) -> (get in USD)
  // amount_get = amount_give * giveUSD / getUSD
  return (giveOpt.rateUSD || 0) / (getOpt.rateUSD || 1);
}

function updateRateAndAmounts(){
  const amount = parseFloat(String(giveAmountEl.value).replace(",", "."));
  const validAmount = isFinite(amount) ? amount : 0;

  const rate = calcRate(give, get);
  const out = validAmount * rate;
  getAmountEl.value = formatNumber(out);

  const t = I18N[lang].exchange;
  rateLine.textContent = `${t.rate}: 1 ${give.code} → ${formatNumber(rate)} ${get.code}`;
}

function renderSelects(){
  // GIVE
  setImgSafe($("#giveIcon"), give.logo);
  $("#giveName").textContent = give.name;
  $("#giveSub").textContent  = give.code;

  // GET
  setImgSafe($("#getIcon"), get.logo);
  $("#getName").textContent = get.name;
  $("#getSub").textContent  = get.code;

  updateRateAndAmounts();
}

function openPicker(target){
  pickerTarget = target;
  searchInput.value = "";
  filter = "all";
  chipButtons.forEach(b => b.classList.toggle("is-active", b.dataset.filter === "all"));

  pickerModal.classList.remove("is-hidden");
  pickerModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // title translated
  pickerTitle.textContent = I18N[lang].picker.title;
  searchInput.placeholder = I18N[lang].picker.search;

  renderOptions();
  setTimeout(() => searchInput.focus(), 60);
}

function closePicker(){
  pickerModal.classList.add("is-hidden");
  pickerModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function matches(opt, q){
  if (!q) return true;
  const s = q.toLowerCase();
  return (opt.name + " " + opt.label + " " + opt.code).toLowerCase().includes(s);
}

function renderOptions(){
  const q = searchInput.value.trim();
  const filtered = OPTIONS.filter(o => (filter === "all" ? true : o.cat === filter))
    .filter(o => matches(o, q));

  optionsList.innerHTML = "";
  filtered.forEach(o => {
    const row = document.createElement("div");
    row.className = "opt";
    row.innerHTML = `
      <div class="opt__left">
        <img class="opt__icon" alt="">
        <div class="opt__meta">
          <div class="opt__name"></div>
          <div class="opt__sub"></div>
        </div>
      </div>
      <div class="opt__tag">${o.cat}</div>
    `;
    const img = row.querySelector(".opt__icon");
    setImgSafe(img, o.logo);
    row.querySelector(".opt__name").textContent = o.label;
    row.querySelector(".opt__sub").textContent  = o.code;

    row.addEventListener("click", () => {
      if (pickerTarget === "give") give = o;
      else get = o;

      renderSelects();
      closePicker();
    });

    optionsList.appendChild(row);
  });

  if (filtered.length === 0){
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.style.padding = "10px 6px";
    empty.textContent = "—";
    optionsList.appendChild(empty);
  }
}

function applyLang(newLang){
  lang = newLang;
  const t = I18N[lang];

  // Tabs
  tabBtns.exchange.textContent = t.tabs.exchange;
  tabBtns.rules.textContent    = t.tabs.rules;
  tabBtns.account.textContent  = t.tabs.account;
  tabBtns.more.textContent     = t.tabs.more;

  // Exchange
  $("#exchangeTitle").textContent = t.exchange.title;
  $("#giveLabel").textContent     = t.exchange.give;
  $("#getLabel").textContent      = t.exchange.get;
  submitBtn.textContent           = t.exchange.create;

  // Rules
  $("#rulesTitle").textContent = t.rules.title;
  $("#rulesText").textContent  = t.rules.text;

  // Account
  $("#accountTitle").textContent = t.account.title;
  $("#accountText").textContent  = t.account.text;
  $("#loginBtn").textContent     = t.account.login;
  $("#registerBtn").textContent  = t.account.register;

  // More
  $("#moreTitle").textContent    = t.more.title;
  $("#moreReviews").textContent  = t.more.reviews;
  $("#moreFaq").textContent      = t.more.faq;
  $("#moreContacts").textContent = t.more.contacts;
  $("#moreHint").textContent     = t.more.hint;

  // Rate
  updateRateAndAmounts();
}

// --- Events ---

// Tabs
Object.keys(tabBtns).forEach(k => {
  tabBtns[k].addEventListener("click", () => setActiveView(k));
});

// Open pickers
giveSelectBtn.addEventListener("click", () => openPicker("give"));
getSelectBtn.addEventListener("click",  () => openPicker("get"));

// Close modal
modalBackdrop.addEventListener("click", closePicker);
modalCloseBtn.addEventListener("click", closePicker);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !pickerModal.classList.contains("is-hidden")) closePicker();
});

// Chips
chipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    chipButtons.forEach(b => b.classList.toggle("is-active", b === btn));
    renderOptions();
  });
});

// Search
searchInput.addEventListener("input", renderOptions);

// Amount input
giveAmountEl.addEventListener("input", updateRateAndAmounts);

// Swap
swapBtn.addEventListener("click", () => {
  const tmp = give;
  give = get;
  get = tmp;
  renderSelects();
});

// Submit -> status появляется после
submitBtn.addEventListener("click", () => {
  statusBox.hidden = false;
  statusBox.textContent = I18N[lang].exchange.statusCreated;
});

// Language menu
function toggleLangMenu(force){
  const isOpen = langMenu.classList.contains("is-open");
  const next = (typeof force === "boolean") ? force : !isOpen;
  langMenu.classList.toggle("is-open", next);
  langBtn.setAttribute("aria-expanded", String(next));
  langMenu.setAttribute("aria-hidden", String(!next));
}
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLangMenu();
});
document.addEventListener("click", () => toggleLangMenu(false));
langMenu.addEventListener("click", (e) => e.stopPropagation());

$$(".lang-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const newLang = btn.dataset.lang;
    langBtnLabel.textContent = btn.textContent;
    applyLang(newLang);
    toggleLangMenu(false);
  });
});

// --- INIT ---
(function init(){
  // default lang button
  langBtnLabel.textContent = "UA";
  applyLang("uk");

  // set initial view
  setActiveView("exchange");

  // set initial icons/text + compute
  renderSelects();

  // safe icon fallback for brand if needed:
  const brandLogo = document.querySelector(".brand__logo");
  brandLogo.onerror = () => { brandLogo.style.display = "none"; };
})();
