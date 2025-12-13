(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try { tg.ready(); tg.expand(); } catch(e){}
    const top = tg.safeAreaInset?.top ?? 0;
    const bottom = tg.safeAreaInset?.bottom ?? 0;
    document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
    document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);
    try { tg.setHeaderColor?.("#eef0ff"); } catch(e){}
    try { tg.setBackgroundColor?.("#eef0ff"); } catch(e){}
  }

  // ===== DATA (иконки уже лежат у тебя в /logos/* и logo.png в корне) =====
  const LOGO = {
    brand: "./logo.png",
    banksDir: "./logos/banks/",
    walletsDir: "./logos/wallets/",
    cryptoDir: "./logos/crypto/",
  };

  // rateUAH: курс в гривне за 1 единицу
  // (примерно как ты уже использовал)
  const ASSETS = {
    // FIAT / BANKS
    uah:   { id:"uah", name:"UAH", sub:"Україна", icon:`${LOGO.banksDir}mono.png`, rateUAH: 1, group:"banks" },

    // STABLES (как доллар)
    usdt_trc: { id:"usdt-trc", name:"Tether (TRC20)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-trc.png`, rateUAH: 41.0, group:"usdt" },
    usdt_eth: { id:"usdt-eth", name:"Tether (ERC20)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-eth.png`, rateUAH: 41.0, group:"usdt" },
    usdt_bep: { id:"usdt-bep", name:"Tether (BEP20)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-bep.png`, rateUAH: 41.0, group:"usdt" },
    usdt_sol: { id:"usdt-sol", name:"Tether (SOL)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-sol.png`, rateUAH: 41.0, group:"usdt" },
    usdt_pol: { id:"usdt-pol", name:"Tether (POL)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-pol.png`, rateUAH: 41.0, group:"usdt" },
    usdt_arb: { id:"usdt-arb", name:"Tether (ARB)", sub:"USDT", icon:`${LOGO.cryptoDir}usdt-arb.png`, rateUAH: 41.0, group:"usdt" },

    usdc_eth: { id:"usdc-eth", name:"USD Coin (ERC20)", sub:"USDC", icon:`${LOGO.cryptoDir}usdc-eth.png`, rateUAH: 41.0, group:"usdc" },
    usdc_sol: { id:"usdc-sol", name:"USD Coin (SOL)", sub:"USDC", icon:`${LOGO.cryptoDir}usdc-sol.png`, rateUAH: 41.0, group:"usdc" },
    usdc_pol: { id:"usdc-pol", name:"USD Coin (POL)", sub:"USDC", icon:`${LOGO.cryptoDir}usdc-pol.png`, rateUAH: 41.0, group:"usdc" },

    // TOP COINS
    btc: { id:"btc", name:"Bitcoin", sub:"BTC", icon:`${LOGO.cryptoDir}btc.png`, rateUAH: 1500000, group:"crypto" },
    eth: { id:"eth", name:"Ethereum", sub:"ETH", icon:`${LOGO.cryptoDir}eth.png`, rateUAH: 170000, group:"crypto" },
    sol: { id:"sol", name:"Solana", sub:"SOL", icon:`${LOGO.cryptoDir}sol.png`, rateUAH: 7000, group:"crypto" },
    trx: { id:"trx", name:"Tron", sub:"TRX", icon:`${LOGO.cryptoDir}trx.png`, rateUAH: 5.0, group:"crypto" },
    ton: { id:"ton", name:"TON", sub:"TON", icon:`${LOGO.cryptoDir}ton.png`, rateUAH: 250, group:"crypto" },

    // BANKS (примеры — добавляй свои, иконки у тебя есть)
    mono:  { id:"mono", name:"Monobank", sub:"UAH", icon:`${LOGO.banksDir}mono.png`, rateUAH: 1, group:"banks" },
    privat:{ id:"privat", name:"PrivatBank", sub:"UAH", icon:`${LOGO.banksDir}privat.png`, rateUAH: 1, group:"banks" },

    // WALLETS (пример)
    paypal: { id:"paypal", name:"PayPal", sub:"USD/EUR", icon:`${LOGO.walletsDir}paypal.png`, rateUAH: 41.0, group:"wallets" },
    revolut:{ id:"revolut", name:"Revolut", sub:"USD/EUR", icon:`${LOGO.walletsDir}revolut.png`, rateUAH: 41.0, group:"wallets" },
  };

  const GROUPS = [
    { id:"banks",  title:{ua:"Банки - UAH", en:"Banks - UAH", pl:"Banki - UAH"}, items:["mono","privat"] },
    { id:"usdt",   title:{ua:"Tether USDT", en:"Tether USDT", pl:"Tether USDT"}, items:["usdt_trc","usdt_eth","usdt_bep","usdt_sol","usdt_pol","usdt_arb"] },
    { id:"usdc",   title:{ua:"USD Coin", en:"USD Coin", pl:"USD Coin"}, items:["usdc_eth","usdc_pol","usdc_sol"] },
    { id:"crypto", title:{ua:"Криптовалюти", en:"Cryptocurrencies", pl:"Kryptowaluty"}, items:["btc","eth","sol","trx","ton"] },
    { id:"wallets",title:{ua:"Електронні гаманці", en:"E-wallets", pl:"Portfele"}, items:["paypal","revolut"] },
  ];

  const LANGS = ["ua","en","pl"];
  const I18N = {
    ua: { exchange:"Обмін", rules:"Правила", account:"Аккаунт", more:"Ще", reviews:"Відгуки",
          give:"Віддаєте", get:"Отримуєте", continue:"Продовжити", pick:"Вибір",
          modalFrom:"Віддаєте", modalTo:"Отримуєте", search:"Пошук..." },
    en: { exchange:"Exchange", rules:"Rules", account:"Account", more:"More", reviews:"Reviews",
          give:"You give", get:"You get", continue:"Continue", pick:"Select",
          modalFrom:"You give", modalTo:"You get", search:"Search..." },
    pl: { exchange:"Wymiana", rules:"Zasady", account:"Konto", more:"Więcej", reviews:"Opinie",
          give:"Oddajesz", get:"Otrzymujesz", continue:"Kontynuuj", pick:"Wybierz",
          modalFrom:"Oddajesz", modalTo:"Otrzymujesz", search:"Szukaj..." },
  };

  // ===== STATE =====
  const state = {
    lang: "ua",
    tab: "exchange",
    feePct: 2.5,
    from: "mono",
    to: "btc",
    fromAmount: "1000",
  };

  // ===== Helpers =====
  const $ = (sel, el=document) => el.querySelector(sel);
  const fmt = (n, max=8) => {
    if (!isFinite(n)) return "";
    const s = n.toFixed(max);
    // trim zeros
    return s.replace(/\.?0+$/,"");
  };
  const parseNum = (s) => {
    if (!s) return 0;
    const x = String(s).replace(",", ".").replace(/[^\d.]/g, "");
    return Number(x) || 0;
  };

  const calcToAmount = () => {
    const a = ASSETS[state.from];
    const b = ASSETS[state.to];
    const x = parseNum(state.fromAmount);
    if (!a || !b || x <= 0) return "";

    // convert via UAH
    const uah = x * a.rateUAH;
    const y = (uah / b.rateUAH) * (1 - state.feePct/100);
    return fmt(y, 8);
  };

  // ===== UI build once (no re-render inputs => no focus drop) =====
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="header">
      <div class="brandRow">
        <div class="brandLeft">
          <div class="brandLogo"><img src="${LOGO.brand}" alt="logo"></div>
          <div class="brandName">KeksSwap</div>
        </div>
        <div class="langRow" id="langRow"></div>
      </div>

      <div class="navRow" id="navRow"></div>
    </div>

    <div class="wrap">
      <div class="card" id="screen"></div>
    </div>

    <div class="backdrop" id="backdrop" aria-hidden="true">
      <div class="sheet">
        <div class="sheetTop">
          <div class="sheetTitle" id="sheetTitle"></div>
          <button class="sheetClose" id="sheetClose">×</button>
        </div>
        <div class="sheetSearch">
          <input id="sheetSearch" placeholder="Search..." />
        </div>
        <div class="sheetList" id="sheetList"></div>
      </div>
    </div>
  `;

  // ===== Language buttons =====
  const langRow = $("#langRow");
  const renderLangButtons = () => {
    langRow.innerHTML = LANGS.map(l => `
      <button class="langBtn ${state.lang===l?"active":""}" data-lang="${l}">${l.toUpperCase()}</button>
    `).join("");
  };
  langRow.addEventListener("click", (e) => {
    const b = e.target.closest(".langBtn");
    if (!b) return;
    state.lang = b.dataset.lang;
    renderLangButtons();
    renderNav();
    renderScreen();
    closeSheet();
  });

  // ===== Top nav =====
  const navRow = $("#navRow");
  const renderNav = () => {
    const t = I18N[state.lang];
    const items = [
      { id:"exchange", label:t.exchange },
      { id:"rules", label:t.rules },
      { id:"reviews", label:t.reviews },
      { id:"account", label:t.account },
      { id:"more", label:t.more },
    ];
    navRow.innerHTML = items.map(it => `
      <button class="navPill ${state.tab===it.id?"active":""}" data-tab="${it.id}">${it.label}</button>
    `).join("");
  };
  navRow.addEventListener("click", (e) => {
    const b = e.target.closest(".navPill");
    if (!b) return;
    state.tab = b.dataset.tab;
    renderNav();
    renderScreen();
  });

  // ===== Screen render (safe, small updates) =====
  const screen = $("#screen");
  let fromInputEl, toInputEl, fromPickBtn, toPickBtn;

  const renderExchange = () => {
    const t = I18N[state.lang];
    const from = ASSETS[state.from];
    const to = ASSETS[state.to];

    screen.innerHTML = `
      <div class="h1">${t.exchange}</div>

      <div class="label">${t.give}</div>

      <!-- currency pick first, then amount (как ты просил) -->
      <div class="field">
        <button class="selectBtn" id="fromPick">
          <div class="assetLeft">
            <div class="assetIcon"><img src="${from.icon}" alt=""></div>
            <div>
              <div class="assetName">${from.name}</div>
              <div class="assetSub">${from.sub}</div>
            </div>
          </div>
          <div class="chev">▼</div>
        </button>
      </div>

      <div style="height:10px"></div>

      <div class="field">
        <input class="amountInput" id="fromAmount" inputmode="decimal" autocomplete="off" spellcheck="false" value="${state.fromAmount}">
      </div>

      <div class="swapWrap">
        <button class="swapBtn" id="swapBtn" aria-label="swap">
          <!-- nicer arrows -->
          <svg viewBox="0 0 24 24">
            <path d="M7 7h12l-2-2"></path>
            <path d="M19 7l-2 2"></path>
            <path d="M17 17H5l2 2"></path>
            <path d="M5 17l2-2"></path>
          </svg>
        </button>
      </div>

      <div class="label">${t.get}</div>

      <div class="field">
        <button class="selectBtn" id="toPick">
          <div class="assetLeft">
            <div class="assetIcon"><img src="${to.icon}" alt=""></div>
            <div>
              <div class="assetName">${to.name}</div>
              <div class="assetSub">${to.sub}</div>
            </div>
          </div>
          <div class="chev">▼</div>
        </button>
      </div>

      <div style="height:10px"></div>

      <div class="field">
        <input class="amountInput" id="toAmount" readonly value="">
      </div>

      <button class="cta" id="continueBtn">${t.continue}</button>
    `;

    fromInputEl = $("#fromAmount");
    toInputEl = $("#toAmount");
    fromPickBtn = $("#fromPick");
    toPickBtn = $("#toPick");

    // set calculated value once
    toInputEl.value = calcToAmount();

    // IMPORTANT: no re-render on each keystroke => focus stays
    fromInputEl.addEventListener("input", () => {
      state.fromAmount = fromInputEl.value;
      toInputEl.value = calcToAmount();
    });

    $("#swapBtn").addEventListener("click", () => {
      const tmp = state.from;
      state.from = state.to;
      state.to = tmp;
      renderScreen();
    });

    fromPickBtn.addEventListener("click", () => openSheet("from"));
    toPickBtn.addEventListener("click", () => openSheet("to"));

    $("#continueBtn").addEventListener("click", () => {
      // пока без бэка — просто показываем черновик заявки
      const a = ASSETS[state.from], b = ASSETS[state.to];
      const x = parseNum(state.fromAmount);
      const y = parseNum(calcToAmount());
      alert(`Заявка (черновик)\n\n${a.name} → ${b.name}\nСумма: ${x}\nК получению: ${y}\nКомиссия: ${state.feePct}%`);
    });
  };

  const renderRules = () => {
    screen.innerHTML = `
      <div class="h1">Rules</div>
      <div style="color:#5b6474;font-weight:800;line-height:1.5">
        Тут будут правила обмена. (Пока заглушка)
      </div>
    `;
  };

  const renderReviews = () => {
    screen.innerHTML = `
      <div class="h1">Reviews</div>
      <div style="color:#5b6474;font-weight:800;line-height:1.5">
        Тут будут отзывы (заглушка). Позже добавим список + форму.
      </div>
    `;
  };

  const renderAccount = () => {
    screen.innerHTML = `
      <div class="h1">Account</div>
      <div style="color:#5b6474;font-weight:800;line-height:1.5;margin-bottom:14px">
        Здесь будет вход/регистрация и дальше KYC (пока без подключения).
      </div>

      <button class="cta" id="loginBtn">Войти</button>
      <div style="height:10px"></div>
      <button class="cta" id="regBtn">Регистрация</button>
    `;

    $("#loginBtn").addEventListener("click", () => alert("Вход — заглушка. Потом подключим."));
    $("#regBtn").addEventListener("click", () => alert("Регистрация — заглушка. Потом подключим KYC."));
  };

  const renderMore = () => {
    screen.innerHTML = `
      <div class="h1">More</div>
      <div style="color:#5b6474;font-weight:800;line-height:1.5">
        Сюда потом добавим: AML/KYC, FAQ, Контакты и т.д.
      </div>
    `;
  };

  const renderScreen = () => {
    if (state.tab === "exchange") renderExchange();
    else if (state.tab === "rules") renderRules();
    else if (state.tab === "reviews") renderReviews();
    else if (state.tab === "account") renderAccount();
    else renderMore();
  };

  // ===== Bottom sheet picker =====
  const backdrop = $("#backdrop");
  const sheetTitle = $("#sheetTitle");
  const sheetList = $("#sheetList");
  const sheetSearch = $("#sheetSearch");
  const sheetClose = $("#sheetClose");

  let sheetMode = "from"; // or "to"

  const openSheet = (mode) => {
    sheetMode = mode;
    const t = I18N[state.lang];

    sheetTitle.textContent = mode === "from" ? t.modalFrom : t.modalTo;
    sheetSearch.value = "";
    sheetSearch.placeholder = t.search;

    renderSheetList("");
    backdrop.classList.add("show");
    backdrop.setAttribute("aria-hidden", "false");

    // focus search
    setTimeout(() => sheetSearch.focus(), 50);
  };

  const closeSheet = () => {
    backdrop.classList.remove("show");
    backdrop.setAttribute("aria-hidden", "true");
  };

  sheetClose.addEventListener("click", closeSheet);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeSheet();
  });

  sheetSearch.addEventListener("input", () => renderSheetList(sheetSearch.value));

  const renderSheetList = (q) => {
    const query = (q || "").trim().toLowerCase();

    const blocks = GROUPS.map(g => {
      const items = g.items
        .map(k => ASSETS[k])
        .filter(Boolean)
        .filter(it => {
          if (!query) return true;
          return (it.name + " " + it.sub).toLowerCase().includes(query);
        });

      if (!items.length) return "";

      const title = g.title[state.lang] || g.title.ua;

      const htmlItems = items.map(it => `
        <div class="item" data-id="${it.id}">
          <div class="itemLeft">
            <div class="assetIcon"><img src="${it.icon}" alt=""></div>
            <div style="min-width:0">
              <div class="itemName">${it.name} <span style="opacity:.55;font-weight:900">${it.sub}</span></div>
              <div class="itemSub">min 10 • max 100000</div>
            </div>
          </div>
          <div class="badge">›</div>
        </div>
      `).join("");

      return `
        <div style="font-weight:950;color:#5b6474;margin:12px 2px 10px">${title}</div>
        ${htmlItems}
      `;
    }).join("");

    sheetList.innerHTML = blocks || `<div style="color:#7b8496;font-weight:800;padding:12px">Ничего не найдено</div>`;
  };

  sheetList.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    const id = item.dataset.id;

    if (sheetMode === "from") state.from = id;
    else state.to = id;

    closeSheet();
    renderScreen();
  });

  // ===== Init =====
  renderLangButtons();
  renderNav();
  renderScreen();
})();
