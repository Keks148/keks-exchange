/* ========= DATA ========= */
const ICONS = {
  crypto: {
    BTC: "logos/crypto/btc.png",
    ETH: "logos/crypto/eth.png",
    LTC: "logos/crypto/ltc.png",
    SOL: "logos/crypto/sol.png",
    TON: "logos/crypto/ton.png",
    TRX: "logos/crypto/trx.png",
    USDC: "logos/crypto/usdc.png",
    USDT: "logos/crypto/tether-usdt.png"
  },
  networks: {
    ERC20: "logos/networks/erc20.png",
    TRC20: "logos/networks/trc20.png",
    BEP20: "logos/networks/bep20.png",
    TON:  "logos/networks/ton.png",
    SOL:  "logos/networks/sol.png",
    POL:  "logos/networks/pol.png",
    ARB:  "logos/networks/arb.png",
    OP:   "logos/networks/op.png",
    BTC:  "logos/crypto/btc.png",
    LTC:  "logos/crypto/ltc.png"
  }
};

const COIN_NETWORKS = {
  USDT: ["TRC20","ERC20","BEP20","TON"],
  USDC: ["ERC20","TRC20","BEP20","POL","ARB","OP"],
  ETH:  ["ERC20","ARB","OP","POL"],
  BTC:  ["BTC"],
  SOL:  ["SOL"],
  TON:  ["TON"],
  TRX:  ["TRC20"],
  LTC:  ["LTC"]
};

const ASSETS = [
  { type:"crypto", code:"BTC",  name:{UA:"Bitcoin", EN:"Bitcoin", TR:"Bitcoin", PL:"Bitcoin"}, sub:"BTC" },
  { type:"crypto", code:"ETH",  name:{UA:"Ethereum", EN:"Ethereum", TR:"Ethereum", PL:"Ethereum"}, sub:"ETH" },
  { type:"crypto", code:"LTC",  name:{UA:"Litecoin", EN:"Litecoin", TR:"Litecoin", PL:"Litecoin"}, sub:"LTC" },
  { type:"crypto", code:"TRX",  name:{UA:"Tron", EN:"Tron", TR:"Tron", PL:"Tron"}, sub:"TRX" },
  { type:"crypto", code:"SOL",  name:{UA:"Solana", EN:"Solana", TR:"Solana", PL:"Solana"}, sub:"SOL" },
  { type:"crypto", code:"TON",  name:{UA:"Toncoin", EN:"Toncoin", TR:"Toncoin", PL:"Toncoin"}, sub:"TON" },
  { type:"crypto", code:"USDT", name:{UA:"Tether", EN:"Tether", TR:"Tether", PL:"Tether"}, sub:"USDT" },
  { type:"crypto", code:"USDC", name:{UA:"USD Coin", EN:"USD Coin", TR:"USD Coin", PL:"USD Coin"}, sub:"USDC" }
];

