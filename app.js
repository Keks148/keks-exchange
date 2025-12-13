(() => {
  // === i18n ===
  const DICT = {
    UA: {
      tabs: { swap:"Обмін", rules:"Правила", account:"Акаунт", more:"Ще" },
      give:"Віддаєте",
      get:"Отримуєте",
      apply:"Створити заявку",
      rulesTitle:"Правила",
      rulesText:"Тут будуть правила обміну. (Поки заглушка)",
      accTitle:"Акаунт",
      accText:"Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
      moreTitle:"Ще",
      login:"Увійти",
      reg:"Реєстрація",
      reviews:"Відгуки",
      faq:"FAQ",
      contacts:"Контакти",
      rate:"Курс:"
    },
    EN: {
      tabs: { swap:"Swap", rules:"Rules", account:"Account", more:"More" },
      give:"You give",
      get:"You get",
      apply:"Create request",
      rulesTitle:"Rules",
      rulesText:"Exchange rules will be here. (Stub)",
      accTitle:"Account",
      accText:"Login/Sign-up and later KYC (not connected yet).",
      moreTitle:"More",
      login:"Login",
      reg:"Sign up",
      reviews:"Reviews",
      faq:"FAQ",
      contacts:"Contacts",
      rate:"Rate:"
    },
    PL: {
      tabs: { swap:"Wymiana", rules:"Zasady", account:"Konto", more:"Więcej" },
      give:"Oddajesz",
      get:"Otrzymujesz",
      apply:"Utwórz zlecenie",
      rulesTitle:"Zasady",
      rulesText:"Tutaj będą zasady wymiany. (Wersja testowa)",
      accTitle:"Konto",
      accText:"Logowanie/Rejestracja i dalej KYC (bez podłączenia).",
      moreTitle:"Więcej",
      login:"Zaloguj",
      reg:"Rejestracja",
      reviews:"Opinie",
      faq:"FAQ",
      contacts:"Kontakt",
      rate:"Kurs:"
    }
  };

  const LANGS = ["UA","EN","PL"];
  let lang = "UA";

  // === data (добавляй сколько хочешь — главное чтобы файлы совпадали по имени) ===
  const BANKS = [
    { id:"mono",    name:"Monobank",    code:"UAH", icon:"logos/banks/mono.png" },
    { id:"privat",  name:"PrivatBank",  code:"UAH", icon:"logos/banks/privat.png" },
    { id:"oschad",  name:"Oschadbank",  code:"UAH", icon:"logos/banks/oschad.png" },
    { id:"pumb",    name:"PUMB",        code:"UAH", icon:"logos/banks/pumb.png" },
    { id:"a-bank",  name:"A-Bank",      code:"UAH", icon:"logos/banks/a-bank.png" },
    { id:"otp",     name:"OTP Bank",    code:"UAH", icon:"logos/banks/otp.png" },
    { id:"sense",   name:"Sense Bank",  code:"UAH", icon:"logos/banks/sense.png" },
    { id:"ukr-sib", name:"UkrSibbank",  code:"UAH", icon:"logos/banks/ukr-sib.png" },
    { id:"ukr-banki",name:"UkrBanki",   code:"UAH", icon:"logos/banks/ukr-banki.png" },
    { id:"izi",     name:"izibank",     code:"UAH", icon:"logos/banks/izi.png" },
    { id:"reyf",    name:"Raiffeisen",  code:"UAH", icon:"logos/banks/reyf.png" },
    { id:"visa-master",name:"Visa/Master",code:"UAH", icon:"logos/banks/visa-master.png" },
  ];

  const CRYPTO = [
    { id:"btc", name:"Bitcoin",  code:"BTC",  icon:"logos/crypto/btc.png" },
    { id:"eth", name:"Ethereum", code:"ETH",  icon:"logos/crypto/eth.png" },
    { id:"sol", name:"Solana",   code:"SOL",  icon:"logos/crypto/sol.png" },
    { id:"ton", name:"TON",      code:"TON",  icon:"logos/crypto/ton.png" },
    { id:"trx", name:"TRON",     code:"TRX",  icon:"logos/crypto/trx.png" },
    { id:"ltc", name:"Litecoin", code:"LTC",  icon:"logos/crypto/ltc.png" },
    { id:"usdt",name:"Tether",   code:"USDT", icon:"logos/crypto/tether-usdt.png" },
    { id:"usdt-trc",name:"USDT (TRC20)", code:"USDT", icon:"logos/crypto/usdt-trc.png" },
    { id:"usdt-eth",name:"USDT (ERC20)", code:"USDT", icon:"logos/crypto/usdt-eth.png" },
    { id:"usdt-bep",name:"USDT (BEP20)", code:"USDT", icon:"logos/crypto/usdt-bep.png" },
    { id:"usdt-pol",name:"USDT (POL)",   code:"USDT", icon:"logos/crypto/usdt-pol.png" },
    { id:"usdt-sol",name:"USDT (SOL)",   code:"USDT", icon:"logos/crypto/usdt-sol.png" },
    { id:"usdt-arb",name:"USDT (ARB)",   code:"USDT", icon:"logos/crypto/usdt-arb.png" },
    { id:"usdc-eth",name:"USDC (ETH)",   code:"USDC", icon:"logos/crypto/usdc-eth.png" },
    { id:"usdc-pol",name:"USDC (POL)",   code:"USDC", icon:"logos/crypto/usdc-pol.png" },
    { id:"usdc-sol",name:"USDC (SOL)",   code:"USDC", icon:"logos/crypto/usdc-sol.png" },
  ];

  // === state ===
  let giveId = BANKS[0].id;
  let getId  = CRYPTO[0].id;

  // === helpers ===
  const $ = (id) => document.getElementById(id);
  const safeImg = (img, src) => {
    img.src = src;
    img.onerror = () => {
      img.onerror = null;
      img.style.opacity = "0.25";
      img.src = "logo.png";
    };
  };

  const fmt = (n, code) => {
    const v = Number(n);
    if (!isFinite(v)) return "0";
    if (code === "USDT" || code === "USDC") return v.toFixed(2);
    return v.toFixed(8).replace(/0+$/,"").replace(/\.$/,"");
  };

  // demo rate (потом подключим реальный)
  const rateFor = (id) => {
    const map = {
      "btc": 0.00000000625,
      "eth": 0.00000010,
      "ltc": 0.0000030,
      "sol": 0.000035,
      "ton": 0.00028,
      "trx": 0.016,
      "usdt": 0.025,
      "usdt-trc":0.025,"usdt-eth":0.025,"usdt-bep":0.025,"usdt-pol":0.025,"usdt-sol":0.025,"usdt-arb":0.025,
      "usdc-eth":0.025,"usdc-pol":0.025,"usdc-sol":0.025
    };
    return map[id] ?? 0.01;
  };

  function fillSelect(selectEl, items){
    selectEl.innerHTML = "";
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = `${it.name} (${it.code})`;
      selectEl.appendChild(opt);
    });
  }

  function applyLang(){
    const d = DICT[lang];
    $("tabSwap").textContent    = d.tabs.swap;
    $("tabRules").textContent   = d.tabs.rules;
    $("tabAccount").textContent = d.tabs.account;
    $("tabMore").textContent    = d.tabs.more;

    $("lblGive").textContent = d.give;
    $("lblGet").textContent  = d.get;
    $("applyBtn").textContent = d.apply;

    $("rulesTitle").textContent = d.rulesTitle;
    $("rulesText").textContent  = d.rulesText;

    $("accTitle").textContent = d.accTitle;
    $("accText").textContent  = d.accText;

    $("moreTitle").textContent = d.moreTitle;
    $("loginBtn").textContent  = d.login;
    $("regBtn").textContent    = d.reg;
    $("reviewsBtn").textContent = d.reviews;
    $("faqBtn").textContent     = d.faq;
    $("contactsBtn").textContent = d.contacts;

    $("langText").textContent = lang;
    updateUI();
  }

  function updateUI(){
    const give = BANKS.find(x=>x.id===giveId) || BANKS[0];
    const get  = CRYPTO.find(x=>x.id===getId) || CRYPTO[0];

    safeImg($("giveIcon"), give.icon);
    safeImg($("getIcon"),  get.icon);

    $("giveSelect").value = give.id;
    $("getSelect").value  = get.id;

    const giveVal = Number($("giveAmount").value || 0);
    const r = rateFor(get.id);
    const out = giveVal * r;

    $("getAmount").value = fmt(out, get.code);

    const d = DICT[lang];
    $("rateLine").textContent = `${d.rate} 1 ${give.code} ≈ ${fmt(r, get.code)} ${get.code}`;
  }

  function setTab(tab){
    document.querySelectorAll(".tab").forEach(b=>{
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    document.querySelectorAll(".page").forEach(p=>{
      p.classList.toggle("active", p.dataset.page === tab);
    });
  }

  // === init ===
  document.addEventListener("DOMContentLoaded", () => {
    // fill selects
    fillSelect($("giveSelect"), BANKS);
    fillSelect($("getSelect"),  CRYPTO);

    // defaults
    $("giveSelect").value = giveId;
    $("getSelect").value  = getId;
    $("giveAmount").value = "100";

    // tabs
    document.querySelectorAll(".tab").forEach(btn=>{
      btn.addEventListener("click", ()=> setTab(btn.dataset.tab));
    });

    // language button cycles
    $("langBtn").addEventListener("click", ()=>{
      const i = LANGS.indexOf(lang);
      lang = LANGS[(i+1) % LANGS.length];
      applyLang();
    });

    // selects
    $("giveSelect").addEventListener("change", (e)=>{
      giveId = e.target.value;
      updateUI();
    });
    $("getSelect").addEventListener("change", (e)=>{
      getId = e.target.value;
      updateUI();
    });

    // amount input
    $("giveAmount").addEventListener("input", updateUI);

    // swap
    $("swapBtn").addEventListener("click", ()=>{
      // swap selections only (bank <-> crypto не меняем типы — чтобы UX был логичный)
      const tmp = giveId;
      giveId = BANKS[0].id; // всегда банк
      getId = (getId === "btc") ? "eth" : "btc"; // демо-переключение
      // swap amounts
      const a = $("giveAmount").value;
      $("giveAmount").value = $("getAmount").value;
      $("getAmount").value = a;
      updateUI();
    });

    // apply (demo)
    $("applyBtn").addEventListener("click", ()=>{
      alert(lang === "UA" ? "Заявка створена (демо)" : lang === "EN" ? "Request created (demo)" : "Zlecenie utworzone (demo)");
    });

    // start
    setTab("swap");
    applyLang();
  });

})();
