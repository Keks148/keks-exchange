// ====== DATA (пути как у тебя в репо) ======
const BANKS = [
  { id:"privat",  name:"PrivatBank (UAH)",  icon:"logos/banks/privat.png", currency:"UAH" },
  { id:"mono",    name:"Monobank (UAH)",    icon:"logos/banks/mono.png",   currency:"UAH" },
  { id:"oschad",  name:"Oschadbank (UAH)",  icon:"logos/banks/oschad.png", currency:"UAH" },
  { id:"pumb",    name:"PUMB (UAH)",        icon:"logos/banks/pumb.png",   currency:"UAH" },
  { id:"a-bank",  name:"A-Bank (UAH)",      icon:"logos/banks/a-bank.png", currency:"UAH" },
  { id:"otp",     name:"OTP (UAH)",         icon:"logos/banks/otp.png",    currency:"UAH" },
  { id:"izi",     name:"IziBank (UAH)",     icon:"logos/banks/izi.png",    currency:"UAH" },
  { id:"sense",   name:"Sense (UAH)",       icon:"logos/banks/sense.png",  currency:"UAH" },
  { id:"ukrsib",  name:"UkrSib (UAH)",      icon:"logos/banks/ukr-sib.png",currency:"UAH" },
  { id:"ukrbanki",name:"UkrBanki (UAH)",    icon:"logos/banks/ukr-banki.png",currency:"UAH" },
  { id:"visa-master",name:"Visa/Master (UAH)", icon:"logos/banks/visa-master.png",currency:"UAH" },
  { id:"reyf",    name:"Raiffeisen (UAH)",  icon:"logos/banks/reyf.png",   currency:"UAH" },
];

const CRYPTO = [
  { id:"btc",  name:"Bitcoin (BTC)", icon:"logos/crypto/btc.png",  symbol:"BTC", ratePerUAH: 0.0000000625 },
  { id:"eth",  name:"Ethereum (ETH)",icon:"logos/crypto/eth.png",  symbol:"ETH", ratePerUAH: 0.0000000012 },
  { id:"ton",  name:"TON (TON)",     icon:"logos/crypto/ton.png",  symbol:"TON", ratePerUAH: 0.0032 },
  { id:"trx",  name:"TRON (TRX)",    icon:"logos/crypto/trx.png",  symbol:"TRX", ratePerUAH: 0.12 },
  { id:"sol",  name:"Solana (SOL)",  icon:"logos/crypto/sol.png",  symbol:"SOL", ratePerUAH: 0.00003 },
  { id:"ltc",  name:"Litecoin (LTC)",icon:"logos/crypto/ltc.png",  symbol:"LTC", ratePerUAH: 0.00007 },
  { id:"usdt-trc", name:"Tether USDT (TRC20)", icon:"logos/crypto/usdt-trc.png", symbol:"USDT", ratePerUAH: 0.025 },
  { id:"usdt-eth", name:"Tether USDT (ERC20)", icon:"logos/crypto/usdt-eth.png", symbol:"USDT", ratePerUAH: 0.025 },
  { id:"usdt-pol", name:"Tether USDT (POL)",   icon:"logos/crypto/usdt-pol.png", symbol:"USDT", ratePerUAH: 0.025 },
  { id:"usdt-sol", name:"Tether USDT (SOL)",   icon:"logos/crypto/usdt-sol.png", symbol:"USDT", ratePerUAH: 0.025 },
  { id:"usdt-arb", name:"Tether USDT (ARB)",   icon:"logos/crypto/usdt-arb.png", symbol:"USDT", ratePerUAH: 0.025 },

  { id:"usdc-eth", name:"USDC (ERC20)", icon:"logos/crypto/usdc-eth.png", symbol:"USDC", ratePerUAH: 0.025 },
  { id:"usdc-pol", name:"USDC (POL)",   icon:"logos/crypto/usdc-pol.png", symbol:"USDC", ratePerUAH: 0.025 },
  { id:"usdc-sol", name:"USDC (SOL)",   icon:"logos/crypto/usdc-sol.png", symbol:"USDC", ratePerUAH: 0.025 },

  { id:"tether", name:"Tether (USDT)", icon:"logos/crypto/tether-usdt.png", symbol:"USDT", ratePerUAH: 0.025 },
];

function $(id){ return document.getElementById(id); }

const giveSelect = $("giveSelect");
const getSelect  = $("getSelect");
const giveIcon   = $("giveIcon");
const getIcon    = $("getIcon");
const giveAmount = $("giveAmount");
const getAmount  = $("getAmount");
const rateLine   = $("rateLine");
const swapBtn    = $("swapBtn");
const submitBtn  = $("submitBtn");

