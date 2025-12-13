// ====== DATA ======
// IMPORTANT: проверь названия файлов в /logos/ (путь должен совпадать!)
const DATA = {
  banks: [
    { id: "monobank", name: "Monobank", code: "UAH", icon: "logos/banks/monobank.png" },
    { id: "privatbank", name: "PrivatBank", code: "UAH", icon: "logos/banks/privatbank.png" },
    { id: "oschadbank", name: "Oschadbank", code: "UAH", icon: "logos/banks/oschadbank.png" },
    { id: "pumb", name: "PUMB", code: "UAH", icon: "logos/banks/pumb.png" },
    { id: "abank", name: "A-Bank", code: "UAH", icon: "logos/banks/abank.png" },
    { id: "sense", name: "Sense Bank", code: "UAH", icon: "logos/banks/sense.png" }
  ],
  crypto: [
    { id: "btc", name: "Bitcoin", code: "BTC", icon: "logos/crypto/btc.png" },
    { id: "eth", name: "Ethereum", code: "ETH", icon: "logos/crypto/eth.png" },
    { id: "usdt", name: "Tether", code: "USDT", icon: "logos/crypto/usdt.png" }
  ]
};

// ====== I18N ======
const I18N = {
  ua: {
    tabs: { exchange: "Обмін", rules: "Правила", account: "Акаунт", more: "Ще" },
    give: "Віддаєте",
    get: "Отримуєте",
    rate: "Курс:",
    submit: "Створити заявку",
    rulesTitle: "Правила",
    rulesText: "Тут будуть правила обміну. (Поки заглушка)",
    accTitle: "Акаунт",
    accText: "Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
    login: "Увійти",
    register: "Реєстрація",
    moreTitle: "Ще",
    reviews: "Відгуки",
    faq: "FAQ",
    contacts: "Контакти",
    modalGive: "Вибір (віддаєте)",
    modalGet: "Вибір (отримуєте)",
    search: "Пошук..."
  },
  en: {
    tabs: { exchange: "Exchange", rules: "Rules", account: "Account", more: "More" },
    give: "You give",
    get: "You get",
    rate: "Rate:",
    submit: "Create request",
    rulesTitle: "Rules",
    rulesText: "Exchange rules will be here. (Placeholder)",
    accTitle: "Account",
    accText: "Login/registration and then KYC (not connected yet).",
    login: "Log in",
    register: "Sign up",
    moreTitle: "More",
    reviews: "Reviews",
    faq: "FAQ",
    contacts: "Contacts",
    modalGive: "Select (you give)",
    modalGet: "Select (you get)",
    search: "Search..."
  },
  pl: {
    tabs: { exchange: "Wymiana", rules: "Zasady", account: "Konto", more: "Więcej" },
    give: "Oddajesz",
    get: "Otrzymujesz",
    rate: "Kurs:",
    submit: "Utwórz zlecenie",
    rulesTitle: "Zasady",
    rulesText: "Tutaj będą zasady wymiany. (Zaślepka)",
    accTitle: "Konto",
    accText: "Logowanie/rejestracja i później KYC (jeszcze niepodłączone).",
    login: "Zaloguj",
    register: "Rejestracja",
    moreTitle: "Więcej",
    reviews: "Opinie",
    faq: "FAQ",
    contacts: "Kontakt",
    modalGive: "Wybór (oddajesz)",
    modalGet: "Wybór (otrzymujesz)",
    search: "Szukaj..."
  }
};

// ====== STATE ======
let state = {
  lang: "ua",
  page: "exchange",
  give: DATA.banks[0],
  get: DATA.crypto[0],
  giveAmount: 100
};

let modalMode = "give"; // "give" | "get"

// ====== HELPERS ======
function $(id){ return document.getElementById(id); }

function setImgSafe(imgEl, src){
  imgEl.src = src;
  imgEl.onerror = () => {
    // fallback: просто пустая "плашка", чтобы не было битой картинки
    imgEl.onerror = null;
    imgEl.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
        <rect width="100%" height="100%" rx="36" ry="36" fill="#f1f1f7"/>
        <path d="M22 44l8-10 7 9 6-7 9 12" fill="none" stroke="#c9c9d8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`);
  };
}

function formatRate(uah, assetCode){
  // заглушка: просто пример, чтобы выглядело как на скрине
  // можно потом подключить реальный курс
  let r = 0.000000625;
  if (assetCode === "ETH") r = 0.000019;
  if (assetCode === "USDT") r = 0.024;
  return `1 UAH ≈ ${r} ${assetCode}`;
}

function calcGetAmount(giveAmount, assetCode){
  let r = 0.000000625;
  if (assetCode === "ETH") r = 0.000019;
  if (assetCode === "USDT") r = 0.024;
  const x = Number(giveAmount || 0) * r;
  // показываем красиво
  if (assetCode === "USDT") return x.toFixed(2);
  return x.toFixed(9).replace(/0+$/,'').replace(/\.$/,'');
}

