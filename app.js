(() => {
  function showError(err) {
    const el = document.getElementById("app") || document.body;
    const msg = (err && (err.stack || err.message)) ? (err.stack || err.message) : String(err);

    el.innerHTML = `
      <div style="max-width:720px;margin:0 auto;padding:16px;font-family:system-ui">
        <div style="background:#fff;border:1px solid rgba(15,23,42,.12);border-radius:16px;padding:14px">
          <div style="font-weight:900;font-size:18px;color:#b91c1c">App crashed 😬</div>
          <div style="margin-top:10px;color:#0f172a;font-weight:700">Ошибка:</div>
          <pre style="white-space:pre-wrap;background:#0b1220;color:#e2e8f0;padding:12px;border-radius:12px;overflow:auto;margin-top:8px">${msg}</pre>

          <div style="margin-top:12px;color:#64748b;font-weight:700">
            Проверь, что эти ссылки открываются без 404:
            <div style="margin-top:8px">
              <div>• /index.html</div>
              <div>• /app.js</div>
              <div>• /style.css</div>
              <div>• /logo.png</div>
              <div>• /logos/crypto/btc.png (и другие)</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  try {
    // Если app.js вообще загрузился — покажем это
    const root = document.getElementById("app");
    if (!root) throw new Error("No #app element in DOM");

    // Telegram init (без падений)
    const tg = window.Telegram?.WebApp;
    if (tg) {
      try { tg.ready(); tg.expand(); } catch {}
      try {
        const top = (tg.safeAreaInset?.top ?? 10) + 18;
        const bottom = (tg.safeAreaInset?.bottom ?? 10) + 10;
        document.documentElement.style.setProperty("--safeTop", `${Math.max(10, top)}px`);
        document.documentElement.style.setProperty("--safeBottom", `${Math.max(10, bottom)}px`);
      } catch {}
    }

    // Быстрый тест путей (если 404 — сразу видно)
    const mustExist = [
      "./style.css",
      "./logo.png",
      "./logos/crypto/btc.png",
    ];

    root.innerHTML = `
      <div style="max-width:720px;margin:0 auto;padding:16px;font-family:system-ui">
        <div style="background:#fff;border:1px solid rgba(15,23,42,.12);border-radius:16px;padding:14px">
          <div style="font-weight:900;font-size:18px">app.js loaded ✅</div>
          <div style="margin-top:10px;color:#64748b;font-weight:700">Проверяю файлы…</div>
          <div id="checks" style="margin-top:10px"></div>
          <div style="margin-top:14px;color:#0f172a;font-weight:900">Если тут всё ок — вернём основной код.</div>
        </div>
      </div>
    `;

    const checks = document.getElementById("checks");

    Promise.all(mustExist.map(async (p) => {
      const r = await fetch(p, { cache: "no-store" });
      return { p, ok: r.ok, status: r.status };
    })).then(results => {
      checks.innerHTML = results.map(x => {
        const color = x.ok ? "#16a34a" : "#b91c1c";
        const text = x.ok ? "OK" : "NOT FOUND";
        return `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid rgba(15,23,42,.08)">
          <div style="font-weight:800">${x.p}</div>
          <div style="font-weight:900;color:${color}">${text} (${x.status})</div>
        </div>`;
      }).join("");

      const any404 = results.some(x => !x.ok);
      if (any404) {
        checks.insertAdjacentHTML("beforeend", `
          <div style="margin-top:12px;color:#b91c1c;font-weight:900">
            Есть 404. Значит проблема НЕ в коде, а в путях/именах файлов или в том, что GitHub Pages отдаёт не ту папку.
          </div>
        `);
      } else {
        checks.insertAdjacentHTML("beforeend", `
          <div style="margin-top:12px;color:#16a34a;font-weight:900">
            Пути живые ✅ Можно возвращать основной интерфейс.
          </div>
        `);
      }
    }).catch(showError);

  } catch (err) {
    showError(err);
  }
})();
