// Telegram init
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) tg.expand();

/* ===================== ЛОКАЛИЗАЦИЯ ===================== */

const translations = {
  uk: {
    notice_text:
      "Заявки, створені після 22:00, обробляються з 08:00 (UTC+2).",
    from_block_title: "Віддаєте",
    to_block_title: "Отримуєте",
    info_pair: "Обмін",
    info_rate: "Курс",
    info_fee: "Комісія сервісу",
    info_payout: "До виплати",
    btn_continue: "Продовжити",
    details_title: "Дані для заявки",
    summary_from: "Віддаєте",
    summary_to: "Отримуєте",
    summary_rate: "Курс + комісія",
    field_recipient:
      "Реквізити для зарахування (номер картки / IBAN / гаманець)",
    field_name: "Ваше імʼя",
    field_comment: "Коментар (необовʼязково)",
    aml_note_long:
      "Створюючи заявку, ви погоджуєтесь з правилами сервісу та AML/KYC політикою. У разі виявлення підозрілої активності виплата може бути призупинена до завершення перевірки.",
    btn_submit: "Створити заявку",
    btn_back: "Назад",
    menu_login: "Увійти",
    menu_main: "Головна",
    menu_rules: "Правила обміну",
    menu_aml: "AML & KYC",
    menu_faq: "FAQ",
    menu_contacts: "Контакти",
    rules_title: "Правила обміну",
    rules_text:
      "Тут будуть основні умови сервісу: мінімальні та максимальні суми, час обробки заявок, правила фіксації курсу, обмеження, повернення платежів тощо.",
    aml_text:
      "KeksSwap виконує базову AML-перевірку всіх вхідних транзакцій. У разі виявлення звʼязку з шахрайськими схемами або санкційними адресами заявка може бути скасована.",
    faq_text:
      "Тут можна додати відповіді на часті запитання: час обміну, ліміти, підтримувані валюти тощо.",
    contacts_title: "Контакти",
    contacts_text:
      "Для підтримки звертайтесь у Telegram: @ВашНік або на email: support@keksswap.com",
  },
  en: {
    notice_text:
      "Requests created after 22:00 are processed from 08:00 (UTC+2).",
    from_block_title: "You give",
    to_block_title: "You receive",
    info_pair: "Exchange",
    info_rate: "Rate",
    info_fee: "Service fee",
    info_payout: "Payout",
    btn_continue: "Continue",
    details_title: "Request details",
    summary_from: "You give",
    summary_to: "You receive",
    summary_rate: "Rate + fee",
    field_recipient: "Recipient details (card / IBAN / wallet)",
    field_name: "Your name",
    field_comment: "Comment (optional)",
    aml_note_long:
      "By creating a request you agree to the service rules and AML/KYC policy. In case of suspicious activity the payout may be delayed.",
    btn_submit: "Create request",
    btn_back: "Back",
    menu_login: "Log in",
    menu_main: "Home",
    menu_rules: "Exchange rules",
    menu_aml: "AML & KYC",
    menu_faq: "FAQ",
    menu_contacts: "Contacts",
    rules_title: "Exchange rules",
    rules_text:
      "Here you can describe main terms: min/max limits, processing time, rate fixation rules, refunds etc.",
    aml_text:
      "KeksSwap performs basic AML checks of all incoming transactions. If a link to fraudulent schemes or sanction addresses is detected, the order may be cancelled.",
    faq_text:
      "Add answers to common questions: exchange time, limits, supported currencies, etc.",
    contacts_title: "Contacts",
    contacts_text:
      "Support: Telegram @YourNick or email support@keksswap.com",
  },
  pl: {
    notice_text:
      "Zlecenia po 22:00 są przetwarzane od 08:00 (UTC+2).",
    from_block_title: "Oddajesz",
    to_block_title: "Otrzymujesz",
    info_pair: "Wymiana",
    info_rate: "Kurs",
    info_fee: "Prowizja serwisu",
    info_payout: "Do wypłaty",
    btn_continue: "Kontynuuj",
    details_title: "Dane zlecenia",
    summary_from: "Oddajesz",
    summary_to: "Otrzymujesz",
    summary_rate: "Kurs + prowizja",
    field_recipient:
      "Dane odbiorcy (numer karty / IBAN / portfel)",
    field_name: "Twoje imię",
    field_comment: "Komentarz (opcjonalnie)",
    aml_note_long:
      "Tworząc zlecenie, akceptujesz regulamin i politykę AML/KYC. W przypadku podejrzanej aktywności wypłata może zostać wstrzymana.",
    btn_submit: "Utwórz zlecenie",
    btn_back: "Wstecz",
    menu_login: "Zaloguj się",
    menu_main: "Strona główna",
    menu_rules: "Zasady wymiany",
    menu_aml: "AML & KYC",
    menu_faq: "FAQ",
    menu_contacts: "Kontakt",
    rules_title: "Zasady wymiany",
    rules_text:
      "Tutaj możesz dodać główne zasady: limity, czas realizacji, zasady kursu, zwroty itd.",
    aml_text:
      "KeksSwap wykonuje podstawową kontrolę AML wszystkich transakcji. W przypadku wykrycia podejrzanej aktywności zlecenie może zostać anulowane.",
    faq_text:
      "Dodaj odpowiedzi na najczęstsze pytania: czas wymiany, limity, obsługiwane waluty itd.",
    contacts_title: "Kontakt",
    contacts_text:
      "Wsparcie: Telegram @YourNick lub email support@keksswap.com",
  },
};

