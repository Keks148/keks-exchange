(() => {
  const tg = window.Telegram?.WebApp;

  // ---------- Telegram safe areas ----------
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

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, attrs = {}) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    return n;
  };

  const clampNum = (x) => (Number.isFinite(x) ? x : 0);
  const parseAmount = (s) => {
    if (typeof s !== 'string') s = String(s ?? '');
    // допускаем запятую
    s = s.replace(/\s+/g, '').replace(',', '.');
    // оставляем только цифры и одну точку
    s = s.replace(/[^0-9.]/g, '');
    const parts = s.split('.');
    if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');
    const v = parseFloat(s);
    return Number.isFinite(v) ? v : 0;
  };

  const fmt = (v, decimals = 8) => {
    if (!Number.isFinite(v)) return '';
    // если большое — без лишних нулей
    if (v >= 1000) return String(Math.round(v));
    // если UAH/fiat — 2 знака
    return v.toFixed(decimals).replace(/\.?0+$/, '');
  };

  // ---------- Minimal extra CSS (logo+font) ----------
  function injectExtraCss() {
    const style = el('style', null, {
      html: `
      .brandRow{
        display:flex; align-items:flex-end; gap:10px; min-width:0;
      }
      .brandImg{
        width:46px; height:46px; border-radius:14px;
        background: rgba(255,255,255,.8);
        border:1px solid rgba(15,23,42,.10);
        box-shadow: 0 12px 22px rgba(17,24,39,.10);
        object-fit: contain;
        padding:6px;
        flex: 0 0 auto;
      }
      .brandName{
        font-family: "Tristan", Georgia, serif;
        font-weight: 900;
        font-size: 44px;
        line-height: 0.9;
        letter-spacing: .5px;
        white-space:nowrap;
      }
      .brandName .shine{
        background: linear-gradient(90deg, rgba(15,23,42,.95), rgba(15,23,42,.95), rgba(107,92,255,.85), rgba(15,23,42,.95));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 260% 100%;
        animation: ksShine 3.6s ease-in-out infinite;
      }
      @keyframes ksShine{
        0%{ background-position: 0% 50%; }
        50%{ background-position: 100% 50%; }
        100%{ background-position: 0% 50%; }
      }
      .brandTap{
        cursor:pointer;
        transform-origin:left bottom;
      }
      .brandTap.tap{
        animation: ksTap 420ms ease-in-out;
      }
      @keyframes ksTap{
        0%{ transform: scale(1) translateX(0); }
        30%{ transform: scale(1.02) translateX(2px); }
        60%{ transform: scale(1.01) translateX(-2px); }
        100%{ transform: scale(1) translateX(0); }
      }
      /* чтобы логотип не залезал под кнопку "Закрити" */
      .headerInner{ padding-top: 16px !important; }

      /* иконки в селекте — чтобы не обрубались */
      .selLeft img{
        width:44px; height:44px; border-radius: 14px;
        object-fit: contain;
        background: rgba(255,255,255,.85);
        border:1px solid rgba(15,23,42,.10);
        padding:6px;
        flex:0 0 auto;
      }

      /* иконки в списке модалки нормальные */
      .item img{
        width:44px; height:44px; border-radius: 14px;
        object-fit: contain;
        background: rgba(255,255,255,.85);
        border:1px solid rgba(15,23,42,.10);
        padding:6px;
        flex:0 0 auto;
      }
      `
    });
    document.head.appendChild(style);
  }

  // ---------- Data ----------
  const LOGO = {
    brand: './logo.png',
    banksDir: './logos/banks/',
    walletsDir: './logos/wallets/',
    cryptoDir: './logos/crypto/',
  };

  // rateUAH = стоимость 1 единицы актива в UAH (для банков UAH = 1)
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

  const ALL_ITEMS = GROUPS.flatMap(g => g.items.map(it => ({...it, groupId: g.id, groupIcon:g.icon, groupTitle:g.title})));

  function findItemById(id) {
    return ALL_ITEMS.find(x => x.id === id) || ALL_ITEMS[0];
  }

  // ---------- State ----------
  const state = {
    lang: 'ua',
    tab: 'exchange', // exchange|rules|faq|contacts|account
    feePct: 2.5,
    from: findItemById('mono'),
    to: findItemById('btc'),
    fromAmount: 1000,
    toAmount: 0,
    editing: 'from', // 'from'|'to'
    modalOpen: false,
    modalFor: null, // 'from'|'to'
    search: '',
  };

  // ---------- UI refs ----------
  const refs = {};

  // ---------- Calc ----------
  function recalc() {
    const fee = state.feePct / 100;
    const fromRate = clampNum(state.from.rateUAH);
    const toRate = clampNum(state.to.rateUAH);

    if (fromRate <= 0 || toRate <= 0) return;

    // конвертируем через UAH
    if (state.editing === 'from') {
      const amount = clampNum(state.fromAmount);
      const uah = amount * fromRate;
      const uahNet = uah * (1 - fee);
      const out = uahNet / toRate;
      state.toAmount = out;
    } else {
      const amount = clampNum(state.toAmount);
      const uah = amount * toRate;
      const uahGross = uah / (1 - fee);
      const out = uahGross / fromRate;
      state.fromAmount = out;
    }
  }

  // ---------- Render once (no re-render on typing) ----------
  function buildApp() {
    const app = $('#app');
    app.innerHTML = '';

    const wrap = el('div', 'wrap');
    app.appendChild(wrap);

    // Sticky header
    const header = el('div', 'header');
    const headerInner = el('div', 'headerInner');
    header.appendChild(headerInner);
    wrap.appendChild(header);

    // Brand
    const brandRow = el('div', 'brandRow brandTap');
    const logoImg = el('img', 'brandImg', { src: LOGO.brand, alt: 'KeksSwap' });
    const brandName = el('div', 'brandName', { html: `<span class="shine">KeksSwap</span>` });
    brandRow.appendChild(logoImg);
    brandRow.appendChild(brandName);

    // tap animation
    brandRow.addEventListener('click', () => {
      brandRow.classList.remove('tap');
      void brandRow.getBoundingClientRect();
      brandRow.classList.add('tap');
    });

    headerInner.appendChild(brandRow);

    // Lang buttons
    const lang = el('div', 'lang');
    const btnUA = el('button', '', { text: 'UA' });
    const btnEN = el('button', '', { text: 'EN' });
    const btnPL = el('button', '', { text: 'PL' });
    lang.append(btnUA, btnEN, btnPL);

    headerInner.appendChild(lang);

    // Menu row (1 line)
    const menu = el('div', 'topMenu');
    const tabs = [
      { id:'exchange', label:{ua:'Обмін', en:'Exchange', pl:'Wymiana'} },
      { id:'rules', label:{ua:'Правила', en:'Rules', pl:'Zasady'} },
      { id:'faq', label:{ua:'FAQ', en:'FAQ', pl:'FAQ'} },
      { id:'contacts', label:{ua:'Контакти', en:'Contacts', pl:'Kontakt'} },
      { id:'account', label:{ua:'Акаунт', en:'Account', pl:'Konto'} },
    ];
    const tabBtns = {};
    tabs.forEach(t => {
      const b = el('button', 'tab', { text: t.label[state.lang] });
      b.addEventListener('click', () => {
        state.tab = t.id;
        updateTabs();
        updatePage();
      });
      tabBtns[t.id] = b;
      menu.appendChild(b);
    });
    wrap.appendChild(menu);

    // Main
    const main = el('div', 'main');
    wrap.appendChild(main);

    // Pages containers
    const pageExchange = el('div', '');
    const pageRules = el('div', '');
    const pageFaq = el('div', '');
    const pageContacts = el('div', '');
    const pageAccount = el('div', '');

    main.append(pageExchange, pageRules, pageFaq, pageContacts, pageAccount);

    // ---------- Exchange page ----------
    const exCard = el('div', 'card');
    pageExchange.appendChild(exCard);

    const h1 = el('div', 'h1', { text: t('Обмін', 'Exchange', 'Wymiana') });
    exCard.appendChild(h1);

    // FROM
    const hFrom = el('div', 'h2', { text: t('Віддаєте', 'You send', 'Wysyłasz') });
    exCard.appendChild(hFrom);

    const fromField = el('div', 'field');
    exCard.appendChild(fromField);

    // select first
    const fromSelect = createSelectBtn(state.from, () => openModal('from'));
    fromField.appendChild(fromSelect);

    // then input
    const fromInput = el('input', 'input', { inputmode:'decimal', placeholder:'0' });
    fromInput.value = String(state.fromAmount);
    fromField.appendChild(fromInput);

    // swap button
    const swapBtn = el('button', 'swapBtn', { text: '⇵' });
    swapBtn.addEventListener('click', () => {
      const tmp = state.from;
      state.from = state.to;
      state.to = tmp;

      // keep editing side same, just recalc
      recalc();
      updateExchangeUI();
    });
    exCard.appendChild(swapBtn);

    // TO
    const hTo = el('div', 'h2', { text: t('Отримуєте', 'You get', 'Otrzymujesz') });
    exCard.appendChild(hTo);

    const toField = el('div', 'field');
    exCard.appendChild(toField);

    const toSelect = createSelectBtn(state.to, () => openModal('to'));
    toField.appendChild(toSelect);

    const toInput = el('input', 'input', { inputmode:'decimal', placeholder:'0' });
    toInput.value = fmt(state.toAmount, 8);
    toField.appendChild(toInput);

    // Continue button
    const cont = el('button', 'primaryBtn', { text: t('Продовжити', 'Continue', 'Kontynuuj') });
    cont.addEventListener('click', () => {
      const fromName = `${state.from.name} ${state.from.sub}`;
      const toName = `${state.to.name} ${state.to.sub}`;
      const msg = `${t('Заявка:', 'Request:', 'Zgłoszenie:')} ${fromName} → ${toName}\n` +
                  `${t('Сума:', 'Amount:', 'Kwota:')} ${fmt(state.fromAmount, 8)} ${state.from.sub}\n` +
                  `${t('Комісія сервісу:', 'Service fee:', 'Prowizja:')} ${state.feePct}%\n` +
                  `${t('До виплати:', 'To receive:', 'Do wypłaty:')} ${fmt(state.toAmount, 8)} ${state.to.sub}`;
      // пока просто покажем alert, позже сделаем форму заявки
      alert(msg);
    });
    exCard.appendChild(cont);

    // Fix focus + calc without rerender
    let lock = false;

    fromInput.addEventListener('input', () => {
      if (lock) return;
      state.editing = 'from';
      state.fromAmount = parseAmount(fromInput.value);
      recalc();
      lock = true;
      toInput.value = fmt(state.toAmount, 8);
      lock = false;
    });

    toInput.addEventListener('input', () => {
      if (lock) return;
      state.editing = 'to';
      state.toAmount = parseAmount(toInput.value);
      recalc();
      lock = true;
      fromInput.value = fmt(state.fromAmount, 8);
      lock = false;
    });

    // ---------- Other pages ----------
    pageRules.appendChild(simpleCard(
      t('Правила обміну', 'Exchange rules', 'Zasady wymiany'),
      t(
        'Тут буде сторінка правил. Поки що — макет у вашому стилі.',
        'Rules page placeholder (same style).',
        'Tutaj będą zasady — na razie szablon.'
      )
    ));

    pageFaq.appendChild(simpleCard(
      'FAQ',
      t(
        'Поширені питання (пізніше додамо реальний контент).',
        'FAQ placeholder (we will add real content later).',
        'FAQ (później dodamy treść).'
      )
    ));

    pageContacts.appendChild(simpleCard(
      t('Контакти', 'Contacts', 'Kontakt'),
      t(
        'Telegram: @keksswap\nEmail: support@keksswap.com\n(замінити на свої)',
        'Telegram: @keksswap\nEmail: support@keksswap.com\n(replace with yours)',
        'Telegram: @keksswap\nEmail: support@keksswap.com\n(zmień na swoje)'
      )
    ));

    // Account page with login/register placeholders
    const accCard = el('div', 'card');
    accCard.appendChild(el('div', 'h1', { text: t('Акаунт', 'Account', 'Konto') }));

    const accInfo = el('div', '', {
      html: `<div style="font-weight:800;color:rgba(15,23,42,.65);margin-top:8px;">
        ${t(
          'Додамо реєстрацію та KYC пізніше. Зараз — красиві переходи та макет.',
          'We’ll add registration and KYC later. For now: clean UI + navigation.',
          'Rejestracja i KYC później. Teraz: UI i nawigacja.'
        )}
      </div>`
    });

    const loginBtn = el('button', 'primaryBtn', { text: t('Увійти', 'Sign in', 'Zaloguj') });
    loginBtn.addEventListener('click', () => alert(t('Скоро буде', 'Coming soon', 'Wkrótce')));

    const regBtn = el('button', 'primaryBtn', { text: t('Зареєструватися', 'Register', 'Zarejestruj') });
    regBtn.style.marginTop = '10px';
    regBtn.addEventListener('click', () => alert(t('Скоро буде', 'Coming soon', 'Wkrótce')));

    const kycBtn = el('button', 'primaryBtn', { text: t('KYC (скоро)', 'KYC (soon)', 'KYC (wkrótce)') });
    kycBtn.style.marginTop = '10px';
    kycBtn.addEventListener('click', () => alert(t('Підключимо провайдера пізніше', 'We will connect a provider later', 'Podłączymy dostawcę później')));

    accCard.append(accInfo, loginBtn, regBtn, kycBtn);
    pageAccount.appendChild(accCard);

    // ---------- Modal ----------
    const backdrop = el('div', 'modalBackdrop');
    const modal = el('div', 'modal');
    const mHead = el('div', 'modalHead');
    const mTitle = el('div', 'modalTitle', { text: '' });
    const mClose = el('button', 'modalClose', { text: '×' });

    mClose.addEventListener('click', closeModal);

    mHead.append(mTitle, mClose);

    const mBody = el('div', 'modalBody');
    const search = el('input', 'search', { placeholder: 'Search…' });
    const list = el('div', 'list');

    search.addEventListener('input', () => {
      state.search = search.value || '';
      renderModalList();
    });

    mBody.append(search, list);
    modal.append(mHead, mBody);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    // ---------- Store refs ----------
    refs.wrap = wrap;
    refs.tabBtns = tabBtns;

    refs.page = { exchange: pageExchange, rules: pageRules, faq: pageFaq, contacts: pageContacts, account: pageAccount };
    refs.exchange = { fromSelect, toSelect, fromInput, toInput, h1, hFrom, hTo, cont };
    refs.modal = { backdrop, mTitle, search, list };

    // ---------- Language buttons ----------
    const setLang = (lng) => {
      state.lang = lng;
      btnUA.classList.toggle('active', lng === 'ua');
      btnEN.classList.toggle('active', lng === 'en');
      btnPL.classList.toggle('active', lng === 'pl');

      // update texts
      tabBtns.exchange.textContent = tabs[0].label[lng];
      tabBtns.rules.textContent = tabs[1].label[lng];
      tabBtns.faq.textContent = tabs[2].label[lng];
      tabBtns.contacts.textContent = tabs[3].label[lng];
      tabBtns.account.textContent = tabs[4].label[lng];

      // update exchange headings
      refs.exchange.h1.textContent = t('Обмін','Exchange','Wymiana');
      refs.exchange.hFrom.textContent = t('Віддаєте','You send','Wysyłasz');
      refs.exchange.hTo.textContent = t('Отримуєте','You get','Otrzymujesz');
      refs.exchange.cont.textContent = t('Продовжити','Continue','Kontynuuj');

      // pages re-render not needed; simple
      updateTabs();
      updatePage();
    };

    btnUA.addEventListener('click', () => setLang('ua'));
    btnEN.addEventListener('click', () => setLang('en'));
    btnPL.addEventListener('click', () => setLang('pl'));
    setLang('ua');

    // Initial calc
    recalc();
    toInput.value = fmt(state.toAmount, 8);

    // Helpers inside build
    function t(ua, en, pl) {
      return state.lang === 'ua' ? ua : state.lang === 'en' ? en : pl;
    }

    function updateTabs() {
      Object.entries(refs.tabBtns).forEach(([id, b]) => {
        b.classList.toggle('active', id === state.tab);
      });
    }

    function updatePage() {
      Object.entries(refs.page).forEach(([id, node]) => {
        node.style.display = (id === state.tab) ? '' : 'none';
      });
    }

    function createSelectBtn(item, onClick) {
      const btn = el('button', 'selectBtn');
      btn.type = 'button';
      btn.addEventListener('click', onClick);

      const left = el('div', 'selLeft');
      const icon = el('img', '', { src: item.icon, alt: item.sub });
      const text = el('div', 'selText');
      const title = el('div', 'selTitle', { text: item.name });
      const sub = el('div', 'selSub', { text: item.sub });

      text.append(title, sub);
      left.append(icon, text);

      const chev = el('div', 'chev', { text: '▾' });
      btn.append(left, chev);

      // store for updates
      btn._icon = icon;
      btn._title = title;
      btn._sub = sub;
      return btn;
    }

    function simpleCard(title, body) {
      const c = el('div', 'card');
      c.appendChild(el('div', 'h1', { text: title }));
      c.appendChild(el('div', '', { html: `<div style="white-space:pre-line;font-weight:800;color:rgba(15,23,42,.65);margin-top:8px;">${body}</div>` }));
      return c;
    }

    function updateExchangeUI() {
      // update select buttons data
      refs.exchange.fromSelect._icon.src = state.from.icon;
      refs.exchange.fromSelect._title.textContent = state.from.name;
      refs.exchange.fromSelect._sub.textContent = state.from.sub;

      refs.exchange.toSelect._icon.src = state.to.icon;
      refs.exchange.toSelect._title.textContent = state.to.name;
      refs.exchange.toSelect._sub.textContent = state.to.sub;

      // recalc & update values without breaking focus
      const active = document.activeElement;
      recalc();

      if (active !== refs.exchange.fromInput) {
        refs.exchange.fromInput.value = fmt(state.fromAmount, 8);
      }
      if (active !== refs.exchange.toInput) {
        refs.exchange.toInput.value = fmt(state.toAmount, 8);
      }
    }

    function openModal(forSide) {
      state.modalFor = forSide;
      state.search = '';
      refs.modal.search.value = '';
      refs.modal.mTitle.textContent = (forSide === 'from')
        ? t('Віддаєте', 'You send', 'Wysyłasz')
        : t('Отримуєте', 'You get', 'Otrzymujesz');

      refs.modal.backdrop.classList.add('open');

      // фокус на поиск (и не ломаем клавиатуру)
      setTimeout(() => refs.modal.search.focus(), 80);
      renderModalList();
    }

    function closeModal() {
      refs.modal.backdrop.classList.remove('open');
      state.modalFor = null;
    }

    function renderModalList() {
      const q = (state.search || '').trim().toLowerCase();
      refs.modal.list.innerHTML = '';

      const filteredGroups = GROUPS.map(g => {
        const items = g.items.filter(it => {
          if (!q) return true;
          const s = `${it.name} ${it.sub} ${g.id}`.toLowerCase();
          return s.includes(q);
        });
        return { ...g, items };
      }).filter(g => g.items.length > 0);

      filteredGroups.forEach(g => {
        // group header (compact, без огромных логотипов)
        const head = el('div', '', {
          html: `<div style="display:flex;align-items:center;gap:10px;margin:10px 2px 8px;">
            <img src="${g.icon}" alt="" style="width:34px;height:34px;border-radius:12px;object-fit:contain;background:rgba(255,255,255,.85);border:1px solid rgba(15,23,42,.10);padding:5px;">
            <div style="font-weight:950">${g.title[state.lang]}</div>
            <div style="font-weight:850;color:rgba(15,23,42,.55)">${g.subtitle[state.lang]}</div>
          </div>`
        });
        refs.modal.list.appendChild(head);

        g.items.forEach(it => {
          const row = el('div', 'item');
          const img = el('img', '', { src: it.icon, alt: it.sub });

          const text = el('div', 'itemText');
          const top = el('div', 'itemTop');
          const name = el('div', 'itemName', { text: it.name });
          const code = el('div', 'itemCode', { text: it.sub });
          top.append(name, code);

          const meta = el('div', 'itemMeta', {
            text: (it.min || it.max)
              ? `min ${it.min ?? '-'} · max ${it.max ?? '-'}`
              : ''
          });

          text.append(top);
          if (meta.textContent) text.append(meta);

          row.append(img, text);

          row.addEventListener('click', () => {
            if (state.modalFor === 'from') {
              state.from = it;
              state.editing = 'from';
            } else {
              state.to = it;
              state.editing = 'from'; // после выбора лучше пересчитывать от "from"
            }
            updateExchangeUI();
            closeModal();
          });

          refs.modal.list.appendChild(row);
        });
      });
    }

    // expose for internal use
    refs.updateExchangeUI = updateExchangeUI;
    refs.updateTabs = updateTabs;
    refs.updatePage = updatePage;

    // first visible
    updateTabs();
    updatePage();
  }

  // ---------- Text helper (outside render) ----------
  function t(ua, en, pl) {
    return state.lang === 'ua' ? ua : state.lang === 'en' ? en : pl;
  }

  // ---------- Start ----------
  initTelegram();
  injectExtraCss();
  buildApp();

})();
