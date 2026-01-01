/* KeksSwap UI logic (mobile-first, Telegram WebApp friendly) */
(() => {
  "use strict";

  // -------- Telegram WebApp integration (safe fallback) --------
  const tg = (window.Telegram && window.Telegram.WebApp) ? window.Telegram.WebApp : null;
  try { tg && tg.ready && tg.ready(); } catch (_) {}
  try { tg && tg.expand && tg.expand(); } catch (_) {}

  // -------- Helpers --------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  const icons = {
    // crypto
    BTC: "logos/crypto/btc.png",
    ETH: "logos/crypto/eth.png",
    USDT: "logos/crypto/tether-usdt.png",
    USDC: "logos/crypto/usdc.png",
    TRX: "logos/crypto/trx.png",
    TON: "logos/crypto/ton.png",
    SOL: "logos/crypto/sol.png",
    BNB: "logos/crypto/bnb.png",
    XRP: "logos/crypto/xrp.png",
    ADA: "logos/crypto/cardano.png",
    DOGE: "logos/crypto/dogecoin.png",
    SHIB: "logos/crypto/shiba.png",
    DAI: "logos/crypto/dai.png",
    LTC: "logos/crypto/ltc.png",

    // banks
    MONO: "logos/banks/mono.png",
    PRIVAT: "logos/banks/privat.png",
    OSCHAD: "logos/banks/oschad.png",
    PUMB: "logos/banks/pumb.png",
    OTP: "logos/banks/otp.png",
    A: "logos/banks/a-bank.png",
    IZI: "logos/banks/izi.png",
    REYF: "logos/banks/reyf.png",
    SENSE: "logos/banks/sense.png",
    UKRSIB: "logos/banks/ukr-sib.png",
    VISA: "logos/banks/visa-master.png",

    // networks
    BTCNET: "logos/networks/btc.png",
    ETHNET: "logos/networks/eth.png",
    TRXNET: "logos/networks/trx.png",
    TONNET: "logos/networks/ton.png",
    SOLNET: "logos/networks/sol.png",
    BSC: "logos/networks/bsc.png",
    ERC20: "logos/networks/erc20.png",
    TRC20: "logos/networks/trc20.png",
    BEP20: "logos/networks/bep20.png",
    ARB: "logos/networks/arb.png",
    OP: "logos/networks/op.png",
    POL: "logos/networks/pol.png",
  };

  const ASSETS = [
    { id:"BTC", title:"BTC", sub:"Bitcoin (BTC)", icon:icons.BTC },
    { id:"ETH", title:"ETH", sub:"Ethereum (ETH)", icon:icons.ETH },
    { id:"USDT", title:"USDT", sub:"Tether (USDT)", icon:icons.USDT },
    { id:"USDC", title:"USDC", sub:"USD Coin (USDC)", icon:icons.USDC },
    { id:"TON", title:"TON", sub:"Toncoin (TON)", icon:icons.TON },
    { id:"TRX", title:"TRX", sub:"TRON (TRX)", icon:icons.TRX },
    { id:"SOL", title:"SOL", sub:"Solana (SOL)", icon:icons.SOL },
    { id:"BNB", title:"BNB", sub:"BNB (BNB)", icon:icons.BNB },
    { id:"XRP", title:"XRP", sub:"XRP (XRP)", icon:icons.XRP },
    { id:"ADA", title:"ADA", sub:"Cardano (ADA)", icon:icons.ADA },
    { id:"DOGE", title:"DOGE", sub:"Dogecoin (DOGE)", icon:icons.DOGE },
    { id:"SHIB", title:"SHIB", sub:"Shiba Inu (SHIB)", icon:icons.SHIB },
    { id:"DAI", title:"DAI", sub:"Dai (DAI)", icon:icons.DAI },
    { id:"LTC", title:"LTC", sub:"Litecoin (LTC)", icon:icons.LTC },
  ];

  const BANKS = [
    { id:"MONO", title:"Monobank", sub:"UAH • Card", icon:icons.MONO },
    { id:"PRIVAT", title:"ПриватБанк", sub:"UAH • Card", icon:icons.PRIVAT },
    { id:"OSCHAD", title:"Ощадбанк", sub:"UAH • Card", icon:icons.OSCHAD },
    { id:"PUMB", title:"ПУМБ", sub:"UAH • Card", icon:icons.PUMB },
    { id:"A", title:"A-Банк", sub:"UAH • Card", icon:icons.A },
    { id:"OTP", title:"OTP Bank", sub:"UAH • Card", icon:icons.OTP },
    { id:"SENSE", title:"Sense Bank", sub:"UAH • Card", icon:icons.SENSE },
    { id:"UKRSIB", title:"Укрсиббанк", sub:"UAH • Card", icon:icons.UKRSIB },
    { id:"IZI", title:"iZiBank", sub:"UAH • Card", icon:icons.IZI },
    { id:"REYF", title:"Raiffeisen", sub:"UAH • Card", icon:icons.REYF },
    { id:"VISA", title:"Visa / MasterCard", sub:"UAH • Card", icon:icons.VISA },
  ];

  const NETWORKS = [
    { id:"BTCNET", title:"BTC", sub:"Bitcoin Network", icon:icons.BTCNET },
    { id:"ETHNET", title:"ETH", sub:"Ethereum Network", icon:icons.ETHNET },
    { id:"TRXNET", title:"TRX", sub:"Tron Network", icon:icons.TRXNET },
    { id:"TONNET", title:"TON", sub:"TON Network", icon:icons.TONNET },
    { id:"SOLNET", title:"SOL", sub:"Solana Network", icon:icons.SOLNET },
    { id:"ERC20", title:"ERC20", sub:"USDT/USDC • ETH", icon:icons.ERC20 },
    { id:"TRC20", title:"TRC20", sub:"USDT/USDC • TRX", icon:icons.TRC20 },
    { id:"BEP20", title:"BEP20", sub:"USDT/USDC • BSC", icon:icons.BEP20 },
    { id:"BSC", title:"BSC", sub:"BNB Chain", icon:icons.BSC },
    { id:"ARB", title:"ARB", sub:"Arbitrum", icon:icons.ARB },
    { id:"OP", title:"OP", sub:"Optimism", icon:icons.OP },
    { id:"POL", title:"POL", sub:"Polygon", icon:icons.POL },
  ];

  const ASSET_TO_NETWORK_IDS = {
    BTC: ["BTCNET"],
    ETH: ["ETHNET", "ERC20"],
    TRX: ["TRXNET", "TRC20"],
    TON: ["TONNET"],
    SOL: ["SOLNET"],
    BNB: ["BSC", "BEP20"],
    USDT: ["TRC20", "ERC20", "BEP20", "ARB", "OP", "POL", "TONNET"],
    USDC: ["TRC20", "ERC20", "BEP20", "ARB", "OP", "POL", "TONNET"],
    XRP: ["XRP"], // no network picker match; we will fallback
    ADA: ["ADA"],
    DOGE: ["DOGE"],
    SHIB: ["ERC20", "BEP20"],
    DAI: ["ERC20"],
    LTC: ["LTC"],
  };

  // -------- UI Elements --------
  const sheetBackdrop = $("#sheetBackdrop");
  const sheet = $("#sheet");
  const sheetTitle = $("#sheetTitle");
  const sheetSearch = $("#sheetSearch");
  const sheetList = $("#sheetList");
  const sheetClose = $("#sheetClose");

  const giveCoinBtn = $("#giveCoinBtn");
  const giveNetBtn = $("#giveNetBtn");
  const getBankBtn = $("#getBankBtn");
  const langBtn = $("#langBtn");

  // If some IDs are missing, we still shouldn't crash
  const hasSheet = !!(sheetBackdrop && sheet && sheetTitle && sheetList);

  // -------- State --------
  const state = {
    lang: localStorage.getItem("ks_lang") || "UA",
    giveAsset: localStorage.getItem("ks_giveAsset") || "USDC",
    giveNet: localStorage.getItem("ks_giveNet") || "ERC20",
    getBank: localStorage.getItem("ks_getBank") || "MONO",
    sheetMode: null, // "giveAsset" | "giveNet" | "bank" | "lang"
  };

  // -------- Sheet (bottom modal) --------
  function openSheet(mode, title, items, selectedId) {
    if (!hasSheet) return;
    state.sheetMode = mode;

    sheetTitle.textContent = title;

    // search on/off: show for long lists only
    const showSearch = mode === "giveAsset" || mode === "bank";
    sheetSearch.hidden = !showSearch;
    sheetSearch.value = "";
    sheetSearch.oninput = () => renderList(items, selectedId, sheetSearch.value);

    renderList(items, selectedId, "");

    sheetBackdrop.hidden = false;
    sheetBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("noScroll");
  }

  function closeSheet() {
    if (!hasSheet) return;
    sheetBackdrop.hidden = true;
    sheetBackdrop.setAttribute("aria-hidden", "true");
    state.sheetMode = null;
    document.body.classList.remove("noScroll");
  }

  function renderList(items, selectedId, query) {
    const q = (query || "").trim().toLowerCase();
    const filtered = !q
      ? items
      : items.filter(it =>
          (it.title + " " + (it.sub || "") + " " + it.id).toLowerCase().includes(q)
        );

    sheetList.innerHTML = "";
    filtered.forEach(it => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sheetItem" + (it.id === selectedId ? " isActive" : "");
      btn.innerHTML = `
        <span class="sheetIconWrap"><img class="sheetIcon" alt="" src="${it.icon}" loading="lazy"></span>
        <span class="sheetText">
          <span class="sheetTop">${it.title}</span>
          ${it.sub ? `<span class="sheetSub">${it.sub}</span>` : ""}
        </span>
        <span class="sheetCheck" aria-hidden="true">${it.id === selectedId ? "✓" : ""}</span>
      `;
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        handleSelect(it.id);
      }, { passive:false });
      sheetList.appendChild(btn);
    });

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "sheetEmpty";
      empty.textContent = "Нічого не знайдено";
      sheetList.appendChild(empty);
    }
  }

  function handleSelect(id) {
    const mode = state.sheetMode;
    if (!mode) return;

    if (mode === "giveAsset") {
      state.giveAsset = id;
      localStorage.setItem("ks_giveAsset", id);

      // auto-fix network if not compatible
      const allowed = getNetworksForAsset(id);
      const stillOk = allowed.some(n => n.id === state.giveNet);
      if (!stillOk && allowed[0]) {
        state.giveNet = allowed[0].id;
        localStorage.setItem("ks_giveNet", state.giveNet);
      }
      syncPickers();
      closeSheet();
      return;
    }

    if (mode === "giveNet") {
      state.giveNet = id;
      localStorage.setItem("ks_giveNet", id);
      syncPickers();
      closeSheet();
      return;
    }

    if (mode === "bank") {
      state.getBank = id;
      localStorage.setItem("ks_getBank", id);
      syncPickers();
      closeSheet();
      return;
    }

    if (mode === "lang") {
      state.lang = id;
      localStorage.setItem("ks_lang", id);
      applyLang();
      closeSheet();
      return;
    }
  }

  // Close handlers (VERY important for Android WebView)
  function bindSheetClose() {
    if (!hasSheet) return;

    // Backdrop closes (tap outside)
    sheetBackdrop.addEventListener("click", (e) => {
      if (e.target === sheetBackdrop) closeSheet();
    });

    // Close button
    sheetClose && sheetClose.addEventListener("click", (e) => {
      e.preventDefault();
      closeSheet();
    });

    // Prevent backdrop clicks from blocking list clicks
    sheet.addEventListener("click", (e) => e.stopPropagation());

    // Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !sheetBackdrop.hidden) closeSheet();
    });
  }

  // -------- Picker syncing --------
  function setPicker(btn, title, sub, iconUrl) {
    if (!btn) return;
    const titleEl = $(".picker__title", btn);
    const subEl = $(".picker__sub", btn);
    const iconEl = $(".picker__icon img", btn);
    if (titleEl) titleEl.textContent = title || "";
    if (subEl) subEl.textContent = sub || "";
    if (iconEl && iconUrl) iconEl.src = iconUrl;
  }

  function getItem(list, id) {
    return list.find(x => x.id === id);
  }

  function getNetworksForAsset(assetId) {
    const ids = ASSET_TO_NETWORK_IDS[assetId] || [];
    // Map ids to known networks; ignore unknown
    const mapped = ids.map(nid => getItem(NETWORKS, nid)).filter(Boolean);
    // Fallback: if none matched, show full network list
    return mapped.length ? mapped : NETWORKS;
  }

  function syncPickers() {
    const a = getItem(ASSETS, state.giveAsset) || ASSETS[0];
    setPicker(giveCoinBtn, a.title, a.sub, a.icon);

    const nets = getNetworksForAsset(state.giveAsset);
    const n = getItem(nets, state.giveNet) || nets[0] || NETWORKS[0];
    // If current state is invalid, repair
    if (n && state.giveNet !== n.id) {
      state.giveNet = n.id;
      localStorage.setItem("ks_giveNet", n.id);
    }
    setPicker(giveNetBtn, n.title, n.sub, n.icon);

    const b = getItem(BANKS, state.getBank) || BANKS[0];
    setPicker(getBankBtn, b.title, b.sub, b.icon);
  }

  // -------- Language (simple) --------
  const LANGS = [
    { id:"UA", title:"UA", sub:"Українська", icon:"data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="32" y="0" fill="#0057B7"/><rect width="64" height="32" y="32" fill="#FFD700"/></svg>') },
    { id:"EN", title:"EN", sub:"English", icon:"data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#012169"/><path d="M0 0 L64 64 M64 0 L0 64" stroke="#FFF" stroke-width="12"/><path d="M0 0 L64 64 M64 0 L0 64" stroke="#C8102E" stroke-width="6"/><path d="M32 0 V64 M0 32 H64" stroke="#FFF" stroke-width="20"/><path d="M32 0 V64 M0 32 H64" stroke="#C8102E" stroke-width="12"/></svg>') },
  ];

  function applyLang() {
    // Keep it minimal: change labels already in HTML with ids we have.
    // Exchange screen titles
    const isEN = state.lang === "EN";
    const map = {
      titleExchange: isEN ? "Exchange" : "Обмін",
      subtitleExchange: isEN ? "Choose assets and enter amount" : "Виберіть валюту та введіть суму",
      labelGive: isEN ? "You send" : "Віддаєте",
      labelNetwork: isEN ? "Network" : "Мережа",
      labelAmount: isEN ? "Amount" : "Сума",
      labelGet: isEN ? "You receive" : "Отримуєте",
      labelCard: isEN ? "Card number" : "Номер картки",
      labelName: isEN ? "Full name" : "ПІБ",
      tabHomeText: isEN ? "Home" : "Головна",
      tabHistoryText: isEN ? "History" : "Історія",
      tabProfileText: isEN ? "Profile" : "Профіль",
      titleHistory: isEN ? "History" : "Історія",
      titleProfile: isEN ? "Profile" : "Профіль",
      sheetSearch: isEN ? "Search" : "Пошук",
    };

    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });

    // language button visual
    const flag = $(".langFlag", langBtn);
    const code = $(".langCode", langBtn);
    if (code) code.textContent = state.lang;
    if (flag) flag.textContent = state.lang === "EN" ? "🇬🇧" : "🇺🇦";
  }

  // -------- Tabs --------
  function setActiveTab(tab) {
    const screens = {
      home: $("#screenHome"),
      history: $("#screenHistory"),
      profile: $("#screenProfile"),
    };
    Object.values(screens).forEach(sc => { if (sc) sc.hidden = true; });
    if (screens[tab]) screens[tab].hidden = false;

    $$(".tabBtn").forEach(b => b.classList.toggle("isActive", b.dataset.tab === tab));
  }

  function bindTabs() {
    $$(".tabBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveTab(btn.dataset.tab);
      });
    });
  }

  // -------- Profile (Telegram user) --------
  function initProfileFromTelegram() {
    const user = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user : null;
    if (!user) return;

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
    const username = user.username ? "@" + user.username : "@user";

    const nameEl = $("#profileName");
    const userEl = $("#profileUser");
    const avatarImg = $("#avatarImg");
    const avatarText = $("#avatarText");

    if (nameEl) nameEl.textContent = fullName || "User";
    if (userEl) userEl.textContent = username;

    if (user.photo_url && avatarImg) {
      avatarImg.src = user.photo_url;
      avatarImg.hidden = false;
      if (avatarText) avatarText.hidden = true;
    } else {
      const initials = (fullName || user.first_name || "KS").split(" ").slice(0,2).map(x => x[0]).join("").toUpperCase();
      if (avatarText) avatarText.textContent = initials || "KS";
    }
  }

  // -------- Picker bindings --------
  function bindPickers() {
    giveCoinBtn && giveCoinBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSheet("giveAsset", (state.lang==="EN"?"Choose coin":"Оберіть монету"), ASSETS, state.giveAsset);
    });

    giveNetBtn && giveNetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const nets = getNetworksForAsset(state.giveAsset);
      openSheet("giveNet", (state.lang==="EN"?"Choose network":"Оберіть мережу"), nets, state.giveNet);
    });

    getBankBtn && getBankBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSheet("bank", (state.lang==="EN"?"Choose bank":"Оберіть банк"), BANKS, state.getBank);
    });

    langBtn && langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openSheet("lang", (state.lang==="EN"?"Language":"Мова"), LANGS, state.lang);
    });
  }

  // -------- Bottom nav icons monochrome --------
  function enforceMonochromeIcons() {
    // Convert emoji history icon to svg-like monochrome via CSS class
    // The HTML already uses svg for home/profile; ensure currentColor is used.
    $$(".tabBtn svg").forEach(svg => {
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
    });
  }

  // -------- Init --------
  function init() {
    bindSheetClose();
    bindPickers();
    bindTabs();
    enforceMonochromeIcons();

    applyLang();
    syncPickers();
    initProfileFromTelegram();

    // default tab home
    setActiveTab("home");
    // ensure sheet is closed on load
    closeSheet();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once:true });
  } else {
    init();
  }
})();
