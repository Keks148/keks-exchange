(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  // safe area
  const top = tg?.safeAreaInset?.top ?? 10;
  const bottom = tg?.safeAreaInset?.bottom ?? 10;
  document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
  document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);

  // ====== DATA (минимально, дальше расширим) ======
  const LOGO = {
    brand: "./logo.png",
    banksDir: "./logos/banks/",
    walletsDir: "./logos/wallets/",
    cryptoDir: "./logos/crypto/",
  };

  // группы для модалки "Отдаёте/Получаете"
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
      icon: `${LOGO.cryptoDir}crypto.png`, // <-- твой crypto.png
      items: [
        { id: "btc", name: "Bitcoin", sub: "BTC", icon: `${LOGO.cryptoDir}btc.png`, rateUAH: 1500000 },
        { id: "eth", name: "Ethereum", sub: "ETH", icon: `${LOGO.cryptoDir}eth.png`, rateUAH: 170000 },
        { id: "sol", name: "Solana", sub: "SOL", icon: `${LOGO.cryptoDir}sol.png`, rateUAH: 7000 },
        { id: "trx", name: "TRON", sub: "TRX", icon: `${LOGO.cryptoDir}trx.png`, rateUAH: 5.0 },
        { id: "ton", name: "TON", sub: "TON", icon: `${LOGO.cryptoDir}ton.png`, rateUAH: 250 },
      ],
    },
    {
      id: "banks",
      title: { ua: "Банки - UAH", en: "Banks - UAH", pl: "Banki - UAH" },
      subtitle: { ua: "Україна", en: "Ukraine", pl: "Ukraina" },
      icon: `${LOGO.banksDir}ukr-banki.png`,
      items: [
        { id: "mono", name: "Monobank", sub: "UAH", icon: `${LOGO.banksDir}mono.png`, rateUAH: 1 },
        { id: "privat", name: "PrivatBank", sub: "UAH", icon: `${LOGO.banksDir}privat.png`, rateUAH: 1 },
      ],
    },
    {
      id: "wallets",
      title: { ua: "Електронні гаманці", en: "E-wallets", pl: "Portfele" },
      subtitle: { ua: "USD/EUR", en: "USD/EUR", pl: "USD/EUR" },
      icon: `${LOGO.walletsDir}valet.png`,
      items: [
        { id: "paypal", name: "PayPal", sub: "USD", icon: `${LOGO.walletsDir}paypal.png`, rateUAH: 41.0 },
        { id: "revolut", name: "Revolut", sub: "USD", icon: `${LOGO.walletsDir}revolut.png`, rateUAH: 41.0 },
      ],
    },
  ];

  // ====== STATE ======
  const state = {
    lang: "UA",
    tab: "swap", // swap | rules | faq | contacts
    give: { groupId: "banks", itemId: "mono" },
    get:  { groupId: "crypto", itemId: "btc" },
    amountGive: "1000",
    modal: { open: false, target: "give", q: "" }, // target: give|get
  };

  // ====== HELPERS ======
  const t = (obj) => obj?.[state.lang.toLowerCase()] ?? obj?.ua ?? "";
  const findGroup = (id) => GROUPS.find(g => g.id === id);
  const findItem = (groupId, itemId) => findGroup(groupId)?.items?.find(i => i.id === itemId);

  function calcGetAmount() {
    const giveItem = findItem(state.give.groupId, state.give.itemId);
    const getItem  = findItem(state.get.groupId, state.get.itemId);
    if (!giveItem || !getItem) return "0";

    const x = parseFloat(String(state.amountGive).replace(",", "."));
    if (!isFinite(x) || x <= 0) return "0";

    // переводим "отдаёте" в UAH, потом в "получаете"
    const uah = x * (giveItem.rateUAH ?? 1);
    const out = uah / (getItem.rateUAH ?? 1);

    // красиво форматируем
    if (out >= 1) return out.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");
    return out.toFixed(8).replace(/0+$/,"").replace(/\.$/,"");
  }

  // ====== RENDER (один раз) ======
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="header">
      <div class="headerInner">
        <div class="brandWide" title="KeksSwap">
          <svg id="brandSvg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 240"
            preserveAspectRatio="xMidYMid meet"
            style="display:block; width:100%; height:54px; background:transparent; cursor:pointer;">
            <g class="ks-wrap">
              <text x="40" y="165" font-size="160" font-weight="700" fill="#0B0B0B"
                font-family="Georgia, serif" letter-spacing="2">KeksSwap</text>
              <g class="ks-cupcake">
                <g transform="translate(880,20) scale(1.1)">
                  <path d="M100 40 C130 10, 200 10, 220 40 C260 45, 270 90, 240 110
                           C230 130, 200 140, 170 135 C140 145, 100 140, 80 120
                           C40 110, 40 70, 70 50 Z"
                        fill="none" stroke="#0B0B0B" stroke-width="10" stroke-linejoin="round"/>
                  <circle cx="120" cy="70" r="6" fill="#0B0B0B"/>
                  <circle cx="160" cy="60" r="6" fill="#0B0B0B"/>
                  <circle cx="200" cy="80" r="6" fill="#0B0B0B"/>
                  <text class="ks-tetherT" x="155" y="105" font-size="48" font-weight="800"
                        fill="#26A17B" text-anchor="middle" font-family="Arial, sans-serif">T</text>
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

        <div class="lang" id="langBtns">
          <button data-lang="UA" class="active">UA</button>
          <button data-lang="EN">EN</button>
          <button data-lang="PL">PL</button>
        </div>
      </div>

      <div class="notice">
        <div class="noticeCard">
          <div class="badgeWarn">!</div>
          <div>
            <div class="noticeTitle" id="noticeTitle"></div>
            <div class="noticeSub" id="noticeSub"></div>
          </div>
        </div>
      </div>

      <!-- Top menu 1 row (NO AML/KYC, NO Account, NO burger) -->
      <div class="topMenu" id="topMenu">
        <button class="tab active" data-tab="swap">Обмін</button>
        <button class="tab" data-tab="rules">Правила обміну</button>
        <button class="tab" data-tab="faq">FAQ</button>
        <button class="tab" data-tab="contacts">Контакти</button>
      </div>
    </div>

    <div class="wrap" id="content"></div>

    <div class="modalOverlay" id="modalOverlay">
      <div class="modal">
        <div class="modalHead">
          <h3 id="modalTitle">Вибір</h3>
          <button class="closeBtn" id="closeModal">✕</button>
        </div>
        <input class="search" id="searchInput" placeholder="Search..." />
        <div class="list" id="list"></div>
      </div>
    </div>
  `;

  // ====== EVENTS ======
  const brandSvg = document.getElementById("brandSvg");
  brandSvg?.addEventListener("click", () => {
    brandSvg.classList.remove("tap");
    void brandSvg.getBoundingClientRect();
    brandSvg.classList.add("tap");
  });

  document.getElementById("langBtns").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (!btn) return;
    state.lang = btn.dataset.lang;
    [...document.querySelectorAll("#langBtns button")].forEach(b => b.classList.toggle("active", b.dataset.lang === state.lang));
    renderAllText();
    renderSwapNumbers();
    renderList(); // на всякий случай, если модалка открыта
  });

  document.getElementById("topMenu").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    state.tab = btn.dataset.tab;
    [...document.querySelectorAll(".topMenu .tab")].forEach(b => b.classList.toggle("active", b.dataset.tab === state.tab));
    renderContent();
  });

  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.getElementById("closeModal").addEventListener("click", closeModal);

  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.modal.q = e.target.value || "";
    renderList();
  });

  // ====== RENDERERS ======
  function renderAllText(){
    const now = new Date();
    const noticeMain = {
      ua: "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
      en: "Requests created after 22:00 are processed from 08:00 (UTC+2).",
      pl: "Wnioski utworzone po 22:00 są przetwarzane od 08:00 (UTC+2).",
    };
    const noticeSub = { ua:"KeksSwap WebApp", en:"KeksSwap WebApp", pl:"KeksSwap WebApp" };
    document.getElementById("noticeTitle").textContent = noticeMain[state.lang.toLowerCase()];
    document.getElementById("noticeSub").textContent = noticeSub[state.lang.toLowerCase()];
  }

  function renderContent(){
    const content = document.getElementById("content");
    if (state.tab === "swap") {
      content.innerHTML = `
        <div class="card">
          <div class="h1">Обмін</div>

          <div class="label">Віддаєте</div>
          <input id="giveAmount" class="field" inputmode="decimal" placeholder="0" value="${state.amountGive}" />

          <button class="selectBtn" id="pickGive">
            <div class="selLeft">
              <img class="icon40" id="giveIcon" alt="">
              <div style="min-width:0">
                <div class="selName" id="giveName"></div>
                <div class="selSub" id="giveSub"></div>
              </div>
            </div>
            <div style="font-weight:900;">▼</div>
          </button>

          <div class="swapBtn" id="swapSides">⇅</div>

          <div class="label">Отримуєте</div>
          <input id="getAmount" class="field" readonly value="0" />

          <button class="selectBtn" id="pickGet">
            <div class="selLeft">
              <img class="icon40" id="getIcon" alt="">
              <div style="min-width:0">
                <div class="selName" id="getName"></div>
                <div class="selSub" id="getSub"></div>
              </div>
            </div>
            <div style="font-weight:900;">▼</div>
          </button>
        </div>
      `;

      // bind swap page events ONCE per render of page content
      const giveAmount = document.getElementById("giveAmount");
      giveAmount.addEventListener("input", () => {
        // ВАЖНО: не делаем полный render, иначе будет выбивать фокус
        state.amountGive = giveAmount.value;
        renderSwapNumbers();
      });

      document.getElementById("pickGive").addEventListener("click", () => openModal("give"));
      document.getElementById("pickGet").addEventListener("click", () => openModal("get"));

      document.getElementById("swapSides").addEventListener("click", () => {
        const tmp = state.give; state.give = state.get; state.get = tmp;
        renderSwapNumbers();
      });

      renderSwapNumbers();
      return;
    }

    if (state.tab === "rules") {
      content.innerHTML = `<div class="card"><div class="h1">Правила обміну</div><div style="color:var(--muted);font-weight:700">Тут буде текст правил.</div></div>`;
      return;
    }
    if (state.tab === "faq") {
      content.innerHTML = `<div class="card"><div class="h1">FAQ</div><div style="color:var(--muted);font-weight:700">Тут буде список питань/відповідей.</div></div>`;
      return;
    }
    if (state.tab === "contacts") {
      content.innerHTML = `<div class="card"><div class="h1">Контакти</div><div style="color:var(--muted);font-weight:700">Telegram, Email, графік роботи — додамо.</div></div>`;
      return;
    }
  }

  function renderSwapNumbers(){
    // если не на странице swap — не трогаем
    if (state.tab !== "swap") return;

    const giveItem = findItem(state.give.groupId, state.give.itemId);
    const getItem  = findItem(state.get.groupId, state.get.itemId);

    const giveIcon = document.getElementById("giveIcon");
    const giveName = document.getElementById("giveName");
    const giveSub  = document.getElementById("giveSub");

    const getIcon = document.getElementById("getIcon");
    const getName = document.getElementById("getName");
    const getSub  = document.getElementById("getSub");

    if (giveItem){
      giveIcon.src = giveItem.icon;
      giveName.textContent = giveItem.name;
      giveSub.textContent = giveItem.sub || "";
    }
    if (getItem){
      getIcon.src = getItem.icon;
      getName.textContent = getItem.name;
      getSub.textContent = getItem.sub || "";
    }

    const out = calcGetAmount();
    const getAmount = document.getElementById("getAmount");
    if (getAmount) getAmount.value = out;
  }

  function openModal(target){
    state.modal.open = true;
    state.modal.target = target;
    state.modal.q = "";
    document.getElementById("searchInput").value = "";
    document.getElementById("modalOverlay").classList.add("show");
    document.getElementById("modalTitle").textContent = target === "give" ? "Віддаєте" : "Отримуєте";
    renderList();
  }

  function closeModal(){
    state.modal.open = false;
    document.getElementById("modalOverlay").classList.remove("show");
  }

  function renderList(){
    if (!state.modal.open) return;
    const list = document.getElementById("list");
    const q = state.modal.q.trim().toLowerCase();

    // плоский список: показываем все items со всех групп (как у топовых обменников)
    const rows = [];
    for (const g of GROUPS){
      for (const it of g.items){
        const txt = `${g.id} ${g.title?.ua||""} ${it.name} ${it.sub||""}`.toLowerCase();
        if (!q || txt.includes(q)){
          rows.push({ g, it });
        }
      }
    }

    list.innerHTML = rows.map(({g,it}) => `
      <div class="item" data-g="${g.id}" data-i="${it.id}">
        <div class="itemLeft">
          <img class="icon40" src="${it.icon}" alt="">
          <div style="min-width:0">
            <div class="itemTitle">${it.name} <span style="color:var(--muted);font-weight:900">${it.sub||""}</span></div>
            <div class="itemMeta">min 10 • max 100000</div>
          </div>
        </div>
        <div style="font-weight:1000;color:var(--muted)">›</div>
      </div>
    `).join("");

    list.onclick = (e) => {
      const el = e.target.closest(".item");
      if (!el) return;
      const groupId = el.dataset.g;
      const itemId = el.dataset.i;

      if (state.modal.target === "give") state.give = { groupId, itemId };
      else state.get = { groupId, itemId };

      closeModal();
      renderSwapNumbers();
    };
  }

  // ====== START ======
  renderAllText();
  renderContent();
})();
