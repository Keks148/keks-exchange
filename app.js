(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();

    const top = (tg.safeAreaInset?.top ?? 10) + 12;
    const bottom = (tg.safeAreaInset?.bottom ?? 10) + 12;
    document.documentElement.style.setProperty("--safeTop", `${top}px`);
    document.documentElement.style.setProperty("--safeBottom", `${bottom}px`);
  }

  const app = document.getElementById("app");

  let giveAmount = "";
  let giveAsset = { name:"Monobank", icon:"./logos/banks/mono.png", sub:"UAH" };
  let getAsset  = { name:"Bitcoin", icon:"./logos/crypto/crypto.png", sub:"BTC" };

  function render(){
    app.innerHTML = `
      <div class="header">
        <div class="header-inner">
          <img src="./logo.png" class="logo" />
        </div>
      </div>

      <div class="main">
        <div class="card">
          <div class="label">Віддаєте</div>
          <input 
            class="input"
            inputmode="decimal"
            value="${giveAmount}"
            placeholder="0"
            oninput="window.onGiveInput(event)"
          />

          <div class="select" onclick="window.openModal('give')">
            <img src="${giveAsset.icon}">
            <b>${giveAsset.name}</b> <span>${giveAsset.sub}</span>
          </div>

          <div class="swap">
            <button class="swap-btn">⇅</button>
          </div>

          <div class="label">Отримуєте</div>
          <input class="input" value="0.0000026" disabled />

          <div class="select" onclick="window.openModal('get')">
            <img src="${getAsset.icon}">
            <b>${getAsset.name}</b> <span>${getAsset.sub}</span>
          </div>
        </div>
      </div>
    `;
  }

  window.onGiveInput = (e) => {
    giveAmount = e.target.value; // ❗️НЕ перерендерим → фокус не теряется
  };

  window.openModal = (type) => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-card">
        <div class="item" onclick="selectAsset('${type}','Bitcoin','BTC','./logos/crypto/crypto.png')">
          <img src="./logos/crypto/crypto.png"> Bitcoin BTC
        </div>
        <div class="item" onclick="selectAsset('${type}','Monobank','UAH','./logos/banks/mono.png')">
          <img src="./logos/banks/mono.png"> Monobank UAH
        </div>
      </div>
    `;
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };

  window.selectAsset = (type,name,sub,icon) => {
    if (type === "give") giveAsset = {name,sub,icon};
    else getAsset = {name,sub,icon};
    document.querySelector(".modal")?.remove();
    render();
  };

  render();
})();
