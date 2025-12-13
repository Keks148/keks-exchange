// KeksSwap — single-file app (no frameworks)
// Works with: index.html подключает styles.css и app.js

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

/* ----------------- Data ----------------- */
const ITEMS = [
  // Banks
  { id:"mono", type:"bank", name:{ua:"Monobank",en:"Monobank",pl:"Monobank"}, code:"UAH", logo:"logos/banks/mono.png" },
  { id:"privat", type:"bank", name:{ua:"PrivatBank",en:"PrivatBank",pl:"PrivatBank"}, code:"UAH", logo:"logos/banks/privat.png" },
  { id:"oschad", type:"bank", name:{ua:"Oschadbank",en:"Oschadbank",pl:"Oschadbank"}, code:"UAH", logo:"logos/banks/oschad.png" },
  { id:"pumb", type:"bank", name:{ua:"PUMB",en:"PUMB",pl:"PUMB"}, code:"UAH", logo:"logos/banks/pumb.png" },
  { id:"a-bank", type:"bank", name:{ua:"A-Bank",en:"A-Bank",pl:"A-Bank"}, code:"UAH", logo:"logos/banks/a-bank.png" },
  { id:"sense", type:"bank", name:{ua:"Sense Bank",en:"Sense Bank",pl:"Sense Bank"}, code:"UAH", logo:"logos/banks/sense.png" },
  { id:"otp", type:"bank", name:{ua:"OTP Bank",en:"OTP Bank",pl:"OTP Bank"}, code:"UAH", logo:"logos/banks/otp.png" },
  { id:"reif", type:"bank", name:{ua:"Raiffeisen",en:"Raiffeisen",pl:"Raiffeisen"}, code:"UAH", logo:"logos/banks/reyf.png" },
  { id:"izi", type:"bank", name:{ua:"izibank",en:"izibank",pl:"izibank"}, code:"UAH", logo:"logos/banks/izi.png" },
  { id:"ukrsib", type:"bank", name:{ua:"UkrSibbank",en:"UkrSibbank",pl:"UkrSibbank"}, code:"UAH", logo:"logos/banks/ukr-sib.png" },
  { id:"ukrbanki", type:"bank", name:{ua:"Ukrbanki",en:"Ukrbanki",pl:"Ukrbanki"}, code:"UAH", logo:"logos/banks/ukr-banki.png" },
  { id:"visamaster", type:"bank", name:{ua:"Visa/Master",en:"Visa/Master",pl:"Visa/Master"}, code:"UAH", logo:"logos/banks/visa-master.png" },

  // Crypto (core)
  { id:"btc", type:"crypto", name:{ua:"Bitcoin",en:"Bitcoin",pl:"Bitcoin"}, code:"BTC", logo:"logos/crypto/btc.png" },
  { id:"eth", type:"crypto", name:{ua:"Ethereum",en:"Ethereum",pl:"Ethereum"}, code:"ETH", logo:"logos/crypto/eth.png" },
  { id:"ltc", type:"crypto", name:{ua:"Litecoin",en:"Litecoin",pl:"Litecoin"}, code:"LTC", logo:"logos/crypto/ltc.png" },
  { id:"sol", type:"crypto", name:{ua:"Solana",en:"Solana",pl:"Solana"}, code:"SOL", logo:"logos/crypto/sol.png" },
  { id:"ton", type:"crypto", name:{ua:"TON",en:"TON",pl:"TON"}, code:"TON", logo:"logos/crypto/ton.png" },
  { id:"trx", type:"crypto", name:{ua:"TRON",en:"TRON",pl:"TRON"}, code:"TRX", logo:"logos/crypto/trx.png" },
  { id:"usdt", type:"crypto", name:{ua:"Tether",en:"Tether",pl:"Tether"}, code:"USDT", logo:"logos/crypto/tether-usdt.png" },

  // USDT networks
  { id:"usdt-eth", type:"crypto", name:{ua:"USDT (ERC20)",en:"USDT (ERC20)",pl:"USDT (ERC20)"}, code:"USDT", logo:"logos/crypto/usdt-eth.png" },
  { id:"usdt-trc", type:"crypto", name:{ua:"USDT (TRC20)",en:"USDT (TRC20)",pl:"USDT (TRC20)"}, code:"USDT", logo:"logos/crypto/usdt-trc.png" },
  { id:"usdt-bep", type:"crypto", name:{ua:"USDT (BEP20)",en:"USDT (BEP20)",pl:"USDT (BEP20)"}, code:"USDT", logo:"logos/crypto/usdt-bep.png" },
  { id:"usdt-arb", type:"crypto", name:{ua:"USDT (Arbitrum)",en:"USDT (Arbitrum)",pl:"USDT (Arbitrum)"}, code:"USDT", logo:"logos/crypto/usdt-arb.png" },
  { id:"usdt-pol", type:"crypto", name:{ua:"USDT (Polygon)",en:"USDT (Polygon)",pl:"USDT (Polygon)"}, code:"USDT", logo:"logos/crypto/usdt-pol.png" },
  { id:"usdt-sol", type:"crypto", name:{ua:"USDT (Solana)",en:"USDT (Solana)",pl:"USDT (Solana)"}, code:"USDT", logo:"logos/crypto/usdt-sol.png" },

  // USDC networks
  { id:"usdc-eth", type:"crypto", name:{ua:"USDC (ERC20)",en:"USDC (ERC20)",pl:"USDC (ERC20)"}, code:"USDC", logo:"logos/crypto/usdc-eth.png" },
  { id:"usdc-pol", type:"crypto", name:{ua:"USDC (Polygon)",en:"USDC (Polygon)",pl:"USDC (Polygon)"}, code:"USDC", logo:"logos/crypto/usdc-pol.png" },
  { id:"usdc-sol", type:"crypto", name:{ua:"USDC (Solana)",en:"USDC (Solana)",pl:"USDC (Solana)"}, code:"USDC", logo:"logos/crypto/usdc-sol.png" },

  // Wallets
  { id:"paypal", type:"wallet", name:{ua:"PayPal",en:"PayPal",pl:"PayPal"}, code:"", logo:"logos/wallets/paypal.png" },
  { id:"payoneer", type:"wallet", name:{ua:"Payoneer",en:"Payoneer",pl:"Payoneer"}, code:"", logo:"logos/wallets/payoneer.png" },
  { id:"revolut", type:"wallet", name:{ua:"Revolut",en:"Revolut",pl:"Revolut"}, code:"", logo:"logos/wallets/revolut.png" },
  { id:"wise", type:"wallet", name:{ua:"Wise",en:"Wise",pl:"Wise"}, code:"", logo:"logos/wallets/vise.png" },
  { id:"wallet", type:"wallet", name:{ua:"Wallet",en:"Wallet",pl:"Wallet"}, code:"", logo:"logos/wallets/valet.png" },
];

