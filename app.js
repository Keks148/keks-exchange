/* =========================
   ICONS / DATA
========================= */
const ICONS = {
  crypto: {
    BTC: "logos/crypto/btc.png",
    ETH: "logos/crypto/eth.png",
    LTC: "logos/crypto/ltc.png",
    SOL: "logos/crypto/sol.png",
    TON: "logos/crypto/ton.png",
    TRX: "logos/crypto/trx.png",
    USDC: "logos/crypto/usdc.png",
    USDT: "logos/crypto/tether-usdt.png",
    UAH: "logos/banks/visa-master.png" // fallback
  },
  networks: {
    ERC20: "logos/networks/erc20.png",
    TRC20: "logos/networks/trc20.png",
    BEP20: "logos/networks/bep20.png",
    TON:  "logos/networks/ton.png",   // ✅ TON icon
    SOL:  "logos/networks/sol.png",
    POL:  "logos/networks/pol.png",
    ARB:  "logos/networks/arb.png",
    OP:   "logos/networks/op.png",
    BTC:  "logos/crypto/btc.png",
    LTC:  "logos/crypto/ltc.png"
  },
  banks: {
    PRIVAT: "logos/banks/privat.png",
    MONO: "logos/banks/mono.png",
    PUMB: "logos/banks/pumb.png",
    OSCHAD: "logos/banks/oschad.png",
    OTP: "logos/banks/otp.png",
    IZI: "logos/banks/izi.png",
    SENSE: "logos/banks/sense.png",
    UKRSIB: "logos/banks/ukr-sib.png",
    ABANK: "logos/banks/a-bank.png",
    VISA: "logos/banks/visa-master.png",
    REYF: "logos/banks/reyf.png"
  }
};

// Какие сети доступны для монет (чтобы не путать)
const COIN_NETWORKS = {
  USDT: ["TRC20","ERC20","BEP20","TON"],
  USDC: ["ERC20","TRC20","BEP20","POL","ARB","OP"],
  ETH:  ["ERC20","ARB","OP","POL"],
  BTC:  ["BTC"],
  SOL:  ["SOL"],
  TON:  ["TON"],
  TRX:  ["TRC20"],
  LTC:  ["LTC"],
  UAH:  [] // банки - сети не нужны
};

// Варианты для выбора (банки + крипта)
const ASSETS = [
  // crypto
  { type:"crypto", code:"BTC",  name:{UA:"Bitcoin", EN:"Bitcoin", TR:"Bitcoin", PL:"Bitcoin"},   sub:"BTC" },
  { type:"crypto", code:"ETH",  name:{UA:"Ethereum", EN:"Ethereum", TR:"Ethereum", PL:"Ethereum"}, sub:"ETH" },
  { type:"crypto", code:"LTC",  name:{UA:"Litecoin", EN:"Litecoin", TR:"Litecoin", PL:"Litecoin"}, sub:"LTC" },
  { type:"crypto", code:"TRX",  name:{UA:"Tron", EN:"Tron", TR:"Tron", PL:"Tron"}, sub:"TRX" },
  { type:"crypto", code:"SOL",  name:{UA:"Solana", EN:"Solana", TR:"Solana", PL:"Solana"}, sub:"SOL" },
  { type:"crypto", code:"TON",  name:{UA:"Toncoin", EN:"Toncoin", TR:"Toncoin", PL:"Toncoin"}, sub:"TON" },
  { type:"crypto", code:"USDT", name:{UA:"Tether", EN:"Tether", TR:"Tether", PL:"Tether"}, sub:"USDT" },
  { type:"crypto", code:"USDC", name:{UA:"USD Coin", EN:"USD Coin", TR:"USD Coin", PL:"USD Coin"}, sub:"USDC" },

  // banks (UAH)
  { type:"bank", code:"PRIVAT", name:{UA:"PrivatBank", EN:"PrivatBank", TR:"PrivatBank", PL:"PrivatBank"}, sub:"UAH" },
  { type:"bank", code:"MONO",   name:{UA:"Monobank", EN:"Monobank", TR:"Monobank", PL:"Monobank"}, sub:"UAH" },
  { type:"bank", code:"PUMB",   name:{UA:"PUMB", EN:"PUMB", TR:"PUMB", PL:"PUMB"}, sub:"UAH" },
  { type:"bank", code:"OSCHAD", name:{UA:"Oschadbank", EN:"Oschadbank", TR:"Oschadbank", PL:"Oschadbank"}, sub:"UAH" },
  { type:"bank", code:"SENSE",  name:{UA:"Sense Bank", EN:"Sense Bank", TR:"Sense Bank", PL:"Sense Bank"}, sub:"UAH" },
  { type:"bank", code:"VISA",   name:{UA:"Visa/Master", EN:"Visa/Master", TR:"Visa/Master", PL:"Visa/Master"}, sub:"UAH" }
];

