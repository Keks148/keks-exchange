const assets = [
  { id:'pb', name:'PrivatBank', type:'bank' },
  { id:'mono', name:'Monobank', type:'bank' },
  { id:'usdt', name:'USDT', type:'crypto', nets:['TRC20','ERC20','BEP20'] },
  { id:'btc', name:'BTC', type:'crypto', nets:['BTC'] },
  { id:'eth', name:'ETH', type:'crypto', nets:['ERC20'] }
];

const send = document.getElementById('sendAsset');
const receive = document.getElementById('receiveAsset');

assets.forEach(a=>{
  send.innerHTML += `<option value="${a.id}">${a.name}</option>`;
  receive.innerHTML += `<option value="${a.id}">${a.name}</option>`;
});

function handle(select, netWrap, netSel, card, fio){
  const a = assets.find(x=>x.id===select.value);
  netWrap.classList.toggle('hidden', !a.nets);
  card.classList.toggle('hidden', a.type!=='bank');
  fio.classList.toggle('hidden', a.type!=='bank');

  if(a.nets){
    netSel.innerHTML='';
    a.nets.forEach(n=>netSel.innerHTML+=`<option>${n}</option>`);
  }
}

send.onchange=()=>handle(
  send,
  document.getElementById('sendNetworkWrap'),
  document.getElementById('sendNetwork'),
  document.createElement('div'),
  document.createElement('div')
);

receive.onchange=()=>handle(
  receive,
  document.getElementById('receiveNetworkWrap'),
  document.getElementById('receiveNetwork'),
  document.getElementById('cardWrap'),
  document.getElementById('fioWrap')
);
