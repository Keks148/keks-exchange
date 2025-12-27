/* KeksSwap Mini App (no frameworks) */

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const state = {
  lang: localStorage.getItem('ks_lang') || 'ua',
  accCurrency: localStorage.getItem('ks_accCurrency') || 'UAH',
  email: localStorage.getItem('ks_email') || '',
  phone: localStorage.getItem('ks_phone') || '',
  give: { asset: 'USDT', net: 'TRC20' },
  get:  { asset: 'USDC', net: 'ERC20' },
  bank: 'MONO',
};

const assets = [
  { code:'BTC', name:'Bitcoin (BTC)', icon:'logos/crypto/btc.png', nets:['BTC'] },
  { code:'ETH', name:'Ethereum (ETH)', icon:'logos/crypto/eth.png', nets:['ERC20','ARB','OP','POL','BEP20'] },
  { code:'LTC', name:'Litecoin (LTC)', icon:'logos/crypto/ltc.png', nets:['LTC'] },
  { code:'SOL', name:'Solana (SOL)', icon:'logos/crypto/sol.png', nets:['SOL'] },
  { code:'TON', name:'Toncoin (TON)', icon:'logos/crypto/ton.png', nets:['TON'] },
  { code:'TRX', name:'Tron (TRX)', icon:'logos/crypto/trx.png', nets:['TRC20'] },
  { code:'USDT', name:'Tether (USDT)', icon:'logos/crypto/tether-usdt.png', nets:['TRC20','ERC20','BEP20'] },
  { code:'USDC', name:'USD Coin (USDC)', icon:'logos/crypto/usdc.png', nets:['ERC20','ARB','OP','POL'] },
];

const networks = {
  BTC:  { code:'BTC',  name:'BTC',  sub:'BTC • BTC',  icon:'' },
  LTC:  { code:'LTC',  name:'LTC',  sub:'LTC • LTC',  icon:'' },
  SOL:  { code:'SOL',  name:'SOL',  sub:'SOL • SOL',  icon:'logos/networks/sol.png' },
  TON:  { code:'TON',  name:'TON',  sub:'TON • TON',  icon:'logos/networks/ton.png' },
  TRC20:{ code:'TRC20',name:'TRC20',sub:'USDT • TRX', icon:'logos/networks/trc20.png' },
  ERC20:{ code:'ERC20',name:'ERC20',sub:'USDC • ETH', icon:'logos/networks/erc20.png' },
  BEP20:{ code:'BEP20',name:'BEP20',sub:'BSC • BNB',  icon:'logos/networks/bep20.png' },
  ARB:  { code:'ARB',  name:'ARB',  sub:'Arbitrum',   icon:'logos/networks/arb.png' },
  OP:   { code:'OP',   name:'OP',   sub:'Optimism',   icon:'logos/networks/op.png' },
  POL:  { code:'POL',  name:'POL',  sub:'Polygon',    icon:'logos/networks/pol.png' },
};

const banks = [
  { code:'A_BANK', name:'A-Bank', icon:'logos/banks/a-bank.png' },
  { code:'IZI', name:'izibank', icon:'logos/banks/izi.png' },
  { code:'MONO', name:'Monobank', icon:'logos/banks/mono.png' },
  { code:'OSCHAD', name:'Ощадбанк', icon:'logos/banks/oschad.png' },
  { code:'OTP', name:'OTP Bank', icon:'logos/banks/otp.png' },
  { code:'PRIVAT', name:'ПриватБанк', icon:'logos/banks/privat.png' },
  { code:'PUMB', name:'ПУМБ', icon:'logos/banks/pumb.png' },
  { code:'REYF', name:'Raiffeisen', icon:'logos/banks/reyf.png' },
  { code:'SENSE', name:'Sense Bank', icon:'logos/banks/sense.png' },
  // { code:'UKRSIB', name:'UKRSIBBANK', icon:'logos/banks/ukr-sib.png' }, // если надо — раскомментируй
  { code:'VISA', name:'Visa / MasterCard', icon:'logos/banks/visa-master.png' },
];

