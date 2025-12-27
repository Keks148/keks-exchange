(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  // --------- DATA ----------
  const coins = [
    { id:"btc", name:"Bitcoin", code:"BTC", icon:"logos/crypto/btc.png", nets:["btc"] },
    { id:"eth", name:"Ethereum", code:"ETH", icon:"logos/crypto/eth.png", nets:["erc20"] },
    { id:"ltc", name:"Litecoin", code:"LTC", icon:"logos/crypto/ltc.png", nets:["ltc"] },
    { id:"sol", name:"Solana", code:"SOL", icon:"logos/crypto/sol.png", nets:["sol"] },
    { id:"ton", name:"Toncoin", code:"TON", icon:"logos/crypto/ton.png", nets:["ton"] },
    { id:"trx", name:"Tron", code:"TRX", icon:"logos/crypto/trx.png", nets:["trc20"] },
    { id:"usdt", name:"Tether", code:"USDT", icon:"logos/crypto/tether-usdt.png", nets:["trc20","erc20","bep20"] },
    { id:"usdc", name:"USD Coin", code:"USDC", icon:"logos/crypto/usdc.png", nets:["trc20","erc20","bep20"] },
  ];

  const nets = {
    btc:  { id:"btc",  name:"BTC",  sub:"BTC · BTC",   icon:"logos/networks/btc.png" },
    ltc:  { id:"ltc",  name:"LTC",  sub:"LTC · LTC",   icon:"logos/networks/ltc.png" },
    sol:  { id:"sol",  name:"SOL",  sub:"SOL · SOL",   icon:"logos/networks/sol.png" },
    ton:  { id:"ton",  name:"TON",  sub:"TON · TON",   icon:"logos/networks/ton.png" },
    erc20:{ id:"erc20",name:"ERC20",sub:"· ETH",        icon:"logos/networks/erc20.png" },
    trc20:{ id:"trc20",name:"TRC20",sub:"· TRX",        icon:"logos/networks/trc20.png" },
    bep20:{ id:"bep20",name:"BEP20",sub:"· BNB",        icon:"logos/networks/bep20.png" },
  };

  const banks = [
    { id:"mono",  name:"Monobank", icon:"logos/banks/mono.png" },
    { id:"privat",name:"PrivatBank", icon:"logos/banks/privat.png" },
    { id:"a-bank",name:"A-Банк", icon:"logos/banks/a-bank.png" },
    { id:"pumb",  name:"PUMB", icon:"logos/banks/pumb.png" },
    { id:"oschad",name:"Ощадбанк", icon:"logos/banks/oschad.png" },
    { id:"otp",   name:"OTP", icon:"logos/banks/otp.png" },
    { id:"sense", name:"Sense", icon:"logos/banks/sense.png" },
    { id:"revolut", name:"Revolut", icon:"logos/wallets/revolut.png" },
    { id:"paypal", name:"PayPal", icon:"logos/wallets/paypal.png" },
    { id:"payoneer", name:"Payoneer", icon:"logos/wallets/payoneer.png" },
  ];

  // --------- STATE ----------
  let state = {
    lang: "UA",
    giveCoin: "usdt",
    giveNet: "trc20",
    getCoin: "usdc",
    getNet: "erc20",
    bank: "mono"
  };

  // --------- UI refs ----------
  const $ = (id) => document.getElementById(id);

  const screens = {
    home: $("screen-home"),
    history: $("screen-history"),
    profile: $("screen-profile"),
  };

  // give
  const giveCoinIcon = $("giveCoinIcon");
  const giveCoinName = $("giveCoinName");
  const giveCoinCode = $("giveCoinCode");
  const giveNetIcon  = $("giveNetIcon");
  const giveNetName  = $("giveNetName");
  const giveNetCode  = $("giveNetCode");
  const giveChip     = $("giveChip");
  const giveAmount   = $("giveAmount");

  // get
  const getCoinIcon = $("getCoinIcon");
  const getCoinName = $("getCoinName");
  const getCoinCode = $("getCoinCode");
  const getNetIcon  = $("getNetIcon");
  const getNetName  = $("getNetName");
  const getNetCode  = $("getNetCode");
  const getAmount   = $("getAmount");

  // bank
  const bankIcon = $("bankIcon");
  const bankName = $("bankName");

  // sheet
  const sheet = $("sheet");
  const sheetTitle = $("sheetTitle");
  const sheetDesc  = $("sheetDesc");
  const sheetList  = $("sheetList");

  // --------- helpers ----------
  function coinById(id){ return coins.find(c => c.id === id); }
  function netById(id){ return nets[id]; }
  function bankById(id){ return banks.find(b => b.id === id); }

  function safeNetForCoin(coinId, wantedNetId){
    const c = coinById(coinId);
    if (!c) return wantedNetId;
    if (c.nets.includes(wantedNetId)) return wantedNetId;
    return c.nets[0];
  }

  function render(){
    // ensure nets valid
    state.giveNet = safeNetForCoin(state.giveCoin, state.giveNet);
    state.getNet  = safeNetForCoin(state.getCoin, state.getNet);

    const gc = coinById(state.giveCoin);
    const gn = netById(state.giveNet);
    const rc = coinById(state.getCoin);
    const rn = netById(state.getNet);
    const bk = bankById(state.bank);

    // give coin
    giveCoinIcon.src = gc.icon;
    giveCoinName.textContent = gc.name;
    giveCoinCode.textContent = gc.code;
    giveChip.textContent = gc.code;

    // give net
    giveNetIcon.src = gn.icon;
    giveNetName.textContent = gn.name;
    giveNetCode.textContent = `${gc.code} ${gn.sub}`.trim();

    // get coin
    getCoinIcon.src = rc.icon;
    getCoinName.textContent = rc.name;
    getCoinCode.textContent = rc.code;

    // get net
    getNetIcon.src = rn.icon;
    getNetName.textContent = rn.name;
    getNetCode.textContent = `${rc.code} ${rn.sub}`.trim();

    // bank
    bankIcon.src = bk.icon;
    bankName.textContent = bk.name;

    // calc (пока простой демо)
    const v = parseFloat((giveAmount.value || "0").replace(",", "."));
    if (!isFinite(v) || v <= 0) {
      getAmount.textContent = "0";
    } else {
      // демо: 1:1
      getAmount.textContent = String(Math.round(v * 100) / 100);
    }

    // lang ui
    $("langValue").textContent = state.lang;
    $("langSub").textContent = state.lang === "UA" ? "Українська" : "Русский";
  }

  function openSheet({title, desc, items, onPick}){
    sheetTitle.textContent = title;
    sheetDesc.textContent = desc || "";
    sheetList.innerHTML = "";

    items.forEach(it => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sheetItem";
      btn.innerHTML = `
        <img src="${it.icon}" alt="">
        <div class="t">
          <div class="a">${it.title}</div>
          ${it.sub ? `<div class="b">${it.sub}</div>` : ``}
        </div>
        <div class="r">›</div>
      `;
      btn.addEventListener("click", () => {
        closeSheet();
        onPick(it.value);
      });
      sheetList.appendChild(btn);
    });

    sheet.classList.remove("hidden");
  }

  function closeSheet(){
    sheet.classList.add("hidden");
  }

  // --------- events ----------
  $("sheetClose").addEventListener("click", closeSheet);
  $("sheetBackdrop").addEventListener("click", closeSheet);

  // tabbar
  document.querySelectorAll(".tabbar .tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tabbar .tab").forEach(x => x.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      Object.values(screens).forEach(s => s.classList.add("hidden"));
      screens[tab].classList.remove("hidden");
      if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
    });
  });

  // swap
  $("swapBtn").addEventListener("click", () => {
    [state.giveCoin, state.getCoin] = [state.getCoin, state.giveCoin];
    [state.giveNet, state.getNet]   = [state.getNet, state.giveNet];
    render();
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("medium");
  });

  // coin pickers
  $("giveCoinBtn").addEventListener("click", () => {
    openSheet({
      title:"Виберіть валюту",
      desc:"",
      items: coins.map(c => ({
        value:c.id,
        icon:c.icon,
        title:`${c.name} (${c.code})`,
        sub:c.code
      })),
      onPick:(id) => { state.giveCoin = id; render(); }
    });
  });

  $("getCoinBtn").addEventListener("click", () => {
    openSheet({
      title:"Виберіть валюту",
      desc:"",
      items: coins.map(c => ({
        value:c.id,
        icon:c.icon,
        title:`${c.name} (${c.code})`,
        sub:c.code
      })),
      onPick:(id) => { state.getCoin = id; render(); }
    });
  });

  // network pickers (фильтр по монете)
  $("giveNetBtn").addEventListener("click", () => {
    const c = coinById(state.giveCoin);
    openSheet({
      title:"Оберіть мережу",
      desc:"Показуємо тільки мережі, доступні для цієї валюти — щоб не плутати.",
      items: c.nets.map(nid => {
        const n = netById(nid);
        return {
          value:nid,
          icon:n.icon,
          title:n.name,
          sub:`${c.code} ${n.sub}`.trim()
        };
      }),
      onPick:(nid) => { state.giveNet = nid; render(); }
    });
  });

  $("getNetBtn").addEventListener("click", () => {
    const c = coinById(state.getCoin);
    openSheet({
      title:"Оберіть мережу",
      desc:"Показуємо тільки мережі, доступні для цієї валюти — щоб не плутати.",
      items: c.nets.map(nid => {
        const n = netById(nid);
        return {
          value:nid,
          icon:n.icon,
          title:n.name,
          sub:`${c.code} ${n.sub}`.trim()
        };
      }),
      onPick:(nid) => { state.getNet = nid; render(); }
    });
  });

  // bank picker
  $("bankBtn").addEventListener("click", () => {
    openSheet({
      title:"Оберіть банк",
      desc:"",
      items: banks.map(b => ({
        value:b.id,
        icon:b.icon,
        title:b.name,
        sub:""
      })),
      onPick:(id) => { state.bank = id; render(); }
    });
  });

  // lang
  function openLang(){
    openSheet({
      title:"Мова",
      desc:"",
      items:[
        {value:"UA", icon:"logos/networks/ton.png", title:"Українська", sub:"UA"},
        {value:"RU", icon:"logos/networks/ton.png", title:"Русский", sub:"RU"},
      ],
      onPick:(v)=>{ state.lang=v; render(); }
    });
  }
  $("langBtn").addEventListener("click", openLang);
  $("lang2Btn").addEventListener("click", openLang);

  // calc update
  giveAmount.addEventListener("input", render);

  // avatar + name from Telegram
  function initTelegramProfile(){
    const photoEl = $("tgAvatar");
    const nameEl  = $("tgName");
    const userEl  = $("tgUser");

    const u = tg?.initDataUnsafe?.user;
    if (!u){
      photoEl.style.display = "none";
      nameEl.textContent = "Користувач";
      userEl.textContent = "@user";
      return;
    }

    const full = [u.first_name, u.last_name].filter(Boolean).join(" ");
    nameEl.textContent = full || "Користувач";
    userEl.textContent = u.username ? `@${u.username}` : " ";

    // Telegram не всегда даёт фото url. Если нет — покажем заглушку.
    if (u.photo_url){
      photoEl.src = u.photo_url;
    } else {
      photoEl.style.display = "none";
    }
  }

  // init
  initTelegramProfile();
  render();
})();