let currentLang = "uk";

function applyTranslations() {
  const dict = translations[currentLang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  const search = document.getElementById("picker-search");
  if (search) {
    if (currentLang === "uk") search.placeholder = "Пошук...";
    if (currentLang === "en") search.placeholder = "Search...";
    if (currentLang === "pl") search.placeholder = "Szukaj...";
  }
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".lang-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLang = btn.dataset.lang;
    applyTranslations();
    renderPicker(); // подписчики групп
    updateAssetTexts();
  });
});

document
  .querySelector('.lang-btn[data-lang="uk"]')
  .classList.add("active");

/* ===================== ДАННЫЕ АКТИВОВ ===================== */

const ASSETS = [
  // CRYPTO
  {
    id: "btc",
    group: "crypto",
    type: "crypto",
    icon: "₿",
    ticker: "BTC",
    name: "Bitcoin BTC",
    sub: {
      uk: "Криптовалюта",
      en: "Cryptocurrency",
      pl: "Kryptowaluta",
    },
    min: 0.0001,
    max: 10,
    priceUah: 1500000,
  },
  {
    id: "eth",
    group: "crypto",
    type: "crypto",
    icon: "Ξ",
    ticker: "ETH",
    name: "Ethereum ETH",
    sub: {
      uk: "Криптовалюта",
      en: "Cryptocurrency",
      pl: "Kryptowaluta",
    },
    min: 0.01,
    max: 300,
    priceUah: 90000,
  },
  {
    id: "usdt_trc",
    group: "crypto",
    type: "crypto",
    icon: "₮",
    ticker: "USDT",
    name: "USDT TRC20",
    sub: {
      uk: "Стаблкоїн TRC20",
      en: "Stablecoin TRC20",
      pl: "Stablecoin TRC20",
    },
    min: 10,
    max: 100000,
    priceUah: 40,
  },
  {
    id: "usdt_erc",
    group: "crypto",
    type: "crypto",
    icon: "₮",
    ticker: "USDT",
    name: "USDT ERC20",
    sub: {
      uk: "Стаблкоїн ERC20",
      en: "Stablecoin ERC20",
      pl: "Stablecoin ERC20",
    },
    min: 10,
    max: 100000,
    priceUah: 40,
  },
  {
    id: "usdc",
    group: "crypto",
    type: "crypto",
    icon: "◎",
    ticker: "USDC",
    name: "USDC",
    sub: {
      uk: "Стаблкоїн",
      en: "Stablecoin",
      pl: "Stablecoin",
    },
    min: 10,
    max: 100000,
    priceUah: 40,
  },
  {
    id: "bnb",
    group: "crypto",
    type: "crypto",
    icon: "🟡",
    ticker: "BNB",
    name: "BNB (BEP20)",
    sub: {
      uk: "Криптовалюта",
      en: "Cryptocurrency",
      pl: "Kryptowaluta",
    },
    min: 0.1,
    max: 500,
    priceUah: 18000,
  },
  {
    id: "trx",
    group: "crypto",
    type: "crypto",
    icon: "⚡",
    ticker: "TRX",
    name: "Tron TRX",
    sub: {
      uk: "Криптовалюта",
      en: "Cryptocurrency",
      pl: "Kryptowaluta",
    },
    min: 100,
    max: 1000000,
    priceUah: 3.5,
  },

  // UA BANKS
  {
    id: "mono",
    group: "ua_banks",
    type: "fiat",
    icon: "🟣",
    ticker: "UAH",
    name: "Monobank UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },
  {
    id: "pb",
    group: "ua_banks",
    type: "fiat",
    icon: "💳",
    ticker: "UAH",
    name: "PrivatBank UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },
  {
    id: "abank",
    group: "ua_banks",
    type: "fiat",
    icon: "🅰️",
    ticker: "UAH",
    name: "A-Bank UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },
  {
    id: "pumb",
    group: "ua_banks",
    type: "fiat",
    icon: "🏦",
    ticker: "UAH",
    name: "PUMB UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },
  {
    id: "oshchad",
    group: "ua_banks",
    type: "fiat",
    icon: "🏛️",
    ticker: "UAH",
    name: "Oschadbank UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },
  {
    id: "raif",
    group: "ua_banks",
    type: "fiat",
    icon: "🟡",
    ticker: "UAH",
    name: "Raiffeisen UAH",
    sub: {
      uk: "Банк України",
      en: "Ukrainian bank",
      pl: "Bank ukraiński",
    },
    priceUah: 1,
  },

  // E-WALLETS
  {
    id: "wise_eur",
    group: "wallets",
    type: "wallet",
    icon: "🟦",
    ticker: "EUR",
    name: "Wise EUR",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 44,
  },
  {
    id: "wise_usd",
    group: "wallets",
    type: "wallet",
    icon: "🟦",
    ticker: "USD",
    name: "Wise USD",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 41,
  },
  {
    id: "revolut_eur",
    group: "wallets",
    type: "wallet",
    icon: "🅁",
    ticker: "EUR",
    name: "Revolut EUR",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 44,
  },
  {
    id: "revolut_usd",
    group: "wallets",
    type: "wallet",
    icon: "🅁",
    ticker: "USD",
    name: "Revolut USD",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 41,
  },
  {
    id: "genome_eur",
    group: "wallets",
    type: "wallet",
    icon: "🟢",
    ticker: "EUR",
    name: "Genome EUR",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 44,
  },
  {
    id: "paypal_usd",
    group: "wallets",
    type: "wallet",
    icon: "Ⓟ",
    ticker: "USD",
    name: "PayPal USD",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 41,
  },
  {
    id: "binance_pay",
    group: "wallets",
    type: "wallet",
    icon: "🟡",
    ticker: "USDT",
    name: "Binance Pay (USDT)",
    sub: {
      uk: "Е-гаманець",
      en: "E-wallet",
      pl: "Portfel elektroniczny",
    },
    priceUah: 40,
  },
];

const GROUP_TITLES = {
  uk: {
    crypto: "Криптовалюта",
    ua_banks: "Банки — UAH",
    wallets: "Е-гаманці",
  },
  en: {
    crypto: "Crypto",
    ua_banks: "Banks — UAH",
    wallets: "E-wallets",
  },
  pl: {
    crypto: "Kryptowaluty",
    ua_banks: "Banki — UAH",
    wallets: "E-portfele",
  },
};

let fromAsset = ASSETS.find((a) => a.id === "btc");
let toAsset = ASSETS.find((a) => a.id === "mono");
let feePercent = 2.5;
let currentPickerTarget = "from";
let amountFrom = 0;

/* ===================== DOM ===================== */

const screens = {
  main: document.getElementById("screen-main"),
  details: document.getElementById("screen-details"),
  rules: document.getElementById("screen-rules"),
  aml: document.getElementById("screen-aml"),
  faq: document.getElementById("screen-faq"),
  contacts: document.getElementById("screen-contacts"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("screen--active"));
  screens[name].classList.add("screen--active");
}

function setActiveMenu(screen) {
  document
    .querySelectorAll(".side-link")
    .forEach((b) => b.classList.remove("side-link--active"));
  const btn = document.querySelector(`.side-link[data-screen="${screen}"]`);
  if (btn) btn.classList.add("side-link--active");
}

/* ===================== HEADER / MENU ===================== */

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const sideMenuClose = document.getElementById("side-menu-close");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "flex";
});
sideMenuClose.addEventListener("click", () => {
  sideMenu.style.display = "none";
});
sideMenu.addEventListener("click", (e) => {
  if (e.target === sideMenu) sideMenu.style.display = "none";
});

document.querySelectorAll(".side-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const screen = btn.dataset.screen;
    sideMenu.style.display = "none";
    setActiveMenu(screen);
    showScreen(screen);
  });
});

