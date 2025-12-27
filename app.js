// =========================
// KeksSwap — base app (UI + pickers + i18n + amount formatting)
// =========================

const $ = (id) => document.getElementById(id);

// --- Assets paths
const ICON = {
  crypto: (name) => `logos/crypto/${name}`,
  networks: (name) => `logos/networks/${name}`,
  banks: (name) => `logos/banks/${name}`,
  wallets: (name) => `logos/wallets/${name}`,
};

// --- i18n dictionary (ВСЕ СТРОКИ ТОЛЬКО ОТСЮДА)
const I18N = {
  uk: {
    tabSwap: "Обмін",
    tabRules: "Правила",
    tabFaq: "FAQ",
    tabAccount: "Акаунт",

    give: "Віддаєте",
    get: "Отримуєте",
    youGet: "Ви отримаєте",
    rate: "Курс:",
    rateHint: "Оновлюю курс з WhiteBIT...",
    create: "Створити заявку",

    chooseAssetGive: "Виберіть що віддаєте",
    chooseAssetGet: "Виберіть що отримуєте",
    chooseNetwork: "Оберіть мережу",
    chooseLang: "Мова",

    amountHint0: "Введіть суму",
    amountHint1: "Наприклад: 10 000",

    rulesTitle: "Умови обміну",
    rules: [
      { icon:"⏳", title:"Час обробки", text:"Зазвичай до 40 хвилин. У рідкісних випадках — до 72 годин (залежить від банків та платіжних систем)." },
      { icon:"⚠️", title:"Фіксація курсу", text:"Курс оновлюється автоматично. Під час створення заявки курс фіксується." },
      { icon:"📲", title:"Контакт у Telegram", text:"Вкажіть ваш робочий Telegram для звʼязку. Якщо він невірний або ви не відповідаєте — обробка може бути призупинена." },
      { icon:"✅", title:"Підтвердження", text:"Після створення заявки оператор підтверджує реквізити та суму." },
    ],

    faqTitle: "FAQ",
    faq: [
      { q:"Коли оновлюється курс?", a:"Курс оновлюється автоматично кожні кілька секунд." },
      { q:"Скільки триває обмін?", a:"Зазвичай до 40 хвилин після оплати/надходження крипти." },
    ],

    accountTitle:"Акаунт",
    accountText:"Тут буде вхід, верифікація та історія заявок (додамо наступним кроком).",
    login:"Увійти",
    kyc:"Пройти KYC",
  },

  en: {
    tabSwap: "Swap",
    tabRules: "Rules",
    tabFaq: "FAQ",
    tabAccount: "Account",

    give: "You send",
    get: "You get",
    youGet: "You will receive",
    rate: "Rate:",
    rateHint: "Updating rate from WhiteBIT...",
    create: "Create request",

    chooseAssetGive: "Choose what you send",
    chooseAssetGet: "Choose what you receive",
    chooseNetwork: "Choose network",
    chooseLang: "Language",

    amountHint0: "Enter amount",
    amountHint1: "Example: 10 000",

    rulesTitle: "Exchange terms",
    rules: [
      { icon:"⏳", title:"Processing time", text:"Usually up to 40 minutes. Rare cases — up to 72 hours (depends on banks and payment systems)." },
      { icon:"⚠️", title:"Rate lock", text:"Rate updates automatically. When you create a request, the rate is locked." },
      { icon:"📲", title:"Telegram contact", text:"Provide your active Telegram contact. If it’s incorrect or you don’t respond — processing may be paused." },
      { icon:"✅", title:"Confirmation", text:"After creating a request, an operator confirms the details and amount." },
    ],

    faqTitle: "FAQ",
    faq: [
      { q:"When does the rate update?", a:"The rate updates automatically every few seconds." },
      { q:"How long does an exchange take?", a:"Usually up to 40 minutes after payment / crypto arrival." },
    ],

    accountTitle:"Account",
    accountText:"Login, verification and request history will be added next.",
    login:"Login",
    kyc:"Start KYC",
  },

  tr: {
    tabSwap: "Takas",
    tabRules: "Kurallar",
    tabFaq: "SSS",
    tabAccount: "Hesap",

    give: "Gönderiyorsunuz",
    get: "Alıyorsunuz",
    youGet: "Alacağınız tutar",
    rate: "Kur:",
    rateHint: "WhiteBIT kur güncelleniyor...",
    create: "Talep oluştur",

    chooseAssetGive: "Ne gönderiyorsunuz seçin",
    chooseAssetGet: "Ne alıyorsunuz seçin",
    chooseNetwork: "Ağ seçin",
    chooseLang: "Dil",

    amountHint0: "Tutar girin",
    amountHint1: "Örnek: 10 000",

    rulesTitle: "Değişim şartları",
    rules: [
      { icon:"⏳", title:"İşlem süresi", text:"Genellikle 40 dakikaya kadar. Nadir durumlarda — 72 saate kadar (bankalar ve ödeme sistemlerine bağlı)." },
      { icon:"⚠️", title:"Kur sabitleme", text:"Kur otomatik güncellenir. Talep oluşturulduğunda kur sabitlenir." },
      { icon:"📲", title:"Telegram iletişimi", text:"Aktif Telegram bilgisi girin. Yanlışsa veya cevap vermezseniz işlem durdurulabilir." },
      { icon:"✅", title:"Onay", text:"Talep sonrası operatör bilgileri ve tutarı onaylar." },
    ],

    faqTitle: "SSS",
    faq: [
      { q:"Kur ne zaman güncellenir?", a:"Kur birkaç saniyede bir otomatik güncellenir." },
      { q:"İşlem ne kadar sürer?", a:"Genellikle ödeme / kripto gelişi sonrası 40 dakikaya kadar." },
    ],

    accountTitle:"Hesap",
    accountText:"Giriş, doğrulama ve geçmiş sonraki adımda eklenecek.",
    login:"Giriş",
    kyc:"KYC Başlat",
  }
};

