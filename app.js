// KeksSwap mini-app logic (simple, stable, no broken overlays)

const $ = (id) => document.getElementById(id);

// ---------- UI refs ----------
const langBtn = $("langBtn");
const langMenu = $("langMenu");
const langLabel = $("langLabel");

const tabs = document.querySelectorAll(".tab");
const views = {
  swap: $("viewSwap"),
  rules: $("viewRules"),
  faq: $("viewFaq"),
  account: $("viewAccount"),
};

const giveAssetBtn = $("giveAssetBtn");
const getAssetBtn = $("getAssetBtn");

const giveNetBtn = $("giveNetBtn");
const getNetBtn = $("getNetBtn");

const giveIcon = $("giveIcon");
const giveName = $("giveName");
const giveSub = $("giveSub");

const getIcon = $("getIcon");
const getName = $("getName");
const getSub = $("getSub");

const giveNetIcon = $("giveNetIcon");
const giveNetLabel = $("giveNetLabel");
const getNetIcon = $("getNetIcon");
const getNetLabel = $("getNetLabel");

const giveAmount = $("giveAmount");
const resultValue = $("resultValue");
const rateValue = $("rateValue");
const rateHint = $("rateHint");
const swapBtn = $("swapBtn");

const createBtn = $("createBtn");

// Modals
const assetModal = $("assetModal");
const assetClose = $("assetClose");
const assetTitle = $("assetTitle");
const assetList = $("assetList");

const netModal = $("netModal");
const netClose = $("netClose");
const netTitle = $("netTitle");
const netList = $("netList");

// ---------- Data ----------
const ICONS = {
  // crypto
  USDT: "logos/crypto/usdt.png",
  USDC: "logos/crypto/usdc.png",
  BTC: "logos/crypto/btc.png",
  ETH: "logos/crypto/eth.png",
  LTC: "logos/crypto/ltc.png",
  TON: "logos/crypto/ton.png",
  // banks
  MONO: "logos/banks/mono.png",
  PRIVAT: "logos/banks/privat.png",
  PUMB: "logos/banks/pumb.png",
  OTP: "logos/banks/otp.png",
  IZI: "logos/banks/izi.png",
  SENSE: "logos/banks/sense.png",
  UKRSIB: "logos/banks/ukrsib.png",
  ABANK: "logos/banks/abank.png",
  VISA: "logos/banks/visamaster.png",
};

