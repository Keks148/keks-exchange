(function(){
  'use strict';

  // ---------- Data ----------
  const ASSETS = [
    { id:'usdt', code:'USDT', name:'Tether', icon:'logos/crypto/tether-usdt.png', networks:['trc20','erc20','bep20','ton'] },
    { id:'usdc', code:'USDC', name:'USD Coin', icon:'logos/crypto/usdc.png', networks:['erc20','bep20','arb','op','pol'] },
    { id:'btc',  code:'BTC',  name:'Bitcoin', icon:'logos/crypto/btc.png', networks:['btc'] },
    { id:'eth',  code:'ETH',  name:'Ethereum', icon:'logos/crypto/eth.png', networks:['erc20','arb','op'] },
    { id:'trx',  code:'TRX',  name:'TRON', icon:'logos/crypto/trx.png', networks:['trc20'] },
    { id:'ton',  code:'TON',  name:'Toncoin', icon:'logos/crypto/ton.png', networks:['ton'] },
    { id:'sol',  code:'SOL',  name:'Solana', icon:'logos/crypto/sol.png', networks:['sol'] },
    { id:'bnb',  code:'BNB',  name:'BNB', icon:'logos/crypto/bnb.png', networks:['bep20','bsc'] },
    { id:'xrp',  code:'XRP',  name:'Ripple', icon:'logos/crypto/xrp.png', networks:['xrp'] },
    { id:'ada',  code:'ADA',  name:'Cardano', icon:'logos/crypto/cardano.png', networks:['ada'] },
    { id:'dai',  code:'DAI',  name:'DAI', icon:'logos/crypto/dai.png', networks:['erc20','arb','op','pol'] },
    { id:'doge', code:'DOGE', name:'Dogecoin', icon:'logos/crypto/dogecoin.png', networks:['doge'] },
    { id:'shib', code:'SHIB', name:'Shiba Inu', icon:'logos/crypto/shiba.png', networks:['erc20','bep20'] },
  ];

  const NETWORKS = [
    { id:'trc20', code:'TRC20', name:'TRON', sub:'USDT/USDC • TRX', icon:'logos/networks/trc20.png' },
    { id:'erc20', code:'ERC20', name:'Ethereum', sub:'USDT/USDC • ETH', icon:'logos/networks/erc20.png' },
    { id:'bep20', code:'BEP20', name:'BSC', sub:'USDT/USDC • BSC', icon:'logos/networks/bep20.png' },
    { id:'btc',   code:'BTC',   name:'Bitcoin Network', sub:'Bitcoin', icon:'logos/networks/btc.png' },
    { id:'sol',   code:'SOL',   name:'Solana', sub:'Solana', icon:'logos/networks/sol.png' },
    { id:'ton',   code:'TON',   name:'TON', sub:'Ton Network', icon:'logos/networks/ton.png' },
    { id:'arb',   code:'ARB',   name:'Arbitrum', sub:'Layer 2', icon:'logos/networks/arb.png' },
    { id:'op',    code:'OP',    name:'Optimism', sub:'Layer 2', icon:'logos/networks/op.png' },
    { id:'pol',   code:'POL',   name:'Polygon', sub:'Polygon', icon:'logos/networks/pol.png' },
    { id:'bsc',   code:'BSC',   name:'BNB Smart Chain', sub:'BSC', icon:'logos/networks/bsc.png' },
    // optional (no icons in your repo yet, will fall back to initials)
    { id:'xrp',   code:'XRP',   name:'XRP Ledger', sub:'XRP', icon:'' },
    { id:'ada',   code:'ADA',   name:'Cardano', sub:'ADA', icon:'' },
    { id:'doge',  code:'DOGE',  name:'Dogecoin', sub:'DOGE', icon:'' },
  ];

  const BANKS = [
    { id:'mono',  name:'Monobank', sub:'UAH • Card', icon:'logos/banks/mono.png' },
    { id:'privat',name:'PrivatBank', sub:'UAH • Card', icon:'logos/banks/privat.png' },
    { id:'oschad',name:'Oschadbank', sub:'UAH • Card', icon:'logos/banks/oschad.png' },
    { id:'a-bank',name:'A-Bank', sub:'UAH • Card', icon:'logos/banks/a-bank.png' },
    { id:'pumb',  name:'PUMB', sub:'UAH • Card', icon:'logos/banks/pumb.png' },
    { id:'otp',   name:'OTP Bank', sub:'UAH • Card', icon:'logos/banks/otp.png' },
    { id:'sense', name:'Sense Bank', sub:'UAH • Card', icon:'logos/banks/sense.png' },
    { id:'ukr-sib',name:'UKRSIBBANK', sub:'UAH • Card', icon:'logos/banks/ukr-sib.png' },
    { id:'revolut',name:'Revolut', sub:'EUR • SEPA', icon:'logos/banks/revf.png' }, // if missing, fallback
    { id:'izi',   name:'izibank', sub:'UAH • Card', icon:'logos/banks/izi.png' },
    { id:'visa',  name:'Visa/Mastercard', sub:'UAH • Card', icon:'logos/banks/visa-master.png' }
  ];

  const LANGS = [
    { id:'ua', label:'Українська', code:'UA', flag:'🇺🇦' },
    { id:'en', label:'English', code:'EN', flag:'🇬🇧' },
  ];

  // ---------- Elements ----------
  const $ = (s)=>document.querySelector(s);

  const pages = {
    home: $('#pageHome'),
    history: $('#pageHistory'),
    profile: $('#pageProfile')
  };

  const topTitle = $('#topTitle');

  const langBtn = $('#langBtn');
  const langFlag = $('#langFlag');
  const langCode = $('#langCode');

  const sendAssetBtn = $('#sendAssetBtn');
  const sendNetBtn = $('#sendNetBtn');
  const recvBankBtn = $('#recvBankBtn');
  const amountUnit = $('#amountUnit');

  const sendAssetIcon = $('#sendAssetIcon');
  const sendAssetMain = $('#sendAssetMain');
  const sendAssetSub = $('#sendAssetSub');

  const sendNetIcon = $('#sendNetIcon');
  const sendNetMain = $('#sendNetMain');
  const sendNetSub = $('#sendNetSub');

  const recvBankIcon = $('#recvBankIcon');
  const recvBankMain = $('#recvBankMain');
  const recvBankSub = $('#recvBankSub');

  const amountInput = $('#amountInput');
  const rateHint = $('#rateHint');

  const swapBtn = $('#swapBtn');
  const createBtn = $('#createBtn');

  const sheetBackdrop = $('#sheetBackdrop');
  const sheet = $('#sheet');
  const sheetTitle = $('#sheetTitle');
  const sheetClose = $('#sheetClose');
  const sheetList = $('#sheetList');

  const toast = $('#toast');

  // profile (telegram)
  const tgAvatar = $('#tgAvatar');
  const tgName = $('#tgName');
  const tgUser = $('#tgUser');

  const historyList = $('#historyList');
  const seedHistoryBtn = $('#seedHistoryBtn');

  // ---------- State ----------
  const state = {
    lang: 'ua',
    sendAsset: 'usdt',
    sendNetwork: 'trc20',
    recvBank: 'mono',
    sheetMode: null
  };

  // ---------- Helpers ----------
  function safeImg(imgEl, src, fallbackText){
    if(!imgEl) return;
    if(!src){
      imgEl.style.display = 'none';
      imgEl.closest('.select__iconWrap, .item__iconWrap')?.setAttribute('data-fallback', fallbackText || '');
      return;
    }
    imgEl.style.display = '';
    imgEl.onerror = () => {
      imgEl.style.display = 'none';
      imgEl.closest('.select__iconWrap, .item__iconWrap')?.setAttribute('data-fallback', fallbackText || '');
    };
    imgEl.src = src;
  }

  function getAsset(id){ return ASSETS.find(a=>a.id===id) || ASSETS[0]; }
  function getNet(id){ return NETWORKS.find(n=>n.id===id) || NETWORKS[0]; }
  function getBank(id){ return BANKS.find(b=>b.id===id) || BANKS[0]; }
  function getLang(id){ return LANGS.find(l=>l.id===id) || LANGS[0]; }

  function fmtMoneyUAH(n){
    try{
      return new Intl.NumberFormat(state.lang==='en'?'en-US':'uk-UA', { maximumFractionDigits:2 }).format(n);
    }catch(e){
      return String(n);
    }
  }

  function setNoScroll(on){
    document.body.classList.toggle('noScroll', !!on);
  }

  function showToast(text){
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>{ toast.hidden = true; }, 1800);
  }

  // ---------- Sheet ----------
  function openSheet(mode){
    state.sheetMode = mode;

    sheetTitle.textContent =
      mode==='lang' ? (state.lang==='en'?'Language':'Мова') :
      mode==='asset'? (state.lang==='en'?'Choose asset':'Оберіть валюту') :
      mode==='network'? (state.lang==='en'?'Choose network':'Оберіть мережу') :
      mode==='bank'? (state.lang==='en'?'Choose bank':'Оберіть банк') :
      (state.lang==='en'?'Choose':'Виберіть');

    renderSheetList(mode);

    sheetBackdrop.hidden = false;
    sheet.hidden = false;
    // next frame -> animate
    requestAnimationFrame(()=> sheet.classList.add('sheet--open'));
    setNoScroll(true);
  }

  function closeSheet(){
    sheet.classList.remove('sheet--open');
    setNoScroll(false);
    // wait for transition
    setTimeout(()=>{
      sheet.hidden = true;
      sheetBackdrop.hidden = true;
      sheetList.innerHTML = '';
      state.sheetMode = null;
    }, 220);
  }

  function renderSheetList(mode){
    const items = (
      mode==='lang' ? LANGS.map(l=>({ id:l.id, main:l.label, sub:l.code, icon:'', flag:l.flag })) :
      mode==='asset' ? ASSETS.map(a=>({ id:a.id, main:`${a.code}`, sub:a.name, icon:a.icon })) :
      mode==='network' ? availableNetworks().map(n=>({ id:n.id, main:n.code, sub:n.sub || n.name, icon:n.icon })) :
      mode==='bank' ? BANKS.map(b=>({ id:b.id, main:b.name, sub:b.sub, icon:b.icon })) :
      []
    );

    sheetList.innerHTML = '';
    for(const it of items){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.dataset.id = it.id;

      const iconWrap = document.createElement('div');
      iconWrap.className = 'item__iconWrap';

      if(mode==='lang'){
        iconWrap.textContent = it.flag || '🌐';
      }else{
        const img = document.createElement('img');
        img.className = 'item__icon';
        img.alt = '';
        iconWrap.appendChild(img);
        safeImg(img, it.icon, (it.main||'').slice(0,3));
      }

      const text = document.createElement('div');
      text.className = 'item__text';

      const main = document.createElement('div');
      main.className = 'item__main';
      main.textContent = it.main;

      const sub = document.createElement('div');
      sub.className = 'item__sub';
      sub.textContent = it.sub || '';

      text.appendChild(main);
      text.appendChild(sub);

      btn.appendChild(iconWrap);
      btn.appendChild(text);

      btn.addEventListener('click', ()=>{
        handlePick(mode, it.id);
        closeSheet();
      });

      sheetList.appendChild(btn);
    }
  }

  function handlePick(mode, id){
    if(mode==='lang'){
      state.lang = id;
      applyLang();
      persist();
      showToast(state.lang==='en'?'Language changed':'Мову змінено');
      return;
    }
    if(mode==='asset'){
      state.sendAsset = id;
      // ensure current network is allowed
      const allowed = getAsset(state.sendAsset).networks || [];
      if(allowed.length && !allowed.includes(state.sendNetwork)){
        state.sendNetwork = allowed[0];
      }
      applySelections();
      persist();
      return;
    }
    if(mode==='network'){
      state.sendNetwork = id;
      applySelections();
      persist();
      return;
    }
    if(mode==='bank'){
      state.recvBank = id;
      applySelections();
      persist();
      return;
    }
  }

  function availableNetworks(){
    const allowedIds = new Set(getAsset(state.sendAsset).networks || []);
    return NETWORKS.filter(n=> allowedIds.size===0 || allowedIds.has(n.id));
  }

  // ---------- UI Apply ----------
  function applySelections(){
    const a = getAsset(state.sendAsset);
    sendAssetMain.textContent = state.lang==='en' ? `${a.code}` : `${a.code}`;
    sendAssetSub.textContent = a.name;
    safeImg(sendAssetIcon, a.icon, a.code);

    const n = getNet(state.sendNetwork);
    sendNetMain.textContent = n.code;
    sendNetSub.textContent = n.sub || n.name;
    safeImg(sendNetIcon, n.icon, n.code);

    const b = getBank(state.recvBank);
    recvBankMain.textContent = b.name;
    recvBankSub.textContent = b.sub || '';
    safeImg(recvBankIcon, b.icon, b.name.slice(0,3));

    amountUnit.textContent = a.code;

    updateRateHint();
  }

  function applyLang(){
    const l = getLang(state.lang);
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'uk';
    langFlag.textContent = l.flag;
    langCode.textContent = l.code;

    // labels
    $('#homeTitle').textContent = state.lang==='en' ? 'Exchange' : 'Обмін';
    $('#homeSub').textContent = state.lang==='en' ? 'Choose assets and enter amount' : 'Виберіть валюту та введіть суму';
    $('#lblSend').textContent = state.lang==='en' ? 'You send' : 'Віддаєте';
    $('#lblNet').textContent  = state.lang==='en' ? 'Network' : 'Мережа';
    $('#lblAmount').textContent = state.lang==='en' ? 'Amount' : 'Сума';
    $('#lblReceive').textContent = state.lang==='en' ? 'You receive' : 'Отримуєте';
    $('#lblCard').textContent = state.lang==='en' ? 'Card number' : 'Номер картки';
    $('#lblName').textContent = state.lang==='en' ? 'Full name' : 'ПІБ';
    createBtn.textContent = state.lang==='en' ? 'Create request' : 'Створити заявку';
    $('#disclaimer').textContent = state.lang==='en' ? 'Demo UI (no real operations).' : 'Демо-версія інтерфейсу (без реальних операцій).';
    $('.tab[data-tab="home"] .tab__label').textContent = state.lang==='en' ? 'Home' : 'Головна';
    $('.tab[data-tab="history"] .tab__label').textContent = state.lang==='en' ? 'History' : 'Історія';
    $('.tab[data-tab="profile"] .tab__label').textContent = state.lang==='en' ? 'Profile' : 'Профіль';
    $('#pageHistory .sectionTitle').textContent = state.lang==='en' ? 'History' : 'Історія';
    $('#pageProfile .sectionTitle').textContent = state.lang==='en' ? 'Profile' : 'Профіль';
    seedHistoryBtn.textContent = state.lang==='en' ? 'Add demo history' : 'Додати демо-історію';
    $('#editProfileBtn').textContent = state.lang==='en' ? 'Edit' : 'Змінити';
    $('#saveProfileBtn').textContent = state.lang==='en' ? 'Save' : 'Зберегти';

    updateRateHint();
  }

  function updateRateHint(){
    const v = parseFloat(String(amountInput.value).replace(',','.'));
    if(!isFinite(v) || v<=0){
      rateHint.textContent = state.lang==='en'
        ? '≈ rate & fees will appear here'
        : '≈ курс та комісії буде показано тут';
      return;
    }
    // Demo: show rough UAH estimate with a fake rate.
    const fakeRate = state.sendAsset==='btc' ? 1600000 : state.sendAsset==='eth' ? 90000 : 41;
    const uah = v * fakeRate;
    rateHint.textContent = state.lang==='en'
      ? `≈ ${fmtMoneyUAH(uah)} UAH (demo)`
      : `≈ ${fmtMoneyUAH(uah)} грн (демо)`;
  }

  // ---------- Tabs ----------
  function setTab(tab){
    for(const [k,el] of Object.entries(pages)){
      el.classList.toggle('page--active', k===tab);
    }
    document.querySelectorAll('.tab').forEach(t=>{
      const on = t.dataset.tab === tab;
      t.classList.toggle('tab--active', on);
      if(on) t.setAttribute('aria-current','page'); else t.removeAttribute('aria-current');
    });

    topTitle.textContent = tab==='home' ? 'KeksSwap' :
      tab==='history' ? (state.lang==='en'?'History':'Історія') :
      (state.lang==='en'?'Profile':'Профіль');
  }

  // ---------- Telegram user ----------
  function applyTelegramUser(){
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    const user = tg && tg.initDataUnsafe ? tg.initDataUnsafe.user : null;

    if(!user){
      // fallback
      tgName.textContent = state.lang==='en' ? 'New user' : 'Новачок';
      tgUser.textContent = '@user';
      tgAvatar.textContent = 'KS';
      return;
    }

    const full = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
    tgName.textContent = full || (state.lang==='en'?'User':'Користувач');
    tgUser.textContent = user.username ? '@'+user.username : (state.lang==='en'?'Telegram':'Телеграм');

    if(user.photo_url){
      tgAvatar.textContent = '';
      tgAvatar.style.backgroundImage = `url('${user.photo_url}')`;
      tgAvatar.style.backgroundSize = 'cover';
      tgAvatar.style.backgroundPosition = 'center';
    }else{
      const initials = (full || 'KS').split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase();
      tgAvatar.textContent = initials;
    }

    // Expand in Telegram (optional)
    try{ tg.expand && tg.expand(); }catch(e){}
  }

  // ---------- History demo ----------
  function addHistoryItem(item){
    const row = document.createElement('div');
    row.className = 'item';
    row.style.cursor = 'default';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'item__iconWrap';
    iconWrap.textContent = '↔️';

    const text = document.createElement('div');
    text.className = 'item__text';

    const main = document.createElement('div');
    main.className = 'item__main';
    main.textContent = item.title;

    const sub = document.createElement('div');
    sub.className = 'item__sub';
    sub.textContent = item.sub;

    text.appendChild(main); text.appendChild(sub);
    row.appendChild(iconWrap); row.appendChild(text);

    historyList.prepend(row);
  }

  function seedHistory(){
    const now = new Date();
    const d = now.toLocaleString(state.lang==='en'?'en-US':'uk-UA', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
    addHistoryItem({
      title: `${getAsset(state.sendAsset).code} → ${getBank(state.recvBank).name}`,
      sub: `${d} • ${state.lang==='en'?'Created':'Створено'}`
    });
  }

  // ---------- Persist ----------
  function persist(){
    try{ localStorage.setItem('keksswap_state_v1', JSON.stringify(state)); }catch(e){}
  }
  function restore(){
    try{
      const raw = localStorage.getItem('keksswap_state_v1');
      if(!raw) return;
      const s = JSON.parse(raw);
      if(s && typeof s==='object'){
        if(s.lang) state.lang = s.lang;
        if(s.sendAsset) state.sendAsset = s.sendAsset;
        if(s.sendNetwork) state.sendNetwork = s.sendNetwork;
        if(s.recvBank) state.recvBank = s.recvBank;
      }
    }catch(e){}
  }

  // ---------- Events ----------
  function wire(){
    // Tabs
    document.querySelectorAll('.tab').forEach(btn=>{
      btn.addEventListener('click', ()=> setTab(btn.dataset.tab));
    });

    // Open sheets
    langBtn.addEventListener('click', ()=> openSheet('lang'));
    sendAssetBtn.addEventListener('click', ()=> openSheet('asset'));
    sendNetBtn.addEventListener('click', ()=> openSheet('network'));
    recvBankBtn.addEventListener('click', ()=> openSheet('bank'));
    amountUnit.addEventListener('click', ()=> openSheet('asset'));

    // Close sheet (always works)
    sheetClose.addEventListener('click', closeSheet);
    sheetBackdrop.addEventListener('click', closeSheet);
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape' && !sheet.hidden) closeSheet();
    });

    // Swap (demo)
    swapBtn.addEventListener('click', ()=>{
      // Simple: swap asset <-> bank doesn't make sense, so we just shake the button + toast
      swapBtn.animate([
        { transform:'translateX(0)' },
        { transform:'translateX(-4px)' },
        { transform:'translateX(4px)' },
        { transform:'translateX(0)' },
      ], { duration: 180 });
      showToast(state.lang==='en'?'Swap demo':'Swap демо');
    });

    amountInput.addEventListener('input', updateRateHint);

    createBtn.addEventListener('click', ()=>{
      const amt = parseFloat(String(amountInput.value).replace(',','.'));
      if(!isFinite(amt) || amt<=0){
        showToast(state.lang==='en'?'Enter amount':'Вкажіть суму');
        return;
      }
      seedHistory();
      showToast(state.lang==='en'?'Request created':'Заявку створено');
      setTab('history');
    });

    seedHistoryBtn.addEventListener('click', seedHistory);

    // Basic input formatting (card)
    $('#cardInput').addEventListener('input', (e)=>{
      const digits = e.target.value.replace(/\D+/g,'').slice(0,16);
      e.target.value = digits.replace(/(\d{4})(?=\d)/g,'$1 ').trim();
    });
  }

  // ---------- Init ----------
  restore();
  applyLang();
  applySelections();
  applyTelegramUser();
  wire();

  // ensure sheet is closed on startup (no auto-popup)
  sheet.hidden = true;
  sheetBackdrop.hidden = true;
  sheet.classList.remove('sheet--open');
  setNoScroll(false);
})();