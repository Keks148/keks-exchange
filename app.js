(() => {
  const tg = window.Telegram?.WebApp;

  // ---- Telegram safe areas + theme ----
  function initTelegram() {
    if (!tg) return;
    tg.ready();
    tg.expand();

    const top = (tg.safeAreaInset?.top ?? 10) + 18;     // ниже, чтобы не мешало меню Telegram
    const bottom = (tg.safeAreaInset?.bottom ?? 10) + 10;

    document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
    document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);

    try { tg.setHeaderColor?.("#f5f6fb"); } catch {}
    try { tg.setBackgroundColor?.("#f5f6fb"); } catch {}
  }

  // ---- Assets paths ----
  const ASSETS = {
    brand: "./logo.png",            // твой логотип в корне
    banksDir: "./logos/banks/",
    walletsDir: "./logos/wallets/",
    cryptoDir: "./logos/crypto/",
  };

  // ---- UI texts ----
  const I18N = {
    ua: {
      notice: "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
      exchange: "Обмін",
      give: "Віддаєте",
      get: "Отримуєте",
      menu: "Меню",
      rules: "Правила обміну",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Контакти",
      continue: "Продовжити",
      search: "Пошук...",
      pickGive: "Віддаєте",
      pickGet: "Отримуєте",
      rate: "Курс",
      fee: "Комісія сервісу",
      payout: "До виплати",
    },
    en: {
      notice: "Requests created after 22:00 are processed from 08:00 (UTC+2).",
      exchange: "Exchange",
      give: "You give",
      get: "You get",
      menu: "Menu",
      rules: "Exchange rules",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Contacts",
      continue: "Continue",
      search: "Search...",
      pickGive: "You give",
      pickGet: "You get",
      rate: "Rate",
      fee: "Service fee",
      payout: "Payout",
    },
    pl: {
      notice: "Zlecenia utworzone po 22:00 są przetwarzane od 08:00 (UTC+2).",
      exchange: "Wymiana",
      give: "Oddajesz",
      get: "Otrzymujesz",
      menu: "Menu",
      rules: "Zasady wymiany",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Kontakt",
      continue: "Kontynuuj",
      search: "Szukaj...",
      pickGive: "Oddajesz",
      pickGet: "Otrzymujesz",
      rate: "Kurs",
      fee: "Prowizja serwisu",
      payout: "Do wypłaty",
    },
  };

  // ---- Data (под твои файлы) ----
  // ВАЖНО: файлы должны совпадать по названию (lowercase лучше всего)
  const GROUPS = [
    {
      id: "usdt",
      title: { ua: "Tether USDT", en: "Tether USDT", pl: "Tether USDT" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${ASSETS.cryptoDir}tether-usdt.png`,
      items: [
        { id: "usdt-trc", name: "Tether (TRC20)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-trc.png`, rateUAH: 41.0 },
        { id: "usdt-eth", name: "Tether (ERC20)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-eth.png`, rateUAH: 41.0 },
        { id: "usdt-bep", name: "Tether (BEP20)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-bep.png`, rateUAH: 41.0 },
        { id: "usdt-arb", name: "Tether (ARB)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-arb.png`, rateUAH: 41.0 },
        { id: "usdt-pol", name: "Tether (POL)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-pol.png`, rateUAH: 41.0 },
        { id: "usdt-sol", name: "Tether (SOL)", sub: "USDT", icon: `${ASSETS.cryptoDir}usdt-sol.png`, rateUAH: 41.0 },
      ],
    },
    {
      id: "usdc",
      title: { ua: "USD Coin", en: "USD Coin", pl: "USD Coin" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${ASSETS.cryptoDir}usdc-eth.png`,
      items: [
        { id: "usdc-eth", name: "USD Coin (ERC20)", sub: "USDC", icon: `${ASSETS.cryptoDir}usdc-eth.png`, rateUAH: 41.0 },
        { id: "usdc-pol", name: "USD Coin (POL)", sub: "USDC", icon: `${ASSETS.cryptoDir}usdc-pol.png`, rateUAH: 41.0 },
        { id: "usdc-sol", name: "USD Coin (SOL)", sub: "USDC", icon: `${ASSETS.cryptoDir}usdc-sol.png`, rateUAH: 41.0 },
      ],
    },
    {
      id: "crypto",
      title: { ua: "Криптовалюти", en: "Cryptocurrencies", pl: "Kryptowaluty" },
      subtitle: { ua: "Топ монети", en: "Top coins", pl: "Top monety" },
      icon: `${ASSETS.cryptoDir}crypto.png`,   // <-- вот это
      items: [
        { id: "btc", name: "Bitcoin", sub: "BTC", icon: `${ASSETS.cryptoDir}btc.png`, rateUAH: 1500000 },
        { id: "eth", name: "Ethereum", sub: "ETH", icon: `${ASSETS.cryptoDir}eth.png`, rateUAH: 170000 },
        { id: "sol", name: "Solana", sub: "SOL", icon: `${ASSETS.cryptoDir}sol.png`, rateUAH: 7000 },
        { id: "trx", name: "Tron", sub: "TRX", icon: `${ASSETS.cryptoDir}trx.png`, rateUAH: 5.0 },
        { id: "ton", name: "TON", sub: "TON", icon: `${ASSETS.cryptoDir}ton.png`, rateUAH: 250 },
        { id: "ltc", name: "Litecoin", sub: "LTC", icon: `${ASSETS.cryptoDir}ltc.png`, rateUAH: 4000 },
      ],
    },
    {
      id: "banks_uah",
      title: { ua: "Банки - UAH", en: "Banks - UAH", pl: "Banki - UAH" },
      subtitle: { ua: "Україна", en: "Ukraine", pl: "Ukraina" },
      icon: `${ASSETS.banksDir}ukr-banki.png`,
      items: [
        { id: "mono", name: "Monobank", sub: "UAH", icon: `${ASSETS.banksDir}mono.png`, rateUAH: 1 },
        { id: "privat", name: "Privat24", sub: "UAH", icon: `${ASSETS.banksDir}privat.png`, rateUAH: 1 },
        { id: "pumb", name: "PUMB", sub: "UAH", icon: `${ASSETS.banksDir}pumb.png`, rateUAH: 1 },
        { id: "a-bank", name: "A-Bank", sub: "UAH", icon: `${ASSETS.banksDir}a-bank.png`, rateUAH: 1 },
        { id: "oschad", name: "Oschadbank", sub: "UAH", icon: `${ASSETS.banksDir}oschad.png`, rateUAH: 1 },
        { id: "otp", name: "OTP", sub: "UAH", icon: `${ASSETS.banksDir}otp.png`, rateUAH: 1 },
        { id: "visa", name: "Visa / MasterCard", sub: "UAH", icon: `${ASSETS.banksDir}visa-master.png`, rateUAH: 1 },
      ],
    },
    {
      id: "wallets",
      title: { ua: "Електронні гаманці", en: "E-wallets", pl: "Portfele elektroniczne" },
      subtitle: { ua: "USD/EUR", en: "USD/EUR", pl: "USD/EUR" },
      icon: `${ASSETS.walletsDir}valet.png`,
      items: [
        { id: "paypal", name: "PayPal", sub: "USD", icon: `${ASSETS.walletsDir}paypal.png`, rateUAH: 41.0 },
        { id: "payoneer", name: "Payoneer", sub: "USD", icon: `${ASSETS.walletsDir}payoneer.png`, rateUAH: 41.0 },
        { id: "revolut", name: "Revolut", sub: "USD", icon: `${ASSETS.walletsDir}revolut.png`, rateUAH: 41.0 },
        { id: "wise", name: "Wise", sub: "USD", icon: `${ASSETS.walletsDir}vise.png`, rateUAH: 41.0 },
      ],
    },
  ];

  // ---- State ----
  const state = {
    lang: "ua",
    view: "exchange", // exchange | menu | rules | aml | faq | contacts
    give: GROUPS[2].items[0], // BTC
    get: GROUPS[3].items[0],  // Monobank
    giveAmountStr: "",        // строка ввода (важно для фокуса)
    fee: 0.025,
    sheet: null,              // { side: 'give'|'get', search:'' }
    openGroups: new Set(["crypto", "banks_uah"]), // какие группы раскрыты
    lastEdited: "give",        // 'give' | 'get'
  };

  const el = {
    app: document.getElementById("app"),
    giveInput: null,
    getInput: null,
    giveSelectBtn: null,
    getSelectBtn: null,
    summaryRate: null,
    summaryFee: null,
    summaryPayout: null,
    sheetRoot: null,
  };

  function t(key) {
    return I18N[state.lang][key] || key;
  }

  function fmtNumber(n, maxFrac = 8) {
    if (!isFinite(n)) return "";
    const s = n.toFixed(maxFrac);
    // trim trailing zeros
    return s.replace(/\.?0+$/, "");
  }

  function parseAmount(str) {
    if (!str) return 0;
    const cleaned = String(str).replace(",", ".").replace(/[^\d.]/g, "");
    const n = Number(cleaned);
    return isFinite(n) ? n : 0;
  }

  // rate: through UAH
  // crypto item rateUAH = UAH per 1 unit
  // bank UAH item rateUAH=1
  function calcGetFromGive(giveAmount, giveItem, getItem) {
    const giveUAH = giveAmount * (giveItem.rateUAH || 0);
    const afterFeeUAH = giveUAH * (1 - state.fee);
    const getAmount = (getItem.rateUAH ? afterFeeUAH / getItem.rateUAH : 0);
    return getAmount;
  }

  function calcGiveFromGet(getAmount, giveItem, getItem) {
    const needUAH = getAmount * (getItem.rateUAH || 0);
    const beforeFeeUAH = needUAH / (1 - state.fee);
    const giveAmount = (giveItem.rateUAH ? beforeFeeUAH / giveItem.rateUAH : 0);
    return giveAmount;
  }

  // ---- Render (один раз) ----
  function mount() {
    el.app.innerHTML = `
      <div class="headerSticky">
        <div class="wrap">
          <div class="topbar">
            <div class="brand">
              <img class="brandImg" src="${ASSETS.brand}" alt="KeksSwap" />
            </div>

            <div class="controls">
              <div class="langs">
                <button class="langBtn" data-lang="ua">UA</button>
                <button class="langBtn" data-lang="en">EN</button>
                <button class="langBtn" data-lang="pl">PL</button>
              </div>
              <button class="iconBtn" id="menuBtn" aria-label="menu">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="card notice">
          <div class="dot">!</div>
          <div>
            <div class="txt" id="noticeText"></div>
          </div>
        </div>

        <div class="card exchange" id="exchangeCard" style="display:none">
          <div class="h1" id="exchangeTitle"></div>

          <div class="sectionTitle" id="giveTitle"></div>
          <div class="field">
            <div class="inputRow">
              <input id="giveAmount" class="amountInput" inputmode="decimal" placeholder="0" />
              <div class="suffix" id="giveSuffix"></div>
            </div>
            <button class="selectBtn" id="giveSelect">
              <div class="selectLeft">
                <img class="coinImg" id="giveIcon" alt="">
                <div class="selectText">
                  <div class="main" id="giveName"></div>
                  <div class="sub" id="giveSub"></div>
                </div>
              </div>
              <div class="chev"></div>
            </button>
          </div>

          <div class="swapRow">
            <button class="swapBtn" id="swapBtn" aria-label="swap">
              <svg class="swapIcon" viewBox="0 0 24 24" fill="none">
                <path d="M7 7h14l-3-3m3 3-3 3M17 17H3l3 3m-3-3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="sectionTitle" id="getTitle"></div>
          <div class="field">
            <div class="inputRow">
              <input id="getAmount" class="amountInput" inputmode="decimal" placeholder="0" />
              <div class="suffix" id="getSuffix"></div>
            </div>
            <button class="selectBtn" id="getSelect">
              <div class="selectLeft">
                <img class="coinImg" id="getIcon" alt="">
                <div class="selectText">
                  <div class="main" id="getName"></div>
                  <div class="sub" id="getSub"></div>
                </div>
              </div>
              <div class="chev"></div>
            </button>
          </div>

          <div class="card summary">
            <div class="row"><span id="rateLabel"></span><strong id="rateValue"></strong></div>
            <div class="row"><span id="feeLabel"></span><strong id="feeValue"></strong></div>
            <div class="row"><span id="payoutLabel"></span><strong id="payoutValue"></strong></div>
          </div>

          <button class="primaryBtn" id="continueBtn"></button>
        </div>

        <div class="card menuPanel" id="menuCard" style="display:none">
          <div class="h1" id="menuTitle"></div>
          <ul>
            <li data-nav="rules">${t("rules")} <span>›</span></li>
            <li data-nav="aml">${t("aml")} <span>›</span></li>
            <li data-nav="faq">${t("faq")} <span>›</span></li>
            <li data-nav="contacts">${t("contacts")} <span>›</span></li>
          </ul>
        </div>
      </div>
    `;

    // cache elements
    el.giveInput = document.getElementById("giveAmount");
    el.getInput = document.getElementById("getAmount");
    el.summaryRate = document.getElementById("rateValue");
    el.summaryFee = document.getElementById("feeValue");
    el.summaryPayout = document.getElementById("payoutValue");

    // listeners
    document.querySelectorAll(".langBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        refreshStaticTexts();
        refreshSelections();
        refreshSummary();
      });
    });

    document.getElementById("menuBtn").addEventListener("click", () => {
      state.view = (state.view === "menu") ? "exchange" : "menu";
      refreshView();
    });

    document.querySelectorAll("[data-nav]").forEach(li => {
      li.addEventListener("click", () => {
        state.view = li.dataset.nav;
        // пока сделаем как заглушки: возвращаемся в exchange + покажем меню позже
        state.view = "exchange";
        refreshView();
      });
    });

    document.getElementById("giveSelect").addEventListener("click", () => openSheet("give"));
    document.getElementById("getSelect").addEventListener("click", () => openSheet("get"));

    document.getElementById("swapBtn").addEventListener("click", () => {
      const tmp = state.give;
      state.give = state.get;
      state.get = tmp;

      // пересчёт по последнему редактированному полю
      if (state.lastEdited === "give") {
        const giveAmount = parseAmount(state.giveAmountStr);
        const getAmount = calcGetFromGive(giveAmount, state.give, state.get);
        el.getInput.value = fmtNumber(getAmount, 8);
      } else {
        const getAmount = parseAmount(el.getInput.value);
        const giveAmount = calcGiveFromGet(getAmount, state.give, state.get);
        state.giveAmountStr = fmtNumber(giveAmount, 8);
        el.giveInput.value = state.giveAmountStr;
      }
      refreshSelections();
      refreshSummary();
    });

    // !!! КЛЮЧЕВОЕ: НЕ ПЕРЕРИСОВЫВАЕМ ВЕСЬ UI НА input !!!
    el.giveInput.addEventListener("input", () => {
      state.lastEdited = "give";
      state.giveAmountStr = el.giveInput.value; // сохраняем как строку
      const giveAmount = parseAmount(state.giveAmountStr);
      const getAmount = calcGetFromGive(giveAmount, state.give, state.get);
      el.getInput.value = fmtNumber(getAmount, 8);
      refreshSummary();
    });

    el.getInput.addEventListener("input", () => {
      state.lastEdited = "get";
      const getAmount = parseAmount(el.getInput.value);
      const giveAmount = calcGiveFromGet(getAmount, state.give, state.get);
      state.giveAmountStr = fmtNumber(giveAmount, 8);
      el.giveInput.value = state.giveAmountStr;
      refreshSummary();
    });

    document.getElementById("continueBtn").addEventListener("click", () => {
      // пока просто покажем alert (потом сделаем форму заявки)
      alert("Далі зробимо форму заявки (реквізити/адреса/телефон).");
    });

    refreshStaticTexts();
    refreshView();
    refreshSelections();
    refreshSummary();
  }

  function refreshStaticTexts() {
    document.getElementById("noticeText").textContent = t("notice");
    document.getElementById("exchangeTitle").textContent = t("exchange");
    document.getElementById("giveTitle").textContent = t("give");
    document.getElementById("getTitle").textContent = t("get");
    document.getElementById("menuTitle").textContent = t("menu");

    document.getElementById("rateLabel").textContent = t("rate");
    document.getElementById("feeLabel").textContent = t("fee");
    document.getElementById("payoutLabel").textContent = t("payout");

    document.getElementById("continueBtn").textContent = t("continue");

    // langs active
    document.querySelectorAll(".langBtn").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === state.lang);
    });
  }

  function refreshView() {
    const exchangeCard = document.getElementById("exchangeCard");
    const menuCard = document.getElementById("menuCard");
    exchangeCard.style.display = (state.view === "exchange") ? "" : "none";
    menuCard.style.display = (state.view === "menu") ? "" : "none";
  }

  function refreshSelections() {
    // suffix (ticker)
    document.getElementById("giveSuffix").textContent = state.give.sub;
    document.getElementById("getSuffix").textContent = state.get.sub;

    // icons + names
    document.getElementById("giveIcon").src = state.give.icon;
    document.getElementById("giveName").textContent = `${state.give.name} ${state.give.sub}`;
    document.getElementById("giveSub").textContent = subLabelForItem(state.give);

    document.getElementById("getIcon").src = state.get.icon;
    document.getElementById("getName").textContent = `${state.get.name} ${state.get.sub}`;
    document.getElementById("getSub").textContent = subLabelForItem(state.get);
  }

  function subLabelForItem(item){
    // маленькая строка под названием — можно улучшить позже
    // пока просто "..." чтобы было красиво
    return (item.sub === "UAH") ? (state.lang === "en" ? "Bank" : state.lang === "pl" ? "Bank" : "Банк України")
                               : (state.lang === "en" ? "Crypto" : state.lang === "pl" ? "Krypto" : "Криптовалюта");
  }

  function refreshSummary() {
    const giveAmount = parseAmount(el.giveInput.value);
    const getAmount = parseAmount(el.getInput.value);

    // rate text: 1 give ≈ x get
    const rate = calcGetFromGive(1, state.give, state.get);
    el.summaryRate.textContent = `1 ${state.give.sub} ≈ ${fmtNumber(rate, 8)} ${state.get.sub}`;
    el.summaryFee.textContent = `${(state.fee * 100).toFixed(1)}%`;
    el.summaryPayout.textContent = `${fmtNumber(getAmount, 8)} ${state.get.sub}`;

    // keep give input text if empty
    if (!el.giveInput.value && state.giveAmountStr) {
      el.giveInput.value = state.giveAmountStr;
    }
  }

  // ---- Sheet (picker) ----
  function openSheet(side) {
    state.sheet = { side, search: "" };
    renderSheet();
  }

  function closeSheet() {
    state.sheet = null;
    if (el.sheetRoot) {
      el.sheetRoot.remove();
      el.sheetRoot = null;
    }
  }

  function renderSheet() {
    if (!state.sheet) return;

    closeSheet(); // remove old if any

    const root = document.createElement("div");
    root.className = "sheetBackdrop";
    root.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true">
        <div class="sheetHead">
          <div class="sheetTitle">${state.sheet.side === "give" ? t("pickGive") : t("pickGet")}</div>
          <button class="closeX" id="sheetClose" aria-label="close">
            <svg class="icon" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="searchBox">
          <input class="searchInput" id="sheetSearch" placeholder="${t("search")}" />
        </div>
        <div class="sheetBody" id="sheetBody"></div>
      </div>
    `;
    document.body.appendChild(root);
    el.sheetRoot = root;

    // events
    root.addEventListener("click", (e) => {
      if (e.target === root) closeSheet();
    });
    root.querySelector("#sheetClose").addEventListener("click", closeSheet);

    const search = root.querySelector("#sheetSearch");
    search.addEventListener("input", () => {
      state.sheet.search = search.value.trim().toLowerCase();
      fillSheetBody();
    });

    fillSheetBody();
    // focus
    setTimeout(() => search.focus(), 0);
  }

  function fillSheetBody() {
    const body = el.sheetRoot.querySelector("#sheetBody");
    body.innerHTML = "";

    const q = state.sheet.search;
    const groups = GROUPS.map(g => {
      const title = g.title[state.lang] || g.title.ua;
      const subtitle = g.subtitle[state.lang] || g.subtitle.ua;

      const items = g.items.filter(it => {
        if (!q) return true;
        const hay = `${it.name} ${it.sub} ${title} ${subtitle}`.toLowerCase();
        return hay.includes(q);
      });

      return { ...g, titleText: title, subText: subtitle, itemsFiltered: items };
    }).filter(g => g.itemsFiltered.length > 0);

    groups.forEach(g => {
      const isOpen = state.openGroups.has(g.id);
      const groupEl = document.createElement("div");
      groupEl.className = `group ${isOpen ? "open" : ""}`;
      groupEl.innerHTML = `
        <div class="groupTop" data-group="${g.id}">
          <div class="groupLeft">
            <img class="coinImg" src="${g.icon}" alt="">
            <div class="meta">
              <div class="t">${g.titleText}</div>
              <div class="s">${g.subText}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="badge">${g.itemsFiltered.length}</div>
            <div class="chev" style="transform:${isOpen ? "rotate(225deg)" : "rotate(45deg)"}"></div>
          </div>
        </div>
        <div class="groupItems"></div>
      `;
      body.appendChild(groupEl);

      groupEl.querySelector("[data-group]").addEventListener("click", () => {
        if (state.openGroups.has(g.id)) state.openGroups.delete(g.id);
        else state.openGroups.add(g.id);
        fillSheetBody();
      });

      const itemsWrap = groupEl.querySelector(".groupItems");
      if (isOpen) {
        g.itemsFiltered.forEach(it => {
          const btn = document.createElement("button");
          btn.className = "itemBtn";
          btn.innerHTML = `
            <div class="left">
              <img class="coinImg" src="${it.icon}" alt="">
              <div>
                <div class="nm">${it.name}</div>
                <div class="sb">${it.sub}</div>
              </div>
            </div>
            <span style="font-weight:900;color:rgba(15,23,42,.55)">›</span>
          `;
          btn.addEventListener("click", () => {
            if (state.sheet.side === "give") state.give = it;
            else state.get = it;

            refreshSelections();

            // пересчитать после смены валюты
            if (state.lastEdited === "give") {
              const giveAmount = parseAmount(el.giveInput.value);
              const getAmount = calcGetFromGive(giveAmount, state.give, state.get);
              el.getInput.value = fmtNumber(getAmount, 8);
            } else {
              const getAmount = parseAmount(el.getInput.value);
              const giveAmount = calcGiveFromGet(getAmount, state.give, state.get);
              state.giveAmountStr = fmtNumber(giveAmount, 8);
              el.giveInput.value = state.giveAmountStr;
            }
            refreshSummary();
            closeSheet();
          });
          itemsWrap.appendChild(btn);
        });
      }
    });
  }

  // ---- start ----
  initTelegram();
  mount();
})();
