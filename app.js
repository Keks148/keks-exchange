// Инициализация Telegram WebApp
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
  tg.expand();
}

// ===== ЛОКАЛИЗАЦИЯ =====
const translations = {
  uk: {
    welcome_title: "Обмін криптовалюти на гривню",
    welcome_sub:
      "Швидкий та безпечний обмін крипти на банки України та електронні гаманці.",
    aml_note_short: "Усі заявки проходять обовʼязкову AML-перевірку.",
    aml_note_long:
      "Створюючи заявку, ви погоджуєтесь з правилами сервісу та AML/KYC політикою. У разі виявлення підозрілої активності виплата може бути призупинена до завершення перевірки.",
    btn_start: "Почати обмін",
    btn_next: "Продовжити",
    btn_back: "Назад",
    btn_submit: "Створити заявку",
    exchange_title: "Налаштуй обмін",
    details_title: "Дані для заявки",
    from_label: "Віддаєш",
    to_label: "Отримуєш",
    amount_from: "Сума, що віддаєш",
    amount_to: "Орієнтовно отримаєш",
    rate_label: "Курс",
    fee_label: "Комісія сервісу",
    total_label: "До виплати клієнту",
    field_recipient: "Реквізити для зарахування (номер картки / IBAN / гаманець)",
    field_name: "Ваше імʼя",
    field_comment: "Коментар (необовʼязково)",
    summary_from: "Віддаєш",
    summary_to: "Отримуєш",
    summary_rate: "Курс + комісія",
    picker_from: "Вибір активу (віддаєш)",
    picker_to: "Вибір активу (отримуєш)",
  },
  en: {
    welcome_title: "Exchange crypto to UAH",
    welcome_sub:
      "Fast and secure crypto exchange to Ukrainian banks and e-wallets.",
    aml_note_short: "All requests pass mandatory AML checks.",
    aml_note_long:
      "By creating a request, you agree with the service rules and AML/KYC policy. In case of suspicious activity the payout may be delayed.",
    btn_start: "Start exchange",
    btn_next: "Continue",
    btn_back: "Back",
    btn_submit: "Create request",
    exchange_title: "Set up exchange",
    details_title: "Request details",
    from_label: "You give",
    to_label: "You receive",
    amount_from: "Amount you give",
    amount_to: "Estimated you receive",
    rate_label: "Rate",
    fee_label: "Service fee",
    total_label: "Payout to client",
    field_recipient: "Recipient details (card / IBAN / wallet)",
    field_name: "Your name",
    field_comment: "Comment (optional)",
    summary_from: "You give",
    summary_to: "You receive",
    summary_rate: "Rate + fee",
    picker_from: "Choose asset (you give)",
    picker_to: "Choose asset (you receive)",
  },
  pl: {
    welcome_title: "Wymiana kryptowaluty na hrywny",
    welcome_sub:
      "Szybka i bezpieczna wymiana krypto na banki Ukrainy i e-portfele.",
    aml_note_short: "Wszystkie zlecenia przechodzą obowiązkową kontrolę AML.",
    aml_note_long:
      "Tworząc zlecenie, akceptujesz regulamin i politykę AML/KYC. W przypadku podejrzanej aktywności wypłata może zostać wstrzymana do końca weryfikacji.",
    btn_start: "Rozpocznij wymianę",
    btn_next: "Kontynuuj",
    btn_back: "Wstecz",
    btn_submit: "Utwórz zlecenie",
    exchange_title: "Ustaw wymianę",
    details_title: "Dane zlecenia",
    from_label: "Oddajesz",
    to_label: "Otrzymujesz",
    amount_from: "Kwota, którą oddajesz",
    amount_to: "Szacunkowo otrzymasz",
    rate_label: "Kurs",
    fee_label: "Prowizja serwisu",
    total_label: "Do wypłaty klientowi",
    field_recipient:
      "Dane odbiorcy (numer karty / IBAN / portfel)",
    field_name: "Twoje imię",
    field_comment: "Komentarz (opcjonalnie)",
    summary_from: "Oddajesz",
    summary_to: "Otrzymujesz",
    summary_rate: "Kurs + prowizja",
    picker_from: "Wybór aktywa (oddajesz)",
    picker_to: "Wybór aktywa (otrzymujesz)",
  },
};

let currentLang = "uk";

function applyTranslations() {
  const dict = translations[currentLang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  // placeholder search
  const search = document.getElementById("asset-search");
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
    renderAssets(); // чтобы подписи групп обновились
  });
});

// по умолчанию активируем UA
document
  .querySelector('.lang-btn[data-lang="uk"]')
  .classList.add("active");

// ===== ДАННЫЕ АКТИВОВ =====

