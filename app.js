/* KeksSwap Mini App (3 files)
   - Order fix: "Віддаєте" => crypto first, then banks; "Отримуєте" => banks first, then crypto
   - Remove search in Language + Network sheets
   - Network icons support (logos/networks/*.png) with fallback
   - Works in Telegram WebApp, stores state in localStorage
*/
(() => {
  const $ = (id) => document.getElementById(id);

  // ---------- Storage helpers ----------
  const load = (k) => {
    try { return JSON.parse(localStorage.getItem('keksswap:'+k)); } catch(e) { return null; }
  };
  const save = (k, v) => {
    try { localStorage.setItem('keksswap:'+k, JSON.stringify(v)); } catch(e) {}
  };

  // ---------- Data ----------
  const CRYPTO = [
    { id:'usdt', code:'USDT', title:{uk:'Tether (USDT)', en:'Tether (USDT)', pl:'Tether (USDT)', tr:'Tether (USDT)'}, subtitle:{uk:'USDT', en:'USDT', pl:'USDT', tr:'USDT'} },
    { id:'usdc', code:'USDC', title:{uk:'USD Coin (USDC)', en:'USD Coin (USDC)', pl:'USD Coin (USDC)', tr:'USD Coin (USDC)'}, subtitle:{uk:'USDC', en:'USDC', pl:'USDC', tr:'USDC'} },
    { id:'btc',  code:'BTC',  title:{uk:'Bitcoin (BTC)', en:'Bitcoin (BTC)', pl:'Bitcoin (BTC)', tr:'Bitcoin (BTC)'}, subtitle:{uk:'BTC', en:'BTC', pl:'BTC', tr:'BTC'} },
    { id:'eth',  code:'ETH',  title:{uk:'Ethereum (ETH)', en:'Ethereum (ETH)', pl:'Ethereum (ETH)', tr:'Ethereum (ETH)'}, subtitle:{uk:'ETH', en:'ETH', pl:'ETH', tr:'ETH'} },
    { id:'trx',  code:'TRX',  title:{uk:'TRON (TRX)', en:'TRON (TRX)', pl:'TRON (TRX)', tr:'TRON (TRX)'}, subtitle:{uk:'TRX', en:'TRX', pl:'TRX', tr:'TRX'} },
    { id:'ton',  code:'TON',  title:{uk:'Toncoin (TON)', en:'Toncoin (TON)', pl:'Toncoin (TON)', tr:'Toncoin (TON)'}, subtitle:{uk:'TON', en:'TON', pl:'TON', tr:'TON'} },
    { id:'sol',  code:'SOL',  title:{uk:'Solana (SOL)', en:'Solana (SOL)', pl:'Solana (SOL)', tr:'Solana (SOL)'}, subtitle:{uk:'SOL', en:'SOL', pl:'SOL', tr:'SOL'} },
    { id:'ltc',  code:'LTC',  title:{uk:'Litecoin (LTC)', en:'Litecoin (LTC)', pl:'Litecoin (LTC)', tr:'Litecoin (LTC)'}, subtitle:{uk:'LTC', en:'LTC', pl:'LTC', tr:'LTC'} },
    { id:'bnb',  code:'BNB',  title:{uk:'BNB (BNB)', en:'BNB (BNB)', pl:'BNB (BNB)', tr:'BNB (BNB)'}, subtitle:{uk:'BNB', en:'BNB', pl:'BNB', tr:'BNB'} },
    { id:'xrp',  code:'XRP',  title:{uk:'XRP (XRP)', en:'XRP (XRP)', pl:'XRP (XRP)', tr:'XRP (XRP)'}, subtitle:{uk:'XRP', en:'XRP', pl:'XRP', tr:'XRP'} },
    { id:'ada',  code:'ADA',  title:{uk:'Cardano (ADA)', en:'Cardano (ADA)', pl:'Cardano (ADA)', tr:'Cardano (ADA)'}, subtitle:{uk:'ADA', en:'ADA', pl:'ADA', tr:'ADA'} },
    { id:'doge', code:'DOGE', title:{uk:'Dogecoin (DOGE)', en:'Dogecoin (DOGE)', pl:'Dogecoin (DOGE)', tr:'Dogecoin (DOGE)'}, subtitle:{uk:'DOGE', en:'DOGE', pl:'DOGE', tr:'DOGE'} },
    { id:'shib', code:'SHIB', title:{uk:'Shiba Inu (SHIB)', en:'Shiba Inu (SHIB)', pl:'Shiba Inu (SHIB)', tr:'Shiba Inu (SHIB)'}, subtitle:{uk:'SHIB', en:'SHIB', pl:'SHIB', tr:'SHIB'} },
    { id:'dai',  code:'DAI',  title:{uk:'DAI (DAI)', en:'DAI (DAI)', pl:'DAI (DAI)', tr:'DAI (DAI)'}, subtitle:{uk:'DAI', en:'DAI', pl:'DAI', tr:'DAI'} },
  ];

  const BANKS = [
    { id:'mono',   code:'Monobank',  title:{uk:'Monobank', en:'Monobank', pl:'Monobank', tr:'Monobank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'privat', code:'PrivatBank',title:{uk:'PrivatBank', en:'PrivatBank', pl:'PrivatBank', tr:'PrivatBank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'a-bank', code:'A-Bank',    title:{uk:'A-Bank', en:'A-Bank', pl:'A-Bank', tr:'A-Bank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'oschad', code:'Oschadbank',title:{uk:'Oschadbank', en:'Oschadbank', pl:'Oschadbank', tr:'Oschadbank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'pumb',   code:'PUMB',      title:{uk:'PUMB', en:'PUMB', pl:'PUMB', tr:'PUMB'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'otp',    code:'OTP',       title:{uk:'OTP Bank', en:'OTP Bank', pl:'OTP Bank', tr:'OTP Bank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'izi',    code:'izibank',   title:{uk:'izibank', en:'izibank', pl:'izibank', tr:'izibank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'sense',  code:'Sense',     title:{uk:'Sense Bank', en:'Sense Bank', pl:'Sense Bank', tr:'Sense Bank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'reyf',   code:'Raiffeisen',title:{uk:'Raiffeisen', en:'Raiffeisen', pl:'Raiffeisen', tr:'Raiffeisen'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'ukr-sib',code:'UkrSibbank',title:{uk:'UkrSibbank', en:'UkrSibbank', pl:'UkrSibbank', tr:'UkrSibbank'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
    { id:'visa-master',code:'Visa/Master',title:{uk:'Visa / Master', en:'Visa / Master', pl:'Visa / Master', tr:'Visa / Master'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} },
  ];

  // Networks (for crypto)
  const NETWORKS = [
    { id:'erc20', code:'ERC20', title:{uk:'ERC20', en:'ERC20', pl:'ERC20', tr:'ERC20'}, subtitle:{uk:'USDT/USDC • ETH', en:'USDT/USDC • ETH', pl:'USDT/USDC • ETH', tr:'USDT/USDC • ETH'} },
    { id:'bep20', code:'BEP20', title:{uk:'BEP20', en:'BEP20', pl:'BEP20', tr:'BEP20'}, subtitle:{uk:'USDT/USDC • BSC', en:'USDT/USDC • BSC', pl:'USDT/USDC • BSC', tr:'USDT/USDC • BSC'} },
    { id:'trc20', code:'TRC20', title:{uk:'TRC20', en:'TRC20', pl:'TRC20', tr:'TRC20'}, subtitle:{uk:'USDT/USDC • TRX', en:'USDT/USDC • TRX', pl:'USDT/USDC • TRX', tr:'USDT/USDC • TRX'} },
    { id:'sol',   code:'SOL',   title:{uk:'SOL', en:'SOL', pl:'SOL', tr:'SOL'}, subtitle:{uk:'USDC/USDT • SOL', en:'USDC/USDT • SOL', pl:'USDC/USDT • SOL', tr:'USDC/USDT • SOL'} },
    { id:'ton',   code:'TON',   title:{uk:'TON', en:'TON', pl:'TON', tr:'TON'}, subtitle:{uk:'USDT • TON', en:'USDT • TON', pl:'USDT • TON', tr:'USDT • TON'} },
    { id:'btc',   code:'BTC',   title:{uk:'BTC', en:'BTC', pl:'BTC', tr:'BTC'}, subtitle:{uk:'Bitcoin Network', en:'Bitcoin Network', pl:'Bitcoin Network', tr:'Bitcoin Network'} },
    { id:'eth',   code:'ETH',   title:{uk:'ETH', en:'ETH', pl:'ETH', tr:'ETH'}, subtitle:{uk:'Ethereum Network', en:'Ethereum Network', pl:'Ethereum Network', tr:'Ethereum Network'} },
    { id:'bsc',   code:'BSC',   title:{uk:'BSC', en:'BSC', pl:'BSC', tr:'BSC'}, subtitle:{uk:'BNB Smart Chain', en:'BNB Smart Chain', pl:'BNB Smart Chain', tr:'BNB Smart Chain'} },
    { id:'trx',   code:'TRX',   title:{uk:'TRX', en:'TRX', pl:'TRX', tr:'TRX'}, subtitle:{uk:'TRON Network', en:'TRON Network', pl:'TRON Network', tr:'TRON Network'} },
    { id:'arb',   code:'ARB',   title:{uk:'ARB', en:'ARB', pl:'ARB', tr:'ARB'}, subtitle:{uk:'Arbitrum', en:'Arbitrum', pl:'Arbitrum', tr:'Arbitrum'} },
    { id:'op',    code:'OP',    title:{uk:'OP', en:'OP', pl:'OP', tr:'OP'}, subtitle:{uk:'Optimism', en:'Optimism', pl:'Optimism', tr:'Optimism'} },
    { id:'pol',   code:'POL',   title:{uk:'POL', en:'POL', pl:'POL', tr:'POL'}, subtitle:{uk:'Polygon', en:'Polygon', pl:'Polygon', tr:'Polygon'} },
  ];

  const CARD_NET = { id:'card', code:'Card', title:{uk:'Card', en:'Card', pl:'Card', tr:'Card'}, subtitle:{uk:'UAH • Card', en:'UAH • Card', pl:'UAH • Card', tr:'UAH • Card'} };

  const LANGS = {
    uk: { code:'UA', flag:'🇺🇦', name:'UA' },
    en: { code:'EN', flag:'🇬🇧', name:'EN' },
    tr: { code:'TR', flag:'🇹🇷', name:'TR' },
    pl: { code:'PL', flag:'🇵🇱', name:'PL' },
  };

  const I18N = {
    uk: {
      exchange:'Обмін',
      exchange_sub:'Виберіть валюту та введіть суму',
      send:'Віддаєте',
      receive:'Отримуєте',
      amount:'Сума',
      you_get:'Ви отримаєте',
      create:'Створити заявку',
      network:'Мережа',
      choose_asset:'Виберіть валюту',
      choose_network:'Оберіть мережу',
      lang:'Мова',
      tab_home:'Головна',
      tab_history:'Історія',
      tab_profile:'Профіль',
      history:'Історія',
      history_sub:'Ваші заявки на обмін',
      history_empty_title:'Поки що порожньо',
      history_empty_sub:'Створіть першу на вкладці «Головна».',
      contacts:'Контакти',
      phone:'Телефон',
      settings:'Налаштування',
      card:'Номер картки',
      name:'ПІБ',
      wallet:'Адреса гаманця',
      saved:'Збережені реквізити',
      security:'Безпека',
      support:'Підтримка',
      currency:'Валюта акаунта',
      save:'Зберегти',
      ok_created:'Заявку створено',
      fill_amount:'Введіть суму',
      fill_card:'Введіть номер картки',
      fill_name:'Введіть ПІБ',
      fill_wallet:'Введіть адресу гаманця',
    },
    en: {
      exchange:'Exchange',
      exchange_sub:'Choose assets and enter amount',
      send:'You send',
      receive:'You receive',
      amount:'Amount',
      you_get:'You will get',
      create:'Create request',
      network:'Network',
      choose_asset:'Choose asset',
      choose_network:'Choose network',
      lang:'Language',
      tab_home:'Home',
      tab_history:'History',
      tab_profile:'Profile',
      history:'History',
      history_sub:'Your exchange requests',
      history_empty_title:'Nothing yet',
      history_empty_sub:'Create your first one on “Home”.',
      contacts:'Contacts',
      phone:'Phone',
      settings:'Settings',
      card:'Card number',
      name:'Full name',
      wallet:'Wallet address',
      saved:'Saved details',
      security:'Security',
      support:'Support',
      currency:'Account currency',
      save:'Save',
      ok_created:'Request created',
      fill_amount:'Enter amount',
      fill_card:'Enter card number',
      fill_name:'Enter full name',
      fill_wallet:'Enter wallet address',
    },
    tr: {
      exchange:'Değişim',
      exchange_sub:'Varlık seçin ve tutarı girin',
      send:'Gönderiyorsunuz',
      receive:'Alıyorsunuz',
      amount:'Tutar',
      you_get:'Alacaksınız',
      create:'Talep oluştur',
      network:'Ağ',
      choose_asset:'Varlık seç',
      choose_network:'Ağ seç',
      lang:'Dil',
      tab_home:'Ana',
      tab_history:'Geçmiş',
      tab_profile:'Profil',
      history:'Geçmiş',
      history_sub:'Değişim talepleriniz',
      history_empty_title:'Henüz yok',
      history_empty_sub:'İlkini “Ana” sekmesinde oluşturun.',
      contacts:'İletişim',
      phone:'Telefon',
      settings:'Ayarlar',
      card:'Kart numarası',
      name:'Ad Soyad',
      wallet:'Cüzdan adresi',
      saved:'Kayıtlı bilgiler',
      security:'Güvenlik',
      support:'Destek',
      currency:'Hesap para birimi',
      save:'Kaydet',
      ok_created:'Talep oluşturuldu',
      fill_amount:'Tutar girin',
      fill_card:'Kart numarası girin',
      fill_name:'Ad soyad girin',
      fill_wallet:'Cüzdan adresi girin',
    },
    pl: {
      exchange:'Wymiana',
      exchange_sub:'Wybierz aktywa i wpisz kwotę',
      send:'Wysyłasz',
      receive:'Otrzymujesz',
      amount:'Kwota',
      you_get:'Otrzymasz',
      create:'Utwórz zlecenie',
      network:'Sieć',
      choose_asset:'Wybierz aktywo',
      choose_network:'Wybierz sieć',
      lang:'Język',
      tab_home:'Główna',
      tab_history:'Historia',
      tab_profile:'Profil',
      history:'Historia',
      history_sub:'Twoje zlecenia wymiany',
      history_empty_title:'Brak historii',
      history_empty_sub:'Utwórz pierwsze na „Główna”.',
      contacts:'Kontakt',
      phone:'Telefon',
      settings:'Ustawienia',
      card:'Numer karty',
      name:'Imię i nazwisko',
      wallet:'Adres portfela',
      saved:'Zapisane dane',
      security:'Bezpieczeństwo',
      support:'Wsparcie',
      currency:'Waluta konta',
      save:'Zapisz',
      ok_created:'Zlecenie utworzone',
      fill_amount:'Wpisz kwotę',
      fill_card:'Wpisz numer karty',
      fill_name:'Wpisz imię i nazwisko',
      fill_wallet:'Wpisz adres portfela',
    },
  };

  // ---------- Assets -> image paths (your repo structure) ----------
  const assetImg = (type, id) => {
    // crypto folder filenames
    const cryptoMap = {
      usdt:'tether-usdt.png',
      usdc:'usdc.png',
      btc:'btc.png',
      eth:'eth.png',
      trx:'trx.png',
      ton:'ton.png',
      sol:'sol.png',
      ltc:'ltc.png',
      bnb:'bnb.png',
      xrp:'xrp.png',
      ada:'cardano.png',
      doge:'dogecoin.png',
      shib:'shiba.png',
      dai:'dai.png',
    };

    // banks folder filenames
    const bankMap = {
      'a-bank':'a-bank.png',
      izi:'izi.png',
      mono:'mono.png',
      oschad:'oschad.png',
      otp:'otp.png',
      privat:'privat.png',
      pumb:'pumb.png',
      reyf:'reyf.png',
      sense:'sense.png',
      'ukr-sib':'ukr-sib.png',
      'visa-master':'visa-master.png',
    };

    // networks folder filenames
    const netMap = {
      arb:'arb.png',
      bep20:'bep20.png',
      bsc:'bsc.png',
      btc:'btc.png',
      erc20:'erc20.png',
      eth:'eth.png',
      op:'op.png',
      pol:'pol.png',
      sol:'sol.png',
      ton:'ton.png',
      trc20:'trc20.png',
      trx:'trx.png',
      card:'' // no icon needed
    };

    if (type === 'crypto') return `logos/crypto/${cryptoMap[id] || (id + '.png')}`;
    if (type === 'bank') return `logos/banks/${bankMap[id] || (id + '.png')}`;
    if (type === 'network') {
      const f = netMap[id] || (id + '.png');
      return f ? `logos/networks/${f}` : '';
    }
    return '';
  };

  // ---------- State ----------
  const state = {
    lang: load('lang') || 'uk',
    send: { assetId: load('sendAsset') || 'usdt', networkId: load('sendNetwork') || 'trc20' },
    recv: { assetId: load('recvAsset') || 'mono', networkId: load('recvNetwork') || 'card' },
    profile: load('profile') || { name:'@user', levelKey:'newbie', email:'', phone:'', currency:'UAH', avatarData:'' },
    history: load('history') || [],
  };

  // Telegram user (optional)
  const tgUser = (() => {
    try { return (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user) || null; } catch(e) { return null; }
  })();

  // ---------- UI helpers ----------
  const toast = (msg) => {
    const el = $('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 2200);
  };

  const setIcon = (el, type, id, fallbackText) => {
    el.innerHTML = '';
    const src = assetImg(type, id);
    if (!src) {
      const fb = document.createElement('div');
      fb.className = 'fallback';
      fb.textContent = fallbackText || '?';
      el.appendChild(fb);
      return;
    }
    const img = document.createElement('img');
    img.alt = fallbackText || id;
    img.src = src;
    img.onerror = () => {
      el.innerHTML = '';
      const fb = document.createElement('div');
      fb.className = 'fallback';
      fb.textContent = (fallbackText || id || '?').slice(0,3).toUpperCase();
      el.appendChild(fb);
    };
    el.appendChild(img);
  };

  const fmtCard = (val) => {
    const digits = (val || '').replace(/\D/g,'').slice(0,16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const isCryptoId = (id) => CRYPTO.some(x => x.id === id);
  const findAsset = (id) => CRYPTO.find(x=>x.id===id) || BANKS.find(x=>x.id===id);
  const findNet = (id) => NETWORKS.find(x=>x.id===id) || (id==='card' ? CARD_NET : null);

  // Default networks by asset
  const defaultNetworkForAsset = (assetId) => {
    if (!isCryptoId(assetId)) return 'card';
    if (assetId === 'btc') return 'btc';
    if (assetId === 'eth') return 'eth';
    if (assetId === 'trx') return 'trx';
    if (assetId === 'ton') return 'ton';
    if (assetId === 'sol') return 'sol';
    if (assetId === 'bnb') return 'bsc';
    // stablecoins default
    return 'trc20';
  };

  const networksForAsset = (assetId) => {
    if (!isCryptoId(assetId)) return [CARD_NET];
    // For stablecoins allow common networks
    if (assetId === 'usdt' || assetId === 'usdc') {
      return NETWORKS.filter(n => ['erc20','bep20','trc20','sol','ton'].includes(n.id));
    }
    // For others, show their native + a couple options if exists
    const preferred = defaultNetworkForAsset(assetId);
    const pool = NETWORKS.filter(n => ['btc','eth','trx','ton','sol','bsc','arb','op','pol'].includes(n.id));
    const uniq = [];
    const push = (id) => {
      const item = NETWORKS.find(n=>n.id===id);
      if (item && !uniq.some(x=>x.id===id)) uniq.push(item);
    };
    push(preferred);
    // extra modern chains (optional)
    ['arb','op','pol','erc20','bep20','trc20'].forEach(push);
    // keep only existing
    return uniq;
  };

  const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || (I18N.uk[key] || key);

  // ---------- Sheets (bottom modals) ----------
  const sheet = {
    open({ title, mode, items, onPick }) {
      sheet.mode = mode;
      sheet.items = items || [];
      sheet.onPick = onPick;

      $('sheetTitle').textContent = title;
      $('sheetBackdrop').hidden = false;
      $('sheet').hidden = false;

      // Search ONLY for assets
      const showSearch = mode === 'asset';
      $('sheetSearchWrap').style.display = showSearch ? 'block' : 'none';
      $('sheetSearch').value = '';
      if (showSearch) setTimeout(() => $('sheetSearch').focus(), 10);

      sheet.render('');
    },
    close() {
      $('sheetBackdrop').hidden = true;
      $('sheet').hidden = true;
    },
    render(q) {
      const body = $('sheetBody');
      body.innerHTML = '';
      const query = (q || '').trim().toLowerCase();

      const filtered = sheet.items.filter(it => {
        if (!query) return true;
        const s = ((it.code||'') + ' ' + (it._title||'') + ' ' + (it._sub||'')).toLowerCase();
        return s.includes(query);
      });

      filtered.forEach(it => {
        const row = document.createElement('button');
        row.className = 'row';
        row.type = 'button';

        const left = document.createElement('div');
        left.className = 'row__left';

        const ic = document.createElement('span');
        ic.className = 'icon';

        if (sheet.mode === 'lang') {
          ic.innerHTML = `<div class="fallback">${it.flag}</div>`;
        } else if (sheet.mode === 'network') {
          setIcon(ic, 'network', it.id, it.code);
        } else if (sheet.mode === 'asset') {
          setIcon(ic, it.type, it.id, it.code);
        }

        const text = document.createElement('div');
        text.style.minWidth = '0';

        const title = document.createElement('div');
        title.className = 'row__title';
        title.textContent = it._title || it.code;

        const sub = document.createElement('div');
        sub.className = 'row__sub';
        sub.textContent = it._sub || '';

        text.appendChild(title);
        if (sub.textContent) text.appendChild(sub);

        left.appendChild(ic);
        left.appendChild(text);

        const right = document.createElement('div');
        right.className = 'row__right';
        right.textContent = '›';

        row.appendChild(left);
        row.appendChild(right);

        row.addEventListener('click', () => {
          sheet.close();
          sheet.onPick && sheet.onPick(it);
        });

        body.appendChild(row);
      });
    }
  };

  // ---------- UI bindings ----------
  const updateLangUI = () => {
    const L = LANGS[state.lang] || LANGS.uk;
    $('langFlag').textContent = L.flag;
    $('langCode').textContent = L.code;

    // Static labels
    $('t_exchange').textContent = t('exchange');
    $('t_exchangeSub').textContent = t('exchange_sub');
    $('t_send').textContent = t('send');
    $('t_receive').textContent = t('receive');
    $('t_youGet').textContent = t('you_get');
    $('createBtn').textContent = t('create');

    $('t_history').textContent = t('history');
    $('t_historySub').textContent = t('history_sub');
    $('t_historyEmptyTitle').textContent = t('history_empty_title');
    $('t_historyEmptySub').textContent = t('history_empty_sub');

    $('t_contacts').textContent = t('contacts');
    $('t_phone').textContent = t('phone');
    $('t_settings').textContent = t('settings');
    $('t_card').textContent = t('card');
    $('t_name').textContent = t('name');
    $('t_wallet').textContent = t('wallet');
    $('t_currency').textContent = t('currency');
    $('t_saved').textContent = t('saved');
    $('t_security').textContent = t('security');
    $('t_support').textContent = t('support');
    $('saveProfileBtn').textContent = t('save');

    $('t_tabHome').textContent = t('tab_home');
    $('t_tabHistory').textContent = t('tab_history');
    $('t_tabProfile').textContent = t('tab_profile');

    $('sheetSearch').placeholder = state.lang === 'uk' ? 'Пошук' : (state.lang === 'en' ? 'Search' : (state.lang === 'pl' ? 'Szukaj' : 'Ara'));
  };

  const updateExchangeUI = () => {
    const sendA = findAsset(state.send.assetId);
    const recvA = findAsset(state.recv.assetId);

    // Asset pickers
    setIcon($('sendAssetIcon'), isCryptoId(sendA.id) ? 'crypto' : 'bank', sendA.id, sendA.code);
    $('sendAssetTitle').textContent = sendA.code;
    $('sendAssetSub').textContent = (sendA.title[state.lang] || sendA.title.uk) || sendA.code;

    setIcon($('recvAssetIcon'), isCryptoId(recvA.id) ? 'crypto' : 'bank', recvA.id, recvA.code);
    $('recvAssetTitle').textContent = recvA.code;
    $('recvAssetSub').textContent = (recvA.subtitle[state.lang] || recvA.subtitle.uk) || '';

    // Networks
    const sendNet = findNet(state.send.networkId) || findNet(defaultNetworkForAsset(sendA.id)) || CARD_NET;
    const recvNet = findNet(state.recv.networkId) || findNet(defaultNetworkForAsset(recvA.id)) || CARD_NET;

    // If asset type doesn't support selected net - reset
    const sendAllowed = networksForAsset(sendA.id).some(n=>n.id===sendNet.id);
    if (!sendAllowed) state.send.networkId = defaultNetworkForAsset(sendA.id);

    const recvAllowed = networksForAsset(recvA.id).some(n=>n.id===recvNet.id) || (!isCryptoId(recvA.id) && recvNet.id==='card');
    if (!recvAllowed) state.recv.networkId = defaultNetworkForAsset(recvA.id);

    const sn = findNet(state.send.networkId) || CARD_NET;
    const rn = findNet(state.recv.networkId) || CARD_NET;

    setIcon($('sendNetworkIcon'), 'network', sn.id, sn.code);
    $('sendNetworkTitle').textContent = sn.code;
    $('sendNetworkSub').textContent = (sn.subtitle[state.lang] || sn.subtitle.uk) || '';

    setIcon($('recvNetworkIcon'), 'network', rn.id, rn.code);
    $('recvNetworkTitle').textContent = rn.code;
    $('recvNetworkSub').textContent = (rn.subtitle[state.lang] || rn.subtitle.uk) || '';

    $('amountUnit').textContent = sendA.code;

    // Bank vs Wallet fields based on receive asset type
    const recvIsCrypto = isCryptoId(recvA.id);
    $('bankFields').style.display = recvIsCrypto ? 'none' : 'flex';
    $('walletFields').style.display = recvIsCrypto ? 'flex' : 'none';

    // Estimate (demo only)
    const amt = parseFloat(($('amountInput').value || '0').replace(',', '.')) || 0;
    const rate = estimateRate(sendA.id, recvA.id);
    const out = amt > 0 ? (amt * rate) : 0;
    $('estimateOut').textContent = out ? out.toFixed(recvIsCrypto ? 6 : 2) : '0';

    // persist
    save('sendAsset', state.send.assetId);
    save('sendNetwork', state.send.networkId);
    save('recvAsset', state.recv.assetId);
    save('recvNetwork', state.recv.networkId);
    save('lang', state.lang);
  };

  const estimateRate = (fromId, toId) => {
    // Very simple demo rate table (replace later with backend / API)
    // Base: 1 USDT ≈ 40 UAH
    const UAH = 40;
    const usdToUah = UAH;
    const uahToUsd = 1/UAH;

    const isFromCrypto = isCryptoId(fromId);
    const isToCrypto = isCryptoId(toId);

    if (isFromCrypto && !isToCrypto) {
      // crypto -> bank UAH
      if (fromId === 'btc') return 2500000; // demo
      if (fromId === 'eth') return 120000;
      if (fromId === 'usdc' || fromId === 'usdt') return usdToUah;
      return usdToUah * 0.9;
    }

    if (!isFromCrypto && isToCrypto) {
      // bank UAH -> crypto
      if (toId === 'btc') return 1/2500000;
      if (toId === 'eth') return 1/120000;
      if (toId === 'usdc' || toId === 'usdt') return uahToUsd;
      return uahToUsd * 1.1;
    }

    if (isFromCrypto && isToCrypto) {
      // crypto -> crypto (demo)
      if (fromId === toId) return 1;
      // USDT/USDC as base
      if (fromId === 'usdt' && toId === 'usdc') return 1;
      if (fromId === 'usdc' && toId === 'usdt') return 1;
      if (fromId === 'usdt' && toId === 'btc') return 1/62500;
      if (fromId === 'btc' && toId === 'usdt') return 62500;
      return 1;
    }

    // bank -> bank
    return 1;
  };

  const updateHistoryUI = () => {
    const list = $('historyList');
    const empty = $('historyEmpty');
    list.innerHTML = '';

    if (!state.history.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    state.history.slice().reverse().forEach(item => {
      const div = document.createElement('div');
      div.className = 'hitem';

      const left = document.createElement('div');
      left.className = 'hitem__left';

      const a1 = findAsset(item.send.assetId);
      const a2 = findAsset(item.recv.assetId);

      const title = document.createElement('div');
      title.className = 'hitem__title';
      title.textContent = `${a1.code} → ${a2.code}`;

      const sub = document.createElement('div');
      sub.className = 'hitem__sub';
      sub.textContent = `${item.amount} ${a1.code} • ${new Date(item.ts).toLocaleString()}`;

      left.appendChild(title);
      left.appendChild(sub);

      const badge = document.createElement('div');
      badge.className = 'badge' + (item.status === 'done' ? ' is-done' : '');
      badge.textContent = item.status === 'done' ? 'Done' : 'New';

      div.appendChild(left);
      div.appendChild(badge);

      list.appendChild(div);
    });
  };

  const updateProfileUI = () => {
    const p = state.profile;

    // From telegram if exists
    const username = tgUser && (tgUser.username ? '@' + tgUser.username : '');
    const name = tgUser && (tgUser.first_name || '') ? (tgUser.first_name + (tgUser.last_name ? ' ' + tgUser.last_name : '')) : '';
    $('profileUser').textContent = username || p.name || '@user';
    $('profileName').textContent = name || (p.levelKey === 'newbie' ? (state.lang==='uk'?'Новачок':'Newbie') : 'User');

    $('emailInput').value = p.email || '';
    $('phoneInput').value = p.phone || '';
    $('currencyValue').textContent = p.currency || 'UAH';

    // Avatar
    const hasAvatar = !!(p.avatarData);
    if (hasAvatar) {
      $('avatarImg').src = p.avatarData;
      $('avatarImg').style.display = 'block';
      $('avatarFallback').style.display = 'none';
    } else {
      $('avatarImg').style.display = 'none';
      $('avatarFallback').style.display = 'grid';
      const initials = (name || 'KeksSwap').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
      $('avatarFallback').textContent = initials || 'KS';
    }

    // Saved count (demo: save last used details)
    const saved = load('saved') || { cards:[], wallets:[] };
    $('savedCount').textContent = String((saved.cards?.length||0) + (saved.wallets?.length||0));
  };

  // ---------- Tabs ----------
  const setTab = (tab) => {
    const map = { home:'screenHome', history:'screenHistory', profile:'screenProfile' };
    Object.values(map).forEach(id => $(id).classList.remove('is-active'));
    $(map[tab]).classList.add('is-active');

    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('is-active'));
    document.querySelector(`.tab[data-tab="${tab}"]`).classList.add('is-active');

    if (tab === 'history') updateHistoryUI();
    if (tab === 'profile') updateProfileUI();
  };

  // ---------- Open pickers ----------
  const openAssetPicker = (side) => {
    // Order requirement:
    // - send ("Віддаєте"): crypto first -> banks
    // - recv ("Отримуєте"): banks first -> crypto
    const list = side === 'send'
      ? [...CRYPTO.map(x=>({ ...x, type:'crypto' })), ...BANKS.map(x=>({ ...x, type:'bank' })) ]
      : [...BANKS.map(x=>({ ...x, type:'bank' })), ...CRYPTO.map(x=>({ ...x, type:'crypto' })) ];

    const items = list.map(x => ({
      ...x,
      _title: (x.title[state.lang] || x.title.uk || x.code),
      _sub: (x.subtitle[state.lang] || x.subtitle.uk || ''),
    }));

    sheet.open({
      title: t('choose_asset'),
      mode: 'asset',
      items,
      onPick: (it) => {
        if (side === 'send') {
          state.send.assetId = it.id;
          state.send.networkId = defaultNetworkForAsset(it.id);
        } else {
          state.recv.assetId = it.id;
          state.recv.networkId = defaultNetworkForAsset(it.id);
        }
        updateExchangeUI();
      }
    });
  };

  const openNetworkPicker = (side) => {
    const assetId = side === 'send' ? state.send.assetId : state.recv.assetId;
    const nets = networksForAsset(assetId);

    const items = nets.map(n => ({
      ...n,
      _title: (n.title[state.lang] || n.title.uk || n.code),
      _sub: (n.subtitle[state.lang] || n.subtitle.uk || ''),
    }));

    sheet.open({
      title: t('choose_network'),
      mode: 'network',
      items,
      onPick: (it) => {
        if (side === 'send') state.send.networkId = it.id;
        else state.recv.networkId = it.id;
        updateExchangeUI();
      }
    });
  };

  const openLangPicker = () => {
    const items = Object.keys(LANGS).map(k => ({
      id:k,
      code: LANGS[k].code,
      flag: LANGS[k].flag,
      _title: LANGS[k].code,
      _sub: '',
    }));

    sheet.open({
      title: t('lang'),
      mode: 'lang',
      items,
      onPick: (it) => {
        state.lang = it.id;
        save('lang', state.lang);
        updateLangUI();
        updateExchangeUI();
        updateHistoryUI();
        updateProfileUI();
      }
    });
  };

  // ---------- Actions ----------
  const createRequest = () => {
    const amt = ($('amountInput').value || '').trim();
    const amountNum = parseFloat(amt.replace(',', '.'));
    if (!amountNum || amountNum <= 0) return toast(t('fill_amount'));

    const recvA = findAsset(state.recv.assetId);
    const recvIsCrypto = isCryptoId(recvA.id);

    if (!recvIsCrypto) {
      const card = ($('cardInput').value || '').replace(/\s/g,'');
      const name = ($('nameInput').value || '').trim();
      if (card.length < 12) return toast(t('fill_card'));
      if (name.length < 3) return toast(t('fill_name'));

      // Save last used card (optional)
      const saved = load('saved') || { cards:[], wallets:[] };
      if (!saved.cards.includes(card)) saved.cards.unshift(card);
      saved.cards = saved.cards.slice(0,5);
      save('saved', saved);
    } else {
      const w = ($('walletInput').value || '').trim();
      if (w.length < 8) return toast(t('fill_wallet'));
      const saved = load('saved') || { cards:[], wallets:[] };
      if (!saved.wallets.includes(w)) saved.wallets.unshift(w);
      saved.wallets = saved.wallets.slice(0,5);
      save('saved', saved);
    }

    const req = {
      id: 'KS' + Math.random().toString(16).slice(2,8).toUpperCase(),
      ts: Date.now(),
      amount: amountNum,
      send: { ...state.send },
      recv: { ...state.recv },
      status: 'new',
    };

    state.history.push(req);
    save('history', state.history);

    toast(t('ok_created'));
    $('amountInput').value = '';
    $('estimateOut').textContent = '0';
    updateHistoryUI();

    try {
      if (window.Telegram && Telegram.WebApp && Telegram.WebApp.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }
    } catch(e){}
  };

  const swapSides = () => {
    // Swap assets & networks
    const a = JSON.parse(JSON.stringify(state.send));
    state.send = JSON.parse(JSON.stringify(state.recv));
    state.recv = a;

    // Fix networks if swapped types differ
    state.send.networkId = defaultNetworkForAsset(state.send.assetId);
    state.recv.networkId = defaultNetworkForAsset(state.recv.assetId);

    updateExchangeUI();

    try {
      if (window.Telegram && Telegram.WebApp && Telegram.WebApp.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }
    } catch(e){}
  };

  const saveProfile = () => {
    state.profile.email = ($('emailInput').value || '').trim();
    state.profile.phone = ($('phoneInput').value || '').trim();
    save('profile', state.profile);
    toast('OK');
    updateProfileUI();
  };

  const pickAvatar = () => $('avatarFile').click();

  const onAvatarFile = async (file) => {
    if (!file) return;
    // Limit size ~ 300kb
    const dataUrl = await fileToDataURL(file);
    state.profile.avatarData = dataUrl;
    save('profile', state.profile);
    updateProfileUI();
  };

  const fileToDataURL = (file) => new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

  // ---------- Events ----------
  const bind = () => {
    // Tabs
    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => setTab(btn.dataset.tab));
    });

    // Pickers
    $('sendAssetBtn').addEventListener('click', () => openAssetPicker('send'));
    $('recvAssetBtn').addEventListener('click', () => openAssetPicker('recv'));

    $('sendNetworkBtn').addEventListener('click', () => openNetworkPicker('send'));
    $('recvNetworkBtn').addEventListener('click', () => openNetworkPicker('recv'));

    $('langBtn').addEventListener('click', openLangPicker);

    // Sheet close
    $('sheetBackdrop').addEventListener('click', sheet.close);
    $('sheetCloseBtn').addEventListener('click', sheet.close);
    $('sheetSearch').addEventListener('input', (e) => sheet.render(e.target.value));

    // Amount / card format
    $('amountInput').addEventListener('input', updateExchangeUI);
    $('cardInput').addEventListener('input', (e) => {
      const pos = e.target.selectionStart;
      e.target.value = fmtCard(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });

    $('swapBtn').addEventListener('click', swapSides);
    $('createBtn').addEventListener('click', createRequest);

    // Profile
    $('saveProfileBtn').addEventListener('click', saveProfile);
    $('avatarEditBtn').addEventListener('click', pickAvatar);
    $('avatarFile').addEventListener('change', (e) => onAvatarFile(e.target.files && e.target.files[0]));

    // Tiles (simple demo actions)
    $('currencyBtn').addEventListener('click', () => {
      const opts = ['UAH','USD','EUR'];
      const next = opts[(opts.indexOf(state.profile.currency || 'UAH') + 1) % opts.length];
      state.profile.currency = next;
      save('profile', state.profile);
      updateProfileUI();
      toast(next);
    });

    $('savedBtn').addEventListener('click', () => {
      const saved = load('saved') || { cards:[], wallets:[] };
      const msg = [
        saved.cards?.length ? ('Cards: ' + saved.cards.map(c=>c.replace(/(\d{4})\d+(\d{4})/, '$1••••$2')).join(', ')) : 'Cards: -',
        saved.wallets?.length ? ('Wallets: ' + saved.wallets.map(w=>w.slice(0,6)+'…'+w.slice(-4)).join(', ')) : 'Wallets: -',
      ].join('\n');
      toast(state.lang==='uk' ? 'Див. збережені реквізити' : 'Saved');
      try {
        if (window.Telegram && Telegram.WebApp && Telegram.WebApp.showPopup) {
          Telegram.WebApp.showPopup({ title:'Saved', message: msg, buttons:[{type:'close'}] });
        } else {
          alert(msg);
        }
      } catch(e){ alert(msg); }
    });

    $('supportBtn').addEventListener('click', () => {
      const handle = '@keksswap_support';
      try {
        if (window.Telegram && Telegram.WebApp && Telegram.WebApp.openTelegramLink) {
          Telegram.WebApp.openTelegramLink('https://t.me/' + handle.replace('@',''));
        } else {
          toast(handle);
        }
      } catch(e){ toast(handle); }
    });

    $('securityBtn').addEventListener('click', () => toast(state.lang==='uk' ? 'Скоро додамо PIN' : 'PIN soon'));
  };

  // ---------- Init ----------
  const init = () => {
    // Profile defaults from Telegram
    if (tgUser && tgUser.username && (!state.profile.name || state.profile.name === '@user')) {
      state.profile.name = '@' + tgUser.username;
      save('profile', state.profile);
    }

    updateLangUI();

    // Ensure networks valid on start
    state.send.networkId = state.send.networkId || defaultNetworkForAsset(state.send.assetId);
    state.recv.networkId = state.recv.networkId || defaultNetworkForAsset(state.recv.assetId);

    bind();
    updateExchangeUI();
    updateHistoryUI();
    updateProfileUI();
  };

  init();
})();
