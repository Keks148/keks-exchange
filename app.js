/* KeksSwap - single-file demo logic (no backend yet)
   Fixes:
   - Asset ordering (Give: crypto first; Get: banks first)
   - No search in Language & Network sheets
   - Bank selection does NOT show fake "Card" network
   - Network list depends on chosen crypto
   - Bottom sheet always closes (X, backdrop, Esc)
   - No broken icons: fallback to letter badge
*/

(function(){
  // Telegram mini app safe tweaks
  try{
    if (window.Telegram && Telegram.WebApp){
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
      Telegram.WebApp.setHeaderColor?.('#dff2ff');
      Telegram.WebApp.setBackgroundColor?.('#dff2ff');
    }
  }catch(e){}

  const $ = (id)=>document.getElementById(id);

const getTelegramUser = () => {
  try {
    const tg = window.Telegram && window.Telegram.WebApp;
    if (!tg) return null;
    tg.ready && tg.ready();
    const u = tg.initDataUnsafe && tg.initDataUnsafe.user;
    return u || null;
  } catch (e) { return null; }
};

const applyTelegramProfile = () => {
  const u = getTelegramUser();
  if (!u) return;
  const name = [u.first_name, u.last_name].filter(Boolean).join(" ").trim();
  const uname = u.username ? "@" + u.username : "@user";

  const avatarImg = $("avatarImg");
  const avatarText = $("avatarText");
  const nameEl = $("profileName");
  const userEl = $("profileUser");

  if (nameEl && name) nameEl.textContent = name;
  if (userEl) userEl.textContent = uname;

  const initials = (name || "KS")
    .split(" ")
    .filter(Boolean)
    .slice(0,2)
    .map(s => s[0].toUpperCase())
    .join("");

  if (avatarText) {
    avatarText.textContent = initials || "KS";
    avatarText.hidden = false;
  }

  const photo = u.photo_url;
  if (avatarImg && photo) {
    avatarImg.src = photo;
    avatarImg.hidden = false;
    if (avatarText) avatarText.hidden = true;
  }
};

  const LANGS = [
    { id:'uk', code:'UA', name:{uk:'Українська', en:'Ukrainian', pl:'Ukraiński', tr:'Ukraynaca'}, flag:'assets/flags/ua.svg' },
    { id:'en', code:'EN', name:{uk:'English', en:'English', pl:'English', tr:'English'}, flag:'assets/flags/gb.svg' },
    { id:'tr', code:'TR', name:{uk:'Türkçe', en:'Turkish', pl:'Turecki', tr:'Türkçe'}, flag:'assets/flags/tr.svg' },
    { id:'pl', code:'PL', name:{uk:'Polski', en:'Polish', pl:'Polski', tr:'Lehçe'}, flag:'assets/flags/pl.svg' }
  ];

  // --- Assets (logos must exist in your repo paths) ---
  const CRYPTO = [
    { id:'usdt',  code:'USDT', title:{uk:'Tether (USDT)', en:'Tether (USDT)', pl:'Tether (USDT)', tr:'Tether (USDT)'}, icon:'logos/crypto/tether-usdt.png' },
    { id:'usdc',  code:'USDC', title:{uk:'USD Coin (USDC)', en:'USD Coin (USDC)', pl:'USD Coin (USDC)', tr:'USD Coin (USDC)'}, icon:'logos/crypto/usdc.png' },
    { id:'btc',   code:'BTC',  title:{uk:'Bitcoin (BTC)', en:'Bitcoin (BTC)', pl:'Bitcoin (BTC)', tr:'Bitcoin (BTC)'}, icon:'logos/crypto/btc.png' },
    { id:'eth',   code:'ETH',  title:{uk:'Ethereum (ETH)', en:'Ethereum (ETH)', pl:'Ethereum (ETH)', tr:'Ethereum (ETH)'}, icon:'logos/crypto/eth.png' },
    { id:'bnb',   code:'BNB',  title:{uk:'BNB (BNB)', en:'BNB (BNB)', pl:'BNB (BNB)', tr:'BNB (BNB)'}, icon:'logos/crypto/bnb.png' },
    { id:'trx',   code:'TRX',  title:{uk:'TRON (TRX)', en:'TRON (TRX)', pl:'TRON (TRX)', tr:'TRON (TRX)'}, icon:'logos/crypto/trx.png' },
    { id:'ton',   code:'TON',  title:{uk:'Toncoin (TON)', en:'Toncoin (TON)', pl:'Toncoin (TON)', tr:'Toncoin (TON)'}, icon:'logos/crypto/ton.png' },
    { id:'sol',   code:'SOL',  title:{uk:'Solana (SOL)', en:'Solana (SOL)', pl:'Solana (SOL)', tr:'Solana (SOL)'}, icon:'logos/crypto/sol.png' },
    { id:'xrp',   code:'XRP',  title:{uk:'XRP (XRP)', en:'XRP (XRP)', pl:'XRP (XRP)', tr:'XRP (XRP)'}, icon:'logos/crypto/xrp.png' },
    { id:'doge',  code:'DOGE', title:{uk:'Dogecoin (DOGE)', en:'Dogecoin (DOGE)', pl:'Dogecoin (DOGE)', tr:'Dogecoin (DOGE)'}, icon:'logos/crypto/dogecoin.png' },
    { id:'ada',   code:'ADA',  title:{uk:'Cardano (ADA)', en:'Cardano (ADA)', pl:'Cardano (ADA)', tr:'Cardano (ADA)'}, icon:'logos/crypto/cardano.png' },
    { id:'dai',   code:'DAI',  title:{uk:'DAI (DAI)', en:'DAI (DAI)', pl:'DAI (DAI)', tr:'DAI (DAI)'}, icon:'logos/crypto/dai.png' },
    { id:'shib',  code:'SHIB', title:{uk:'Shiba Inu (SHIB)', en:'Shiba Inu (SHIB)', pl:'Shiba Inu (SHIB)', tr:'Shiba Inu (SHIB)'}, icon:'logos/crypto/shiba.png' },
    { id:'ltc',   code:'LTC',  title:{uk:'Litecoin (LTC)', en:'Litecoin (LTC)', pl:'Litecoin (LTC)', tr:'Litecoin (LTC)'}, icon:'logos/crypto/ltc.png' }
  ];

  const BANKS = [
    { id:'mono',   code:'Monobank',  title:{uk:'Monobank', en:'Monobank', pl:'Monobank', tr:'Monobank'}, icon:'logos/banks/mono.png' },
    { id:'privat', code:'PrivatBank',title:{uk:'PrivatBank', en:'PrivatBank', pl:'PrivatBank', tr:'PrivatBank'}, icon:'logos/banks/privat.png' },
    { id:'a-bank', code:'A-Bank',    title:{uk:'A-Bank', en:'A-Bank', pl:'A-Bank', tr:'A-Bank'}, icon:'logos/banks/a-bank.png' },
    { id:'oschad', code:'Oschadbank',title:{uk:'Ощадбанк', en:'Oschadbank', pl:'Oschadbank', tr:'Oschadbank'}, icon:'logos/banks/oschad.png' },
    { id:'pumb',   code:'PUMB',      title:{uk:'ПУМБ', en:'PUMB', pl:'PUMB', tr:'PUMB'}, icon:'logos/banks/pumb.png' },
    { id:'sense',  code:'Sense Bank',title:{uk:'Sense Bank', en:'Sense Bank', pl:'Sense Bank', tr:'Sense Bank'}, icon:'logos/banks/sense.png' },
    { id:'ukrsib', code:'UkrSibbank',title:{uk:'Укрсиббанк', en:'UkrSibbank', pl:'UkrSibbank', tr:'UkrSibbank'}, icon:'logos/banks/ukr-sib.png' },
    { id:'otp',    code:'OTP',       title:{uk:'OTP Bank', en:'OTP Bank', pl:'OTP Bank', tr:'OTP Bank'}, icon:'logos/banks/otp.png' },
    { id:'raif',   code:'Raiffeisen',title:{uk:'Raiffeisen', en:'Raiffeisen', pl:'Raiffeisen', tr:'Raiffeisen'}, icon:'logos/banks/reyf.png' },
    { id:'izi',    code:'izibank',   title:{uk:'izibank', en:'izibank', pl:'izibank', tr:'izibank'}, icon:'logos/banks/izi.png' },
    { id:'visa',   code:'VISA/MC',   title:{uk:'VISA / MasterCard', en:'VISA / MasterCard', pl:'VISA / MasterCard', tr:'VISA / MasterCard'}, icon:'logos/banks/visa-master.png' }
  ];

  // Networks icons (prefer logos/networks/*). If not found - fallback.
  const NETWORKS = {
    btc:  { id:'btc',  code:'BTC',  title:{uk:'Bitcoin Network', en:'Bitcoin Network', pl:'Bitcoin Network', tr:'Bitcoin Network'}, icon:'logos/networks/btc.png' },
    eth:  { id:'eth',  code:'ETH',  title:{uk:'Ethereum', en:'Ethereum', pl:'Ethereum', tr:'Ethereum'}, icon:'logos/networks/eth.png' },
    bsc:  { id:'bsc',  code:'BSC',  title:{uk:'BNB Smart Chain', en:'BNB Smart Chain', pl:'BNB Smart Chain', tr:'BNB Smart Chain'}, icon:'logos/networks/bsc.png' },
    erc20:{ id:'erc20',code:'ERC20',title:{uk:'USDT/USDC · ETH', en:'USDT/USDC · ETH', pl:'USDT/USDC · ETH', tr:'USDT/USDC · ETH'}, icon:'logos/networks/erc20.png' },
    bep20:{ id:'bep20',code:'BEP20',title:{uk:'USDT/USDC · BSC', en:'USDT/USDC · BSC', pl:'USDT/USDC · BSC', tr:'USDT/USDC · BSC'}, icon:'logos/networks/bep20.png' },
    trc20:{ id:'trc20',code:'TRC20',title:{uk:'USDT/USDC · TRX', en:'USDT/USDC · TRX', pl:'USDT/USDC · TRX', tr:'USDT/USDC · TRX'}, icon:'logos/networks/trc20.png' },
    sol:  { id:'sol',  code:'SOL',  title:{uk:'USDT/USDC · SOL', en:'USDT/USDC · SOL', pl:'USDT/USDC · SOL', tr:'USDT/USDC · SOL'}, icon:'logos/networks/sol.png' },
    ton:  { id:'ton',  code:'TON',  title:{uk:'USDT/USDC · TON', en:'USDT/USDC · TON', pl:'USDT/USDC · TON', tr:'USDT/USDC · TON'}, icon:'logos/networks/ton.png' },
    arb:  { id:'arb',  code:'ARB',  title:{uk:'Arbitrum', en:'Arbitrum', pl:'Arbitrum', tr:'Arbitrum'}, icon:'logos/networks/arb.png' },
    op:   { id:'op',   code:'OP',   title:{uk:'Optimism', en:'Optimism', pl:'Optimism', tr:'Optimism'}, icon:'logos/networks/op.png' },
    pol:  { id:'pol',  code:'POL',  title:{uk:'Polygon', en:'Polygon', pl:'Polygon', tr:'Polygon'}, icon:'logos/networks/pol.png' },
    trx:  { id:'trx',  code:'TRX',  title:{uk:'Tron Network', en:'Tron Network', pl:'Tron Network', tr:'Tron Network'}, icon:'logos/networks/trx.png' }
  };

  function networksForCrypto(assetId){
    if (assetId === 'btc') return [NETWORKS.btc];
    if (assetId === 'eth') return [NETWORKS.eth, NETWORKS.erc20]; // allow native + token style
    if (assetId === 'bnb') return [NETWORKS.bsc, NETWORKS.bep20];
    if (assetId === 'trx') return [NETWORKS.trx, NETWORKS.trc20];
    if (assetId === 'ton') return [NETWORKS.ton];
    if (assetId === 'sol') return [NETWORKS.sol];
    // stablecoins + most alts -> choose common bridges
    if (assetId === 'usdt' || assetId === 'usdc') return [NETWORKS.erc20, NETWORKS.bep20, NETWORKS.trc20, NETWORKS.ton, NETWORKS.sol, NETWORKS.arb, NETWORKS.op, NETWORKS.pol];
    // fallback
    return [NETWORKS.erc20, NETWORKS.bep20, NETWORKS.trc20];
  }

  // --- State ---
  const state = {
    lang: 'uk',
    give: { kind:'crypto', id:'usdc', net:'erc20' },
    get:  { kind:'bank',  id:'mono', net:null },
    amount: '',
    profile: { email:'', phone:'', name:'Новачок' }
  };

  // --- i18n ---
  const T = {
    uk:{
      brandTag:'Обмін крипти ↔ банки',
      exchange:'Обмін',
      subtitle:'Виберіть валюту та введіть суму',
      give:'Віддаєте', get:'Отримуєте',
      network:'Мережа', amount:'Сума',
      card:'Номер картки', pib:'ПІБ', wallet:'Адреса гаманця',
      youGet:'Ви отримаєте',
      create:'Створити заявку',
      history:'Історія', profile:'Профіль', home:'Головна',
      historySub:'Ваші заявки на обмін',
      empty:'Поки що порожньо',
      profileName:'Новачок',
      change:'Змінити',
      email:'Email', phone:'Телефон',
      save:'Зберегти',
      sheetAssetGive:'Виберіть валюту (Віддаєте)',
      sheetAssetGet:'Виберіть валюту (Отримуєте)',
      sheetNetwork:'Оберіть мережу',
      sheetLanguage:'Мова'
    },
    en:{
      brandTag:'Crypto ↔ Banks exchange',
      exchange:'Exchange',
      subtitle:'Choose assets and enter amount',
      give:'You give', get:'You get',
      network:'Network', amount:'Amount',
      card:'Card number', pib:'Full name', wallet:'Wallet address',
      youGet:'You receive',
      create:'Create request',
      history:'History', profile:'Profile', home:'Home',
      historySub:'Your exchange requests',
      empty:'Empty',
      profileName:'New user',
      change:'Edit',
      email:'Email', phone:'Phone',
      save:'Save',
      sheetAssetGive:'Select asset (Give)',
      sheetAssetGet:'Select asset (Get)',
      sheetNetwork:'Select network',
      sheetLanguage:'Language'
    },
    tr:{
      brandTag:'Kripto ↔ Banka değişimi',
      exchange:'Değişim',
      subtitle:'Varlık seçin ve tutar girin',
      give:'Gönder', get:'Al',
      network:'Ağ', amount:'Tutar',
      card:'Kart numarası', pib:'Ad Soyad', wallet:'Cüzdan adresi',
      youGet:'Alacağınız',
      create:'Talep oluştur',
      history:'Geçmiş', profile:'Profil', home:'Ana',
      historySub:'Değişim talepleriniz',
      empty:'Boş',
      profileName:'Yeni kullanıcı',
      change:'Düzenle',
      email:'Email', phone:'Telefon',
      save:'Kaydet',
      sheetAssetGive:'Varlık seç (Gönder)',
      sheetAssetGet:'Varlık seç (Al)',
      sheetNetwork:'Ağ seç',
      sheetLanguage:'Dil'
    },
    pl:{
      brandTag:'Wymiana krypto ↔ banki',
      exchange:'Wymiana',
      subtitle:'Wybierz walutę i wpisz kwotę',
      give:'Oddajesz', get:'Otrzymujesz',
      network:'Sieć', amount:'Kwota',
      card:'Numer karty', pib:'Imię i nazwisko', wallet:'Adres portfela',
      youGet:'Otrzymasz',
      create:'Utwórz zlecenie',
      history:'Historia', profile:'Profil', home:'Główna',
      historySub:'Twoje zlecenia wymiany',
      empty:'Pusto',
      profileName:'Nowy użytkownik',
      change:'Edytuj',
      email:'Email', phone:'Telefon',
      save:'Zapisz',
      sheetAssetGive:'Wybierz walutę (Oddajesz)',
      sheetAssetGet:'Wybierz walutę (Otrzymujesz)',
      sheetNetwork:'Wybierz sieć',
      sheetLanguage:'Język'
    }
  };

  function tt(key){
    return (T[state.lang] && T[state.lang][key]) || T.uk[key] || key;
  }

  // --- UI helpers ---
  function setText(id, v){ const el = document.getElementById(id); if (el) el.textContent = v; }

  function setImg(imgEl, src, fallbackText){
    imgEl.onerror = () => {
      imgEl.style.display = 'none';
      // create a badge
      const badge = document.createElement('div');
      badge.className = 'imgBadge';
      badge.textContent = (fallbackText || '?').slice(0,4);
      badge.style.width = imgEl.className.includes('item__icon') ? '48px' : '44px';
      badge.style.height = imgEl.className.includes('item__icon') ? '48px' : '44px';
      badge.style.borderRadius = imgEl.className.includes('item__icon') ? '16px' : '14px';
      badge.style.display = 'flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.style.fontWeight = '900';
      badge.style.background = '#eaf6ff';
      badge.style.border = '1px solid rgba(13,27,42,.08)';
      badge.style.color = 'rgba(13,27,42,.7)';
      imgEl.parentElement.insertBefore(badge, imgEl);
    };
    imgEl.style.display = '';
    imgEl.src = src;
  }

  function toast(msg){
    const el = $('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{ el.hidden = true; }, 2200);
  }

  // --- Bottom sheet ---
  const sheet = {
  type: null,
  title: '',
  items: [],
  query: '',
  onPick: null,
  searchEnabled: true,
  isOpen: false,
  closing: false,
  lastCloseAt: 0,

  open(type, title, items, onPick, opts = {}) {
    // Backward compatibility: allow 4th arg as config object { onPick, search, ... }
    if (onPick && typeof onPick === 'object') {
      opts = onPick || {};
      onPick = opts.onPick;
    }

    // Prevent immediate re-open from "click-through" when closing
    const now = Date.now();
    if (now - this.lastCloseAt < 250 || this.closing) return;

    this.type = type;
    this.title = title || '';
    this.items = Array.isArray(items) ? items : [];
    this.query = '';
    this.onPick = typeof onPick === 'function' ? onPick : null;
    this.searchEnabled = opts.search !== false;

    $('sheetTitle').textContent = this.title;

    // Search visibility
    const wrap = $('sheetSearchWrap');
    if (this.searchEnabled) {
      wrap.hidden = false;
      $('sheetSearch').value = '';
      $('sheetSearch').placeholder = opts.searchPlaceholder || t('search');
      // Focus only for long lists (avoid keyboard pop for small lists like Language / Network)
      if ((opts.autofocus ?? true) && this.items.length >= 8) {
        setTimeout(() => $('sheetSearch').focus({ preventScroll: true }), 0);
      }
    } else {
      wrap.hidden = true;
      $('sheetSearch').value = '';
    }

    // Show
    $('sheetBackdrop').hidden = false;
    $('sheet').hidden = false;
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    this.closing = false;

    this.render();
  },

  close() {
    if (!this.isOpen) return;
    this.closing = true;
    this.lastCloseAt = Date.now();

    // Hide immediately (no animation — more reliable on mobile)
    $('sheet').hidden = true;
    $('sheetBackdrop').hidden = true;

    document.body.style.overflow = '';
    this.isOpen = false;

    // Small delay to avoid accidental re-open due to fast taps
    setTimeout(() => { this.closing = false; }, 220);
  },

  render() {
    const list = $('sheetList');
    list.innerHTML = '';

    const q = (this.query || '').trim().toLowerCase();
    const items = q
      ? this.items.filter((it) => {
          const a = (it.title || '').toLowerCase();
          const b = (it.subtitle || '').toLowerCase();
          const c = (it.code || '').toLowerCase();
          return a.includes(q) || b.includes(q) || c.includes(q);
        })
      : this.items;

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'sheetEmpty';
      empty.textContent = t('nothing_found');
      list.appendChild(empty);
      return;
    }

    for (const it of items) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'sheetItem';
      row.setAttribute('aria-label', it.title);

      row.innerHTML = `
        <div class="sheetIconWrap">
          ${it.icon ? `<img class="sheetIcon" src="${it.icon}" alt="" />` : `<div class="sheetIconFallback">${(it.code || '').slice(0, 3)}</div>`}
        </div>
        <div class="sheetMeta">
          <div class="sheetTitleRow">
            <div class="sheetItemTitle">${escapeHtml(it.title || '')}</div>
            ${it.badge ? `<span class="sheetBadge">${escapeHtml(it.badge)}</span>` : ``}
          </div>
          ${it.subtitle ? `<div class="sheetItemSubtitle">${escapeHtml(it.subtitle)}</div>` : ``}
        </div>
        <div class="sheetChevron">›</div>
      `;

      row.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const cb = this.onPick;
        this.close();
        if (cb) setTimeout(() => cb(it), 0);
      });

      list.appendChild(row);
    }
  }
};
// Hard reset sheets on boot (prevents "stuck open" on mobile webviews)
const forceCloseSheets = () => {
  try{
    $("sheetBackdrop").hidden = true;
    $("sheet").hidden = true;
    $("sheet").classList.remove("isOpen");
    document.body.classList.remove("noScroll");
  }catch(e){}
};
forceCloseSheets();

