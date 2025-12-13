const state = {
  lang: "UA",
  tab: "exchange",
  give: { type: "bank", key: "privat", amount: 100 },
  get:  { type: "crypto", key: "btc",  amount: 0 },
  modal: { open:false, mode:"give", query:"" }
};

const PATHS = {
  brandLogo: "logo.png",      // проверь что реально лежит в корне
  banks:   "logos/banks/",
  crypto:  "logos/crypto/",
  wallets: "logos/wallets/",
};

const I18N = {
  UA: { tab_exchange:"Обмін", tab_rules:"Правила", tab_account:"Акаунт", tab_more:"Ще",
        give:"Віддаєте", get:"Отримуєте", rate:"Курс", create:"Створити заявку",
        account_title:"Акаунт", login:"Увійти", register:"Реєстрація", placeholder:"0",
        choose_give:"Вибір (віддаєте)", choose_get:"Вибір (отримуєте)", search:"Пошук..." },
  EN: { tab_exchange:"Exchange", tab_rules:"Rules", tab_account:"Account", tab_more:"More",
        give:"You give", get:"You get", rate:"Rate", create:"Create request",
        account_title:"Account", login:"Login", register:"Register", placeholder:"0",
        choose_give:"Choose (give)", choose_get:"Choose (get)", search:"Search..." },
  PL: { tab_exchange:"Wymiana", tab_rules:"Zasady", tab_account:"Konto", tab_more:"Więcej",
        give:"Oddajesz", get:"Otrzymujesz", rate:"Kurs", create:"Utwórz zgłoszenie",
        account_title:"Konto", login:"Zaloguj", register:"Rejestracja", placeholder:"0",
        choose_give:"Wybór (oddajesz)", choose_get:"Wybór (otrzymujesz)", search:"Szukaj..." },
};

function t(key){ return (I18N[state.lang] && I18N[state.lang][key]) ? I18N[state.lang][key] : key; }

// ✅ безопасный selector
function el(id){
  const node = document.getElementById(id);
  if(!node) missingIds.add(id);
  return node;
}
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
function setText(node, text){
  if(!node) return;
  node.textContent = text;
}
function setVal(node, val){
  if(!node) return;
  node.value = val;
}

const missingIds = new Set();

// ====== ДАННЫЕ (минимально, чтобы проверить что работает)
const BANKS = {
  privat: { name:{UA:"ПриватБанк",EN:"PrivatBank",PL:"PrivatBank"}, code:"UAH", logo:"privat.png" },
  mono:   { name:{UA:"Monobank",EN:"Monobank",PL:"Monobank"}, code:"UAH", logo:"mono.png" },
};
const CRYPTO = {
  btc: { name:{UA:"Bitcoin",EN:"Bitcoin",PL:"Bitcoin"}, code:"BTC", logo:"btc.png" },
  eth: { name:{UA:"Ethereum",EN:"Ethereum",PL:"Ethereum"}, code:"ETH", logo:"eth.png" },
};

function byLang(obj){ return obj?.[state.lang] || obj?.UA || ""; }
function getCatalog(type){ return type==="bank" ? BANKS : CRYPTO; }
function getPath(type){ return type==="bank" ? PATHS.banks : PATHS.crypto; }
function getItem(type, key){ return getCatalog(type)[key]; }

function calcFakeRate(getKey){
  const base = { btc:0.00000000625, eth:0.00000010 };
  return base[getKey] ?? 0.01;
}
function formatAmount(n, key){
  const v = Number(n||0);
  if(!isFinite(v)) return "0";
  if(key==="btc" || key==="eth") return v.toFixed(8);
  return v.toFixed(2);
}

