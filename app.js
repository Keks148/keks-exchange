/* KeksSwap Mini App (no frameworks) */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/** Telegram init (safe) */
(function tgInit() {
  try {
    if (window.Telegram && Telegram.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
      Telegram.WebApp.disableVerticalSwipes?.();
      Telegram.WebApp.setBackgroundColor?.('#E9E7FF');
      Telegram.WebApp.setHeaderColor?.('secondary_bg_color');
    }
  } catch (e) {}
})();

/** --- Data --- **/
const ASSET = {
  // Paths should match your repo folders
  crypto: {
    base: "./logos/crypto/",
    items: [
      { id:"btc", name:"Bitcoin", code:"BTC", logo:"btc.png", tag:"Crypto" },
      { id:"eth", name:"Ethereum", code:"ETH", logo:"eth.png", tag:"Crypto" },
      { id:"ltc", name:"Litecoin", code:"LTC", logo:"ltc.png", tag:"Crypto" },
      { id:"sol", name:"Solana", code:"SOL", logo:"sol.png", tag:"Crypto" },
      { id:"ton", name:"TON", code:"TON", logo:"ton.png", tag:"Crypto" },
      { id:"trx", name:"TRON", code:"TRX", logo:"trx.png", tag:"Crypto" },

      // USDT networks (you have files: usdt-eth, usdt-trc, usdt-bep, usdt-arb, usdt-pol, usdt-sol)
      { id:"usdt-trc", name:"Tether", code:"USDT (TRC20)", logo:"usdt-trc.png", tag:"USDT" },
      { id:"usdt-eth", name:"Tether", code:"USDT (ERC20)", logo:"usdt-eth.png", tag:"USDT" },
      { id:"usdt-bep", name:"Tether", code:"USDT (BEP20)", logo:"usdt-bep.png", tag:"USDT" },
      { id:"usdt-arb", name:"Tether", code:"USDT (ARB)", logo:"usdt-arb.png", tag:"USDT" },
      { id:"usdt-pol", name:"Tether", code:"USDT (POL)", logo:"usdt-pol.png", tag:"USDT" },
      { id:"usdt-sol", name:"Tether", code:"USDT (SOL)", logo:"usdt-sol.png", tag:"USDT" },

      // USDC networks (you have: usdc-eth, usdc-sol, usdc-pol)
      { id:"usdc-eth", name:"USD Coin", code:"USDC (ERC20)", logo:"usdc-eth.png", tag:"USDC" },
      { id:"usdc-sol", name:"USD Coin", code:"USDC (SOL)", logo:"usdc-sol.png", tag:"USDC" },
      { id:"usdc-pol", name:"USD Coin", code:"USDC (POL)", logo:"usdc-pol.png", tag:"USDC" },
    ],
    topIds: ["usdt-trc","usdt-bep","btc","eth","ton","usdc-eth"]
  },

  banks: {
    base: "./logos/banks/",
    items: [
      { id:"mono", name:"Monobank", code:"UAH", logo:"mono.png", tag:"Bank" },
      { id:"privat", name:"PrivatBank", code:"UAH", logo:"privat.png", tag:"Bank" },
      { id:"a-bank", name:"A-Bank", code:"UAH", logo:"a-bank.png", tag:"Bank" },
      { id:"oschad", name:"Oschadbank", code:"UAH", logo:"oschad.png", tag:"Bank" },
      { id:"otp", name:"OTP Bank", code:"UAH", logo:"otp.png", tag:"Bank" },
      { id:"pumb", name:"PUMB", code:"UAH", logo:"pumb.png", tag:"Bank" },
      { id:"sense", name:"Sense Bank", code:"UAH", logo:"sense.png", tag:"Bank" },
      { id:"izi", name:"IziBank", code:"UAH", logo:"izi.png", tag:"Bank" },
      { id:"reyf", name:"Raiffeisen", code:"UAH", logo:"reyf.png", tag:"Bank" },
      { id:"ukr-banki", name:"UKR Banks", code:"UAH", logo:"ukr-banki.png", tag:"Bank" },
      { id:"ukr-sib", name:"UKRSIBBANK", code:"UAH", logo:"ukr-sib.png", tag:"Bank" },
      { id:"visa-master", name:"Visa/Mastercard", code:"UAH", logo:"visa-master.png", tag:"Card" },
    ],
    topIds: ["mono","privat","a-bank","visa-master"]
  },

  wallets: {
    base: "./logos/wallets/",
    items: [
      { id:"paypal", name:"PayPal", code:"USD/EUR", logo:"paypal.png", tag:"Wallet" },
      { id:"payoneer", name:"Payoneer", code:"USD/EUR", logo:"payoneer.png", tag:"Wallet" },
      { id:"revolut", name:"Revolut", code:"EUR/GBP", logo:"revolut.png", tag:"Wallet" },
      { id:"valet", name:"Valet", code:"USD/EUR", logo:"valet.png", tag:"Wallet" },
      { id:"vise", name:"Wise", code:"USD/EUR", logo:"vise.png", tag:"Wallet" },
    ],
    topIds: ["paypal","revolut","vise"]
  }
};