/* =========================
   I18N
========================= */
const I18N = {
  UA: {
    tabSwap:"Обмін", tabRules:"Правила", tabFaq:"FAQ", tabAccount:"Акаунт",
    give:"Віддаєте", get:"Отримуєте",
    chooseCurrency:"Виберіть валюту",
    chooseNetwork:"Оберіть мережу",
    networksHint:"Показуємо тільки мережі, які доступні для цієї валюти — щоб не плутати.",
    amountExample:"Наприклад: 10 000",
    youReceive:"Ви отримаєте",
    createRequest:"Створити заявку",
    rulesText:"Тут будуть правила сервісу та умови обміну.",
    faq1q:"Коли оновлюється курс?",
    faq1a:"Курс оновлюється регулярно. Фінальний курс фіксується під час створення заявки.",
    faq2q:"Скільки триває обмін?",
    faq2a:"Зазвичай від 5 до 30 хвилин — залежить від мережі та навантаження.",
    language:"Мова",
    accountTitle:"Акаунт",
    login:"Вхід",
    register:"Реєстрація",
    kyc:"Верифікація (KYC)",
    email:"Email",
    password:"Пароль",
    continue:"Продовжити",
    demoNote:"Поки це UI-частина. Підключимо бекенд — буде реальний вхід.",
    demoNote2:"Після підключення бекенду тут буде підтвердження пошти.",
    startKyc:"Почати KYC",
    kycInfoTitle:"Перевірка особи",
    kycInfoText:"Тут буде завантаження документів та селфі, статус перевірки та ліміти."
  },
  EN: {
    tabSwap:"Swap", tabRules:"Rules", tabFaq:"FAQ", tabAccount:"Account",
    give:"You send", get:"You receive",
    chooseCurrency:"Choose currency",
    chooseNetwork:"Choose network",
    networksHint:"We show only networks available for this currency to avoid confusion.",
    amountExample:"Example: 10 000",
    youReceive:"You will receive",
    createRequest:"Create request",
    rulesText:"Service rules and exchange terms will be here.",
    faq1q:"When does the rate update?",
    faq1a:"Rates update regularly. The final rate is fixed when you create a request.",
    faq2q:"How long does an exchange take?",
    faq2a:"Usually 5 to 30 minutes depending on the network and load.",
    language:"Language",
    accountTitle:"Account",
    login:"Login",
    register:"Register",
    kyc:"Verification (KYC)",
    email:"Email",
    password:"Password",
    continue:"Continue",
    demoNote:"This is UI only for now. We’ll connect backend for real login.",
    demoNote2:"After backend connection, email verification will appear here.",
    startKyc:"Start KYC",
    kycInfoTitle:"Identity verification",
    kycInfoText:"Here will be document upload, selfie, verification status, and limits."
  },
  TR: {
    tabSwap:"Takas", tabRules:"Kurallar", tabFaq:"SSS", tabAccount:"Hesap",
    give:"Gönderiyorsunuz", get:"Alıyorsunuz",
    chooseCurrency:"Para birimi seçin",
    chooseNetwork:"Ağ seçin",
    networksHint:"Karışıklık olmaması için yalnızca bu para birimine uygun ağları gösteriyoruz.",
    amountExample:"Örnek: 10 000",
    youReceive:"Alacaksınız",
    createRequest:"Talep oluştur",
    rulesText:"Hizmet kuralları ve takas şartları burada olacak.",
    faq1q:"Kur ne zaman güncellenir?",
    faq1a:"Kur düzenli olarak güncellenir. Son kur talep oluştururken sabitlenir.",
    faq2q:"İşlem ne kadar sürer?",
    faq2a:"Genelde 5–30 dakika, ağ ve yoğunluğa bağlıdır.",
    language:"Dil",
    accountTitle:"Hesap",
    login:"Giriş",
    register:"Kayıt",
    kyc:"Doğrulama (KYC)",
    email:"Email",
    password:"Şifre",
    continue:"Devam",
    demoNote:"Şimdilik sadece UI. Backend bağlayınca gerçek giriş olacak.",
    demoNote2:"Backend bağlanınca e-posta doğrulama burada olacak.",
    startKyc:"KYC Başlat",
    kycInfoTitle:"Kimlik doğrulama",
    kycInfoText:"Belge yükleme, selfie, durum ve limitler burada olacak."
  },
  PL: {
    tabSwap:"Wymiana", tabRules:"Zasady", tabFaq:"FAQ", tabAccount:"Konto",
    give:"Wysyłasz", get:"Otrzymujesz",
    chooseCurrency:"Wybierz walutę",
    chooseNetwork:"Wybierz sieć",
    networksHint:"Pokazujemy tylko sieci dostępne dla tej waluty, żeby nie wprowadzać w błąd.",
    amountExample:"Przykład: 10 000",
    youReceive:"Otrzymasz",
    createRequest:"Utwórz zgłoszenie",
    rulesText:"Tutaj będą zasady serwisu i warunki wymiany.",
    faq1q:"Kiedy kurs jest aktualizowany?",
    faq1a:"Kurs aktualizuje się regularnie. Ostateczny kurs jest blokowany przy tworzeniu zgłoszenia.",
    faq2q:"Ile trwa wymiana?",
    faq2a:"Zwykle 5–30 minut w zależności od sieci i obciążenia.",
    language:"Język",
    accountTitle:"Konto",
    login:"Zaloguj",
    register:"Rejestracja",
    kyc:"Weryfikacja (KYC)",
    email:"Email",
    password:"Hasło",
    continue:"Dalej",
    demoNote:"Na razie to tylko UI. Po podłączeniu backendu będzie prawdziwe logowanie.",
    demoNote2:"Po podłączeniu backendu pojawi się potwierdzenie email.",
    startKyc:"Rozpocznij KYC",
    kycInfoTitle:"Weryfikacja tożsamości",
    kycInfoText:"Tutaj będą dokumenty, selfie, status weryfikacji i limity."
  }
};