/* ========= I18N ========= */
const I18N = {
  UA:{
    home:"Головна", profileTab:"Профіль", history:"Історія", services:"Сервіси",
    historyText:"Тут буде історія операцій та заявок.",
    servicesText:"Тут будуть додаткові сервіси (реферали, промо, тощо).",
    give:"Віддаєте", get:"Отримуєте",
    enterAmount:"Введіть суму",
    amountExample:"Наприклад: 10 000",
    youReceive:"Ви отримаєте",
    createRequest:"Створити заявку",
    chooseCurrency:"Виберіть валюту",
    chooseNetwork:"Оберіть мережу",
    networksHint:"Показуємо тільки мережі, які доступні для цієї валюти — щоб не плутати.",
    language:"Мова",

    newbie:"Новичок",
    prefs:"ПРЕДПОЧТЕНИЯ",
    params:"ПАРАМЕТРЫ",
    about:"О НАС",
    savedRequisites:"Збережені реквізити",
    accountCurrency:"Валюта акаунта",
    security:"Безопасность",
    devices:"Устройства",
    officialAccounts:"Офіційні акаунти",
    faq:"Часто задаваемые вопросы",
    info:"Інформація",
    support:"Обратиться в поддержку",
    logout:"Вийти з акаунта",

    profile:"Профіль",
    kycTitle:"KYC ВЕРИФИКАЦИЯ",
    level0:"Уровень 0",
    upgrade:"Повысить",
    myData:"МОИ ДАННЫЕ",
    tgAccount:"Telegram-аккаунт",
    emailAddress:"Email-адрес",
    phone:"Номер телефона",
    add:"+ Добавить",
    actions:"ДЕЙСТВИЯ",
    deleteAcc:"Удалить аккаунт"
  },
  EN:{
    home:"Home", profileTab:"Profile", history:"History", services:"Services",
    historyText:"Here will be your operations and requests history.",
    servicesText:"Extra services will be here (referrals, promo, etc.).",
    give:"You send", get:"You receive",
    enterAmount:"Enter amount",
    amountExample:"Example: 10 000",
    youReceive:"You will receive",
    createRequest:"Create request",
    chooseCurrency:"Choose currency",
    chooseNetwork:"Choose network",
    networksHint:"We show only networks available for this currency to avoid confusion.",
    language:"Language",

    newbie:"Newbie",
    prefs:"PREFERENCES",
    params:"SETTINGS",
    about:"ABOUT",
    savedRequisites:"Saved requisites",
    accountCurrency:"Account currency",
    security:"Security",
    devices:"Devices",
    officialAccounts:"Official accounts",
    faq:"FAQ",
    info:"Information",
    support:"Support",
    logout:"Log out",

    profile:"Profile",
    kycTitle:"KYC VERIFICATION",
    level0:"Level 0",
    upgrade:"Upgrade",
    myData:"MY DATA",
    tgAccount:"Telegram account",
    emailAddress:"Email",
    phone:"Phone number",
    add:"+ Add",
    actions:"ACTIONS",
    deleteAcc:"Delete account"
  },
  TR:{
    home:"Ana", profileTab:"Profil", history:"Geçmiş", services:"Servisler",
    historyText:"İşlem ve talepler geçmişi burada olacak.",
    servicesText:"Ek servisler burada olacak (referans, promo vb.).",
    give:"Gönderiyorsunuz", get:"Alıyorsunuz",
    enterAmount:"Tutar girin",
    amountExample:"Örnek: 10 000",
    youReceive:"Alacaksınız",
    createRequest:"Talep oluştur",
    chooseCurrency:"Para birimi seçin",
    chooseNetwork:"Ağ seçin",
    networksHint:"Karışıklık olmaması için yalnızca uygun ağları gösteriyoruz.",
    language:"Dil",

    newbie:"Yeni",
    prefs:"TERCİHLER",
    params:"AYARLAR",
    about:"HAKKINDA",
    savedRequisites:"Kayıtlı bilgiler",
    accountCurrency:"Hesap para birimi",
    security:"Güvenlik",
    devices:"Cihazlar",
    officialAccounts:"Resmi hesaplar",
    faq:"SSS",
    info:"Bilgi",
    support:"Destek",
    logout:"Çıkış",

    profile:"Profil",
    kycTitle:"KYC DOĞRULAMA",
    level0:"Seviye 0",
    upgrade:"Yükselt",
    myData:"BİLGİLERİM",
    tgAccount:"Telegram hesabı",
    emailAddress:"Email",
    phone:"Telefon",
    add:"+ Ekle",
    actions:"İŞLEMLER",
    deleteAcc:"Hesabı sil"
  },
  PL:{
    home:"Główna", profileTab:"Profil", history:"Historia", services:"Usługi",
    historyText:"Tutaj będzie historia operacji i zgłoszeń.",
    servicesText:"Dodatkowe usługi będą tutaj (polecenia, promo itd.).",
    give:"Wysyłasz", get:"Otrzymujesz",
    enterAmount:"Wpisz kwotę",
    amountExample:"Przykład: 10 000",
    youReceive:"Otrzymasz",
    createRequest:"Utwórz zgłoszenie",
    chooseCurrency:"Wybierz walutę",
    chooseNetwork:"Wybierz sieć",
    networksHint:"Pokazujemy tylko sieci dostępne dla tej waluty, żeby nie wprowadzać w błąd.",
    language:"Język",

    newbie:"Nowy",
    prefs:"PREFERENCJE",
    params:"USTAWIENIA",
    about:"O NAS",
    savedRequisites:"Zapisane dane",
    accountCurrency:"Waluta konta",
    security:"Bezpieczeństwo",
    devices:"Urządzenia",
    officialAccounts:"Oficjalne konta",
    faq:"FAQ",
    info:"Informacje",
    support:"Wsparcie",
    logout:"Wyloguj",

    profile:"Profil",
    kycTitle:"WERYFIKACJA KYC",
    level0:"Poziom 0",
    upgrade:"Podnieś",
    myData:"MOJE DANE",
    tgAccount:"Konto Telegram",
    emailAddress:"Email",
    phone:"Telefon",
    add:"+ Dodaj",
    actions:"DZIAŁANIA",
    deleteAcc:"Usuń konto"
  }
};