const tabs = Array.from(document.querySelectorAll(".tab"));
const screens = {
  exchange: $("screen-exchange"),
  rules: $("screen-rules"),
  faq: $("screen-faq"),
  account: $("screen-account"),
};

// ====== LANG dropdown (одна кнопка) ======
const langBtn = $("langBtn");
const langMenu = $("langMenu");
const langLabel = $("langLabel");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("open");
  langMenu.setAttribute("aria-hidden", langMenu.classList.contains("open") ? "false" : "true");
});

document.addEventListener("click", (e) => {
  if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
    langMenu.classList.remove("open");
    langMenu.setAttribute("aria-hidden", "true");
  }
});

Array.from(document.querySelectorAll(".lang-item")).forEach(btn => {
  btn.addEventListener("click", () => {
    langLabel.textContent = btn.dataset.lang;
    langMenu.classList.remove("open");
    langMenu.setAttribute("aria-hidden", "true");
  });
});

// ====== Tabs navigation ======
tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    const key = t.dataset.screen;
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[key].classList.add("active");
  });
});

// ====== Fill selects ======
function fillSelect(selectEl, items){
  selectEl.innerHTML = "";
  items.forEach(it => {
    const opt = document.createElement("option");
    opt.value = it.id;
    opt.textContent = it.name;
    selectEl.appendChild(opt);
  });
}

fillSelect(giveSelect, BANKS);
fillSelect(getSelect, CRYPTO);

// default
giveSelect.value = "privat";
getSelect.value = "btc";

function findBank(id){ return BANKS.find(x=>x.id===id) || BANKS[0]; }
function findCrypto(id){ return CRYPTO.find(x=>x.id===id) || CRYPTO[0]; }

function setIcons(){
  const b = findBank(giveSelect.value);
  const c = findCrypto(getSelect.value);
  giveIcon.src = b.icon;
  getIcon.src  = c.icon;
}

function safeNumber(v){
  const s = String(v).replace(",", ".").replace(/[^\d.]/g,"");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function formatOut(n){
  if (!Number.isFinite(n)) return "0";
  // для крипты — до 10 знаков, без лишних нулей
  return n.toFixed(10).replace(/0+$/,"").replace(/\.$/,"");
}

function recalc(){
  const amountUAH = safeNumber(giveAmount.value);
  const c = findCrypto(getSelect.value);
  const out = amountUAH * (c.ratePerUAH ?? 0);
  getAmount.value = formatOut(out);

  const sym = c.symbol || "CRYPTO";
  rateLine.textContent = `Курс: 1 UAH ≈ ${formatOut(c.ratePerUAH ?? 0)} ${sym}`;
}

giveSelect.addEventListener("change", () => { setIcons(); });
getSelect.addEventListener("change", () => { setIcons(); recalc(); });
giveAmount.addEventListener("input", () => { recalc(); });

// ====== Swap ======
swapBtn.addEventListener("click", () => {
  // В этой версии swap меняет местами только значения (визуально),
  // но оставляет "UAH -> Crypto" логику.
  // Если хочешь реальный swap (crypto->uah), скажешь — добавлю.
  const oldBank = giveSelect.value;
  const oldCrypto = getSelect.value;

  // мини-эффект без лагов
  swapBtn.style.transform = "scale(0.98)";
  setTimeout(()=> swapBtn.style.transform = "", 120);

  // просто поменяем выборы местами логически нельзя, поэтому делаем: сброс к дефолту
  giveSelect.value = oldBank;
  getSelect.value = oldCrypto;
  setIcons();
  recalc();
});

// ====== Submit ======
submitBtn.addEventListener("click", () => {
  const b = findBank(giveSelect.value);
  const c = findCrypto(getSelect.value);
  const amountUAH = safeNumber(giveAmount.value);

  if (amountUAH <= 0) {
    alert("Введіть суму більше 0");
    return;
  }

  const order = {
    give: { method: b.name, amount: amountUAH, currency: "UAH" },
    get:  { asset: c.name, amount: getAmount.value, symbol: c.symbol },
    rate: c.ratePerUAH,
    lang: langLabel.textContent,
    ts: Date.now()
  };

  console.log("ORDER:", order);
  alert("Заявку створено (демо). Наступний крок — додамо форму реквізитів і підтвердження.");
});

// init
setIcons();
recalc();
