/* ===========================
   KeksSwap – full replacement
   - Top: logo left, no X
   - Language right, transparent button
   - Compact amount input (x2 lower)
   - Bottom nav: Home/History/Profile (no Services)
   - Modal clicks fixed (z-index/pointer)
   - Telegram avatar + username
   - Full i18n: UA/EN/TR/PL
   =========================== */

const tg = window.Telegram?.WebApp;
try { tg?.ready(); } catch(e){}

const state = {
  lang: "UA",
  giveAsset: "USDT",
  getAsset: "USDC",
  giveNet: "TRC20",
  getNet: "ERC20",
  amount: "",
};

const ASSETS = [
  { code:"BTC", name:{UA:"Bitcoin",EN:"Bitcoin",TR:"Bitcoin",PL:"Bitcoin"}, icon:"logos/crypto/btc.png", nets:["BTC"] },
  { code:"ETH", name:{UA:"Ethereum",EN:"Ethereum",TR:"Ethereum",PL:"Ethereum"}, icon:"logos/crypto/eth.png", nets:["ERC20","ARBITRUM","OPTIMISM","POLYGON","BEP20"] },
  { code:"USDT", name:{UA:"Tether",EN:"Tether",TR:"Tether",PL:"Tether"}, icon:"logos/crypto/usdt.png", nets:["TRC20","ERC20","BEP20","POLYGON","ARBITRUM","OPTIMISM","TON"] },
  { code:"USDC", name:{UA:"USD Coin",EN:"USD Coin",TR:"USD Coin",PL:"USD Coin"}, icon:"logos/crypto/usdc.png", nets:["ERC20","BEP20","POLYGON","ARBITRUM","OPTIMISM"] },
  { code:"TRX", name:{UA:"Tron",EN:"Tron",TR:"Tron",PL:"Tron"}, icon:"logos/crypto/trx.png", nets:["TRC20"] },
  { code:"SOL", name:{UA:"Solana",EN:"Solana",TR:"Solana",PL:"Solana"}, icon:"logos/crypto/sol.png", nets:["SOL"] },
  { code:"TON", name:{UA:"Toncoin",EN:"Toncoin",TR:"Toncoin",PL:"Toncoin"}, icon:"logos/crypto/ton.png", nets:["TON"] },
];

const NETWORKS = {
  BTC:     { key:"BTC",     title:"BTC",     sub:(asset)=>`${asset} • BTC`,    icon:"logos/networks/btc.png" },
  SOL:     { key:"SOL",     title:"SOL",     sub:(asset)=>`${asset} • SOL`,    icon:"logos/networks/sol.png" },
  TON:     { key:"TON",     title:"TON",     sub:(asset)=>`${asset} • TON`,    icon:"logos/networks/ton.png" },
  TRC20:   { key:"TRC20",   title:"TRC20",   sub:(asset)=>`${asset} • TRX`,    icon:"logos/networks/trc20.png" },
  ERC20:   { key:"ERC20",   title:"ERC20",   sub:(asset)=>`${asset} • ETH`,    icon:"logos/networks/erc20.png" },
  BEP20:   { key:"BEP20",   title:"BEP20",   sub:(asset)=>`${asset} • BNB`,    icon:"logos/networks/bep20.png" },
  POLYGON: { key:"POLYGON", title:"Polygon", sub:(asset)=>`${asset} • POL`,    icon:"logos/networks/pol.png" },
  ARBITRUM:{ key:"ARBITRUM",title:"Arbitrum",sub:(asset)=>`${asset} • ARB`,    icon:"logos/networks/arb.png" },
  OPTIMISM:{ key:"OPTIMISM",title:"Optimism",sub:(asset)=>`${asset} • OP`,     icon:"logos/networks/op.png" },
};