const assets = [
  // crypto
  { id: "USDT", type: "crypto", name: { uk: "Tether (USDT)", en: "Tether (USDT)", pl: "Tether (USDT)", tr: "Tether (USDT)" }, sub: "USDT", iconKey: "USDT", networks: ["TRC20","ERC20","TON"] },
  { id: "USDC", type: "crypto", name: { uk: "USD Coin (USDC)", en: "USD Coin (USDC)", pl: "USD Coin (USDC)", tr: "USD Coin (USDC)" }, sub: "USDC", iconKey: "USDC", networks: ["ERC20","TRC20"] },
  { id: "BTC",  type: "crypto", name: { uk: "Bitcoin (BTC)", en: "Bitcoin (BTC)", pl: "Bitcoin (BTC)", tr: "Bitcoin (BTC)" }, sub: "BTC", iconKey: "BTC", networks: ["BTC"] },
  { id: "ETH",  type: "crypto", name: { uk: "Ethereum (ETH)", en: "Ethereum (ETH)", pl: "Ethereum (ETH)", tr: "Ethereum (ETH)" }, sub: "ETH", iconKey: "ETH", networks: ["ERC20"] },
  { id: "LTC",  type: "crypto", name: { uk: "Litecoin (LTC)", en: "Litecoin (LTC)", pl: "Litecoin (LTC)", tr: "Litecoin (LTC)" }, sub: "LTC", iconKey: "LTC", networks: ["LTC"] },
  { id: "TON",  type: "crypto", name: { uk: "Toncoin (TON)", en: "Toncoin (TON)", pl: "Toncoin (TON)", tr: "Toncoin (TON)" }, sub: "TON", iconKey: "TON", networks: ["TON"] },

  // banks (оставляем все, кроме UkrBanki)
  { id: "MONO",  type: "bank", name: { uk: "Monobank (UAH)", en: "Monobank (UAH)", pl: "Monobank (UAH)", tr: "Monobank (UAH)" }, sub: "UAH", iconKey: "MONO" },
  { id: "PRIVAT",type: "bank", name: { uk: "PrivatBank (UAH)", en: "PrivatBank (UAH)", pl: "PrivatBank (UAH)", tr: "PrivatBank (UAH)" }, sub: "UAH", iconKey: "PRIVAT" },
  { id: "PUMB",  type: "bank", name: { uk: "PUMB (UAH)", en: "PUMB (UAH)", pl: "PUMB (UAH)", tr: "PUMB (UAH)" }, sub: "UAH", iconKey: "PUMB" },
  { id: "OTP",   type: "bank", name: { uk: "OTP (UAH)", en: "OTP (UAH)", pl: "OTP (UAH)", tr: "OTP (UAH)" }, sub: "UAH", iconKey: "OTP" },
  { id: "IZI",   type: "bank", name: { uk: "IziBank (UAH)", en: "IziBank (UAH)", pl: "IziBank (UAH)", tr: "IziBank (UAH)" }, sub: "UAH", iconKey: "IZI" },
  { id: "SENSE", type: "bank", name: { uk: "Sense (UAH)", en: "Sense (UAH)", pl: "Sense (UAH)", tr: "Sense (UAH)" }, sub: "UAH", iconKey: "SENSE" },
  { id: "UKRSIB",type: "bank", name: { uk: "UkrSib (UAH)", en: "UkrSib (UAH)", pl: "UkrSib (UAH)", tr: "UkrSib (UAH)" }, sub: "UAH", iconKey: "UKRSIB" },
  { id: "ABANK", type: "bank", name: { uk: "A-bank (UAH)", en: "A-bank (UAH)", pl: "A-bank (UAH)", tr: "A-bank (UAH)" }, sub: "UAH", iconKey: "ABANK" },
  { id: "VISA",  type: "bank", name: { uk: "Visa/Master (UAH)", en: "Visa/Master (UAH)", pl: "Visa/Master (UAH)", tr: "Visa/Master (UAH)" }, sub: "UAH", iconKey: "VISA" },
];

// ---------- i18n ----------
const i18n = {
  uk: {
    tabs: { swap: "Обмін", rules: "Правила", faq: "FAQ", account: "Акаунт" },
    give: "Віддаєте",
    get: "Отримуєте",
    youReceive: "Ви отримаєте",
    rate: "Курс:",
    create: "Створити заявку",
    pickAssetGive: "Виберіть що віддаєте",
    pickAssetGet: "Виберіть що отримуєте",
    pickNet: "Оберіть мережу",
    updating: "Оновлюю курс з WhiteBIT…",
    noRate: "Курс тимчасово недоступний",
  },
  en: {
    tabs: { swap: "Swap", rules: "Rules", faq: "FAQ", account: "Account" },
    give: "You give",
    get: "You get",
    youReceive: "You will receive",
    rate: "Rate:",
    create: "Create request",
    pickAssetGive: "Select what you give",
    pickAssetGet: "Select what you get",
    pickNet: "Select network",
    updating: "Updating rate from WhiteBIT…",
    noRate: "Rate temporarily unavailable",
  },
  pl: {
    tabs: { swap: "Wymiana", rules: "Zasady", faq: "FAQ", account: "Konto" },
    give: "Oddajesz",
    get: "Otrzymujesz",
    youReceive: "Otrzymasz",
    rate: "Kurs:",
    create: "Utwórz zlecenie",
    pickAssetGive: "Wybierz co oddajesz",
    pickAssetGet: "Wybierz co otrzymujesz",
    pickNet: "Wybierz sieć",
    updating: "Aktualizuję kurs z WhiteBIT…",
    noRate: "Kurs chwilowo niedostępny",
  },
  tr: {
    tabs: { swap: "Takas", rules: "Kurallar", faq: "SSS", account: "Hesap" },
    give: "Veriyorsun",
    get: "Alıyorsun",
    youReceive: "Alacaksın",
    rate: "Kur:",
    create: "Talep oluştur",
    pickAssetGive: "Ne verdiğini seç",
    pickAssetGet: "Ne aldığını seç",
    pickNet: "Ağ seç",
    updating: "WhiteBIT’ten kur güncelleniyor…",
    noRate: "Kur geçici olarak yok",
  }
};

