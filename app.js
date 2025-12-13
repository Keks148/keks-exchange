/* KeksSwap — variant 2
   - No modal windows
   - One unified list: Banks + Crypto + Wallets in ONE dropdown
   - Fix “not clickable” by avoiding full-screen overlays
   - Correct asset paths:
     logo:   logos/keks-logo.png
     banks:  logos/banks/*.png
     crypto: logos/crypto/*.png
     wallets:logos/wallets/*.png
*/

const $ = (sel, el=document) => el.querySelector(sel);

const LANGS = [
  { id: "ua", label: "UA" },
  { id: "en", label: "EN" },
  { id: "pl", label: "PL" },
];

const ITEMS = [
  // BANKS
  { id:"mono", type:"bank", label:"Monobank", code:"UAH", icon:"logos/banks/mono.png" },
  { id:"privat", type:"bank", label:"PrivatBank", code:"UAH", icon:"logos/banks/privat.png" },
  { id:"oschad", type:"bank", label:"Oschadbank", code:"UAH", icon:"logos/banks/oschad.png" },
  { id:"pumb", type:"bank", label:"PUMB", code:"UAH", icon:"logos/banks/pumb.png" },
  { id:"a-bank", type:"bank", label:"A-Bank", code:"UAH", icon:"logos/banks/a-bank.png" },
  { id:"izi", type:"bank", label:"iZi Bank", code:"UAH", icon:"logos/banks/izi.png" },
  { id:"otp", type:"bank", label:"OTP Bank", code:"UAH", icon:"logos/banks/otp.png" },
  { id:"sense", type:"bank", label:"Sense Bank", code:"UAH", icon:"logos/banks/sense.png" },
  { id:"reif", type:"bank", label:"Raiffeisen", code:"UAH", icon:"logos/banks/reyf.png" },
  { id:"ukr-sib", type:"bank", label:"UkrSibbank", code:"UAH", icon:"logos/banks/ukr-sib.png" },
  { id:"ukr-banki", type:"bank", label:"Ukrbanki", code:"UAH", icon:"logos/banks/ukr-banki.png" },
  { id:"visa-master", type:"bank", label:"Visa / MasterCard", code:"UAH", icon:"logos/banks/visa-master.png" },

  // CRYPTO
  { id:"btc", type:"crypto", label:"Bitcoin", code:"BTC", icon:"logos/crypto/btc.png" },
  { id:"eth", type:"crypto", label:"Ethereum", code:"ETH", icon:"logos/crypto/eth.png" },
  { id:"ltc", type:"crypto", label:"Litecoin", code:"LTC", icon:"logos/crypto/ltc.png" },
  { id:"sol", type:"crypto", label:"Solana", code:"SOL", icon:"logos/crypto/sol.png" },
  { id:"ton", type:"crypto", label:"TON", code:"TON", icon:"logos/crypto/ton.png" },
  { id:"trx", type:"crypto", label:"TRON", code:"TRX", icon:"logos/crypto/trx.png" },
  { id:"usdt", type:"crypto", label:"Tether", code:"USDT", icon:"logos/crypto/tether-usdt.png" },
  { id:"usdc-eth", type:"crypto", label:"USDC (ETH)", code:"USDC", icon:"logos/crypto/usdc-eth.png" },
  { id:"usdc-pol", type:"crypto", label:"USDC (POL)", code:"USDC", icon:"logos/crypto/usdc-pol.png" },
  { id:"usdc-sol", type:"crypto", label:"USDC (SOL)", code:"USDC", icon:"logos/crypto/usdc-sol.png" },
  { id:"usdt-arb", type:"crypto", label:"USDT (ARB)", code:"USDT", icon:"logos/crypto/usdt-arb.png" },
  { id:"usdt-bep", type:"crypto", label:"USDT (BEP)", code:"USDT", icon:"logos/crypto/usdt-bep.png" },
  { id:"usdt-eth", type:"crypto", label:"USDT (ETH)", code:"USDT", icon:"logos/crypto/usdt-eth.png" },
  { id:"usdt-pol", type:"crypto", label:"USDT (POL)", code:"USDT", icon:"logos/crypto/usdt-pol.png" },
  { id:"usdt-sol", type:"crypto", label:"USDT (SOL)", code:"USDT", icon:"logos/crypto/usdt-sol.png" },
  { id:"usdt-trc", type:"crypto", label:"USDT (TRC)", code:"USDT", icon:"logos/crypto/usdt-trc.png" },

  // WALLETS
  { id:"paypal", type:"wallet", label:"PayPal", code:"USD/EUR", icon:"logos/wallets/paypal.png" },
  { id:"payoneer", type:"wallet", label:"Payoneer", code:"USD/EUR", icon:"logos/wallets/payoneer.png" },
  { id:"revolut", type:"wallet", label:"Revolut", code:"USD/EUR", icon:"logos/wallets/revolut.png" },
  { id:"valet", type:"wallet", label:"Valet", code:"USD/EUR", icon:"logos/wallets/valet.png" },
  { id:"vise", type:"wallet", label:"Vise", code:"USD/EUR", icon:"logos/wallets/vise.png" },
];

