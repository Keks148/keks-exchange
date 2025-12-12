// ===== KeksSwap Exchange UI (Accordion picker like ANT) =====

const LANGS = ["uk", "en", "pl"];
let lang = "uk";

const t = (obj) => obj?.[lang] ?? obj?.uk ?? obj?.en ?? "";

const GROUPS = [
  // 1) USDT/USDC networks (under Tether icon)
  {
    id: "stable",
    title: { uk: "Tether USDT", en: "Tether USDT", pl: "Tether USDT" },
    icon: "logos/crypto/tether-usdt.png",
    items: [
      { id: "usdt-trc", name: { uk: "USDT (TRC20)", en: "USDT (TRC20)", pl: "USDT (TRC20)" }, icon: "logos/crypto/usdt-trc.png", tags: ["USDT"] },
      { id: "usdt-eth", name: { uk: "USDT (ERC20)", en: "USDT (ERC20)", pl: "USDT (ERC20)" }, icon: "logos/crypto/usdt-eth.png", tags: ["USDT"] },
      { id: "usdt-bep", name: { uk: "USDT (BEP20)", en: "USDT (BEP20)", pl: "USDT (BEP20)" }, icon: "logos/crypto/usdt-bep.png", tags: ["USDT"] },
      { id: "usdt-arb", name: { uk: "USDT (ARB)", en: "USDT (ARB)", pl: "USDT (ARB)" }, icon: "logos/crypto/usdt-arb.png", tags: ["USDT"] },
      { id: "usdt-pol", name: { uk: "USDT (POL)", en: "USDT (POL)", pl: "USDT (POL)" }, icon: "logos/crypto/usdt-pol.png", tags: ["USDT"] },
      { id: "usdt-sol", name: { uk: "USDT (SOL)", en: "USDT (SOL)", pl: "USDT (SOL)" }, icon: "logos/crypto/usdt-sol.png", tags: ["USDT"] },

      { id: "usdc-eth", name: { uk: "USDC (ETH)", en: "USDC (ETH)", pl: "USDC (ETH)" }, icon: "logos/crypto/usdc-eth.png", tags: ["USDC"] },
      { id: "usdc-pol", name: { uk: "USDC (POL)", en: "USDC (POL)", pl: "USDC (POL)" }, icon: "logos/crypto/usdc-pol.png", tags: ["USDC"] },
      { id: "usdc-sol", name: { uk: "USDC (SOL)", en: "USDC (SOL)", pl: "USDC (SOL)" }, icon: "logos/crypto/usdc-sol.png", tags: ["USDC"] },
    ],
    // how to show count near header
    countMode: "items",
  },

  // 2) Crypto branch (under BTC icon)
  {
    id: "crypto",
    title: { uk: "Криптовалюти", en: "Cryptocurrencies", pl: "Kryptowaluty" },
    icon: "logos/crypto/BTC.png",
    items: [
      { id: "btc", name: { uk: "Bitcoin BTC", en: "Bitcoin BTC", pl: "Bitcoin BTC" }, icon: "logos/crypto/BTC.png", tags: ["BTC"] },
      { id: "eth", name: { uk: "Ethereum ETH", en: "Ethereum ETH", pl: "Ethereum ETH" }, icon: "logos/crypto/eth.png", tags: ["ETH"] },
      { id: "ltc", name: { uk: "Litecoin LTC", en: "Litecoin LTC", pl: "Litecoin LTC" }, icon: "logos/crypto/ltc.png", tags: ["LTC"] },
      { id: "sol", name: { uk: "Solana SOL", en: "Solana SOL", pl: "Solana SOL" }, icon: "logos/crypto/sol.png", tags: ["SOL"] },
      { id: "trx", name: { uk: "Tron TRX", en: "Tron TRX", pl: "Tron TRX" }, icon: "logos/crypto/trx.png", tags: ["TRX"] },
      { id: "ton", name: { uk: "TON", en: "TON", pl: "TON" }, icon: "logos/crypto/ton.png", tags: ["TON"] },
    ],
    countMode: "items",
  },

  // 3) Banks UAH branch (under flag icon)
  {
    id: "banks",
    title: { uk: "Банки — UAH", en: "Banks — UAH", pl: "Banki — UAH" },
    icon: "logos/banks/ukr-banki.png",
    items: [
      { id: "mono", name: { uk: "Monobank UAH", en: "Monobank UAH", pl: "Monobank UAH" }, icon: "logos/banks/mono.png", tags: ["UAH", "bank"] },
      { id: "privat", name: { uk: "Privat24 UAH", en: "Privat24 UAH", pl: "Privat24 UAH" }, icon: "logos/banks/privat.png", tags: ["UAH", "bank"] },
      { id: "abank", name: { uk: "A-Bank UAH", en: "A-Bank UAH", pl: "A-Bank UAH" }, icon: "logos/banks/a-bank.png", tags: ["UAH", "bank"] },
      { id: "pumb", name: { uk: "PUMB UAH", en: "PUMB UAH", pl: "PUMB UAH" }, icon: "logos/banks/pumb.png", tags: ["UAH", "bank"] },
      { id: "oschad", name: { uk: "Oschadbank UAH", en: "Oschadbank UAH", pl: "Oschadbank UAH" }, icon: "logos/banks/oschad.png", tags: ["UAH", "bank"] },
      { id: "otp", name: { uk: "OTP Bank UAH", en: "OTP Bank UAH", pl: "OTP Bank UAH" }, icon: "logos/banks/otp.png", tags: ["UAH", "bank"] },
      { id: "raif", name: { uk: "Raiffeisen UAH", en: "Raiffeisen UAH", pl: "Raiffeisen UAH" }, icon: "logos/banks/reyf.png", tags: ["UAH", "bank"] },
      { id: "sense", name: { uk: "Sense Bank UAH", en: "Sense Bank UAH", pl: "Sense Bank UAH" }, icon: "logos/banks/sense.png", tags: ["UAH", "bank"] },
      { id: "izi", name: { uk: "IZI Bank UAH", en: "IZI Bank UAH", pl: "IZI Bank UAH" }, icon: "logos/banks/izi.png", tags: ["UAH", "bank"] },
      { id: "ukrsib", name: { uk: "UkrSibbank UAH", en: "UkrSibbank UAH", pl: "UkrSibbank UAH" }, icon: "logos/banks/ukr-sib.png", tags: ["UAH", "bank"] },
      { id: "visa", name: { uk: "Visa/MasterCard UAH", en: "Visa/MasterCard UAH", pl: "Visa/MasterCard UAH" }, icon: "logos/banks/visa-master.png", tags: ["UAH", "card"] },
    ],
    countMode: "items",
  },

  // 4) Wallets branch (under valet icon)
  {
    id: "wallets",
    title: { uk: "Електронні гаманці", en: "E-wallets", pl: "Portfele" },
    icon: "logos/wallets/valet.png",
    items: [
      { id: "paypal", name: { uk: "PayPal", en: "PayPal", pl: "PayPal" }, icon: "logos/wallets/paypal.png", tags: ["USD", "EUR"] },
      { id: "payoneer", name: { uk: "Payoneer", en: "Payoneer", pl: "Payoneer" }, icon: "logos/wallets/payoneer.png", tags: ["USD"] },
      { id: "revolut", name: { uk: "Revolut", en: "Revolut", pl: "Revolut" }, icon: "logos/wallets/revolut.png", tags: ["USD", "EUR"] },
      { id: "wise", name: { uk: "Wise", en: "Wise", pl: "Wise" }, icon: "logos/wallets/vise.png", tags: ["USD", "EUR"] },
    ],
    countMode: "items",
  },
];

