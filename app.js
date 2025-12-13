// KeksSwap (no modals, no overlays) — clicks will work

const $ = (id) => document.getElementById(id);

const state = {
  tab: "exchange",
  give: "mono_uah",
  get: "btc",
  giveAmount: "",
  getAmount: ""
};

// Список активов (подстрой под свои реальные файлы/пути)
const assets = [
  // banks
  { id: "mono_uah", name: "Monobank", code: "UAH", icon: "./logos/banks/mono.png", rateToUsd: 1/40 },
  { id: "privat_uah", name: "PrivatBank", code: "UAH", icon: "./logos/banks/privat.png", rateToUsd: 1/40 },

  // crypto
  { id: "btc", name: "Bitcoin", code: "BTC", icon: "./logos/crypto/btc.png", rateToUsd: 100000 }, // пример
  { id: "usdt", name: "Tether", code: "USDT", icon: "./logos/crypto/usdt.png", rateToUsd: 1 },
  { id: "usdc", name: "USD Coin", code: "USDC", icon: "./logos/crypto/usdc.png", rateToUsd: 1 },
];

function getAsset(id){
  return assets.find(a => a.id === id) || assets[0];
}

function fillSelect(selectEl, selectedId){
  selectEl.innerHTML = "";
  for (const a of assets){
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = `${a.name} (${a.code})`;
    if (a.id === selectedId) opt.selected = true;
    selectEl.appendChild(opt);
  }
}

function setRow(which, assetId){
  const a = getAsset(assetId);
  if (which === "give"){
    $("giveIcon").src = a.icon;
    $("giveName").textContent = a.name;
    $("giveCode").textContent = a.code;
  } else {
    $("getIcon").src = a.icon;
    $("getName").textContent = a.name;
    $("getCode").textContent = a.code;
  }
}

function parseNumberSafe(v){
  if (!v) return null;
  const cleaned = String(v).replace(",", ".").replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

// Простой расчет через USD как базу (заглушка)
function recalcFromGive(){
  const giveAsset = getAsset(state.give);
  const getAssetA = getAsset(state.get);
  const giveN = parseNumberSafe(state.giveAmount);
  if (giveN === null){
    state.getAmount = "";
    $("getAmount").value = "";
    return;
  }
  const usd = giveN * giveAsset.rateToUsd;
  const out = usd / getAssetA.rateToUsd;
  // показываем аккуратно, но не ломаем ввод
  state.getAmount = (Math.round(out * 1e8) / 1e8).toString();
  $("getAmount").value = state.getAmount;
}

function recalcFromGet(){
  const giveAsset = getAsset(state.give);
  const getAssetA = getAsset(state.get);
  const getN = parseNumberSafe(state.getAmount);
  if (getN === null){
    state.giveAmount = "";
    $("giveAmount").value = "";
    return;
  }
  const usd = getN * getAssetA.rateToUsd;
  const out = usd / giveAsset.rateToUsd;
  state.giveAmount = (Math.round(out * 1e2) / 1e2).toString();
  $("giveAmount").value = state.giveAmount;
}

function setTab(tab){
  state.tab = tab;
  document.querySelectorAll(".pill").forEach(btn => {
    btn.classList.toggle("pillActive", btn.dataset.tab === tab);
  });

  ["exchange","rules","account","more"].forEach(t => {
    $( `tab-${t}` ).classList.toggle("hidden", t !== tab);
  });
}

function swapAssets(){
  const tmp = state.give;
  state.give = state.get;
  state.get = tmp;

  fillSelect($("giveSelect"), state.give);
  fillSelect($("getSelect"), state.get);
  setRow("give", state.give);
  setRow("get", state.get);

  // пересчет по текущему giveAmount
  recalcFromGive();
}

function init(){
  // tabs
  document.querySelectorAll(".pill").forEach(btn => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  // selects
  fillSelect($("giveSelect"), state.give);
  fillSelect($("getSelect"), state.get);
  setRow("give", state.give);
  setRow("get", state.get);

  $("giveSelect").addEventListener("change", (e) => {
    state.give = e.target.value;
    setRow("give", state.give);
    recalcFromGive();
  });

  $("getSelect").addEventListener("change", (e) => {
    state.get = e.target.value;
    setRow("get", state.get);
    recalcFromGive();
  });

  // inputs (ВАЖНО: мы НЕ перерисовываем DOM целиком — фокус не будет слетать)
  $("giveAmount").addEventListener("input", (e) => {
    state.giveAmount = e.target.value;
    recalcFromGive();
  });

  $("getAmount").addEventListener("input", (e) => {
    state.getAmount = e.target.value;
    recalcFromGet();
  });

  // swap
  $("swapBtn").addEventListener("click", swapAssets);

  // язык (пока просто хранение)
  $("langSelect").addEventListener("change", () => {
    // сюда позже подключим переводы
  });

  setTab("exchange");
}

init();
