(() => {
  // Telegram WebApp safe areas
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();

    const top = tg.safeAreaInset?.top ?? 10;
    const bottom = tg.safeAreaInset?.bottom ?? 10;
    document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
    document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);

    try { tg.setHeaderColor("#f5f6fb"); } catch {}
    try { tg.setBackgroundColor("#f5f6fb"); } catch {}
  }

  // === Paths to your assets (your folders already match this) ===
  const ASSETS = {
    brand: "./logo.png", // если нет — поставь сюда свой логотип или удалим img вообще
    banksDir: "./logos/banks/",
    cryptoDir: "./logos/crypto/",
    walletsDir: "./logos/wallets/",
  };

  // If you don't have ./img/logo.png, use your cupcake logo from repo root:
  // ASSETS.brand = "./keksswap-logo.png" (пример)

  // === UI texts ===
  const I18N = {
    ua: {
      give: "Віддаєте",
      get: "Отримуєте",
      continue: "Продовжити",
      rules: "Правила обміну",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Контакти",
      login: "Увійти",
      notice: "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
      search: "Пошук…",
      exchange: "Обмін",
      rate: "Курс",
      fee: "Комісія сервісу",
      payout: "До виплати",
      menu: "Меню",
      back: "Назад",
    },
    en: {
      give: "You give",
      get: "You get",
      continue: "Continue",
      rules: "Exchange rules",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Contacts",
      login: "Login",
      notice: "Requests created after 22:00 are processed from 08:00 (UTC+2).",
      search: "Search…",
      exchange: "Exchange",
      rate: "Rate",
      fee: "Service fee",
      payout: "Payout",
      menu: "Menu",
      back: "Back",
    },
    pl: {
      give: "Dajesz",
      get: "Otrzymujesz",
      continue: "Kontynuuj",
      rules: "Zasady wymiany",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Kontakt",
      login: "Zaloguj",
      notice: "Zlecenia utworzone po 22:00 są realizowane od 08:00 (UTC+2).",
      search: "Szukaj…",
      exchange: "Wymiana",
      rate: "Kurs",
      fee: "Prowizja",
      payout: "Do wypłaty",
      menu: "Menu",
      back: "Wstecz",
    }
  };

  // === Data ===
  // Важно: имена файлов должны совпадать (у тебя они уже такие).
  const GROUPS = [
    {
      id: "usdt",
      title: { ua: "Tether USDT", en: "Tether USDT", pl: "Tether USDT" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${ASSETS.cryptoDir}tether-usdt.png`,
      items: [
        { id:"usdt-trc", name:"Tether (TRC20)", code:"USDT", icon:`${ASSETS.cryptoDir}usdt-trc.png`, rateUAH: 41.0 },
        { id:"usdt-eth", name:"Tether (ERC20)", code:"USDT", icon:`${ASSETS.cryptoDir}usdt-eth.png`, rateUAH: 41.0 },
        { id:"usdt-bep", name:"Tether (BEP20)", code:"USDT", icon:`${ASSETS.cryptoDir}usdt-bep.png`, rateUAH: 41.0 },
        { id:"usdt-arb", name:"Tether (ARB)",   code:"USDT", icon:`${ASSETS.cryptoDir}usdt-arb.png`, rateUAH: 41.0 },
        { id:"usdt-pol", name:"Tether (POL)",   code:"USDT", icon:`${ASSETS.cryptoDir}usdt-pol.png`, rateUAH: 41.0 },
        { id:"usdt-sol", name:"Tether (SOL)",   code:"USDT", icon:`${ASSETS.cryptoDir}usdt-sol.png`, rateUAH: 41.0 },
      ]
    },
    {
      id: "usdc",
      title: { ua: "USD Coin", en: "USD Coin", pl: "USD Coin" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${ASSETS.cryptoDir}usdc-eth.png`,
      items: [
        { id:"usdc-eth", name:"USD Coin (ERC20)", code:"USDC", icon:`${ASSETS.cryptoDir}usdc-eth.png`, rateUAH: 41.0 },
        { id:"usdc-pol", name:"USD Coin (POL)",   code:"USDC", icon:`${ASSETS.cryptoDir}usdc-pol.png`, rateUAH: 41.0 },
        { id:"usdc-sol", name:"USD Coin (SOL)",   code:"USDC", icon:`${ASSETS.cryptoDir}usdc-sol.png`, rateUAH: 41.0 },
      ]
    },
    {
      id: "crypto",
      title: { ua: "Криптовалюти", en: "Cryptocurrencies", pl: "Kryptowaluty" },
      subtitle: { ua: "Топ монети", en: "Top coins", pl: "Top monety" },
      icon: `${ASSETS.cryptoDir}btc.png`,
      items: [
        { id:"btc", name:"Bitcoin",  code:"BTC", icon:`${ASSETS.cryptoDir}btc.png`, rateUAH: 1500000 },
        { id:"eth", name:"Ethereum", code:"ETH", icon:`${ASSETS.cryptoDir}eth.png`, rateUAH: 170000 },
        { id:"sol", name:"Solana",   code:"SOL", icon:`${ASSETS.cryptoDir}sol.png`, rateUAH: 7000 },
        { id:"trx", name:"Tron",     code:"TRX", icon:`${ASSETS.cryptoDir}trx.png`, rateUAH: 5.0 },
        { id:"ton", name:"TON",      code:"TON", icon:`${ASSETS.cryptoDir}ton.png`, rateUAH: 250 },
        { id:"ltc", name:"Litecoin", code:"LTC", icon:`${ASSETS.cryptoDir}ltc.png`, rateUAH: 3500 },
      ]
    },
    {
      id: "banks",
      title: { ua: "Банки - UAH", en: "Banks - UAH", pl: "Banki - UAH" },
      subtitle: { ua: "Україна", en: "Ukraine", pl: "Ukraina" },
      icon: `${ASSETS.banksDir}ukr-banki.png`,
      items: [
        { id:"mono",   name:"Monobank",  code:"UAH", icon:`${ASSETS.banksDir}mono.png`,  rateUAH: 1 },
        { id:"privat", name:"Privat24",  code:"UAH", icon:`${ASSETS.banksDir}privat.png`,rateUAH: 1 },
        { id:"a-bank", name:"A-Bank",    code:"UAH", icon:`${ASSETS.banksDir}a-bank.png`,rateUAH: 1 },
        { id:"oschad", name:"Oschadbank",code:"UAH", icon:`${ASSETS.banksDir}oschad.png`,rateUAH: 1 },
        { id:"pumb",   name:"PUMB",      code:"UAH", icon:`${ASSETS.banksDir}pumb.png`,  rateUAH: 1 },
        { id:"otp",    name:"OTP Bank",  code:"UAH", icon:`${ASSETS.banksDir}otp.png`,   rateUAH: 1 },
        { id:"izi",    name:"izibank",   code:"UAH", icon:`${ASSETS.banksDir}izi.png`,   rateUAH: 1 },
        { id:"visa",   name:"Visa/MasterCard", code:"UAH", icon:`${ASSETS.banksDir}visa-master.png`, rateUAH: 1 },
      ]
    },
    {
      id: "wallets",
      title: { ua: "Електронні гаманці", en: "E-wallets", pl: "Portfele elektr." },
      subtitle: { ua: "USD/EUR", en: "USD/EUR", pl: "USD/EUR" },
      icon: `${ASSETS.walletsDir}valet.png`,
      items: [
        { id:"paypal",   name:"PayPal",   code:"USD", icon:`${ASSETS.walletsDir}paypal.png`,   rateUAH: 41.0 },
        { id:"revolut",  name:"Revolut",  code:"USD", icon:`${ASSETS.walletsDir}revolut.png`,  rateUAH: 41.0 },
        { id:"payoneer", name:"Payoneer", code:"USD", icon:`${ASSETS.walletsDir}payoneer.png`, rateUAH: 41.0 },
        { id:"wise",     name:"Wise",     code:"USD", icon:`${ASSETS.walletsDir}vise.png`,     rateUAH: 41.0 },
      ]
    },
  ];

  // Flatten helper
  function allItems() {
    const out = [];
    for (const g of GROUPS) for (const it of g.items) out.push({ ...it, groupId: g.id, groupIcon: g.icon, groupTitle: g.title });
    return out;
  }

  // State
  const state = {
    lang: "ua",
    giveItem: GROUPS[2].items[0], // BTC
    getItem: GROUPS[3].items[0],  // Monobank
    giveAmount: 0,
    feePct: 2.5,
    sheetMode: null, // "give" | "get"
    sheetOpen: false,
    sheetQuery: "",
  };

  const $ = (sel) => document.querySelector(sel);

  function t(key){
    return I18N[state.lang][key] ?? key;
  }

  function fmt(n){
    if (!isFinite(n)) return "0";
    return new Intl.NumberFormat(state.lang === "ua" ? "uk-UA" : (state.lang === "pl" ? "pl-PL" : "en-US"), {
      maximumFractionDigits: 8
    }).format(n);
  }

  function compute(){
    // giveItem.rateUAH = UAH per 1 coin
    // getItem.rateUAH = UAH per 1 unit of target (UAH=1, USD=41 etc)
    const giveUAH = state.giveAmount * (state.giveItem.rateUAH || 0);
    const grossGet = giveUAH / (state.getItem.rateUAH || 1);
    const fee = grossGet * (state.feePct/100);
    const payout = Math.max(0, grossGet - fee);

    return { giveUAH, grossGet, fee, payout };
  }

  function setLang(lang){
    state.lang = lang;
    render();
  }

  function swap(){
    const a = state.giveItem;
    state.giveItem = state.getItem;
    state.getItem = a;
    render();
  }

  function openSheet(mode){
    state.sheetMode = mode;
    state.sheetOpen = true;
    state.sheetQuery = "";
    render();
  }

  function closeSheet(){
    state.sheetOpen = false;
    render();
  }

  function setItem(item){
    if (state.sheetMode === "give") state.giveItem = item;
    else state.getItem = item;
    closeSheet();
  }

  function buildTopbar(){
    return `
      <div class="topbar">
        <div class="brand">
          <img src="${ASSETS.brand}" onerror="this.style.display='none'"/>
          <div class="name">KeksSwap</div>
        </div>

        <div class="langs">
          <button class="langBtn ${state.lang==='ua'?'active':''}" data-lang="ua">UA</button>
          <button class="langBtn ${state.lang==='en'?'active':''}" data-lang="en">EN</button>
          <button class="langBtn ${state.lang==='pl'?'active':''}" data-lang="pl">PL</button>
          <button class="menuBtn" id="menuBtn" title="${t('menu')}">☰</button>
        </div>
      </div>
    `;
  }

  function buildNotice(){
    return `
      <div class="card notice">
        <div class="dot">!</div>
        <div>${t('notice')}</div>
      </div>
    `;
  }

  function itemLabel(item){
    return `
      <div class="itemLeft">
        <div class="ico"><img src="${item.icon}" onerror="this.style.opacity=.15"/></div>
        <div class="itemText">
          <div class="t">${item.name} <span style="color:var(--muted);font-weight:800">${item.code}</span></div>
          <div class="s">${(item.groupTitle?.[state.lang] ?? "")}</div>
        </div>
      </div>
    `;
  }

  function buildExchange(){
    const c = compute();
    const rateLine = `${t('rate')}: 1 ${state.giveItem.code} ≈ ${fmt((state.giveItem.rateUAH||0)/(state.getItem.rateUAH||1))} ${state.getItem.code}`;
    return `
      <div class="card panel">
        <div class="sectionTitle">${t('exchange')}</div>

        <div class="inputWrap">
          <div>
            <div class="muted" style="font-weight:800;color:var(--muted);margin-bottom:6px">${t('give')}</div>
            <input class="amount" type="number" inputmode="decimal" step="any" min="0" placeholder="0.0000" id="giveAmount" value="${state.giveAmount || ""}">
            <div style="height:10px"></div>
            <button class="selectBtn" id="giveSelect">
              ${itemLabel(state.giveItem)}
              <div class="chev">▾</div>
            </button>
          </div>

          <div class="swapRow">
            <button class="swapBtn" id="swapBtn" title="swap">⇅</button>
          </div>

          <div>
            <div class="muted" style="font-weight:800;color:var(--muted);margin-bottom:6px">${t('get')}</div>
            <input class="amount" type="text" readonly value="${fmt(c.payout)}">
            <div style="height:10px"></div>
            <button class="selectBtn" id="getSelect">
              ${itemLabel(state.getItem)}
              <div class="chev">▾</div>
            </button>
          </div>
        </div>
      </div>

      <div style="height:12px"></div>

      <div class="card summary">
        <div class="big">${t('exchange')} ${state.giveItem.code} → ${state.getItem.name}</div>
        <div class="muted">${rateLine}</div>
        <div class="muted">${t('fee')}: ${state.feePct}%</div>
        <div class="big">${t('payout')}: ${fmt(c.payout)} ${state.getItem.code}</div>
        <div style="height:10px"></div>
        <button class="primaryBtn" id="continueBtn">${t('continue')}</button>
      </div>
    `;
  }

  function buildSheet(){
    if (!state.sheetOpen) return "";

    const q = state.sheetQuery.trim().toLowerCase();
    const groupsHtml = GROUPS.map((g, idx) => {
      const items = g.items.filter(it => {
        if (!q) return true;
        return (it.name + " " + it.code).toLowerCase().includes(q) || (g.title[state.lang]||"").toLowerCase().includes(q);
      });

      if (items.length === 0) return "";

      const gid = `g_${idx}`;
      const groupRow = `
        <div class="groupRow" data-toggle="${gid}">
          <div class="itemLeft">
            <div class="ico"><img src="${g.icon}" onerror="this.style.opacity=.15"/></div>
            <div class="itemText">
              <div class="t">${g.title[state.lang]}</div>
              <div class="s">${g.subtitle[state.lang] ?? ""}</div>
            </div>
          </div>
          <div class="row" style="gap:10px">
            <div class="count">${items.length}</div>
            <div class="rightArrow">▾</div>
          </div>
        </div>
      `;

      const itemsHtml = items.map(it => `
        <div class="opt" data-pick="${it.id}">
          ${itemLabel({ ...it, groupTitle: g.title })}
          <div class="rightArrow">›</div>
        </div>
      `).join("");

      return `
        ${groupRow}
        <div class="groupItems ${q ? "show" : ""}" id="${gid}">
          ${itemsHtml}
        </div>
      `;
    }).join("");

    return `
      <div class="sheetBackdrop show" id="sheetBackdrop">
        <div class="sheet">
          <div class="sheetHead">
            <div class="title">${state.sheetMode === "give" ? t("give") : t("get")}</div>
            <button class="sheetClose" id="sheetClose">✕</button>
          </div>
          <div class="search">
            <input id="sheetSearch" placeholder="${t('search')}" value="${state.sheetQuery}">
          </div>
          <div class="list" id="sheetList">
            ${groupsHtml}
          </div>
        </div>
      </div>
    `;
  }

  function buildMenuPage(){
    // простая “страница меню” вместо сломанного клика в Telegram
    return `
      <div class="card page">
        <h2>${t('menu')}</h2>
        <p>• ${t('rules')}<br/>• ${t('aml')}<br/>• ${t('faq')}<br/>• ${t('contacts')}</p>
      </div>
    `;
  }

  // simple router
  let route = "home"; // home | menu

  function render(){
    const root = $("#app");
    const content = `
      <div class="wrap">
        ${buildTopbar()}
        ${buildNotice()}

        ${route === "home" ? buildExchange() : buildMenuPage()}

        ${buildSheet()}
      </div>
    `;
    root.innerHTML = content;

    // bind events
    document.querySelectorAll(".langBtn").forEach(b=>{
      b.addEventListener("click", ()=>setLang(b.dataset.lang));
    });

    const menuBtn = $("#menuBtn");
    if (menuBtn) menuBtn.addEventListener("click", ()=>{ route = (route==="home"?"menu":"home"); render(); });

    const giveSelect = $("#giveSelect");
    if (giveSelect) giveSelect.addEventListener("click", ()=>openSheet("give"));

    const getSelect = $("#getSelect");
    if (getSelect) getSelect.addEventListener("click", ()=>openSheet("get"));

    const swapBtn = $("#swapBtn");
    if (swapBtn) swapBtn.addEventListener("click", swap);

    const giveAmount = $("#giveAmount");
    if (giveAmount) giveAmount.addEventListener("input", (e)=>{
      const v = parseFloat(e.target.value);
      state.giveAmount = isFinite(v) ? v : 0;
      // quick rerender payout only (simple: full render)
      render();
      // keep cursor at end? mobile ok
    });

    const sheetClose = $("#sheetClose");
    if (sheetClose) sheetClose.addEventListener("click", closeSheet);

    const backdrop = $("#sheetBackdrop");
    if (backdrop) backdrop.addEventListener("click", (e)=>{
      if (e.target === backdrop) closeSheet();
    });

    const search = $("#sheetSearch");
    if (search) {
      search.addEventListener("input", (e)=>{
        state.sheetQuery = e.target.value;
        // just rerender sheet
        render();
        // focus back (mobile)
        setTimeout(()=>$("#sheetSearch")?.focus(), 0);
      });
      setTimeout(()=>search.focus(), 0);
    }

    // group toggles & picks
    document.querySelectorAll("[data-toggle]").forEach(el=>{
      el.addEventListener("click", ()=>{
        const id = el.dataset.toggle;
        const block = document.getElementById(id);
        if (block) block.classList.toggle("show");
      });
    });

    // map id -> item
    const flat = allItems();
    document.querySelectorAll("[data-pick]").forEach(el=>{
      el.addEventListener("click", ()=>{
        const id = el.dataset.pick;
        const it = flat.find(x=>x.id===id);
        if (it) setItem(it);
      });
    });

    const cont = $("#continueBtn");
    if (cont) cont.addEventListener("click", ()=>{
      alert("Далі зробимо форму заявки (реквізити/адреса/телефон) та підтвердження. Поки це демо UI + логіка курсу.");
    });
  }

  render();
})();
