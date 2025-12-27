// KeksSwap - UI only (no backend)
// Supports: crypto <-> crypto, crypto <-> bank (as asset).
// Shows card fields only when "Get" asset is Bank.

const $ = (id) => document.getElementById(id);

const state = {
  lang: "EN",
  give: { type: "crypto", asset: "usdt", network: "trc20" },
  get:  { type: "crypto", asset: "usdc", network: "erc20" },
  bank: { code: "mono", cardNumber: "", fullName: "" },
  history: []
};

// Assets (match your file names)
const CRYPTO = [
  { code:"usdt", title:{EN:"Tether (USDT)", TR:"Tether (USDT)", PL:"Tether (USDT)"}, sym:"USDT", icon:"logos/crypto/tether-usdt.png" },
  { code:"usdc", title:{EN:"USD Coin (USDC)", TR:"USD Coin (USDC)", PL:"USD Coin (USDC)"}, sym:"USDC", icon:"logos/crypto/usdc.png" },
  { code:"btc",  title:{EN:"Bitcoin (BTC)", TR:"Bitcoin (BTC)", PL:"Bitcoin (BTC)"}, sym:"BTC", icon:"logos/crypto/btc.png" },
  { code:"eth",  title:{EN:"Ethereum (ETH)", TR:"Ethereum (ETH)", PL:"Ethereum (ETH)"}, sym:"ETH", icon:"logos/crypto/eth.png" },
  { code:"ltc",  title:{EN:"Litecoin (LTC)", TR:"Litecoin (LTC)", PL:"Litecoin (LTC)"}, sym:"LTC", icon:"logos/crypto/ltc.png" },
  { code:"sol",  title:{EN:"Solana (SOL)", TR:"Solana (SOL)", PL:"Solana (SOL)"}, sym:"SOL", icon:"logos/crypto/sol.png" },
  { code:"ton",  title:{EN:"Toncoin (TON)", TR:"Toncoin (TON)", PL:"Toncoin (TON)"}, sym:"TON", icon:"logos/crypto/ton.png" },
  { code:"trx",  title:{EN:"Tron (TRX)", TR:"Tron (TRX)", PL:"Tron (TRX)"}, sym:"TRX", icon:"logos/crypto/trx.png" }
];

const BANKS = [
  { code:"mono",  title:"Monobank",  icon:"logos/banks/mono.png" },
  { code:"privat",title:"PrivatBank", icon:"logos/banks/privat.png" },
  { code:"pumb",  title:"PUMB",      icon:"logos/banks/pumb.png" },
  { code:"oschad",title:"Oschadbank", icon:"logos/banks/oschad.png" },
  { code:"a",     title:"A-Bank",    icon:"logos/banks/a-bank.png" },
  { code:"otp",   title:"OTP Bank",  icon:"logos/banks/otp.png" },
  { code:"izi",   title:"iziBank",   icon:"logos/banks/izi.png" },
  { code:"sense", title:"Sense",     icon:"logos/banks/sense.png" },
  { code:"reyf",  title:"Raiffeisen",icon:"logos/banks/reyf.png" },
  { code:"ukrsib",title:"UKRSIBBANK",icon:"logos/banks/ukr-sib.png" },
  { code:"visa",  title:"Visa/Master",icon:"logos/banks/visa-master.png" }
];

// Networks available (your icons)
const NETWORKS = [
  { code:"erc20", title:"ERC20", sub:"ETH", icon:"logos/networks/erc20.png" },
  { code:"trc20", title:"TRC20", sub:"TRX", icon:"logos/networks/trc20.png" },
  { code:"bep20", title:"BEP20", sub:"BSC • BNB", icon:"logos/networks/bep20.png" },
  { code:"ton",   title:"TON",   sub:"TON", icon:"logos/networks/ton.png" },
  { code:"sol",   title:"SOL",   sub:"SOL", icon:"logos/networks/sol.png" },
  { code:"arb",   title:"ARB",   sub:"Arbitrum", icon:"logos/networks/arb.png" },
  { code:"op",    title:"OP",    sub:"Optimism", icon:"logos/networks/op.png" },
  { code:"pol",   title:"POL",   sub:"Polygon", icon:"logos/networks/pol.png" }
];

// Which networks for each crypto
const CRYPTO_NETWORKS = {
  usdt: ["trc20","erc20","bep20","ton"],
  usdc: ["erc20","arb","op","pol","sol"],
  btc:  ["btc"],
  eth:  ["erc20","arb","op"],
  ltc:  ["ltc"],
  sol:  ["sol"],
  ton:  ["ton"],
  trx:  ["trc20"]
};

