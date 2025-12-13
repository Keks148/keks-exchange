(() => {
  const DATA = {
    banks: [
      { id: "mono", name: "Monobank", code: "UAH", type: "bank", logo: "logos/banks/mono.png" },
      { id: "privat", name: "PrivatBank", code: "UAH", type: "bank", logo: "logos/banks/privat.png" },
      { id: "oschad", name: "Oschadbank", code: "UAH", type: "bank", logo: "logos/banks/oschad.png" },
      { id: "pumb", name: "PUMB", code: "UAH", type: "bank", logo: "logos/banks/pumb.png" },
      { id: "a-bank", name: "A-Bank", code: "UAH", type: "bank", logo: "logos/banks/a-bank.png" },
      { id: "sense", name: "Sense Bank", code: "UAH", type: "bank", logo: "logos/banks/sense.png" },
      { id: "otp", name: "OTP Bank", code: "UAH", type: "bank", logo: "logos/banks/otp.png" }
    ],
    crypto: [
      { id: "btc", name: "Bitcoin", code: "BTC", type: "crypto", logo: "logos/crypto/btc.png" },
      { id: "eth", name: "Ethereum", code: "ETH", type: "crypto", logo: "logos/crypto/eth.png" },
      { id: "ltc", name: "Litecoin", code: "LTC", type: "crypto", logo: "logos/crypto/ltc.png" },
      { id: "sol", name: "Solana", code: "SOL", type: "crypto", logo: "logos/crypto/sol.png" },
      { id: "ton", name: "Toncoin", code: "TON", type: "crypto", logo: "logos/crypto/ton.png" },
      { id: "trx", name: "TRON", code: "TRX", type: "crypto", logo: "logos/crypto/trx.png" },

      { id: "usdt-trc", name: "USDT (TRC20)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-trc.png" },
      { id: "usdt-eth", name: "USDT (ERC20)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-eth.png" },
      { id: "usdt-bep", name: "USDT (BEP20)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-bep.png" },
      { id: "usdt-sol", name: "USDT (SOL)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-sol.png" },
      { id: "usdt-pol", name: "USDT (POL)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-pol.png" },
      { id: "usdt-arb", name: "USDT (ARB)", code: "USDT", type: "tether", logo: "logos/crypto/usdt-arb.png" }
    ],
  };

  const I18N = {
    uk: {
      close: "Закрити",
      exchange: "Обмін",
      rules: "Правила",
      account: "Акаунт",
      more: "Ще",
      give: "Віддаєте",
      get: "Отримуєте",
      amount: "Сума",
      rate: "Курс",
      create: "Створити заявку",
      choose: "Виберіть",
      search: "Пошук...",
      selectGive: "Вибір (віддаєте)",
      selectGet: "Вибір (отримуєте)",
      rulesText: "Тут будуть правила обміну. (Поки заглушка)",
      accText: "Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
      login: "Увійти",
      signup: "Реєстрація",
      reviews: "Відгуки",
      faq: "FAQ",
      contacts: "Контакти",
      pickSection: "Вибери розділ.",
      type_bank: "Банк",
      type_crypto: "Крипто",
      type_tether: "Крипто", // Тезер тоже показываем как “Крипто” (без “Кошелек”)
    },
    en: {
      close: "Close",
      exchange: "Swap",
      rules: "Rules",
      account: "Account",
      more: "More",
      give: "You give",
      get: "You get",
      amount: "Amount",
      rate: "Rate",
      create: "Create order",
      choose: "Choose",
      search: "Search...",
      selectGive: "Select (give)",
      selectGet: "Select (get)",
      rulesText: "Exchange rules will be here. (Stub for now)",
      accText: "Login/registration and then KYC (not connected yet).",
      login: "Log in",
      signup: "Sign up",
      reviews: "Reviews",
      faq: "FAQ",
      contacts: "Contacts",
      pickSection: "Pick a section.",
      type_bank: "Bank",
      type_crypto: "Crypto",
      type_tether: "Crypto",
    },
    pl: {
      close: "Zamknij",
      exchange: "Wymiana",
      rules: "Zasady",
      account: "Konto",
      more: "Więcej",
      give: "Oddajesz",
      get: "Otrzymujesz",
      amount: "Kwota",
      rate: "Kurs",
      create: "Utwórz zlecenie",
      choose: "Wybierz",
      search: "Szukaj...",
      selectGive: "Wybór (oddajesz)",
      selectGet: "Wybór (otrzymujesz)",
      rulesText: "Tutaj będą zasady wymiany. (Tymczasowo)",
      accText: "Logowanie/rejestracja i KYC (na razie bez podłączenia).",
      login: "Zaloguj",
      signup: "Rejestracja",
      reviews: "Opinie",
      faq: "FAQ",
      contacts: "Kontakty",
      pickSection: "Wybierz sekcję.",
      type_bank: "Bank",
      type_crypto: "Krypto",
      type_tether: "Krypto",
    }
  };

  const $ = (sel, root = document) => root.querySelector(sel);

  function clampNum(val) {
    const s = String(val || "").replace(",", ".");
    const n = parseFloat(s);
    if (Number.isNaN(n)) return 0;
    return n;
  }

  function fmt(n, digits = 8) {
    if (!isFinite(n)) return "0";
    if (n === 0) return "0";
    const abs = Math.abs(n);
    if (abs >= 1000) return n.toFixed(2);
    if (abs >= 1) return n.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");
    return n.toFixed(digits).replace(/0+$/,"").replace(/\.$/,"");
  }

  function calcRate(give, get) {
    if (!give || !get) return 0;
    const priceUAH = {
      BTC: 1600000,
      ETH: 90000,
      LTC: 4500,
      SOL: 9000,
      TON: 260,
      TRX: 6,
      USDT: 41,
      UAH: 1
    };
    const giveP = priceUAH[give.code] ?? 1;
    const getP  = priceUAH[get.code] ?? 1;
    return (giveP / getP);
  }

  function typeLabel(lang, itemType){
    const t = I18N[lang];
    if (itemType === "bank") return t.type_bank;
    if (itemType === "tether") return t.type_tether;
    return t.type_crypto;
  }

  function allItems(){
    return [...DATA.banks, ...DATA.crypto];
  }

  const state = {
    lang: "uk",
    page: "exchange",
    give: DATA.banks[0],
    get: DATA.crypto.find(x => x.id === "btc") || DATA.crypto[0],
    giveAmount: "100",
    getAmount: "0",
    modalOpen: false,
    modalTarget: "give",
    modalSearch: "",
  };

  function render() {
    const t = I18N[state.lang];
    document.documentElement.lang = state.lang;

    const app = $("#app");
    app.innerHTML = `
      <div class="container">

        <div class="headerBlock glass">
          <div class="topRow">
            <button class="closeBtn" id="closeBtn" aria-label="${t.close}">✕</button>

            <div class="brand">
              <div class="brandLogo">
                <img src="logo.png" alt="Keks" onerror="this.style.display='none'">
              </div>
              <div class="brandTitle" title="KeksSwap">KeksSwap</div>
            </div>

            <div style="position:relative;">
              <button class="langBtn" id="langBtn" aria-label="Language">
                <span class="code">${state.lang.toUpperCase()}</span>
                <span class="chev"></span>
              </button>
              <div class="langMenu" id="langMenu" style="display:none;">
                ${langItem("uk","Українська")}
                ${langItem("en","English")}
                ${langItem("pl","Polski")}
              </div>
            </div>
          </div>

          <div class="navRow">
            ${navBtn("exchange", t.exchange)}
            ${navBtn("rules", t.rules)}
            ${navBtn("account", t.account)}
            ${navBtn("more", t.more)}
          </div>
        </div>

        ${renderPage()}

      </div>

      <div class="modalOverlay ${state.modalOpen ? "open":""}" id="modalOverlay"></div>
      <div class="modalSheet ${state.modalOpen ? "open":""}" id="modalSheet">
        ${renderModal()}
      </div>
    `;

    wire();
    recalc();
  }

  function langItem(code, label){
    const active = state.lang === code ? "active" : "";
    return `<div class="langItem ${active}" data-lang="${code}">
      <span>${label}</span><small>${code.toUpperCase()}</small>
    </div>`;
  }

  function navBtn(key, label){
    const active = state.page === key ? "active" : "";
    return `<button class="pillBtn ${active}" data-page="${key}">${label}</button>`;
  }

  function renderPage(){
    const t = I18N[state.lang];

    if (state.page === "rules"){
      return `<div class="card"><div class="h1">${t.rules}</div><div class="sub">${t.rulesText}</div></div>`;
    }
    if (state.page === "account"){
      return `
        <div class="card">
          <div class="h1">${t.account}</div>
          <div class="sub">${t.accText}</div>
          <button class="primaryBtn" id="loginBtn">${t.login}</button>
          <button class="secondaryBtn" id="signupBtn">${t.signup}</button>
        </div>`;
    }
    if (state.page === "more"){
      return `
        <div class="card">
          <div class="h1">${t.more}</div>
          <button class="secondaryBtn" id="reviewsBtn">${t.reviews}</button>
          <button class="secondaryBtn" id="faqBtn">${t.faq}</button>
          <button class="secondaryBtn" id="contactsBtn">${t.contacts}</button>
          <div class="smallHint">${t.pickSection}</div>
        </div>`;
    }

    return `
      <div class="card">
        <div class="h1">${t.exchange}</div>

        <div class="sectionLabel">${t.give}</div>
        <div class="field">
          <div class="row">
            <div class="iconCircle">
              <img src="${state.give.logo}" alt="" onerror="this.style.display='none'">
            </div>
            <div class="selectBtn" id="pickGive" role="button" tabindex="0">
              <div class="left">
                <div class="name">${escapeHtml(state.give.name)}</div>
                <div class="code">${escapeHtml(state.give.code)}</div>
              </div>
              <div class="right">
                <span class="tag">${typeLabel(state.lang, state.give.type)}</span>
                <span class="chevDown"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="hrSpace"></div>

        <div class="field amountField">
          <input class="input" id="giveAmount" inputmode="decimal" value="${escapeAttr(state.giveAmount)}" aria-label="${t.amount}">
        </div>

        <div class="swapRow">
          <button class="swapBtn" id="swapBtn" aria-label="swap">
            <span class="swapArrow">↔</span>
          </button>
        </div>

        <div class="sectionLabel">${t.get}</div>
        <div class="field">
          <div class="row">
            <div class="iconCircle">
              <img src="${state.get.logo}" alt="" onerror="this.style.display='none'">
            </div>
            <div class="selectBtn" id="pickGet" role="button" tabindex="0">
              <div class="left">
                <div class="name">${escapeHtml(state.get.name)}</div>
                <div class="code">${escapeHtml(state.get.code)}</div>
              </div>
              <div class="right">
                <span class="tag">${typeLabel(state.lang, state.get.type)}</span>
                <span class="chevDown"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="hrSpace"></div>

        <div class="field amountField">
          <input class="input" id="getAmount" inputmode="decimal" value="${escapeAttr(state.getAmount)}" aria-label="${t.amount}">
        </div>

        <div class="rateLine">
          <span>${t.rate}:</span>
          <span class="value" id="rateValue">—</span>
        </div>

        <button class="primaryBtn" id="createBtn">${t.create}</button>
      </div>
    `;
  }

  function renderModal(){
    const t = I18N[state.lang];
    if (!state.modalOpen) return "";

    const title = state.modalTarget === "give" ? t.selectGive : t.selectGet;
    const list = allItems().filter(item => {
      const q = state.modalSearch.trim().toLowerCase();
      if (!q) return true;
      return (item.name + " " + item.code).toLowerCase().includes(q);
    });

    return `
      <div class="sheet">
        <div class="sheetHeader">
          <div class="t">${title}</div>
          <button class="x" id="modalClose">✕</button>
        </div>

        <div class="searchBox">
          <input id="modalSearch" placeholder="${t.search}" value="${escapeAttr(state.modalSearch)}" />
          <div class="smallHint">${t.choose}</div>
        </div>

        <div class="sheetList" id="sheetList">
          ${list.map(renderItem).join("")}
        </div>
      </div>
    `;
  }

  function renderItem(it){
    // В списке справа pill оставим, но без “wallet” вообще (у нас таких типов нет)
    const pill = (it.type === "bank") ? "bank" : "crypto";
    return `
      <div class="item" data-pick="${it.id}">
        <div class="iconCircle">
          <img src="${it.logo}" alt="" onerror="this.style.display='none'">
        </div>
        <div class="meta">
          <div class="n">${escapeHtml(it.name)}</div>
          <div class="c">${escapeHtml(it.code)}</div>
        </div>
        <div class="pill">${pill}</div>
      </div>
    `;
  }

  function wire(){
    $("#closeBtn")?.addEventListener("click", () => {});

    document.querySelectorAll("[data-page]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.page = btn.getAttribute("data-page");
        render();
      });
    });

    const langBtn = $("#langBtn");
    const langMenu = $("#langMenu");
    langBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = langMenu.style.display === "block";
      langMenu.style.display = open ? "none" : "block";
    });
    document.addEventListener("click", () => {
      if (langMenu) langMenu.style.display = "none";
    });
    langMenu?.querySelectorAll(".langItem").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        state.lang = item.getAttribute("data-lang");
        langMenu.style.display = "none";
        render();
      });
    });

    $("#pickGive")?.addEventListener("click", () => openModal("give"));
    $("#pickGet")?.addEventListener("click", () => openModal("get"));

    $("#swapBtn")?.addEventListener("click", () => {
      const g = state.give;
      state.give = state.get;
      state.get = g;
      const ga = state.giveAmount;
      state.giveAmount = state.getAmount;
      state.getAmount = ga;
      render();
    });

    $("#giveAmount")?.addEventListener("input", (e) => {
      state.giveAmount = e.target.value;
      recalc();
    });

    $("#getAmount")?.addEventListener("input", (e) => {
      state.getAmount = e.target.value;
      const rate = calcRate(state.give, state.get);
      if (rate > 0) {
        const g = clampNum(state.getAmount) / rate;
        state.giveAmount = fmt(g, 8);
        $("#giveAmount").value = state.giveAmount;
      }
      recalc();
    });

    $("#createBtn")?.addEventListener("click", () => alert("OK ✅"));

    const overlay = $("#modalOverlay");
    overlay?.addEventListener("click", closeModal);
    $("#modalClose")?.addEventListener("click", closeModal);

    $("#modalSearch")?.addEventListener("input", (e) => {
      state.modalSearch = e.target.value;
      $("#modalSheet").innerHTML = renderModal();
      wireModalOnly();
    });

    wireModalOnly();
  }

  function wireModalOnly(){
    document.querySelectorAll(".item[data-pick]").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-pick");
        const it = allItems().find(x => x.id === id);
        if (!it) return;

        if (state.modalTarget === "give") state.give = it;
        else state.get = it;

        closeModal();
        render();
      });
    });
    $("#modalClose")?.addEventListener("click", closeModal);
  }

  function openModal(target){
    state.modalTarget = target;
    state.modalSearch = "";
    state.modalOpen = true;
    render();
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    state.modalOpen = false;
    document.body.style.overflow = "";
    render();
  }

  function recalc(){
    if (state.page !== "exchange") return;

    const rate = calcRate(state.give, state.get);
    const g = clampNum(state.giveAmount);
    const getVal = g * rate;

    state.getAmount = fmt(getVal, 8);
    const getInput = $("#getAmount");
    if (getInput) getInput.value = state.getAmount;

    const rateEl = $("#rateValue");
    if (rateEl) rateEl.textContent = rate > 0 ? `1 ${state.give.code} ≈ ${fmt(rate, 10)} ${state.get.code}` : "—";
  }

  function escapeHtml(str){
    return String(str ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  function escapeAttr(str){ return escapeHtml(str).replaceAll("\n"," "); }

  render();
})();