const GROUP_LABEL = {
  bank: "BANKS",
  crypto: "CRYPTO",
  wallet: "WALLETS",
};

function groupItems(items){
  return {
    bank: items.filter(x=>x.type==="bank"),
    crypto: items.filter(x=>x.type==="crypto"),
    wallet: items.filter(x=>x.type==="wallet"),
  };
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

function parseNumber(v){
  const n = Number(String(v).replace(",", ".").replace(/[^\d.]/g,""));
  return Number.isFinite(n) ? n : 0;
}

/* Demo rates (you will plug real later) */
const DEMO_RATES = {
  "UAH->BTC": 0.0000000625,
  "UAH->ETH": 0.00000125,
  "UAH->USDT": 0.024,
};

function rateFor(from, to){
  // simple demo: if from is UAH bank and to is BTC => use demo rate else 1
  if(from?.type==="bank" && from?.code==="UAH" && to?.code==="BTC") return DEMO_RATES["UAH->BTC"];
  if(from?.type==="bank" && from?.code==="UAH" && to?.code==="ETH") return DEMO_RATES["UAH->ETH"];
  if(from?.type==="bank" && from?.code==="UAH" && to?.code==="USDT") return DEMO_RATES["UAH->USDT"];
  return 1;
}

/* Dropdown component (inline, no fullscreen modal) */
function createDropdown({ mount, valueId, onChange }){
  const wrap = document.createElement("div");
  wrap.className = "dd";
  wrap.innerHTML = `
    <div class="field compact">
      <div class="row">
        <div class="icon"><img alt="" /></div>
        <button class="selBtn grow" type="button" aria-haspopup="listbox" aria-expanded="false">
          <div class="selText">
            <div class="selName"></div>
            <div class="selSub"></div>
          </div>
        </button>
        <div class="chevron">▾</div>
      </div>
    </div>

    <div class="ddPanel" hidden>
      <div class="ddHead">
        <input class="ddSearch" placeholder="Пошук..." />
        <button class="ddClose" type="button">✕</button>
      </div>
      <div class="ddList" role="listbox"></div>
    </div>
  `;

  mount.appendChild(wrap);

  const btn = $(".selBtn", wrap);
  const panel = $(".ddPanel", wrap);
  const search = $(".ddSearch", wrap);
  const closeBtn = $(".ddClose", wrap);
  const list = $(".ddList", wrap);

  let open = false;
  let current = ITEMS.find(x=>x.id===valueId) || ITEMS[0];

  function renderSelected(){
    $(".selName", wrap).textContent = current.label;
    $(".selSub", wrap).textContent = current.code;
    const img = $(".icon img", wrap);
    img.src = current.icon;
    img.onerror = () => { img.removeAttribute("src"); };
  }

  function renderList(filter=""){
    const q = filter.trim().toLowerCase();
    const grouped = groupItems(
      ITEMS.filter(x => !q || (x.label.toLowerCase().includes(q) || x.code.toLowerCase().includes(q)))
    );

    list.innerHTML = "";

    ["bank","crypto","wallet"].forEach(type=>{
      if(!grouped[type].length) return;
      const g = document.createElement("div");
      g.className = "ddGroup";
      g.textContent = GROUP_LABEL[type];
      list.appendChild(g);

      grouped[type].forEach(item=>{
        const row = document.createElement("div");
        row.className = "ddItem";
        row.setAttribute("role","option");
        row.dataset.id = item.id;
        row.innerHTML = `
          <div class="icon"><img alt="" src="${escapeHtml(item.icon)}"></div>
          <div class="grow" style="min-width:0">
            <div class="name">${escapeHtml(item.label)}</div>
            <div class="meta">${escapeHtml(item.code)}</div>
          </div>
        `;
        const img = $("img", row);
        img.onerror = () => { img.removeAttribute("src"); };
        row.addEventListener("click", ()=>{
          current = item;
          renderSelected();
          onChange(item);
          setOpen(false);
        });
        list.appendChild(row);
      });
    });
  }

  function setOpen(v){
    open = v;
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    if(open){
      renderList(search.value);
      setTimeout(()=>search.focus(), 0);
    }
  }

  btn.addEventListener("click", ()=>{
    setOpen(!open);
  });

  closeBtn.addEventListener("click", ()=> setOpen(false));

  search.addEventListener("input", ()=> renderList(search.value));

  // Close on outside click (but NO overlay that blocks buttons)
  document.addEventListener("pointerdown", (e)=>{
    if(!open) return;
    if(wrap.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e)=>{
    if(!open) return;
    if(e.key === "Escape") setOpen(false);
  });

  renderSelected();
  return {
    get: ()=>current,
    set: (id)=>{
      const it = ITEMS.find(x=>x.id===id);
      if(it){ current = it; renderSelected(); }
    }
  };
}

/* App */
const state = {
  tab: "exchange",
  lang: "ua",
  fromId: "privat",
  toId: "btc",
  amountFrom: "100",
};

function render(){
  const root = $("#app");
  root.innerHTML = `
    <div class="safe">
      <div class="container">
        <div class="topbar">
          <div class="topbarRow">
            <div class="brand">
              <img class="brandLogo" src="logos/keks-logo.png" alt="KeksSwap" />
            </div>

            <div class="langWrap">
              <button class="langBtn" type="button" id="langBtn">
                <span>${state.lang.toUpperCase()}</span>
                <span class="chev">▾</span>
              </button>
            </div>
          </div>

          <div class="tabs">
            <button class="tab ${state.tab==="exchange"?"active":""}" data-tab="exchange">Обмін</button>
            <button class="tab ${state.tab==="rules"?"active":""}" data-tab="rules">Правила</button>
            <button class="tab ${state.tab==="faq"?"active":""}" data-tab="faq">FAQ</button>
            <button class="tab ${state.tab==="account"?"active":""}" data-tab="account">Акаунт</button>
          </div>
        </div>

        <div id="page"></div>
      </div>
    </div>
  `;

  // tabs
  root.querySelectorAll(".tab").forEach(b=>{
    b.addEventListener("click", ()=>{
      state.tab = b.dataset.tab;
      render();
    });
  });

  // language dropdown (simple inline list using native prompt)
  $("#langBtn").addEventListener("click", ()=>{
    const next = prompt("Language: UA / EN / PL", state.lang.toUpperCase());
    if(!next) return;
    const v = next.trim().toLowerCase();
    if(["ua","en","pl"].includes(v)){
      state.lang = v;
      render();
    }
  });

  const page = $("#page");

  if(state.tab === "exchange"){
    page.innerHTML = `
      <div class="card">
        <div class="sectionTitle">Віддаєте</div>
        <div id="fromSel"></div>

        <div style="height:10px"></div>

        <div class="field compact">
          <input class="amount small" id="amountFrom" inputmode="decimal" placeholder="0" value="${escapeHtml(state.amountFrom)}" />
        </div>

        <button class="swapBtn" type="button" id="swapBtn" aria-label="Swap">
          <!-- exchange arrows -->
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 7h11l-2.5-2.5 1.4-1.4L22.8 9l-5.9 5.9-1.4-1.4L18 11H7V7zm10 10H6l2.5 2.5-1.4 1.4L1.2 15l5.9-5.9 1.4 1.4L6 13h11v4z"/>
          </svg>
        </button>

        <div class="sectionTitle">Отримуєте</div>
        <div id="toSel"></div>

        <div style="height:10px"></div>

        <div class="field compact">
          <input class="amount small" id="amountTo" inputmode="decimal" placeholder="0" value="0" readonly />
        </div>

        <div class="rate" id="rateLine"></div>

        <button class="cta" type="button" id="createBtn">Створити заявку</button>
        <div class="spacerBottom"></div>
      </div>
    `;

    const fromDD = createDropdown({
      mount: $("#fromSel"),
      valueId: state.fromId,
      onChange: (it)=>{
        state.fromId = it.id;
        recalc(fromDD, toDD);
      }
    });

    const toDD = createDropdown({
      mount: $("#toSel"),
      valueId: state.toId,
      onChange: (it)=>{
        state.toId = it.id;
        recalc(fromDD, toDD);
      }
    });

    const amountFrom = $("#amountFrom");
    amountFrom.addEventListener("input", ()=>{
      state.amountFrom = amountFrom.value;
      recalc(fromDD, toDD);
    });

    $("#swapBtn").addEventListener("click", ()=>{
      const a = state.fromId;
      state.fromId = state.toId;
      state.toId = a;
      fromDD.set(state.fromId);
      toDD.set(state.toId);
      recalc(fromDD, toDD);
    });

    $("#createBtn").addEventListener("click", ()=>{
      const from = fromDD.get();
      const to = toDD.get();
      const amt = parseNumber(state.amountFrom);
      alert(`Заявка (demo)\nВіддаєте: ${from.label} ${from.code}\nОтримуєте: ${to.label} ${to.code}\nСума: ${amt}`);
    });

    recalc(fromDD, toDD);
  }

  if(state.tab === "rules"){
    page.innerHTML = `
      <div class="card">
        <div class="pageTitle">Правила</div>
        <p class="pageText">
          Тут будуть правила обміну (поки заглушка).<br/>
          Додамо: ліміти, час обробки, комісії, вимоги до реквізитів.
        </p>
      </div>
    `;
  }

  if(state.tab === "faq"){
    page.innerHTML = `
      <div class="card">
        <div class="pageTitle">FAQ</div>
        <p class="pageText">
          Часті питання (поки заглушка).
        </p>
      </div>
    `;
  }

  if(state.tab === "account"){
    page.innerHTML = `
      <div class="card">
        <div class="pageTitle">Акаунт</div>
        <p class="pageText">
          Тут буде вхід/реєстрація та KYC (поки без підключення).
        </p>
        <div class="row" style="margin-top:12px">
          <button class="cta" type="button" style="height:52px; flex:1;">Увійти</button>
          <button class="field" type="button" style="height:52px; flex:1; font-weight:950; font-size:16px; cursor:pointer;">
            Реєстрація
          </button>
        </div>
      </div>
    `;
  }
}

function recalc(fromDD, toDD){
  const from = fromDD.get();
  const to = toDD.get();
  const r = rateFor(from, to);

  const amt = parseNumber(state.amountFrom);
  const out = amt * r;

  const outField = $("#amountTo");
  if(outField){
    outField.value = formatOut(out, to);
  }

  const rateLine = $("#rateLine");
  if(rateLine){
    if(from?.code && to?.code){
      rateLine.textContent = `Курс: 1 ${from.code} ≈ ${formatRate(r)} ${to.code}`;
    }else{
      rateLine.textContent = "";
    }
  }
}

function formatRate(r){
  if(r === 0) return "0";
  if(r < 0.000001) return r.toFixed(10);
  if(r < 0.001) return r.toFixed(8);
  if(r < 1) return r.toFixed(6);
  return r.toFixed(2);
}

function formatOut(v, to){
  if(!Number.isFinite(v)) return "0";
  const code = (to?.code || "").toUpperCase();
  if(code === "BTC" || code === "ETH") return v.toFixed(8);
  if(code === "USDT" || code === "USDC") return v.toFixed(2);
  return String(Math.round(v * 100) / 100);
}

render();