/* ----------------- i18n ----------------- */
const I18N = {
  ua:{
    tabs:{swap:"Обмін", rules:"Правила", account:"Акаунт", more:"Ще"},
    swapTitle:"Обмін",
    give:"Віддаєте",
    get:"Отримуєте",
    search:"Пошук...",
    chooseGive:"Вибір (віддаєте)",
    chooseGet:"Вибір (отримуєте)",
    all:"Все",
    crypto:"Крипто",
    banks:"Банки",
    wallets:"Гаманці",
    rate:"Курс:",
    create:"Створити заявку",
    rulesTitle:"Правила",
    rulesText:"Тут будуть правила обміну. (Поки заглушка)",
    accTitle:"Акаунт",
    accText:"Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
    login:"Увійти",
    register:"Реєстрація",
    moreTitle:"More",
    reviews:"Відгуки",
    faq:"FAQ",
    contacts:"Контакти",
    chooseSection:"Вибери розділ."
  },
  en:{
    tabs:{swap:"Swap", rules:"Rules", account:"Account", more:"More"},
    swapTitle:"Swap",
    give:"You give",
    get:"You get",
    search:"Search...",
    chooseGive:"Select (you give)",
    chooseGet:"Select (you get)",
    all:"All",
    crypto:"Crypto",
    banks:"Banks",
    wallets:"Wallets",
    rate:"Rate:",
    create:"Create request",
    rulesTitle:"Rules",
    rulesText:"Exchange rules will be here. (Placeholder)",
    accTitle:"Account",
    accText:"Login/registration and then KYC (not connected yet).",
    login:"Login",
    register:"Register",
    moreTitle:"More",
    reviews:"Reviews",
    faq:"FAQ",
    contacts:"Contacts",
    chooseSection:"Choose a section."
  },
  pl:{
    tabs:{swap:"Wymiana", rules:"Zasady", account:"Konto", more:"Więcej"},
    swapTitle:"Wymiana",
    give:"Oddajesz",
    get:"Otrzymujesz",
    search:"Szukaj...",
    chooseGive:"Wybór (oddajesz)",
    chooseGet:"Wybór (otrzymujesz)",
    all:"Wszystko",
    crypto:"Krypto",
    banks:"Banki",
    wallets:"Portfele",
    rate:"Kurs:",
    create:"Utwórz zlecenie",
    rulesTitle:"Zasady",
    rulesText:"Tutaj będą zasady wymiany. (Placeholder)",
    accTitle:"Konto",
    accText:"Logowanie/rejestracja i dalej KYC (jeszcze nie podłączone).",
    login:"Zaloguj",
    register:"Rejestracja",
    moreTitle:"Więcej",
    reviews:"Opinie",
    faq:"FAQ",
    contacts:"Kontakt",
    chooseSection:"Wybierz sekcję."
  }
};