let LANG = "UA";

/* =========================
   STATE
========================= */
let state = {
  give: { asset: findAsset("USDT","crypto"), network: "TRC20" },
  get:  { asset: findAsset("USDC","crypto"), network: "ERC20" },
  currencyTarget: "give", // which side is editing
  networkTarget: "give"   // which side is editing
};

function findAsset(code, type){
  return ASSETS.find(a => a.code === code && a.type === type) || ASSETS[0];
}

function getAssetIcon(asset){
  if(asset.type === "bank") return ICONS.banks[asset.code] || ICONS.banks.VISA;
  return ICONS.crypto[asset.code] || ICONS.crypto.USDT;
}

function getNetworkIcon(net){
  return ICONS.networks[net] || ICONS.networks.ERC20;
}

function assetDisplayName(asset){
  const n = asset.name?.[LANG] || asset.name?.UA || asset.code;
  if(asset.type === "bank") return n;
  // crypto: "Tether (USDT)"
  return `${n} (${asset.sub})`;
}

function netSubLine(assetCode, net){
  // делаем понятную подпись типа "USDC • ETH" / "USDT • TRX"
  const map = {
    ERC20: "ETH",
    TRC20: "TRX",
    BEP20: "BNB",
    POL: "POL",
    ARB: "ARB",
    OP: "OP",
    TON: "TON",
    SOL: "SOL",
    BTC: "BTC",
    LTC: "LTC"
  };
  const base = map[net] || net;
  return `${assetCode} • ${base}`;
}

/* =========================
   UI HELPERS
========================= */
const $ = (id) => document.getElementById(id);

function showOverlay(id){
  $(id).classList.add("show");
  $(id).setAttribute("aria-hidden", "false");
}
function hideOverlay(id){
  $(id).classList.remove("show");
  $(id).setAttribute("aria-hidden", "true");
}

function t(key){
  return (I18N[LANG] && I18N[LANG][key]) ? I18N[LANG][key] : (I18N.UA[key] || key);
}

