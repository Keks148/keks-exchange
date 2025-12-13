(() => {
  // ====== DATA (под твои папки logos/...) ======
  // важно: имена файлов должны совпадать 1в1 с GitHub
  const ITEMS = [
    // BANKS
    { id:"mono",      type:"banks",  name:{uk:"Monobank", en:"Monobank", pl:"Monobank"},  code:"UAH", logo:"logos/banks/mono.png" },
    { id:"privat",    type:"banks",  name:{uk:"PrivatBank", en:"PrivatBank", pl:"PrivatBank"},  code:"UAH", logo:"logos/banks/privat.png" },
    { id:"otp",       type:"banks",  name:{uk:"OTP Bank", en:"OTP Bank", pl:"OTP Bank"},  code:"UAH", logo:"logos/banks/otp.png" },
    { id:"pumb",      type:"banks",  name:{uk:"PUMB", en:"PUMB", pl:"PUMB"},  code:"UAH", logo:"logos/banks/pumb.png" },
    { id:"oschad",    type:"banks",  name:{uk:"Oschadbank", en:"Oschadbank", pl:"Oschadbank"},  code:"UAH", logo:"logos/banks/oschad.png" },
    { id:"a-bank",    type:"banks",  name:{uk:"A-Bank", en:"A-Bank", pl:"A-Bank"},  code:"UAH", logo:"logos/banks/a-bank.png" },
    { id:"izi",       type:"banks",  name:{uk:"IZI Bank", en:"IZI Bank", pl:"IZI Bank"},  code:"UAH", logo:"logos/banks/izi.png" },
    { id:"sense",     type:"banks",  name:{uk:"Sense Bank", en:"Sense Bank", pl:"Sense Bank"},  code:"UAH", logo:"logos/banks/sense.png" },
    { id:"reyf",      type:"banks",  name:{uk:"Raiffeisen", en:"Raiffeisen", pl:"Raiffeisen"},  code:"UAH", logo:"logos/banks/reyf.png" },
    { id:"ukr-sib",   type:"banks",  name:{uk:"UkrSibbank", en:"UkrSibbank", pl:"UkrSibbank"},  code:"UAH", logo:"logos/banks/ukr-sib.png" },
    { id:"ukr-banki", type:"banks",  name:{uk:"UkrBanki", en:"UkrBanki", pl:"UkrBanki"},  code:"UAH", logo:"logos/banks/ukr-banki.png" },
    { id:"visa-master",type:"banks", name:{uk:"Visa/Mastercard", en:"Visa/Mastercard", pl:"Visa/Mastercard"}, code:"UAH", logo:"logos/banks/visa-master.png" },

    // WALLETS
    { id:"paypal",   type:"wallets", name:{uk:"PayPal", en:"PayPal", pl:"PayPal"},   code:"USD", logo:"logos/wallets/paypal.png" },
    { id:"payoneer", type:"wallets", name:{uk:"Payoneer", en:"Payoneer", pl:"Payoneer"}, code:"USD", logo:"logos/wallets/payoneer.png" }, // важно: payoneer
    { id:"revolut",  type:"wallets", name:{uk:"Revolut", en:"Revolut", pl:"Revolut"}, code:"EUR", logo:"logos/wallets/revolut.png" },
    { id:"valet",    type:"wallets", name:{uk:"Valet", en:"Valet", pl:"Valet"},     code:"USD", logo:"logos/wallets/valet.png" },
    { id:"vise",     type:"wallets", name:{uk:"Vise", en:"Vise", pl:"Vise"},        code:"USD", logo:"logos/wallets/vise.png" },

    // CRYPTO
    { id:"btc", type:"crypto", name:{uk:"Bitcoin", en:"Bitcoin", pl:"Bitcoin"}, code:"BTC", logo:"logos/crypto/btc.png" },
    { id:"eth", type:"crypto", name:{uk:"Ethereum", en:"Ethereum", pl:"Ethereum"}, code:"ETH", logo:"logos/crypto/eth.png" },
    { id:"ltc", type:"crypto", name:{uk:"Litecoin", en:"Litecoin", pl:"Litecoin"}, code:"LTC", logo:"logos/crypto/ltc.png" },
    { id:"sol", type:"crypto", name:{uk:"Solana", en:"Solana", pl:"Solana"}, code:"SOL", logo:"logos/crypto/sol.png" },
    { id:"ton", type:"crypto", name:{uk:"TON", en:"TON", pl:"TON"}, code:"TON", logo:"logos/crypto/ton.png" },
    { id:"trx", type:"crypto", name:{uk:"TRON", en:"TRON", pl:"TRON"}, code:"TRX", logo:"logos/crypto/trx.png" },

    // USDT / USDC сети (как у тебя)
    { id:"usdt-trc", type:"crypto", name:{uk:"USDT (TRC20)", en:"USDT (TRC20)", pl:"USDT (TRC20)"}, code:"USDT", logo:"logos/crypto/usdt-trc.png" },
    { id:"usdt-eth", type:"crypto", name:{uk:"USDT (ERC20)", en:"USDT (ERC20)", pl:"USDT (ERC20)"}, code:"USDT", logo:"logos/crypto/usdt-eth.png" },
    { id:"usdt-bep", type:"crypto", name:{uk:"USDT (BEP20)", en:"USDT (BEP20)", pl:"USDT (BEP20)"}, code:"USDT", logo:"logos/crypto/usdt-bep.png" },
    { id:"usdt-sol", type:"crypto", name:{uk:"USDT (SOL)", en:"USDT (SOL)", pl:"USDT (SOL)"}, code:"USDT", logo:"logos/crypto/usdt-sol.png" },
    { id:"usdt-pol", type:"crypto", name:{uk:"USDT (POL)", en:"USDT (POL)", pl:"USDT (POL)"}, code:"USDT", logo:"logos/crypto/usdt-pol.png" },
    { id:"usdt-arb", type:"crypto", name:{uk:"USDT (ARB)", en:"USDT (ARB)", pl:"USDT (ARB)"}, code:"USDT", logo:"logos/crypto/usdt-arb.png" },

    { id:"usdc-eth", type:"crypto", name:{uk:"USDC (ERC20)", en:"USDC (ERC20)", pl:"USDC (ERC20)"}, code:"USDC", logo:"logos/crypto/usdc-eth.png" },
    { id:"usdc-sol", type:"crypto", name:{uk:"USDC (SOL)", en:"USDC (SOL)", pl:"USDC (SOL)"}, code:"USDC", logo:"logos/crypto/usdc-sol.png" },
    { id:"usdc-pol", type:"crypto", name:{uk:"USDC (POL)", en:"USDC (POL)", pl:"USDC (POL)"}, code:"USDC", logo:"logos/crypto/usdc-pol.png" },

    // общий логотип (если есть)
    { id:"tether-usdt", type:"crypto", name:{uk:"Tether", en:"Tether", pl:"Tether"}, code:"USDT", logo:"logos/crypto/tether-usdt.png" },
    { id:"crypto", type:"crypto", name:{uk:"Crypto", en:"Crypto", pl:"Crypto"}, code:"", logo:"logos/crypto/crypto.png" },
  ];

  // ====== STATE ======
  let lang = "uk";
  let give = ITEMS.find(x => x.id === "mono") || ITEMS[0];
  let get  = ITEMS.find(x => x.id === "btc")  || ITEMS[0];
  let activeTab = "exchange";
  let pickingSide = "give"; // 'give' | 'get'
  let modalFilter = "all";
  let modalQuery = "";

  // ====== DOM ======
  const $ = (id) => document.getElementById(id);

  const langBtn = $("langBtn");
  const langLabel = $("langLabel");
  const langMenu = $("langMenu");

  const modal = $("modal");
  const modalBackdrop = $("modalBackdrop");
  const modalClose = $("modalClose");
  const modalList = $("modalList");
  const modalSearch = $("modalSearch");

  const givePicker = $("givePicker");
  const getPicker = $("getPicker");
  const giveIco = $("giveIco");
  const getIco = $("getIco");
  const giveName = $("giveName");
  const getName = $("getName");
  const giveSub = $("giveSub");
  const getSub = $("getSub");
  const giveMeta = $("giveMeta");
  const getMeta = $("getMeta");

  const giveAmount = $("giveAmount");
  const getAmount = $("getAmount");
  const rateLine = $("rateLine");

  const swapBtn = $("swapBtn");
  const createOrder = $("createOrder");

  // ====== SAFETY: КЛИКИ ======
  // если модалка закрыта — она не существует для кликов
  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalSearch.value = "";
    modalQuery = "";
    renderList();
    setTimeout(()=> modalSearch.focus(), 50);
  }
  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // ====== UI UPDATE ======
  function t(obj) { return (obj && obj[lang]) ? obj[lang] : (obj?.uk || ""); }

  function setPickerUI() {
    giveIco.src = give.logo;
    giveIco.onerror = () => { giveIco.src = "logos/crypto/crypto.png"; };

    getIco.src = get.logo;
    getIco.onerror = () => { getIco.src = "logos/crypto/crypto.png"; };

    giveName.textContent = t(give.name);
    getName.textContent = t(get.name);

    giveSub.textContent = give.code || "";
    getSub.textContent = get.code || "";

    giveMeta.textContent = give.type === "banks" ? (lang==="uk"?"Bank":"Bank") : (give.type==="wallets" ? (lang==="uk"?"Wallet":"Wallet") : "Crypto");
    getMeta.textContent  = get.type === "banks" ? (lang==="uk"?"Bank":"Bank") : (get.type==="wallets" ? (lang==="uk"?"Wallet":"Wallet") : "Crypto");
  }

  function calcRate() {
    // заглушка: просто “примерный” курс, чтобы было красиво
    // позже подключишь реальные курсы.
    const base = 0.0000123;
    const amt = parseFloat((giveAmount.value || "0").replace(",", ".")) || 0;
    const out = amt * base;

    // курс показываем мягко
    const rateText =
      lang === "uk" ? `Курс: 1 ${give.code || "UAH"} ≈ ${base.toFixed(8)} ${get.code || ""}` :
      lang === "en" ? `Rate: 1 ${give.code || "UAH"} ≈ ${base.toFixed(8)} ${get.code || ""}` :
                      `Kurs: 1 ${give.code || "UAH"} ≈ ${base.toFixed(8)} ${get.code || ""}`;

    rateLine.textContent = rateText;

    // вывод
    getAmount.value = out ? out.toFixed(8) : "0";
  }

  function setLang(newLang) {
    lang = newLang;
    langLabel.textContent = newLang === "uk" ? "UA" : (newLang === "en" ? "EN" : "PL");

    // частичный перевод убираем: всё переводим тут
    $("tab-exchange").textContent = newLang==="uk" ? "Обмін" : (newLang==="en" ? "Exchange" : "Wymiana");
    $("tab-rules").textContent    = newLang==="uk" ? "Правила" : (newLang==="en" ? "Rules" : "Zasady");
    $("tab-account").textContent  = newLang==="uk" ? "Акаунт" : (newLang==="en" ? "Account" : "Konto");
    $("tab-more").textContent     = newLang==="uk" ? "Ще" : (newLang==="en" ? "More" : "Więcej");

    $("h-exchange").textContent   = newLang==="uk" ? "Обмін" : (newLang==="en" ? "Exchange" : "Wymiana");
    $("lbl-give").textContent     = newLang==="uk" ? "Віддаєте" : (newLang==="en" ? "You send" : "Wysyłasz");
    $("lbl-get").textContent      = newLang==="uk" ? "Отримуєте" : (newLang==="en" ? "You get" : "Otrzymujesz");
    $("createOrder").textContent  = newLang==="uk" ? "Створити заявку" : (newLang==="en" ? "Create order" : "Utwórz zlecenie");
    $("hintStatus").textContent   = newLang==="uk" ? "Статус заявки буде після її подачі." :
                                   (newLang==="en" ? "Order status will appear after submission." :
                                                     "Status zlecenia pojawi się po wysłaniu.");

    $("rulesText").textContent    = newLang==="uk" ? "Тут будуть правила обміну. (Поки заглушка)" :
                                   (newLang==="en" ? "Exchange rules will be here. (Placeholder)" :
                                                     "Zasady wymiany będą tutaj. (Placeholder)");

    $("accountText").textContent  = newLang==="uk" ? "Тут буде вхід/реєстрація і далі KYC (поки без підключення)." :
                                   (newLang==="en" ? "Login/registration and then KYC (not connected yet)." :
                                                     "Logowanie/rejestracja i dalej KYC (jeszcze niepodłączone).");

    $("loginBtn").textContent     = newLang==="uk" ? "Увійти" : (newLang==="en" ? "Login" : "Zaloguj");
    $("registerBtn").textContent  = newLang==="uk" ? "Реєстрація" : (newLang==="en" ? "Register" : "Rejestracja");

    $("reviewsBtn").textContent   = newLang==="uk" ? "Відгуки" : (newLang==="en" ? "Reviews" : "Opinie");
    $("faqBtn").textContent       = "FAQ";
    $("contactsBtn").textContent  = newLang==="uk" ? "Контакти" : (newLang==="en" ? "Contacts" : "Kontakt");

    setPickerUI();
    calcRate();
  }

  // ====== TABS ======
  function setTab(tab) {
    activeTab = tab;
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === `view-${tab}`));
    // при смене вкладки — на всякий случай закрыть модалку
    closeModal();
  }

  // ====== LIST (modal) ======
  function renderList() {
    // фильтры
    let arr = ITEMS.slice();
    if (modalFilter !== "all") arr = arr.filter(x => x.type === modalFilter);
    if (modalQuery.trim()) {
      const q = modalQuery.trim().toLowerCase();
      arr = arr.filter(x => t(x.name).toLowerCase().includes(q) || (x.code||"").toLowerCase().includes(q) || x.id.includes(q));
    }

    modalList.innerHTML = "";
    arr.forEach(item => {
      const row = document.createElement("div");
      row.className = "row";
      row.setAttribute("role","option");

      const left = document.createElement("div");
      left.className = "row-left";

      const img = document.createElement("img");
      img.className = "row-ico";
      img.src = item.logo;
      img.alt = "";
      img.onerror = () => { img.src = "logos/crypto/crypto.png"; };

      const name = document.createElement("div");
      name.className = "row-name";
      name.textContent = t(item.name);

      const sub = document.createElement("div");
      sub.className = "row-sub";
      sub.textContent = item.code ? item.code : (item.type === "banks" ? "UAH" : "");

      left.appendChild(img);
      left.appendChild(name);
      left.appendChild(sub);

      const right = document.createElement("div");
      right.style.fontWeight = "900";
      right.style.opacity = "0.55";
      right.textContent = item.type === "banks" ? (lang==="uk"?"Bank":"Bank") : (item.type==="wallets" ? (lang==="uk"?"Wallet":"Wallet") : "Crypto");

      row.appendChild(left);
      row.appendChild(right);

      row.addEventListener("click", () => {
        if (pickingSide === "give") give = item;
        else get = item;

        setPickerUI();
        calcRate();
        closeModal();
      });

      modalList.appendChild(row);
    });
  }

  // ====== EVENTS ======
  // tabs
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  // lang
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = langMenu.classList.contains("show");
    langMenu.classList.toggle("show", !isOpen);
    langBtn.setAttribute("aria-expanded", String(!isOpen));
  });
  document.addEventListener("click", () => {
    langMenu.classList.remove("show");
    langBtn.setAttribute("aria-expanded", "false");
  });
  langMenu.querySelectorAll(".lang-item").forEach(b => {
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      setLang(b.dataset.lang);
      langMenu.classList.remove("show");
      langBtn.setAttribute("aria-expanded", "false");
    });
  });

  // pickers
  givePicker.addEventListener("click", () => { pickingSide = "give"; openModal(); });
  getPicker.addEventListener("click",  () => { pickingSide = "get";  openModal(); });

  // modal close
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  // chips
  $("chips").querySelectorAll(".chip").forEach(ch => {
    ch.addEventListener("click", () => {
      $("chips").querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
      ch.classList.add("active");
      modalFilter = ch.dataset.filter;
      renderList();
    });
  });

  // search
  modalSearch.addEventListener("input", () => {
    modalQuery = modalSearch.value;
    renderList();
  });

  // swap
  swapBtn.addEventListener("click", () => {
    const tmp = give;
    give = get;
    get = tmp;
    setPickerUI();
    calcRate();
  });

  // calc
  giveAmount.addEventListener("input", calcRate);

  // order
  createOrder.addEventListener("click", () => {
    alert(lang==="uk" ? "Заявка створена (демо)." : (lang==="en" ? "Order created (demo)." : "Zlecenie utworzone (demo)."));
  });

  // ====== INIT ======
  // важное: закрыть модалку при загрузке чтобы не было «невидимой стеклянной пленки»
  closeModal();
  setLang("uk");
  setTab("exchange");
  setPickerUI();
  calcRate();
})();