let state = {
  lang: "ua",
  tab: "swap",
  give: ITEMS.find(x=>x.id==="mono"),
  get: ITEMS.find(x=>x.id==="btc"),
  giveAmount: 100,
  filter: "all",
  modalOpen: false,
  modalTarget: "give", // give|get
  query: ""
};

/* ----------------- Mount ----------------- */
function mount(){
  document.body.innerHTML = `
    <div class="app">
      <div class="shell">
        <div class="topbar">
          <div class="topbarInner">
            <div class="brandRow">
              <div class="brandLeft">
                <div class="brandLogoWrap">
                  <img class="brandLogo" src="logo.png" alt="Keks logo">
                </div>
                <div class="brandTitle" aria-label="KeksSwap">
                  <span class="line" id="brandLine1">Keks</span>
                  <span class="line" id="brandLine2">Swap</span>
                </div>
              </div>

              <button class="langBtn" id="langBtn" type="button">
                <span id="langCode">UA</span><span class="chev"></span>
              </button>
            </div>

            <div class="tabs" id="tabs"></div>
          </div>
        </div>

        <div id="page"></div>
      </div>

      <div class="modalBack" id="modalBack"></div>
      <div class="modal" id="modal">
        <div class="modalSheet">
          <div class="modalTop">
            <div class="modalTitle" id="modalTitle"></div>
            <button class="modalClose" id="modalClose" type="button">✕</button>
          </div>

          <input class="search" id="search" type="text" autocomplete="off"/>

          <div class="filterTabs" id="filterTabs"></div>

          <div class="list" id="list"></div>
        </div>
      </div>
    </div>
  `;

  bind();
  render();
}

function t(){ return I18N[state.lang]; }

/* ----------------- Render ----------------- */
function render(){
  renderTabs();
  renderPage();
  renderModal();
  renderLangBtn();
  renderBrand();
}

function renderBrand(){
  // Делаем "Keks" / "Swap" — и на другом языке можно оставить бренд одинаковым
  $("#brandLine1").textContent = "Keks";
  $("#brandLine2").textContent = "Swap";
}

function renderLangBtn(){
  const map = {ua:"UA", en:"EN", pl:"PL"};
  $("#langCode").textContent = map[state.lang] || "UA";
}

function renderTabs(){
  const L = t().tabs;
  const tabs = [
    {k:"swap", label:L.swap},
    {k:"rules", label:L.rules},
    {k:"account", label:L.account},
    {k:"more", label:L.more}
  ];
  const el = $("#tabs");
  el.innerHTML = tabs.map(x=>`
    <button class="tab ${state.tab===x.k?"active":""}" data-tab="${x.k}" type="button">${x.label}</button>
  `).join("");
}