/* ===================== AMOUNTS & ПЕРЕСЧЕТ ===================== */

const amountFromInput = document.getElementById("amount-from");
const amountToInput = document.getElementById("amount-to");

amountFromInput.addEventListener("input", () => {
  amountFrom = parseFloat(amountFromInput.value || "0");
  recalc();
});

function getRate(from, to) {
  if (!from || !to) return 0;
  return from.priceUah / to.priceUah;
}

function recalc() {
  const rate = getRate(fromAsset, toAsset);
  const rawTo = amountFrom * rate;
  const fee = (rawTo * feePercent) / 100;
  const payout = rawTo - fee;

  const fromTicker = fromAsset?.ticker || "";
  const toTicker = toAsset?.ticker || "";

  document.getElementById(
    "pair-text"
  ).textContent = `${fromAsset.name} → ${toAsset.name}`;

  document.getElementById(
    "rate-text"
  ).textContent = `1 ${fromTicker} ≈ ${rate.toFixed(2)} ${toTicker}`;
  document.getElementById("fee-text").textContent = `${feePercent.toFixed(1)}%`;
  document.getElementById(
    "payout-text"
  ).textContent = payout > 0 ? `${payout.toFixed(2)} ${toTicker}` : "—";

  amountToInput.value = payout > 0 ? payout.toFixed(2) : "";
}