function render(){
  missingIds.clear();

  // logo (если есть)
  const brandLogo = qs(".brand-logo");
  if(brandLogo) brandLogo.src = PATHS.brandLogo;

  // Tabs (если есть)
  setText(el("tabExchange"), t("tab_exchange"));
  setText(el("tabRules"), t("tab_rules"));
  setText(el("tabAccount"), t("tab_account"));
  setText(el("tabMore"), t("tab_more"));

  qsa(".tab").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.tab === state.tab);
  });

  // lang button (если есть)
  setText(el("langBtnText"), state.lang);

  // exchange labels
  setText(el("lblGive"), t("give"));
  setText(el("lblGet"), t("get"));
  setText(el("lblRate"), t("rate"));
  setText(el("btnCreate"), t("create"));

  // exchange selected
  const giveItem = getItem("bank", state.give.key) || BANKS.privat;
  const getItemObj = getItem("crypto", state.get.key) || CRYPTO.btc;

  setText(el("giveName"), byLang(giveItem.name));
  setText(el("giveSub"), giveItem.code);
  const giveLogo = el("giveLogo");
  if(giveLogo){
    giveLogo.src = getPath("bank") + giveItem.logo;
    giveLogo.onerror = ()=>{ giveLogo.style.display="none"; };
  }

  setText(el("getName"), byLang(getItemObj.name));
  setText(el("getSub"), getItemObj.code);
  const getLogo = el("getLogo");
  if(getLogo){
    getLogo.src = getPath("crypto") + getItemObj.logo;
    getLogo.onerror = ()=>{ getLogo.style.display="none"; };
  }

  // amounts
  const giveAmount = el("giveAmount");
  if(giveAmount){
    giveAmount.placeholder = t("placeholder");
    giveAmount.value = state.give.amount ?? "";
  }

  const rate = calcFakeRate(state.get.key);
  const getAmountVal = Number(state.give.amount||0) * rate;
  const getAmount = el("getAmount");
  if(getAmount){
    getAmount.value = formatAmount(getAmountVal, state.get.key);
  }

  const rateText = el("rateText");
  if(rateText){
    rateText.textContent = `1 UAH ≈ ${formatAmount(rate, state.get.key)} ${getItemObj.code}`;
  }

  // pages
  qsa("[data-page]").forEach(p=>{
    p.style.display = (p.dataset.page === state.tab) ? "block" : "none";
  });

  // вывод диагностики
  if(missingIds.size){
    console.log("[KeksSwap] Missing ids in index.html:", Array.from(missingIds));
  }
}

function bind(){
  // tabs
  qsa(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.tab = btn.dataset.tab;
      render();
    });
  });

  // lang dropdown (если есть)
  const langBtn = el("langBtn");
  const langMenu = el("langMenu");
  if(langBtn && langMenu){
    langBtn.addEventListener("click", ()=> langMenu.classList.toggle("open"));
    document.addEventListener("click", (e)=>{
      const box = qs(".lang");
      if(box && !box.contains(e.target)) langMenu.classList.remove("open");
    });
    qsa(".lang-item").forEach(b=>{
      b.addEventListener("click", ()=>{
        state.lang = b.dataset.lang;
        langMenu.classList.remove("open");
        render();
      });
    });
  }

  // open selects (если есть)
  const giveSelect = el("giveSelect");
  if(giveSelect) giveSelect.addEventListener("click", ()=> alert("give select (подключим модал после)"));

  const getSelect = el("getSelect");
  if(getSelect) getSelect.addEventListener("click", ()=> alert("get select (подключим модал после)"));

  // swap
  const swapBtn = el("swapBtn");
  if(swapBtn){
    swapBtn.addEventListener("click", ()=>{
      const tmp = state.give.key;
      state.give.key = state.get.key === "btc" ? "mono" : state.give.key; // просто демо
      state.get.key = (tmp === "privat") ? "btc" : "btc";
      render();
    });
  }

  // input
  const giveAmount = el("giveAmount");
  if(giveAmount){
    giveAmount.addEventListener("input", ()=>{
      const v = String(giveAmount.value).replace(/[^\d.,]/g,"").replace(",",".");
      state.give.amount = v === "" ? "" : Number(v);
      render();
    });
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  bind();
  render();
});
