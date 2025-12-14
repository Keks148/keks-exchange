// ================= DATA =================

// Banks (UAH)
const BANKS = [
  { id:"privat", name:"PrivatBank (UAH)", code:"UAH", icon:"logos/banks/privat.png", type:"bank" },
  { id:"mono", name:"Monobank (UAH)", code:"UAH", icon:"logos/banks/mono.png", type:"bank" },
  { id:"oschad", name:"Oschadbank (UAH)", code:"UAH", icon:"logos/banks/oschad.png", type:"bank" },
  { id:"pumb", name:"PUMB (UAH)", code:"UAH", icon:"logos/banks/pumb.png", type:"bank" },
];

// Crypto
const CRYPTO = [
  {
    id:"usdt",
    name:"Tether (USDT)",
    code:"USDT",
    icon:"logos/crypto/tether-usdt.png",
    type:"crypto",
    networks:["TRC20","ERC20","BEP20"]
  }
];

// Network icons
const NET_ICON = {
  "TRC20":"logos/networks/trc20.png",
  "ERC20":"logos/networks/erc20.png",
  "BEP20":"logos/networks/bep20.png",
};

// ================= STATE =================

const $ = (id) => document.getElementById(id);

const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",
  getAsset: BANKS[1],
  giveAmount: 1000,
  rate: null
};

// ================= WHITEBIT AUTO RATE =================

// WhiteBIT market
const WHITEBIT_MARKET = "USDT_UAH";

// обновление раз в 60 секунд
const RATE_INTERVAL = 60_000;

// твой спред (1%)
const SPREAD = 0.01;

// берём BID (продажа USDT)
const RATE_FIELD = "bid";

async function fetchWhitebitRate() {
  const url = `https://whitebit.com/api/v4/public/ticker?market=${WHITEBIT_MARKET}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("WhiteBIT error");
  const data = await r.json();
  return Number(data[RATE_FIELD]);
}

function applySpread(rate) {
  return rate * (1 - SPREAD);
}

async function loadRate() {
  try {
    const raw = await fetchWhitebitRate();
    if (!isFinite(raw)) throw new Error("Bad rate");

    state.rate = applySpread(raw);

    $("rateStatus").textContent = "";
    $("rateHint").textContent = "";
    $("rateValue").textContent = format(state.rate);

    recalc();
  } catch (e) {
    state.rate = null;
    $("rateValue").textContent = "—";
    $("resultValue").textContent = "—";
    $("rateHint").textContent = "Курс тимчасово недоступний";
  }
}

function startAutoRate() {
  loadRate();
  setInterval(loadRate, RATE_INTERVAL);
}

// ================= UI =================

function setAssetUI(prefix, asset){
  $(prefix+"Icon").src = asset.icon;
  $(prefix+"Icon").alt = asset.code;
  $(prefix+"Name").textContent = asset.name;
  $(prefix+"Sub").textContent = asset.code;
}

function setNetworkUI(net){
  $("giveNetLabel").textContent = net;
  $("giveNetIcon").src = NET_ICON[net];
}

function recalc(){
  if (!state.rate) return;

  const res = state.giveAmount * state.rate;
  $("resultValue").textContent = format(res);
}

function format(n){
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// ================= INIT =================

function init(){
  // default UI
  setAssetUI("give", state.giveAsset);
  setNetworkUI(state.giveNet);
  setAssetUI("get", state.getAsset);
  $("giveAmount").value = state.giveAmount;

  $("giveAmount").addEventListener("input", ()=>{
    const v = parseFloat($("giveAmount").value.replace(",", "."));
    state.giveAmount = isFinite(v) ? v : 0;
    recalc();
  });

  $("swapBtn").addEventListener("click", ()=>{
    // swap give/get
    const tmp = state.giveAsset;
    state.giveAsset = state.getAsset.type === "bank" ? CRYPTO[0] : tmp;
    state.getAsset = BANKS[1];
    setAssetUI("give", state.giveAsset);
    setAssetUI("get", state.getAsset);
    recalc();
  });

  $("createBtn").addEventListener("click", ()=>{
    alert(`Заявка: ${state.giveAmount} USDT → ${$("resultValue").textContent} UAH`);
  });

  // старт авто-курса
  startAutoRate();
}

document.addEventListener("DOMContentLoaded", init);