function renderTexts(){
  const t = I18N[state.lang];

  $("tabExchange").textContent = t.tabs.exchange;
  $("tabRules").textContent = t.tabs.rules;
  $("tabAccount").textContent = t.tabs.account;
  $("tabMore").textContent = t.tabs.more;

  $("lblGive").textContent = t.give;
  $("lblGet").textContent = t.get;
  $("rateLbl").textContent = t.rate;

  $("submitBtn").textContent = t.submit;

  $("rulesTitle").textContent = t.rulesTitle;
  $("rulesText").textContent = t.rulesText;

  $("accTitle").textContent = t.accTitle;
  $("accText").textContent = t.accText;
  $("btnLogin").textContent = t.login;
  $("btnRegister").textContent = t.register;

  $("moreTitle").textContent = t.moreTitle;
  $("btnReviews").textContent = t.reviews;
  $("btnFaq").textContent = t.faq;
  $("btnContacts").textContent = t.contacts;

  $("modalSearch").placeholder = t.search;
}

function renderExchange(){
  // give
  $("giveName").textContent = state.give.name;
  $("giveCode").textContent = state.give.code;
  setImgSafe($("giveIcon"), state.give.icon);

  // get
  $("getName").textContent = state.get.name;
  $("getCode").textContent = state.get.code;
  setImgSafe($("getIcon"), state.get.icon);

  // amounts
  $("giveAmount").value = String(state.giveAmount ?? "");
  $("getAmount").value = calcGetAmount(state.giveAmount, state.get.code);

  // rate
  $("rateValue").textContent = formatRate(1, state.get.code);
}

function setPage(page){
  state.page = page;

  // tabs ui
  document.querySelectorAll(".tab").forEach(b=>{
    b.classList.toggle("active", b.dataset.page === page);
  });

  // pages
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("page-active"));
  if (page === "exchange") $("pageExchange").classList.add("page-active");
  if (page === "rules") $("pageRules").classList.add("page-active");
  if (page === "account") $("pageAccount").classList.add("page-active");
  if (page === "more") $("pageMore").classList.add("page-active");
}

function openModal(mode){
  modalMode = mode;
  const t = I18N[state.lang];

  $("modalTitle").textContent = (mode === "give") ? t.modalGive : t.modalGet;
  $("modalSearch").value = "";
  $("modal").classList.remove("hidden");
  $("modal").setAttribute("aria-hidden", "false");

  renderModalList();
  setTimeout(()=> $("modalSearch").focus(), 50);
}

function closeModal(){
  $("modal").classList.add("hidden");
  $("modal").setAttribute("aria-hidden", "true");
}

function renderModalList(){
  const q = ($("modalSearch").value || "").toLowerCase().trim();
  const list = (modalMode === "give") ? DATA.banks : DATA.crypto;

  const filtered = list.filter(x =>
    x.name.toLowerCase().includes(q) || x.code.toLowerCase().includes(q)
  );

  const root = $("modalList");
  root.innerHTML = "";

  filtered.forEach(item=>{
    const row = document.createElement("button");
    row.type = "button";
    row.className = "item";
    row.innerHTML = `
      <span class="item-left">
        <img class="item-icon" alt="" />
        <span class="item-text">
          <span class="item-title">${item.name}</span>
          <span class="item-sub">${item.code}</span>
        </span>
      </span>
    `;
    const img = row.querySelector("img");
    setImgSafe(img, item.icon);

    row.addEventListener("click", ()=>{
      if (modalMode === "give") state.give = item;
      else state.get = item;

      closeModal();
      renderExchange();
    });

    root.appendChild(row);
  });
}

function toggleLangMenu(force){
  const menu = $("langMenu");
  const willOpen = (typeof force === "boolean") ? force : menu.classList.contains("hidden");
  menu.classList.toggle("hidden", !willOpen);
}

// ====== EVENTS ======
function bind(){
  // tabs
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=> setPage(btn.dataset.page));
  });

  // selects
  $("giveSelect").addEventListener("click", ()=> openModal("give"));
  $("getSelect").addEventListener("click", ()=> openModal("get"));

  // amount input
  $("giveAmount").addEventListener("input", (e)=>{
    const raw = String(e.target.value).replace(",", ".");
    const num = Number(raw);
    if (!Number.isFinite(num)) return;
    state.giveAmount = raw;
    $("getAmount").value = calcGetAmount(raw, state.get.code);
  });

  // swap button
  $("swapBtn").addEventListener("click", ()=>{
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;
    // если вдруг поменялись местами банк/крипто — подчищаем:
    if (!DATA.banks.some(b=>b.id===state.give.id)) state.give = DATA.banks[0];
    if (!DATA.crypto.some(c=>c.id===state.get.id)) state.get = DATA.crypto[0];

    renderExchange();
  });

  // submit button
  $("submitBtn").addEventListener("click", ()=>{
    // пока заглушка
    alert("Заявка: (заглушка) ✅");
  });

  // modal
  $("modalClose").addEventListener("click", closeModal);
  $("modalBackdrop").addEventListener("click", closeModal);
  $("modalSearch").addEventListener("input", renderModalList);

  // language
  $("langBtn").addEventListener("click", (e)=>{
    e.stopPropagation();
    toggleLangMenu();
  });

  document.querySelectorAll(".lang-item").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.lang = b.dataset.lang;
      $("langLabel").textContent = state.lang.toUpperCase();
      toggleLangMenu(false);
      renderTexts();
      renderExchange();
    });
  });

  // close lang menu on outside click
  document.addEventListener("click", ()=>{
    toggleLangMenu(false);
  });

  // prevent closing when clicking inside menu
  $("langMenu").addEventListener("click", (e)=> e.stopPropagation());
}

// ====== INIT ======
(function init(){
  $("langLabel").textContent = state.lang.toUpperCase();
  bind();
  renderTexts();
  setPage("exchange");
  renderExchange();
})();