let lang = "uk";

// --- Data (иконки под твои папки)
const ASSETS = [
  // crypto
  { id:"USDT", type:"crypto", title:"Tether (USDT)", sub:"USDT", icon: ICON.crypto("tether-usdt.png"), networks:["TRC20","ERC20","TON","BEP20"] },
  { id:"USDC", type:"crypto", title:"USD Coin (USDC)", sub:"USDC", icon: ICON.crypto("usdc.png"), networks:["ERC20","TRC20"] },
  { id:"BTC",  type:"crypto", title:"Bitcoin (BTC)", sub:"BTC", icon: ICON.crypto("btc.png"), networks:[] },
  { id:"ETH",  type:"crypto", title:"Ethereum (ETH)", sub:"ETH", icon: ICON.crypto("eth.png"), networks:["ERC20"] },
  { id:"LTC",  type:"crypto", title:"Litecoin (LTC)", sub:"LTC", icon: ICON.crypto("ltc.png"), networks:[] },
  { id:"TON",  type:"crypto", title:"Toncoin (TON)", sub:"TON", icon: ICON.crypto("ton.png"), networks:["TON"] },

  // banks (UAH)
  { id:"MONO", type:"bank", title:"Monobank (UAH)", sub:"UAH", icon: ICON.banks("mono.png"), networks:[] },
  { id:"PRIVAT", type:"bank", title:"PrivatBank (UAH)", sub:"UAH", icon: ICON.banks("privat.png"), networks:[] },
  { id:"PUMB", type:"bank", title:"PUMB (UAH)", sub:"UAH", icon: ICON.banks("pumb.png"), networks:[] },
  { id:"OTP", type:"bank", title:"OTP (UAH)", sub:"UAH", icon: ICON.banks("otp.png"), networks:[] },
  { id:"IZI", type:"bank", title:"IziBank (UAH)", sub:"UAH", icon: ICON.banks("izi.png"), networks:[] },
  { id:"SENSE", type:"bank", title:"Sense (UAH)", sub:"UAH", icon: ICON.banks("sense.png"), networks:[] },
  { id:"OSCHAD", type:"bank", title:"Oschadbank (UAH)", sub:"UAH", icon: ICON.banks("oschad.png"), networks:[] },
  { id:"UKRSIB", type:"bank", title:"UkrSib (UAH)", sub:"UAH", icon: ICON.banks("ukr-sib.png"), networks:[] },
  { id:"A_BANK", type:"bank", title:"A-bank (UAH)", sub:"UAH", icon: ICON.banks("a-bank.png"), networks:[] },
  { id:"VISA", type:"bank", title:"Visa/Master (UAH)", sub:"UAH", icon: ICON.banks("visa-master.png"), networks:[] },
];