function applyLang(){
  document.documentElement.lang = (LANG === "UA") ? "uk" : "en";
  $("langPill").textContent = LANG;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    el.textContent = t(k);
  });

  // amount hint
  $("amountHint").textContent = t("amountExample");

  // re-render asset labels with current language
  render();
}

function formatNumberWithSpaces(value){
  const digits = value.replace(/[^\d]/g,'');
  if(!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function parseDigits(value){
  const d = value.replace(/[^\d]/g,'');
  return d ? Number(d) : 0;
}

/* =========================
   RENDER
========================= */
function render(){
  // GIVE
  $("giveAssetIcon").src = getAssetIcon(state.give.asset);
  $("giveAssetTitle").textContent = assetDisplayName(state.give.asset);
  $("giveAssetSub").textContent = state.give.asset.sub;

  // Network enable/disable for banks or single-network coins
  renderNetworkForSide("give");

  // GET
  $("getAssetIcon").src = getAssetIcon(state.get.asset);
  $("getAssetTitle").textContent = assetDisplayName(state.get.asset);
  $("getAssetSub").textContent = state.get.asset.sub;

  renderNetworkForSide("get");

  // result calculation demo (простая демо-логика)
  const amount = parseDigits($("amountInput").value);
  // демо: если crypto->crypto ~ 0.985, если bank involved ~ 0.97
  const bankInvolved = (state.give.asset.type === "bank" || state.get.asset.type === "bank");
  const k = bankInvolved ? 0.97 : 0.985;
  const res = Math.max(0, Math.floor(amount * k * 100) / 100);

  $("resultValue").textContent = amount ? String(res) : "0";
}

function renderNetworkForSide(side){
  const asset = state[side].asset;
  const netBtn = (side === "give") ? $("giveNetBtn") : $("getNetBtn");
  const netIcon = (side === "give") ? $("giveNetIcon") : $("getNetIcon");
  const netTitle = (side === "give") ? $("giveNetTitle") : $("getNetTitle");
  const netSub = (side === "give") ? $("giveNetSub") : $("getNetSub");

  const available = COIN_NETWORKS[asset.sub] || [];

  if(asset.type === "bank" || available.length === 0){
    // для банков сеть не нужна
    netBtn.style.visibility = "hidden";
    return;
  }
  netBtn.style.visibility = "visible";

  // если только 1 сеть — фиксируем
  if(available.length === 1){
    state[side].network = available[0];
    netBtn.disabled = true;
    netBtn.style.opacity = "0.85";
  } else {
    netBtn.disabled = false;
    netBtn.style.opacity = "1";
    // если выбранная сеть стала недоступна — берем первую
    if(!available.includes(state[side].network)){
      state[side].network = available[0];
    }
  }

  const net = state[side].network;
  netIcon.src = getNetworkIcon(net);
  netTitle.textContent = net;
  netSub.textContent = netSubLine(asset.sub, net);
}

/* =========================
   SHEETS BUILDERS
========================= */
function buildCurrencyList(){
  const list = $("currencyList");
  list.innerHTML = "";

  // Разделяем визуально: сначала crypto, потом banks
  const crypto = ASSETS.filter(a => a.type === "crypto");
  const banks  = ASSETS.filter(a => a.type === "bank");

  const addGroupTitle = (text) => {
    const div = document.createElement("div");
    div.style.margin = "6px 2px -4px";
    div.style.fontWeight = "1000";
    div.style.opacity = ".55";
    div.textContent = text;
    list.appendChild(div);
  };

  addGroupTitle("CRYPTO");
  crypto.forEach(a => list.appendChild(currencyRow(a)));

  addGroupTitle("BANKS (UAH)");
  banks.forEach(a => list.appendChild(currencyRow(a)));
}

function currencyRow(asset){
  const btn = document.createElement("button");
  btn.className = "option-row";

  const img = document.createElement("img");
  img.className = "list-icon";
  img.src = getAssetIcon(asset);
  img.alt = asset.sub;

  const text = document.createElement("div");
  text.className = "option-text";

  const title = document.createElement("div");
  title.className = "option-title";
  title.textContent = assetDisplayName(asset);

  const sub = document.createElement("small");
  sub.textContent = asset.type === "bank" ? "UAH • Bank" : asset.sub;

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

    // при смене валюты — сеть обновится автоматически в renderNetworkForSide
    hideOverlay("overlayCurrency");
    render();
  });

  return btn;
}