function renderPage(){
  const el = $("#page");
  if(state.tab==="swap"){
    el.innerHTML = renderSwap();
  }else if(state.tab==="rules"){
    el.innerHTML = `
      <div class="card">
        <div class="pageTitle">${t().rulesTitle}</div>
        <div class="pageText">${t().rulesText}</div>
      </div>
    `;
  }else if(state.tab==="account"){
    el.innerHTML = `
      <div class="card">
        <div class="pageTitle">${t().accTitle}</div>
        <div class="pageText">${t().accText}</div>
        <div style="height:14px"></div>
        <button class="cta" type="button">${t().login}</button>
        <div style="height:10px"></div>
        <button class="tab" type="button">${t().register}</button>
      </div>
    `;
  }else{
    el.innerHTML = `
      <div class="card">
        <div class="pageTitle">${t().moreTitle}</div>
        <div style="height:14px"></div>
        <button class="tab" type="button">${t().reviews}</button>
        <div style="height:10px"></div>
        <button class="tab" type="button">${t().faq}</button>
        <div style="height:10px"></div>
        <button class="tab" type="button">${t().contacts}</button>
        <div style="height:12px"></div>
        <div class="pageText">${t().chooseSection}</div>
      </div>
    `;
  }

  // bind swap controls after render
  if(state.tab==="swap") bindSwapControls();
}

function renderSwap(){
  const give = state.give;
  const get = state.get;

  const giveName = give.name[state.lang] || give.name.ua;
  const getName  = get.name[state.lang]  || get.name.ua;

  const giveCode = give.code || "";
  const getCode  = get.code || "";

  const rate = getRate(give, get);           // per 1 give
  const receive = (Number(state.giveAmount||0) * rate);

  return `
    <div class="card">
      <div class="h1">${t().swapTitle}</div>

      <div class="rowLabel">${t().give}</div>
      <button class="pickerBtn" id="pickGive" type="button">
        <div class="pickerIcon"><img src="${give.logo}" alt=""></div>
        <div class="pickerMain">
          <div class="pickerName">${giveName}</div>
          <div class="pickerCode">${giveCode}</div>
        </div>
        <div class="pickerRight">
          <div class="drop"></div>
        </div>
      </button>

      <input class="amount" id="giveAmount" inputmode="decimal" value="${escapeHtml(String(state.giveAmount ?? ""))}"/>

      <div class="swapWrap">
        <button class="swapBtn" id="swapBtn" type="button" aria-label="Swap">
          <!-- classic exchange arrows -->
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 7h13m0 0-3-3m3 3-3 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 17H4m0 0 3 3m-3-3 3-3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="rowLabel">${t().get}</div>
      <button class="pickerBtn" id="pickGet" type="button">
        <div class="pickerIcon"><img src="${get.logo}" alt=""></div>
        <div class="pickerMain">
          <div class="pickerName">${getName}</div>
          <div class="pickerCode">${getCode}</div>
        </div>
        <div class="pickerRight">
          <div class="drop"></div>
        </div>
      </button>

      <input class="amount" id="getAmount" value="${formatReceive(receive)}" readonly/>

      <div class="rateRow">
        <div>${t().rate}</div>
        <div class="val">${formatRateText(give, get, rate)}</div>
      </div>

      <button class="cta" id="createBtn" type="button">${t().create}</button>
    </div>
  `;
}

/* ----------------- Modal ----------------- */
function renderModal(){
  const back = $("#modalBack");
  const modal = $("#modal");
  back.classList.toggle("show", state.modalOpen);
  modal.classList.toggle("show", state.modalOpen);

  $("#modalTitle").textContent = state.modalTarget==="give" ? t().chooseGive : t().chooseGet;
  $("#search").placeholder = t().search;
  $("#search").value = state.query;

  const filterTabs = [
    {k:"all", label:t().all},
    {k:"crypto", label:t().crypto},
    {k:"bank", label:t().banks},
    {k:"wallet", label:t().wallets},
  ];
  $("#filterTabs").innerHTML = filterTabs.map(x=>`
    <button type="button" data-filter="${x.k}" class="${state.filter===x.k?"active":""}">
      ${x.label}
    </button>
  `).join("");

  const list = filteredItems();
  $("#list").innerHTML = list.map(item=>{
    const nm = item.name[state.lang] || item.name.ua;
    const cd = item.code || "";
    return `
      <div class="item" data-id="${item.id}">
        <div class="icon"><img src="${item.logo}" alt=""></div>
        <div class="t">
          <div class="name">${escapeHtml(nm)}</div>
          <div class="code">${escapeHtml(cd)}</div>
        </div>
      </div>
    `;
  }).join("");
}