// Networks map -> icon file (есть у тебя в logos/networks)
const NETWORKS = {
  TRC20: { title:"TRC20", sub:"USDT/USDC", icon: ICON.networks("trc20.png") },
  ERC20: { title:"ERC20", sub:"ETH", icon: ICON.networks("erc20.png") },
  BEP20: { title:"BEP20", sub:"BNB", icon: ICON.networks("bep20.png") },
  TON:   { title:"TON",   sub:"TON", icon: ICON.networks("sol.png") }, // если TON иконки нет, ставим sol.png как временно
};

// --- State
let giveAsset = ASSETS.find(x=>x.id==="USDT");
let getAsset  = ASSETS.find(x=>x.id==="MONO");
let giveNetwork = "TRC20";
let getNetwork  = ""; // for banks empty

// =========================
// Helpers
// =========================
function t(key){ return I18N[lang][key]; }

function setImgSafe(imgEl, src, fallbackText){
  imgEl.onerror = () => {
    // fallback: SVG буква
    imgEl.onerror = null;
    const letter = (fallbackText || "?").slice(0,1).toUpperCase();
    imgEl.src = `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect width="64" height="64" rx="16" fill="#f3f3f3"/>
        <text x="32" y="40" text-anchor="middle" font-family="Arial" font-size="28" font-weight="900" fill="#777">${letter}</text>
      </svg>
    `);
  };
  imgEl.src = src;
}