/* ===================== ОБНОВЛЕНИЕ ТЕКСТОВ ПОД АКТИВЫ ===================== */

function updateAssetTexts() {
  // from
  if (fromAsset) {
    document.getElementById("from-asset-icon").textContent = fromAsset.icon;
    document.getElementById("from-asset-name").textContent = fromAsset.name;
    document.getElementById("from-asset-sub").textContent =
      fromAsset.sub[currentLang] || fromAsset.sub.uk;
    document.getElementById("from-asset-ticker").textContent =
      fromAsset.ticker;
    document.getElementById(
      "amount-range-text"
    ).textContent = `від ${fromAsset.min} до ${fromAsset.max} ${fromAsset.ticker}`;
  }

  // to
  if (toAsset) {
    document.getElementById("to-asset-icon").textContent = toAsset.icon;
    document.getElementById("to-asset-name").textContent = toAsset.name;
    document.getElementById("to-asset-sub").textContent =
      toAsset.sub[currentLang] || toAsset.sub.uk;
    document.getElementById("to-asset-ticker").textContent = toAsset.ticker;
  }

  recalc();
}

/* ===================== PICKER ===================== */

const pickerOverlay = document.getElementById("picker");
const pickerTitle = document.getElementById("picker-title");
const pickerClose = document.getElementById("picker-close");
const pickerList = document.getElementById("picker-list");
const pickerSearch = document.getElementById("picker-search");

document.getElementById("from-asset-btn").addEventListener("click", () => {
  currentPickerTarget = "from";
  openPicker();
});

document.getElementById("to-asset-btn").addEventListener("click", () => {
  currentPickerTarget = "to";
  openPicker();
});

pickerClose.addEventListener("click", () => (pickerOverlay.style.display = "none"));
pickerOverlay.addEventListener("click", (e) => {
  if (e.target === pickerOverlay) pickerOverlay.style.display = "none";
});

pickerSearch.addEventListener("input", () => {
  renderPicker(pickerSearch.value.trim().toLowerCase());
});

function openPicker() {
  const dict = translations[currentLang];
  pickerTitle.textContent =
    currentPickerTarget === "from"
      ? dict.from_block_title
      : dict.to_block_title;
  pickerSearch.value = "";
  renderPicker();
  pickerOverlay.style.display = "flex";
}

function renderPicker(search = "") {
  pickerList.innerHTML = "";
  const groups = {};

  ASSETS.forEach((a) => {
    // для "отдаёте" только крипта, для "получаете" всё кроме крипты? (банки + кошельки)
    if (currentPickerTarget === "from" && a.type !== "crypto") return;
    if (currentPickerTarget === "to" && a.type === "crypto") return;

    if (!groups[a.group]) groups[a.group] = [];
    groups[a.group].push(a);
  });

  Object.keys(groups).forEach((g) => {
    const filtered = groups[g].filter((a) => {
      if (!search) return true;
      const n = a.name.toLowerCase();
      const s =
        a.sub[currentLang]?.toLowerCase() || a.sub.uk.toLowerCase();
      return n.includes(search) || s.includes(search);
    });

    if (!filtered.length) return;

    const title = document.createElement("div");
    title.className = "picker-group-title";
    title.textContent = GROUP_TITLES[currentLang][g] || g;
    pickerList.appendChild(title);

    filtered.forEach((a) => {
      const item = document.createElement("div");
      item.className = "picker-item";
      item.addEventListener("click", () => {
        if (currentPickerTarget === "from") fromAsset = a;
        else toAsset = a;
        updateAssetTexts();
        pickerOverlay.style.display = "none";
      });

      const main = document.createElement("div");
      main.className = "picker-item-main";

      const icon = document.createElement("div");
      icon.className = "picker-item-icon";
      icon.textContent = a.icon;

      const textWrap = document.createElement("div");
      const nameEl = document.createElement("div");
      nameEl.className = "picker-item-name";
      nameEl.textContent = a.name;

      const subEl = document.createElement("div");
      subEl.className = "picker-item-sub";
      subEl.textContent = a.sub[currentLang] || a.sub.uk;

      textWrap.appendChild(nameEl);
      textWrap.appendChild(subEl);

      main.appendChild(icon);
      main.appendChild(textWrap);

      const arrow = document.createElement("div");
      arrow.textContent = "›";

      item.appendChild(main);
      item.appendChild(arrow);

      pickerList.appendChild(item);
    });
  });
}