// ---------- State ----------
let lang = loadLang(); // uk/en/pl/tr

let modePicking = null; // "give" | "get"
let modeNetPicking = null; // "give" | "get"

let give = { assetId: "USDT", net: "TRC20" };
let get  = { assetId: "MONO", net: null };

// ---------- Helpers ----------
function loadLang(){
  const saved = localStorage.getItem("keks_lang");
  if(saved && i18n[saved]) return saved;
  return "uk";
}
function setLang(next){
  lang = next;
  localStorage.setItem("keks_lang", next);
  langLabel.textContent = next.toUpperCase();
  applyLang();
  renderAll();
}

function assetById(id){ return assets.find(a => a.id === id); }
function iconFor(asset){
  const p = ICONS[asset.iconKey];
  return p ? p : "";
}

function isCryptoSelected(side){
  const a = assetById(side === "give" ? give.assetId : get.assetId);
  return a?.type === "crypto";
}

function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }

function closeAllOverlays(){
  hide(langMenu);
  hide(assetModal);
  hide(netModal);
}

function applyLang(){
  const t = i18n[lang];
  $("tabSwap").textContent = t.tabs.swap;
  $("tabRules").textContent = t.tabs.rules;
  $("tabFaq").textContent = t.tabs.faq;
  $("tabAccount").textContent = t.tabs.account;

  $("lblGive").textContent = t.give;
  $("lblGet").textContent = t.get;
  $("lblResult").textContent = t.youReceive;
  $("rateLineLabel").textContent = t.rate;
  $("createBtn").textContent = t.create;

  $("rulesTitle").textContent = (lang==="en") ? "Exchange terms" : (lang==="tr") ? "Değişim şartları" : (lang==="pl") ? "Warunki wymiany" : "Умови обміну";
  $("faqTitle").textContent = (lang==="en") ? "FAQ" : (lang==="tr") ? "SSS" : "FAQ";
  $("accTitle").textContent = i18n[lang].tabs.account;
  $("accText").textContent = (lang==="en")
    ? "Login/registration & KYC (not connected yet)."
    : (lang==="tr")
    ? "Giriş/kayıt & KYC (henüz bağlı değil)."
    : (lang==="pl")
    ? "Logowanie/rejestracja & KYC (jeszcze nie podłączone)."
    : "Тут буде вхід/реєстрація та KYC (поки без підключення).";

  $("btnLogin").textContent = (lang==="en") ? "Login" : (lang==="tr") ? "Giriş" : (lang==="pl") ? "Zaloguj" : "Увійти";
  $("btnReg").textContent   = (lang==="en") ? "Sign up" : (lang==="tr") ? "Kayıt ol" : (lang==="pl") ? "Rejestracja" : "Реєстрація";
}