function buildAllItems() {
  const crypto = ASSET.crypto.items.map(x => ({...x, group:"crypto", logoPath: ASSET.crypto.base + x.logo}));
  const banks  = ASSET.banks.items.map(x => ({...x, group:"banks",  logoPath: ASSET.banks.base  + x.logo}));
  const wallets= ASSET.wallets.items.map(x => ({...x, group:"wallets",logoPath: ASSET.wallets.base+ x.logo}));
  return [...crypto, ...banks, ...wallets];
}
const ALL_ITEMS = buildAllItems();

/** --- State --- **/
const state = {
  route: "exchange",
  lang: "UA",
  pickSide: "from", // 'from' or 'to'
  filter: "all",
  search: "",
  from: findItem("mono"),
  to: findItem("btc"),
};

function findItem(id){
  return ALL_ITEMS.find(x => x.id === id) || ALL_ITEMS[0];
}

/** --- Routing --- **/
const views = $$("[data-view]");
const navBtns = $$(".nav__btn");

function setRoute(route){
  state.route = route;

  views.forEach(v => v.hidden = (v.dataset.view !== route));
  navBtns.forEach(b => b.classList.toggle("is-active", b.dataset.route === route));
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => setRoute(btn.dataset.route));
});

/** --- Language dropdown --- **/
const langBtn = $("#langBtn");
const langMenu = $("#langMenu");
const langLabel = $("#langLabel");

function openLangMenu(open){
  if(open){
    langMenu.classList.add("is-open");
    langBtn.setAttribute("aria-expanded","true");
    langMenu.setAttribute("aria-hidden","false");
  }else{
    langMenu.classList.remove("is-open");
    langBtn.setAttribute("aria-expanded","false");
    langMenu.setAttribute("aria-hidden","true");
  }
}

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openLangMenu(!langMenu.classList.contains("is-open"));
});

langMenu.addEventListener("click", (e) => {
  const item = e.target.closest("[data-lang]");
  if(!item) return;
  state.lang = item.dataset.lang;
  langLabel.textContent = state.lang;
  openLangMenu(false);
});

document.addEventListener("click", () => openLangMenu(false));

/** --- More page content --- **/
const moreContent = $("#moreContent");
$$("[data-more]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.more;
    if(key === "reviews"){
      moreContent.innerHTML = `<div class="p">Тут будуть відгуки (заглушка). Пізніше додамо список + форму.</div>`;
    } else if(key === "faq"){
      moreContent.innerHTML = `<div class="p">FAQ (заглушка).</div>`;
    } else if(key === "contacts"){
      moreContent.innerHTML = `<div class="p">Контакти (заглушка).</div>`;
    }
  });
});

/** --- Picker bottom sheet --- **/
const picker = $("#picker");
const pickerOverlay = $("#pickerOverlay");
const pickerClose = $("#pickerClose");
const pickerList = $("#pickerList");
const pickerSearch = $("#pickerSearch");
const chips = $$(".chip");

function openPicker(side){
  state.pickSide = side;
  renderPickerList();
  picker.classList.add("is-open");
  pickerOverlay.classList.add("is-open");
  picker.setAttribute("aria-hidden","false");
  pickerOverlay.setAttribute("aria-hidden","false");
  pickerSearch.value = "";
  state.search = "";
  pickerSearch.focus({ preventScroll: true });
}

function closePicker(){
  picker.classList.remove("is-open");
  pickerOverlay.classList.remove("is-open");
  picker.setAttribute("aria-hidden","true");
  pickerOverlay.setAttribute("aria-hidden","true");
}

pickerClose.addEventListener("click", closePicker);
pickerOverlay.addEventListener("click", closePicker);

pickerSearch.addEventListener("input", (e) => {
  state.search = e.target.value.trim().toLowerCase();
  renderPickerList();
});

chips.forEach(ch => {
  ch.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("is-active"));
    ch.classList.add("is-active");
    state.filter = ch.dataset.filter;
    renderPickerList();
  });
});

