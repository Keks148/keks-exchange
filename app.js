const $ = (id)=>document.getElementById(id);

// ===== DATA =====
const BANKS = [
  {id:"mono",name:"Monobank",code:"UAH",icon:"logos/banks/mono.png",type:"bank"},
  {id:"privat",name:"PrivatBank",code:"UAH",icon:"logos/banks/privat.png",type:"bank"},
];

const CRYPTO = [
  {id:"usdt",name:"Tether USDT",code:"USDT",icon:"logos/crypto/tether-usdt.png",type:"crypto",networks:["TRC20","ERC20"]},
  {id:"btc",name:"Bitcoin",code:"BTC",icon:"logos/crypto/btc.png",type:"crypto",networks:["BTC"]},
];

const NET_ICON = {
  TRC20:"logos/networks/trc20.png",
  ERC20:"logos/networks/erc20.png",
  BTC:"logos/networks/btc.png",
};

// ===== STATE =====
const state={
  giveAsset:CRYPTO[0],
  giveNet:"TRC20",
  getAsset:BANKS[0],
  amount:1000,
};

// ===== INIT =====
document.addEventListener("DOMContentLoaded",()=>{
  setGive(state.giveAsset);
  setGet(state.getAsset);
  setNet(state.giveNet);
  $("giveAmount").value=state.amount;

  $("giveAssetBtn").onclick=()=>openAsset("give");
  $("getAssetBtn").onclick=()=>openAsset("get");
  $("giveNetBtn").onclick=openNet;
  $("swapBtn").onclick=swap;
});

// ===== UI =====
function setGive(a){
  $("giveIcon").src=a.icon;
  $("giveName").textContent=a.name;
  $("giveSub").textContent=a.code;
}
function setGet(a){
  $("getIcon").src=a.icon;
  $("getName").textContent=a.name;
  $("getSub").textContent=a.code;
}
function setNet(n){
  $("giveNetLabel").textContent=n;
  $("giveNetIcon").src=NET_ICON[n]||state.giveAsset.icon;
}

// ===== ACTIONS =====
function swap(){
  const g=state.giveAsset;
  state.giveAsset=state.getAsset.type==="bank"?CRYPTO[0]:BANKS[0];
  state.getAsset=g.type==="crypto"?BANKS[0]:CRYPTO[0];
  setGive(state.giveAsset);
  setGet(state.getAsset);
}

function openAsset(which){
  $("assetModal").classList.remove("hidden");
  const list=$("assetList");
  list.innerHTML="";
  const items=which==="give"?CRYPTO:BANKS;

  items.forEach(it=>{
    const b=document.createElement("button");
    b.className="item";
    b.innerHTML=`<span>${it.name}</span><span>${it.code}</span>`;
    b.onclick=()=>{
      if(which==="give"){state.giveAsset=it;setGive(it);}
      else{state.getAsset=it;setGet(it);}
      $("assetModal").classList.add("hidden");
    };
    list.appendChild(b);
  });
}

function openNet(){
  if(state.giveAsset.type!=="crypto")return;
  $("netModal").classList.remove("hidden");
  const list=$("netList");
  list.innerHTML="";
  state.giveAsset.networks.forEach(n=>{
    const b=document.createElement("button");
    b.className="item";
    b.textContent=n;
    b.onclick=()=>{
      state.giveNet=n;
      setNet(n);
      $("netModal").classList.add("hidden");
    };
    list.appendChild(b);
  });
}
