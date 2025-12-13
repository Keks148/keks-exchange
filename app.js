(function () {
  const $ = (s, el = document) => el.querySelector(s);

  // Твои пути (ВАЖНО: без ведущего / )
  const PATHS = {
    logo: "logos/keks-logo.png",
    banks: "logos/banks/",
    crypto: "logos/crypto/",
    wallets: "logos/wallets/",
  };

  // Единый список (банки + крипта + кошельки)
  // filename должен совпадать с тем, что у тебя в репе
  const OPTIONS = [
    { group: "Банки UAH", value: "bank:privat", label: "PrivatBank (UAH)", icon: PATHS.banks + "privat.png" },
    { group: "Банки UAH", value: "bank:mono", label: "Monobank (UAH)", icon: PATHS.banks + "mono.png" },
    { group: "Банки UAH", value: "bank:oschad", label: "Oschadbank (UAH)", icon: PATHS.banks + "oschad.png" },
    { group: "Банки UAH", value: "bank:pumb", label: "PUMB (UAH)", icon: PATHS.banks + "pumb.png" },
    { group: "Банки UAH", value: "bank:a-bank", label: "A-Bank (UAH)", icon: PATHS.banks + "a-bank.png" },
    { group: "Банки UAH", value: "bank:otp", label: "OTP (UAH)", icon: PATHS.banks + "otp.png" },
    { group: "Банки UAH", value: "bank:izi", label: "IziBank (UAH)", icon: PATHS.banks + "izi.png" },
    { group: "Банки UAH", value: "bank:sense", label: "Sense (UAH)", icon: PATHS.banks + "sense.png" },
    { group: "Банки UAH", value: "bank:ukr-sib", label: "UkrSib (UAH)", icon: PATHS.banks + "ukr-sib.png" },
    { group: "Банки UAH", value: "bank:ukr-banki", label: "UkrBanki (UAH)", icon: PATHS.banks + "ukr-banki.png" },
    { group: "Банки UAH", value: "bank:visa-master", label: "Visa/Master (UAH)", icon: PATHS.banks + "visa-master.png" },
    { group: "Банки UAH", value: "bank:reyf", label: "Reyf (UAH)", icon: PATHS.banks + "reyf.png" },

    { group: "Crypto", value: "crypto:btc", label: "Bitcoin (BTC)", icon: PATHS.crypto + "btc.png" },
    { group: "Crypto", value: "crypto:eth", label: "Ethereum (ETH)", icon: PATHS.crypto + "eth.png" },
    { group: "Crypto", value: "crypto:ltc", label: "Litecoin (LTC)", icon: PATHS.crypto + "ltc.png" },
    { group: "Crypto", value: "crypto:sol", label: "Solana (SOL)", icon: PATHS.crypto + "sol.png" },
    { group: "Crypto", value: "crypto:ton", label: "TON (TON)", icon: PATHS.crypto + "ton.png" },
    { group: "Crypto", value: "crypto:trx", label: "TRON (TRX)", icon: PATHS.crypto + "trx.png" },
    { group: "Stable", value: "crypto:usdt", label: "Tether (USDT)", icon: PATHS.crypto + "tether-usdt.png" },
    { group: "Stable", value: "crypto:usdc-eth", label: "USDC (ETH)", icon: PATHS.crypto + "usdc-eth.png" },
    { group: "Stable", value: "crypto:usdc-pol", label: "USDC (POL)", icon: PATHS.crypto + "usdc-pol.png" },
    { group: "Stable", value: "crypto:usdc-sol", label: "USDC (SOL)", icon: PATHS.crypto + "usdc-sol.png" },
    { group: "Stable", value: "crypto:usdt-eth", label: "USDT (ETH)", icon: PATHS.crypto + "usdt-eth.png" },
    { group: "Stable", value: "crypto:usdt-trc", label: "USDT (TRC)", icon: PATHS.crypto + "usdt-trc.png" },
    { group: "Stable", value: "crypto:usdt-pol", label: "USDT (POL)", icon: PATHS.crypto + "usdt-pol.png" },
    { group: "Stable", value: "crypto:usdt-sol", label: "USDT (SOL)", icon: PATHS.crypto + "usdt-sol.png" },
    { group: "Stable", value: "crypto:usdt-arb", label: "USDT (ARB)", icon: PATHS.crypto + "usdt-arb.png" },
    { group: "Stable", value: "crypto:usdt-bep", label: "USDT (BEP)", icon: PATHS.crypto + "usdt-bep.png" },

    { group: "Wallets", value: "wallet:paypal", label: "PayPal", icon: PATHS.wallets + "paypal.png" },
    { group: "Wallets", value: "wallet:payoneer", label: "Payoneer", icon: PATHS.wallets + "payoneer.png" },
    { group: "Wallets", value: "wallet:revolut", label: "Revolut", icon: PATHS.wallets + "revolut.png" },
    { group: "Wallets", value: "wallet:valet", label: "Valet", icon: PATHS.wallets + "valet.png" },
    { group: "Wallets", value: "wallet:vise", label: "Vise", icon: PATHS.wallets + "vise.png" },
  ];

  const state = {
    lang: "UA",
    give: "bank:privat",
    get: "crypto:btc",
    giveAmount: 100,
    rateText: "Курс: —",
  };

  function groupedOptions() {
    const groups = {};
    for (const o of OPTIONS) {
      groups[o.group] = groups[o.group] || [];
      groups[o.group].push(o);
    }
    return groups;
  }

  function optionByValue(v) {
    return OPTIONS.find(x => x.value === v) || OPTIONS[0];
  }

  function render() {
    const app = $("#app");
    if (!app) return;

    app.innerHTML = `
      <div class="header">
        <div class="headerTop">
          <div class="brand">
            <img class="brandLogo" src="./${PATHS.logo}" alt="KeksSwap" />
          </div>

          <select class="langSelect" id="lang">
            <option value="UA">UA</option>
            <option value="EN">EN</option>
            <option value="PL">PL</option>
          </select>
        </div>

        <div class="tabs">
          <button class="tab active" data-tab="swap">Обмін</button>
          <button class="tab" data-tab="rules">Правила</button>
          <button class="tab" data-tab="faq">FAQ</button>
          <button class="tab" data-tab="acc">Акаунт</button>
        </div>
      </div>

      <div class="card" id="screen"></div>
    `;

    $("#lang").value = state.lang;

    // Tabs (без роутинга, чтобы не глючило)
    app.querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => {
        app.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        showScreen(btn.dataset.tab);
      });
    });

    $("#lang").addEventListener("change", (e) => {
      state.lang = e.target.value;
    });

    showScreen("swap");

    // Telegram WebApp (не обязательно, но полезно)
    try {
      if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.expand();
      }
    } catch (_) {}
  }

  function buildSelectHTML(id, value) {
    const groups = groupedOptions();
    let html = `<select id="${id}">`;
    for (const g of Object.keys(groups)) {
      html += `<option disabled>— ${g} —</option>`;
      for (const o of groups[g]) {
        const sel = o.value === value ? "selected" : "";
        html += `<option value="${o.value}" ${sel}>${o.label}</option>`;
      }
    }
    html += `</select>`;
    return html;
  }

  function showScreen(name) {
    const screen = $("#screen");
    if (!screen) return;

    if (name === "swap") {
      const giveOpt = optionByValue(state.give);
      const getOpt  = optionByValue(state.get);

      screen.innerHTML = `
        <div class="sectionTitle">Віддаєте</div>
        <div class="row">
          <div class="picker">
            <div class="icon"><img src="./${giveOpt.icon}" alt=""></div>
            ${buildSelectHTML("giveSelect", state.give)}
          </div>
        </div>
        <input class="amount" id="giveAmount" inputmode="decimal" value="${state.giveAmount}" />

        <div class="swapWrap">
          <button class="swapBtn" id="swapBtn" aria-label="swap"><span>⇄</span></button>
        </div>

        <div class="sectionTitle">Отримуєте</div>
        <div class="row">
          <div class="picker">
            <div class="icon"><img src="./${getOpt.icon}" alt=""></div>
            ${buildSelectHTML("getSelect", state.get)}
          </div>
        </div>
        <input class="amount" id="getAmount" value="—" readonly />

        <div class="rate" id="rateText">${state.rateText}</div>

        <button class="primary" id="createBtn">Створити заявку</button>
      `;

      // Handlers
      $("#giveSelect").addEventListener("change", (e) => {
        state.give = e.target.value;
        showScreen("swap"); // перерисовать (чтобы иконка обновилась)
      });

      $("#getSelect").addEventListener("change", (e) => {
        state.get = e.target.value;
        showScreen("swap");
      });

      $("#swapBtn").addEventListener("click", () => {
        const tmp = state.give;
        state.give = state.get;
        state.get = tmp;
        showScreen("swap");
      });

      $("#giveAmount").addEventListener("input", (e) => {
        const v = String(e.target.value).replace(",", ".");
        const num = Number(v);
        state.giveAmount = Number.isFinite(num) ? num : 0;
        // пока без авто-курса: просто зеркалим примером
        $("#getAmount").value = "—";
      });

      $("#createBtn").addEventListener("click", () => {
        // пока заглушка
        alert("Заявка створена (заглушка). Далі підключимо авто-курс і реальну логіку.");
      });

      return;
    }

    if (name === "rules") {
      screen.innerHTML = `
        <div style="font-weight:900;font-size:28px;margin:4px 0 10px;">Правила</div>
        <div style="color:var(--muted);font-weight:700;line-height:1.4;">
          Тут будуть правила обміну (поки заглушка).
        </div>
      `;
      return;
    }

    if (name === "faq") {
      screen.innerHTML = `
        <div style="font-weight:900;font-size:28px;margin:4px 0 10px;">FAQ</div>
        <div style="color:var(--muted);font-weight:700;line-height:1.4;">
          Тут будуть відповіді на питання (поки заглушка).
        </div>
      `;
      return;
    }

    if (name === "acc") {
      screen.innerHTML = `
        <div style="font-weight:900;font-size:28px;margin:4px 0 10px;">Акаунт</div>
        <div style="color:var(--muted);font-weight:700;line-height:1.4;margin-bottom:12px;">
          Тут буде вхід/реєстрація і далі KYC (поки без підключення).
        </div>
        <div class="row">
          <button class="primary" style="flex:1;height:44px;">Увійти</button>
          <button class="tab" style="flex:1;height:44px;">Реєстрація</button>
        </div>
      `;
      return;
    }
  }

  // Старт
  document.addEventListener("DOMContentLoaded", render);

  // Если css/js не грузится из-за кэша Telegram — меняй ?v=число в index.html
})();
