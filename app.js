// ================== HELPERS ==================
const $ = (id) => document.getElementById(id);

// ================== DATA ==================
const BANKS = [
  { id:"mono", name:"Monobank (UAH)", code:"UAH", icon:"logos/banks/mono.png", type:"bank" },
  { id:"privat", name:"PrivatBank (UAH)", code:"UAH", icon:"logos/banks/privat.png", type:"bank" },
  { id:"visa", name:"Visa/Master (UAH)", code:"UAH", icon:"logos/banks/visa-master.png", type:"bank" }
];

const CRYPTO = [
  {
    id:"usdt",
    name:"Tether (USDT)",
    code:"USDT",
    icon:"logos/crypto/tether-usdt.png",
    type:"crypto",
    networks:["TRC20","ERC20","BEP20"]
  },
  {
    id:"btc",
    name:"Bitcoin (BTC)",
    code:"BTC",
    icon:"logos/crypto/btc.png",
    type:"crypto",
    networks:["BTC"]
  }
];

const NET_ICON = {
  TRC20:"logos/networks/trc20.png",
  ERC20:"logos/networks/erc20.png",
  BEP20:"logos/networks/bep20.png",
  BTC:"logos/networks/btc.png"
};

// ================== STATE ==================
const state = {
  giveAsset: CRYPTO[0],
  giveNet: "TRC20",
  getAsset: BANKS[0],
  amount: 1000
};

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  // ⚠️ ВАЖНО: закрываем модалки жёстко при старте
  $("netModal").classList.add("hidden");
  $("assetModal").classList.add("hidden");

  renderGive();
  renderGet();
  renderNetwork();
  bindEvents();
});

// ================== RENDER ==================
function renderGive(){
  $("giveIcon").src = state.giveAsset.icon;
  $("giveName").textContent = state.giveAsset.name;
  $("giveSub").textContent = state.giveAsset.code;
}

function renderGet(){
  $("getIcon").src = state.getAsset.icon;
  $("getName").textContent = state.getAsset.name;
  $("getSub").textContent = state.getAsset.code;
}

function renderNetwork(){
  $("giveNetLabel").textContent = state.giveNet;
  $("giveNetIcon").src = NET_ICON[state.giveNet];
}

// ================== EVENTS ==================
function bindEvents(){

  // amount
  $("giveAmount").addEventListener("input", e=>{
    state.amount = Number(e.target.value || 0);
  });

  // swap
  $("swapBtn").addEventListener("click", ()=>{
    [state.giveAsset, state.getAsset] = [state.getAsset, state.giveAsset];
    renderGive();
    renderGet();
  });

  // asset pickers
  $("giveAssetBtn").onclick = () => openAssetModal("give");
  $("getAssetBtn").onclick = () => openAssetModal("get");

  // network picker — ТОЛЬКО ПО КЛИКУ
  $("giveNetBtn").onclick = () => {
    if(state.giveAsset.type === "crypto"){
      openNetworkModal();
    }
  };

  // close modals
  $("netClose").onclick = closeNetworkModal;
  $("assetClose").onclick = closeAssetModal;

  $("netModal").addEventListener("click", e=>{
    if(e.target.id === "netModal") closeNetworkModal();
  });

  $("assetModal").addEventListener("click", e=>{
    if(e.target.id === "assetModal") closeAssetModal();
  });
}

// ================== ASSET MODAL ==================
function openAssetModal(target){
  $("assetModal").classList.remove("hidden");
  const list = $("assetList");
  list.innerHTML = "";

  [...CRYPTO, ...BANKS].forEach(item=>{
    const btn = document.createElement("button");
    btn.className = "item";
    btn.innerHTML = `
      <div class="itemLeft">
        <img class="icon" src="${item.icon}">
        <div>
          <div class="itemName">${item.name}</div>
          <div class="itemSub">${item.code}</div>
        </div>
      </div>
    `;
    btn.onclick = ()=>{
      if(target === "give"){
        state.giveAsset = item;
        if(item.type === "crypto"){
          state.giveNet = item.networks[0];
          renderNetwork();
          $("giveNetBtn").style.display = "flex";
        } else {
          $("giveNetBtn").style.display = "none";
        }
        renderGive();
      } else {
        state.getAsset = item;
        renderGet();
      }
      closeAssetModal();
    };
    list.appendChild(btn);
  });
}

function closeAssetModal(){
  $("assetModal").classList.add("hidden");
}

// ================== NETWORK MODAL ==================
function openNetworkModal(){
  const list = $("netList");
  list.innerHTML = "";

  state.giveAsset.networks.forEach(net=>{
    const btn = document.createElement("button");
    btn.className = "item";
    btn.innerHTML = `
      <div class="itemLeft">
        <img class="netIcon" src="${NET_ICON[net]}">
        <div>
          <div class="itemName">${net}</div>
          <div class="itemSub">${state.giveAsset.code} network</div>
        </div>
      </div>
    `;
    btn.onclick = ()=>{
      state.giveNet = net;
      renderNetwork();
      closeNetworkModal();
    };
    list.appendChild(btn);
  });

  $("netModal").classList.remove("hidden");
}

function closeNetworkModal(){
  $("netModal").classList.add("hidden");
}