// Fake networks for L1 coins to show "Network" button still works
const SPECIAL_NET = {
  btc:{ code:"btc", title:"BTC", sub:"Bitcoin", icon:"logos/crypto/btc.png" },
  ltc:{ code:"ltc", title:"LTC", sub:"Litecoin", icon:"logos/crypto/ltc.png" }
};

// Languages (as you asked)
const LANGS = [
  { code:"EN", title:"English" },
  { code:"TR", title:"Türkçe" },
  { code:"PL", title:"Polski" }
];

// Text dictionary (minimal)
const I18N = {
  EN:{
    Exchange:"Exchange",
    Swap:"Swap",
    Give:"You send",
    Get:"You receive",
    Hint:"Choose assets and enter amount",
    EnterSum:"Enter amount",
    Example:"Example: 10 000",
    YouGet:"You will get",
    Create:"Create request",
    PayToCard:"Receive to card",
    Bank:"Bank",
    ChooseBank:"Choose bank",
    CardNumber:"Card number",
    FullName:"Full name",
    Home:"Home",
    History:"History",
    Profile:"Profile",
    HistoryEmpty:"No requests yet. Create the first one on Home.",
    Newbie:"Newbie",
    Referral:"Referral program",
    Promo:"Promotions & promo codes",
    Prefs:"Preferences",
    Saved:"Saved details",
    AccCurrency:"Account currency",
    Language:"Language",
    Settings:"Settings",
    Security:"Security",
    Devices:"Devices",
    Choose:"Choose",
    ChooseAsset:"Choose asset",
    ChooseNetwork:"Choose network",
    ChooseLanguage:"Language"
  },
  TR:{
    Exchange:"Değişim",
    Swap:"Swap",
    Give:"Gönderiyorsun",
    Get:"Alıyorsun",
    Hint:"Varlıkları seçin ve tutarı girin",
    EnterSum:"Tutar girin",
    Example:"Örn: 10 000",
    YouGet:"Alacağınız",
    Create:"Talep oluştur",
    PayToCard:"Karta alım",
    Bank:"Banka",
    ChooseBank:"Banka seçin",
    CardNumber:"Kart numarası",
    FullName:"Ad Soyad",
    Home:"Ana",
    History:"Geçmiş",
    Profile:"Profil",
    HistoryEmpty:"Henüz talep yok. Ana sayfadan oluşturun.",
    Newbie:"Yeni",
    Referral:"Referans programı",
    Promo:"Kampanyalar & kodlar",
    Prefs:"Tercihler",
    Saved:"Kayıtlı bilgiler",
    AccCurrency:"Hesap para birimi",
    Language:"Dil",
    Settings:"Ayarlar",
    Security:"Güvenlik",
    Devices:"Cihazlar",
    Choose:"Seç",
    ChooseAsset:"Varlık seç",
    ChooseNetwork:"Ağ seç",
    ChooseLanguage:"Dil"
  },
  PL:{
    Exchange:"Wymiana",
    Swap:"Swap",
    Give:"Wysyłasz",
    Get:"Otrzymujesz",
    Hint:"Wybierz aktywa i wpisz kwotę",
    EnterSum:"Wpisz kwotę",
    Example:"Np.: 10 000",
    YouGet:"Otrzymasz",
    Create:"Utwórz zlecenie",
    PayToCard:"Odbiór na kartę",
    Bank:"Bank",
    ChooseBank:"Wybierz bank",
    CardNumber:"Numer karty",
    FullName:"Imię i nazwisko",
    Home:"Główna",
    History:"Historia",
    Profile:"Profil",
    HistoryEmpty:"Brak zleceń. Utwórz pierwsze na stronie głównej.",
    Newbie:"Nowy",
    Referral:"Program partnerski",
    Promo:"Promocje i kody",
    Prefs:"Preferencje",
    Saved:"Zapisane dane",
    AccCurrency:"Waluta konta",
    Language:"Język",
    Settings:"Ustawienia",
    Security:"Bezpieczeństwo",
    Devices:"Urządzenia",
    Choose:"Wybierz",
    ChooseAsset:"Wybierz aktywo",
    ChooseNetwork:"Wybierz sieć",
    ChooseLanguage:"Język"
  }
};

function t(key){
  const dict = I18N[state.lang] || I18N.EN;
  return dict[key] || key;
}

