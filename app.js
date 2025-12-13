// ---------- DATA ----------
const ASSETS = {
  banks: [
    { id:"monobank", name:"Monobank", code:"UAH", icon:"logos/banks/monobank.png" },
    { id:"privat", name:"PrivatBank", code:"UAH", icon:"logos/banks/privat.png" },
    { id:"oschad", name:"Oschadbank", code:"UAH", icon:"logos/banks/oschadbank.png" }
  ],
  crypto: [
    { id:"btc", name:"Bitcoin", code:"BTC", icon:"logos/crypto/btc.png" },
    { id:"eth", name:"Ethereum", code:"ETH", icon:"logos/crypto/eth.png" },
    { id:"usdt", name:"Tether", code:"USDT", icon:"logos/crypto/usdt.png" }
  ]
};

const I18N = {
  UA: {
    menu: { swap:"Обмін", rules:"Правила", faq:"FAQ", contacts:"Контакти", account:"Акаунт" },
    give:"Віддаєте",
    get:"Отримуєте",
    ratePrefix:"Курс:",
    submit:"Створити заявку",
    pickerGive:"Вибір (віддаєте)",
    pickerGet:"Вибір (отримуєте)",
    search:"Пошук..."
  },
  EN: {
    menu: { swap:"Exchange", rules:"Rules", faq:"FAQ", contacts:"Contacts", account:"Account" },
    give:"You send",
    get:"You get",
    ratePrefix:"Rate:",
    submit:"Create request",
    pickerGive:"Select (send)",
    pickerGet:"Select (get)",
    search:"Search..."
  },
  PL: {
    menu: { swap:"Wymiana", rules:"Zasady", faq:"FAQ", contacts:"Kontakty", account:"Konto" },
    give:"Oddajesz",
    get:"Otrzymujesz",
    ratePrefix:"Kurs:",
    submit:"Utwórz zgłoszenie",
    pickerGive:"Wybór (oddajesz)",
    pickerGet:"Wybór (otrzymujesz)",
    search:"Szukaj..."
  }
};

// ---------- STATE ----------
let lang = "UA";
let give = ASSETS.banks[0];
let get = ASSETS.crypto[0];

// ---------- DOM ----------
const pages = {
  swap: document.getElementById("page-swap"),
  rules: document.getElementById("page-rules"),
  faq: document.getElementById("page-faq"),
  contacts: document.getElementById("page-contacts"),
  account: document.getElementById("page-account"),
};

const menuBtns = [...document.querySelectorAll(".menu-btn")];

const giveSelect = document.getElementById("giveSelect");
const getSelect = document.getElementById("getSelect");

const giveIcon = document.getElementById("giveIcon");
const giveName = document.getElementById("giveName");
const giveCode = document.getElementById("giveCode");

const getIcon = document.getElementById("getIcon");
const getName = document.getElementById("getName");
const getCode = document.getElementById("getCode");

const giveAmount = document.getElementById("giveAmount");
const getAmount = document.getElementById("getAmount");
const swapBtn = document.getElementById("swapBtn");

const rateText = document.getElementById("rateText");
const submitBtn = document.getElementById("submitBtn");

const labels = [...document.querySelectorAll(".label")];
const pageTitle = document.querySelector("#page-swap .page-title");

const pills = [...document.querySelectorAll(".pill")];

const pickerModal = document.getElementById("pickerModal");
const pickerTitle = document.getElementById("pickerTitle");
const pickerClose = document.getElementById("pickerClose");
const pickerBackdrop = document.getElementById("pickerBackdrop");
const pickerSearch = document.getElementById("pickerSearch");
const pickerList = document.getElementById("pickerList");

let pickerMode = "give"; // give | get

// ---------- HELPERS ----------
function showPage(key){
  Object.keys(pages).forEach(k => pages[k].classList.toggle("hidden", k !== key));
  menuBtns.forEach(b => b.classList.toggle("active", b.dataset.page === key));
}

function applyLang(){
  const t = I18N[lang];

  // menu
  menuBtns.forEach(b=>{
    const k = b.dataset.page;
    b.textContent = t.menu[k] ?? b.textContent;
  });

  // labels and buttons
  labels[0].textContent = t.give;
  labels[1].textContent = t.get;

  pageTitle.textContent = t.menu.swap; // заголовок страницы обмен
  submitBtn.textContent = t.submit;

  pickerSearch.placeholder = t.search;

  // rate prefix
  updateRate();
}

function updateUI(){
  // apply selected assets
  giveIcon.src = give.icon;
  giveName.textContent = give.name;
  giveCode.textContent = give.code;

  getIcon.src = get.icon;
  getName.textContent = get.name;
  getCode.textContent = get.code;

  updateRate();
}

function updateRate(){
  // заглушка (потом подключим реальные курсы)
  // сейчас просто показывает красивый текст
  const t = I18N[lang];
  rateText.textContent = `${t.ratePrefix} 1 ${give.code} ≈ 0.0000000625 ${get.code}`;
}

function openPicker(mode){
  pickerMode = mode;
  const t = I18N[lang];
  pickerTitle.textContent = mode === "give" ? t.pickerGive : t.pickerGet;
  pickerSearch.value = "";
  renderPickerList();
  pickerModal.classList.remove("hidden");
}

function closePicker(){
  pickerModal.classList.add("hidden");
}

function renderPickerList(){
  const q = pickerSearch.value.trim().toLowerCase();
  const items = pickerMode === "give" ? ASSETS.banks : ASSETS.crypto;

  const filtered = items.filter(a =>
    a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)
  );

  pickerList.innerHTML = filtered.map(a => `
    <button class="item" data-id="${a.id}">
      <img class="asset-icon" src="${a.icon}" alt="">
      <div>
        <div class="item-title">${a.name}</div>
        <div class="item-sub">${a.code}</div>
      </div>
    </button>
  `).join("");

  // attach
  [...pickerList.querySelectorAll(".item")].forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.id;
      const list = (pickerMode === "give" ? ASSETS.banks : ASSETS.crypto);
      const selected = list.find(x => x.id === id);
      if(!selected) return;

      if(pickerMode === "give") give = selected;
      else get = selected;

      updateUI();
      closePicker();
    });
  });
}

// ---------- EVENTS ----------

// menu
menuBtns.forEach(b => b.addEventListener("click", ()=> showPage(b.dataset.page)));

// language pills
pills.forEach(p=>{
  p.addEventListener("click", ()=>{
    pills.forEach(x=>x.classList.remove("active"));
    p.classList.add("active");
    lang = p.dataset.lang;
    applyLang();
  });
});

// selects -> open picker
giveSelect.addEventListener("click", ()=> openPicker("give"));
getSelect.addEventListener("click", ()=> openPicker("get"));

// picker close
pickerClose.addEventListener("click", closePicker);
pickerBackdrop.addEventListener("click", closePicker);
pickerSearch.addEventListener("input", renderPickerList);

// swap button
swapBtn.addEventListener("click", ()=>{
  const tmp = give;
  // swap type allowed? здесь просто меняем местами выбранные элементы
  // но чтобы не ставить крипту в "банки", делаем swap только значений сум
  const ga = giveAmount.value;
  giveAmount.value = getAmount.value;
  getAmount.value = ga;
});

// submit
submitBtn.addEventListener("click", ()=>{
  alert("Заявку створено (демо).");
});

// ---------- INIT ----------
showPage("swap");
applyLang();
updateUI();