function formatThousands(numStr){
  // keep digits only
  const digits = (numStr || "").replace(/[^\d]/g,"");
  if(!digits) return "";
  // no leading zeros (but allow single 0)
  const normalized = digits.replace(/^0+(\d)/, "$1");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function parseNumber(formatted){
  const d = (formatted||"").replace(/[^\d]/g,"");
  return d ? Number(d) : 0;
}

// =========================
// Render
// =========================
function applyI18n(){
  $("tabSwap").textContent = t("tabSwap");
  $("tabRules").textContent = t("tabRules");
  $("tabFaq").textContent = t("tabFaq");
  $("tabAccount").textContent = t("tabAccount");

  $("giveTitle").textContent = t("give");
  $("getTitle").textContent = t("get");
  $("youGetLabel").textContent = t("youGet");
  $("rateLabel").textContent = t("rate");
  $("rateHint").textContent = t("rateHint");
  $("createBtn").textContent = t("create");

  $("chooseLangTitle").textContent = t("chooseLang");

  $("rulesTitle").textContent = t("rulesTitle");
  renderRules();
  $("faqTitle").textContent = t("faqTitle");
  renderFaq();

  $("accountTitle").textContent = t("accountTitle");
  $("accountText").textContent = t("accountText");
  $("loginBtn").textContent = t("login");
  $("kycBtn").textContent = t("kyc");

  // hint under amount (animated feel)
  const v = $("amountInput").value.trim();
  $("amountHint").textContent = v ? t("amountHint1") : t("amountHint0");
}

function renderAssetButtons(){
  // give
  setImgSafe($("giveAssetIcon"), giveAsset.icon, giveAsset.sub);
  $("giveAssetTitle").textContent = giveAsset.title;
  $("giveAssetSub").textContent = giveAsset.sub;

  // network for give
  const giveNeedsNet = giveAsset.type === "crypto" && (giveAsset.networks?.length > 0);
  $("giveNetworkBtn").style.display = giveNeedsNet ? "flex" : "none";
  if(giveNeedsNet){
    if(!giveNetwork || !giveAsset.networks.includes(giveNetwork)){
      giveNetwork = giveAsset.networks[0];
    }
    const n = NETWORKS[giveNetwork] || {title:giveNetwork, sub:"", icon:""};
    setImgSafe($("giveNetworkIcon"), n.icon, n.title);
    $("giveNetworkTitle").textContent = n.title;
    $("giveNetworkSub").textContent = n.sub || giveAsset.sub;
  }

  // get
  setImgSafe($("getAssetIcon"), getAsset.icon, getAsset.sub);
  $("getAssetTitle").textContent = getAsset.title;
  $("getAssetSub").textContent = getAsset.sub;

  const getNeedsNet = getAsset.type === "crypto" && (getAsset.networks?.length > 0);
  $("getNetworkBtn").style.display = getNeedsNet ? "flex" : "none";
  if(getNeedsNet){
    if(!getNetwork || !getAsset.networks.includes(getNetwork)){
      getNetwork = getAsset.networks[0];
    }
    const n2 = NETWORKS[getNetwork] || {title:getNetwork, sub:"", icon:""};
    setImgSafe($("getNetworkIcon"), n2.icon, n2.title);
    $("getNetworkTitle").textContent = n2.title;
    $("getNetworkSub").textContent = n2.sub || getAsset.sub;
  } else {
    getNetwork = "";
  }
}

function calcPreview(){
  // заглушка: тут потом подключим WhiteBIT курс
  const amount = parseNumber($("amountInput").value);
  if(!amount){
    $("youGetValue").textContent = "—";
    $("rateValue").textContent = "—";
    return;
  }
  // фейковый расчёт только для UI (пример)
  const rate = 39.5; // пример
  $("rateValue").textContent = `${rate}`;
  if(getAsset.type === "bank"){
    $("youGetValue").textContent = `${formatThousands(String(Math.round(amount * rate))) } ${getAsset.sub}`;
  } else {
    $("youGetValue").textContent = `${(amount / rate).toFixed(2)} ${getAsset.sub}`;
  }
}

function renderRules(){
  const box = $("rulesList");
  box.innerHTML = "";
  for(const r of I18N[lang].rules){
    const el = document.createElement("div");
    el.className = "ruleItem";
    el.innerHTML = `
      <div class="ruleIcon">${r.icon}</div>
      <div class="ruleText">
        <b>${r.title}</b>
        <div>${r.text}</div>
      </div>
    `;
    box.appendChild(el);
  }
}

function renderFaq(){
  const box = $("faqList");
  box.innerHTML = "";
  for(const f of I18N[lang].faq){
    const el = document.createElement("div");
    el.className = "faqItem";
    el.textContent = `▶ ${f.q}`;
    box.appendChild(el);
  }
}

// =========================
// Tabs
// =========================
function openTab(name){
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("is-active", b.dataset.tab === name));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("is-active", p.id === `panel-${name}`));
}
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=> openTab(btn.dataset.tab));
});

// =========================
// Sheets
// =========================
function openSheet(id){ $(id).classList.remove("hidden"); }
function closeSheet(id){ $(id).classList.add("hidden"); }

// lang sheet
$("langBtn").addEventListener("click", ()=> openSheet("langSheet"));
$("closeLang").addEventListener("click", ()=> closeSheet("langSheet"));
document.querySelectorAll("#langSheet .sheetItem").forEach(b=>{
  b.addEventListener("click", ()=>{
    lang = b.dataset.lang;
    $("langLabel").textContent = lang === "uk" ? "UA" : lang.toUpperCase();
    document.documentElement.lang = lang;
    applyI18n();
    closeSheet("langSheet");
  });
});