function cryptoBy(code){ return CRYPTO.find(x=>x.code===code); }
function bankBy(code){ return BANKS.find(x=>x.code===code); }
function netBy(code){ return NETWORKS.find(x=>x.code===code); }

function isBankSide(side){
  return state[side].type === "bank";
}

function getAssetDisplay(side){
  const s = state[side];
  if(s.type === "crypto"){
    const c = cryptoBy(s.asset);
    return { title: c.title[state.lang] || c.title.EN, sub: c.sym, icon: c.icon, badge: c.sym };
  }
  // bank as "asset"
  const b = bankBy(state.bank.code);
  return { title: b.title, sub: "UAH • Card", icon: b.icon, badge: "UAH" };
}

function getNetworkDisplay(side){
  const s = state[side];
  if(s.type === "bank"){
    // bank doesn't have network
    return { title: t("Bank"), sub: "Card • UAH", icon: bankBy(state.bank.code).icon };
  }
  const c = cryptoBy(s.asset);
  const list = CRYPTO_NETWORKS[s.asset] || [];
  if(list.includes(s.network)){
    const n = netBy(s.network);
    if(n) return { title: n.title, sub: `${c.sym} • ${n.sub}`, icon: n.icon };
  }
  // Special chain coin
  if(SPECIAL_NET[s.asset]){
    const n = SPECIAL_NET[s.asset];
    return { title: n.title, sub: `${c.sym} • ${n.sub}`, icon: n.icon };
  }
  // fallback
  const n = netBy(list[0]) || netBy("erc20");
  return { title: n.title, sub: `${c.sym} • ${n.sub}`, icon: n.icon };
}

function ensureNetworkValid(side){
  const s = state[side];
  if(s.type !== "crypto") return;
  const allowed = CRYPTO_NETWORKS[s.asset] || [];
  if(allowed.length === 0) return;
  if(!allowed.includes(s.network)){
    s.network = allowed[0];
  }
}

function renderTexts(){
  $("brandSub").textContent = t("Exchange");
  $("tExchange").textContent = t("Exchange");
  $("tHint").textContent = t("Hint");
  $("tGive").textContent = t("Give");
  $("tGet").textContent = t("Get");
  $("tEnterSum").textContent = t("EnterSum");
  $("tExample").textContent = t("Example");
  $("tYouGet").textContent = t("YouGet");
  $("tCreate").textContent = t("Create");

  $("tPayToCard").textContent = t("PayToCard");
  $("tBank").textContent = t("Bank");
  $("tChooseBank").textContent = t("ChooseBank");
  $("tCardNumber").textContent = t("CardNumber");
  $("tFullName").textContent = t("FullName");

  $("tHome").textContent = t("Home");
  $("tNavHistory").textContent = t("History");
  $("tProfile").textContent = t("Profile");

  $("tHistory").textContent = t("History");
  $("tHistoryEmpty").textContent = t("HistoryEmpty");
  $("tNewbie").textContent = t("Newbie");

  $("tReferral").textContent = t("Referral");
  $("tPromo").textContent = t("Promo");
  $("tPrefs").textContent = t("Prefs");
  $("tSaved").textContent = t("Saved");
  $("tAccCurrency").textContent = t("AccCurrency");
  $("tLanguage").textContent = t("Language");
  $("tSettings").textContent = t("Settings");
  $("tSecurity").textContent = t("Security");
  $("tDevices").textContent = t("Devices");

  $("langLabel").textContent = state.lang;
  $("langRight").textContent = LANGS.find(x=>x.code===state.lang)?.title || "English";
}

function renderSide(side){
  ensureNetworkValid(side);
  const asset = getAssetDisplay(side);
  const net = getNetworkDisplay(side);

  if(side === "give"){
    $("giveAssetTitle").textContent = asset.title;
    $("giveAssetSub").textContent = asset.sub;
    $("giveAssetIcon").src = asset.icon;
    $("giveBadge").textContent = asset.badge;

    $("giveNetTitle").textContent = net.title;
    $("giveNetSub").textContent = net.sub;
    $("giveNetIcon").src = net.icon;
  } else {
    $("getAssetTitle").textContent = asset.title;
    $("getAssetSub").textContent = asset.sub;
    $("getAssetIcon").src = asset.icon;

    $("getNetTitle").textContent = net.title;
    $("getNetSub").textContent = net.sub;
    $("getNetIcon").src = net.icon;
  }
}

