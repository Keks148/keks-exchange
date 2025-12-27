let sendType = null;
let receiveType = null;

function openAsset(type) {
  const choice = prompt("bank / crypto");
  if (type === 'send') {
    sendType = choice;
    document.getElementById('sendAsset').innerText = choice;
    document.getElementById('sendNetwork').classList.toggle('hidden', choice !== 'crypto');
  }
  if (type === 'receive') {
    receiveType = choice;
    document.getElementById('receiveAsset').innerText = choice;
    document.getElementById('receiveNetwork').classList.toggle('hidden', choice !== 'crypto');
    document.getElementById('cardFields').classList.toggle('hidden', choice !== 'bank');
  }
}

function openNetwork(type) {
  const net = prompt("TRC20 / ERC20 / BEP20");
  document.getElementById(type + 'Net').innerText = net;
}

function swap() {
  alert("Swap");
}