/* i18n */
const I18N = {
  UA:{
    swapTitle:"Обмін",
    give:"Віддаєте",
    get:"Отримуєте",
    enterAmount:"Введіть суму",
    example:"Наприклад: 10 000",
    youReceive:"Ви отримаєте",
    createOrder:"Створити заявку",

    tabHome:"Головна",
    tabHistory:"Історія",
    tabProfile:"Профіль",

    historyTitle:"Історія",
    historyEmptyTitle:"Поки що немає операцій",
    historyEmptySub:"Тут з’являться ваші заявки та їх статус.",

    level0:"Рівень 0",
    upgrade:"Підвищити",
    myData:"Мої дані",
    tgAccount:"Telegram-акаунт",
    email:"Email-адрес",
    phone:"Номер телефону",
    add:"Додати",
    notAdded:"Не додано",
    settings:"Параметри",
    security:"Безпека",
    securitySub:"Налаштування акаунта",
    language:"Мова",
    logout:"Вийти",

    chooseCurrency:"Виберіть валюту",
    chooseNetwork:"Оберіть мережу",
    onlyAvailable:"Показуємо тільки мережі, які доступні для цієї валюти — щоб не плутати.",
  },
  EN:{
    swapTitle:"Exchange",
    give:"You give",
    get:"You get",
    enterAmount:"Enter amount",
    example:"Example: 10 000",
    youReceive:"You will receive",
    createOrder:"Create request",

    tabHome:"Home",
    tabHistory:"History",
    tabProfile:"Profile",

    historyTitle:"History",
    historyEmptyTitle:"No operations yet",
    historyEmptySub:"Your requests and statuses will appear here.",

    level0:"Level 0",
    upgrade:"Upgrade",
    myData:"My data",
    tgAccount:"Telegram account",
    email:"Email address",
    phone:"Phone number",
    add:"Add",
    notAdded:"Not added",
    settings:"Settings",
    security:"Security",
    securitySub:"Account settings",
    language:"Language",
    logout:"Log out",

    chooseCurrency:"Choose currency",
    chooseNetwork:"Choose network",
    onlyAvailable:"We show only networks available for this asset to avoid confusion.",
  },
  TR:{
    swapTitle:"Takas",
    give:"Veriyorsunuz",
    get:"Alıyorsunuz",
    enterAmount:"Tutar girin",
    example:"Örnek: 10 000",
    youReceive:"Alacaksınız",
    createOrder:"Talep oluştur",

    tabHome:"Ana",
    tabHistory:"Geçmiş",
    tabProfile:"Profil",

    historyTitle:"Geçmiş",
    historyEmptyTitle:"Henüz işlem yok",
    historyEmptySub:"Talepleriniz ve durumları burada görünecek.",

    level0:"Seviye 0",
    upgrade:"Yükselt",
    myData:"Bilgilerim",
    tgAccount:"Telegram hesabı",
    email:"E-posta",
    phone:"Telefon",
    add:"Ekle",
    notAdded:"Eklenmedi",
    settings:"Ayarlar",
    security:"Güvenlik",
    securitySub:"Hesap ayarları",
    language:"Dil",
    logout:"Çıkış",

    chooseCurrency:"Para birimi seçin",
    chooseNetwork:"Ağ seçin",
    onlyAvailable:"Karışıklık olmasın diye sadece bu varlık için uygun ağları gösteriyoruz.",
  },
  PL:{
    swapTitle:"Wymiana",
    give:"Oddajesz",
    get:"Otrzymujesz",
    enterAmount:"Wpisz kwotę",
    example:"Przykład: 10 000",
    youReceive:"Otrzymasz",
    createOrder:"Utwórz zlecenie",

    tabHome:"Główna",
    tabHistory:"Historia",
    tabProfile:"Profil",

    historyTitle:"Historia",
    historyEmptyTitle:"Brak operacji",
    historyEmptySub:"Twoje zlecenia i statusy pojawią się tutaj.",

    level0:"Poziom 0",
    upgrade:"Podnieś",
    myData:"Moje dane",
    tgAccount:"Konto Telegram",
    email:"Adres e-mail",
    phone:"Numer telefonu",
    add:"Dodaj",
    notAdded:"Nie dodano",
    settings:"Ustawienia",
    security:"Bezpieczeństwo",
    securitySub:"Ustawienia konta",
    language:"Język",
    logout:"Wyloguj",

    chooseCurrency:"Wybierz walutę",
    chooseNetwork:"Wybierz sieć",
    onlyAvailable:"Pokazujemy tylko sieci dostępne dla tej waluty, aby uniknąć pomyłek.",
  }
};

function t(key){
  return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.UA[key]) || key;
}

function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    el.textContent = t(k);
  });
  document.getElementById("langVal").textContent = state.lang;
}