function renderBankFields(){
  // show only if "get" is bank
  const show = isBankSide("get");
  $("cardFields").style.display = show ? "block" : "none";

  // bank button inside fields
  const b = bankBy(state.bank.code);
  $("getBankTitle").textContent = b.title;
  $("getBankIcon").src = b.icon;

  $("cardNumber").value = state.bank.cardNumber || "";
  $("fullName").value = state.bank.fullName || "";
}

function renderHistory(){
  const list = $("historyList");
  list.innerHTML = "";
  if(state.history.length === 0) return;

  state.history.slice().reverse().forEach(item=>{
    const div = document.createElement("div");
    div.className = "hItem";
    div.innerHTML = `
      <div class="hLeft">
        <div class="hTitle">${item.title}</div>
        <div class="hSub">${item.sub}</div>
      </div>
      <div class="hRight">${item.date}</div>
    `;
    list.appendChild(div);
  });
}

function renderAll(){
  renderTexts();
  renderSide("give");
  renderSide("get");
  renderBankFields();
  calcPreview();
  renderHistory();
}

function calcPreview(){
  // UI preview only: 1:1 + minor demo
  const valRaw = ($("giveAmount").value || "").replace(/\s/g,"").replace(",",".");
  const v = Number(valRaw);
  if(!isFinite(v) || v<=0){
    $("getAmount").textContent = "0";
    return;
  }

  // simple demo rate: if crypto->crypto 1:1, if bank included add small factor
  let out = v;
  const giveIsBank = isBankSide("give");
  const getIsBank  = isBankSide("get");

  if(giveIsBank && !getIsBank) out = v / 40;        // UAH -> crypto demo
  if(!giveIsBank && getIsBank) out = v * 40;        // crypto -> UAH demo
  if(giveIsBank && getIsBank)  out = v;             // UAH -> UAH

  $("getAmount").textContent = formatNum(out);
}

