const tg = window.Telegram.WebApp;
tg.expand();

function openExchange() {
  tg.sendData(JSON.stringify({action: "open_exchange"}));
}
