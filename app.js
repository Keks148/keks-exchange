/* KeksSwap Mini App (UI-only demo)
   - Works offline / on GitHub Pages
   - Stores profile + history in localStorage
   - Adapts for Telegram WebApp if available
*/
(function () {
  const TG = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  // -----------------------------
  // Assets (auto from folder list is not possible without build step)
  // Keep this list in sync with your /logos folders.
  // -----------------------------
  const BANKS = [
    { id: "mono", name: "Monobank", icon: "logos/banks/mono.png", currency: "UAH", kind: "bank" },
    { id: "privat", name: "PrivatBank", icon: "logos/banks/privat.png", currency: "UAH", kind: "bank" },
    { id: "oschad", name: "Oschadbank", icon: "logos/banks/oschad.png", currency: "UAH", kind: "bank" },
    { id: "pumb", name: "PUMB", icon: "logos/banks/pumb.png", currency: "UAH", kind: "bank" },
    { id: "abank", name: "A-Bank", icon: "logos/banks/a-bank.png", currency: "UAH", kind: "bank" },
    { id: "otp", name: "OTP Bank", icon: "logos/banks/otp.png", currency: "UAH", kind: "bank" },
    { id: "raif", name: "Raiffeisen", icon: "logos/banks/raif.png", currency: "UAH", kind: "bank" },
    { id: "sense", name: "Sense Bank", icon: "logos/banks/sense.png", currency: "UAH", kind: "bank" },
    { id: "ukrsib", name: "Ukrsibbank", icon: "logos/banks/u-sib.png", currency: "UAH", kind: "bank" },
  ].filter(x => x.icon);

  const CRYPTO = [
    { id: "usdt", name: "Tether", symbol: "USDT", icon: "logos/crypto/usdt.png", kind: "crypto" },
    { id: "usdc", name: "USD Coin", symbol: "USDC", icon: "logos/crypto/usdc.png", kind: "crypto" },
    { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "logos/crypto/btc.png", kind: "crypto" },
    { id: "eth", name: "Ethereum", symbol: "ETH", icon: "logos/crypto/eth.png", kind: "crypto" },
    { id: "ltc", name: "Litecoin", symbol: "LTC", icon: "logos/crypto/ltc.png", kind: "crypto" },
    { id: "sol", name: "Solana", symbol: "SOL", icon: "logos/crypto/sol.png", kind: "crypto" },
    { id: "ton", name: "Toncoin", symbol: "TON", icon: "logos/crypto/ton.png", kind: "crypto" },
    { id: "trx", name: "Tron", symbol: "TRX", icon: "logos/crypto/trx.png", kind: "crypto" },
    { id: "bnb", name: "BNB", symbol: "BNB", icon: "logos/crypto/bnb.png", kind: "crypto" },
    { id: "xrp", name: "XRP", symbol: "XRP", icon: "logos/crypto/xrp.png", kind: "crypto" },
    { id: "doge", name: "Dogecoin", symbol: "DOGE", icon: "logos/crypto/doge.png", kind: "crypto" },
    { id: "ada", name: "Cardano", symbol: "ADA", icon: "logos/crypto/ada.png", kind: "crypto" },
    { id: "pol", name: "Polygon", symbol: "POL", icon: "logos/crypto/pol.png", kind: "crypto" },
    { id: "dot", name: "Polkadot", symbol: "DOT", icon: "logos/crypto/dot.png", kind: "crypto" },
    { id: "shib", name: "Shiba Inu", symbol: "SHIB", icon: "logos/crypto/shib.png", kind: "crypto" },
  ].filter(x => x.icon);

  const NETWORKS = {
    USDT: [
      { id: "TRC20", title: "TRC20", sub: "USDT • TRX" },
      { id: "ERC20", title: "ERC20", sub: "USDT • ETH" },
      { id: "BEP20", title: "BEP20", sub: "USDT • BSC" },
      { id: "TON", title: "TON", sub: "USDT • TON" },
    ],
    USDC: [
      { id: "ERC20", title: "ERC20", sub: "USDC • ETH" },
      { id: "BEP20", title: "BEP20", sub: "USDC • BSC" },
      { id: "SOL", title: "SOL", sub: "USDC • SOL" },
      { id: "TRC20", title: "TRC20", sub: "USDC • TRX" },
    ],
    BTC: [{ id: "BTC", title: "BTC", sub: "Bitcoin Network" }],
    ETH: [{ id: "ERC20", title: "ERC20", sub: "Ethereum" }],
    LTC: [{ id: "LTC", title: "LTC", sub: "Litecoin Network" }],
    SOL: [{ id: "SOL", title: "SOL", sub: "Solana" }],
    TON: [{ id: "TON", title: "TON", sub: "TON" }],
    TRX: [{ id: "TRC20", title: "TRC20", sub: "Tron" }],
    BNB: [{ id: "BEP20", title: "BEP20", sub: "BNB Smart Chain" }],
    XRP: [{ id: "XRP", title: "XRP", sub: "XRP Ledger" }],
    DOGE: [{ id: "DOGE", title: "DOGE", sub: "Dogecoin" }],
    ADA: [{ id: "ADA", title: "ADA", sub: "Cardano" }],
    POL: [{ id: "POL", title: "POL", sub: "Polygon" }],
    DOT: [{ id: "DOT", title: "DOT", sub: "Polkadot" }],
    SHIB: [{ id: "ERC20", title: "ERC20", sub: "Ethereum" }],
  };

  const ALL_ASSETS = [
    // Banks first (UAH on-ramp)
    ...BANKS.map(b => ({ ...b, title: b.name, sub: `${b.currency} • Card` })),
    ...CRYPTO.map(c => ({ ...c, title: `${c.name} (${c.symbol})`, sub: c.symbol })),
  ];

  // -----------------------------
  // i18n
  // -----------------------------
  const I18N = {
    ua: {
      exchange_title: "Обмін",
      exchange_sub: "Виберіть валюту та введіть суму",
      send: "Віддаєте",
      receive: "Отримуєте",
      amount: "Сума",
      network: "Мережа",
      you_get: "Ви отримаєте",
      create: "Створити заявку",
      history_title: "Історія",
      history_sub: "Ваші заявки на обмін",
      history_empty_title: "Поки що заявок немає",
      history_empty_sub: "Створіть першу на вкладці «Головна».",
      nav_home: "Головна",
      nav_history: "Історія",
      nav_profile: "Профіль",
      card_number: "Номер картки",
      fullname: "ПІБ",
      wallet: "Адреса гаманця",
      change_avatar: "Змінити",
      contacts: "Контакти",
      email: "Email",
      phone: "Телефон",
      profile_settings: "Налаштування",
      account_currency: "Валюта акаунта",
      saved_details: "Збережені реквізити",
      security: "Безпека",
      support: "Підтримка",
      save: "Зберегти",
      pick_asset: "Виберіть валюту",
      pick_network: "Оберіть мережу",
      search: "Пошук",
      hint_ready: "Підказка: введіть суму та створіть заявку — вона з’явиться в історії.",
      toast_saved: "Збережено ✅",
      toast_need_amount: "Введіть суму",
      toast_pick: "Оберіть «Віддаєте» та «Отримуєте»",
      toast_need_card: "Заповніть номер картки та ПІБ",
      toast_need_wallet: "Вкажіть адресу гаманця",
    },
    en: {
      exchange_title: "Exchange",
      exchange_sub: "Choose assets and enter amount",
      send: "You send",
      receive: "You receive",
      amount: "Amount",
      network: "Network",
      you_get: "You will get",
      create: "Create request",
      history_title: "History",
      history_sub: "Your exchange requests",
      history_empty_title: "No requests yet",
      history_empty_sub: "Create the first one on Home.",
      nav_home: "Home",
      nav_history: "History",
      nav_profile: "Profile",
      card_number: "Card number",
      fullname: "Full name",
      wallet: "Wallet address",
      change_avatar: "Change",
      contacts: "Contacts",
      email: "Email",
      phone: "Phone",
      profile_settings: "Settings",
      account_currency: "Account currency",
      saved_details: "Saved details",
      security: "Security",
      support: "Support",
      save: "Save",
      pick_asset: "Choose asset",
      pick_network: "Choose network",
      search: "Search",
      hint_ready: "Tip: enter amount and create a request — it will appear in History.",
      toast_saved: "Saved ✅",
      toast_need_amount: "Enter amount",
      toast_pick: "Pick send & receive assets",
      toast_need_card: "Fill card number & full name",
      toast_need_wallet: "Provide wallet address",
    },
    tr: {
      exchange_title: "Değişim",
      exchange_sub: "Varlıkları seçin ve tutarı girin",
      send: "Gönderiyorsunuz",
      receive: "Alıyorsunuz",
      amount: "Tutar",
      network: "Ağ",
      you_get: "Alacağınız",
      create: "Talep oluştur",
      history_title: "Geçmiş",
      history_sub: "Değişim talepleriniz",
      history_empty_title: "Henüz talep yok",
      history_empty_sub: "İlkini Ana Sayfa'da oluşturun.",
      nav_home: "Ana",
      nav_history: "Geçmiş",
      nav_profile: "Profil",
      card_number: "Kart numarası",
      fullname: "Ad Soyad",
      wallet: "Cüzdan adresi",
      change_avatar: "Değiştir",
      contacts: "İletişim",
      email: "Email",
      phone: "Telefon",
      profile_settings: "Ayarlar",
      account_currency: "Hesap para birimi",
      saved_details: "Kayıtlı bilgiler",
      security: "Güvenlik",
      support: "Destek",
      save: "Kaydet",
      pick_asset: "Varlık seçin",
      pick_network: "Ağ seçin",
      search: "Ara",
      hint_ready: "İpucu: tutarı girin ve talep oluşturun — Geçmiş'te görünür.",
      toast_saved: "Kaydedildi ✅",
      toast_need_amount: "Tutar girin",
      toast_pick: "Gönder/al varlıklarını seçin",
      toast_need_card: "Kart numarası ve ad soyadı doldurun",
      toast_need_wallet: "Cüzdan adresi girin",
    },
    pl: {
      exchange_title: "Wymiana",
      exchange_sub: "Wybierz aktywa i wpisz kwotę",
      send: "Wysyłasz",
      receive: "Otrzymujesz",
      amount: "Kwota",
      network: "Sieć",
      you_get: "Otrzymasz",
      create: "Utwórz zlecenie",
      history_title: "Historia",
      history_sub: "Twoje zlecenia wymiany",
      history_empty_title: "Brak zleceń",
      history_empty_sub: "Utwórz pierwsze na stronie Głównej.",
      nav_home: "Główna",
      nav_history: "Historia",
      nav_profile: "Profil",
      card_number: "Numer karty",
      fullname: "Imię i nazwisko",
      wallet: "Adres portfela",
      change_avatar: "Zmień",
      contacts: "Kontakt",
      email: "Email",
      phone: "Telefon",
      profile_settings: "Ustawienia",
      account_currency: "Waluta konta",
      saved_details: "Zapisane dane",
      security: "Bezpieczeństwo",
      support: "Wsparcie",
      save: "Zapisz",
      pick_asset: "Wybierz aktywo",
      pick_network: "Wybierz sieć",
      search: "Szukaj",
      hint_ready: "Wskazówka: wpisz kwotę i utwórz zlecenie — pojawi się w Historii.",
      toast_saved: "Zapisano ✅",
      toast_need_amount: "Wpisz kwotę",
      toast_pick: "Wybierz aktywa wysyłasz/otrzymujesz",
      toast_need_card: "Uzupełnij numer karty i dane",
      toast_need_wallet: "Podaj adres portfela",
    },
  };

  const LANGS = [
    { id: "ua", code: "UA", flag: "🇺🇦" },
    { id: "en", code: "EN", flag: "🇬🇧" },
    { id: "tr", code: "TR", flag: "🇹🇷" },
    { id: "pl", code: "PL", flag: "🇵🇱" },
  ];

  // -----------------------------
  // State
  // -----------------------------
  const storage = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch { return fallback; }
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const state = {
    lang: storage.get("ks.lang", "ua"),
    sendAsset: storage.get("ks.sendAsset", null),
    recvAsset: storage.get("ks.recvAsset", null),
    sendNet: storage.get("ks.sendNet", null),
    recvNet: storage.get("ks.recvNet", null),
    amount: "",
    profile: storage.get("ks.profile", { email: "", phone: "", avatarData: null, currency: "UAH" }),
    history: storage.get("ks.history", []),
  };

  // -----------------------------
  // DOM
  // -----------------------------
  const $ = (id) => document.getElementById(id);

  const el = {
    langBtn: $("langBtn"),
    langFlag: $("langFlag"),
    langCode: $("langCode"),

    sendAssetBtn: $("sendAssetBtn"),
    recvAssetBtn: $("recvAssetBtn"),

    sendIcon: $("sendIcon"),
    sendTitle: $("sendTitle"),
    sendSub: $("sendSub"),

    recvIcon: $("recvIcon"),
    recvTitle: $("recvTitle"),
    recvSub: $("recvSub"),

    sendNetWrap: $("sendNetWrap"),
    recvNetWrap: $("recvNetWrap"),
    sendNetBtn: $("sendNetBtn"),
    recvNetBtn: $("recvNetBtn"),
    sendNetBadge: $("sendNetBadge"),
    sendNetTitle: $("sendNetTitle"),
    sendNetSub: $("sendNetSub"),
    recvNetBadge: $("recvNetBadge"),
    recvNetTitle: $("recvNetTitle"),
    recvNetSub: $("recvNetSub"),

    recvCardWrap: $("recvCardWrap"),
    cardNumber: $("cardNumber"),
    fullName: $("fullName"),

    recvWalletWrap: $("recvWalletWrap"),
    walletAddress: $("walletAddress"),

    amountInput: $("amountInput"),
    amountUnit: $("amountUnit"),

    swapBtn: $("swapBtn"),
    createBtn: $("createBtn"),
    youGet: $("youGet"),
    hintText: $("hintText"),

    historyList: $("historyList"),
    historyEmpty: $("historyEmpty"),

    avatar: $("avatar"),
    avatarInput: $("avatarInput"),
    emailInput: $("emailInput"),
    phoneInput: $("phoneInput"),
    saveProfileBtn: $("saveProfileBtn"),
    currencyValue: $("currencyValue"),

    // sheet
    sheet: $("sheet"),
    sheetTitle: $("sheetTitle"),
    sheetClose: $("sheetClose"),
    sheetX: $("sheetX"),
    sheetSearch: $("sheetSearch"),
    sheetList: $("sheetList"),
  };

  // i18n targets
  const txt = {
    exchange_title: $("t_exchange_title"),
    exchange_sub: $("t_exchange_sub"),
    send: $("t_send"),
    receive: $("t_receive"),
    amount: $("t_amount"),
    network: $("t_network"),
    network2: $("t_network2"),
    you_get: $("t_you_get"),
    create: $("t_create"),
    history_title: $("t_history_title"),
    history_sub: $("t_history_sub"),
    history_empty_title: $("t_history_empty_title"),
    history_empty_sub: $("t_history_empty_sub"),
    nav_home: $("t_nav_home"),
    nav_history: $("t_nav_history"),
    nav_profile: $("t_nav_profile"),
    card_number: $("t_card_number"),
    fullname: $("t_fullname"),
    wallet: $("t_wallet"),
    change_avatar: $("t_change_avatar"),
    contacts: $("t_profile_contacts"),
    email: $("t_email"),
    phone: $("t_phone"),
    profile_settings: $("t_profile_settings"),
    account_currency: $("t_account_currency"),
    saved_details: $("t_saved_details"),
    security: $("t_security"),
    support: $("t_support"),
    save: $("t_save"),
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  function t(key) {
    const pack = I18N[state.lang] || I18N.ua;
    return pack[key] ?? I18N.ua[key] ?? key;
  }

  function toast(message) {
    // lightweight toast
    const n = document.createElement("div");
    n.textContent = message;
    n.style.position = "fixed";
    n.style.left = "50%";
    n.style.bottom = "92px";
    n.style.transform = "translateX(-50%)";
    n.style.background = "rgba(13,27,42,.92)";
    n.style.color = "white";
    n.style.padding = "10px 12px";
    n.style.borderRadius = "14px";
    n.style.fontWeight = "900";
    n.style.fontSize = "13px";
    n.style.zIndex = "999";
    n.style.maxWidth = "92vw";
    n.style.textAlign = "center";
    document.body.appendChild(n);
    setTimeout(() => n.style.opacity = "0", 1400);
    setTimeout(() => n.remove(), 1900);
  }

  function formatAmount(v) {
    const s = String(v || "").replace(",", ".").replace(/[^0-9.]/g, "");
    // keep one dot
    const parts = s.split(".");
    if (parts.length <= 1) return parts[0];
    return parts[0] + "." + parts.slice(1).join("").slice(0, 8);
  }

  function getNetworksFor(asset) {
    if (!asset || asset.kind !== "crypto") return [];
    return NETWORKS[asset.symbol] || [{ id: asset.symbol, title: asset.symbol, sub: asset.name }];
  }

  function setImgSafe(imgEl, src) {
    imgEl.src = src || "";
    imgEl.onerror = () => {
      imgEl.style.opacity = "0";
    };
    imgEl.style.opacity = "1";
  }

  function isBank(a) { return a && a.kind === "bank"; }
  function isCrypto(a) { return a && a.kind === "crypto"; }

  // -----------------------------
  // Sheet (bottom picker)
  // -----------------------------
  let sheetContext = null; // { type:'asset'|'net', side:'send'|'recv', list:[...], onPick(item) }

  function openSheet({ title, placeholder, list, onPick }) {
    sheetContext = { list, onPick };
    el.sheetTitle.textContent = title;
    el.sheetSearch.placeholder = placeholder;
    el.sheetSearch.value = "";
    renderSheetList(list);
    el.sheet.classList.remove("sheet--hidden");
    el.sheet.setAttribute("aria-hidden", "false");
    setTimeout(() => el.sheetSearch.focus(), 60);
  }

  function closeSheet() {
    el.sheet.classList.add("sheet--hidden");
    el.sheet.setAttribute("aria-hidden", "true");
    sheetContext = null;
  }

  function renderSheetList(list) {
    const q = (el.sheetSearch.value || "").trim().toLowerCase();
    const filtered = !q ? list : list.filter(it =>
      (it.title || it.name || "").toLowerCase().includes(q) ||
      (it.sub || it.symbol || "").toLowerCase().includes(q)
    );

    el.sheetList.innerHTML = "";
    filtered.forEach(it => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "sheet-row";

      const left = document.createElement("div");
      left.className = "sheet-row-left";

      if (it.icon) {
        const img = document.createElement("img");
        img.className = "icon";
        img.alt = "";
        img.src = it.icon;
        left.appendChild(img);
      } else {
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = it.id || "—";
        left.appendChild(badge);
      }

      const text = document.createElement("div");
      text.style.minWidth = "0";
      const title = document.createElement("div");
      title.className = "sheet-row-title";
      title.textContent = it.title || it.name || it.id;
      const sub = document.createElement("div");
      sub.className = "sheet-row-sub";
      sub.textContent = it.sub || it.symbol || "";
      text.appendChild(title);
      text.appendChild(sub);
      left.appendChild(text);

      const arrow = document.createElement("span");
      arrow.textContent = "›";
      arrow.style.fontWeight = "1000";
      arrow.style.opacity = ".55";

      row.appendChild(left);
      row.appendChild(arrow);

      row.addEventListener("click", () => {
        if (sheetContext && sheetContext.onPick) sheetContext.onPick(it);
        closeSheet();
      });

      el.sheetList.appendChild(row);
    });
  }

  el.sheetClose.addEventListener("click", closeSheet);
  el.sheetX.addEventListener("click", closeSheet);
  el.sheetSearch.addEventListener("input", () => {
    if (sheetContext) renderSheetList(sheetContext.list);
  });

  // -----------------------------
  // UI rendering
  // -----------------------------
  function applyLang() {
    const L = LANGS.find(x => x.id === state.lang) || LANGS[0];
    el.langFlag.textContent = L.flag;
    el.langCode.textContent = L.code;

    // labels
    txt.exchange_title.textContent = t("exchange_title");
    txt.exchange_sub.textContent = t("exchange_sub");
    txt.send.textContent = t("send");
    txt.receive.textContent = t("receive");
    txt.amount.textContent = t("amount");
    txt.network.textContent = t("network");
    txt.network2.textContent = t("network");
    txt.you_get.textContent = t("you_get");
    txt.create.textContent = t("create");
    txt.history_title.textContent = t("history_title");
    txt.history_sub.textContent = t("history_sub");
    txt.history_empty_title.textContent = t("history_empty_title");
    txt.history_empty_sub.textContent = t("history_empty_sub");
    txt.nav_home.textContent = t("nav_home");
    txt.nav_history.textContent = t("nav_history");
    txt.nav_profile.textContent = t("nav_profile");
    txt.card_number.textContent = t("card_number");
    txt.fullname.textContent = t("fullname");
    txt.wallet.textContent = t("wallet");
    txt.change_avatar.textContent = t("change_avatar");
    txt.contacts.textContent = t("contacts");
    txt.email.textContent = t("email");
    txt.phone.textContent = t("phone");
    txt.profile_settings.textContent = t("profile_settings");
    txt.account_currency.textContent = t("account_currency");
    txt.saved_details.textContent = t("saved_details");
    txt.security.textContent = t("security");
    txt.support.textContent = t("support");
    txt.save.textContent = t("save");

    el.hintText.textContent = t("hint_ready");
    el.sheetSearch.placeholder = t("search");

    // placeholders
    el.cardNumber.placeholder = "0000 0000 0000 0000";
    el.fullName.placeholder = state.lang === "ua" ? "Ім'я Прізвище" : (state.lang === "tr" ? "Ad Soyad" : state.lang === "pl" ? "Imię Nazwisko" : "Full name");
    el.walletAddress.placeholder = "0x... / T... / ...";
  }

  function renderAsset(side) {
    const a = side === "send" ? state.sendAsset : state.recvAsset;
    const icon = side === "send" ? el.sendIcon : el.recvIcon;
    const title = side === "send" ? el.sendTitle : el.recvTitle;
    const sub = side === "send" ? el.sendSub : el.recvSub;

    if (!a) {
      setImgSafe(icon, "");
      icon.style.opacity = "0";
      title.textContent = "—";
      sub.textContent = "—";
      return;
    }
    setImgSafe(icon, a.icon);
    title.textContent = a.title;
    sub.textContent = a.sub;
  }

  function renderNetworks() {
    // send net visible only if send asset is crypto
    const sendCrypto = isCrypto(state.sendAsset);
    el.sendNetWrap.classList.toggle("field--hidden", !sendCrypto);

    if (sendCrypto) {
      const nets = getNetworksFor(state.sendAsset);
      if (!state.sendNet || !nets.find(n => n.id === state.sendNet.id)) {
        state.sendNet = nets[0];
        storage.set("ks.sendNet", state.sendNet);
      }
      el.sendNetBadge.textContent = state.sendNet.id;
      el.sendNetTitle.textContent = state.sendNet.title;
      el.sendNetSub.textContent = state.sendNet.sub;
    }

    // recv net visible only if recv asset is crypto
    const recvCrypto = isCrypto(state.recvAsset);
    el.recvNetWrap.classList.toggle("field--hidden", !recvCrypto);

    if (recvCrypto) {
      const nets = getNetworksFor(state.recvAsset);
      if (!state.recvNet || !nets.find(n => n.id === state.recvNet.id)) {
        state.recvNet = nets[0];
        storage.set("ks.recvNet", state.recvNet);
      }
      el.recvNetBadge.textContent = state.recvNet.id;
      el.recvNetTitle.textContent = state.recvNet.title;
      el.recvNetSub.textContent = state.recvNet.sub;
    }

    // receive card fields only if receive is bank
    const recvBank = isBank(state.recvAsset);
    el.recvCardWrap.classList.toggle("field--hidden", !recvBank);

    // receive wallet field only if receive is crypto
    el.recvWalletWrap.classList.toggle("field--hidden", !recvCrypto);
  }

  function recalc() {
    const amount = parseFloat(state.amount || "0");
    if (!amount || amount <= 0) {
      el.youGet.textContent = "0";
      return;
    }

    // UI-only: just show same amount for now
    // Later you can integrate real rate from backend.
    el.youGet.textContent = String(amount);
  }

  function renderHistory() {
    const list = state.history || [];
    el.historyList.innerHTML = "";
    if (!list.length) {
      el.historyEmpty.style.display = "block";
      return;
    }
    el.historyEmpty.style.display = "none";

    list.slice().reverse().forEach(item => {
      const wrap = document.createElement("div");
      wrap.className = "item";

      const top = document.createElement("div");
      top.className = "item-top";

      const title = document.createElement("div");
      title.className = "item-title";
      title.textContent = item.title;

      const date = document.createElement("div");
      date.className = "item-date";
      date.textContent = item.date;

      top.appendChild(title);
      top.appendChild(date);

      const row1 = document.createElement("div");
      row1.className = "item-row";
      row1.textContent = item.details;

      const badge = document.createElement("div");
      badge.className = "item-badge";
      badge.textContent = item.status;

      wrap.appendChild(top);
      wrap.appendChild(row1);
      wrap.appendChild(badge);
      el.historyList.appendChild(wrap);
    });
  }

  function renderProfile() {
    const p = state.profile || {};
    el.emailInput.value = p.email || "";
    el.phoneInput.value = p.phone || "";
    el.currencyValue.textContent = p.currency || "UAH";

    // avatar
    if (p.avatarData) {
      el.avatar.textContent = "";
      el.avatar.style.backgroundImage = `url(${p.avatarData})`;
      el.avatar.style.backgroundSize = "cover";
      el.avatar.style.backgroundPosition = "center";
    } else {
      el.avatar.style.backgroundImage = "none";
      el.avatar.textContent = "KS";
    }
  }

  // -----------------------------
  // Page nav
  // -----------------------------
  function setPage(page) {
    document.querySelectorAll(".page").forEach(p => {
      p.classList.toggle("page--active", p.dataset.page === page);
    });
    document.querySelectorAll(".nav-item").forEach(b => {
      b.classList.toggle("nav-item--active", b.dataset.nav === page);
    });
  }

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => setPage(btn.dataset.nav));
  });

  // -----------------------------
  // Events
  // -----------------------------
  el.langBtn.addEventListener("click", () => {
    openSheet({
      title: "Language",
      placeholder: t("search"),
      list: LANGS.map(x => ({ id: x.id, title: x.code, sub: x.id.toUpperCase(), icon: null, flag: x.flag })),
      onPick: (it) => {
        state.lang = it.id;
        storage.set("ks.lang", state.lang);
        applyLang();
        renderHistory(); // text might change
      }
    });

    // render custom rows with flags
    // after open, replace list with custom UI
    el.sheetList.innerHTML = "";
    LANGS.forEach(x => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "sheet-row";

      const left = document.createElement("div");
      left.className = "sheet-row-left";

      const badge = document.createElement("div");
      badge.className = "badge";
      badge.textContent = x.flag;
      badge.style.fontSize = "16px";
      badge.style.letterSpacing = "0";
      left.appendChild(badge);

      const text = document.createElement("div");
      text.style.minWidth = "0";
      const title = document.createElement("div");
      title.className = "sheet-row-title";
      title.textContent = x.code;
      const sub = document.createElement("div");
      sub.className = "sheet-row-sub";
      sub.textContent = x.id.toUpperCase();
      text.appendChild(title);
      text.appendChild(sub);
      left.appendChild(text);

      const arrow = document.createElement("span");
      arrow.textContent = "›";
      arrow.style.fontWeight = "1000";
      arrow.style.opacity = ".55";

      row.appendChild(left);
      row.appendChild(arrow);

      row.addEventListener("click", () => {
        state.lang = x.id;
        storage.set("ks.lang", state.lang);
        applyLang();
        closeSheet();
      });

      el.sheetList.appendChild(row);
    });
  });

  el.sendAssetBtn.addEventListener("click", () => {
    openSheet({
      title: t("pick_asset"),
      placeholder: t("search"),
      list: ALL_ASSETS,
      onPick: (asset) => {
        state.sendAsset = asset;
        storage.set("ks.sendAsset", asset);
        // reset sendNet if needed
        state.sendNet = null;
        storage.set("ks.sendNet", state.sendNet);
        renderAsset("send");
        renderNetworks();
        el.amountUnit.textContent = isBank(asset) ? (state.profile.currency || "UAH") : (asset.symbol || "—");
      }
    });
  });

  el.recvAssetBtn.addEventListener("click", () => {
    openSheet({
      title: t("pick_asset"),
      placeholder: t("search"),
      list: ALL_ASSETS,
      onPick: (asset) => {
        state.recvAsset = asset;
        storage.set("ks.recvAsset", asset);
        state.recvNet = null;
        storage.set("ks.recvNet", state.recvNet);
        renderAsset("recv");
        renderNetworks();
      }
    });
  });

  el.sendNetBtn.addEventListener("click", () => {
    const nets = getNetworksFor(state.sendAsset);
    openSheet({
      title: t("pick_network"),
      placeholder: t("search"),
      list: nets.map(n => ({ ...n, title: n.title, sub: n.sub, icon: null })),
      onPick: (net) => {
        state.sendNet = net;
        storage.set("ks.sendNet", net);
        renderNetworks();
      }
    });
  });

  el.recvNetBtn.addEventListener("click", () => {
    const nets = getNetworksFor(state.recvAsset);
    openSheet({
      title: t("pick_network"),
      placeholder: t("search"),
      list: nets.map(n => ({ ...n, title: n.title, sub: n.sub, icon: null })),
      onPick: (net) => {
        state.recvNet = net;
        storage.set("ks.recvNet", net);
        renderNetworks();
      }
    });
  });

  el.amountInput.addEventListener("input", (e) => {
    state.amount = formatAmount(e.target.value);
    e.target.value = state.amount;
    storage.set("ks.amount", state.amount);
    recalc();
  });

  el.swapBtn.addEventListener("click", () => {
    const a = state.sendAsset;
    const b = state.recvAsset;
    state.sendAsset = b;
    state.recvAsset = a;
    state.sendNet = null;
    state.recvNet = null;
    storage.set("ks.sendAsset", state.sendAsset);
    storage.set("ks.recvAsset", state.recvAsset);
    storage.set("ks.sendNet", state.sendNet);
    storage.set("ks.recvNet", state.recvNet);

    renderAsset("send");
    renderAsset("recv");
    renderNetworks();

    // unit
    el.amountUnit.textContent = state.sendAsset
      ? (isBank(state.sendAsset) ? (state.profile.currency || "UAH") : state.sendAsset.symbol)
      : "—";
  });

  el.createBtn.addEventListener("click", () => {
    if (!state.sendAsset || !state.recvAsset) return toast(t("toast_pick"));
    const amount = parseFloat(state.amount || "0");
    if (!amount || amount <= 0) return toast(t("toast_need_amount"));

    // validations:
    if (isBank(state.recvAsset)) {
      const cn = (el.cardNumber.value || "").replace(/\s/g, "");
      const fn = (el.fullName.value || "").trim();
      if (cn.length < 12 || fn.length < 3) return toast(t("toast_need_card"));
    }
    if (isCrypto(state.recvAsset)) {
      const wa = (el.walletAddress.value || "").trim();
      if (wa.length < 6) return toast(t("toast_need_wallet"));
    }

    const sendPart = isBank(state.sendAsset)
      ? `${state.sendAsset.name} (${state.profile.currency || "UAH"})`
      : `${state.sendAsset.symbol}${state.sendNet ? " • " + state.sendNet.id : ""}`;

    const recvPart = isBank(state.recvAsset)
      ? `${state.recvAsset.name} (${state.profile.currency || "UAH"})`
      : `${state.recvAsset.symbol}${state.recvNet ? " • " + state.recvNet.id : ""}`;

    const title = `${amount} → ${recvPart}`;
    const details = `${sendPart}  →  ${recvPart}`;

    const item = {
      id: String(Date.now()),
      title,
      details,
      status: "Pending",
      date: new Date().toLocaleString(),
      amount,
      send: state.sendAsset,
      recv: state.recvAsset,
      sendNet: state.sendNet,
      recvNet: state.recvNet,
    };

    state.history = state.history || [];
    state.history.push(item);
    storage.set("ks.history", state.history);

    toast("OK ✅");
    renderHistory();
    setPage("history");
  });

  // profile save
  el.saveProfileBtn.addEventListener("click", () => {
    state.profile.email = (el.emailInput.value || "").trim();
    state.profile.phone = (el.phoneInput.value || "").trim();
    storage.set("ks.profile", state.profile);
    toast(t("toast_saved"));
  });

  // avatar upload
  el.avatarInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file, 240);
    state.profile.avatarData = dataUrl;
    storage.set("ks.profile", state.profile);
    renderProfile();
    toast(t("toast_saved"));
  });

  function fileToDataURL(file, maxSize) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => { img.src = reader.result; };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      reader.readAsDataURL(file);
    });
  }

  // -----------------------------
  // Init Telegram WebApp
  // -----------------------------
  function initTelegram() {
    if (!TG) return;
    try {
      TG.ready();
      TG.expand();
      TG.setHeaderColor("#e9f6ff");
      TG.setBackgroundColor("#e9f6ff");

      const u = TG.initDataUnsafe && TG.initDataUnsafe.user ? TG.initDataUnsafe.user : null;
      if (u) {
        const username = u.username ? "@" + u.username : (u.first_name || "@user");
        const level = u.is_premium ? "Premium" : (state.lang === "ua" ? "Новачок" : "Newbie");
        document.getElementById("profileName").textContent = username;
        document.getElementById("profileLevel").textContent = level;

        // avatar fallback initials
        if (!state.profile.avatarData) {
          const initials = (u.first_name || "K").slice(0,1) + (u.last_name || "S").slice(0,1);
          el.avatar.textContent = initials.toUpperCase();
        }
      }
    } catch {}
  }

  // -----------------------------
  // Boot
  // -----------------------------
  function boot() {
    // restore amount
    const storedAmount = storage.get("ks.amount", "");
    if (storedAmount) {
      state.amount = storedAmount;
      el.amountInput.value = storedAmount;
    }

    // default assets if empty
    if (!state.sendAsset) state.sendAsset = CRYPTO[0]; // USDT
    if (!state.recvAsset) state.recvAsset = BANKS[0] || CRYPTO[1] || CRYPTO[0]; // UAH card

    // persist defaults
    storage.set("ks.sendAsset", state.sendAsset);
    storage.set("ks.recvAsset", state.recvAsset);

    // Render
    applyLang();
    renderAsset("send");
    renderAsset("recv");
    renderNetworks();
    el.amountUnit.textContent = isBank(state.sendAsset) ? (state.profile.currency || "UAH") : (state.sendAsset.symbol || "—");

    renderHistory();
    renderProfile();
    recalc();

    initTelegram();
  }

  boot();
})();
