(() => {
  const $ = (id) => document.getElementById(id);

  // --- DATA (пути как у тебя в репо) ---
  const banks = [
    { id: "mono", name: { UA:"Monobank", EN:"Monobank", PL:"Monobank" }, code: "UAH", icon: "logos/banks/mono.png" },
    { id: "privat", name: { UA:"PrivatBank", EN:"PrivatBank", PL:"PrivatBank" }, code: "UAH", icon: "logos/banks/privat.png" },
    { id: "oschad", name: { UA:"Oschadbank", EN:"Oschadbank", PL:"Oschadbank" }, code: "UAH", icon: "logos/banks/oschad.png" },
    { id: "pumb", name: { UA:"PUMB", EN:"PUMB", PL:"PUMB" }, code: "UAH", icon: "logos/banks/pumb.png" },
    { id: "abank", name: { UA:"A-Bank", EN:"A-Bank", PL:"A-Bank" }, code: "UAH", icon: "logos/banks/a-bank.png" },
    { id: "sense", name: { UA:"Sense Bank", EN:"Sense Bank", PL:"Sense Bank" }, code: "UAH", icon: "logos/banks/sense.png" },
  ];

  const crypto = [
    { id:"btc", name:{UA:"Bitcoin", EN:"Bitcoin", PL:"Bitcoin"}, code:"BTC", icon:"logos/crypto/btc.png" },
    { id:"eth", name:{UA:"Ethereum", EN:"Ethereum", PL:"Ethereum"}, code:"ETH", icon:"logos/crypto/eth.png" },
    { id:"ton", name:{UA:"TON", EN:"TON", PL:"TON"}, code:"TON", icon:"logos/crypto/ton.png" },
    { id:"sol", name:{UA:"Solana", EN:"Solana", PL:"Solana"}, code:"SOL", icon:"logos/crypto/sol.png" },
    { id:"trx", name:{UA:"TRON", EN:"TRON", PL:"TRON"}, code:"TRX", icon:"logos/crypto/trx.png" },
    { id:"usdt-trc", name:{UA:"Tether (TRC20)", EN:"Tether (TRC20)", PL:"Tether (TRC20)"}, code:"USDT", icon:"logos/crypto/usdt-trc.png" },
  ];

  // --- i18n ---
  const i18n = {
    UA: {
      menu: { swap:"Обмін", rules:"Правила", account:"Акаунт", more:"Ще" },
      give:"Віддаєте",
      get:"Отримуєте",
      rulesTitle:"Правила",
      rulesText:"Тут будуть правила обміну. (Поки заглушка)",
      accTitle:"Акаунт",
      accText:"Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
      login:"Увійти",
      reg:"Реєстрація",
      moreTitle:"Ще",
      reviews:"Відгуки",
      faq:"FAQ",
      contacts:"Контакти",
      cta:"Створити заявку",
      ratePrefix:"Курс:"
    },
    EN: {
      menu: { swap:"Swap", rules:"Rules", account:"Account", more:"More" },
      give:"You send",
      get:"You get",
      rulesTitle:"Rules",
      rulesText:"Exchange rules will be here. (Placeholder)",
      accTitle:"Account",
      accText:"Login/registration and KYC will be here (not connected yet).",
      login:"Log in",
      reg:"Sign up",
      moreTitle:"More",
      reviews:"Reviews",
      faq:"FAQ",
      contacts:"Contacts",
      cta:"Create request",
      ratePrefix:"Rate:"
    },
    PL: {
      menu: { swap:"Wymiana", rules:"Zasady", account:"Konto", more:"Więcej" },
      give:"Oddajesz",
      get:"Otrzymujesz",
      rulesTitle:"Zasady",
      rulesText:"Tutaj będą zasady wymiany. (Wersja testowa)",
      accTitle:"Konto",
      accText:"Logowanie/rejestracja i KYC (jeszcze nie podłączone).",
      login:"Zaloguj",
      reg:"Rejestracja",
      moreTitle:"Więcej",
      reviews:"Opinie",
      faq:"FAQ",
      contacts:"Kontakt",
      cta:"Utwórz zlecenie",
      ratePrefix:"Kurs:"
    },
  };

  let lang = "UA";

  // --- Helpers ---
  const normPath = (p) => {
    if (!p) return "";
    // поддержка "logos/..", "/logos/.."
    return p.startsWith("/") ? p.slice(1) : p;
  };

  function fillSelect(selectEl, items) {
    selectEl.innerHTML = "";
    items.forEach((it) => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = `${it.name[lang]} (${it.code})`;
      selectEl.appendChild(opt);
    });
  }

  function getById(list, id) {
    return list.find(x => x.id === id) || list[0];
  }

  function setIcon(imgEl, path) {
    imgEl.src = normPath(path);
    imgEl.onerror = () => { imgEl.src = "logo.png"; };
  }

  function updateRateLine() {
    const give = getById(banks, $("giveSelect").value);
    const get = getById(crypto, $("getSelect").value);
    // заглушка курса (можно подключить реальный позже)
    const rate = "1 " + give.code + " ≈ 0.00000000625 " + get.code;
    $("rateLine").textContent = `${i18n[lang].ratePrefix} ${rate}`;
  }

  function applyLang() {
    // lang buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // menu
    document.querySelector('[data-tab="swap"]').textContent = i18n[lang].menu.swap;
    document.querySelector('[data-tab="rules"]').textContent = i18n[lang].menu.rules;
    document.querySelector('[data-tab="account"]').textContent = i18n[lang].menu.account;
    document.querySelector('[data-tab="more"]').textContent = i18n[lang].menu.more;

    // labels/buttons/text
    $("lblGive").textContent = i18n[lang].give;
    $("lblGet").textContent  = i18n[lang].get;
    $("ctaBtn").textContent  = i18n[lang].cta;

    $("rulesTitle").textContent = i18n[lang].rulesTitle;
    $("rulesText").textContent  = i18n[lang].rulesText;

    $("accTitle").textContent = i18n[lang].accTitle;
    $("accText").textContent  = i18n[lang].accText;
    $("loginBtn").textContent = i18n[lang].login;
    $("regBtn").textContent   = i18n[lang].reg;

    $("moreTitle").textContent = i18n[lang].moreTitle;
    $("reviewsBtn").textContent = i18n[lang].reviews;
    $("faqBtn").textContent = i18n[lang].faq;
    $("contactsBtn").textContent = i18n[lang].contacts;

    // refill selects with translated labels
    const giveId = $("giveSelect").value || banks[0].id;
    const getId  = $("getSelect").value || crypto[0].id;
    fillSelect($("giveSelect"), banks);
    fillSelect($("getSelect"), crypto);
    $("giveSelect").value = giveId;
    $("getSelect").value  = getId;

    // icons + rate
    const give = getById(banks, $("giveSelect").value);
    const get  = getById(crypto, $("getSelect").value);
    setIcon($("giveIcon"), give.icon);
    setIcon($("getIcon"), get.icon);
    updateRateLine();
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".tab");
    const pages = {
      swap: $("tab-swap"),
      rules: $("tab-rules"),
      account: $("tab-account"),
      more: $("tab-more"),
    };

    tabs.forEach(t => {
      t.addEventListener("click", () => {
        tabs.forEach(x => x.classList.remove("active"));
        Object.values(pages).forEach(p => p.classList.remove("active"));
        t.classList.add("active");
        pages[t.dataset.tab].classList.add("active");
      });
    });
  }

  function init() {
    // fill selects
    fillSelect($("giveSelect"), banks);
    fillSelect($("getSelect"), crypto);

    // defaults
    $("giveSelect").value = "mono";
    $("getSelect").value = "btc";

    // icons
    setIcon($("giveIcon"), getById(banks, "mono").icon);
    setIcon($("getIcon"), getById(crypto, "btc").icon);

    // listeners
    $("giveSelect").addEventListener("change", () => {
      const give = getById(banks, $("giveSelect").value);
      setIcon($("giveIcon"), give.icon);
      updateRateLine();
    });

    $("getSelect").addEventListener("change", () => {
      const get = getById(crypto, $("getSelect").value);
      setIcon($("getIcon"), get.icon);
      updateRateLine();
    });

    $("swapBtn").addEventListener("click", () => {
      const g = $("giveSelect").value;
      const k = $("getSelect").value;
      $("giveSelect").value = g; // оставляем банки сверху, крипту снизу (по твоему дизайну)
      $("getSelect").value = k;
      // просто микро-анимация клика
      $("swapBtn").animate([{transform:"scale(1)"},{transform:"scale(0.92)"},{transform:"scale(1)"}], {duration:220});
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        lang = btn.dataset.lang;
        applyLang();
      });
    });

    initTabs();
    applyLang();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
