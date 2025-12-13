(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) { tg.ready(); tg.expand(); }

  const top = tg?.safeAreaInset?.top ?? 10;
  const bottom = tg?.safeAreaInset?.bottom ?? 10;
  document.documentElement.style.setProperty("--safeTop", `${Math.max(8, top)}px`);
  document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);

  const LOGO = {
    brand: "./logo.png",
    banksDir: "./logos/banks/",
    walletsDir: "./logos/wallets/",
    cryptoDir: "./logos/crypto/",
  };

  const GROUPS = [
    {
      id: "usdt",
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
      items: [
        { id: "usdc-eth", name: "USD Coin (ERC20)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-eth.png`, rateUAH: 41.0 },
        { id: "usdc-pol", name: "USD Coin (POL)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-pol.png`, rateUAH: 41.0 },
        { id: "usdc-sol", name: "USD Coin (SOL)", sub: "USDC", icon: `${LOGO.cryptoDir}usdc-sol.png`, rateUAH: 41.0 },
      ],
    },
    {
      id: "crypto",
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
      items: [
        { id: "mono", name: "Monobank", sub: "UAH", icon: `${LOGO.banksDir}mono.png`, rateUAH: 1 },
        { id: "privat", name: "PrivatBank", sub: "UAH", icon: `${LOGO.banksDir}privat.png`, rateUAH: 1 },
      ],
    },
    {
      id: "wallets",
      items: [
        { id: "paypal", name: "PayPal", sub: "USD", icon: `${LOGO.walletsDir}paypal.png`, rateUAH: 41.0 },
        { id: "revolut", name: "Revolut", sub: "USD", icon: `${LOGO.walletsDir}revolut.png`, rateUAH: 41.0 },
      ],
    },
  ];

  const state = {
    lang: "UA",
    tab: "swap",
    step: 1,
    give: { groupId: "banks", itemId: "mono" },
    get:  { groupId: "crypto", itemId: "btc" },
    amountGive: "1000",
    modal: { open: false, target: "give", q: "" },
  };

  const findGroup = (id) => GROUPS.find(g => g.id === id);
  const findItem = (groupId, itemId) => findGroup(groupId)?.items?.find(i => i.id === itemId);

  function calcGetAmount() {
    const giveItem = findItem(state.give.groupId, state.give.itemId);
    const getItem  = findItem(state.get.groupId, state.get.itemId);
    const x = parseFloat(String(state.amountGive).replace(",", "."));
    if (!giveItem || !getItem || !isFinite(x) || x <= 0) return "0";

    const uah = x * (giveItem.rateUAH ?? 1);
    const out = uah / (getItem.rateUAH ?? 1);

    if (out >= 1) return out.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");
    return out.toFixed(8).replace(/0+$/,"").replace(/\.$/,"");
  }

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="header">
      <div class="headerInner">
        <div class="brandWide" title="KeksSwap">
          <svg id="brandSvg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 240"
            preserveAspectRatio="xMidYMid meet"
            style="display:block; width:100%; height:48px; background:transparent; cursor:pointer;">
            <g class="ks-wrap">
              <text x="40" y="120"
                font-size="150"
                font-weight="700"
                fill="#0B0B0B"
                font-family="Georgia, serif"
                dominant-baseline="middle"
                letter-spacing="2">KeksSwap</text>

              <!-- ЧИСТЫЙ кекс (без Tether-знака) -->
              <g class="ks-cupcake" transform="translate(880,34) scale(1.06)">
                <!-- крем -->
                <path d="M70 30
                         C90 10, 130 10, 150 30
                         C168 28, 180 44, 170 58
                         C165 74, 145 80, 130 76
                         C114 84, 92 80, 84 66
                         C66 62, 60 42, 70 30 Z"
                      fill="none" stroke="#0B0B0B" stroke-width="9" stroke-linejoin="round"/>
                <!-- основа -->
                <path d="M78 64 L164 64 L146 120 L96 120 Z"
                      fill="none" stroke="#0B0B0B" stroke-width="9" stroke-linejoin="round"/>
                <line x1="96" y1="64" x2="105" y2="120" stroke="#0B0B0B" stroke-width="5"/>
                <line x1="121" y1="64" x2="121" y2="120" stroke="#0B0B0B" stroke-width="5"/>
                <line x1="146" y1="64" x2="137" y2="120" stroke="#0B0B0B" stroke-width="5"/>
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

      <div class="topMenu" id="topMenu">
        <button class="tab active" data-tab="swap">Обмін</button>
        <button class="tab" data-tab="rules">Правила</button>
        <button class="tab" data-tab="faq">FAQ</button>
        <button class="tab" data-tab="contacts">Контакти</button>
        <button class="tab" data-tab="account">Аккаунт</button>
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

  function renderContent(){
    const content = document.getElementById("content");

    if (state.tab === "swap") {
      if (state.step === 1) {
        content.innerHTML = `
          <div class="card">
            <div class="h1">Обмін</div>

            <div class="label">Віддаєте</div>
            <!-- Сначала выбор валюты -->
            <button class="selectBtn" id="pickGive">
              <div class="selLeft">
                <img class="icon40" id="giveIcon" alt="">
                <div style="min-width:0">
                  <div class="selName" id="giveName"></div>
                  <div class="selSub" id="giveSub"></div>
                </div>
              </div>
              <div style="font-weight:1000;">▼</div>
            </button>
            <!-- Потом ввод суммы -->
            <input id="giveAmount" class="field" inputmode="decimal" placeholder="0" value="${state.amountGive}" style="margin-top:10px" />

            <div class="swapBtn" id="swapSides">⇅</div>

            <div class="label">Отримуєте</div>
            <!-- Сначала выбор валюты -->
            <button class="selectBtn" id="pickGet">
              <div class="selLeft">
                <img class="icon40" id="getIcon" alt="">
                <div style="min-width:0">
                  <div class="selName" id="getName"></div>
                  <div class="selSub" id="getSub"></div>
                </div>
              </div>
              <div style="font-weight:1000;">▼</div>
            </button>
            <!-- Потом поле результата -->
            <input id="getAmount" class="field" readonly value="0" style="margin-top:10px" />

            <button class="primaryBtn" id="btnContinue">Продовжити</button>
          </div>
        `;

        const giveAmount = document.getElementById("giveAmount");
        giveAmount.addEventListener("input", () => {
          state.amountGive = giveAmount.value;
          renderSwapNumbers(); // без перерисовки страницы
        });

        document.getElementById("pickGive").addEventListener("click", () => openModal("give"));
        document.getElementById("pickGet").addEventListener("click", () => openModal("get"));

        document.getElementById("swapSides").addEventListener("click", () => {
          const tmp = state.give; state.give = state.get; state.get = tmp;
          renderSwapNumbers();
        });

        document.getElementById("btnContinue").addEventListener("click", () => {
          state.step = 2;
          renderContent();
        });

        renderSwapNumbers();
        return;
      }

      const giveItem = findItem(state.give.groupId, state.give.itemId);
      const getItem  = findItem(state.get.groupId, state.get.itemId);
      const out = calcGetAmount();

      content.innerHTML = `
        <div class="card">
          <div class="h1">Підтвердження</div>

          <div class="label">Ви віддаєте</div>
          <div style="display:flex;align-items:center;gap:12px;">
            <img class="icon40" src="${giveItem?.icon || ""}" alt="">
            <div style="font-weight:1000;font-size:18px;">
              ${state.amountGive} • ${giveItem?.name || ""} <span style="color:var(--muted)">${giveItem?.sub || ""}</span>
            </div>
          </div>

          <div style="height:14px;"></div>

          <div class="label">Ви отримуєте</div>
          <div style="display:flex;align-items:center;gap:12px;">
            <img class="icon40" src="${getItem?.icon || ""}" alt="">
            <div style="font-weight:1000;font-size:18px;">
              ${out} • ${getItem?.name || ""} <span style="color:var(--muted)">${getItem?.sub || ""}</span>
            </div>
          </div>

          <button class="primaryBtn" id="btnBack" style="background:#111827;margin-top:16px;">Назад</button>
          <button class="primaryBtn" id="btnCreate">Створити заявку</button>
          <div style="color:var(--muted);font-weight:800;font-size:13px;margin-top:10px;">
            Поки без оплати/інтеграцій. Далі підключимо.
          </div>
        </div>
      `;

      document.getElementById("btnBack").addEventListener("click", () => {
        state.step = 1;
        renderContent();
      });
      document.getElementById("btnCreate").addEventListener("click", () => {
        alert("Заявка створена (демо). Далі додамо форму реквізитів і підтвердження.");
      });

      return;
    }

    if (state.tab === "rules") {
      content.innerHTML = `<div class="card"><div class="h1">Правила</div><div style="color:var(--muted);font-weight:800">Додамо текст правил пізніше.</div></div>`;
      return;
    }
    if (state.tab === "faq") {
      content.innerHTML = `<div class="card"><div class="h1">FAQ</div><div style="color:var(--muted);font-weight:800">Додамо FAQ пізніше.</div></div>`;
      return;
    }
    if (state.tab === "contacts") {
      content.innerHTML = `<div class="card"><div class="h1">Контакти</div><div style="color:var(--muted);font-weight:800">Telegram / Email / графік — додамо.</div></div>`;
      return;
    }

    if (state.tab === "account") {
      content.innerHTML = `
        <div class="card">
          <div class="h1">Аккаунт</div>
          <div style="color:var(--muted);font-weight:800;margin-bottom:12px;">
            Поки без KYC підключення. Зараз робимо екран входу/реєстрації (демо).
          </div>
          <button class="primaryBtn" id="btnLogin">Войти</button>
          <button class="primaryBtn" id="btnRegister" style="background:#111827;">Зарегистрироваться</button>
          <div style="color:var(--muted);font-weight:800;font-size:13px;margin-top:10px;">
            Далі додамо: email/телефон, пароль, підтвердження, потім KYC.
          </div>
        </div>
      `;
      document.getElementById("btnLogin").addEventListener("click", () => alert("Login (демо)."));
      document.getElementById("btnRegister").addEventListener("click", () => alert("Register (демо)."));
      return;
    }
  }

  function renderSwapNumbers(){
    if (state.tab !== "swap" || state.step !== 1) return;

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

    const rows = [];
    for (const g of GROUPS){
      for (const it of g.items){
        const txt = `${it.name} ${it.sub||""}`.toLowerCase();
        if (!q || txt.includes(q)) rows.push({ g, it });
      }
    }

    list.innerHTML = rows.map(({g,it}) => `
      <div class="item" data-g="${g.id}" data-i="${it.id}">
        <div class="itemLeft">
          <img class="icon40" src="${it.icon}" alt="">
          <div style="min-width:0">
            <div class="itemTitle">${it.name} <span style="color:var(--muted);font-weight:1000">${it.sub||""}</span></div>
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

  renderContent();
})();