// picker
let pickerMode = null; // "giveAsset" | "getAsset" | "giveNet" | "getNet"
function openPicker(title, items, onPick){
  $("pickerTitle").textContent = title;
  const list = $("pickerList");
  list.innerHTML = "";

  items.forEach(item=>{
    const row = document.createElement("button");
    row.className = "pickerRow";
    row.type = "button";
    row.innerHTML = `
      <span class="pickerLeft">
        <span class="pickerIcon"><img alt="" /></span>
        <span class="pickerText">
          <div class="t1">${item.title}</div>
          <div class="t2">${item.sub || ""}</div>
        </span>
      </span>
      <span class="pickerChev">›</span>
    `;
    const img = row.querySelector("img");
    if(item.icon) setImgSafe(img, item.icon, item.title);
    else setImgSafe(img, "", item.title);

    row.addEventListener("click", ()=>{
      onPick(item);
      closeSheet("pickerSheet");
    });
    list.appendChild(row);
  });

  openSheet("pickerSheet");
}
$("pickerClose").addEventListener("click", ()=> closeSheet("pickerSheet"));

// =========================
// Selection buttons
// =========================
$("giveAssetBtn").addEventListener("click", ()=>{
  openPicker(t("chooseAssetGive"), ASSETS, (item)=>{
    giveAsset = item;
    // if crypto ensure network
    if(giveAsset.type === "crypto" && giveAsset.networks.length){
      giveNetwork = giveAsset.networks[0];
    } else {
      giveNetwork = "";
    }
    renderAssetButtons();
    calcPreview();
  });
});

$("getAssetBtn").addEventListener("click", ()=>{
  openPicker(t("chooseAssetGet"), ASSETS, (item)=>{
    getAsset = item;
    if(getAsset.type === "crypto" && getAsset.networks.length){
      getNetwork = getAsset.networks[0];
    } else {
      getNetwork = "";
    }
    renderAssetButtons();
    calcPreview();
  });
});

$("giveNetworkBtn").addEventListener("click", ()=>{
  if(!(giveAsset.type==="crypto" && giveAsset.networks.length)) return;
  const nets = giveAsset.networks.map(k => ({
    id:k,
    title: (NETWORKS[k]?.title || k),
    sub: (NETWORKS[k]?.sub || giveAsset.sub),
    icon: (NETWORKS[k]?.icon || "")
  }));
  openPicker(t("chooseNetwork"), nets, (item)=>{
    giveNetwork = item.id;
    renderAssetButtons();
  });
});

$("getNetworkBtn").addEventListener("click", ()=>{
  if(!(getAsset.type==="crypto" && getAsset.networks.length)) return;
  const nets = getAsset.networks.map(k => ({
    id:k,
    title: (NETWORKS[k]?.title || k),
    sub: (NETWORKS[k]?.sub || getAsset.sub),
    icon: (NETWORKS[k]?.icon || "")
  }));
  openPicker(t("chooseNetwork"), nets, (item)=>{
    getNetwork = item.id;
    renderAssetButtons();
  });
});

// swap
$("swapBtn").addEventListener("click", ()=>{
  [giveAsset, getAsset] = [getAsset, giveAsset];
  [giveNetwork, getNetwork] = [getNetwork, giveNetwork];
  renderAssetButtons();
  calcPreview();
});

// amount formatting
$("amountInput").addEventListener("input", (e)=>{
  const caret = e.target.selectionStart;
  const before = e.target.value;
  const formatted = formatThousands(before);
  e.target.value = formatted;
  // мягко возвращаем курсор в конец (на мобиле это стабильнее)
  setTimeout(()=> {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }, 0);

  $("amountHint").textContent = formatted ? t("amountHint1") : t("amountHint0");
  calcPreview();
});

// create request (пока заглушка)
$("createBtn").addEventListener("click", ()=>{
  alert("Next step: request page + payment timer (30:00). Скажи: 'Дальше — заявка'");
});

// account buttons (заглушки)
$("loginBtn").addEventListener("click", ()=> alert("Login next (Phone/Google/Telegram)."));
$("kycBtn").addEventListener("click", ()=> alert("KYC flow next (manual)."));

// =========================
// init
// =========================
(function init(){
  $("langLabel").textContent = "UA";
  applyI18n();
  renderAssetButtons();
  calcPreview();
})();