let LANG = "UA";

/* ========= STATE ========= */
let state = {
  give: { asset: findAsset("USDT"), network: "TRC20" },
  get:  { asset: findAsset("USDC"), network: "ERC20" },
  currencyTarget: "give"
};

function $(id){ return document.getElementById(id); }
function findAsset(code){ return ASSETS.find(a => a.code === code) || ASSETS[0]; }

function getAssetIcon(asset){ return ICONS.crypto[asset.code] || ICONS.crypto.USDT; }
function getNetworkIcon(net){ return ICONS.networks[net] || ICONS.networks.ERC20; }

function assetDisplayName(asset){
  const n = asset.name?.[LANG] || asset.name?.UA || asset.code;
  return `${n} (${asset.sub})`;
}
function netSubLine(assetCode, net){
  const map = { ERC20:"ETH", TRC20:"TRX", BEP20:"BNB", POL:"POL", ARB:"ARB", OP:"OP", TON:"TON", SOL:"SOL", BTC:"BTC", LTC:"LTC" };
  return `${assetCode} • ${(map[net] || net)}`;
}
function t(key){ return I18N[LANG]?.[key] ?? I18N.UA[key] ?? key; }

/* ========= Overlays ========= */
function showOverlay(id){
  const ov = $(id);
  ov.classList.add("show");
  ov.setAttribute("aria-hidden","false");
}
function hideOverlay(id){
  const ov = $(id);
  ov.classList.remove("show");
  ov.setAttribute("aria-hidden","true");
}

/* ========= Lang apply ========= */
function applyLang(){
  $("langPill").textContent = LANG;
  const lr = $("langRowRight");
  if(lr) lr.textContent = `${LANG} ›`;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  $("amountHint").textContent = t("amountExample");
  render();
}

