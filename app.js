:root{
  --bg:#eaf4ff;
  --card:#ffffff;
  --text:#0b1220;
  --muted:#6b7280;
  --blue:#11a6dc;
  --blue2:#0b86c7;
  --stroke:rgba(12, 31, 54, .08);
  --shadow: 0 10px 30px rgba(11,18,32,.10);
  --radius:22px;
  --safeTop: env(safe-area-inset-top, 0px);
  --safeBottom: env(safe-area-inset-bottom, 0px);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  background: linear-gradient(180deg, #d7efff 0%, #edf7ff 45%, #f6fbff 100%);
  color:var(--text);
}

.app{
  min-height:100%;
  display:flex;
  flex-direction:column;
  padding-top: calc(10px + var(--safeTop));
  padding-bottom: calc(72px + var(--safeBottom));
}

.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 8px 14px;
}

.brand{
  display:flex;
  align-items:center;
  gap:10px;
}

.brandLogo{
  height:52px; /* bigger logo */
  width:auto;
  border-radius:14px;
}

.brandText{display:flex;flex-direction:column;line-height:1.05}
.brandName{font-size:20px;font-weight:900;letter-spacing:.2px}
.brandSub{font-size:12px;color:var(--muted);font-weight:600}

.topActions{display:flex;align-items:center;gap:8px}

.langBtn{
  border:1px solid var(--stroke);
  background: rgba(255,255,255,.65);
  backdrop-filter: blur(10px);
  border-radius:14px;
  padding:8px 10px;
  display:flex;
  align-items:center;
  gap:8px;
  font-weight:800;
  cursor:pointer;
}
.langIcon{width:18px;height:18px;border-radius:6px}
.chev{opacity:.7}

.content{
  padding: 0 14px;
  flex:1;
}

.card{
  background: rgba(255,255,255,.78);
  backdrop-filter: blur(10px);
  border:1px solid var(--stroke);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow:hidden;
}

.hero{padding:16px}

.heroTitle{font-size:22px;font-weight:900;margin-bottom:4px}
.heroSub{color:var(--muted);font-weight:600;font-size:13px;margin-bottom:14px}

.exchangeBox{display:grid;gap:14px}

.panel{
  background: rgba(255,255,255,.85);
  border:1px solid var(--stroke);
  border-radius: 20px;
  padding: 14px;
}

.panelHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.panelTitle{font-size:18px;font-weight:900;color:#3b3f46}

.selectors{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
  margin-bottom:12px;
}

.select{
  width:100%;
  border:1px solid var(--stroke);
  background:#fff;
  border-radius:18px;
  padding:10px 10px;
  display:flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
  text-align:left;
}

.select.small{border-radius:16px;padding:10px}

.selIcon{
  width:34px;
  height:34px;
  border-radius:12px;
  background:#f2f5f9;
  border:1px solid rgba(0,0,0,.04);
  object-fit:cover;
  flex:0 0 auto;
}
.selText{flex:1;min-width:0}
.selTitle{font-weight:900;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.selSub{color:var(--muted);font-weight:700;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.amountBox{
  border:1px dashed rgba(11,18,32,.12);
  border-radius:18px;
  padding:12px;
  background: rgba(245,250,255,.6);
}

.amountLabel{color:var(--muted);font-weight:800;margin-bottom:8px}
.amountRow{display:flex;align-items:center;gap:10px}
.amountInput{
  border:none;
  outline:none;
  background:transparent;
  font-size:44px;
  font-weight:900;
  width:100%;
  color:#1a2333;
}
.amountBadge{
  border:1px solid var(--stroke);
  background:#fff;
  border-radius:999px;
  padding:8px 12px;
  font-weight:900;
  font-size:12px;
}

.amountHint{margin-top:6px;color:rgba(107,114,128,.9);font-weight:700;font-size:12px}

.resultBox{
  border:1px solid rgba(11,18,32,.12);
  border-radius:18px;
  padding:12px;
  background:#fff;
  margin-bottom:12px;
}
.resultLabel{color:var(--muted);font-weight:900;margin-bottom:8px}
.resultValue{font-size:46px;font-weight:950;color:#0b1220}

.primary{
  width:100%;
  border:none;
  border-radius: 18px;
  padding:16px 14px;
  background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
  color:#fff;
  font-weight:950;
  font-size:18px;
  cursor:pointer;
  box-shadow: 0 12px 26px rgba(17,166,220,.28);
}

.swapWrap{display:flex;justify-content:center}
.swapBtn{
  width:76px;height:76px;
  border-radius:22px;
  border:none;
  background: linear-gradient(180deg, #1fb7e8 0%, #0d84c8 100%);
  box-shadow: 0 18px 30px rgba(13,132,200,.28);
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  position:relative;
}
.swapBtn img{width:26px;height:26px;filter:brightness(0) invert(1)}
.swapFallback{position:absolute;opacity:0;color:#fff;font-size:28px;font-weight:900}
.swapBtn img[style*="display: none"] ~ .swapFallback{opacity:1}

.cardPay{
  margin-top:12px;
  border:1px solid var(--stroke);
  border-radius:18px;
  background:#fff;
  padding:12px;
}

.cardPayTitle{font-weight:950;margin-bottom:10px}

.field{display:grid;gap:6px;margin-bottom:10px}
.field label{font-size:12px;font-weight:900;color:rgba(11,18,32,.72)}
.textInput{
  width:100%;
  border:1px solid var(--stroke);
  border-radius:16px;
  padding:12px 12px;
  font-size:14px;
  font-weight:800;
  outline:none;
  background:#fff;
}

.page{display:none}
.page.active{display:block}

.pageTitle{font-size:20px;font-weight:950;margin-bottom:10px}
.muted{color:var(--muted);font-weight:700}

.historyList{margin-top:12px;display:grid;gap:10px}
.hItem{
  border:1px solid var(--stroke);
  background:#fff;
  border-radius:18px;
  padding:12px;
  display:flex;
  justify-content:space-between;
  gap:10px;
}
.hLeft{display:grid;gap:2px}
.hTitle{font-weight:950}
.hSub{color:var(--muted);font-weight:750;font-size:12px}
.hRight{font-weight:950}

.profileCard{padding:14px}
.profileHead{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.avatar{
  width:44px;height:44px;
  border-radius:16px;
  background:#eef2ff;
  display:flex;align-items:center;justify-content:center;
  font-weight:950;color:#3b82f6;
}
.profileName{font-size:16px;font-weight:950}
.profileRank{color:var(--muted);font-weight:800;font-size:12px}

.list{display:grid;gap:8px}
.listItem{
  width:100%;
  border:1px solid var(--stroke);
  background:#fff;
  border-radius:18px;
  padding:12px;
  display:flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
}
.liIcon{width:26px;display:flex;justify-content:center}
.liText{flex:1;font-weight:900}
.liRight{color:var(--muted);font-weight:900}
.liChev{opacity:.6;font-size:18px}

.sectionLabel{
  margin-top:8px;
  color:rgba(107,114,128,.7);
  font-weight:950;
  font-size:12px;
  letter-spacing:.6px;
  text-transform:uppercase;
  padding: 6px 4px 0;
}

/* Bottom nav */
.bottomNav{
  position:fixed;
  left:0;right:0;bottom:0;
  padding-bottom: var(--safeBottom);
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(10px);
  border-top:1px solid var(--stroke);
  display:flex;
  justify-content:space-around;
  height:64px;
}

.navBtn{
  border:none;
  background:transparent;
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:4px;
  cursor:pointer;
  color:rgba(11,18,32,.55);
  font-weight:900;
}
.navBtn.active{color:#0d84c8}
.navIcon svg{width:22px;height:22px;fill:currentColor} /* ровно */

.navText{font-size:11px}

/* Modal - NO BACKDROP */
.modal{
  position:fixed;
  left:0;right:0;top:0;bottom:0;
  display:none;
  align-items:flex-end;
  justify-content:center;
  padding: 0 12px calc(12px + var(--safeBottom));
  background:transparent; /* important */
}
.modal.show{display:flex}

.modalSheet{
  width:100%;
  max-width:520px;
  background:#fff;
  border-radius: 22px;
  border:1px solid var(--stroke);
  box-shadow: var(--shadow);
  overflow:hidden;
}

.modalHead{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 14px 10px;
}
.modalTitle{font-weight:950;font-size:18px}
.iconBtn{
  border:none;background:#f3f6fb;
  width:36px;height:36px;border-radius:14px;
  cursor:pointer;font-weight:950;
}

.modalBody{
  padding: 0 12px 14px;
  max-height: 56vh;
  overflow:auto;
}

.modalItem{
  width:100%;
  border:1px solid var(--stroke);
  background:#fff;
  border-radius:18px;
  padding:12px;
  display:flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
  margin-bottom:10px;
}
.modalItem img{width:36px;height:36px;border-radius:14px;background:#f2f5f9;border:1px solid rgba(0,0,0,.04)}
.miText{flex:1;min-width:0}
.miTitle{font-weight:950}
.miSub{color:var(--muted);font-weight:800;font-size:12px}
.miChev{opacity:.6;font-size:18px}

/* show card fields only when JS turns it on */
#cardFields{display:none}

@media (max-width:420px){
  .selectors{grid-template-columns:1fr}
  .amountInput{font-size:40px}
  .resultValue{font-size:40px}
  .swapBtn{width:70px;height:70px}
  .brandLogo{height:48px}
}
