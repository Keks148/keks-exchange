(() => {
  // ===== State =====
  const state = {
    lang: "UA",
    tab: "exchange",
    modalOpen: false,
    modalTarget: null, // "give" | "get"
    quickFilter: "ALL",
    search: "",
    give: null,
    get: null,
    giveAmount: "",
  };

  // ===== Assets dataset (минимальный набор + пример структуры) =====
  // paths: подставь свои реальные, у тебя уже есть ./logos/crypto/btc.png и т.д.
  // Важно: НЕ уменьшаем иконки в CSS, как ты просил.
  const ASSETS = [
    // Banks
    { id: "mono_uah", name: "Monobank", code: "UAH", type: "BANKS", icon: "./logos/banks/mono.png" },

    // Top crypto
    { id: "btc", name: "Bitcoin", code: "BTC", type: "TOP", icon: "./logos/crypto/btc.png" },
    { id: "eth", name: "Ethereum", code: "ETH", type: "TOP", icon: "./logos/crypto/eth.png" },

    // Stablecoins
    { id: "usdt_erc20", name: "Tether (ERC20)", code: "USDT", type: "USDT", icon: "./logos/usdt/erc20.png" },
    { id: "usdt_bep20", name: "Tether (BEP20)", code: "USDT", type: "USDT", icon: "./logos/usdt/bep20.png" },
    { id: "usdc_erc20", name: "USD Coin (ERC20)", code: "USDC", type: "USDC", icon: "./logos/usdc/erc20.png" },
    { id: "usdc_sol", name: "USD Coin (SOL)", code: "USDC", type: "USDC", icon: "./logos/usdc/sol.png" },
  ];

  // дефолты (как на твоих скринах)
  state.give = ASSETS.find(a => a.id === "mono_uah") || ASSETS[0];
  state.get  = ASSETS.find(a => a.id === "btc") || ASSETS[1];

  // ===== DOM =====
  const $ = (id) => document.getElementById(id);

  const brandTitle = $("brandTitle");

  const tabs = document.querySelectorAll(".tab");
  const panels = {
    exchange: $("panel-exchange"),
    rules: $("panel-rules"),
    reviews: $("panel-reviews"),
    account: $("panel-account"),
  };

  const giveSelect = $("giveSelect");
  const getSelect = $("getSelect");

  const giveIcon = $("giveIcon");
  const giveName = $("giveName");
  const giveSub  = $("giveSub");

  const getIcon = $("getIcon");
  const getName = $("getName");
  const getSub  = $("getSub");

  const giveAmount = $("giveAmount");
  const getAmount  = $("getAmount");

  const swapBtn = $("swapBtn");

  // modal
  const modalBackdrop = $("modalBackdrop");
  const modalClose = $("modalClose");
  const modalTitle = $("modalTitle");
  const modalSearch = $("modalSearch");
  const modalList = $("modalList");

  const quickFilters = $("quickFilters");

  // ===== Helpers =====
  function setActiveTab(tab) {
    state.tab = tab;
    tabs.forEach(btn => btn.classList.toggle("is-active", btn.dataset.tab === tab));
    Object.keys(panels).forEach(k => panels[k].classList.toggle("is-active", k === tab));
  }

  function setLang(lang) {
    state.lang = lang;
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.lang === lang));
    // Пока без доп. добавок/контента — просто переключаем тексты шапки/табов в минималке
    const labels = {
      UA: { exchange:"Обмін", rules:"Правила", reviews:"Відгуки", account:"Аккаунт", give:"Віддаєте", get:"Отримуєте" },
      EN: { exchange:"Exchange", rules:"Rules", reviews:"Reviews", account:"Account", give:"You send", get:"You get" },
      PL: { exchange:"Wymiana", rules:"Zasady", reviews:"Opinie", account:"Konto", give:"Wysyłasz", get:"Otrzymujesz" },
    }[lang];

    $("tabExchange").textContent = labels.exchange;
    $("tabRules").textContent = labels.rules;
    $("tabReviews").textContent = labels.reviews;
    $("tabAccount").textContent = labels.account;
    $("lblGive").textContent = labels.give;
    $("lblGet").textContent = labels.get;
  }

  function renderAssetInto(target, asset) {
    if (target === "give") {
      giveIcon.src = asset.icon;
      giveIcon.alt = asset.code;
      giveName.textContent = asset.name;
      giveSub.textContent = asset.code;
    } else {
      getIcon.src = asset.icon;
      getIcon.alt = asset.code;
      getName.textContent = asset.name;
      getSub.textContent = asset.code;
    }
  }

  function openModal(target) {
    state.modalOpen = true;
    state.modalTarget = target;
    state.search = "";
    state.quickFilter = "ALL";

    modalTitle.textContent = (target === "give")
      ? (state.lang === "UA" ? "Віддаєте" : state.lang === "PL" ? "Wysyłasz" : "You send")
      : (state.lang === "UA" ? "Отримуєте" : state.lang === "PL" ? "Otrzymujesz" : "You get");

    // reset UI
    modalSearch.value = "";
    quickFilters.querySelectorAll(".quick-btn").forEach(b => b.classList.toggle("is-active", b.dataset.qf === "ALL"));

    modalBackdrop.hidden = false;
    requestAnimationFrame(() => modalSearch.focus());
    renderModalList();
  }

  function closeModal() {
    state.modalOpen = false;
    state.modalTarget = null;
    modalBackdrop.hidden = true;
  }

  function filterAssets() {
    const q = (state.search || "").trim().toLowerCase();
    const f = state.quickFilter;

    return ASSETS.filter(a => {
      const okFilter =
        f === "ALL" ||
        (f === "BANKS" && a.type === "BANKS") ||
        (f === "TOP" && a.type === "TOP") ||
        (f === "USDT" && a.type === "USDT") ||
        (f === "USDC" && a.type === "USDC");

      if (!okFilter) return false;

      if (!q) return true;
      return (a.name + " " + a.code).toLowerCase().includes(q);
    });
  }

  function renderModalList() {
    const list = filterAssets();
    modalList.innerHTML = "";

    list.forEach(a => {
      const row = document.createElement("div");
      row.className = "item";
      row.tabIndex = 0;

      row.innerHTML = `
        <div class="item-left">
          <img class="asset-ico" src="${a.icon}" alt="${a.code}">
          <div style="min-width:0">
            <div class="item-title">${escapeHtml(a.name)} <span style="opacity:.7">${escapeHtml(a.code)}</span></div>
            <div class="item-sub">${badgeText(a)}</div>
          </div>
        </div>
        <div class="item-right">›</div>
      `;

      row.addEventListener("click", () => {
        if (state.modalTarget === "give") state.give = a;
        if (state.modalTarget === "get") state.get = a;

        renderAssetInto("give", state.give);
        renderAssetInto("get", state.get);
        recalc();
        closeModal();
      });

      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          row.click();
        }
      });

      modalList.appendChild(row);
    });
  }

  function badgeText(a){
    if (a.type === "BANKS") return "Banks";
    if (a.type === "TOP") return "Top";
    return a.type; // USDT/USDC
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  // ===== расчёт (заглушка курса, но форма работает) =====
  function recalc() {
    // здесь потом подключишь реальные курсы
    const amount = parseFloat((state.giveAmount || "0").replace(",", "."));
    const safeAmount = isFinite(amount) ? amount : 0;

    // супер простая заглушка: UAH -> BTC условно
    // чтобы UI не пустой
    let rate = 0.00000067;
    if (state.give.code === "BTC" && state.get.code === "UAH") rate = 1 / 0.00000067;
    if (state.give.code === state.get.code) rate = 1;

    const out = safeAmount * rate;
    getAmount.value = formatSmart(out);
  }

  function formatSmart(n){
    if (!isFinite(n)) return "0";
    if (Math.abs(n) >= 1) return String(Math.round(n * 100) / 100);
    // для мелких — до 8 знаков
    return n.toFixed(8).replace(/0+$/,"").replace(/\.$/,"");
  }

  // ===== Events =====
  // Tabs
  tabs.forEach(btn => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));

  // Lang
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // Open modal
  giveSelect.addEventListener("click", () => openModal("give"));
  getSelect.addEventListener("click", () => openModal("get"));

  // Close modal
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // Search
  modalSearch.addEventListener("input", () => {
    state.search = modalSearch.value;
    renderModalList();
  });

  // Quick filters
  quickFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".quick-btn");
    if (!btn) return;
    state.quickFilter = btn.dataset.qf;

    quickFilters.querySelectorAll(".quick-btn").forEach(b =>
      b.classList.toggle("is-active", b.dataset.qf === state.quickFilter)
    );

    renderModalList();
  });

  // Swap (меняем валюты местами + пересчёт)
  swapBtn.addEventListener("click", () => {
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;

    renderAssetInto("give", state.give);
    renderAssetInto("get", state.get);
    recalc();
  });

  // Input focus FIX: не пересоздаем DOM при вводе
  giveAmount.addEventListener("input", () => {
    state.giveAmount = giveAmount.value;
    recalc();
  });

  // ===== Init =====
  function init() {
    renderAssetInto("give", state.give);
    renderAssetInto("get", state.get);
    setLang("UA");
    setActiveTab("exchange");
    recalc();
  }

  init();
})();
