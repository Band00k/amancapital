
const charts = new Map();

function $(id){ return document.getElementById(id); }
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }

function initConfig(){
  document.title = `${SITE_CONFIG.brand} | Stock Vault`;
  $("brandName").textContent = SITE_CONFIG.brand;
  $("pageTitle").textContent = SITE_CONFIG.pageTitle;
  $("pageSubtitle").textContent = SITE_CONFIG.pageSubtitle;
  $("updatedOn").textContent = SITE_CONFIG.updatedOn;
  $("dmKeyword").textContent = SITE_CONFIG.dmKeyword;

  ["pdfHeroBtn","pdfMainBtn","footerPdf"].forEach(id => $(id).href = SITE_CONFIG.pdfUrl);
  $("telegramBtn").href = SITE_CONFIG.telegramUrl;
  $("whatsappBtn").href = SITE_CONFIG.whatsappUrl;
  $("youtubeBtn").href = SITE_CONFIG.youtubeUrl;
  $("instagramBtn").href = SITE_CONFIG.instagramUrl;
}

function stockCard(stock){
  return `
  <article class="stock-card" data-rank="${stock.rank}" data-risk="${stock.risk}" data-score="${stock.aiScore}">
    <div class="stock-rank">0${stock.rank}</div>
    <div class="stock-top">
      <span class="stock-symbol">${stock.symbol}</span>
      <span class="badge">${stock.badge}</span>
    </div>
    <h3 class="stock-name">${stock.name}</h3>
    <div class="stock-sector">${stock.sector}</div>
    <div class="price-row">
      <strong>${stock.price}</strong>
      <div class="score-label">AI RESEARCH SCORE <b>${stock.aiScore}/100</b></div>
    </div>
    <div class="chart-wrap"><canvas id="chart-${stock.rank}"></canvas></div>
    <div class="meter-row">
      <div class="metric">
        <div class="metric-head"><span>Risk meter</span><b>${stock.risk}%</b></div>
        <div class="meter"><i class="risk-fill" style="width:${clamp(stock.risk,0,100)}%"></i></div>
      </div>
      <div class="metric">
        <div class="metric-head"><span>AI score</span><b>${stock.aiScore}%</b></div>
        <div class="meter"><i class="score-fill" style="width:${clamp(stock.aiScore,0,100)}%"></i></div>
      </div>
    </div>
    <p class="card-summary">${stock.summary}</p>
    <div class="card-footer">
      <span class="stock-symbol">Research candidate #${stock.rank}</span>
      <button class="details-btn" data-stock="${stock.rank}">Full details →</button>
    </div>
  </article>`;
}

function renderStocks(list = STOCKS){
  charts.forEach(chart => chart.destroy());
  charts.clear();
  $("stockGrid").innerHTML = list.map(stockCard).join("");

  list.forEach(stock => {
    const ctx = document.getElementById(`chart-${stock.rank}`);
    if(!ctx || !window.Chart) return;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stock.chart.map((_,i)=>i+1),
        datasets: [{
          data: stock.chart,
          borderColor: "#42f59e",
          backgroundColor: "rgba(66,245,158,.08)",
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
          tension: .36
        }]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false},tooltip:{enabled:false}},
        scales:{x:{display:false},y:{display:false}},
        animation:{duration:700}
      }
    });
    charts.set(stock.rank, chart);
  });
}

function renderReels(){
  $("reelGrid").innerHTML = NEXT_REELS.map((r,i)=>`
    <a class="reel-card" href="${r.url}">
      <span>${r.tag}</span>
      <h3>${r.title}</h3>
      <b>Watch next →</b>
    </a>
  `).join("");
}

function openModal(rank){
  const stock = STOCKS.find(s=>s.rank===Number(rank));
  if(!stock) return;
  $("modalContent").innerHTML = `
    <span class="eyebrow">${stock.symbol} · ${stock.sector}</span>
    <h3>${stock.name}</h3>
    <p class="modal-sub">${stock.summary}</p>
    <div class="meter-row">
      <div class="metric"><div class="metric-head"><span>Risk meter</span><b>${stock.risk}%</b></div><div class="meter"><i class="risk-fill" style="width:${stock.risk}%"></i></div></div>
      <div class="metric"><div class="metric-head"><span>AI research score</span><b>${stock.aiScore}%</b></div><div class="meter"><i class="score-fill" style="width:${stock.aiScore}%"></i></div></div>
    </div>
    <div class="detail-columns">
      <div class="detail-box"><b>Positive research points</b><ul>${stock.positives.map(x=>`<li>${x}</li>`).join("")}</ul></div>
      <div class="detail-box"><b>Major risks</b><ul>${stock.risks.map(x=>`<li>${x}</li>`).join("")}</ul></div>
    </div>
    <p class="modal-sub"><b>Reminder:</b> This score is your own editorial research score, not an investment recommendation or a predictive AI model.</p>
  `;
  $("stockModal").classList.add("open");
  $("stockModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}

function closeModal(){
  $("stockModal").classList.remove("open");
  $("stockModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}

async function handleLeadForm(event){
  event.preventDefault();
  const form = event.currentTarget;
  const msg = $("formMessage");
  const data = Object.fromEntries(new FormData(form).entries());

  if(SITE_CONFIG.formspreeEndpoint){
    try{
      msg.textContent = "Submitting...";
      const response = await fetch(SITE_CONFIG.formspreeEndpoint,{
        method:"POST",
        headers:{"Accept":"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      if(!response.ok) throw new Error("Submission failed");
      msg.textContent = "Submitted. Future reports will reach your inbox.";
      form.reset();
    }catch(error){
      msg.textContent = "Form service error. Please verify the Formspree endpoint.";
    }
  }else{
    const leads = JSON.parse(localStorage.getItem("amanCapitalLeads") || "[]");
    leads.push({...data,createdAt:new Date().toISOString()});
    localStorage.setItem("amanCapitalLeads",JSON.stringify(leads));
    msg.textContent = "Demo mode: saved in this browser. Add Formspree endpoint to receive it.";
    form.reset();
  }
}

document.addEventListener("click",e=>{
  const details = e.target.closest("[data-stock]");
  if(details) openModal(details.dataset.stock);
  if(e.target.matches("[data-close-modal]")) closeModal();

  const pill = e.target.closest(".pill");
  if(pill){
    document.querySelectorAll(".pill").forEach(p=>p.classList.remove("active"));
    pill.classList.add("active");
    const type = pill.dataset.filter;
    const list = [...STOCKS];
    if(type==="risk") list.sort((a,b)=>b.risk-a.risk);
    if(type==="score") list.sort((a,b)=>b.aiScore-a.aiScore);
    renderStocks(list);
  }
});

document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });
$("leadForm").addEventListener("submit",handleLeadForm);

initConfig();
renderStocks();
renderReels();
