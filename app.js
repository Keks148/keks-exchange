(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    try { tg.ready(); tg.expand(); } catch {}
  }

  // safe areas (Telegram + iPhone safe area)
  const safeTop = (tg?.safeAreaInset?.top ?? 0);
  const safeBottom = (tg?.safeAreaInset?.bottom ?? 0);

  document.documentElement.style.setProperty("--safeTop", `${Math.max(12, safeTop)}px`);
  document.documentElement.style.setProperty("--safeBottom", `${Math.max(12, safeBottom)}px`);

  // ---------- CONFIG: пути к лого ----------
  const PATHS = {
    brand: "./logo.png",                // логотип приложения
    banks: "./logos/banks/",
    crypto: "./logos/crypto/",
    wallets: "./logos/wallets/",
  };

  // ---------- ДАННЫЕ: группы и элементы ----------
  // ВАЖНО: имена файлов должны совпадать с теми, что на GitHub (лучше lowercase).
  const GROUPS = [
    {
      id: "usdt",
      title: { ua: "Tether USDT", en: "Tether USDT", pl: "Tether USDT" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${PATHS.crypto}tether-usdt.png`,
      items: [
        { id:"usdt-trc", name:"Tether (TRC20)", sub:"USDT", icon:`${PATHS.crypto}usdt-trc.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdt-eth", name:"Tether (ERC20)", sub:"USDT", icon:`${PATHS.crypto}usdt-eth.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdt-bep", name:"Tether (BEP20)", sub:"USDT", icon:`${PATHS.crypto}usdt-bep.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdt-arb", name:"Tether (ARB)", sub:"USDT", icon:`${PATHS.crypto}usdt-arb.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdt-pol", name:"Tether (POL)", sub:"USDT", icon:`${PATHS.crypto}usdt-pol.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdt-sol", name:"Tether (SOL)", sub:"USDT", icon:`${PATHS.crypto}usdt-sol.png`, rateUAH: 41.0, min:10, max:100000 },
      ],
    },
    {
      id: "usdc",
      title: { ua: "USD Coin", en: "USD Coin", pl: "USD Coin" },
      subtitle: { ua: "Мережі", en: "Networks", pl: "Sieci" },
      icon: `${PATHS.crypto}usdc-eth.png`,
      items: [
        { id:"usdc-eth", name:"USD Coin (ERC20)", sub:"USDC", icon:`${PATHS.crypto}usdc-eth.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdc-pol", name:"USD Coin (POL)", sub:"USDC", icon:`${PATHS.crypto}usdc-pol.png`, rateUAH: 41.0, min:10, max:100000 },
        { id:"usdc-sol", name:"USD Coin (SOL)", sub:"USDC", icon:`${PATHS.crypto}usdc-sol.png`, rateUAH: 41.0, min:10, max:100000 },
      ],
    },
    {
      id: "crypto",
      title: { ua: "Криптовалюти", en: "Cryptocurrencies", pl: "Kryptowaluty" },
      subtitle: { ua: "Топ монети", en: "Top coins", pl: "Top monety" },
      // ты просил: "Лого криптовалюты заменить на cripto" (у тебя есть crypto.png)
      icon: `${PATHS.crypto}crypto.png`,
      items: [
        { id:"btc", name:"Bitcoin", sub:"BTC", icon:`${PATHS.crypto}btc.png`, rateUAH: 1500000, min:0.0001, max:10 },
        { id:"eth", name:"Ethereum", sub:"ETH", icon:`${PATHS.crypto}eth.png`, rateUAH: 170000, min:0.001, max:200 },
        { id:"sol", name:"Solana", sub:"SOL", icon:`${PATHS.crypto}sol.png`, rateUAH: 7000, min:0.1, max:5000 },
        { id:"trx", name:"Tron", sub:"TRX", icon:`${PATHS.crypto}trx.png`, rateUAH: 5.0, min:10, max:500000 },
        { id:"ton", name:"TON", sub:"TON", icon:`${PATHS.crypto}ton.png`, rateUAH: 250, min:1, max:100000 },
        { id:"ltc", name:"Litecoin", sub:"LTC", icon:`${PATHS.crypto}ltc.png`, rateUAH: 4000, min:0.01, max:10000 },
      ],
    },
    {
      id: "banks_uah",
      title: { ua: "Банки - UAH", en: "Banks - UAH", pl: "Banki - UAH" },
      subtitle: { ua: "Україна", en: "Ukraine", pl: "Ukraina" },
      icon: `${PATHS.banks}ukr-banki.png`,
      items: [
        { id:"mono_uah", name:"Monobank", sub:"UAH", icon:`${PATHS.banks}mono.png`, rateUAH: 1, min:100, max:200000 },
        { id:"privat_uah", name:"Privat24", sub:"UAH", icon:`${PATHS.banks}privat.png`, rateUAH: 1, min:100, max:200000 },
        { id:"pumb_uah", name:"PUMB", sub:"UAH", icon:`${PATHS.banks}pumb.png`, rateUAH: 1, min:100, max:200000 },
        { id:"a_bank_uah", name:"A-Банк", sub:"UAH", icon:`${PATHS.banks}a-bank.png`, rateUAH: 1, min:100, max:200000 },
        { id:"oschad_uah", name:"Oschadbank", sub:"UAH", icon:`${PATHS.banks}oschad.png`, rateUAH: 1, min:100, max:200000 },
        { id:"otp_uah", name:"OTP Bank", sub:"UAH", icon:`${PATHS.banks}otp.png`, rateUAH: 1, min:100, max:200000 },
        { id:"sense_uah", name:"Sense Bank", sub:"UAH", icon:`${PATHS.banks}sense.png`, rateUAH: 1, min:100, max:200000 },
        { id:"izi_uah", name:"iZiBank", sub:"UAH", icon:`${PATHS.banks}izi.png`, rateUAH: 1, min:100, max:200000 },
        { id:"visa_mc_uah", name:"Visa/MasterCard", sub:"UAH", icon:`${PATHS.banks}visa-master.png`, rateUAH: 1, min:100, max:200000 },
      ],
    },
    {
      id: "wallets",
      title: { ua: "Електронні гаманці", en: "E-wallets", pl: "Portfele elektr." },
      subtitle: { ua: "USD/EUR", en: "USD/EUR", pl: "USD/EUR" },
      icon: `${PATHS.wallets}valet.png`,
      items: [
        { id:"paypal_usd", name:"PayPal", sub:"USD", icon:`${PATHS.wallets}paypal.png`, rateUAH: 41.0, min:10, max:3000 },
        { id:"payoneer_usd", name:"Payoneer", sub:"USD", icon:`${PATHS.wallets}payoneer.png`, rateUAH: 41.0, min:10, max:3000 },
        { id:"revolut_usd", name:"Revolut", sub:"USD", icon:`${PATHS.wallets}revolut.png`, rateUAH: 41.0, min:10, max:3000 },
        { id:"wise_usd", name:"Wise", sub:"USD", icon:`${PATHS.wallets}vise.png`, rateUAH: 41.0, min:10, max:3000 },
      ],
    },
  ];

  const FLAT = GROUPS.flatMap(g => g.items.map(it => ({...it, groupId: g.id })));

  // ---------- i18n ----------
  const I18N = {
    ua: {
      exchange: "Обмін",
      menu: "Меню",
      rules: "Правила обміну",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Контакти",
      account: "Акаунт",
      give: "Віддаєте",
      get: "Отримуєте",
      search: "Пошук...",
      cont: "Продовжити",
      rate: "Курс",
      fee: "Комісія сервісу",
      payout: "До виплати",
      kycTitle: "Перевірка KYC",
      kycStatus: "Статус",
      kycNone: "Не пройдена",
      kycPending: "В процесі",
      kycOk: "Пройдена",
      startKyc: "Почати KYC (поки демо)",
      save: "Зберегти",
      hello: "Профіль",
      tgUser: "Telegram користувач",
      note: "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
    },
    en: {
      exchange: "Exchange",
      menu: "Menu",
      rules: "Exchange rules",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Contacts",
      account: "Account",
      give: "You send",
      get: "You receive",
      search: "Search...",
      cont: "Continue",
      rate: "Rate",
      fee: "Service fee",
      payout: "Payout",
      kycTitle: "KYC verification",
      kycStatus: "Status",
      kycNone: "Not verified",
      kycPending: "In progress",
      kycOk: "Verified",
      startKyc: "Start KYC (demo)",
      save: "Save",
      hello: "Profile",
      tgUser: "Telegram user",
      note: "Requests created after 22:00 are processed from 08:00 (UTC+2).",
    },
    pl: {
      exchange: "Wymiana",
      menu: "Menu",
      rules: "Zasady wymiany",
      aml: "AML & KYC",
      faq: "FAQ",
      contacts: "Kontakt",
      account: "Konto",
      give: "Oddajesz",
      get: "Otrzymujesz",
      search: "Szukaj...",
      cont: "Dalej",
      rate: "Kurs",
      fee: "Prowizja",
      payout: "Do wypłaty",
      kycTitle: "Weryfikacja KYC",
      kycStatus: "Status",
      kycNone: "Niezweryfikowany",
      kycPending: "W trakcie",
      kycOk: "Zweryfikowany",
      startKyc: "Start KYC (demo)",
      save: "Zapisz",
      hello: "Profil",
      tgUser: "Użytkownik Telegram",
      note: "Zlecenia po 22:00 są realizowane od 08:00 (UTC+2).",
    },
  };

  // ---------- STATE ----------
  const state = {
    lang: localStorage.getItem("ks_lang") || "ua",
    page: "exchange", // exchange | rules | aml | faq | contacts | account
    fee: 2.5,
    from: FLAT.find(x => x.id === "mono_uah") || FLAT[0],
    to: FLAT.find(x => x.id === "btc") || FLAT[0],
    fromAmount: "1000",
    modal: { open:false, mode:"from", q:"", openGroups: new Set(["usdt","usdc","crypto","banks_uah","wallets"]) },
    user: loadUser(),
  };

  function loadUser(){
    const raw = localStorage.getItem("ks_user");
    const saved = raw ? JSON.parse(raw) : {};
    const tgUser = tg?.initDataUnsafe?.user;
    return {
      tg_id: tgUser?.id || saved.tg_id || null,
      tg_name: tgUser?.username ? `@${tgUser.username}` : (tgUser?.first_name || saved.tg_name || "Guest"),
      kyc: saved.kyc || "none", // none | pending | ok
    };
  }
  function saveUser(){
    localStorage.setItem("ks_user", JSON.stringify(state.user));
  }

  // ---------- HELPERS ----------
  const $ = (sel, el=document) => el.querySelector(sel);
  const fmt = (n, d=8) => {
    if (!isFinite(n)) return "0";
    const s = Number(n).toFixed(d);
    // trim zeros
    return s.replace(/(\.\d*?[1-9])0+$/,"$1").replace(/\.0+$/,"");
  };

  function t(key){
    return I18N[state.lang]?.[key] ?? I18N.ua[key] ?? key;
  }

  function isUAH(item){
    return item.sub === "UAH";
  }

  // Конвертация:
  // - UAH -> coin: amountUAH / rateUAH
  // - coin -> UAH: amountCoin * rateUAH
  function convert(amountStr, from, to){
    const a = Number(String(amountStr).replace(",", "."));
    if (!isFinite(a) || a <= 0) return 0;

    // в UAH
    let uah;
    if (isUAH(from)) uah = a;
    else uah = a * (from.rateUAH || 0);

    // комиссия с UAH-эквивалента
    const uahAfterFee = uah * (1 - state.fee/100);

    // в target
    let out;
    if (isUAH(to)) out = uahAfterFee;
    else out = uahAfterFee / (to.rateUAH || 1);

    return out;
  }

  // ---------- RENDER (один раз каркас, дальше обновляем текст без перерисовки инпутов) ----------
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="wrap">
      <div class="header">
        <div class="topbar">
          <div class="brandWide" id="brandWide" title="KeksSwap">
  <svg id="brandSvg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 240"
    preserveAspectRatio="xMidYMid meet"
    style="display:block; width:100%; height:64px; background:transparent; cursor:pointer;"
  >
    <g class="ks-wrap">
      <text x="40" y="165"
            font-size="160"
            font-weight="700"
            fill="#0B0B0B"
            font-family="Georgia, serif"
            letter-spacing="2">KeksSwap</text>

      <g class="ks-cupcake">
        <g transform="translate(880,20) scale(1.1)">
          <path d="M100 40 C130 10, 200 10, 220 40 C260 45, 270 90, 240 110
                   C230 130, 200 140, 170 135 C140 145, 100 140, 80 120
                   C40 110, 40 70, 70 50 Z"
                fill="none" stroke="#0B0B0B" stroke-width="10" stroke-linejoin="round"/>

          <circle cx="120" cy="70" r="6" fill="#0B0B0B"/>
          <circle cx="160" cy="60" r="6" fill="#0B0B0B"/>
          <circle cx="200" cy="80" r="6" fill="#0B0B0B"/>

          <text class="ks-tetherT"
                x="155" y="105"
                font-size="48"
                font-weight="800"
                fill="#26A17B"
                text-anchor="middle"
                font-family="Arial, sans-serif">T</text>

          <path d="M90 120 L230 120 L200 210 L120 210 Z"
                fill="none" stroke="#0B0B0B" stroke-width="10" stroke-linejoin="round"/>

          <line x1="120" y1="120" x2="140" y2="210" stroke="#0B0B0B" stroke-width="6"/>
          <line x1="160" y1="120" x2="160" y2="210" stroke="#0B0B0B" stroke-width="6"/>
          <line x1="200" y1="120" x2="180" y2="210" stroke="#0B0B0B" stroke-width="6"/>
        </g>
      </g>
    </g>
  </svg>
</div>

          <div class="langs">
            <button class="pill" data-lang="ua">UA</button>
            <button class="pill" data-lang="en">EN</button>
            <button class="pill" data-lang="pl">PL</button>
            <button class="iconBtn" id="menuBtn" title="Menu">☰</button>
          </div>
        </div>

        <div class="notice">
          <div class="dot">!</div>
          <div>
            <div class="text" id="noteText"></div>
            <div class="sub">KeksSwap WebApp</div>
          </div>
        </div>

        <div class="tabs" id="tabs"></div>
      </div>

      <div id="page"></div>
    </div>

    <div class="modalBack" id="modalBack"></div>
    <div class="modal" id="modal">
      <div class="modalHead">
        <div class="modalTitle" id="modalTitle"></div>
        <button class="closeBtn" id="closeModal">✕</button>
      </div>
      <div class="search">
        <input class="input" id="searchInput" placeholder="Search..." />
      </div>
      <div class="list" id="modalList"></div>
    </div>
  `;

  $("#brandLogo").src = PATHS.brand;

  // Tabs
  const TABS = [
    { id:"exchange", labelKey:"exchange" },
    { id:"rules", labelKey:"rules" },
    { id:"aml", labelKey:"aml" },
    { id:"faq", labelKey:"faq" },
    { id:"contacts", labelKey:"contacts" },
    { id:"account", labelKey:"account" },
  ];

  function renderTabs(){
    const tabs = $("#tabs");
    tabs.innerHTML = TABS.map(x => `
      <button class="tab ${state.page===x.id?"active":""}" data-page="${x.id}">
        ${t(x.labelKey)}
      </button>
    `).join("");
  }

  function renderLangButtons(){
    document.querySelectorAll("[data-lang]").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === state.lang);
    });
    $("#noteText").textContent = t("note");
  }

  function renderPage(){
    const page = $("#page");

    if (state.page === "exchange") {
      page.innerHTML = `
        <div class="card">
          <div class="cardInner">
            <div class="h1">${t("exchange")}</div>

            <div class="grid">
              <div>
                <div class="label">${t("give")}</div>
                <input class="input" id="fromAmount" inputmode="decimal" autocomplete="off" />
                <div style="height:10px"></div>
                <div class="selectRow" id="fromPick">
                  <div class="ico"><img id="fromIco" alt=""></div>
                  <div class="txt">
                    <div class="main" id="fromMain"></div>
                    <div class="sub" id="fromSub"></div>
                  </div>
                  <div class="right">▾</div>
                </div>
              </div>

              <div class="swapBtn" id="swapBtn" title="Swap">⇅</div>

              <div>
                <div class="label">${t("get")}</div>
                <input class="input" id="toAmount" inputmode="decimal" autocomplete="off" />
                <div style="height:10px"></div>
                <div class="selectRow" id="toPick">
                  <div class="ico"><img id="toIco" alt=""></div>
                  <div class="txt">
                    <div class="main" id="toMain"></div>
                    <div class="sub" id="toSub"></div>
                  </div>
                  <div class="right">▾</div>
                </div>
              </div>
            </div>
          </div>

          <div class="summary">
            <div class="row">
              <span>${t("rate")}</span>
              <strong id="rateLine"></strong>
            </div>
            <div class="row">
              <span>${t("fee")}</span>
              <strong id="feeLine"></strong>
            </div>
            <div class="big" id="payoutLine"></div>

            <button class="btn" id="continueBtn">${t("cont")}</button>
          </div>
        </div>
      `;
      bindExchange();
      updateExchangeUI();
      return;
    }

    if (state.page === "rules") {
      page.innerHTML = `
        <div class="card"><div class="cardInner">
          <div class="h2">${t("rules")}</div>
          <div class="small">
            • Мін/макс суми залежать від напрямку.<br/>
            • Курс фіксується на момент створення заявки.<br/>
            • Платежі з невірними реквізитами можуть бути повернуті.<br/>
          </div>
        </div></div>
      `;
      return;
    }

    if (state.page === "aml") {
      page.innerHTML = `
        <div class="card"><div class="cardInner">
          <div class="h2">${t("aml")}</div>
          <div class="small">
            AML/KYC потрібні для великих сум та підозрілих транзакцій.<br/>
            У цій версії — це демо-екран, провайдер ще не підключено.
          </div>
          <div class="hr"></div>
          <button class="btn secondary" id="goAccount">${t("account")} →</button>
        </div></div>
      `;
      $("#goAccount").onclick = () => { state.page="account"; renderTabs(); renderPage(); };
      return;
    }

    if (state.page === "faq") {
      page.innerHTML = `
        <div class="card"><div class="cardInner">
          <div class="h2">${t("faq")}</div>
          <div class="small">
            • Скільки триває обмін? — зазвичай 5–30 хв (демо).<br/>
            • Чому потрібен KYC? — вимоги AML/платіжних систем.<br/>
          </div>
        </div></div>
      `;
      return;
    }

    if (state.page === "contacts") {
      page.innerHTML = `
        <div class="card"><div class="cardInner">
          <div class="h2">${t("contacts")}</div>
          <div class="small">
            Telegram: @keksswap (приклад)<br/>
            Email: support@keksswap.com (приклад)
          </div>
        </div></div>
      `;
      return;
    }

    if (state.page === "account") {
      const statusText =
        state.user.kyc === "ok" ? t("kycOk") :
        state.user.kyc === "pending" ? t("kycPending") : t("kycNone");

      page.innerHTML = `
        <div class="card"><div class="cardInner">
          <div class="h2">${t("hello")}</div>
          <div class="small"><strong>${t("tgUser")}:</strong> ${escapeHtml(state.user.tg_name || "Guest")}</div>

          <div class="hr"></div>

          <div class="h2">${t("kycTitle")}</div>
          <div class="small"><strong>${t("kycStatus")}:</strong> ${statusText}</div>

          <button class="btn" id="startKyc">${t("startKyc")}</button>
          <button class="btn secondary" id="setOk">Demo: set Verified</button>
          <button class="btn secondary" id="setNone">Demo: reset</button>
        </div></div>
      `;

      $("#startKyc").onclick = () => {
        state.user.kyc = "pending";
        saveUser();
        renderPage();
      };
      $("#setOk").onclick = () => {
        state.user.kyc = "ok";
        saveUser();
        renderPage();
      };
      $("#setNone").onclick = () => {
        state.user.kyc = "none";
        saveUser();
        renderPage();
      };
      return;
    }
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  // ---------- Exchange bindings ----------
  let bound = false;
  function bindExchange(){
    if (bound) return;
    bound = true;

    const fromAmount = $("#fromAmount");
    const toAmount = $("#toAmount");

    // ВАЖНО: не перерисовываем инпут при вводе, только читаем значение и обновляем другие поля.
    fromAmount.addEventListener("input", () => {
      state.fromAmount = fromAmount.value;
      updateExchangeUI(false);
    });

    toAmount.addEventListener("input", () => {
      // если пользователь вводит "получаю" — пересчитываем "отдаю"
      const val = Number(String(toAmount.value).replace(",", "."));
      if (!isFinite(val) || val <= 0) return;

      // обратный пересчет
      const uahNeeded = isUAH(state.to) ? (val / (1 - state.fee/100)) : (val * (state.to.rateUAH || 1) / (1 - state.fee/100));
      const fromNeeded = isUAH(state.from) ? uahNeeded : (uahNeeded / (state.from.rateUAH || 1));
      state.fromAmount = fmt(fromNeeded, 8);
      fromAmount.value = state.fromAmount;
      updateExchangeUI(false);
    });

    $("#fromPick").onclick = () => openModal("from");
    $("#toPick").onclick = () => openModal("to");

    $("#swapBtn").onclick = () => {
      const tmp = state.from;
      state.from = state.to;
      state.to = tmp;
      updateExchangeUI();
    };

    $("#continueBtn").onclick = () => {
      // пока демо: просто переходим в аккаунт если KYC нужен и нет
      // (позже сделаем страницу "заявка")
      if (state.user.kyc !== "ok") {
        state.page = "account";
        renderTabs();
        renderPage();
        return;
      }
      alert("Демо: тут будет шаг 'Данные заявки' и создание заявки.");
    };
  }

  function updateExchangeUI(setInputs=true){
    const fromAmount = $("#fromAmount");
    const toAmount = $("#toAmount");

    if (setInputs) fromAmount.value = state.fromAmount;

    $("#fromIco").src = state.from.icon;
    $("#fromMain").textContent = `${state.from.name} ${state.from.sub}`;
    $("#fromSub").textContent = groupName(state.from.groupId);

    $("#toIco").src = state.to.icon;
    $("#toMain").textContent = `${state.to.name} ${state.to.sub}`;
    $("#toSub").textContent = groupName(state.to.groupId);

    const out = convert(state.fromAmount, state.from, state.to);
    // НЕ трогаем фокус: если пользователь вводит в fromAmount, не менять caret.
    // Поэтому toAmount обновляем всегда, а fromAmount только когда нужно.
    toAmount.value = fmt(out, 8);

    // rate line (для красивого вывода)
    // показываем курс 1 FROM ≈ X TO
    const one = convert("1", state.from, state.to);
    $("#rateLine").textContent = `1 ${state.from.sub} ≈ ${fmt(one, 8)} ${state.to.sub}`;
    $("#feeLine").textContent = `${state.fee}%`;

    $("#payoutLine").textContent = `${t("payout")}: ${fmt(out, 8)} ${state.to.sub}`;
  }

  function groupName(groupId){
    const g = GROUPS.find(x => x.id === groupId);
    if (!g) return "";
    return g.subtitle[state.lang] || g.subtitle.ua;
  }

  // ---------- Modal (groups, search) ----------
  const modalBack = $("#modalBack");
  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalList = $("#modalList");
  const searchInput = $("#searchInput");

  $("#closeModal").onclick = closeModal;
  modalBack.onclick = closeModal;

  function openModal(mode){
    state.modal.open = true;
    state.modal.mode = mode;
    state.modal.q = "";
    searchInput.value = "";
    modalTitle.textContent = mode === "from" ? t("give") : t("get");

    modalBack.classList.add("show");
    modal.classList.add("show");

    renderModal();
    setTimeout(() => searchInput.focus(), 60);
  }

  function closeModal(){
    state.modal.open = false;
    modalBack.classList.remove("show");
    modal.classList.remove("show");
  }

  searchInput.addEventListener("input", () => {
    state.modal.q = searchInput.value.trim().toLowerCase();
    renderModal();
  });

  function renderModal(){
    const q = state.modal.q;

    // фильтр по поиску
    const groupBlocks = GROUPS.map(g => {
      const title = g.title[state.lang] || g.title.ua;
      const subtitle = g.subtitle[state.lang] || g.subtitle.ua;

      let items = g.items;
      if (q) {
        items = items.filter(it =>
          (it.name + " " + it.sub).toLowerCase().includes(q) ||
          title.toLowerCase().includes(q)
        );
      }

      if (!items.length) return "";

      const isOpen = state.modal.openGroups.has(g.id) || q.length > 0;

      return `
        <div class="group ${isOpen ? "open" : ""}" data-group="${g.id}">
          <div class="groupHead">
            <div class="ico"><img src="${g.icon}" alt=""></div>
            <div class="txt">
              <div class="main">${title}</div>
              <div class="sub">${subtitle}</div>
            </div>
            <div class="badge">${items.length}</div>
            <div class="badge" style="margin-left:0;background:transparent;">${isOpen ? "▴" : "▾"}</div>
          </div>
          <div class="groupBody">
            ${items.map(it => itemRow(it)).join("")}
          </div>
        </div>
      `;
    }).join("");

    modalList.innerHTML = groupBlocks || `<div class="small" style="padding:12px 10px;">Nothing found</div>`;

    // group toggle + item select
    modalList.querySelectorAll(".groupHead").forEach(h => {
      h.onclick = () => {
        const gid = h.parentElement.dataset.group;
        if (state.modal.openGroups.has(gid)) state.modal.openGroups.delete(gid);
        else state.modal.openGroups.add(gid);
        renderModal();
      };
    });

    modalList.querySelectorAll(".item").forEach(el => {
      el.onclick = () => {
        const id = el.dataset.id;
        const picked = FLAT.find(x => x.id === id);
        if (!picked) return;

        if (state.modal.mode === "from") state.from = picked;
        else state.to = picked;

        closeModal();
        updateExchangeUI();
      };
    });
  }

  function itemRow(it){
    return `
      <div class="item" data-id="${it.id}">
        <div class="ico"><img src="${it.icon}" alt=""></div>
        <div class="txt">
          <div class="main">${it.name} <span style="color:#64748b;font-weight:900">${it.sub}</span></div>
          <div class="sub">min ${it.min} • max ${it.max}</div>
        </div>
      </div>
    `;
  }

  // ---------- Menu + navigation ----------
  $("#menuBtn").onclick = () => {
    // быстрый “меню” = переход на rules/aml/faq/contacts
    state.page = (state.page === "exchange") ? "rules" : "exchange";
    renderTabs();
    renderPage();
  };

  document.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-page]");
    if (tab){
      state.page = tab.dataset.page;
      renderTabs();
      renderPage();
    }
    const lang = e.target.closest("[data-lang]");
    if (lang){
      state.lang = lang.dataset.lang;
      localStorage.setItem("ks_lang", state.lang);
      renderTabs();
      renderLangButtons();
      renderPage();
    }
  });

  // ---------- INIT ----------
  renderTabs();
  renderLangButtons();
  renderPage();

  // Telegram theme integration (опционально)
  if (tg) {
    try {
      tg.setHeaderColor?.("#eef2ff");
      tg.setBackgroundColor?.("#eef2ff");
    } catch {}
  }
})();