/* Telegram user -> avatar */
function initTelegramProfile(){
  const avatar = document.getElementById("tgAvatar");
  const name = document.getElementById("tgName");
  const username = document.getElementById("tgUsername");

  let u = null;
  try { u = tg?.initDataUnsafe?.user || null; } catch(e){}

  if(u){
    const uname = u.username ? "@"+u.username : (u.first_name || "Telegram");
    name.textContent = uname;
    username.textContent = uname;

    // photo_url in WebApp user (if provided)
    if(u.photo_url){
      avatar.src = u.photo_url;
    }else{
      avatar.src = "";
    }
  }else{
    // Fallback
    name.textContent = "@telegram";
    username.textContent = "@telegram";
    avatar.src = "";
  }

  // fallback avatar if no src
  avatar.onerror = () => { avatar.src = ""; };
  if(!avatar.src){
    // simple placeholder via inline SVG data-uri
    const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
      <rect rx='28' ry='28' width='120' height='120' fill='#d9f0ff'/>
      <circle cx='60' cy='48' r='18' fill='#7dbff0'/>
      <rect x='26' y='72' width='68' height='28' rx='14' fill='#7dbff0'/>
    </svg>`);
    avatar.src = `data:image/svg+xml,${svg}`;
  }
}

/* Tabs */
function setTab(tab){
  document.querySelectorAll(".tab").forEach(b=>{
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(`page-${tab}`).classList.add("active");
}

/* Amount format */
function formatSpaces(numStr){
  // keep digits + dot/comma
  let s = numStr.replace(/[^\d.,]/g,"").replace(/,/g,".");
  const parts = s.split(".");
  let intPart = parts[0] || "";
  intPart = intPart.replace(/^0+(?=\d)/,"");
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  if(parts.length > 1){
    let dec = parts[1].slice(0, 8);
    return `${intPart}${dec ? "."+dec : ""}`;
  }
  return intPart || "0";
}

function parseNumber(str){
  const s = (str||"").toString().replace(/\s/g,"").replace(/,/g,".");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

/* Dummy rate (placeholder) */
function calc(){
  const a = parseNumber(state.amount);
  // placeholder: 0.985 rate
  const rate = 0.985;
  const out = a ? (a*rate) : 0;
  document.getElementById("resultNum").textContent = (out ? out.toLocaleString("en-US", {maximumFractionDigits: 8}) : "0").replace(/,/g," ");
  document.getElementById("resultCur").textContent = state.getAsset;
}

/* UI update */
function getAsset(code){
  return ASSETS.find(x=>x.code===code) || ASSETS[0];
}
function setAssetUI(prefix, code){
  const a = getAsset(code);
  document.getElementById(`${prefix}AssetName`).textContent = `${a.name[state.lang] || a.name.UA} (${a.code})`;
  document.getElementById(`${prefix}AssetCode`).textContent = a.code;
  const ic = document.getElementById(`${prefix}AssetIcon`);
  ic.src = a.icon;
  ic.style.display = "";
}

function setNetUI(prefix, netKey, assetCode){
  const n = NETWORKS[netKey];
  document.getElementById(`${prefix}NetName`).textContent = n.title;
  document.getElementById(`${prefix}NetSub`).textContent = n.sub(assetCode);
  const ic = document.getElementById(`${prefix}NetIcon`);
  ic.src = n.icon;
  ic.style.display = "";
}

function syncUI(){
  setAssetUI("give", state.giveAsset);
  setAssetUI("get", state.getAsset);
  setNetUI("give", state.giveNet, state.giveAsset);
  setNetUI("get", state.getNet, state.getAsset);

  document.getElementById("amountChip").textContent = state.giveAsset;
  document.getElementById("resultCur").textContent = state.getAsset;
  document.getElementById("langCode").textContent = state.lang;
  document.getElementById("langVal").textContent = state.lang;
  calc();
}

/* Modal */
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const modalList = document.getElementById("modalList");

function openModal(title, sub, items, onPick){
  modalTitle.textContent = title;
  modalSub.textContent = sub || "";
  modalList.innerHTML = "";

  items.forEach(it=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modal-item";
    btn.innerHTML = `
      <div class="modal-item-left">
        <img class="select-icon" src="${it.icon || ""}" alt="" onerror="this.style.display='none'">
        <div style="min-width:0">
          <div class="modal-item-title">${it.title}</div>
          ${it.sub ? `<div class="modal-item-sub">${it.sub}</div>` : ``}
        </div>
      </div>
      <div class="modal-item-right">›</div>
    `;
    btn.addEventListener("click", ()=>{
      onPick(it);
      closeModal();
    });
    modalList.appendChild(btn);
  });

  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  overlay.setAttribute("aria-hidden","false");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  overlay.setAttribute("aria-hidden","true");
  modal.setAttribute("aria-hidden","true");
}

/* Language sheet */
const langSheet = document.getElementById("langSheet");
function openLang(){
  overlay.classList.remove("hidden");
  langSheet.classList.remove("hidden");
  overlay.setAttribute("aria-hidden","false");
  langSheet.setAttribute("aria-hidden","false");
}
function closeLang(){
  overlay.classList.add("hidden");
  langSheet.classList.add("hidden");
  overlay.setAttribute("aria-hidden","true");
  langSheet.setAttribute("aria-hidden","true");
}

/* Helpers: ensure selected net exists for selected asset */
function ensureNetForAsset(assetCode, currentNet){
  const a = getAsset(assetCode);
  if(a.nets.includes(currentNet)) return currentNet;
  return a.nets[0];
}

/* Events */
document.querySelectorAll(".tab").forEach(b=>{
  b.addEventListener("click", ()=> setTab(b.dataset.tab));
});

document.getElementById("modalClose").addEventListener("click", closeModal);
overlay.addEventListener("click", ()=>{ closeModal(); closeLang(); });

document.getElementById("langBtn").addEventListener("click", openLang);
document.getElementById("langClose").addEventListener("click", closeLang);
document.querySelectorAll(".sheet-item").forEach(b=>{
  b.addEventListener("click", ()=>{
    state.lang = b.dataset.lang;
    applyI18n();
    syncUI();
    closeLang();
  });
});

document.getElementById("giveAssetBtn").addEventListener("click", ()=>{
  const items = ASSETS.map(a=>({
    key:a.code,
    title:`${a.name[state.lang] || a.name.UA} (${a.code})`,
    sub:a.code,
    icon:a.icon
  }));
  openModal(t("chooseCurrency"), "", items, (it)=>{
    state.giveAsset = it.key;
    state.giveNet = ensureNetForAsset(state.giveAsset, state.giveNet);
    document.getElementById("amountChip").textContent = state.giveAsset;
    syncUI();
  });
});

document.getElementById("getAssetBtn").addEventListener("click", ()=>{
  const items = ASSETS.map(a=>({
    key:a.code,
    title:`${a.name[state.lang] || a.name.UA} (${a.code})`,
    sub:a.code,
    icon:a.icon
  }));
  openModal(t("chooseCurrency"), "", items, (it)=>{
    state.getAsset = it.key;
    state.getNet = ensureNetForAsset(state.getAsset, state.getNet);
    syncUI();
  });
});

function openNetPicker(prefix){
  const assetCode = prefix === "give" ? state.giveAsset : state.getAsset;
  const a = getAsset(assetCode);
  const items = a.nets.map(nk=>{
    const n = NETWORKS[nk];
    return {
      key:nk,
      title:n.title,
      sub:n.sub(assetCode),
      icon:n.icon
    };
  });
  openModal(t("chooseNetwork"), t("onlyAvailable"), items, (it)=>{
    if(prefix === "give") state.giveNet = it.key;
    else state.getNet = it.key;
    syncUI();
  });
}

document.getElementById("giveNetBtn").addEventListener("click", ()=> openNetPicker("give"));
document.getElementById("getNetBtn").addEventListener("click", ()=> openNetPicker("get"));

document.getElementById("swapBtn").addEventListener("click", ()=>{
  // swap assets + nets
  const a = state.giveAsset;
  const n = state.giveNet;

  state.giveAsset = state.getAsset;
  state.giveNet = state.getNet;

  state.getAsset = a;
  state.getNet = n;

  // ensure nets still valid for swapped assets
  state.giveNet = ensureNetForAsset(state.giveAsset, state.giveNet);
  state.getNet = ensureNetForAsset(state.getAsset, state.getNet);

  syncUI();
});

const amountInput = document.getElementById("amountInput");
amountInput.addEventListener("input", ()=>{
  const formatted = formatSpaces(amountInput.value);
  amountInput.value = formatted;
  state.amount = formatted;
  calc();
});

document.getElementById("createOrderBtn").addEventListener("click", ()=>{
  // Placeholder: show simple alert, replace with real order creation
  const msg = `Order: ${state.giveAsset} ${state.amount || "0"} (${state.giveNet}) → ${state.getAsset} (${state.getNet})`;
  if(tg?.showPopup){
    tg.showPopup({title:"KeksSwap", message: msg, buttons:[{type:"ok"}]});
  }else{
    alert(msg);
  }
});

/* Profile rows placeholders */
document.getElementById("kycBtn").addEventListener("click", ()=>{
  const msg = (state.lang==="UA") ? "KYC/Верифікація буде тут." :
              (state.lang==="EN") ? "KYC/Verification will be here." :
              (state.lang==="TR") ? "KYC/Doğrulama burada olacak." :
              "KYC/Weryfikacja będzie tutaj.";
  if(tg?.showPopup){
    tg.showPopup({title:"KeksSwap", message: msg, buttons:[{type:"ok"}]});
  }else alert(msg);
});

document.getElementById("rowLang").addEventListener("click", openLang);

/* Init */
(function init(){
  // language by Telegram
  try{
    const tl = tg?.initDataUnsafe?.user?.language_code;
    if(tl){
      const up = tl.toUpperCase();
      if(up.startsWith("PL")) state.lang="PL";
      else if(up.startsWith("TR")) state.lang="TR";
      else if(up.startsWith("EN")) state.lang="EN";
      else if(up.startsWith("UK") || up.startsWith("UA")) state.lang="UA";
    }
  }catch(e){}

  document.getElementById("langCode").textContent = state.lang;
  applyI18n();
  initTelegramProfile();

  // default nets valid
  state.giveNet = ensureNetForAsset(state.giveAsset, state.giveNet);
  state.getNet = ensureNetForAsset(state.getAsset, state.getNet);

  syncUI();
  setTab("exchange");
})();