const i18n = {
  ua:{
    tabHome:'Головна', tabHistory:'Історія', tabProfile:'Профіль',
    give:'Віддаєте', get:'Отримуєте',
    enterAmount:'Введіть суму', example:'Наприклад: 10 000',
    youGet:'Ви отримаєте', createOrder:'Створити заявку',
    history:'Історія', historyEmpty:'Тут буде історія заявок.',
    newbie:'Новичок',
    refProgram:'Реферальна програма',
    promoCodes:'Акції і промокоди',
    prefs:'ПРЕФЕРЕНЦІЇ', params:'ПАРАМЕТРИ', about:'О НАС',
    savedReq:'Збережені реквізити',
    accCurrency:'Валюта аккаунта',
    language:'Мова',
    security:'Безпека',
    devices:'Пристрої',
    officialAcc:'Офіційні акаунти',
    faq:'Часті питання',
    info:'Інформація',
    support:'Звернутися в підтримку',
    logout:'Вийти з аккаунта',
    apply:'Застосувати',
    savedHint:'Збереження реквізитів буде доступне в історії заявок.',
    goHistory:'Перейти в історію',
    cards:'Карти', wallets:'Гаманці', phones:'Телефони',
    auth:'АВТОРИЗАЦІЯ',
    add:'Додати',
    phone:'Номер телефона',
    loginApp:'ВХІД В ДОДАТОК',
    pin:'Код-пароль',
    hideBalance:'Сховати баланс',
    current:'ТЕКУЩЕЕ',
    deviceHint:'При відсутності активності 5 днів сесія буде завершена для безпеки.',
    refText:'Запросіть друзів і отримуйте бонуси.',
    link:'Посилання', qr:'QR-код',
    promoHint:'Тут будуть акції та бонуси.',
    supportHint:'Опиши проблему — ми допоможемо.',
    send:'Надіслати',
    cancel:'Скасувати', save:'Зберегти',
    payToBank:'Оплата на карту',
    chooseBank:'Оберіть банк',
    cardNumber:'Номер картки',
    cardHolder:'ПІБ отримувача',
  },
  ru:{
    tabHome:'Главная', tabHistory:'История', tabProfile:'Профиль',
    give:'Отдаёте', get:'Получаете',
    enterAmount:'Введите сумму', example:'Например: 10 000',
    youGet:'Вы получите', createOrder:'Создать заявку',
    history:'История', historyEmpty:'Здесь будет история заявок.',
    newbie:'Новичок',
    refProgram:'Реферальная программа',
    promoCodes:'Акции и промокоды',
    prefs:'ПРЕДПОЧТЕНИЯ', params:'ПАРАМЕТРЫ', about:'О НАС',
    savedReq:'Сохранённые реквизиты',
    accCurrency:'Валюта аккаунта',
    language:'Язык',
    security:'Безопасность',
    devices:'Устройства',
    officialAcc:'Официальные аккаунты',
    faq:'Часто задаваемые вопросы',
    info:'Информация',
    support:'Обратиться в поддержку',
    logout:'Выйти из аккаунта',
    apply:'Применить',
    savedHint:'Сохранение реквизитов будет доступно в истории заявок.',
    goHistory:'Перейти в историю',
    cards:'Карты', wallets:'Кошельки', phones:'Телефоны',
    auth:'АВТОРИЗАЦИЯ',
    add:'Добавить',
    phone:'Номер телефона',
    loginApp:'ВХОД В ПРИЛОЖЕНИЕ',
    pin:'Код-пароль',
    hideBalance:'Скрывать баланс',
    current:'ТЕКУЩЕЕ',
    deviceHint:'При отсутствии активности 5 дней сессия будет завершена для безопасности.',
    refText:'Пригласите друзей и получайте бонусы.',
    link:'Ссылка', qr:'QR-код',
    promoHint:'Здесь будут акции и бонусы.',
    supportHint:'Опишите проблему — мы поможем.',
    send:'Отправить',
    cancel:'Отмена', save:'Сохранить',
    payToBank:'Оплата на карту',
    chooseBank:'Выберите банк',
    cardNumber:'Номер карты',
    cardHolder:'ФИО получателя',
  }
};

/* ---------- helpers ---------- */
function t(key){
  const dict = i18n[state.lang] || i18n.ua;
  return dict[key] ?? key;
}

function applyI18n(){
  $$('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.textContent = t(k);
  });
  $('#langCode').textContent = state.lang.toUpperCase();
  $('#accCurrencyVal').textContent = state.accCurrency;
  $('#languageVal').textContent = (state.lang === 'ua') ? 'Українська' : 'Русский';
}

function formatNum(n){
  if (!isFinite(n)) return '0';
  const s = Math.floor(n*100)/100;
  return String(s).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
}

function getAsset(code){ return assets.find(a=>a.code===code) || assets[0]; }
function getNet(code){ return networks[code] || {code, name:code, sub:'', icon:''}; }
function getBank(code){ return banks.find(b=>b.code===code) || banks[2]; }

function safeImg(imgEl, src){
  imgEl.src = src;
  imgEl.onerror = ()=>{ imgEl.src = ''; };
}

