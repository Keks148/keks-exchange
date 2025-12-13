(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Пути твоих ассетов
  const PATHS = {
    logo: "logos/keks-logo.png",
    banks: "logos/banks/",
    crypto: "logos/crypto/",
    wallets: "logos/wallets/",
  };

  // WhiteBIT docs (public endpoints)  2
  const WHITEBIT_TICKER_URL = "https://whitebit.com/api/v4/public/ticker";
  // NBU JSON (USD/EUR)  3
  const NBU_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

  // ====== ПАРЫ / АКТИВЫ В МЕНЮ ======
  // Банки (UAH-рельсы)
  const BANKS = [
    { id:"privat",  name:"PrivatBank",  icon: PATHS.banks+"privat.png" },
    { id:"mono",    name:"Monobank",    icon: PATHS.banks+"mono.png" },
    { id:"oschad",  name:"Oschadbank",  icon: PATHS.banks+"oschad.png" },
    { id:"pumb",    name:"PUMB",        icon: PATHS.banks+"pumb.png" },
    { id:"a-bank",  name:"A-Bank",      icon: PATHS.banks+"a-bank.png" },
    { id:"otp",     name:"OTP",         icon: PATHS.banks+"otp.png" },
    { id:"sense",   name:"Sense",       icon: PATHS.banks+"sense.png" },
    { id:"ukr-sib", name:"UkrSib",      icon: PATHS.banks+"ukr-sib.png" },
    { id:"visa",    name:"Visa/Master", icon: PATHS.banks+"visa-master.png" },
  ].map(b => ({
    type:"bank",
    value:`bank:${b.id}`,
    label:`${b.name} (UAH)`,
    icon:b.icon,
    // для банка цена в UAH всегда 1
  }));

  // Крипта (топ 7 + стейблы из твоего списка)
  // Пояснение: сети НЕ отдельный курс, это отдельная комиссия сети.
  const CRYPTO = [
    { id:"BTC", label:"Bitcoin (BTC)", icon: PATHS.crypto+"btc.png" },
    { id:"ETH", label:"Ethereum (ETH)", icon: PATHS.crypto+"eth.png" },
    { id:"USDT", label:"Tether (USDT)", icon: PATHS.crypto+"tether-usdt.png" },
    { id:"USDC", label:"USD Coin (USDC)", icon: PATHS.crypto+"usdc.png" },
    { id:"SOL", label:"Solana (SOL)", icon: PATHS.crypto+"sol.png" },
    { id:"TON", label:"TON (TON)", icon: PATHS.crypto+"ton.png" },
    { id:"TRX", label:"TRON (TRX)", icon: PATHS.crypto+"trx.png" },

    // сети USDT (иконки должны совпасть с твоими файлами)
    { id:"USDT_TRC20", label:"USDT (TRC20)", icon: PATHS.crypto+"usdt-trc.png", base:"USDT", network:"TRC20", netFeeUSDT: 1.0 },
    { id:"USDT_ERC20", label:"USDT (ERC20)", icon: PATHS.crypto+"usdt-eth.png", base:"USDT", network:"ERC20", netFeeUSDT: 7.0 },
    { id:"USDT_BEP20", label:"USDT (BEP20)", icon: PATHS.crypto+"usdt-bep.png", base:"USDT", network:"BEP20", netFeeUSDT: 0.5 },
    { id:"USDT_SOL",   label:"USDT (SOL)",   icon: PATHS.crypto+"usdt-sol.png", base:"USDT", network:"SOL",   netFeeUSDT: 0.5 },

    // сети USDC (пример)
    { id:"USDC_ERC20", label:"USDC (ERC20)", icon: PATHS.crypto+"usdc-eth.png", base:"USDC", network:"ERC20", netFeeUSDT: 7.0 },
    { id:"USDC_SOL",   label:"USDC (SOL)",   icon: PATHS.crypto+"usdc-sol.png", base:"USDC", network:"SOL",   netFeeUSDT: 0.5 },
  ].map(c => ({
    type:"crypto",
    value:`crypto:${c.id}`,
    label:c.label,
    icon:c.icon,
    coinId: c.id,
    baseCoin: c.base || c.id,        // если это “сеть”, курс берём от baseCoin
    network: c.network || null,
    netFeeUSDT: Number.isFinite(c.netFeeUSDT) ? c.netFeeUSDT : 0,
  }));

  // Кошельки (Valet удалён)
  // PayPal/Payoneer = USD, Revolut/Wise = EUR
  const WALLETS = [
    { id:"paypal",   label:"PayPal (USD)",   icon: PATHS.wallets+"paypal.png", fiat:"USD" },
    { id:"payoneer", label:"Payoneer (USD)", icon: PATHS.wallets+"payoneer.png", fiat:"USD" },
    { id:"revolut",  label:"Revolut (EUR)",  icon: PATHS.wallets+"revolut.png", fiat:"EUR" },
    { id:"wise",     label:"Wise (EUR)",     icon: PATHS.wallets+"wise.png", fiat:"EUR" },
  ].map(w => ({
    type:"wallet",
    value:`wallet:${w.id}`,
    label:w.label,
    icon:w.icon,
    fiat:w.fiat
  }));

  const OPTIONS = [
    ...BANKS,
    ...CRYPTO,
    ...WALLETS,
  ];

  const GROUPS = [
    { name:"Банки UAH", types:["bank"] },
    { name:"Crypto", types:["crypto"] },
    { name:"Wallets", types:["wallet"] },
  ];

  const I18N = {
    UA: {
      swap:"Обмін", rules:"Правила", faq:"FAQ", acc:"Акаунт",
      youGive:"Віддаєте", youGet:"Отримуєте",
      amount:"Сума", result:"Ви отримаєте",
      create:"Створити заявку", paid:"Я оплатив", newReq:"Створити нову заявку",
      rate:"Курс", updated:"Оновлено", locked:"Курс зафіксовано на 3 хвилини",
      waitPay:"Очікуємо оплату", payReceived:"Платіж отримано", processing:"В обробці", done:"Завершено",
      netFee:"Комісія мережі",
      noRate:"Курс недоступний — перевіряємо джерела"
    },
    EN: {
      swap:"Exchange", rules:"Rules", faq:"FAQ", acc:"Account",
      youGive:"You give", youGet:"You get",
      amount:"Amount", result:"You receive",
      create:"Create request", paid:"I paid", newReq:"New request",
      rate:"Rate", updated:"Updated", locked:"Rate locked for 3 minutes",
      waitPay:"Waiting for payment", payReceived:"Payment received", processing:"Processing", done:"Completed",
      netFee:"Network fee",
      noRate:"Rate unavailable — checking sources"
    },
    PL: {
      swap:"Wymiana", rules:"Zasady", faq:"FAQ", acc:"Konto",
      youGive:"Oddajesz", youGet:"Otrzymujesz",
      amount:"Kwota", result:"Otrzymasz",
      create:"Utwórz zlecenie", paid:"Zapłaciłem", newReq:"Nowe zlecenie",
      rate:"Kurs", updated:"Aktualizacja", locked:"Kurs zablokowany na 3 minuty",
      waitPay:"Czekamy na płatność", payReceived:"Płatność otrzymana", processing:"W trakcie", done:"Zakończono",
      netFee:"Opłata sieci",
      noRate:"Brak kursu — sprawdzamy źródła"
    }
  };

  const state = {
    lang: "UA",
    tab: "swap",

    give: "bank:mono",
    get: "crypto:USDT_TRC20",
    giveAmount: 1000,

    // данные курсов
    whitebit: {
      ts: 0,
      map: new Map(), // market -> {bid,ask,last,mid}
    },
    nbu: {
      ts: 0,
      rates: { USD: null, EUR: null } // UAH per 1 unit
    },

    // фиксация
    lock: {
      active:false,
      until:0,
      lockedRateUAHPerUSDT: null, // фиксируем именно USDT/UAH (ключевой мост)
      lockedValuesUAH: new Map(), // valueUAH для базовых монет на момент фиксации (чтобы не прыгало)
    },

    // заявка (простая локальная модель)
    order: null, // {id,status,createdAt}
  };

  function nowMs(){ return Date.now(); }

  function safeImg(src){
    // если иконка не загрузилась — просто скрыть
    return `<img src="./${src}" alt="" onerror="this.style.display='none'">`;
  }

  function buildSelect(value){
    let html = `<select id="assetSelect">`;
    for (const g of GROUPS) {
      html += `<option disabled>— ${g.name} —</option>`;
      const items = OPTIONS.filter(o => g.types.includes(o.type));
      for (const o of items) {
        const sel = o.value === value ? "selected" : "";
        html += `<option value="${o.value}" ${sel}>${o.label}</option>`;
      }
    }
    html += `</select>`;
    return html;
  }

  function optionByValue(v){
    return OPTIONS.find(x => x.value === v) || OPTIONS[0];
  }

  // ====== FETCH / PARSE RATES ======

  async function fetchWhitebitTicker(){
    const r = await fetch(WHITEBIT_TICKER_URL, { cache:"no-store" });
    const data = await r.json();

    // v4 ticker: объект по рынкам (или массив) — обрабатываем оба варианта
    const map = new Map();

    const handleOne = (market, obj) => {
      const bid = num(obj.bid ?? obj.best_bid ?? obj.highestBid ?? obj.highest_bid);
      const ask = num(obj.ask ?? obj.best_ask ?? obj.lowestAsk ?? obj.lowest_ask);
      const last = num(obj.last_price ?? obj.last ?? obj.price);
      const mid = (isFinite(bid) && isFinite(ask) && bid>0 && ask>0) ? (bid+ask)/2 : (isFinite(last) ? last : NaN);
      map.set(market, { bid, ask, last, mid });
    };

    if (Array.isArray(data)) {
      // иногда бывает массив объектов с полем market
      for (const row of data) {
        const m = row.market || row.symbol || row.pair;
        if (m) handleOne(m, row);
      }
    } else {
      // чаще: объект ключ=market
      for (const [market, obj] of Object.entries(data)) {
        if (obj && typeof obj === "object") handleOne(market, obj);
      }
    }

    state.whitebit.map = map;
    state.whitebit.ts = nowMs();
  }

  async function fetchNbu(){
    const r = await fetch(NBU_URL, { cache:"no-store" });
    const arr = await r.json();
    // find USD/EUR rates
    const usd = arr.find(x => x.cc === "USD");
    const eur = arr.find(x => x.cc === "EUR");
    state.nbu.rates.USD = usd ? num(usd.rate) : null;
    state.nbu.rates.EUR = eur ? num(eur.rate) : null;
    state.nbu.ts = nowMs();
  }

  function num(v){
    const n = Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }

  // ====== VALUE IN UAH ======

  function getMid(market){
    const row = state.whitebit.map.get(market);
    return row ? row.mid : NaN;
  }

  function valueUAH_baseCoin(baseCoin){
    // если есть lock — используем зафиксированные значения
    if (state.lock.active && state.lock.lockedValuesUAH.has(baseCoin)) {
      return state.lock.lockedValuesUAH.get(baseCoin);
    }

    // 1) если baseCoin = UAH (для банков)
    if (baseCoin === "UAH") return 1;

    // 2) если baseCoin = USD / EUR (кошельки)
    if (baseCoin === "USD") return state.nbu.rates.USD ?? NaN;
    if (baseCoin === "EUR") return state.nbu.rates.EUR ?? NaN;

    // 3) крипта: ищем прямую пару COIN_UAH, иначе COIN_USDT * USDT_UAH
    const mUAH = `${baseCoin}_UAH`;
    const direct = getMid(mUAH);
    if (Number.isFinite(direct) && direct > 0) return direct;

    const mUSDT = `${baseCoin}_USDT`;
    const coinUsdt = getMid(mUSDT);

    const usdtUah = valueUAH_baseCoin("USDT"); // рекурсивно, но у USDT будет direct через USDT_UAH
    // USDT/UAH напрямую
    if (baseCoin === "USDT") {
      const directUsdt = getMid("USDT_UAH");
      return Number.isFinite(directUsdt) ? directUsdt : NaN;
    }

    if (Number.isFinite(coinUsdt) && Number.isFinite(usdtUah) && coinUsdt > 0 && usdtUah > 0) {
      return coinUsdt * usdtUah;
    }

    return NaN;
  }

  function valueUAH(assetValue){
    const opt = optionByValue(assetValue);
    if (opt.type === "bank") return 1;
    if (opt.type === "wallet") return valueUAH_baseCoin(opt.fiat);
    if (opt.type === "crypto") return valueUAH_baseCoin(opt.baseCoin);
    return NaN;
  }

  // ====== MARGIN / ROUNDING (простая версия сейчас, без волатильности) ======
  // Плавающую маржу добавим следующим шагом — но курс уже будет работать на всех парах.

  function isLargeUAH(giveValue, giveAmount){
    // крупная сумма >= 29000 грн по входу
    const vU = valueUAH(giveValue);
    if (!Number.isFinite(vU) || vU <= 0) return false;
    const uah = giveAmount * vU;
    return uah >= 29000;
  }

  function applyRounding(getValue, amount){
    const opt = optionByValue(getValue);
    if (opt.type === "bank" || opt.type === "wallet") {
      // UAH показываем целыми вниз
      return Math.floor(amount);
    }
    // crypto: 2 знака вниз
    return Math.floor(amount * 100) / 100;
  }

  function formatAmount(getValue, amount){
    const opt = optionByValue(getValue);
    if (opt.type === "bank" || opt.type === "wallet") {
      return `${amount.toLocaleString(state.lang==="EN" ? "en-US" : "uk-UA")} UAH`;
    }
    return `${amount.toFixed(2)} ${opt.label.match(/\(([^)]+)\)/)?.[1] || ""}`.trim();
  }

  function compute(){
    const giveV = valueUAH(state.give);
    const getV  = valueUAH(state.get);

    if (!Number.isFinite(giveV) || !Number.isFinite(getV) || giveV<=0 || getV<=0) {
      return { ok:false, getAmount:0, note:"noRate" };
    }

    const rawGet = state.giveAmount * (giveV / getV);

    // сетевые комиссии: если получаем crypto-сеть — вычесть из результата в USDT эквивалент,
    // но в текущей версии: если asset имеет netFeeUSDT — вычтем fee в том же активе,
    // только когда базовая монета USDT/USDC (для остальных позже можно расширить).
    const getOpt = optionByValue(state.get);
    let adjusted = rawGet;

    if (getOpt.type === "crypto" && getOpt.netFeeUSDT > 0) {
      // если актив сам USDT-сеть — вычитаем напрямую
      if (getOpt.baseCoin === "USDT") adjusted = Math.max(0, rawGet - getOpt.netFeeUSDT);
      // если USDC-сеть — вычтем как USDT-эквивалент 1:1 для простоты (на старте ок)
      if (getOpt.baseCoin === "USDC") adjusted = Math.max(0, rawGet - getOpt.netFeeUSDT);
    }

    const rounded = applyRounding(state.get, adjusted);

    // курс-строка: показываем 1 USDT ≈ X UAH (мост), если доступно
    const usdtUah = valueUAH_baseCoin("USDT");
    const rateLine = Number.isFinite(usdtUah) ? `1 USDT ≈ ${Math.floor(usdtUah*100)/100} UAH` : null;

    return { ok:true, getAmount: rounded, rateLine, netFeeUSDT: getOpt.netFeeUSDT || 0 };
  }

  // ====== LOCK RATE ======
  function activateLock(){
    const until = nowMs() + 3*60*1000;
    state.lock.active = true;
    state.lock.until = until;

    // фиксируем мост USDT/UAH + значения базовых монет, чтобы всё не прыгало
    const usdtUah = valueUAH_baseCoin("USDT");
    state.lock.lockedRateUAHPerUSDT = Number.isFinite(usdtUah) ? usdtUah : null;

    state.lock.lockedValuesUAH = new Map();
    // фиксируем основные базовые монеты, которые используются в меню
    const baseSet = new Set();
    for (const o of OPTIONS) {
      if (o.type === "crypto") baseSet.add(o.baseCoin);
      if (o.type === "wallet") baseSet.add(o.fiat);
    }
    baseSet.add("USDT");
    baseSet.add("USD");
    baseSet.add("EUR");
    baseSet.add("UAH");

    for (const b of baseSet) {
      const v = valueUAH_baseCoin(b);
      if (Number.isFinite(v) && v>0) state.lock.lockedValuesUAH.set(b, v);
    }
  }

  function tickLock(){
    if (!state.lock.active) return;
    if (nowMs() >= state.lock.until) {
      state.lock.active = false;
      state.lock.until = 0;
      state.lock.lockedRateUAHPerUSDT = null;
      state.lock.lockedValuesUAH.clear();
    }
  }

  function lockLeftSec(){
    if (!state.lock.active) return 0;
    return Math.max(0, Math.floor((state.lock.until - nowMs())/1000));
  }

  // ====== UI ======
  function render(){
    const t = I18N[state.lang];

    const app = $("#app");
    app.innerHTML = `
      <div class="header">
        <div class="headerTop">
          <div class="brand">
            <img class="brandLogo" src="./${PATHS.logo}" alt="KeksSwap">
          </div>
          <select class="langSelect" id="lang">
            <option value="UA">UA</option>
            <option value="EN">EN</option>
            <option value="PL">PL</option>
          </select>
        </div>

        <div class="tabs">
          <button class="tab ${state.tab==="swap"?"active":""}" data-tab="swap">${t.swap}</button>
          <button class="tab ${state.tab==="rules"?"active":""}" data-tab="rules">${t.rules}</button>
          <button class="tab ${state.tab==="faq"?"active":""}" data-tab="faq">${t.faq}</button>
          <button class="tab ${state.tab==="acc"?"active":""}" data-tab="acc">${t.acc}</button>
        </div>
      </div>

      <div class="card" id="screen"></div>
    `;

    $("#lang").value = state.lang;

    $$(".tab").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        state.tab = btn.dataset.tab;
        renderScreen();
        $$(".tab").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    $("#lang").addEventListener("change",(e)=>{
      state.lang = e.target.value;
      render(); // перерисуем всё
    });

    renderScreen();

    try{
      if (window.Telegram?.WebApp) Telegram.WebApp.expand();
    }catch(_){}
  }

  function renderScreen(){
    const t = I18N[state.lang];
    const screen = $("#screen");
    if (!screen) return;

    tickLock();

    if (state.tab !== "swap") {
      if (state.tab === "rules") {
        screen.innerHTML = `<div style="font-weight:1000;font-size:26px;margin:2px 0 10px;">${t.rules}</div>
          <div style="color:var(--muted);font-weight:800;line-height:1.4;">(заглушка) Правила обміну додамо на наступному етапі.</div>`;
        return;
      }
      if (state.tab === "faq") {
        screen.innerHTML = `<div style="font-weight:1000;font-size:26px;margin:2px 0 10px;">${t.faq}</div>
          <div style="color:var(--muted);font-weight:800;line-height:1.4;">(заглушка) FAQ додамо на наступному етапі.</div>`;
        return;
      }
      if (state.tab === "acc") {
        screen.innerHTML = `<div style="font-weight:1000;font-size:26px;margin:2px 0 10px;">${t.acc}</div>
          <div style="color:var(--muted);font-weight:800;line-height:1.4;margin-bottom:10px;">
            (заглушка) Вхід/реєстрація та KYC — наступний етап.
          </div>
          <div class="row">
            <button class="primary" style="flex:1;height:42px;">Login</button>
            <button class="smallBtn" style="flex:1;height:42px;">Register</button>
          </div>`;
        return;
      }
    }

    const giveOpt = optionByValue(state.give);
    const getOpt  = optionByValue(state.get);

    const calc = compute();

    const lockedLine = state.lock.active
      ? `<div class="meta"><b>${t.locked}</b> · ${lockLeftSec()}s</div>`
      : "";

    const rateLine = calc.rateLine
      ? `<div class="meta">${t.rate}: ${calc.rateLine} · ${t.updated}: ${fmtTime()}</div>`
      : `<div class="meta">${t.noRate}</div>`;

    const netFeeLine = (getOpt.type==="crypto" && getOpt.netFeeUSDT>0)
      ? `<div class="meta">${t.netFee}: ${getOpt.netFeeUSDT} USDT</div>`
      : "";

    const resultText = calc.ok ? formatAmount(state.get, calc.getAmount) : "—";

    screen.innerHTML = `
      ${lockedLine}

      <div class="sectionTitle">${t.youGive}</div>
      <div class="row">
        <div class="picker">
          <div class="icon">${safeImg(giveOpt.icon)}</div>
          ${buildSelect(state.give)}
        </div>
      </div>
      <input class="amount" id="giveAmount" inputmode="decimal" value="${String(state.giveAmount)}" />

      <div class="swapWrap">
        <button class="swapBtn" id="swapBtn" aria-label="swap"><span>⇆</span></button>
      </div>

      <div class="sectionTitle">${t.youGet}</div>
      <div class="row">
        <div class="picker">
          <div class="icon">${safeImg(getOpt.icon)}</div>
          ${buildSelect(state.get).replace('id="assetSelect"', 'id="assetSelectGet"')}
        </div>
      </div>

      <div class="bigResult">
        <div class="label">${t.result}</div>
        <div class="value">${resultText}</div>
      </div>

      ${rateLine}
      ${netFeeLine}

      <button class="primary" id="createBtn">${t.create}</button>

      <div class="hr"></div>
      ${renderOrderBlock()}
    `;

    // events
    $("#assetSelect").addEventListener("change", (e)=>{
      state.give = e.target.value;
      renderScreen();
    });

    $("#assetSelectGet").addEventListener("change", (e)=>{
      state.get = e.target.value;
      renderScreen();
    });

    $("#swapBtn").addEventListener("click", ()=>{
      const tmp = state.give;
      state.give = state.get;
      state.get = tmp;
      renderScreen();
    });

    $("#giveAmount").addEventListener("input",(e)=>{
      const v = String(e.target.value).replace(",", ".");
      const n = Number(v);
      state.giveAmount = Number.isFinite(n) ? n : 0;
      // не рендерим весь экран на каждый ввод сильно — только обновим результат блоком
      renderScreen();
    });

    $("#createBtn").addEventListener("click", ()=>{
      // фиксируем курс на 3 минуты
      activateLock();
      // создаём заявку локально
      state.order = {
        id: Math.random().toString(36).slice(2,8).toUpperCase(),
        status: "WAIT_PAY",
        createdAt: nowMs(),
      };
      renderScreen();
    });

    const paidBtn = $("#paidBtn");
    if (paidBtn) {
      paidBtn.addEventListener("click", ()=>{
        if (!state.order) return;
        state.order.status = "PAID";
        renderScreen();
        // имитация обработки
        setTimeout(()=>{
          if (!state.order) return;
          state.order.status = "PROC";
          renderScreen();
          setTimeout(()=>{
            if (!state.order) return;
            state.order.status = "DONE";
            renderScreen();
          }, 2500);
        }, 800);
      });
    }

    const newBtn = $("#newBtn");
    if (newBtn) {
      newBtn.addEventListener("click", ()=>{
        state.order = null;
        state.lock.active = false;
        renderScreen();
      });
    }
  }

  function renderOrderBlock(){
    const t = I18N[state.lang];
    if (!state.order) {
      return `<div class="meta">${t.updated}: ${fmtTime()}</div>`;
    }
    const st = state.order.status;
    let title = "";
    let body = "";
    if (st === "WAIT_PAY") {
      title = t.waitPay;
      body = `<button class="primary" id="paidBtn">${t.paid}</button>`;
    } else if (st === "PAID") {
      title = t.payReceived;
      body = `<div class="meta">OK</div>`;
    } else if (st === "PROC") {
      title = t.processing;
      body = `<div class="meta">~ 1–10 min</div>`;
    } else if (st === "DONE") {
      title = t.done;
      body = `<button class="primary" id="newBtn">${t.newReq}</button>`;
    }
    return `
      <div style="font-weight:1000;font-size:16px;margin:2px 2px 6px;">
        #${state.order.id} · ${title}
      </div>
      ${body}
    `;
  }

  function fmtTime(){
    const d = new Date();
    return d.toLocaleTimeString(state.lang==="EN" ? "en-US" : "uk-UA", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  }

  // ====== MAIN LOOP ======
  async function refreshRates(){
    try { await Promise.all([fetchWhitebitTicker(), fetchNbu()]); }
    catch (e) { /* тихо */ }
    // если в swap — обновим экран
    if (state.tab === "swap") renderScreen();
  }

  function start(){
    render();
    refreshRates();
    setInterval(refreshRates, 30_000); // каждые 30 сек
  }

  document.addEventListener("DOMContentLoaded", start);
})();