// ---------- Render ----------
function renderSide(side){
  const state = side === "give" ? give : get;
  const a = assetById(state.assetId);

  const iconEl = side === "give" ? giveIcon : getIcon;
  const nameEl = side === "give" ? giveName : getName;
  const subEl  = side === "give" ? giveSub  : getSub;

  iconEl.src = iconFor(a);
  iconEl.alt = a.sub;

  nameEl.textContent = a.name[lang] || a.name.uk;
  subEl.textContent = a.sub;

  // Networks visibility
  const netBtn = side === "give" ? giveNetBtn : getNetBtn;
  const netIcon = side === "give" ? giveNetIcon : getNetIcon;
  const netLabel = side === "give" ? giveNetLabel : getNetLabel;

  if(a.type === "crypto"){
    // default net
    if(!state.net){
      state.net = a.networks[0];
    }
    netLabel.textContent = state.net;
    netIcon.src = "logos/crypto/trx.png"; // fallback small icon if you have
    netIcon.alt = state.net;
    show(netBtn);
  }else{
    state.net = null;
    hide(netBtn);
  }
}

function renderAll(){
  renderSide("give");
  renderSide("get");
  calc();
}

// ---------- Modals ----------
function openAssetPicker(side){
  modePicking = side;
  assetTitle.textContent = (side === "give") ? i18n[lang].pickAssetGive : i18n[lang].pickAssetGet;

  assetList.innerHTML = "";

  // show BOTH crypto + banks in BOTH fields (as you had), but UkrBanki removed already
  assets.forEach(a => {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      <div class="itemLeft">
        <img class="icon" src="${iconFor(a)}" alt="" />
        <div class="itemText">
          <div class="itemMain">${a.name[lang] || a.name.uk}</div>
          <div class="itemSub">${a.sub}</div>
        </div>
      </div>
      <div class="smallRight">▸</div>
    `;
    row.addEventListener("click", () => {
      if(side === "give"){
        give.assetId = a.id;
        // reset net
        give.net = (a.type === "crypto") ? (a.networks?.[0] || null) : null;
      }else{
        get.assetId = a.id;
        get.net = (a.type === "crypto") ? (a.networks?.[0] || null) : null;
      }
      hide(assetModal);
      renderAll();
    });
    assetList.appendChild(row);
  });

  show(assetModal);
}

function openNetPicker(side){
  modeNetPicking = side;
  const state = side === "give" ? give : get;
  const a = assetById(state.assetId);
  if(!a || a.type !== "crypto") return;

  netTitle.textContent = i18n[lang].pickNet;
  netList.innerHTML = "";

  (a.networks || []).forEach(n => {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      <div class="itemLeft">
        <img class="netIcon" src="logos/crypto/trx.png" alt="" />
        <div class="itemText">
          <div class="itemMain">${n}</div>
          <div class="itemSub">${a.sub}</div>
        </div>
      </div>
      <div class="smallRight">▸</div>
    `;
    row.addEventListener("click", () => {
      state.net = n;
      hide(netModal);
      renderAll();
    });
    netList.appendChild(row);
  });

  show(netModal);
}

// Close on backdrop click
assetModal.addEventListener("click", (e) => { if(e.target === assetModal) hide(assetModal); });
netModal.addEventListener("click", (e) => { if(e.target === netModal) hide(netModal); });

// ---------- Swap logic ----------
function swapSides(){
  // swap assets + nets (works even if bank<->crypto)
  const g = { ...give };
  give.assetId = get.assetId;
  give.net = get.net;

  get.assetId = g.assetId;
  get.net = g.net;

  renderAll();
}

function parseAmount(v){
  const x = String(v || "").replace(",", ".").replace(/[^\d.]/g, "");
  const n = parseFloat(x);
  return Number.isFinite(n) ? n : 0;
}

// ---------- Rate fetching (simple placeholder / safe) ----------
let rateTimer = null;

async function fetchWhitebitRate_USDT_UAH(){
  // Public endpoint (cached 1s). Might still fail due to network/CORS; we handle gracefully.
  const res = await fetch("https://whitebit.com/api/v2/public/ticker", { cache: "no-store" });
  if(!res.ok) throw new Error("bad_response");
  const data = await res.json();
  // In many responses: data["USDT_UAH"] exists with fields: last / bid / ask etc.
  const pair = data["USDT_UAH"];
  if(!pair) throw new Error("pair_missing");
  const last = parseFloat(pair.last);
  if(!Number.isFinite(last)) throw new Error("bad_rate");
  return last;
}