/* ---------- UI render ---------- */
function renderExchange(){
  const giveA = getAsset(state.give.asset);
  const getA  = getAsset(state.get.asset);

  safeImg($('#giveAssetIcon'), giveA.icon);
  $('#giveAssetName').textContent = giveA.name;
  $('#giveAssetCode').textContent = giveA.code;
  $('#giveAssetChip').textContent = giveA.code;

  safeImg($('#getAssetIcon'), getA.icon);
  $('#getAssetName').textContent = getA.name;
  $('#getAssetCode').textContent = getA.code;

  const giveN = getNet(state.give.net);
  const getN  = getNet(state.get.net);

  safeImg($('#giveNetIcon'), giveN.icon || '');
  $('#giveNetName').textContent = giveN.name;
  $('#giveNetSub').textContent = giveN.sub || `${giveA.code} • ${giveN.code}`;

  safeImg($('#getNetIcon'), getN.icon || '');
  $('#getNetName').textContent = getN.name;
  $('#getNetSub').textContent = getN.sub || `${getA.code} • ${getN.code}`;

  // bank
  const b = getBank(state.bank);
  safeImg($('#bankIcon'), b.icon);
  $('#bankName').textContent = b.name;

  recalc();
}

function recalc(){
  const val = ($('#giveAmount').value || '').replace(/\s+/g,'').replace(',','.');
  const num = parseFloat(val);
  if (!isFinite(num) || num <= 0){
    $('#resultAmount').textContent = '0';
    return;
  }

  // простой пример курса (без “комиссии” в UI)
  // можно потом поменять на реальные расчёты
  let rate = 1.0;

  if (state.give.asset === 'USDT' && state.get.asset === 'USDC') rate = 0.985;
  else if (state.give.asset === 'USDC' && state.get.asset === 'USDT') rate = 1.012;
  else if (state.give.asset === state.get.asset) rate = 1.0;
  else rate = 0.9;

  const out = num * rate;
  $('#resultAmount').textContent = formatNum(out);
}

/* ---------- bottom sheet ---------- */
const overlay = $('#sheetOverlay');
const sheet = $('#sheet');
const sheetTitle = $('#sheetTitle');
const sheetBody = $('#sheetBody');

let sheetCtx = null; // {type:'asset'|'net'|'bank', target:'give'|'get'}

function openSheet(title, html, ctx){
  sheetCtx = ctx;
  sheetTitle.textContent = title;
  sheetBody.innerHTML = html;
  overlay.classList.remove('hidden');
  sheet.classList.remove('hidden');
  overlay.setAttribute('aria-hidden','false');
  sheet.setAttribute('aria-hidden','false');
}

function closeSheet(){
  overlay.classList.add('hidden');
  sheet.classList.add('hidden');
  overlay.setAttribute('aria-hidden','true');
  sheet.setAttribute('aria-hidden','true');
  sheetBody.innerHTML = '';
  sheetCtx = null;
}

function buildAssetList(){
  return `
    <div class="sheet-list">
      ${assets.map(a=>`
        <button class="sheet-item" type="button" data-asset="${a.code}">
          <span class="ic"><img src="${a.icon}" alt=""></span>
          <span>
            <div class="name">${a.name}</div>
            <div class="sub">${a.code}</div>
          </span>
          <span class="right">›</span>
        </button>
      `).join('')}
    </div>
  `;
}

function buildNetList(forAssetCode){
  const a = getAsset(forAssetCode);
  const list = (a.nets || []).map(n=>{
    const net = getNet(n);
    const icon = net.icon || '';
    const sub = net.sub || `${a.code} • ${n}`;
    return `
      <button class="sheet-item" type="button" data-net="${n}">
        <span class="ic">${icon ? `<img src="${icon}" alt="">` : `<div style="font-weight:900">${n}</div>`}</span>
        <span>
          <div class="name">${net.name}</div>
          <div class="sub">${sub}</div>
        </span>
        <span class="right">›</span>
      </button>
    `;
  }).join('');

  return `
    <div class="muted" style="margin:0 6px 10px">${state.lang==='ua' ? 'Показуємо тільки мережі, доступні для цієї валюти — щоб не плутати.' : 'Показываем только сети, доступные для этой валюты — чтобы не путать.'}</div>
    <div class="sheet-list">${list}</div>
  `;
}

function buildBankList(){
  return `
    <div class="sheet-list">
      ${banks.map(b=>`
        <button class="sheet-item" type="button" data-bank="${b.code}">
          <span class="ic"><img src="${b.icon}" alt=""></span>
          <span>
            <div class="name">${b.name}</div>
            <div class="sub">${b.code}</div>
          </span>
          <span class="right">›</span>
        </button>
      `).join('')}
    </div>
  `;
}

