/* KeksSwap – clean rebuild (no re-render, no “dead overlays”) */

(function () {
  // Telegram safe call
  try {
    if (window.Telegram && Telegram.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
    }
  } catch(e){}

  const $ = (id) => document.getElementById(id);

  // Tabs
  const screens = {
    exchange: $("screen-exchange"),
    rules: $("screen-rules"),
    account: $("screen-account"),
  };

  const pills = Array.from(document.querySelectorAll(".topNav .pill"));

  function setTab(tab) {
    pills.forEach(b => b.classList.toggle("isActive", b.dataset.tab === tab));

    // "more" does not switch screen, it opens sheet
    if (tab === "more") {
      openSheet($("moreSheet"));
      return;
    }

    Object.values(screens).forEach(s => s.classList.add("isHidden"));
    if (screens[tab]) screens[tab].classList.remove("isHidden");
  }

  pills.forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));

  // Language popover (single button)
  const langBtn = $("langBtn");
  const langPopover = $("langPopover");
  const langBtnText = $("langBtnText");

  function openLangPopover() {
    const r = langBtn.getBoundingClientRect();
    langPopover.style.top = `${Math.round(r.bottom + 8)}px`;
    langPopover.style.left = `${Math.round(Math.min(r.left, window.innerWidth - 170))}px`;
    langPopover.classList.remove("isHidden");
    langBtn.setAttribute("aria-expanded", "true");
  }
  function closeLangPopover() {
    langPopover.classList.add("isHidden");
    langBtn.setAttribute("aria-expanded", "false");
  }

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (langPopover.classList.contains("isHidden")) openLangPopover();
    else closeLangPopover();
  });

  langPopover.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    langBtnText.textContent = btn.dataset.lang;
    closeLangPopover();
  });

  document.addEventListener("click", () => closeLangPopover());

  // Sheets open/close (ALWAYS closable)
  let openSheetEl = null;

  function openSheet(el) {
    if (!el) return;
    closeAnySheet();
    el.classList.remove("isHidden");
    el.setAttribute("aria-hidden", "false");
    openSheetEl = el;

    // prevent background from grabbing taps
    document.body.style.overflow = "hidden";
  }

  function closeAnySheet() {
    if (!openSheetEl) return;
    openSheetEl.classList.add("isHidden");
    openSheetEl.setAttribute("aria-hidden", "true");
    openSheetEl = null;
    document.body.style.overflow = "";
  }

  // backdrop/close buttons
  document.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close='1']");
    if (close) closeAnySheet();
  });

  // Android back button like behavior
  window.addEventListener("popstate", () => {
    if (openSheetEl) {
      closeAnySheet();
      history.pushState(null, "", location.href);
    }
  });
  history.pushState(null, "", location.href);

  // swipe down to close (simple)
  function enableSwipeToClose(sheetEl) {
    const panel = sheetEl.querySelector(".sheetPanel");
    let startY = 0, curY = 0, dragging = false;

    panel.addEventListener("touchstart", (e) => {
      if (!openSheetEl || openSheetEl !== sheetEl) return;
      dragging = true;
      startY = e.touches[0].clientY;
      curY = 0;
      panel.style.transition = "none";
    }, { passive: true });

    panel.addEventListener("touchmove", (e) => {
      if (!dragging) return;
      const y = e.touches[0].clientY;
      curY = Math.max(0, y - startY);
      panel.style.transform = `translateY(${curY}px)`;
    }, { passive: true });

    panel.addEventListener("touchend", () => {
      if (!dragging) return;
      dragging = false;
      panel.style.transition = "";
      if (curY > 120) {
        panel.style.transform = "";
        closeAnySheet();
      } else {
        panel.style.transform = "";
      }
    });
  }

  enableSwipeToClose($("moreSheet"));
  enableSwipeToClose($("pickerSheet"));

  // More menu actions (placeholders)
  $("moreSheet").addEventListener("click", (e) => {
    const item = e.target.closest("[data-open]");
    if (!item) return;
    closeAnySheet();
    // later you can route to real screens; for now just show Rules / Account
    if (item.dataset.open === "aml" || item.dataset.open === "faq" || item.dataset.open === "contacts" || item.dataset.open === "reviews") {
      // open rules screen as placeholder
      setTab("rules");
    }
  });

  // Exchange state (NO re-render)
  const giveSelect = $("giveSelect");
  const getSelect = $("getSelect");

  const giveIcon = $("giveIcon");
  const giveName = $("giveName");
  const giveCode = $("giveCode");

  const getIcon = $("getIcon");
  const getName = $("getName");
  const getCode = $("getCode");

  const giveAmount = $("giveAmount");
  const getAmount = $("getAmount");

  const swapBtn = $("swapBtn");

  // Demo assets: you already have ./logos/crypto/btc.png etc
  // Keep icons "as is" (you said do not reduce)
  const items = [
    { id:"mono_uah", group:"banks", name:"Monobank", code:"UAH", icon:"./logos/banks/mono.png" },
    { id:"privat_uah", group:"banks", name:"PrivatBank", code:"UAH", icon:"./logos/banks/privat.png" },
    { id:"btc", group:"top", name:"Bitcoin", code:"BTC", icon:"./logos/crypto/btc.png" },
    { id:"usdt_trc", group:"usdt", name:"Tether (TRC20)", code:"USDT", icon:"./logos/usdt/trc20.png" },
    { id:"usdt_bep", group:"usdt", name:"Tether (BEP20)", code:"USDT", icon:"./logos/usdt/bep20.png" },
    { id:"usdc_erc", group:"usdc", name:"USD Coin (ERC20)", code:"USDC", icon:"./logos/usdc/erc20.png" },
    { id:"usdc_pol", group:"usdc", name:"USD Coin (POL)", code:"USDC", icon:"./logos/usdc/pol.png" },
  ];

  // default selections
  let give = items.find(x => x.id === "mono_uah") || items[0];
  let get = items.find(x => x.id === "btc") || items[2];

  function applySelection(side, obj) {
    if (side === "give") {
      give = obj;
      giveIcon.src = obj.icon;
      giveIcon.alt = obj.name;
      giveName.textContent = obj.name;
      giveCode.textContent = obj.code;
    } else {
      get = obj;
      getIcon.src = obj.icon;
      getIcon.alt = obj.name;
      getName.textContent = obj.name;
      getCode.textContent = obj.code;
    }
    recalc();
  }

  // initial render
  applySelection("give", give);
  applySelection("get", get);

  // Picker sheet
  const pickerSheet = $("pickerSheet");
  const pickerTitle = $("pickerTitle");
  const pickerList = $("pickerList");
  const pickerSearch = $("pickerSearch");
  const pickerChips = $("pickerChips");

  let pickerSide = "give";
  let activeChip = "all";

  function renderPicker() {
    const q = (pickerSearch.value || "").trim().toLowerCase();
    const filtered = items.filter(it => {
      const inChip = activeChip === "all" ? true : (it.group === activeChip || (activeChip === "top" && it.group === "top"));
      const inText = !q ? true : (it.name.toLowerCase().includes(q) || it.code.toLowerCase().includes(q));
      return inChip && inText;
    });

    pickerList.innerHTML = "";
    filtered.forEach(it => {
      const div = document.createElement("div");
      div.className = "item";
      div.dataset.pick = it.id;
      div.innerHTML = `
        <img class="coinIcon" src="${it.icon}" alt="${it.name}" />
        <div class="itemMeta">
          <div class="itemName">${escapeHtml(it.name)}</div>
          <div class="itemSub">${escapeHtml(it.code)}</div>
        </div>
      `;
      pickerList.appendChild(div);
    });
  }

  function openPicker(side) {
    pickerSide = side;
    pickerTitle.textContent = side === "give" ? "Віддаєте" : "Отримуєте";
    pickerSearch.value = "";
    activeChip = "all";
    Array.from(pickerChips.querySelectorAll(".chip")).forEach(c => c.classList.toggle("isActive", c.dataset.chip === "all"));
    renderPicker();
    openSheet(pickerSheet);
    // focus search a bit later (avoid android weird)
    setTimeout(() => pickerSearch.focus(), 120);
  }

  giveSelect.addEventListener("click", () => openPicker("give"));
  getSelect.addEventListener("click", () => openPicker("get"));

  pickerSearch.addEventListener("input", () => renderPicker());

  pickerChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeChip = chip.dataset.chip;
    Array.from(pickerChips.querySelectorAll(".chip")).forEach(c => c.classList.toggle("isActive", c === chip));
    renderPicker();
  });

  pickerList.addEventListener("click", (e) => {
    const row = e.target.closest("[data-pick]");
    if (!row) return;
    const picked = items.find(x => x.id === row.dataset.pick);
    if (!picked) return;
    applySelection(pickerSide, picked);
    closeAnySheet();
  });

  // Swap
  swapBtn.addEventListener("click", () => {
    const tmp = give;
    applySelection("give", get);
    applySelection("get", tmp);
  });

  // Input focus fix: do NOT replace input elements.
  // sanitize + recalc without re-render
  giveAmount.addEventListener("input", () => {
    const clean = normalizeNumber(giveAmount.value);
    if (giveAmount.value !== clean) {
      // keep caret as best as possible
      const pos = giveAmount.selectionStart;
      giveAmount.value = clean;
      try { giveAmount.setSelectionRange(pos, pos); } catch(e){}
    }
    recalc();
  });

  function recalc() {
    // placeholder conversion – later you plug real rates
    const n = parseFloat((giveAmount.value || "0").replace(",", "."));
    if (!isFinite(n) || n <= 0) {
      getAmount.value = "0";
      return;
    }

    // simple demo: UAH->BTC-like tiny / crypto->UAH-like big
    let out = n;

    const giveIsFiat = give.code === "UAH";
    const getIsFiat = get.code === "UAH";

    if (giveIsFiat && get.code === "BTC") out = n * 0.00000065;
    else if (give.code === "BTC" && getIsFiat) out = n * 1500000;
    else out = n * 1; // stub

    getAmount.value = formatOut(out);
  }

  function normalizeNumber(v) {
    // allow digits + one dot/comma
    let s = (v || "").replace(/[^\d.,]/g, "");
    const parts = s.split(/[.,]/);
    if (parts.length > 2) {
      s = parts[0] + "." + parts.slice(1).join("");
    }
    s = s.replace(",", ".");
    // avoid leading zeros like 00012 -> 12 (but keep "0.x")
    if (s.startsWith("0") && s.length > 1 && s[1] !== ".") {
      s = String(parseInt(s, 10));
      if (s === "NaN") s = "0";
    }
    return s;
  }

  function formatOut(x) {
    if (!isFinite(x)) return "0";
    if (x < 1) return x.toFixed(8).replace(/0+$/,"").replace(/\.$/,"");
    if (x < 1000) return x.toFixed(2).replace(/\.00$/,"");
    return Math.round(x).toString();
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  // Continue button (placeholder)
  $("continueBtn").addEventListener("click", () => {
    alert("Далі зробимо заявку/деталі. (Поки заглушка)");
  });

  // IMPORTANT: ensure no “dead overlay” remains clickable
  // (if any old overlays existed in previous code, they are gone now)
})();
