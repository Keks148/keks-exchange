(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();

    // безопасные отступы для шапки/низа в Telegram
    const top = tg.safeAreaInset?.top ?? 10;
    const bottom = tg.safeAreaInset?.bottom ?? 10;

    document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
    document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);

    try { tg.setHeaderColor?.("#f5f6fb"); } catch {}
    try { tg.setBackgroundColor?.("#f5f6fb"); } catch {}
  }

  // ====== ВАЖНО: пути к логотипам ======
  const LOGO = {
    brand: "./keksswap-logo.png", // <-- если добавишь свой логотип в корень. Если нет — будет эмодзи.
    banksDir: "./logos/banks/",
    walletsDir: "./logos/wallets/",
    cryptoDir: "./logos/crypto/",
  };

  // ====== ДАННЫЕ (под твои файлы) ======
  // УБЕДИСЬ, что имена файлов совпадают 1:1 (лучше все lowercase).
  const GROUPS = [
    {
      id: "usdt",
      title: { ua: "Tether USDT", en: "Tether USDT", pl: "Tether USDT" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${LOGO.cryptoDir}tether-usdt.png`,
      items: [
        { id: "usdt-trc", name: "Tether (TRC20)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-trc.png`, rateUAH: 41.0 },
        { id: "usdt-eth", name: "Tether (ERC20)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-eth.png`, rateUAH: 41.0 },
        { id: "usdt-bep", name: "Tether (BEP20)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-bep.png`, rateUAH: 41.0 },
        { id: "usdt-arb", name: "Tether (ARB)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-arb.png`, rateUAH: 41.0 },
        { id: "usdt-pol", name: "Tether (POL)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-pol.png`, rateUAH: 41.0 },
        { id: "usdt-sol", name: "Tether (SOL)", sub: "USDT", icon: `${LOGO.cryptoDir}usdt-sol.png`, rateUAH: 41.0 },
      ],
    },
    {
      id: "usdc",
      title: { ua: "USD Coin", en: "USD Coin", pl: "USD Coin" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${LOGO.cryptoDir}usdc-eth.png`,
      items: [
        { id: "usdc-eth", name: "USD Coin (ERC20)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-eth.png`, rateUAH: 41.0 },
        { id: "usdc-pol", name: "USD Coin (POL)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-pol.png`, rateUAH: 41.0 },
        { id: "usdc-sol", name: "USD Coin (SOL)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-sol.png`, rateUAH: 41.0 },
      ],
    },
    {
      id: "crypto",
      title: { ua: "Криптовалюти", en: "Cryptocurrencies", pl: "Kryptowaluty" },
      subtitle: { ua: "Топ монети", en: "Top coins", pl: "Top monety" },
      icon: `${LOGO.cryptoDir}btc.png`,
      items: [
        { id: "btc", name: "Bitcoin", sub: "BTC", icon: `${LOGO.cryptoDir}btc.png`, rateUAH: 1500000 },
        { id: "eth", name: "Ethereum", sub: "ETH", icon: `${LOGO.cryptoDir}eth.png`, rateUAH: 170000 },
        { id: "sol", name: "Solana", sub: "SOL", icon: `${LOGO.cryptoDir}sol.png`, rateUAH: 7000 },
        { id: "trx", name: "Tron", sub: "TRX", icon: `${LOGO.cryptoDir}trx.png`, rateUAH: 5.0 },
        { id: "ton", name: "TON", sub: "TON", icon: `${LOGO.cryptoDir}ton.png`, rateUAH: 250 },
        { id: "ltc", name: "Litecoin", sub: "LTC", icon: `${LOGO.cryptoDir}ltc.png`, rateUAH: 4500 },
      ],
    },
    {
      id: "banks",
      title: { ua: "Банки - UAH", en: "Banks - UAH", pl: "Banki - UAH" },
      subtitle: { ua: "Україна", en: "Ukraine", pl: "Ukraina" },
      icon: `${LOGO.banksDir}ukr-banki.png`,
      items: [
        { id: "monobank", name: "Monobank", sub: "UAH", icon: `${LOGO.banksDir}mono.png` },
        { id: "privat24", name: "Privat24", sub: "UAH", icon: `${LOGO.banksDir}privat.png` },
        { id: "visa_master", name: "Visa/MasterCard", sub: "UAH", icon: `${LOGO.banksDir}visa-master.png` },
        { id: "pumb", name: "PUMB", sub: "UAH", icon: `${LOGO.banksDir}pumb.png` },
        { id: "a_bank", name: "A-Bank", sub: "UAH", icon: `${LOGO.banksDir}a-bank.png` },
        { id: "oschad", name: "Oschadbank", sub: "UAH", icon: `${LOGO.banksDir}oschad.png` },
        { id: "ukrsib", name: "UkrSibbank", sub: "UAH", icon: `${LOGO.banksDir}ukr-sib.png` },
        { id: "otp", name: "OTP Bank", sub: "UAH", icon: `${LOGO.banksDir}otp.png` },
        { id: "sense", name: "Sense Bank", sub: "UAH", icon: `${LOGO.banksDir}sense.png` },
        { id: "reiffeisen", name: "Raiffeisen", sub: "UAH", icon: `${LOGO.banksDir}reyf.png` },
        { id: "izi", name: "iziBank", sub: "UAH", icon: `${LOGO.banksDir}izi.png` },
      ],
    },
    {
      id: "wallets",
      title: { ua: "Е-гаманці", en: "E-wallets", pl: "Portfele" },
      subtitle: { ua: "USD / EUR", en: "USD / EUR", pl: "USD / EUR" },
      icon: `${LOGO.walletsDir}valet.png`,
      items: [
        { id: "paypal", name: "PayPal", sub: "USD/EUR", icon: `${LOGO.walletsDir}paypal.png` },
        { id: "payoneer", name: "Payoneer", sub: "USD/EUR", icon: `${LOGO.walletsDir}payoneer.png` },
        { id: "revolut", name: "Revolut", sub: "USD/EUR", icon: `${LOGO.walletsDir}revolut.png` },
        { id: "volet", name: "Volet (Advcash)", sub: "EUR", icon: `${LOGO.walletsDir}valet.png` },
        { id: "wise", name: "Wise", sub: "USD/EUR", icon: `${LOGO.walletsDir}vise.png` },
      ],
    },
  ];

  const I18N = {
    ua: {
      cryptoTo: "Crypto → UAH",
      notice: "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
      give: "Віддаєте",
      receive: "Отримуєте",
      sumAfter: "Сума з урахуванням комісії сервісу",
      exchange: "Обмін",
      rate: "Курс",
      fee: "Комісія сервісу",
      payout: "До виплати",
      continue: "Продовжити",
      rules: "Правила обміну",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Контакти",
      main: "Головна",
      search: "Пошук…",
      choose: "Вибір",
      notReady: "Демо-режим: реальні платежі/AML/заявки підключимо на сервері.",
    },
    en: {
      cryptoTo: "Crypto → UAH",
      notice: "Requests created after 22:00 are processed from 08:00 (UTC+2).",
      give: "You send",
      receive: "You receive",
      sumAfter: "Amount including service fee",
      exchange: "Exchange",
      rate: "Rate",
      fee: "Service fee",
      payout: "Payout",
      continue: "Continue",
      rules: "Exchange rules",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Contacts",
      main: "Home",
      search: "Search…",
      choose: "Select",
      notReady: "Demo mode: real payments/AML/orders will be connected on the server.",
    },
    pl: {
      cryptoTo: "Crypto → UAH",
      notice: "Wnioski utworzone po 22:00 są przetwarzane od 08:00 (UTC+2).",
      give: "Oddajesz",
      receive: "Otrzymujesz",
      sumAfter: "Kwota z uwzględnieniem prowizji",
      exchange: "Wymiana",
      rate: "Kurs",
      fee: "Prowizja",
      payout: "Do wypłaty",
      continue: "Dalej",
      rules: "Zasady wymiany",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Kontakt",
      main: "Strona główna",
      search: "Szukaj…",
      choose: "Wybierz",
      notReady: "Tryb demo: płatności/AML/zlecenia podłączymy na serwerze.",
    },
  };

  // ====== СОСТОЯНИЕ ======
  const state = {
    lang: "ua",
    page: "main",
    sheetOpen: false,
    sheetTarget: "give", // give|receive
    search: "",
    give: GROUPS[0].items[0],     // usdt-trc
    receive: GROUPS.find(g=>g.id==="banks").items[0], // monobank
    giveAmount: "",
    feePct: 2.5,
  };

  // ====== ВСПОМОГ ======
  const $ = (sel, el=document) => el.querySelector(sel);

  function t(key){
    return I18N[state.lang][key] || key;
  }

  function num(val){
    const x = parseFloat(String(val).replace(",", "."));
    return Number.isFinite(x) ? x : 0;
  }

  function formatMoney(x){
    if (!Number.isFinite(x)) return "—";
    return x.toLocaleString(state.lang === "ua" ? "uk-UA" : state.lang === "pl" ? "pl-PL" : "en-US", {maximumFractionDigits: 4});
  }

  // rateUAH: сколько UAH за 1 единицу (для крипты/стейблов)
  function rateUAH(asset){
    // банки/кошельки считаем как UAH (1:1), но кошельки USD/EUR — оставим демо 1:1 тоже
    return asset.rateUAH ?? 1;
  }

  function calc(){
    const amount = num(state.giveAmount);
    if (!amount) return { rate: null, payout: null, fee: null, pair: "" };

    // если отдаём крипту -> получаем банк UAH: payout = amount * rateUAH
    // если отдаём банк -> получаем крипту: payout = amount / rateUAH(receive)
    // если обе стороны не крипта: 1:1 демо
    const giveR = rateUAH(state.give);
    const recvR = rateUAH(state.receive);

    // пересчёт через UAH как базу
    const valueUAH = amount * giveR;
    let out = valueUAH / recvR;

    const fee = out * (state.feePct / 100);
    const payout = out - fee;

    const pair = `${state.give.sub || state.give.name} → ${state.receive.sub || state.receive.name}`;
    const shownRate = (giveR / recvR);

    return { rate: shownRate, payout, fee, pair };
  }

  function openDrawer(open){
    const drawer = $(".drawer");
    if (!drawer) return;
    drawer.classList.toggle("show", !!open);
  }

  function setPage(page){
    state.page = page;
    openDrawer(false);
    render();
  }

  function openSheet(target){
    state.sheetTarget = target;
    state.search = "";
    state.sheetOpen = true;
    render();
  }

  function closeSheet(){
    state.sheetOpen = false;
    render();
  }

  function setLang(lang){
    state.lang = lang;
    render();
  }

  function pickItem(item){
    if (state.sheetTarget === "give") state.give = item;
    else state.receive = item;
    closeSheet();
  }

  function swapSides(){
    const tmp = state.give;
    state.give = state.receive;
    state.receive = tmp;

    // перезапуск суммы, чтоб не было странного пересчёта
    state.giveAmount = "";
    render();
  }

  // ====== UI ======
  function BrandIcon(){
    // если ты НЕ добавил файл keksswap-logo.png — покажем эмодзи кекс
    // можешь загрузить свой логотип в корень репо и назвать keksswap-logo.png
    return `<img src="${LOGO.brand}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';" alt="KeksSwap"/>
            <div class="fallback" style="display:none;width:34px;height:34px;border-radius:12px;background:#fff;box-shadow:0 6px 18px rgba(2,6,23,.10);display:grid;place-items:center;font-weight:900;">🧁</div>`;
  }

  function chipHTML(item){
    const title = `${item.name}`;
    const sub = `${item.sub || ""}`.trim();
    return `
      <div class="chip" role="button">
        <img src="${item.icon}" onerror="this.style.opacity=.2" alt="">
        <div style="min-width:0">
          <div class="title">${title}</div>
          <div class="sub">${sub}</div>
        </div>
        <div class="chev"></div>
      </div>
    `;
  }

  function sheetListHTML(){
    const q = state.search.trim().toLowerCase();
    const groups = GROUPS.map(g => {
      const items = g.items.filter(it => {
        if (!q) return true;
        const hay = `${it.name} ${it.sub || ""} ${g.id}`.toLowerCase();
        return hay.includes(q);
      });

      if (!items.length) return "";

      return `
        <div class="group">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <img src="${g.icon}" style="width:18px;height:18px;border-radius:6px;object-fit:contain;background:#fff" onerror="this.style.opacity=.2" alt="">
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.title[state.lang]}</span>
          </div>
          <span>${items.length}</span>
        </div>
        ${items.map(it => `
          <div class="groupRow" data-pick="${it.id}">
            <div class="left">
              <img src="${it.icon}" onerror="this.style.opacity=.2" alt="">
              <div style="min-width:0">
                <div class="t">${it.name} ${it.sub ? `<span style="color:var(--muted);font-weight:900"> ${it.sub}</span>` : ""}</div>
                <div class="s">${g.subtitle[state.lang] || ""}</div>
              </div>
            </div>
            <div class="arrow"></div>
          </div>
        `).join("")}
      `;
    }).join("");

    return groups || `<div style="padding:18px 14px;color:var(--muted);font-weight:800;">Нічого не знайдено</div>`;
  }

  function findById(id){
    for (const g of GROUPS){
      const it = g.items.find(x => x.id === id);
      if (it) return it;
    }
    return null;
  }

  function mainPageHTML(){
    const c = calc();
    const giveChip = chipHTML(state.give);
    const recvChip = chipHTML(state.receive);

    const disabled = !(num(state.giveAmount) > 0);

    return `
      <div class="wrap">
        <div class="topbar">
          <div class="brand">
            ${BrandIcon()}
            <div style="min-width:0">
              <div class="name">KeksSwap</div>
              <div class="sub">${t("cryptoTo")}</div>
            </div>
          </div>

          <div class="right">
            <div class="langs">
              <button class="lang ${state.lang==="ua"?"active":""}" data-lang="ua">UA</button>
              <button class="lang ${state.lang==="en"?"active":""}" data-lang="en">EN</button>
              <button class="lang ${state.lang==="pl"?"active":""}" data-lang="pl">PL</button>
            </div>

            <button class="iconBtn" id="openMenu" aria-label="menu">
              <div class="burger"><i></i></div>
            </button>
          </div>
        </div>

        <div class="notice">
          <div class="ico">!</div>
          <div class="txt">${t("notice")}</div>
        </div>

        <div class="card">
          <div class="cardHd">${t("give")}</div>
          <div class="block">
            <div class="field">
              <div class="row">
                <input class="amountInput" id="giveAmount" inputmode="decimal" placeholder="0.0000" value="${state.giveAmount}">
              </div>
              <div style="height:10px"></div>
              <div id="pickGive">${giveChip}</div>
              <div class="hint">${state.give.rateUAH ? `≈ ${formatMoney(rateUAH(state.give))} UAH за 1` : ""}</div>
            </div>

            <div class="swapRow">
              <button class="swapBtn" id="swapSides" aria-label="swap"><div class="swapIcon"></div></button>
            </div>

            <div class="cardHd" style="padding:0 0 10px">${t("receive")}</div>
            <div class="field">
              <div class="row">
                <input class="amountInput" id="recvAmount" disabled value="${c.payout ? formatMoney(c.payout) : ""}" placeholder="0.00">
              </div>
              <div style="height:10px"></div>
              <div id="pickReceive">${recvChip}</div>
              <div class="hint">${t("sumAfter")}</div>
            </div>
          </div>

          <div class="summary">
            <div class="line"><span>${t("exchange")}</span><strong>${c.pair || "—"}</strong></div>
            <div class="line"><span>${t("rate")}</span><strong>${c.rate ? `1 = ${formatMoney(c.rate)}` : "—"}</strong></div>
            <div class="line"><span>${t("fee")} ${state.feePct}%</span><strong>${c.fee ? formatMoney(c.fee) : "—"}</strong></div>
            <div class="line"><span>${t("payout")}</span><strong>${c.payout ? formatMoney(c.payout) : "—"}</strong></div>

            <button class="primaryBtn" id="continue" ${disabled ? "disabled":""}>${t("continue")}</button>
            <div style="margin-top:10px;color:var(--muted);font-size:12px;font-weight:700;">${t("notReady")}</div>
          </div>
        </div>
      </div>
    `;
  }

  function textPage(title, body){
    return `
      <div class="wrap">
        <div class="topbar">
          <div class="brand">
            ${BrandIcon()}
            <div style="min-width:0">
              <div class="name">KeksSwap</div>
              <div class="sub">${title}</div>
            </div>
          </div>
          <div class="right">
            <button class="iconBtn" id="openMenu" aria-label="menu">
              <div class="burger"><i></i></div>
            </button>
          </div>
        </div>

        <div class="card">
          <div class="section">
            <h2>${title}</h2>
            ${body}
          </div>
        </div>
      </div>
    `;
  }

  function pageHTML(){
    if (state.page === "main") return mainPageHTML();
    if (state.page === "rules") return textPage(t("rules"),
      `<p>Тут будуть умови сервісу: мін/макс суми, час обробки, фіксація курсу, повернення платежів тощо.</p>`);
    if (state.page === "aml") return textPage(t("aml"),
      `<p>Тут буде AML/KYC політика. У демо-версії просто сторінка, пізніше підключимо бекенд і верифікацію.</p>`);
    if (state.page === "faq") return textPage(t("faq"),
      `<p><b>Q:</b> Скільки часу займає обмін?<br><b>A:</b> В середньому 15–180 хв (залежить від банку/мережі).</p>
       <p><b>Q:</b> Фіксація курсу?<br><b>A:</b> На момент надходження коштів (як у прикладі).</p>`);
    if (state.page === "contacts") return textPage(t("contacts"),
      `<p>Додай контакти: Telegram @username, email, години підтримки.</p>`);
    return mainPageHTML();
  }

  function drawerHTML(){
    return `
      <div class="drawer ${""}">
        <div class="shade" id="closeDrawer"></div>
        <div class="panel">
          <div style="display:flex;align-items:center;gap:10px;padding:0 10px 12px;">
            <div style="width:36px;height:36px;border-radius:14px;background:#fff;box-shadow:0 10px 20px rgba(2,6,23,.10);display:grid;place-items:center;font-weight:900;">🧁</div>
            <div style="min-width:0">
              <div style="font-weight:900">KeksSwap</div>
              <div style="font-size:12px;color:var(--muted);font-weight:800">Telegram Mini App</div>
            </div>
          </div>

          <div class="navItem" data-nav="main"><span class="dot"></span>${t("main")}</div>
          <div class="navItem" data-nav="rules"><span class="dot"></span>${t("rules")}</div>
          <div class="navItem" data-nav="aml"><span class="dot"></span>${t("aml")}</div>
          <div class="navItem" data-nav="faq"><span class="dot"></span>${t("faq")}</div>
          <div class="navItem" data-nav="contacts"><span class="dot"></span>${t("contacts")}</div>

          <div style="height:10px"></div>
          <div class="navItem secondary" id="closeMenu"><span class="dot"></span>Закрити</div>
        </div>
      </div>
    `;
  }

  function sheetHTML(){
    return `
      <div class="backdrop ${state.sheetOpen ? "show":""}" id="sheetBackdrop"></div>
      <div class="sheet ${state.sheetOpen ? "show":""}">
        <div class="sheetHd">
          <div class="ttl">${t("choose")} — ${state.sheetTarget === "give" ? t("give") : t("receive")}</div>
          <div class="close" id="sheetClose"></div>
        </div>
        <div class="search">
          <input id="sheetSearch" placeholder="${t("search")}" value="${state.search}">
        </div>
        <div class="list" id="sheetList">
          ${sheetListHTML()}
        </div>
      </div>
    `;
  }

  function render(){
    const app = document.getElementById("app");
    app.innerHTML = `
      ${pageHTML()}
      ${drawerHTML()}
      ${sheetHTML()}
    `;

    // Lang buttons
    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });

    // Menu
    const openMenu = document.getElementById("openMenu");
    if (openMenu) openMenu.addEventListener("click", () => openDrawer(true));

    const closeDrawer = document.getElementById("closeDrawer");
    if (closeDrawer) closeDrawer.addEventListener("click", () => openDrawer(false));

    const closeMenu = document.getElementById("closeMenu");
    if (closeMenu) closeMenu.addEventListener("click", () => openDrawer(false));

    document.querySelectorAll("[data-nav]").forEach(el=>{
      el.addEventListener("click", () => setPage(el.dataset.nav));
    });

    // Inputs