function startAutoRate(){
  stopAutoRate();
  updateRateOnce();
  rateTimer = setInterval(updateRateOnce, 60000); // 1 мин
}

function stopAutoRate(){
  if(rateTimer) clearInterval(rateTimer);
  rateTimer = null;
}

async function updateRateOnce(){
  // Only meaningful when USDT -> UAH (or reverse) selected.
  const gA = assetById(give.assetId);
  const tA = assetById(get.assetId);

  // We show hint only, no UI breaking
  rateHint.textContent = i18n[lang].updating;

  try{
    // Example: if either side involves UAH bank and other side is USDT
    const involvesUAH = (gA.sub === "UAH") || (tA.sub === "UAH");
    const involvesUSDT = (gA.id === "USDT") || (tA.id === "USDT");

    if(involvesUAH && involvesUSDT){
      const rate = await fetchWhitebitRate_USDT_UAH(); // UAH per 1 USDT
      // show rate always as "1 USDT = X UAH"
      rateValue.textContent = `1 USDT = ${rate.toFixed(2)} UAH`;
      rateHint.textContent = "";
      calc(rate);
    }else{
      // For other pairs пока просто —
      rateValue.textContent = "—";
      rateHint.textContent = "";
      calc(null);
    }
  }catch(err){
    rateValue.textContent = "—";
    rateHint.textContent = i18n[lang].noRate;
    calc(null);
  }
}

// ---------- Calculate ----------
function calc(usdtUahRate){
  const amount = parseAmount(giveAmount.value);

  // Basic demo calc:
  // If give is USDT and get is bank UAH => amount * rate
  // If give is UAH and get is USDT => amount / rate
  const gA = assetById(give.assetId);
  const tA = assetById(get.assetId);

  if(!amount){
    resultValue.textContent = "—";
    return;
  }

  // If we have USDT-UAH rate and needed
  if(usdtUahRate && gA && tA){
    if(gA.id === "USDT" && tA.sub === "UAH"){
      resultValue.textContent = (amount * usdtUahRate).toFixed(2);
      return;
    }
    if(gA.sub === "UAH" && tA.id === "USDT"){
      resultValue.textContent = (amount / usdtUahRate).toFixed(4);
      return;
    }
  }

  // Otherwise: placeholder
  resultValue.textContent = "—";
}

// ---------- Events ----------
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    Object.values(views).forEach(v => v.classList.remove("active"));
    views[tab].classList.add("active");

    closeAllOverlays();
  });
});

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if(langMenu.classList.contains("hidden")) show(langMenu);
  else hide(langMenu);
});

document.addEventListener("click", (e) => {
  // close dropdown on any outside click
  if(!langMenu.classList.contains("hidden")) hide(langMenu);
});

langMenu.querySelectorAll(".pill").forEach(p => {
  p.addEventListener("click", () => {
    setLang(p.dataset.lang);
    hide(langMenu);
  });
});

giveAssetBtn.addEventListener("click", () => openAssetPicker("give"));
getAssetBtn.addEventListener("click", () => openAssetPicker("get"));

giveNetBtn.addEventListener("click", () => openNetPicker("give"));
getNetBtn.addEventListener("click", () => openNetPicker("get"));

assetClose.addEventListener("click", () => hide(assetModal));
netClose.addEventListener("click", () => hide(netModal));

swapBtn.addEventListener("click", () => swapSides());

giveAmount.addEventListener("input", () => calc(null));

createBtn.addEventListener("click", () => {
  // demo
  closeAllOverlays();
});

// ---------- Init ----------
(function init(){
  langLabel.textContent = lang.toUpperCase();
  applyLang();

  // default icons (avoid broken img)
  assets.forEach(a => {
    if(!ICONS[a.iconKey]) return;
  });

  renderAll();
  startAutoRate();
})();