/* ---------- input modal (email/phone) ---------- */
const inputModal = $('#inputModal');
const inputTitle = $('#inputTitle');
const inputValue = $('#inputValue');

let inputCtx = null; // 'email'|'phone'

function openInput(title, placeholder, value, ctx){
  inputCtx = ctx;
  inputTitle.textContent = title;
  inputValue.placeholder = placeholder;
  inputValue.value = value || '';
  inputModal.classList.remove('hidden');
  inputModal.setAttribute('aria-hidden','false');
  setTimeout(()=>inputValue.focus(), 50);
}

function closeInput(){
  inputModal.classList.add('hidden');
  inputModal.setAttribute('aria-hidden','true');
  inputCtx = null;
}

/* ---------- tabs ---------- */
function showTab(tab){
  $$('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  $$('.screen').forEach(s=>s.classList.toggle('active', s.id === `screen-${tab}`));
}

function showProfilePage(page){
  $$('#profileRouter .profile-page').forEach(p=>{
    const key = p.getAttribute('data-page');
    const isRoot = p.id === 'profileRoot';
    if (page === 'root') p.classList.toggle('active', isRoot);
    else p.classList.toggle('active', key === page);
  });
}

/* ---------- Telegram user ---------- */
function initTelegramUser(){
  try{
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand?.();

    const u = tg.initDataUnsafe?.user;
    if (!u) return;

    const username = u.username ? '@'+u.username : (u.first_name || 'User');
    $('#tgName').textContent = username;

    // avatar
    const photo = u.photo_url;
    if (photo){
      $('#tgAvatar').src = photo;
      $('#tgAvatar').classList.remove('hidden');
      $('#avatarFallback').classList.add('hidden');
    } else {
      const initials = ((u.first_name||'K')[0] + (u.last_name||'S')[0]).toUpperCase();
      $('#avatarFallback').textContent = initials;
    }
  }catch(e){}
}

/* ---------- profile render ---------- */
function renderProfileSecurity(){
  const e = state.email;
  const p = state.phone;

  if (e){
    $('#emailRight').textContent = e;
    $('#emailRight').classList.remove('plus');
  } else {
    $('#emailRight').innerHTML = `+ <span data-i18n="add">${t('add')}</span>`;
    $('#emailRight').classList.add('plus');
  }

  if (p){
    $('#phoneRight').textContent = p;
    $('#phoneRight').classList.remove('plus');
  } else {
    $('#phoneRight').innerHTML = `+ <span data-i18n="add">${t('add')}</span>`;
    $('#phoneRight').classList.add('plus');
  }
}

/* ---------- events ---------- */
function bindEvents(){
  // language dropdown
  $('#langBtn').addEventListener('click', ()=>{
    $('#langMenu').classList.toggle('hidden');
  });
  document.addEventListener('click', (e)=>{
    if (!e.target.closest('.topbar-right')){
      $('#langMenu').classList.add('hidden');
    }
  });
  $$('.lang-item').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      state.lang = btn.dataset.lang;
      localStorage.setItem('ks_lang', state.lang);
      $('#langMenu').classList.add('hidden');
      applyI18n();
      renderExchange();
      renderProfileSecurity();
    });
  });

  // tabs
  $$('.tab').forEach(b=>{
    b.addEventListener('click', ()=> showTab(b.dataset.tab));
  });

  // exchange amount
  $('#giveAmount').addEventListener('input', recalc);

  // swap
  $('#swapBtn').addEventListener('click', ()=>{
    const tmpA = state.give.asset; state.give.asset = state.get.asset; state.get.asset = tmpA;
    const tmpN = state.give.net;   state.give.net   = state.get.net;   state.get.net   = tmpN;
    renderExchange();
  });

  // pickers
  $('#giveAssetBtn').addEventListener('click', ()=>{
    openSheet(state.lang==='ua' ? 'Виберіть валюту' : 'Выберите валюту', buildAssetList(), {type:'asset', target:'give'});
  });
  $('#getAssetBtn').addEventListener('click', ()=>{
    openSheet(state.lang==='ua' ? 'Виберіть валюту' : 'Выберите валюту', buildAssetList(), {type:'asset', target:'get'});
  });

  $('#giveNetBtn').addEventListener('click', ()=>{
    openSheet(state.lang==='ua' ? 'Оберіть мережу' : 'Выберите сеть', buildNetList(state.give.asset), {type:'net', target:'give'});
  });
  $('#getNetBtn').addEventListener('click', ()=>{
    openSheet(state.lang==='ua' ? 'Оберіть мережу' : 'Выберите сеть', buildNetList(state.get.asset), {type:'net', target:'get'});
  });

  $('#bankBtn').addEventListener('click', ()=>{
    openSheet(state.lang==='ua' ? 'Оберіть банк' : 'Выберите банк', buildBankList(), {type:'bank'});
  });

  // sheet close
  $('#sheetClose').addEventListener('click', closeSheet);
  overlay.addEventListener('click', closeSheet);

  // sheet clicks
  sheetBody.addEventListener('click', (e)=>{
    const assetBtn = e.target.closest('[data-asset]');
    const netBtn = e.target.closest('[data-net]');
    const bankBtn = e.target.closest('[data-bank]');

    if (assetBtn && sheetCtx?.type === 'asset'){
      const code = assetBtn.dataset.asset;
      if (sheetCtx.target === 'give'){
        state.give.asset = code;
        const a = getAsset(code);
        if (!a.nets.includes(state.give.net)) state.give.net = a.nets[0];
      } else {
        state.get.asset = code;
        const a = getAsset(code);
        if (!a.nets.includes(state.get.net)) state.get.net = a.nets[0];
      }
      closeSheet();
      renderExchange();
      return;
    }

    if (netBtn && sheetCtx?.type === 'net'){
      const code = netBtn.dataset.net;
      if (sheetCtx.target === 'give') state.give.net = code;
      else state.get.net = code;
      closeSheet();
      renderExchange();
      return;
    }

    if (bankBtn && sheetCtx?.type === 'bank'){
      state.bank = bankBtn.dataset.bank;
      closeSheet();
      renderExchange();
      return;
    }
  });

  // profile routing
  $('#openProfileRoot').addEventListener('click', ()=> showProfilePage('root'));

  $$('#profileRoot .item[data-route]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      showProfilePage(btn.dataset.route);
      renderProfileSecurity();
      applyI18n();
    });
  });

  $$('#profileRouter [data-back]').forEach(btn=>{
    btn.addEventListener('click', ()=> showProfilePage('root'));
  });

  // saved tabs
  $$('.chip[data-savedtab]').forEach(ch=>{
    ch.addEventListener('click', ()=>{
      $$('.chip[data-savedtab]').forEach(x=>x.classList.remove('active'));
      ch.classList.add('active');
    });
  });

  // currency pick
  $$('[data-currency]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      state.accCurrency = btn.dataset.currency;
      localStorage.setItem('ks_accCurrency', state.accCurrency);
      $('#accCurrencyVal').textContent = state.accCurrency;
      showProfilePage('root');
    });
  });

  // language pick in profile
  $$('[data-langpick]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      state.lang = btn.dataset.langpick;
      localStorage.setItem('ks_lang', state.lang);
      applyI18n();
      renderExchange();
      renderProfileSecurity();
      showProfilePage('root');
    });
  });

  // security add email/phone
  $('#emailItem').addEventListener('click', ()=>{
    openInput('Email', 'name@mail.com', state.email, 'email');
  });
  $('#phoneItem').addEventListener('click', ()=>{
    openInput(t('phone'), '+380...', state.phone, 'phone');
  });

  $('#inputCancel').addEventListener('click', closeInput);
  $('#inputModal').addEventListener('click', (e)=>{
    if (e.target === $('#inputModal')) closeInput();
  });

  $('#inputSave').addEventListener('click', ()=>{
    const v = inputValue.value.trim();
    if (inputCtx === 'email'){
      state.email = v;
      localStorage.setItem('ks_email', v);
    }
    if (inputCtx === 'phone'){
      state.phone = v;
      localStorage.setItem('ks_phone', v);
    }
    closeInput();
    renderProfileSecurity();
  });

  // order button
  $('#createOrderBtn').addEventListener('click', ()=>{
    // здесь позже сделаем создание заявки/отправку
    alert(state.lang==='ua' ? 'Заявку створено (демо).' : 'Заявка создана (демо).');
  });

  // logout
  $('#logoutBtn').addEventListener('click', ()=>{
    alert(state.lang==='ua' ? 'Вихід (демо).' : 'Выход (демо).');
  });
}

/* ---------- init ---------- */
function init(){
  // init values
  $('#langCode').textContent = state.lang.toUpperCase();
  $('#accCurrencyVal').textContent = state.accCurrency;

  applyI18n();
  initTelegramUser();

  // set bank default
  const b = getBank(state.bank);
  if (!b) state.bank = banks[0]?.code || 'MONO';

  renderExchange();
  renderProfileSecurity();
  bindEvents();
}

init();
