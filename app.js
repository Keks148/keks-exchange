// Pages
const menuBtns = document.querySelectorAll(".menu-btn");
const pages = {
  exchange: document.getElementById("page-exchange"),
  rules: document.getElementById("page-rules"),
  reviews: document.getElementById("page-reviews"),
  account: document.getElementById("page-account"),
};

menuBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    menuBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    Object.values(pages).forEach(p => p.classList.remove("active"));
    pages[btn.dataset.page].classList.add("active");
  });
});

// Modal
const modalBg = document.getElementById("modalBg");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const openGive = document.getElementById("openGive");
const openGet = document.getElementById("openGet");
const modalTitle = document.getElementById("modalTitle");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");

let currentTarget = "give"; // "give" | "get"
let currentFilter = "all";
let query = "";

// Demo data (заменишь на свои реальные массивы)
const items = [
  { group: "banks", name: "Monobank", sub: "UAH", icon: "./logos/crypto/btc.png" },
  { group: "top", name: "Bitcoin", sub: "BTC", icon: "./logos/crypto/btc.png" },
  { group: "usdt", name: "Tether", sub: "USDT (ERC20)", icon: "./logos/crypto/btc.png" },
  { group: "usdc", name: "USD Coin", sub: "USDC (ERC20)", icon: "./logos/crypto/btc.png" },
];

function showModal(title, target){
  currentTarget = target;
  modalTitle.textContent = title;

  modalBg.classList.add("show");
  modalBg.setAttribute("aria-hidden", "false");

  // сброс поиска
  searchInput.value = "";
  query = "";

  // фокус не обязателен, но удобно
  setTimeout(() => searchInput.focus(), 50);

  renderList();
}

function hideModal(){
  modalBg.classList.remove("show");
  modalBg.setAttribute("aria-hidden", "true");
}

openGive.addEventListener("click", () => showModal("Вибір (Віддаєте)", "give"));
openGet.addEventListener("click", () => showModal("Вибір (Отримуєте)", "get"));

closeModalBtn.addEventListener("click", hideModal);

// ВАЖНО: закрытие по клику на затемнение (backdrop)
modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) hideModal();
});

// чтобы клики внутри модалки не закрывали её
modal.addEventListener("click", (e) => e.stopPropagation());

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  renderList();
});

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;

  document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  currentFilter = btn.dataset.filter;
  renderList();
});

function match(item){
  const qOk = !query || (item.name + " " + item.sub).toLowerCase().includes(query);
  const fOk = currentFilter === "all" || item.group === currentFilter;
  return qOk && fOk;
}

function renderList(){
  list.innerHTML = "";

  const filtered = items.filter(match);
  if (!filtered.length){
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = "Нічого не знайдено";
    list.appendChild(div);
    return;
  }

  filtered.forEach(it => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<strong>${it.name}</strong> · <span style="color:#64748b">${it.sub}</span>`;
    div.addEventListener("click", () => {
      if (currentTarget === "give") {
        document.getElementById("giveName").textContent = it.name;
        document.getElementById("giveSub").textContent = it.sub;
      } else {
        document.getElementById("getName").textContent = it.name;
        document.getElementById("getSub").textContent = it.sub;
      }
      hideModal();
    });
    list.appendChild(div);
  });
}

// Swap logic
const swapBtn = document.getElementById("swapBtn");
swapBtn.addEventListener("click", () => {
  // меняем местами названия/сабы (суммы не трогаю — ты можешь потом добавить пересчёт)
  const giveName = document.getElementById("giveName");
  const giveSub = document.getElementById("giveSub");
  const getName = document.getElementById("getName");
  const getSub = document.getElementById("getSub");

  const tmpN = giveName.textContent;
  const tmpS = giveSub.textContent;
  giveName.textContent = getName.textContent;
  giveSub.textContent = getSub.textContent;
  getName.textContent = tmpN;
  getSub.textContent = tmpS;
});