/* ========= Amount formatting ========= */
function formatNumberWithSpaces(raw){
  const digits = raw.replace(/[^\d]/g, "");
  if(!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function parseDigits(value){
  const d = value.replace(/[^\d]/g,"");
  return d ? Number(d) : 0;
}

/* ========= Render ========= */
function render(){
  $("giveAssetIcon").src = getAssetIcon(state.give.asset);
  $("giveAssetTitle").textContent = assetDisplayName(state.give.asset);
  $("giveAssetSub").textContent = state.give.asset.sub;

  $("getAssetIcon").src = getAssetIcon(state.get.asset);
  $("getAssetTitle").textContent = assetDisplayName(state.get.asset);
  $("getAssetSub").textContent = state.get.asset.sub;

  $("amountUnit").textContent = state.give.asset.sub;

  renderNetworkForSide("give");
  renderNetworkForSide("get");

  const amount = parseDigits($("amountInput").value);
  const k = 0.985;
  const res = amount ? Math.floor(amount * k * 100) / 100 : 0;
  $("resultValue").textContent = String(res);
}

function renderNetworkForSide(side){
  const asset = state[side].asset;
  const available = COIN_NETWORKS[asset.sub] || [];
  const netBtn = side === "give" ? $("giveNetBtn") : $("getNetBtn");
  const netIcon = side === "give" ? $("giveNetIcon") : $("getNetIcon");
  const netTitle = side === "give" ? $("giveNetTitle") : $("getNetTitle");
  const netSub = side === "give" ? $("giveNetSub") : $("getNetSub");

  if(!available.length){
    netBtn.style.visibility = "hidden";
    netBtn.disabled = true;
    return;
  }
  netBtn.style.visibility = "visible";
  netBtn.disabled = (available.length === 1);

  if(!available.includes(state[side].network)){
    state[side].network = available[0];
  }
  const net = state[side].network;
  netIcon.src = getNetworkIcon(net);
  netTitle.textContent = net;
  netSub.textContent = netSubLine(asset.sub, net);
}

/* ========= Sheets content ========= */
function buildCurrencyList(){
  const list = $("currencyList");
  list.innerHTML = "";
  ASSETS.forEach(a => list.appendChild(currencyRow(a)));
}

function currencyRow(asset){
  const btn = document.createElement("button");
  btn.className = "option-row";
  btn.type = "button";

  const img = document.createElement("img");
  img.className = "list-icon";
  img.src = getAssetIcon(asset);

  const text = document.createElement("div");
  text.className = "option-text";

  const title = document.createElement("div");
  title.className = "option-title";
  title.textContent = assetDisplayName(asset);

  const sub = document.createElement("small");
  sub.textContent = asset.sub;

  text.appendChild(title);
  text.appendChild(sub);

  const right = document.createElement("div");
  right.className = "right";
  right.textContent = "›";

  btn.appendChild(img);
  btn.appendChild(text);
  btn.appendChild(right);

  btn.addEventListener("click", () => {
    state[state.currencyTarget].asset = asset;
    hideOverlay("overlayCurrency");
    render();
  });

  return btn;
}

function buildNetworkList(side){
  const list = $("networkList");
  list.innerHTML = "";
  const asset = state[side].asset;
  const available = COIN_NETWORKS[asset.sub] || [];

  available.forEach(net => {
    const btn = document.createElement("button");
    btn.className = "option-row";
    btn.type = "button";

    const img = document.createElement("img");
    img.className = "list-icon";
    img.src = getNetworkIcon(net);

    const text = document.createElement("option-text");
    // (фикс для некоторых WebView: option-text должен быть DIV)
    const textDiv = document.createElement("div");
    textDiv.className = "option-text";

    const title = document.createElement("div");
    title.className = "option-title";
    title.textContent = net;

    const sub = document.createElement("small");
    sub.textContent = netSubLine(asset.sub, net);

    textDiv.appendChild(title);
    textDiv.appendChild(sub);

    const right = document.createElement("div");
    right.className = "right";
    right.textContent = "›";

    btn.appendChild(img);
    btn.appendChild(textDiv);
    btn.appendChild(right);

    btn.addEventListener("click", () => {
      state[side].network = net;
      hideOverlay("overlayNetwork");
      render();
    });

    list.appendChild(btn);
  });
}

/* ========= Navigation ========= */
function setPage(key){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tb-item").forEach(b => b.classList.remove("active"));

  const pageId = {
    home:"page-home",
    history:"page-history",
    services:"page-services",
    profile:"page-profile",
    profileDetails:"page-profile-details"
  }[key];

  const page = document.getElementById(pageId);
  if(page) page.classList.add("active");

  // active bottom item (except profileDetails)
  if(key === "profileDetails") {
    document.querySelector('.tb-item[data-go="profile"]')?.classList.add("active");
  } else {
    document.querySelector(`.tb-item[data-go="${key}"]`)?.classList.add("active");
  }
}

/* ========= Events ========= */
function init(){
  // bottom tabbar
  document.querySelectorAll(".tb-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const go = btn.getAttribute("data-go");
      setPage(go);
    });
  });

  // open profile details by tapping header card
  document.querySelector(".profile-head")?.addEventListener("click", () => setPage("profileDetails"));
  $("profileBack")?.addEventListener("click", () => setPage("profile"));

  // language open from header & profile row
  $("langOpen").addEventListener("click", () => showOverlay("overlayLang"));
  $("openLangFromProfile")?.addEventListener("click", () => showOverlay("overlayLang"));

  // close overlays
  document.querySelectorAll(".sheet-close").forEach(btn => {
    btn.addEventListener("click", () => hideOverlay(btn.getAttribute("data-close")));
  });
  ["overlayCurrency","overlayNetwork","overlayLang"].forEach(id => {
    const ov = $(id);
    ov.addEventListener("click", (e) => { if(e.target === ov) hideOverlay(id); });
  });

  // language pick
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      LANG = btn.getAttribute("data-lang");
      hideOverlay("overlayLang");
      applyLang();
    });
  });

  // swap sheets
  $("giveAssetBtn").addEventListener("click", () => {
    state.currencyTarget = "give";
    buildCurrencyList();
    showOverlay("overlayCurrency");
  });
  $("getAssetBtn").addEventListener("click", () => {
    state.currencyTarget = "get";
    buildCurrencyList();
    showOverlay("overlayCurrency");
  });
  $("giveNetBtn").addEventListener("click", () => {
    if($("giveNetBtn").disabled) return;
    buildNetworkList("give");
    showOverlay("overlayNetwork");
  });
  $("getNetBtn").addEventListener("click", () => {
    if($("getNetBtn").disabled) return;
    buildNetworkList("get");
    showOverlay("overlayNetwork");
  });

  // swap sides
  $("swapSides").addEventListener("click", () => {
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;
    render();
  });

  // amount input
  const input = $("amountInput");
  input.addEventListener("input", () => {
    input.value = formatNumberWithSpaces(input.value);
    render();
  });

  // demo
  $("createRequest").addEventListener("click", () => alert("Demo UI: create request (backend later)"));

  applyLang();
  render();
  setPage("home");
}

init();