function buildNetworkList(forSide){
  const list = $("networkList");
  list.innerHTML = "";

  const asset = state[forSide].asset;
  const available = COIN_NETWORKS[asset.sub] || [];

  available.forEach(net => {
    const btn = document.createElement("button");
    btn.className = "option-row";

    const img = document.createElement("img");
    img.className = "list-icon";
    img.src = getNetworkIcon(net);
    img.alt = net;

    const text = document.createElement("div");
    text.className = "option-text";

    const title = document.createElement("div");
    title.className = "option-title";
    title.textContent = net;

    const sub = document.createElement("small");
    sub.textContent = netSubLine(asset.sub, net);

    text.appendChild(title);
    text.appendChild(sub);

    const right = document.createElement("div");
    right.className = "right";
    right.textContent = "›";

    btn.appendChild(img);
    btn.appendChild(text);
    btn.appendChild(right);

    btn.addEventListener("click", () => {
      state[forSide].network = net;
      hideOverlay("overlayNetwork");
      render();
    });

    list.appendChild(btn);
  });
}

/* =========================
   EVENTS
========================= */
function initTabs(){
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.getAttribute("data-tab");
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.getElementById(`page-${tab}`).classList.add("active");
    });
  });
}

function initFAQ(){
  document.querySelectorAll(".faq-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-faq");
      const ans = document.getElementById(`faq-${id}`);
      const isOpen = ans.style.display === "block";
      document.querySelectorAll(".faq-ans").forEach(x => x.style.display = "none");
      ans.style.display = isOpen ? "none" : "block";
    });
  });
}

function initAccount(){
  document.querySelectorAll(".seg-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seg-btn").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-mode");
      document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
      document.getElementById(`form-${mode}`).classList.add("active");
    });
  });

  // demo buttons
  $("loginBtn").addEventListener("click", () => alert("Demo UI: Login (backend later)"));
  $("regBtn").addEventListener("click", () => alert("Demo UI: Register (backend later)"));
  $("kycStart").addEventListener("click", () => alert("Demo UI: KYC (backend later)"));
}

function initSheets(){
  // open language
  $("langOpen").addEventListener("click", () => showOverlay("overlayLang"));

  // close buttons
  document.querySelectorAll(".sheet-close").forEach(btn => {
    btn.addEventListener("click", () => hideOverlay(btn.getAttribute("data-close")));
  });

  // click outside sheet closes
  ["overlayCurrency","overlayNetwork","overlayLang"].forEach(id => {
    const ov = $(id);
    ov.addEventListener("click", (e) => {
      if(e.target === ov) hideOverlay(id);
    });
  });

  // language select
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      LANG = btn.getAttribute("data-lang");
      hideOverlay("overlayLang");
      applyLang();
    });
  });

  // currency open
  $("giveAssetBtn").addEventListener("click", () => {
    state.currencyTarget = "give";
    $("currencySheetTitle").textContent = t("chooseCurrency");
    buildCurrencyList();
    showOverlay("overlayCurrency");
  });

  $("getAssetBtn").addEventListener("click", () => {
    state.currencyTarget = "get";
    $("currencySheetTitle").textContent = t("chooseCurrency");
    buildCurrencyList();
    showOverlay("overlayCurrency");
  });

  // network open
  $("giveNetBtn").addEventListener("click", () => {
    if($("giveNetBtn").disabled) return;
    state.networkTarget = "give";
    buildNetworkList("give");
    showOverlay("overlayNetwork");
  });

  $("getNetBtn").addEventListener("click", () => {
    if($("getNetBtn").disabled) return;
    state.networkTarget = "get";
    buildNetworkList("get");
    showOverlay("overlayNetwork");
  });
}

function initSwap(){
  $("swapSides").addEventListener("click", () => {
    const tmp = state.give;
    state.give = state.get;
    state.get = tmp;
    render();
  });

  $("createRequest").addEventListener("click", () => {
    alert("Demo UI: create request (backend later)");
  });

  $("amountInput").addEventListener("input", () => {
    const before = $("amountInput").value;
    $("amountInput").value = formatNumberWithSpaces(before);
    render();
  });
}

/* =========================
   START
========================= */
initTabs();
initFAQ();
initAccount();
initSheets();
initSwap();

applyLang();
render();
