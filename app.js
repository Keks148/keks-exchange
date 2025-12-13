/* KeksSwap mini-app UI (no modals, all clickable)
   Assets:
   - logos/keks-logo.png
   - logos/banks/*.png
   - logos/crypto/*.png
   - logos/wallets/*.png
*/

(function () {
  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  const state = {
    tab: "exchange",
    lang: "UA",
    giveType: "bank",     // bank | crypto | wallet
    getType: "crypto",
    giveId: "privat",
    getId: "btc",
    giveAmount: "100",
    rate: 0.0000000625
  };

  // Unified options (all in one dropdown line style)
  const giveOptions = [
    { id: "privat", type: "bank",  title: "PrivatBank (UAH)", icon: "logos/banks/privat.png" },
    { id: "mono",   type: "bank",  title: "Monobank (UAH)",   icon: "logos/banks/mono.png" },
    { id: "oschad", type: "bank",  title: "Oschadbank (UAH)", icon: "logos/banks/oschad.png" },
    { id: "pumb",   type: "bank",  title: "PUMB (UAH)",       icon: "logos/banks/pumb.png" },
    { id: "a-bank", type: "bank",  title: "A-Bank (UAH)",     icon: "logos/banks/a-bank.png" },
    { id: "otp",    type: "bank",  title: "OTP (UAH)",        icon: "logos/banks/otp.png" },
    { id: "izi",    type: "bank",  title: "IziBank (UAH)",    icon: "logos/banks/izi.png" },
    { id: "sense",  type: "bank",  title: "Sense (UAH)",      icon: "logos/banks/sense.png" },
    { id: "ukr-sib",type: "bank",  title: "UkrSib (UAH)",     icon: "logos/banks/ukr-sib.png" },
    { id: "ukr-banki",type:"bank", title: "UkrBanki (UAH)",   icon: "logos/banks/ukr-banki.png" },
    { id: "visa-master",type:"bank",title:"Visa/Master (UAH)",icon: "logos/banks/visa-master.png" },

    { id: "usdt-trc", type: "crypto", title: "USDT (TRC20)", icon: "logos/crypto/usdt-trc.png" },
    { id: "usdt-eth", type: "crypto", title: "USDT (ERC20)", icon: "logos/crypto/usdt-eth.png" },
    { id: "usdt-pol", type: "crypto", title: "USDT (Polygon)", icon: "logos/crypto/usdt-pol.png" },
    { id: "usdt-sol", type: "crypto", title: "USDT (Solana)", icon: "logos/crypto/usdt-sol.png" },
    { id: "usdt-arb", type: "crypto", title: "USDT (Arbitrum)", icon: "logos/crypto/usdt-arb.png" },

    { id: "btc",  type: "crypto", title: "Bitcoin (BTC)",   icon: "logos/crypto/btc.png" },
    { id: "eth",  type: "crypto", title: "Ethereum (ETH)",  icon: "logos/crypto/eth.png" },
    { id: "ltc",  type: "crypto", title: "Litecoin (LTC)",  icon: "logos/crypto/ltc.png" },
    { id: "sol",  type: "crypto", title: "Solana (SOL)",    icon: "logos/crypto/sol.png" },
    { id: "ton",  type: "crypto", title: "TON (TON)",       icon: "logos/crypto/ton.png" },
    { id: "trx",  type: "crypto", title: "TRON (TRX)",      icon: "logos/crypto/trx.png" },

    { id: "usdc-eth", type: "crypto", title: "USDC (ERC20)", icon: "logos/crypto/usdc-eth.png" },
    { id: "usdc-pol", type: "crypto", title: "USDC (Polygon)", icon: "logos/crypto/usdc-pol.png" },
    { id: "usdc-sol", type: "crypto", title: "USDC (Solana)", icon: "logos/crypto/usdc-sol.png" },

    { id: "paypal",   type:"wallet", title:"PayPal",    icon:"logos/wallets/paypal.png" },
    { id: "payoneer", type:"wallet", title:"Payoneer",  icon:"logos/wallets/payoneer.png" },
    { id: "revolut",  type:"wallet", title:"Revolut",   icon:"logos/wallets/revolut.png" },
    { id: "vise",     type:"wallet", title:"Visa",      icon:"logos/wallets/vise.png" },
    { id: "valet",    type:"wallet", title:"Wallet",    icon:"logos/wallets/valet.png" },
  ];

  const getOptions = [
    // We allow receiving crypto + wallets as well
    { id: "btc",  type: "crypto", title: "Bitcoin (BTC)",   icon: "logos/crypto/btc.png" },
    { id: "eth",  type: "crypto", title: "Ethereum (ETH)",  icon: "logos/crypto/eth.png" },
    { id: "ltc",  type: "crypto", title: "Litecoin (LTC)",  icon: "logos/crypto/ltc.png" },
    { id: "sol",  type: "crypto", title: "Solana (SOL)",    icon: "logos/crypto/sol.png" },
    { id: "ton",  type: "crypto", title: "TON (TON)",       icon: "logos/crypto/ton.png" },
    { id: "trx",  type: "crypto", title: "TRON (TRX)",      icon: "logos/crypto/trx.png" },

    { id: "usdt-trc", type: "crypto", title: "USDT (TRC20)", icon: "logos/crypto/usdt-trc.png" },
    { id: "usdt-eth", type: "crypto", title: "USDT (ERC20)", icon: "logos/crypto/usdt-eth.png" },
    { id: "usdt-pol", type: "crypto", title: "USDT (Polygon)", icon: "logos/crypto/usdt-pol.png" },
    { id: "usdt-sol", type: "crypto", title: "USDT (Solana)", icon: "logos/crypto/usdt-sol.png" },
    { id: "usdt-arb", type: "crypto", title: "USDT (Arbitrum)", icon: "logos/crypto/usdt-arb.png" },

    { id: "usdc-eth", type: "crypto", title: "USDC (ERC20)", icon: "logos/crypto/usdc-eth.png" },
    { id: "usdc-pol", type: "crypto", title: "USDC (Polygon)", icon: "logos/crypto/usdc-pol.png" },
    { id: "usdc-sol", type: "crypto", title: "USDC (Solana)", icon: "logos/crypto/usdc-sol.png" },

    { id: "paypal",   type:"wallet", title:"PayPal",    icon:"logos/wallets/paypal.png" },
    { id: "payoneer", type:"wallet", title:"Payoneer",  icon:"logos/wallets/payoneer.png" },
    { id: "revolut",  type:"wallet", title:"Revolut",   icon:"logos/wallets/revolut.png" },
    { id: "vise",     type:"wallet", title:"Visa",      icon:"logos/wallets/vise.png" },
    { id: "valet",    type:"wallet", title:"Wallet",    icon:"logos/wallets/valet.png" },
  ];

  const langs = ["UA","EN","PL"];

  const t = (key) => {
    const dict = {
      UA: {
        exchange: "Обмін",
        rules: "Правила",
        faq: "FAQ",
        account: "Акаунт",
        close: "Закрити",
        give: "Віддаєте",
        get: "Отримуєте",
        create: "Створити заявку",
        rate: "Курс",
        accTitle: "Акаунт",
        accText: "Тут буде вхід/реєстрація і далі KYC (поки без підключення).",
        login: "Увійти",
        register: "Реєстрація"
      },
      EN: {
        exchange: "Exchange",
        rules: "Rules",
        faq: "FAQ",
        account: "Account",
        close: "Close",
        give: "You give",
        get: "You get",
        create: "Create request",
        rate: "Rate",
        accTitle: "Account",
        accText: "Login/registration and KYC will be here (not connected yet).",
        login: "Login",
        register: "Register"
      },
      PL: {
        exchange: "Wymiana",
        rules: "Zasady",
        faq: "FAQ",
        account: "Konto",
        close: "Zamknij",
        give: "Oddajesz",
        get: "Otrzymujesz",
        create: "Utwórz заявку",
        rate: "Kurs",
        accTitle: "Konto",
        accText: "Tutaj będzie logowanie/rejestracja i KYC (jeszcze nie podłączone).",
        login: "Zaloguj",
        register: "Rejestracja"
      }
    };
    return dict[state.lang][key] || key;
  };

  const findOpt = (arr, id) => arr.find(x => x.id === id) || arr[0];

  const fmt = (n) => {
    if (!isFinite(n)) return "0";
    // show up to 12 decimals without trailing zeros
    let s = Number(n).toFixed(12);
    s = s.replace(/\.?0+$/,"");
    return s;
  };

  const calc = () => {
    const give = parseFloat(String(state.giveAmount).replace(",", "."));
    if (!isFinite(give) || give <= 0) return 0;
    return give * state.rate;
  };

  const swap = () => {
    // swap selections and types
    const tmpId = state.giveId;
    state.giveId = state.getId;
    state.getId = tmpId;

    const tmpType = state.giveType;
    state.giveType = state.getType;
    state.getType = tmpType;

    // if swapped to something not in lists, normalize
    if (!giveOptions.find(x => x.id === state.giveId)) state.giveId = giveOptions[0].id;
    if (!getOptions.find(x => x.id === state.getId)) state.getId = getOptions[0].id;

    render();
  };

  const onChangeGive = (id) => {
    const opt = giveOptions.find(x => x.id === id);
    if (!opt) return;
    state.giveId = id;
    state.giveType = opt.type;
    render();
  };

  const onChangeGet = (id) => {
    const opt = getOptions.find(x => x.id === id);
    if (!opt) return;
    state.getId = id;
    state.getType = opt.type;
    render();
  };

  const setTab = (tab) => { state.tab = tab; render(); };

  const setLang = (lang) => { state.lang = lang; render(); };

  const topUI = () => {
    return el("div", {}, [
      el("div", { class:"nativeBar" }, [
        el("div", { class:"nativeLeft" }, [
          el("button", { class:"nativeClose", onclick: () => alert("Закрытие в Telegram Mini App обычно делает Telegram кнопкой назад.") }, ["× ", t("close")])
        ]),
        el("div", { class:"nativeRight" }, [
          el("button", { class:"nativeIconBtn", onclick: () => {} }, ["⌄"]),
          el("button", { class:"nativeIconBtn", onclick: () => {} }, ["⋮"])
        ])
      ]),
      el("div", { class:"topbar" }, [
        el("div", { class:"brandRow" }, [
          el("img", { class:"brandLogo", src:"logos/keks-logo.png", alt:"KeksSwap" }),
          el("select", {
            class:"langSelect",
            onchange: (e) => setLang(e.target.value)
          }, langs.map(code => el("option", { value:code, selected: code===state.lang ? "selected" : null }, [code])))
        ]),
        el("div", { class:"tabs" }, [
          el("button", { class:`tab ${state.tab==="exchange"?"active":""}`, onclick: () => setTab("exchange") }, [t("exchange")]),
          el("button", { class:`tab ${state.tab==="rules"?"active":""}`, onclick: () => setTab("rules") }, [t("rules")]),
          el("button", { class:`tab ${state.tab==="faq"?"active":""}`, onclick: () => setTab("faq") }, [t("faq")]),
          el("button", { class:`tab ${state.tab==="account"?"active":""}`, onclick: () => setTab("account") }, [t("account")]),
        ])
      ])
    ]);
  };

  const optionRow = (opt) => {
    // show in select as text only (icons are shown next to select)
    return el("option", { value: opt.id, selected: null }, [opt.title]);
  };

  const selectField = (label, options, currentId, onChange) => {
    const current = findOpt(options, currentId);
    return el("div", {}, [
      el("div", { class:"sectionTitle" }, [label]),
      el("div", { class:"field compact" }, [
        el("div", { class:"rowBetween" }, [
          el("div", { class:"row" }, [
            el("div", { class:"icon" }, [
              el("img", { src: current.icon, alt: current.title, onerror: (e)=>{ e.target.style.display="none"; } })
            ]),
            el("div", {}, [
              el("select", { class:"select", onchange: (e)=>onChange(e.target.value) },
                options.map(optionRow)
              ),
              el("div", { class:"sub" }, [current.title.includes("(") ? current.title.split("(")[1].replace(")","") : ""])
            ])
          ]),
          el("div", { style:"opacity:.45;font-weight:900;" }, ["▾"])
        ])
      ])
    ]);
  };

  const amountField = (value, onInput) => {
    return el("div", { class:"field" }, [
      el("input", {
        class:"amount",
        inputmode:"decimal",
        value: value,
        placeholder:"0",
        oninput: (e)=>onInput(e.target.value)
      })
    ]);
  };

  const exchangeView = () => {
    const giveOpt = findOpt(giveOptions, state.giveId);
    const getOpt  = findOpt(getOptions, state.getId);

    // ensure selects show correct selected option
    // (set selected attribute)
    const fixSelected = (selectEl, id) => {
      [...selectEl.options].forEach(o => o.selected = (o.value === id));
    };

    const giveSelect = selectField(t("give"), giveOptions, state.giveId, onChangeGive);
    const getSelect  = selectField(t("get"),  getOptions,  state.getId,  onChangeGet);

    // After DOM created, patch selects
    setTimeout(() => {
      const selects = document.querySelectorAll(".select");
      if (selects.length >= 2) {
        fixSelected(selects[0], state.giveId);
        fixSelected(selects[1], state.getId);
      }
    }, 0);

    const result = calc();

    return el("div", { class:"card" }, [
      // no big page title (you asked to remove header)
      // give
      giveSelect,
      el("div", { class:"stackGap" }),
      amountField(state.giveAmount, (v)=>{ state.giveAmount = v; render(); }),

      // swap
      el("button", { class:"swapBtn", onclick: swap, title:"Swap" }, [
        el("svg", { viewBox:"0 0 24 24", "aria-hidden":"true" }, [
          el("path", { d:"M6 7h13l-3-3 1.4-1.4L23.8 9l-6.4 6.4-1.4-1.4L19 11H6V7z" }),
          el("path", { d:"M18 17H5l3 3-1.4 1.4L.2 15l6.4-6.4 1.4 1.4L5 13h13v4z" })
        ])
      ]),

      // get
      getSelect,
      el("div", { class:"stackGap" }),
      el("div", { class:"field" }, [
        el("div", { class:"amount" }, [fmt(result)])
      ]),

      el("div", { class:"rate" }, [
        `${t("rate")}: 1 UAH ≈ ${fmt(state.rate)} BTC`
      ]),

      el("button", {
        class:"cta",
        onclick: ()=>alert("Заявка створена (демо). Далі буде інтеграція з ботом/CRM.")
      }, [t("create")]),

      el("div", { class:"footerSpace" })
    ]);
  };

  const rulesView = () => {
    return el("div", { class:"card" }, [
      el("div", { class:"h2" }, [t("rules")]),
      el("div", { class:"p" }, ["Тут будуть правила обміну (поки заглушка)."]),
      el("div", { class:"smallCard" }, [
        el("div", { class:"notice" }, [
          "• Обмін виконується після підтвердження оплати.\n",
          "• Комісії та курс показуються перед створенням заявки.\n",
          "• Підтримка: додамо контакти в наступних кроках."
        ])
      ])
    ]);
  };

  const faqView = () => {
    return el("div", { class:"card" }, [
      el("div", { class:"h2" }, ["FAQ"]),
      el("div", { class:"smallCard" }, [
        el("div", { class:"notice" }, [
          "• Як швидко? — залежить від банку/мережі.\n",
          "• Які мережі? — USDT/USDC (TRC20, ERC20, Polygon, Solana, Arbitrum).\n",
          "• Чи буде KYC? — так, у розділі Акаунт (пізніше)."
        ])
      ])
    ]);
  };

  const accountView = () => {
    return el("div", { class:"card" }, [
      el("div", { class:"h2" }, [t("accTitle")]),
      el("div", { class:"p" }, [t("accText")]),
      el("div", { class:"btnRow" }, [
        el("button", { class:"btn primary", onclick: ()=>alert("Демо: Вхід (поки без підключення).") }, [t("login")]),
        el("button", { class:"btn", onclick: ()=>alert("Демо: Реєстрація (поки без підключення).") }, [t("register")]),
      ])
    ]);
  };

  const render = () => {
    const root = document.getElementById("root");
    root.innerHTML = "";

    root.appendChild(topUI());

    let view = null;
    if (state.tab === "exchange") view = exchangeView();
    if (state.tab === "rules") view = rulesView();
    if (state.tab === "faq") view = faqView();
    if (state.tab === "account") view = accountView();

    root.appendChild(view);
  };

  render();
})();