function isTop(item){
  if(item.group === "crypto") return ASSET.crypto.topIds.includes(item.id);
  if(item.group === "banks") return ASSET.banks.topIds.includes(item.id);
  if(item.group === "wallets") return ASSET.wallets.topIds.includes(item.id);
  return false;
}

function filterItems(){
  let items = ALL_ITEMS.slice();

  if(state.filter !== "all"){
    if(state.filter === "top") items = items.filter(isTop);
    else items = items.filter(x => x.group === state.filter);
  }
  if(state.search){
    items = items.filter(x =>
      (x.name || "").toLowerCase().includes(state.search) ||
      (x.code || "").toLowerCase().includes(state.search) ||
      (x.id || "").toLowerCase().includes(state.search)
    );
  }
  return items;
}

function renderPickerList(){
  const items = filterItems();
  pickerList.innerHTML = "";

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pickerRow";
    btn.innerHTML = `
      <img class="pickerRow__logo" src="${item.logoPath}" alt="" />
      <div class="pickerRow__meta">
        <div class="pickerRow__name">${escapeHtml(item.name)}</div>
        <div class="pickerRow__code">${escapeHtml(item.code)}</div>
      </div>
      <div class="pickerRow__tag">${escapeHtml(item.group)}</div>
    `;
    btn.addEventListener("click", () => {
      if(state.pickSide === "from") state.from = item;
      else state.to = item;

      syncPicks();
      closePicker();
      recalcRate();
    });

    pickerList.appendChild(btn);
  });

  if(items.length === 0){
    pickerList.innerHTML = `<div class="p muted" style="padding:10px 4px">Нічого не знайдено</div>`;
  }
}

function escapeHtml(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/** --- Exchange picks --- **/
const fromPick = $("#fromPick");
const toPick = $("#toPick");

fromPick.addEventListener("click", () => openPicker("from"));
toPick.addEventListener("click", () => openPicker("to"));

const fromLogo = $("#fromLogo");
const fromName = $("#fromName");
const fromCode = $("#fromCode");
const toLogo = $("#toLogo");
const toName = $("#toName");
const toCode = $("#toCode");

function syncPicks(){
  fromLogo.src = state.from.logoPath;
  fromName.textContent = state.from.name;
  fromCode.textContent = state.from.code;

  toLogo.src = state.to.logoPath;
  toName.textContent = state.to.name;
  toCode.textContent = state.to.code;
}

syncPicks();

/** Swap */
$("#swapBtn").addEventListener("click", () => {
  const tmp = state.from;
  state.from = state.to;
  state.to = tmp;
  syncPicks();

  // swap amounts visually
  const a = $("#fromAmt").value;
  $("#fromAmt").value = $("#toAmt").value;
  $("#toAmt").value = a;

  recalcRate();
});

/** Rate (пока простая заглушка курса) */
const rateText = $("#rateText");
function recalcRate(){
  // Здесь потом подключишь реальные курсы/маржу.
  // Сейчас просто показываем "пример".
  const from = state.from.code;
  const to = state.to.code;

  // условные примеры
  let rate = "—";
  if(from.includes("UAH") && to.includes("USDT")) rate = "1 USDT ≈ 40.00 UAH";
  else if(from.includes("UAH") && to.includes("BTC")) rate = "1 BTC ≈ 1 700 000 UAH";
  else if(from.includes("USDT") && to.includes("UAH")) rate = "1 USDT ≈ 39.50 UAH";
  else rate = `${from} → ${to}`;

  rateText.textContent = rate;

  // auto-calc
  const v = parseFloat(($("#fromAmt").value || "0").replace(",", "."));
  if(!isFinite(v) || v <= 0){
    $("#toAmt").value = "";
    return;
  }

  // супер простая заглушка расчёта
  let k = 1;
  if(from.includes("UAH") && to.includes("USDT")) k = 1/40;
  else if(from.includes("USDT") && to.includes("UAH")) k = 39.5;
  else if(from.includes("UAH") && to.includes("BTC")) k = 1/1700000;
  else k = 1;

  $("#toAmt").value = (v * k).toFixed(6).replace(/\.?0+$/,"");
}

$("#fromAmt").addEventListener("input", recalcRate);
recalcRate();

/** Submit (заглушка) */
$("#submitBtn").addEventListener("click", () => {
  try {
    if(window.Telegram && Telegram.WebApp){
      Telegram.WebApp.showAlert?.("Заявка створена (заглушка). Далі підключимо реальний процес.");
    } else {
      alert("Заявка створена (заглушка).");
    }
  } catch (e) {
    alert("Заявка створена (заглушка).");
  }
});