// ---- state
let give = { amount: "", assetId: "usdt-trc" };
let get = { amount: "", assetId: "mono" };
let activePicker = null; // "give" | "get"
let expanded = new Set(["stable"]); // opened groups by default
let query = "";

// ---- helpers
const flattenItems = () =>
  GROUPS.flatMap(g => g.items.map(i => ({...i, groupId: g.id, groupTitle: g.title, groupIcon: g.icon})));

const byId = (id) => flattenItems().find(x => x.id === id);

function escapeHtml(s){return (s??"").replace(/[&<>"']/g,(c)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

function initTelegram() {
  try {
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.expand();
      Telegram.WebApp.disableVerticalSwipes?.();
      Telegram.WebApp.ready();
    }
  } catch(e) {}
}

function swapSides() {
  const tmp = give;
  give = get;
  get = tmp;
  render();
}

// ---- UI rendering
function render() {
  const giveAsset = byId(give.assetId);
  const getAsset = byId(get.assetId);

  document.getElementById("app").innerHTML = `
    <div class="topbar">
      <div class="brand">
        <img class="brandLogo" src="logos/banks/ukr-banki.png" alt="logo" onerror="this.style.display='none'"/>
        <div class="brandText">
          <div class="brandName">KeksSwap</div>
          <div class="brandSub">${escapeHtml(t({uk:"Crypto ↔ UAH", en:"Crypto ↔ UAH", pl:"Krypto ↔ UAH"}))}</div>
        </div>
      </div>

      <div class="lang">
        ${LANGS.map(l => `<button class="chip ${l===lang?'active':''}" data-lang="${l}">${l.toUpperCase()}</button>`).join("")}
      </div>

      <button class="menuBtn" id="menuBtn">☰</button>
    </div>

    <div class="notice">
      ⚠️ ${escapeHtml(t({uk:"Заявки після 22:00 обробляються з 08:00 (UTC+2).", en:"Orders after 22:00 are processed from 08:00 (UTC+2).", pl:"Zlecenia po 22:00 są realizowane od 08:00 (UTC+2)."}))}
    </div>

    <div class="card">
      <div class="sectionTitle">${escapeHtml(t({uk:"Віддаєте", en:"You send", pl:"Wysyłasz"}))}</div>
      <div class="row">
        <input class="amount" inputmode="decimal" placeholder="0.0000" value="${escapeHtml(give.amount)}" id="giveAmount"/>
        <button class="assetBtn" id="givePick">
          <img class="icon" src="${escapeHtml(giveAsset?.icon||"")}" onerror="this.style.display='none'"/>
          <span>${escapeHtml(t(giveAsset?.name)||"—")}</span>
          <span class="chev">▾</span>
        </button>
      </div>

      <div class="swapRow">
        <button class="swapBtn" id="swapBtn">⇄</button>
      </div>

      <div class="sectionTitle">${escapeHtml(t({uk:"Отримуєте", en:"You get", pl:"Otrzymujesz"}))}</div>
      <div class="row">
        <input class="amount" inputmode="decimal" placeholder="0.0000" value="${escapeHtml(get.amount)}" id="getAmount"/>
        <button class="assetBtn" id="getPick">
          <img class="icon" src="${escapeHtml(getAsset?.icon||"")}" onerror="this.style.display='none'"/>
          <span>${escapeHtml(t(getAsset?.name)||"—")}</span>
          <span class="chev">▾</span>
        </button>
      </div>

      <button class="primary">${escapeHtml(t({uk:"Продовжити", en:"Continue", pl:"Kontynuuj"}))}</button>
    </div>

    ${activePicker ? renderPicker() : ""}
  `;

  // events
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.onclick = () => { lang = btn.dataset.lang; render(); };
  });

  document.getElementById("givePick").onclick = () => { activePicker = "give"; query=""; render(); };
  document.getElementById("getPick").onclick = () => { activePicker = "get"; query=""; render(); };

  document.getElementById("swapBtn").onclick = swapSides;

  document.getElementById("giveAmount").oninput = (e) => { give.amount = e.target.value; };
  document.getElementById("getAmount").oninput = (e) => { get.amount = e.target.value; };

  // picker events (if open)
  if (activePicker) {
    document.getElementById("pickerClose").onclick = () => { activePicker = null; render(); };
    document.getElementById("pickerBackdrop").onclick = () => { activePicker = null; render(); };
    document.getElementById("pickerSearch").oninput = (e) => { query = e.target.value; updatePickerList(); };

    document.querySelectorAll("[data-group]").forEach(el => {
      el.onclick = () => {
        const id = el.dataset.group;
        if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
        updatePickerList();
      };
    });

    // initial list
    updatePickerList();
  }
}

