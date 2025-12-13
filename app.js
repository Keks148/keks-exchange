(() => {
  const tg = window.Telegram?.WebApp;

  // -------- Telegram safe areas --------
  function initTelegram() {
    if (!tg) return;
    try { tg.ready(); } catch {}
    try { tg.expand(); } catch {}

    const top = tg.safeAreaInset?.top ?? 10;
    const bottom = tg.safeAreaInset?.bottom ?? 10;

    document.documentElement.style.setProperty('--safeTop', `${Math.max(10, top)}px`);
    document.documentElement.style.setProperty('--safeBottom', `${Math.max(14, bottom)}px`);

    try { tg.setHeaderColor?.('#f5f6fb'); } catch {}
    try { tg.setBackgroundColor?.('#f5f6fb'); } catch {}
  }

  // -------- Helpers --------
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, props = {}) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    for (const [k, v] of Object.entries(props)) {
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    return n;
  };

  const clampNum = (x) => (Number.isFinite(x) ? x : 0);

  const parseAmount = (s) => {
    s = String(s ?? '').replace(/\s+/g, '').replace(',', '.');
    s = s.replace(/[^0-9.]/g, '');
    const parts = s.split('.');
    if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');
    const v = parseFloat(s);
    return Number.isFinite(v) ? v : 0;
  };

  const fmt = (v, decimals = 8) => {
    if (!Number.isFinite(v)) return '';
    if (v >= 1000) return String(Math.round(v));
    return v.toFixed(decimals).replace(/\.?0+$/, '');
  };

  // -------- Paths --------
  const LOGO = {
    header: './logo.png', // ✅ твой logo.png
    banksDir: './logos/banks/',
    walletsDir: './logos/wallets/',
    cryptoDir: './logos/crypto/',
  };

  // -------- Data --------
  const GROUPS = [
    {
      id: 'banks',
      title: { ua: 'Банки - UAH', en: 'Banks - UAH', pl: 'Banki - UAH' },
      subtitle: { ua: 'Україна', en: 'Ukraine', pl: 'Ukraina' },
      icon: `${LOGO.banksDir}mono.png`,
      items: [
        { id:'mono', name:'Monobank', sub:'UAH', icon:`${LOGO.banksDir}mono.png`, rateUAH:1, type:'fiat' },
        { id:'privat', name:'PrivatBank', sub:'UAH', icon:`${LOGO.banksDir}privat.png`, rateUAH:1, type:'fiat' },
        { id:'a-bank', name:'A-Bank', sub:'UAH', icon:`${LOGO.banksDir}a-bank.png`, rateUAH:1, type:'fiat' },
        { id:'oschad', name:'Oschadbank', sub:'UAH', icon:`${LOGO.banksDir}oschad.png`, rateUAH:1, type:'fiat' },
        { id:'pumb', name:'PUMB', sub:'UAH', icon:`${LOGO.banksDir}pumb.png`, rateUAH:1, type:'fiat' },
        { id:'otp', name:'OTP', sub:'UAH', icon:`${LOGO.banksDir}otp.png`, rateUAH:1, type:'fiat' },
        { id:'sense', name:'Sense', sub:'UAH', icon:`${LOGO.banksDir}sense.png`, rateUAH:1, type:'fiat' },
        { id:'reif', name:'Raiffeisen', sub:'UAH', icon:`${LOGO.banksDir}reif.png`, rateUAH:1, type:'fiat' },
      ]
    },
    {
      id: 'usdt',
      title: { ua: 'Tether USDT', en: 'Tether USDT', pl: 'Tether USDT' },
      subtitle: { ua: 'Мережі', en: 'Networks', pl: 'Sieci' },
      icon: `${LOGO.cryptoDir}tether-usdt.png`,
      items: [
        { id:'usdt-trc', name:'Tether (TRC20)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-trc.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdt-eth', name:'Tether (ERC20)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-eth.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdt-bep', name:'Tether (BEP20)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-bep.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdt-arb', name:'Tether (ARB)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-arb.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdt-pol', name:'Tether (POL)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-pol.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdt-sol', name:'Tether (SOL)', sub:'USDT', icon:`${LOGO.cryptoDir}usdt-sol.png`, rateUAH:41, min:10, max:100000, type:'stable' },
      ]
    },
    {
      id: 'usdc',
      title: { ua: 'USD Coin', en: 'USD Coin', pl: 'USD Coin' },
      subtitle: { ua: 'Мережі', en: 'Networks', pl: 'Sieci' },
      icon: `${LOGO.cryptoDir}usdc-eth.png`,
      items: [
        { id:'usdc-eth', name:'USD Coin (ERC20)', sub:'USDC', icon:`${LOGO.cryptoDir}usdc-eth.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdc-pol', name:'USD Coin (POL)', sub:'USDC', icon:`${LOGO.cryptoDir}usdc-pol.png`, rateUAH:41, min:10, max:100000, type:'stable' },
        { id:'usdc-sol', name:'USD Coin (SOL)', sub:'USDC', icon:`${LOGO.cryptoDir}usdc-sol.png`, rateUAH:41, min:10, max:100000, type:'stable' },
      ]
    },
    {
      id: 'crypto',
      title: { ua: 'Криптовалюти', en: 'Cryptocurrencies', pl: 'Kryptowaluty' },
      subtitle: { ua: 'Топ монети', en: 'Top coins', pl: 'Top monety' },
      icon: `${LOGO.cryptoDir}crypto.png`,
      items: [
        { id:'btc', name:'Bitcoin', sub:'BTC', icon:`${LOGO.cryptoDir}btc.png`, rateUAH:1500000, type:'coin' },
        { id:'eth', name:'Ethereum', sub:'ETH', icon:`${LOGO.cryptoDir}eth.png`, rateUAH:170000, type:'coin' },
        { id:'sol', name:'Solana', sub:'SOL', icon:`${LOGO.cryptoDir}sol.png`, rateUAH:7000, type:'coin' },
        { id:'trx', name:'TRON', sub:'TRX', icon:`${LOGO.cryptoDir}trx.png`, rateUAH:5.0, type:'coin' },
        { id:'ton', name:'TON', sub:'TON', icon:`${LOGO.cryptoDir}ton.png`, rateUAH:250, type:'coin' },
        { id:'ltc', name:'Litecoin', sub:'LTC', icon:`${LOGO.cryptoDir}ltc.png`, rateUAH:4500, type:'coin' },
      ]
    },
    {
      id: 'wallets',
      title: { ua: 'Електронні гаманці', en: 'E-wallets', pl: 'Portfele' },
      subtitle: { ua: 'USD/EUR', en: 'USD/EUR', pl: 'USD/EUR' },
      icon: `${LOGO.walletsDir}valet.png`,
      items: [
        { id:'paypal', name:'PayPal', sub:'USD', icon:`${LOGO.walletsDir}paypal.png`, rateUAH:41, type:'stable' },
        { id:'payoneer', name:'Payoneer', sub:'USD', icon:`${LOGO.walletsDir}payoneer.png`, rateUAH:41, type:'stable' },
        { id:'revolut', name:'Revolut', sub:'EUR', icon:`${LOGO.walletsDir}revolut.png`, rateUAH:45, type:'stable' },
        { id:'vise', name:'Visa/Master', sub:'USD', icon:`${LOGO.walletsDir}vise.png`, rateUAH:41, type:'stable' },
      ]
    }
  ];

  const ALL_ITEMS = GROUPS.flatMap(g => g.items.map(it => ({
    ...it,
    groupId: g.id,
    groupTitle: g.title,
    groupSubtitle: g.subtitle,
  })));

  const findItem = (id) => ALL_ITEMS.find(x => x.id === id) || ALL_ITEMS[0];

  // -------- State --------
  const state = {
    lang: 'ua',
    tab: 'exchange',
    feePct: 2.5,

    from: findItem('mono'),
    to: findItem('btc'),

    fromAmount: 1000,
    toAmount: 0,

    modalOpen: false,
    modalSide: 'from',
    search: '',
  };

  // -------- Texts --------
  const T = {
    exchange: { ua:'Обмін', en:'Exchange', pl:'Wymiana' },
    rules: { ua:'Правила', en:'Rules', pl:'Zasady' },
    faq: { ua:'FAQ', en:'FAQ', pl:'FAQ' },
    contacts: { ua:'Контакти', en:'Contacts', pl:'Kontakty' },
    account: { ua:'Акаунт', en:'Account', pl:'Konto' },

    give: { ua:'Віддаєте', en:'You send', pl:'Wysyłasz' },
    get:  { ua:'Отримуєте', en:'You get',  pl:'Otrzymujesz' },
    search: { ua:'Пошук...', en:'Search...', pl:'Szukaj...' },

    rate: { ua:'Курс', en:'Rate', pl:'Kurs' },
    fee: { ua:'Комісія сервісу', en:'Service fee', pl:'Prowizja' },

    continue: { ua:'Продовжити', en:'Continue', pl:'Dalej' },

    login: { ua:'Увійти', en:'Sign in', pl:'Zaloguj' },
    register: { ua:'Реєстрація', en:'Register', pl:'Rejestracja' },
  };

  const tr = (key) => (T[key]?.[state.lang] ?? T[key]?.ua ?? key);

  // -------- Calculate --------
  function calcToFromUAH(item) {
    return clampNum(item.rateUAH || 0);
  }

  function recalcFromAmount() {
    const a = clampNum(state.fromAmount);
    const fromUAH = calcToFromUAH(state.from);
    const toUAH = calcToFromUAH(state.to);

    if (!fromUAH || !toUAH) { state.toAmount = 0; return; }

    const uah = a * fromUAH;
    const grossTo = uah / toUAH;

    const fee = (grossTo * state.feePct) / 100;
    state.toAmount = Math.max(0, grossTo - fee);
  }

  function recalcToAmount() {
    const b = clampNum(state.toAmount);
    const fromUAH = calcToFromUAH(state.from);
    const toUAH = calcToFromUAH(state.to);

    if (!fromUAH || !toUAH) { state.fromAmount = 0; return; }

    const k = 1 - state.feePct / 100;
    const grossTo = k > 0 ? b / k : 0;

    const uah = grossTo * toUAH;
    state.fromAmount = uah / fromUAH;
  }

  // -------- UI / CSS --------
  function injectCss() {
    const css = `
      :root{
        --safeTop: 10px;
        --safeBottom: 14px;
      }

      /* ✅ ШРИФТ Tristan (ПОМЕНЯЙ пути если у тебя иначе) */
      @font-face{
        font-family: "Tristan";
        src:
          url("./Tristan.woff2") format("woff2"),
          url("./Tristan.ttf") format("truetype");
        font-display: swap;
      }

      body{
        margin: 0;
        font-family: Tristan, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }

      .ks-header{
        position: sticky;
        top: 0;
        z-index: 50;
        padding-top: var(--safeTop);
        padding-bottom: 10px;
        background: transparent;
      }

      /* ✅ верхняя зона: языки абсолютом справа, бренд оставляем место */
      .ks-top{
        position: relative;
        padding: 14px 14px 6px 14px;
      }

      .ks-brand{
        display:flex;
        align-items:flex-end;
        gap: 10px;
        min-width: 0;
        padding-top: 14px;       /* ✅ логотип ниже кнопки TG */
        padding-right: 132px;    /* ✅ место под языки, чтобы не наезжали */
      }

      /* ✅ УБРАЛИ “белую плашку”: без фона, без скруглений (если в png прозрачность — будет чисто) */
      .ks-brand img{
        width: 44px;
        height: 44px;
        border-radius: 0;
        background: transparent !important;
        box-shadow: none !important;
        object-fit: contain;
        display:block;
      }

      .ks-title{
        font-weight: 900;
        letter-spacing: 0.5px;
        font-size: 52px;        /* ✅ заметно больше */
        line-height: 1;
        color: #1b1e2b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transform: translateY(2px);
        animation: ksTitleIn 650ms cubic-bezier(.2,.9,.2,1) both;
      }
      @keyframes ksTitleIn {
        from { transform: translateY(14px); opacity: 0; }
        to { transform: translateY(2px); opacity: 1; }
      }

      /* ✅ Языки больше НЕ наезжают */
      .ks-lang{
        position: absolute;
        right: 14px;
        top: calc(var(--safeTop) + 34px); /* ✅ ниже */
        display:flex;
        gap: 6px;
      }
      .ks-lang button{
        border: 0;
        padding: 7px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,.65);
        color: #1b1e2b;
        font-weight: 900;
        font-size: 13px;
        box-shadow: 0 8px 20px rgba(2,6,23,.08);
      }
      .ks-lang button.active{
        color: #fff;
        background: linear-gradient(90deg, #6d5efc, #8b5cf6, #6d5efc);
        background-size: 220% 220%;
        animation: ksGrad 2.8s ease-in-out infinite;
      }

      @keyframes ksGrad {
        0%{ background-position: 0% 50%; }
        50%{ background-position: 100% 50%; }
        100%{ background-position: 0% 50%; }
      }

      /* меню: один ряд, плотнее, скролл если не влазит */
      .ks-menu{
        display:flex;
        gap: 6px;                 /* ✅ ближе друг к другу */
        padding: 0 14px 8px 14px;
        overflow-x:auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .ks-menu::-webkit-scrollbar{ display:none; }
      .ks-menu button{
        flex: 0 0 auto;
        border: 0;
        padding: 9px 12px;        /* ✅ компактнее */
        border-radius: 999px;
        font-weight: 1000;
        background: rgba(255,255,255,.65);
        box-shadow: 0 10px 25px rgba(2,6,23,.08);
        color: #1b1e2b;
        white-space: nowrap;
        font-family: Tristan, system-ui, sans-serif;
      }
      .ks-menu button.active{
        color:#fff;
        background: linear-gradient(90deg, #6d5efc, #8b5cf6, #6d5efc);
        background-size: 220% 220%;
        animation: ksGrad 2.8s ease-in-out infinite;
      }

      .ks-wrap{
        max-width: 720px;
        margin: 0 auto;
        padding: 10px 14px calc(var(--safeBottom) + 18px) 14px;
      }

      .ks-card{
        background: rgba(255,255,255,.65);
        border-radius: 28px;
        box-shadow: 0 20px 45px rgba(2,6,23,.12);
        padding: 18px;
        backdrop-filter: blur(10px);
      }

      .ks-h1{
        font-size: 56px;
        letter-spacing: -1px;
        margin: 0 0 10px 0;
        color: #0f172a;
        font-weight: 1000;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-label{
        font-size: 30px;
        font-weight: 1000;
        color: #475569;
        margin: 10px 0 8px 0;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-field{
        background: rgba(255,255,255,.8);
        border: 2px solid rgba(148,163,184,.35);
        border-radius: 22px;
        padding: 12px 14px;
        display:flex;
        align-items:center;
        gap: 12px;
      }

      .ks-pick{
        width: 100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
        cursor:pointer;
      }

      .ks-left{ display:flex; align-items:center; gap: 12px; min-width: 0; }

      .ks-icon{
        width: 46px;
        height: 46px;
        border-radius: 999px;
        object-fit: contain;
        background: transparent;
        flex: 0 0 auto;
      }

      .ks-name{
        font-weight: 1000;
        font-size: 26px;
        color: #0f172a;
        line-height: 1.05;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Tristan, system-ui, sans-serif;
      }
      .ks-sub{
        font-weight: 1000;
        font-size: 18px;
        color: #64748b;
        margin-top: 2px;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-chevron{
        font-size: 18px;
        color: #0f172a;
        opacity: .75;
        padding-right: 6px;
      }

      .ks-amount{
        width: 100%;
        background: rgba(255,255,255,.8);
        border: 2px solid rgba(148,163,184,.35);
        border-radius: 22px;
        padding: 14px 16px;
        font-size: 42px;
        font-weight: 1000;
        outline: none;
        color:#0f172a;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-swapRow{
        display:flex;
        justify-content:center;
        margin: 14px 0;
      }

      /* ✅ swap как активные кнопки меню: переливающий градиент */
      .ks-swapBtn{
        width: 72px;
        height: 72px;
        border-radius: 22px;
        border: 0;
        cursor: pointer;
        box-shadow: 0 18px 38px rgba(109,94,252,.25);
        background: linear-gradient(90deg, #6d5efc, #8b5cf6, #6d5efc);
        background-size: 220% 220%;
        animation: ksGrad 2.8s ease-in-out infinite;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .ks-swapBtn svg{ width: 34px; height: 34px; }

      .ks-meta{
        margin-top: 14px;
        color:#475569;
        font-weight: 900;
        font-size: 16px;
        line-height: 1.35;
        white-space: pre-line;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-cta{
        margin-top: 14px;
        width: 100%;
        border: 0;
        border-radius: 22px;
        padding: 16px 18px;
        font-weight: 1100;
        font-size: 18px;
        color:#fff;
        background: linear-gradient(90deg, #6d5efc, #8b5cf6, #6d5efc);
        background-size: 220% 220%;
        animation: ksGrad 2.8s ease-in-out infinite;
        box-shadow: 0 18px 38px rgba(109,94,252,.25);
        font-family: Tristan, system-ui, sans-serif;
      }

      /* Modal */
      .ks-modalBack{
        position: fixed;
        inset: 0;
        background: rgba(15,23,42,.35);
        z-index: 80;
        display:none;
      }
      .ks-modalBack.open{ display:block; }

      .ks-sheet{
        position:absolute;
        left: 0; right: 0; bottom: 0;
        background: rgba(255,255,255,.92);
        border-radius: 26px 26px 0 0;
        box-shadow: 0 -22px 55px rgba(2,6,23,.25);
        padding: 14px 14px calc(var(--safeBottom) + 12px) 14px;
        max-height: 82vh;
        overflow: hidden;
      }

      .ks-sheetTop{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
      }
      .ks-sheetTop h3{
        margin: 0;
        font-size: 28px;
        font-weight: 1100;
        color:#0f172a;
        font-family: Tristan, system-ui, sans-serif;
      }
      .ks-x{
        width: 44px;
        height: 44px;
        border-radius: 16px;
        border: 0;
        background: rgba(255,255,255,.9);
        box-shadow: 0 10px 25px rgba(2,6,23,.10);
        font-size: 22px;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-search{
        margin-top: 12px;
        width: 100%;
        border: 2px solid rgba(148,163,184,.35);
        border-radius: 18px;
        padding: 12px 14px;
        font-size: 18px;
        font-weight: 900;
        outline:none;
        font-family: Tristan, system-ui, sans-serif;
      }

      .ks-list{
        margin-top: 10px;
        overflow:auto;
        max-height: calc(82vh - 150px);
        padding-right: 4px;
      }

      .ks-item{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap: 10px;
        padding: 12px 12px;
        border-radius: 18px;
        background: rgba(255,255,255,.9);
        box-shadow: 0 10px 24px rgba(2,6,23,.06);
        margin-bottom: 10px;
        cursor: pointer;
      }
      .ks-item .right{
        opacity: .55;
        font-weight: 1200;
      }
    `;
    document.head.appendChild(el('style', null, { html: css }));
  }

  // -------- Build UI --------
  let ui = {};

  function build() {
    const root = $('#app');
    root.innerHTML = '';

    const header = el('div', 'ks-header');

    const top = el('div', 'ks-top');

    const brand = el('div', 'ks-brand');
    const logo = el('img', null, { src: LOGO.header, alt: 'KeksSwap' });
    const title = el('div', 'ks-title', { text: 'KeksSwap' });

    brand.appendChild(logo);
    brand.appendChild(title);

    const lang = el('div', 'ks-lang');
    const btnUA = el('button', null, { text: 'UA', onclick: () => setLang('ua') });
    const btnEN = el('button', null, { text: 'EN', onclick: () => setLang('en') });
    const btnPL = el('button', null, { text: 'PL', onclick: () => setLang('pl') });
    lang.appendChild(btnUA); lang.appendChild(btnEN); lang.appendChild(btnPL);

    top.appendChild(brand);
    top.appendChild(lang);

    const menu = el('div', 'ks-menu');
    const mExchange = el('button', null, { onclick: () => setTab('exchange') });
    const mRules = el('button', null, { onclick: () => setTab('rules') });
    const mFaq = el('button', null, { onclick: () => setTab('faq') });
    const mContacts = el('button', null, { onclick: () => setTab('contacts') });
    const mAccount = el('button', null, { onclick: () => setTab('account') });

    menu.appendChild(mExchange);
    menu.appendChild(mRules);
    menu.appendChild(mFaq);
    menu.appendChild(mContacts);
    menu.appendChild(mAccount);

    header.appendChild(top);
    header.appendChild(menu);

    const wrap = el('div', 'ks-wrap');
    const card = el('div', 'ks-card');

    const h1 = el('div', 'ks-h1');
    const giveLabel = el('div', 'ks-label');
    const getLabel = el('div', 'ks-label');

    // GIVE
    const givePick = el('div', 'ks-field');
    const givePickInner = el('div', 'ks-pick', { onclick: () => openModal('from') });
    const giveLeft = el('div', 'ks-left');
    const giveIcon = el('img', 'ks-icon', { alt: '' });
    const giveTexts = el('div', null);
    const giveName = el('div', 'ks-name');
    const giveSub = el('div', 'ks-sub');
    giveTexts.appendChild(giveName);
    giveTexts.appendChild(giveSub);
    giveLeft.appendChild(giveIcon);
    giveLeft.appendChild(giveTexts);
    const giveChevron = el('div', 'ks-chevron', { text: '▾' });
    givePickInner.appendChild(giveLeft);
    givePickInner.appendChild(giveChevron);
    givePick.appendChild(givePickInner);

    const giveInput = el('input', 'ks-amount', { inputmode: 'decimal' });
    giveInput.addEventListener('input', () => {
      state.fromAmount = parseAmount(giveInput.value);
      recalcFromAmount();
      updateAmountsOnly();
    });

    // SWAP
    const swapRow = el('div', 'ks-swapRow');
    const swapBtn = el('button', 'ks-swapBtn', {
      onclick: () => {
        const tmp = state.from;
        state.from = state.to;
        state.to = tmp;

        const tmpA = state.fromAmount;
        state.fromAmount = state.toAmount;
        state.toAmount = tmpA;

        recalcFromAmount();
        updateAll();
      }
    });

    // ✅ более красивые стрелки
    swapBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7h10" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M15.5 4.5L19 7l-3.5 2.5" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 17H7" stroke="white" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M8.5 19.5L5 17l3.5-2.5" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    swapRow.appendChild(swapBtn);

    // GET
    const getPick = el('div', 'ks-field');
    const getPickInner = el('div', 'ks-pick', { onclick: () => openModal('to') });
    const getLeft = el('div', 'ks-left');
    const getIcon = el('img', 'ks-icon', { alt: '' });
    const getTexts = el('div', null);
    const getName = el('div', 'ks-name');
    const getSub = el('div', 'ks-sub');
    getTexts.appendChild(getName);
    getTexts.appendChild(getSub);
    getLeft.appendChild(getIcon);
    getLeft.appendChild(getTexts);
    const getChevron = el('div', 'ks-chevron', { text: '▾' });
    getPickInner.appendChild(getLeft);
    getPickInner.appendChild(getChevron);
    getPick.appendChild(getPickInner);

    const getInput = el('input', 'ks-amount', { inputmode: 'decimal' });
    getInput.addEventListener('input', () => {
      state.toAmount = parseAmount(getInput.value);
      recalcToAmount();
      updateAmountsOnly();
    });

    const meta = el('div', 'ks-meta');
    const btnContinue = el('button', 'ks-cta', { onclick: () => alert('Далі зробимо: створення заявки ✅') });

    card.appendChild(h1);

    card.appendChild(giveLabel);
    card.appendChild(givePick);
    card.appendChild(giveInput);

    card.appendChild(swapRow);

    card.appendChild(getLabel);
    card.appendChild(getPick);
    card.appendChild(getInput);

    card.appendChild(meta);
    card.appendChild(btnContinue);

    wrap.appendChild(card);

    // Modal
    const modalBack = el('div', 'ks-modalBack', { onclick: (e) => { if (e.target === modalBack) closeModal(); } });
    const sheet = el('div', 'ks-sheet');

    const sheetTop = el('div', 'ks-sheetTop');
    const sheetTitle = el('h3');
    const xBtn = el('button', 'ks-x', { text: '×', onclick: closeModal });
    sheetTop.appendChild(sheetTitle);
    sheetTop.appendChild(xBtn);

    const search = el('input', 'ks-search', {});
    search.addEventListener('input', () => {
      state.search = search.value;
      renderModalList();
    });

    const list = el('div', 'ks-list');

    sheet.appendChild(sheetTop);
    sheet.appendChild(search);
    sheet.appendChild(list);
    modalBack.appendChild(sheet);

    root.appendChild(header);
    root.appendChild(wrap);
    document.body.appendChild(modalBack);

    ui = {
      btnUA, btnEN, btnPL,
      mExchange, mRules, mFaq, mContacts, mAccount,
      h1, giveLabel, getLabel, meta, btnContinue,
      giveIcon, giveName, giveSub,
      getIcon, getName, getSub,
      giveInput, getInput,
      modalBack, sheetTitle, search, list,
    };

    recalcFromAmount();
    updateAll();
  }

  // -------- Update UI --------
  function updateLangButtons() {
    ui.btnUA.classList.toggle('active', state.lang === 'ua');
    ui.btnEN.classList.toggle('active', state.lang === 'en');
    ui.btnPL.classList.toggle('active', state.lang === 'pl');
  }

  function updateMenu() {
    ui.mExchange.textContent = tr('exchange');
    ui.mRules.textContent = tr('rules');
    ui.mFaq.textContent = tr('faq');
    ui.mContacts.textContent = tr('contacts');
    ui.mAccount.textContent = tr('account');

    ui.mExchange.classList.toggle('active', state.tab === 'exchange');
    ui.mRules.classList.toggle('active', state.tab === 'rules');
    ui.mFaq.classList.toggle('active', state.tab === 'faq');
    ui.mContacts.classList.toggle('active', state.tab === 'contacts');
    ui.mAccount.classList.toggle('active', state.tab === 'account');
  }

  function updateExchangeTexts() {
    ui.h1.textContent = tr('exchange');
    ui.giveLabel.textContent = tr('give');
    ui.getLabel.textContent = tr('get');
    ui.btnContinue.textContent = tr('continue');

    const fromUAH = calcToFromUAH(state.from);
    const toUAH = calcToFromUAH(state.to);
    const rate = (fromUAH && toUAH) ? (fromUAH / toUAH) : 0;

    ui.meta.textContent =
      `${tr('rate')}: 1 ${state.from.sub} ≈ ${fmt(rate, 10)} ${state.to.sub}\n` +
      `${tr('fee')}: ${state.feePct}%`;
  }

  function updatePicks() {
    ui.giveIcon.src = state.from.icon;
    ui.giveName.textContent = state.from.name;
    ui.giveSub.textContent = state.from.sub;

    ui.getIcon.src = state.to.icon;
    ui.getName.textContent = state.to.name;
    ui.getSub.textContent = state.to.sub;
  }

  function updateAmountsOnly() {
    if (document.activeElement !== ui.giveInput) ui.giveInput.value = fmt(state.fromAmount, 8);
    if (document.activeElement !== ui.getInput) ui.getInput.value = fmt(state.toAmount, 10);
    updateExchangeTexts();
  }

  function updateAll() {
    updateLangButtons();
    updateMenu();
    updatePicks();
    updateAmountsOnly();
  }

  // -------- Modal --------
  function openModal(side) {
    state.modalOpen = true;
    state.modalSide = side;
    ui.modalBack.classList.add('open');

    ui.sheetTitle.textContent = (side === 'from') ? tr('give') : tr('get');
    ui.search.placeholder = tr('search');
    ui.search.value = '';
    state.search = '';
    renderModalList();
    setTimeout(() => ui.search.focus(), 60);
  }

  function closeModal() {
    state.modalOpen = false;
    ui.modalBack.classList.remove('open');
  }

  function renderModalList() {
    const q = (state.search || '').trim().toLowerCase();
    const items = ALL_ITEMS.filter(it => {
      if (!q) return true;
      return it.name.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q) || (it.groupId || '').toLowerCase().includes(q);
    });

    ui.list.innerHTML = '';
    for (const it of items) {
      const row = el('div', 'ks-item', {
        onclick: () => {
          if (state.modalSide === 'from') state.from = it;
          else state.to = it;

          // пересчёт по тому, что вводили
          if (document.activeElement === ui.getInput) recalcToAmount();
          else recalcFromAmount();

          updateAll();
          closeModal();
        }
      });

      const left = el('div', 'ks-left');
      const icon = el('img', 'ks-icon', { src: it.icon, alt: '' });
      const texts = el('div', null);
      const name = el('div', 'ks-name', { text: it.name });
      const sub = el('div', 'ks-sub', { text: it.sub });
      texts.appendChild(name);
      texts.appendChild(sub);
      left.appendChild(icon);
      left.appendChild(texts);

      const right = el('div', 'right', { text: '›' });

      row.appendChild(left);
      row.appendChild(right);
      ui.list.appendChild(row);
    }
  }

  // -------- Tabs --------
  function setTab(tab) {
    state.tab = tab;
    updateMenu();

    if (tab === 'account') {
      alert(`${tr('account')}: ${tr('login')} / ${tr('register')} (добавим дальше ✅)`);
    } else if (tab !== 'exchange') {
      alert(`${tab.toUpperCase()} — заполним текстами в этом стиле дальше ✅`);
    }
  }

  function setLang(lang) {
    state.lang = lang;
    updateAll();
  }

  // -------- Start --------
  function main() {
    initTelegram();
    injectCss();
    build();
  }

  main();
})();