function formatNum(x){
  // nice formatting
  const s = (Math.round(x*100)/100).toString();
  const parts = s.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

// ---------- Modal ----------
let modalMode = null;

function openModal(title, items){
  $("modalTitle").textContent = title;
  const body = $("modalBody");
  body.innerHTML = "";

  items.forEach(it=>{
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modalItem";
    btn.innerHTML = `
      <img src="${it.icon || ""}" alt="">
      <div class="miText">
        <div class="miTitle">${it.title}</div>
        <div class="miSub">${it.sub || ""}</div>
      </div>
      <div class="miChev">›</div>
    `;
    btn.onclick = () => it.onClick();
    body.appendChild(btn);
  });

  $("modal").classList.add("show");
}

function closeModal(){
  $("modal").classList.remove("show");
  modalMode = null;
}

$("modalClose").onclick = closeModal;
$("modal").addEventListener("click", (e)=>{
  // NO backdrop, but allow closing if click outside sheet
  if(e.target === $("modal")) closeModal();
});

// ---------- Asset selection logic ----------
function openAssetPicker(side){
  modalMode = `${side}-asset`;

  const items = [];

  // crypto items
  CRYPTO.forEach(c=>{
    items.push({
      icon: c.icon,
      title: c.title[state.lang] || c.title.EN,
      sub: c.sym,
      onClick: ()=>{
        state[side].type = "crypto";
        state[side].asset = c.code;
        // set default network
        const allowed = CRYPTO_NETWORKS[c.code] || [];
        state[side].network = allowed[0] || "erc20";
        closeModal();
        renderAll();
      }
    });
  });

  // bank as asset (UAH card)
  items.unshift({
    icon: bankBy(state.bank.code).icon,
    title: t("Bank") + " (UAH • Card)",
    sub: t("ChooseBank"),
    onClick: ()=>{
      state[side].type = "bank";
      closeModal();
      renderAll();
      // if user picked bank on "get" - open banks instantly
      if(side === "get") openBankPicker();
    }
  });

  openModal(t("ChooseAsset"), items);
}

function openNetworkPicker(side){
  modalMode = `${side}-net`;

  // If bank on this side -> open banks (network not relevant)
  if(state[side].type === "bank"){
    openBankPicker();
    return;
  }

  const c = cryptoBy(state[side].asset);
  const allowed = CRYPTO_NETWORKS[state[side].asset] || [];
  const items = [];

  // special L1 networks
  if(SPECIAL_NET[state[side].asset]){
    const sp = SPECIAL_NET[state[side].asset];
    items.push({
      icon: sp.icon,
      title: sp.title,
      sub: `${c.sym} • ${sp.sub}`,
      onClick: ()=>{
        state[side].network = sp.code;
        closeModal();
        renderAll();
      }
    });
  } else {
    allowed.forEach(code=>{
      const n = netBy(code);
      if(!n) return;
      items.push({
        icon: n.icon,
        title: n.title,
        sub: `${c.sym} • ${n.sub}`,
        onClick: ()=>{
          state[side].network = code;
          closeModal();
          renderAll();
        }
      });
    });
  }

  openModal(t("ChooseNetwork"), items);
}

function openBankPicker(){
  modalMode = `bank`;

  const items = BANKS.map(b=>({
    icon: b.icon,
    title: b.title,
    sub: "",
    onClick: ()=>{
      state.bank.code = b.code;
      closeModal();
      renderAll();
    }
  }));

  openModal(t("ChooseBank"), items);
}

function openLangPicker(){
  modalMode = "lang";

  const items = LANGS.map(l=>({
    icon: "logos/crypto/ton.png",
    title: l.title,
    sub: l.code,
    onClick: ()=>{
      state.lang = l.code;
      closeModal();
      renderAll();
    }
  }));

  openModal(t("ChooseLanguage"), items);
}

// ---------- Events ----------
$("giveAssetBtn").onclick = ()=>openAssetPicker("give");
$("getAssetBtn").onclick  = ()=>openAssetPicker("get");
$("giveNetBtn").onclick   = ()=>openNetworkPicker("give");
$("getNetBtn").onclick    = ()=>openNetworkPicker("get");

$("getBankBtn").onclick   = ()=>openBankPicker();
$("langBtn").onclick      = ()=>openLangPicker();
$("openLangFromProfile").onclick = ()=>openLangPicker();

$("giveAmount").addEventListener("input", calcPreview);

$("cardNumber").addEventListener("input", ()=>{
  state.bank.cardNumber = $("cardNumber").value;
});
$("fullName").addEventListener("input", ()=>{
  state.bank.fullName = $("fullName").value;
});

$("swapBtn").onclick = ()=>{
  // swap give/get
  const tmp = JSON.parse(JSON.stringify(state.give));
  state.give = JSON.parse(JSON.stringify(state.get));
  state.get  = tmp;

  // if both became bank, keep bank code; if get became bank -> show fields
  renderAll();
};

$("createBtn").onclick = ()=>{
  // validation for card fields if needed
  if(isBankSide("get")){
    const cn = ($("cardNumber").value||"").trim();
    const fn = ($("fullName").value||"").trim();
    if(cn.length < 12 || fn.length < 3){
      alert("Вкажіть номер картки та ПІБ");
      return;
    }
  }

  // save demo history
  const g = isBankSide("give")
    ? `UAH • ${bankBy(state.bank.code).title}`
    : `${cryptoBy(state.give.asset).sym} • ${getNetworkDisplay("give").title}`;

  const r = isBankSide("get")
    ? `UAH • ${bankBy(state.bank.code).title}`
    : `${cryptoBy(state.get.asset).sym} • ${getNetworkDisplay("get").title}`;

  const amt = ($("giveAmount").value||"0").trim() || "0";
  const out = $("getAmount").textContent;

  state.history.push({
    title: `${g} → ${r}`,
    sub: `${amt} → ${out}`,
    date: new Date().toLocaleString()
  });

  alert("Заявка створена (demo)");
  renderAll();
};

// Nav
document.querySelectorAll(".navBtn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const to = btn.dataset.go;
    document.querySelectorAll(".navBtn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    $("page-"+to).classList.add("active");
  });
});

// Init icons for first render
function setInitialIcons(){
  // set srcs to prevent broken image icon flashes
  $("giveAssetIcon").src = cryptoBy(state.give.asset).icon;
  $("getAssetIcon").src  = cryptoBy(state.get.asset).icon;

  const n1 = getNetworkDisplay("give");
  const n2 = getNetworkDisplay("get");
  $("giveNetIcon").src = n1.icon;
  $("getNetIcon").src  = n2.icon;

  const b = bankBy(state.bank.code);
  $("getBankIcon").src = b.icon;
}

(function init(){
  try{
    // Telegram WebApp safety (if present)
    if(window.Telegram && Telegram.WebApp){
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
    }
  }catch(e){}

  setInitialIcons();
  renderAll();

  // remove that old "NEW APP.JS LOADED" alert: we do nothing here
})();