function renderPicker() {
  return `
    <div class="pickerBackdrop" id="pickerBackdrop"></div>
    <div class="pickerSheet" role="dialog" aria-modal="true">
      <div class="pickerHeader">
        <div class="pickerTitle">${escapeHtml(activePicker==="give" ? t({uk:"Віддаєте",en:"You send",pl:"Wysyłasz"}) : t({uk:"Отримуєте",en:"You get",pl:"Otrzymujesz"}))}</div>
        <button class="iconBtn" id="pickerClose">✕</button>
      </div>

      <div class="pickerSearchWrap">
        <input class="pickerSearch" id="pickerSearch" placeholder="${escapeHtml(t({uk:"Пошук…", en:"Search…", pl:"Szukaj…"}))}" value="${escapeHtml(query)}"/>
      </div>

      <div class="pickerList" id="pickerList"></div>
    </div>
  `;
}

function updatePickerList() {
  const q = (query||"").trim().toLowerCase();

  // build group blocks
  let html = "";
  for (const g of GROUPS) {
    const items = g.items.filter(i => {
      if (!q) return true;
      const name = (t(i.name)||"").toLowerCase();
      const tags = (i.tags||[]).join(" ").toLowerCase();
      return name.includes(q) || tags.includes(q) || i.id.includes(q);
    });

    // if search active and group has no matches: hide
    if (q && items.length === 0) continue;

    const isOpen = expanded.has(g.id) || q; // auto-open during search
    const count = items.length;

    html += `
      <div class="group">
        <button class="groupHead" data-group="${g.id}">
          <div class="groupLeft">
            <img class="icon" src="${escapeHtml(g.icon||"")}" onerror="this.style.display='none'"/>
            <span class="groupName">${escapeHtml(t(g.title))}</span>
            <span class="badge">${count}</span>
          </div>
          <span class="chev">${isOpen ? "▴" : "▾"}</span>
        </button>

        ${isOpen ? `
          <div class="groupItems">
            ${items.map(i => `
              <button class="item" data-item="${escapeHtml(i.id)}">
                <div class="itemLeft">
                  <img class="icon" src="${escapeHtml(i.icon||"")}" onerror="this.style.display='none'"/>
                  <div class="itemText">
                    <div class="itemName">${escapeHtml(t(i.name))}</div>
                    <div class="itemSub">${escapeHtml(t({uk:"Варіант", en:"Option", pl:"Opcja"}))}</div>
                  </div>
                </div>
                <span class="chev">›</span>
              </button>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }

  const list = document.getElementById("pickerList");
  list.innerHTML = html;

  // bind item click
  list.querySelectorAll("[data-item]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.item;
      if (activePicker === "give") give.assetId = id;
      else get.assetId = id;
      activePicker = null;
      render();
    };
  });
}

// ---- start
initTelegram();
render();