function filteredItems(){
  let arr = ITEMS.slice();

  // filter
  if(state.filter !== "all"){
    arr = arr.filter(x => x.type === state.filter);
  }

  // search
  const q = (state.query||"").trim().toLowerCase();
  if(q){
    arr = arr.filter(x=>{
      const nm = (x.name[state.lang] || x.name.ua).toLowerCase();
      return nm.includes(q) || (x.code||"").toLowerCase().includes(q) || x.id.toLowerCase().includes(q);
    });
  }

  // if picking "give": allow everything; if "get": allow everything тоже (как в твоем UI)
  return arr;
}

/* ----------------- Events ----------------- */
function bind(){
  document.addEventListener("click", (e)=>{
    const tabBtn = e.target.closest("[data-tab]");
    if(tabBtn){
      state.tab = tabBtn.dataset.tab;
      render();
      return;
    }

    const langBtn = e.target.closest("#langBtn");
    if(langBtn){
      // cycle ua -> en -> pl
      state.lang = state.lang === "ua" ? "en" : state.lang === "en" ? "pl" : "ua";
      render();
      return;
    }

    if(e.target.closest("#modalBack") || e.target.closest("#modalClose")){
      closeModal();
      return;
    }

    const filterBtn = e.target.closest("[data-filter]");
    if(filterBtn){
      state.filter = filterBtn.dataset.filter;
      renderModal();
      return;
    }

    const itemEl = e.target.closest(".item[data-id]");
    if(itemEl){
      const id = itemEl.dataset.id;
      const it = ITEMS.find(x=>x.id===id);
      if(!it) return;

      if(state.modalTarget==="give") state.give = it;
      else state.get = it;

      closeModal();
      render(); // updates UI and amounts
      return;
    }
  });

  document.addEventListener("input", (e)=>{
    if(e.target && e.target.id==="search"){
      state.query = e.target.value;
      renderModal();
    }
  });
}

function bindSwapControls(){
  $("#pickGive").addEventListener("click", ()=>openModal("give"));
  $("#pickGet").addEventListener("click", ()=>openModal("get"));

  $("#swapBtn").addEventListener("click", ()=>{
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;
    render();
  });

  $("#giveAmount").addEventListener("input", (e)=>{
    const v = String(e.target.value || "").replace(",", ".");
    state.giveAmount = v;
    // update only receive box + rate line fast
    const give = state.give;
    const get = state.get;
    const rate = getRate(give, get);
    const receive = (Number(state.giveAmount||0) * rate);
    $("#getAmount").value = formatReceive(receive);
    $(".rateRow .val").textContent = formatRateText(give, get, rate);
  });

  $("#createBtn").addEventListener("click", ()=>{
    // placeholder action
    // можно потом сделать "статус заявки" после подачи
    alert("✅ " + t().create);
  });
}

/* ----------------- Modal controls ----------------- */
function openModal(target){
  state.modalTarget = target;
  state.modalOpen = true;
  state.query = "";
  state.filter = "all";
  renderModal();
  // focus search
  setTimeout(()=>$("#search")?.focus(), 50);
}
function closeModal(){
  state.modalOpen = false;
  renderModal();
}

/* ----------------- Rate logic (stub) ----------------- */
function getRate(give, get){
  // Пример: UAH -> BTC как у тебя на скрине: 100 UAH => 0.000000625 BTC
  // => 1 UAH => 0.00000000625 BTC
  if(give.code==="UAH" && get.code==="BTC") return 0.00000000625;

  // Если UAH -> USDT (примерно)
  if(give.code==="UAH" && get.code==="USDT") return 1/40;

  // Если BTC -> UAH
  if(give.code==="BTC" && get.code==="UAH") return 1 / 0.00000000625;

  // fallback
  return 1;
}

function formatRateText(give, get, rate){
  const left = give.code || give.id.toUpperCase();
  const right = get.code || get.id.toUpperCase();
  // show "1 UAH ≈ 0.00000000625 BTC" like premium
  return `1 ${left} ≈ ${trimNum(rate)} ${right}`;
}

function formatReceive(n){
  if(!isFinite(n)) return "0";
  // if very small, keep up to 10 decimals
  if(Math.abs(n) < 1) return trimNum(n, 10);
  return trimNum(n, 6);
}

function trimNum(x, maxDec=10){
  const s = Number(x).toFixed(maxDec);
  return s.replace(/\.?0+$/,"");
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, (c)=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

/* ----------------- Start ----------------- */
mount();