// Use pointer/touch events for reliable closing in mobile webviews
["pointerdown","touchstart"].forEach(evt => {
  $("sheetClose").addEventListener(evt, (e)=>{ e.preventDefault(); e.stopPropagation(); sheet.close(); }, {passive:false});
  $("sheetBackdrop").addEventListener(evt, (e)=>{ e.preventDefault(); sheet.close(); }, {passive:false});
});
;

  $('sheetClose').addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); sheet.close(); });
  $('sheetBackdrop').addEventListener('pointerdown', (e)=>{ e.preventDefault(); e.stopPropagation(); sheet.close(); });
$('sheetBackdrop').addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); sheet.close(); });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && !$('sheet').hidden) sheet.close();
  });

  // --- Render exchange ---
  function findCrypto(id){ return CRYPTO.find(x=>x.id===id) || CRYPTO[0]; }
  function findBank(id){ return BANKS.find(x=>x.id===id) || BANKS[0]; }
  function findNet(assetId, netId){
    const nets = networksForCrypto(assetId);
    return nets.find(n=>n.id===netId) || nets[0];
  }

  function render(){
    // i18n strings
    setText('brandTag', tt('brandTag'));
    setText('titleExchange', tt('exchange'));
    setText('subtitleExchange', tt('subtitle'));
    setText('lblGive', tt('give'));
    setText('lblGiveNet', tt('network'));
    setText('lblAmount', tt('amount'));
    setText('lblGet', tt('get'));
    setText('lblCard', tt('card'));
    setText('lblName', tt('pib'));
    setText('lblWalletWrap', tt('wallet'));
    setText('lblResult', tt('youGet'));
    $('createBtn').textContent = tt('create');
    setText('tabHome', tt('home'));
    setText('tabHistory', tt('history'));
    setText('tabProfile', tt('profile'));
    setText('titleHistory', tt('history'));
    setText('subHistory', tt('historySub'));
    setText('emptyHistory', tt('empty'));
    setText('titleProfile', tt('profile'));
    $('editProfileBtn').textContent = tt('change');
    setText('lblEmail', tt('email'));
    setText('lblPhone', tt('phone'));
    $('saveProfileBtn').textContent = tt('save');

    // lang button
    const lang = LANGS.find(l=>l.id===state.lang) || LANGS[0];
    $('langCode').textContent = lang.code;
    $('langFlag').src = lang.flag;
    $('langFlag').alt = lang.code;

    // give
    if(state.give.kind === 'crypto'){
      const c = findCrypto(state.give.id);
      setImg($('giveIcon'), c.icon, c.code);
      setText('giveMain', c.title[state.lang] || c.title.uk);
      setText('giveSub', c.code);
      $('amountUnit').textContent = c.code;

      const n = findNet(c.id, state.give.net);
      setImg($('giveNetIcon'), n.icon, n.code);
      setText('giveNetMain', n.code);
      setText('giveNetSub', n.title[state.lang] || n.title.uk);
    }

    // get
    if(state.get.kind === 'bank'){
      const b = findBank(state.get.id);
      setImg($('getIcon'), b.icon, b.code);
      setText('getMain', b.title[state.lang] || b.title.uk);
      setText('getSub', 'UAH · Card');

      // hide network picker for bank
      $('lblGetNetWrap').classList.add('hidden');
      $('getNetBtn').classList.add('hidden');

      // show card fields, hide wallet
      $('lblCard').classList.remove('hidden'); $('cardInput').classList.remove('hidden');
      $('lblName').classList.remove('hidden'); $('nameInput').classList.remove('hidden');
      $('lblWalletWrap').classList.add('hidden'); $('walletInput').classList.add('hidden');
    } else {
      // crypto receive
      const c = findCrypto(state.get.id);
      setImg($('getIcon'), c.icon, c.code);
      setText('getMain', c.title[state.lang] || c.title.uk);
      setText('getSub', c.code);

      $('lblGetNetWrap').classList.remove('hidden');
      $('getNetBtn').classList.remove('hidden');

      const n = findNet(c.id, state.get.net);
      setImg($('getNetIcon'), n.icon, n.code);
      setText('getNetMain', n.code);
      setText('getNetSub', n.title[state.lang] || n.title.uk);

      // hide card fields, show wallet
      $('lblCard').classList.add('hidden'); $('cardInput').classList.add('hidden');
      $('lblName').classList.add('hidden'); $('nameInput').classList.add('hidden');
      $('lblWalletWrap').classList.remove('hidden'); $('walletInput').classList.remove('hidden');
    }
  }

  // --- Sheets openers ---
  function openLang(){
    const items = LANGS.map(l=>({
      id:l.id,
      code:l.code,
      title:{ uk:l.name.uk, en:l.name.en, pl:l.name.pl, tr:l.name.tr },
      sub:'',
      icon:l.flag
    }));
    sheet.open('language', tt('sheetLanguage'), items, { search: false, autofocus: false, onPick:(it)=>{
        state.lang = it.id;
        render();
      }
    });
  }

  function openGiveAsset(){
    // Give: crypto first, then banks (as user requested)
    const items = [
      ...CRYPTO.map(c=>({ ...c, sub:c.code })),
      ...BANKS.map(b=>({ id:b.id, code:b.code, title:b.title, icon:b.icon, sub:'UAH · Card', kind:'bank' }))
    ];
    sheet.open('asset', tt('sheetAssetGive'), items, {
      onPick:(it)=>{
        // detect bank by presence of 'sub' UAH? easiest: icon path
        const isBank = it.icon && it.icon.includes('/banks/');
        if(isBank){
          state.give.kind='bank';
          state.give.id = it.id;
          state.give.net = null;
          toast('Віддаєте: банк (демо).');
        }else{
          state.give.kind='crypto';
          state.give.id = it.id;
          const nets = networksForCrypto(it.id);
          state.give.net = nets[0].id;
        }
        // auto-fix get side ordering rule
        if(state.get.kind==='bank' && state.give.kind==='bank'){
          state.get.kind='crypto';
          state.get.id='usdt';
          state.get.net=networksForCrypto('usdt')[0].id;
        }
        render();
      }
    });
  }

  function openGetAsset(){
    // Get: banks first, then crypto (as user requested)
    const items = [
      ...BANKS.map(b=>({ id:b.id, code:b.code, title:b.title, icon:b.icon, sub:'UAH · Card', kind:'bank' })),
      ...CRYPTO.map(c=>({ ...c, sub:c.code }))
    ];
    sheet.open('asset', tt('sheetAssetGet'), items, {
      onPick:(it)=>{
        const isBank = it.icon && it.icon.includes('/banks/');
        if(isBank){
          state.get.kind='bank';
          state.get.id = it.id;
          state.get.net = null;
        }else{
          state.get.kind='crypto';
          state.get.id = it.id;
          const nets = networksForCrypto(it.id);
          state.get.net = nets[0].id;
        }
        render();
      }
    });
  }

  function openGiveNet(){
    if(state.give.kind !== 'crypto') return;
    const c = findCrypto(state.give.id);
    const items = networksForCrypto(c.id).map(n=>({
      id:n.id, code:n.code, title:n.title, icon:n.icon, sub: n.title[state.lang] || n.title.uk
    }));
    sheet.open('network', tt('sheetNetwork'), items, { search: false, autofocus: false, onPick:(it)=>{
        state.give.net = it.id;
        render();
      }
    });
  }

  function openGetNet(){
    if(state.get.kind !== 'crypto') return;
    const c = findCrypto(state.get.id);
    const items = networksForCrypto(c.id).map(n=>({
      id:n.id, code:n.code, title:n.title, icon:n.icon, sub: n.title[state.lang] || n.title.uk
    }));
    sheet.open('network', tt('sheetNetwork'), items, { search: false, autofocus: false, onPick:(it)=>{
        state.get.net = it.id;
        render();
      }
    });
  }

  // --- Inputs ---
  $('amountInput').addEventListener('input', (e)=>{
    // keep numbers, dot and comma
    const v = e.target.value.replace(/[^0-9.,]/g,'');
    e.target.value = v;
    state.amount = v;
    // simple demo calc
    const num = parseFloat(v.replace(',', '.'));
    $('resultValue').textContent = isFinite(num) ? String(Math.max(0, Math.round(num*0.97))) : '0';
  });

  $('cardInput').addEventListener('input', (e)=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,16);
    v = v.replace(/(.{4})/g,'$1 ').trim();
    e.target.value = v;
  });

  // --- Buttons ---
  $('langBtn').addEventListener('click', openLang);

  $('giveAssetBtn').addEventListener('click', openGiveAsset);
  $('getAssetBtn').addEventListener('click', openGetAsset);
  $('giveNetBtn').addEventListener('click', openGiveNet);
  $('getNetBtn').addEventListener('click', openGetNet);

  $('swapBtn').addEventListener('click', ()=>{
    // swap only if both sides are crypto<->bank in a sensible way
    const tmp = JSON.parse(JSON.stringify(state.give));
    state.give = JSON.parse(JSON.stringify(state.get));
    state.get = tmp;
    // If bank moved to "give", ensure ordering is still OK; allowed as per user request.
    render();
    toast('Поміняли місцями');
  });

  $('createBtn').addEventListener('click', ()=>{
    // validate minimal demo
    if(!state.amount){
      toast(state.lang==='uk' ? 'Введіть суму' : 'Enter amount');
      return;
    }
    toast(state.lang==='uk' ? 'Заявку створено (демо)' : 'Request created (demo)');
  });

  // Tabs
  const tabs = Array.from(document.querySelectorAll('.tab'));
  function setTab(name){
    tabs.forEach(t=>t.classList.toggle('is-active', t.dataset.tab===name));
    // screens
    $('screenHistory').hidden = name!=='history';
    $('screenProfile').hidden = name!=='profile';
    // exchange card stays in main screen
    document.querySelector('.card').style.display = (name==='home') ? '' : 'none';
  }
  tabs.forEach(t=>t.addEventListener('click', ()=>setTab(t.dataset.tab)));
  setTab('home');

  // Profile persistence (localStorage)
  function loadProfile(){
    try{
      const raw = localStorage.getItem('keksswap_profile');
      if(!raw) return;
      const p = JSON.parse(raw);
      state.profile = { ...state.profile, ...p };
    }catch(e){}
  }
  function saveProfile(){
    state.profile.email = $('emailInput').value.trim();
    state.profile.phone = $('phoneInput').value.trim();
    localStorage.setItem('keksswap_profile', JSON.stringify(state.profile));
    toast(state.lang==='uk' ? 'Збережено' : 'Saved');
  }
  loadProfile();
  $('emailInput').value = state.profile.email || '';
  $('phoneInput').value = state.profile.phone || '';
  $('saveProfileBtn').addEventListener('click', saveProfile);

  // initial render
  render();

  // Safety: ensure sheets are closed on first paint (some WebViews may flash them)
  sheet.close();
})();

