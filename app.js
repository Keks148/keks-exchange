(() => {
  const root = () => document.getElementById("root");

  const showFatal = (err) => {
    const r = root();
    if (!r) return;
    r.innerHTML = "";
    const box = document.createElement("div");
    box.className = "fatal";
    box.textContent =
      "JS ERROR (почему пустой экран):\n\n" +
      (err && err.stack ? err.stack : String(err)) +
      "\n\nПроверь что файлы лежат в корне: index.html / styles.css / app.js";
    r.appendChild(box);
  };

  window.addEventListener("error", (e) => showFatal(e.error || e.message));
  window.addEventListener("unhandledrejection", (e) => showFatal(e.reason));

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  const state = {
    tab: "exchange",
    lang: "UA",
    giveId: "privat",
    getId: "btc",
    giveAmount: "100",
    rate: 0.0000000625
  };

  const langs = ["UA","EN","PL"];

  const giveOptions = [
    { id:"privat", title:"PrivatBank (UAH)", icon:"logos/banks/privat.png" },
    { id:"mono", title:"Monobank (UAH)", icon:"logos/banks/mono.png" },
    { id:"oschad", title:"Oschadbank (UAH)", icon:"logos/banks/oschad.png" },
    { id:"pumb", title:"PUMB (UAH)", icon:"logos/banks/pumb.png" },
    { id:"a-bank", title:"A-Bank (UAH)", icon:"logos/banks/a-bank.png" },
    { id:"otp", title:"OTP (UAH)", icon:"logos/banks/otp.png" },
    { id:"izi", title:"IziBank (UAH)", icon:"logos/banks/izi.png" },
    { id:"sense", title:"Sense (UAH)", icon:"logos/banks/sense.png" },
    { id:"ukr-sib", title:"UkrSib (UAH)", icon:"logos/banks/ukr-sib.png" },
    { id:"ukr-banki", title:"UkrBanki (UAH)", icon:"logos/banks/ukr-banki.png" },
    { id:"visa-master", title:"Visa/Master (UAH)", icon:"logos/banks/visa-master.png" },

    { id:"usdt-trc", title:"USDT (TRC20)", icon:"logos/crypto/usdt-trc.png" },
    { id:"usdt-eth", title:"USDT (ERC20)", icon:"logos/crypto/usdt-eth.png" },
    { id:"usdt-pol", title:"USDT (Polygon)", icon:"logos/crypto/usdt-pol.png" },
    { id:"usdt-sol", title:"USDT (Solana)", icon:"logos/crypto/usdt-sol.png" },
    { id:"usdt-arb", title:"USDT (Arbitrum)", icon:"logos/crypto/usdt-arb.png" },

    { id:"btc", title:"Bitcoin (BTC)", icon:"logos/crypto/btc.png" },
    { id:"eth", title:"Ethereum (ETH)", icon:"logos/crypto/eth.png" },
    { id:"ltc", title:"Litecoin (LTC)", icon:"logos/crypto/ltc.png" },
    { id:"sol", title:"Solana (SOL)", icon:"logos/crypto/sol.png" },
    { id:"ton", title:"TON (TON)", icon:"logos/crypto/ton.png" },
    { id:"trx", title:"TRON (TRX)", icon:"logos/crypto/trx.png" },

    { id:"usdc-eth", title:"USDC (ERC20)", icon:"logos/crypto/usdc-eth.png" },
    { id:"usdc-pol", title:"USDC (Polygon)", icon:"logos/crypto/usdc-pol.png" },
    { id:"usdc-sol", title:"USDC (Solana)", icon:"logos/crypto/usdc-sol.png" },

    { id:"paypal", title:"PayPal", icon:"logos/wallets/paypal.png" },
    { id:"payoneer", title:"Payoneer", icon:"logos/wallets/payoneer.png" },
    { id:"revolut", title:"Revolut", icon:"logos/wallets/revolut.png" },
    { id:"vise", title:"Visa", icon:"logos/wallets/vise.png" },
    { id:"valet", title:"Wallet", icon:"logos/wallets/valet.png" },
  ];

  const getOptions = [
    { id:"btc", title:"Bitcoin (BTC)", icon:"logos/crypto/btc.png" },
    { id:"eth", title:"Ethereum (ETH)", icon:"logos/crypto/eth.png" },
    { id:"ltc", title:"Litecoin (LTC)", icon:"logos/crypto/ltc.png" },
    { id:"sol", title:"Solana (SOL)", icon:"logos/crypto/sol.png" },
    { id:"ton", title:"TON (TON)", icon:"logos/crypto/ton.png" },
    { id:"trx", title:"TRON (TRX)", icon:"logos/crypto/trx.png" },

    { id:"usdt-trc", title:"USDT (TRC20)", icon:"logos/crypto/usdt-trc.png" },
    { id:"usdt-eth", title:"USDT (ERC20)", icon:"logos/crypto/usdt-eth.png" },
    { id:"usdt-pol", title:"USDT (Polygon)", icon:"logos/crypto/usdt-pol.png" },
    { id:"usdt-sol", title:"USDT (Solana)", icon:"logos/crypto/usdt-sol.png" },
    { id:"usdt-arb", title:"USDT (Arbitrum)", icon:"logos/crypto/usdt-arb.png" },

    { id:"usdc-eth", title:"USDC (ERC20)", icon:"logos/crypto/usdc-eth.png" },
    { id:"usdc-pol", title:"USDC (Polygon)", icon:"logos/crypto/usdc-pol.png" },
    { id:"usdc-sol", title:"USDC (Solana)", icon:"logos/crypto/usdc-sol.png" },

    { id:"paypal", title:"PayPal", icon:"logos/wallets/paypal.png" },
    { id:"payoneer", title:"Payoneer", icon:"logos/wallets/payoneer.png" },
    { id:"revolut", title:"Revolut", icon:"logos/wallets/revolut.png" },
    { id:"vise", title:"Visa", icon:"logos/wallets/vise.png" },
    { id:"valet", title:"Wallet", icon:"logos/wallets/valet.png" },
  ];

  const dict = {
    UA:{ exchange:"Обмін", rules:"Правила", faq:"FAQ", account:"Акаунт", give:"Віддаєте", get:"Отримуєте", rate:"Курс", create:"Створити заявку",
         accTitle:"Акаунт", accText:"Тут буде вхід/реєстрація і далі KYC (поки без підключення).", login:"Увійти", register:"Реєстрація" },
    EN:{ exchange:"Exchange", rules:"Rules", faq:"FAQ", account:"Account", give:"You give", get:"You get", rate:"Rate", create:"Create request",
         accTitle:"Account", accText:"Login/registration and KYC will be here (not connected yet).", login:"Login", register:"Register" },
    PL:{ exchange:"Wymiana", rules:"Zasady", faq:"FAQ", account:"Konto", give:"Oddajesz", get:"Otrzymujesz", rate:"Kurs", create:"Utwórz заявку",
         accTitle:"Konto", accText:"Tutaj będzie logowanie/rejestracja i KYC (jeszcze nie podłączone).", login:"Zaloguj", register:"Rejestracja" },
  };
  const t = (k) => dict[state.lang][k] || k;

  const find = (arr, id) => arr.find(x => x.id === id) || arr[0];

  const fmt = (n) => {
    if (!isFinite(n)) return "0";
    let s = Number(n).toFixed(12);
    return s.replace(/\.?0+$/,"");
  };

  const calc = () => {
    const give = parseFloat(String(state.giveAmount).replace(",", "."));
    if (!isFinite(give) || give <= 0) return 0;
    return give * state.rate;
  };

  const swap = () => {
    const tmp = state.giveId;
    state.giveId = state.getId;
    state.getId = tmp;
    // нормализуем, если вдруг нет в списке
    if (!giveOptions.find(x => x.id === state.giveId)) state.giveId = giveOptions[0].id;
    if (!getOptions.find(x => x.id === state.getId)) state.getId = getOptions[0].id;
    render();
  };

  const makeSelectField = (label, options, currentId, onChange) => {
    const current = find(options, currentId);

    const wrap = el("div");
    wrap.appendChild(el("div","sectionTitle",label));

    const field = el("div","field");
    const row = el("div","row");

    const icon = el("div","icon");
    const img = document.createElement("img");
    img.src = current.icon;
    img.alt = current.title;
    img.onerror = () => { img.style.display = "none"; };
    icon.appendChild(img);

    const sel = document.createElement("select");
    sel.className = "select";
    options.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o.id;
      opt.textContent = o.title;
      if (o.id === currentId) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", (e) => onChange(e.target.value));

    row.appendChild(icon);
    row.appendChild(sel);
    field.appendChild(row);
    wrap.appendChild(field);
    return wrap;
  };

  const exchangeView = () => {
    const card = el("div","card");

    card.appendChild(makeSelectField(t("give"), giveOptions, state.giveId, (id)=>{ state.giveId=id; render(); }));

    const amountField = el("div","field");
    const inp = document.createElement("input");
    inp.className = "amount";
    inp.value = state.giveAmount;
    inp.placeholder = "0";
    inp.inputMode = "decimal";
    inp.addEventListener("input", (e)=>{ state.giveAmount = e.target.value; render(); });
    amountField.appendChild(inp);
    card.appendChild(amountField);

    const btn = document.createElement("button");
    btn.className = "swapBtn";
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h13l-3-3 1.4-1.4L23.8 9l-6.4 6.4-1.4-1.4L19 11H6V7z"></path>
        <path d="M18 17H5l3 3-1.4 1.4L.2 15l6.4-6.4 1.4 1.4L5 13h13v4z"></path>
      </svg>`;
    btn.addEventListener("click", swap);
    card.appendChild(btn);

    card.appendChild(makeSelectField(t("get"), getOptions, state.getId, (id)=>{ state.getId=id; render(); }));

    const out = el("div","field");
    out.innerHTML = `<div class="amount">${fmt(calc())}</div>`;
    card.appendChild(out);

    const rate = el("div","rate", `${t("rate")}: 1 UAH ≈ ${fmt(state.rate)} BTC`);
    card.appendChild(rate);

    const cta = document.createElement("button");
    cta.className = "cta";
    cta.textContent = t("create");
    cta.addEventListener("click", ()=>{ /* демо */ });
    card.appendChild(cta);

    return card;
  };

  const rulesView = () => {
    const card = el("div","card");
    card.appendChild(el("div","h2", t("rules")));
    card.appendChild(el("div","smallCard", `<div class="p">Тут будуть правила обміну (поки заглушка).</div>`));
    return card;
  };

  const faqView = () => {
    const card = el("div","card");
    card.appendChild(el("div","h2","FAQ"));
    card.appendChild(el("div","smallCard", `<div class="p">Пізніше додамо відповіді та підтримку.</div>`));
    return card;
  };

  const accountView = () => {
    const card = el("div","card");
    card.appendChild(el("div","h2", t("accTitle")));
    card.appendChild(el("div","p", t("accText")));

    const row = el("div","btnRow");
    const b1 = el("button","btn primary", t("login"));
    const b2 = el("button","btn", t("register"));
    row.appendChild(b1); row.appendChild(b2);
    card.appendChild(row);

    return card;
  };

  const topUI = () => {
    const top = el("div","topbar");

    const brandRow = el("div","brandRow");
    const logo = document.createElement("img");
    logo.className = "brandLogo";
    logo.src = "logos/keks-logo.png";
    logo.alt = "KeksSwap";
    logo.onerror = () => { /* если логотип не найден — просто не показываем */ logo.style.display="none"; };

    const lang = document.createElement("select");
    lang.className = "langSelect";
    langs.forEach(code => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = code;
      if (code === state.lang) opt.selected = true;
      lang.appendChild(opt);
    });
    lang.addEventListener("change", (e)=>{ state.lang = e.target.value; render(); });

    brandRow.appendChild(logo);
    brandRow.appendChild(lang);
    top.appendChild(brandRow);

    const tabs = el("div","tabs");
    const mkTab = (key, id) => {
      const b = document.createElement("button");
      b.className = "tab" + (state.tab === id ? " active" : "");
      b.textContent = t(key);
      b.addEventListener("click", ()=>{ state.tab = id; render(); });
      return b;
    };

    tabs.appendChild(mkTab("exchange","exchange"));
    tabs.appendChild(mkTab("rules","rules"));
    tabs.appendChild(mkTab("faq","faq"));
    tabs.appendChild(mkTab("account","account"));

    top.appendChild(tabs);
    return top;
  };

  const render = () => {
    try{
      const r = root();
      if (!r) return;

      r.innerHTML = "";
      r.appendChild(topUI());

      if (state.tab === "exchange") r.appendChild(exchangeView());
      if (state.tab === "rules") r.appendChild(rulesView());
      if (state.tab === "faq") r.appendChild(faqView());
      if (state.tab === "account") r.appendChild(accountView());
    }catch(err){
      showFatal(err);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    try{
      render();
    }catch(err){
      showFatal(err);
    }
  });
})();