/* ===================== DETAILS / ВАЛИДАЦИЯ ===================== */

const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("toast--visible");
  setTimeout(() => toast.classList.remove("toast--visible"), 2200);
}

function validateMain() {
  if (!amountFrom || amountFrom <= 0) {
    showToast(
      currentLang === "uk"
        ? "Вкажіть суму"
        : currentLang === "en"
        ? "Enter amount"
        : "Podaj kwotę"
    );
    return false;
  }
  if (fromAsset.type !== "crypto") {
    showToast(
      currentLang === "uk"
        ? "Зараз віддаємо лише криптовалюту 🙂"
        : currentLang === "en"
        ? "For now you can only give crypto 🙂"
        : "Na razie oddajemy tylko krypto 🙂"
    );
    return false;
  }
  return true;
}

document.getElementById("btn-next-details").addEventListener("click", () => {
  if (!validateMain()) return;
  fillSummary();
  showScreen("details");
});

document.getElementById("btn-back-main").addEventListener("click", () => {
  showScreen("main");
});

function fillSummary() {
  const rate = getRate(fromAsset, toAsset);
  const rawTo = amountFrom * rate;
  const fee = (rawTo * feePercent) / 100;
  const payout = rawTo - fee;

  const ft = fromAsset.ticker;
  const tt = toAsset.ticker;

  document.getElementById(
    "summary-from"
  ).textContent = `${amountFrom.toFixed(4)} ${ft}`;
  document.getElementById(
    "summary-to"
  ).textContent = `${payout.toFixed(2)} ${tt}`;
  document.getElementById(
    "summary-rate"
  ).textContent = `1 ${ft} ≈ ${rate.toFixed(2)} ${tt} | fee ${feePercent.toFixed(
    1
  )}%`;
}

/* ===================== SUBMIT / SEND DATA ===================== */

document.getElementById("btn-submit").addEventListener("click", () => {
  const recipient = document.getElementById("field-recipient").value.trim();
  const name = document.getElementById("field-name").value.trim();
  const comment = document.getElementById("field-comment").value.trim();

  if (!recipient) {
    showToast(
      currentLang === "uk"
        ? "Вкажіть реквізити"
        : currentLang === "en"
        ? "Enter recipient"
        : "Podaj dane odbiorcy"
    );
    return;
  }
  if (!name) {
    showToast(
      currentLang === "uk"
        ? "Вкажіть імʼя"
        : currentLang === "en"
        ? "Enter name"
        : "Podaj imię"
    );
    return;
  }

  const rate = getRate(fromAsset, toAsset);
  const rawTo = amountFrom * rate;
  const fee = (rawTo * feePercent) / 100;
  const payout = rawTo - fee;

  const payload = {
    type: "keksswap_order",
    lang: currentLang,
    user: tg && tg.initDataUnsafe ? tg.initDataUnsafe.user : null,
    from: {
      assetId: fromAsset.id,
      assetName: fromAsset.name,
      amount: amountFrom,
    },
    to: {
      assetId: toAsset.id,
      assetName: toAsset.name,
      payout,
    },
    rate,
    feePercent,
    feeAmount: fee,
    recipient,
    name,
    comment,
    createdAt: new Date().toISOString(),
  };

  try {
    if (tg) {
      tg.sendData(JSON.stringify(payload));
      tg.close();
    } else {
      console.log("Order payload:", payload);
      alert("Demo mode: дивись консоль.");
    }
  } catch (e) {
    console.error(e);
    showToast(
      currentLang === "uk"
        ? "Помилка відправки"
        : currentLang === "en"
        ? "Send error"
        : "Błąd wysyłania"
    );
  }
});

/* ===================== INIT ===================== */

applyTranslations();
updateAssetTexts();
renderPicker();
setActiveMenu("main");
showScreen("main");