// Простая модель: считаем все относительным к UAH
// basePriceUah = сколько UAH за 1 единицу
const ASSETS = [
  // CRYPTO
  {
    id: "btc",
    group: "crypto",
    type: "crypto",
    icon: "₿",
    name: "Bitcoin BTC",
    sub: { uk: "Криптовалюта", en: "Cryptocurrency", pl: "Kryptowaluta" },
    basePriceUah: 1500000,
  },
  {
    id: "eth",
    group: "crypto",
    type: "crypto",
    icon: "Ξ",
    name: "Ethereum ETH",
    sub: { uk: "Криптовалюта", en: "Cryptocurrency", pl: "Kryptowaluta" },
    basePriceUah: 90000,
  },
  {
    id: "usdt_trc",
    group: "crypto",
    type: "crypto",
    icon: "₮",
    name: "USDT TRC20",
    sub: { uk: "Стаблкоїн", en: "Stablecoin", pl: "Stablecoin" },
    basePriceUah: 40,
  },
  {
    id: "usdt_erc",
    group: "crypto",
    type: "crypto",
    icon: "₮",
    name: "USDT ERC20",
    sub: { uk: "Стаблкоїн", en: "Stablecoin", pl: "Stablecoin" },
    basePriceUah: 40,
  },
  {
    id: "usdc",
    group: "crypto",
    type: "crypto",
    icon: "◎",
    name: "USDC",
    sub: { uk: "Стаблкоїн", en: "Stablecoin", pl: "Stablecoin" },
    basePriceUah: 40,
  },
  {
    id: "bnb",
    group: "crypto",
    type: "crypto",
    icon: "🟡",
    name: "BNB (BEP20)",
    sub: { uk: "Криптовалюта", en: "Cryptocurrency", pl: "Kryptowaluta" },
    basePriceUah: 18000,
  },
  {
    id: "trx",
    group: "crypto",
    type: "crypto",
    icon: "⚡",
    name: "TRX",
    sub: { uk: "Криптовалюта", en: "Cryptocurrency", pl: "Kryptowaluta" },
    basePriceUah: 3.5,
  },

  // BANKS UAH
  {
    id: "mono",
    group: "ua_banks",
    type: "fiat",
    icon: "🟣",
    name: "Monobank UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },
  {
    id: "pb",
    group: "ua_banks",
    type: "fiat",
    icon: "💳",
    name: "PrivatBank UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },
  {
    id: "abank",
    group: "ua_banks",
    type: "fiat",
    icon: "🅰️",
    name: "A-Bank UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },
  {
    id: "pumb",
    group: "ua_banks",
    type: "fiat",
    icon: "🏦",
    name: "PUMB UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },
  {
    id: "oshchad",
    group: "ua_banks",
    type: "fiat",
    icon: "🏛️",
    name: "Oschadbank UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },
  {
    id: "raif",
    group: "ua_banks",
    type: "fiat",
    icon: "🟡",
    name: "Raiffeisen UAH",
    sub: { uk: "Банк України", en: "Ukrainian bank", pl: "Bank ukraiński" },
    basePriceUah: 1,
  },

  // E-WALLETS
  {
    id: "wise_eur",
    group: "wallets",
    type: "wallet",
    icon: "🟦",
    name: "Wise EUR",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 44,
  },
  {
    id: "wise_usd",
    group: "wallets",
    type: "wallet",
    icon: "🟦",
    name: "Wise USD",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 41,
  },
  {
    id: "revolut_eur",
    group: "wallets",
    type: "wallet",
    icon: "🅁",
    name: "Revolut EUR",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 44,
  },
  {
    id: "revolut_usd",
    group: "wallets",
    type: "wallet",
    icon: "🅁",
    name: "Revolut USD",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 41,
  },
  {
    id: "genome_eur",
    group: "wallets",
    type: "wallet",
    icon: "🟢",
    name: "Genome EUR",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 44,
  },
  {
    id: "paypal_usd",
    group: "wallets",
    type: "wallet",
    icon: "Ⓟ",
    name: "PayPal USD",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 41,
  },
  {
    id: "binance_pay",
    group: "wallets",
    type: "wallet",
    icon: "🟡",
    name: "Binance Pay (USDT)",
    sub: { uk: "Е-гаманець", en: "E-wallet", pl: "Portfel elektroniczny" },
    basePriceUah: 40,
  },
];

// Группы для отображения
const GROUP_TITLES = {
  uk: {
    crypto: "Криптовалюта",
    ua_banks: "Банки України",
    wallets: "Е-гаманці",
  },
  en: {
    crypto: "Crypto",
    ua_banks: "Ukrainian banks",
    wallets: "E-wallets",
  },
  pl: {
    crypto: "Kryptowaluty",
    ua_banks: "Banki ukraińskie",
    wallets: "E-portfele",
  },
};

// ===== СОСТОЯНИЕ =====
let fromAsset = ASSETS.find((a) => a.id === "btc");
let toAsset = ASSETS.find((a) => a.id === "mono");
let currentPickerTarget = "from"; // 'from' | 'to'
let amountFrom = 0;
let feePercent = 2.5;

// ===== DOM =====
const screens = {
  welcome: document.getElementById("screen-welcome"),
  exchange: document.getElementById("screen-exchange"),
  details: document.getElementById("screen-details"),
};

function showScreen(key) {
  Object.values(screens).forEach((scr) =>
    scr.classList.remove("screen--active")
  );
  screens[key].classList.add("screen--active");
}

// main buttons
document.getElementById("btn-start").addEventListener("click", () => {
  showScreen("exchange");
});

document.getElementById("btn-back-welcome").addEventListener("click", () => {
  showScreen("welcome");
});

document.getElementById("btn-next-details").addEventListener("click", () => {
  if (!validateExchange()) return;
  fillSummary();
  showScreen("details");
});

document.getElementById("btn-back-exchange").addEventListener("click", () => {
  showScreen("exchange");
});

// amount change
const amountFromInput = document.getElementById("amount-from");
const amountToInput = document.getElementById("amount-to");

amountFromInput.addEventListener("input", () => {
  amountFrom = parseFloat(amountFromInput.value || "0");
  recalc();
});

// asset buttons
document.getElementById("from-asset-btn").addEventListener("click", () => {
  currentPickerTarget = "from";
  openAssetPicker();
});

document.getElementById("to-asset-btn").addEventListener("click", () => {
  currentPickerTarget = "to";
  openAssetPicker();
});

// ===== ПЕРЕСЧЁТ =====
function getRate(from, to) {
  if (!from || !to) return 0;
  // перевод через UAH: amount * from.basePriceUah / to.basePriceUah
  return from.basePriceUah / to.basePriceUah;
}

function recalc() {
  const rate = getRate(fromAsset, toAsset);
  const rawTo = amountFrom * rate;
  const fee = (rawTo * feePercent) / 100;
  const payout = rawTo - fee;

  const rateText = `1 ${fromAsset ? fromAsset.name.split(" ")[0] : ""} ≈ ${rate.toFixed(
    2
  )} ${toAsset ? toAsset.name.split(" ").slice(-1)[0] : ""}`;
  document.getElementById("rate-text").textContent = rateText;
  document.getElementById("fee-text").textContent = `${feePercent.toFixed(1)}%`;
  document.getElementById(
    "payout-text"
  ).textContent = `${payout.toFixed(2)} ${toAsset ? toAsset.name.split(" ").slice(-1)[0] : ""}`;
  amountToInput.value =
    payout > 0 ? payout.toFixed(2) : "";
}

// ===== ASSET PICKER =====
const picker = document.getElementById("asset-picker");
const pickerTitle = document.getElementById("asset-picker-title");
const pickerClose = document.getElementById("asset-picker-close");
const assetListEl = document.getElementById("asset-list");
const assetSearch = document.getElementById("asset-search");

pickerClose.addEventListener("click", closeAssetPicker);
picker.addEventListener("click", (e) => {
  if (e.target === picker) closeAssetPicker();
});

assetSearch.addEventListener("input", () => {
  renderAssets(assetSearch.value.trim().toLowerCase());
});

function openAssetPicker() {
  const dict = translations[currentLang];
  pickerTitle.textContent =
    currentPickerTarget === "from"
      ? dict.picker_from
      : dict.picker_to;

  assetSearch.value = "";
  renderAssets();
  picker.style.display = "flex";
}

function closeAssetPicker() {
  picker.style.display = "none";
}

function renderAssets(searchTerm = "") {
  if (!assetListEl) return;
  assetListEl.innerHTML = "";

  const byGroup = {};
  ASSETS.forEach((a) => {
    if (!byGroup[a.group]) byGroup[a.group] = [];
    byGroup[a.group].push(a);
  });

  Object.keys(byGroup).forEach((groupKey) => {
    const groupAssets = byGroup[groupKey].filter((a) => {
      if (!searchTerm) return true;
      const n = a.name.toLowerCase();
      const s =
        a.sub[currentLang]?.toLowerCase() ||
        a.sub.uk.toLowerCase();
      return n.includes(searchTerm) || s.includes(searchTerm);
    });

    if (!groupAssets.length) return;

    const title = document.createElement("div");
    title.className = "asset-group-title";
    title.textContent = GROUP_TITLES[currentLang][groupKey] || groupKey;
    assetListEl.appendChild(title);

    groupAssets.forEach((a) => {
      const item = document.createElement("div");
      item.className = "asset-item";
      item.addEventListener("click", () => {
        if (currentPickerTarget === "from") {
          fromAsset = a;
          updateAssetButtons();
        } else {
          toAsset = a;
          updateAssetButtons();
        }
        recalc();
        closeAssetPicker();
      });

      const main = document.createElement("div");
      main.className = "asset-item-main";

      const icon = document.createElement("div");
      icon.className = "asset-icon";
      icon.textContent = a.icon;

      const textWrap = document.createElement("div");
      const nameEl = document.createElement("div");
      nameEl.className = "asset-item-name";
      nameEl.textContent = a.name;

      const subEl = document.createElement("div");
      subEl.className = "asset-item-sub";
      subEl.textContent =
        a.sub[currentLang] || a.sub.uk;

      textWrap.appendChild(nameEl);
      textWrap.appendChild(subEl);

      main.appendChild(icon);
      main.appendChild(textWrap);

      const arrow = document.createElement("div");
      arrow.textContent = "›";

      item.appendChild(main);
      item.appendChild(arrow);

      assetListEl.appendChild(item);
    });
  });
}

function updateAssetButtons() {
  if (fromAsset) {
    document.getElementById("from-asset-icon").textContent =
      fromAsset.icon;
    document.getElementById("from-asset-name").textContent =
      fromAsset.name;
    document.getElementById("from-asset-sub").textContent =
      fromAsset.sub[currentLang] || fromAsset.sub.uk;
  }
  if (toAsset) {
    document.getElementById("to-asset-icon").textContent =
      toAsset.icon;
    document.getElementById("to-asset-name").textContent =
      toAsset.name;
    document.getElementById("to-asset-sub").textContent =
      toAsset.sub[currentLang] || toAsset.sub.uk;
  }
}

// ===== ВАЛИДАЦИЯ & САММАРИ =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("toast--visible");
  setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2200);
}

function validateExchange() {
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
  if (!fromAsset || !toAsset) {
    showToast(
      currentLang === "uk"
        ? "Оберіть активи для обміну"
        : currentLang === "en"
        ? "Choose assets"
        : "Wybierz aktywa"
    );
    return false;
  }
  if (fromAsset.type === "fiat") {
    showToast(
      currentLang === "uk"
        ? "Поки що віддаємо лише криптовалюту 🙂"
        : currentLang === "en"
        ? "For now you can only give crypto 🙂"
        : "Na razie oddajemy tylko krypto 🙂"
    );
    return false;
  }
  return true;
}

function fillSummary() {
  const rate = getRate(fromAsset, toAsset);
  const rawTo = amountFrom * rate;
  const fee = (rawTo * feePercent) / 100;
  const payout = rawTo - fee;

  const fromAssetTicker = fromAsset.name.split(" ")[1] || "";
  const toAssetTicker = toAsset.name.split(" ").slice(-1)[0] || "";

  document.getElementById(
    "summary-from"
  ).textContent = `${amountFrom.toFixed(4)} ${fromAssetTicker}`;
  document.getElementById(
    "summary-to"
  ).textContent = `${payout.toFixed(2)} ${toAssetTicker}`;
  document.getElementById(
    "summary-rate"
  ).textContent = `1 ${fromAssetTicker} ≈ ${rate.toFixed(
    2
  )} ${toAssetTicker} | fee ${feePercent.toFixed(1)}%`;
}

// ===== ОТПРАВКА ЗАЯВКИ В TELEGRAM =====
document.getElementById("btn-submit").addEventListener("click", () => {
  const recipient = document.getElementById("field-recipient").value.trim();
  const name = document.getElementById("field-name").value.trim();
  const comment = document.getElementById("field-comment").value.trim();

  if (!recipient) {
    showToast(
      currentLang === "uk"
        ? "Вкажіть реквізити отримувача"
        : currentLang === "en"
        ? "Enter recipient details"
        : "Podaj dane odbiorcy"
    );
    return;
  }
  if (!name) {
    showToast(
      currentLang === "uk"
        ? "Вкажіть імʼя"
        : currentLang === "en"
        ? "Enter your name"
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
      tg.close(); // закрываем мини-апп, бот получит заявку
    } else {
      console.log("Order payload:", payload);
      alert("Demo mode: заявка виведена в консоль.");
    }
  } catch (e) {
    console.error(e);
    showToast(
      currentLang === "uk"
        ? "Помилка відправки. Спробуйте ще раз."
        : currentLang === "en"
        ? "Send error. Try again."
        : "Błąd wysyłania. Spróbuj ponownie."
    );
  }
});

// ===== СТАРТ =====
updateAssetButtons();
recalc();
applyTranslations();
renderAssets();
