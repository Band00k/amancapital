/* =========================================================
   AMAN CAPITAL STOCK VAULT
   PROFESSIONAL AI RESEARCH SCORE SYSTEM

   IMPORTANT:
   - This is a rule-based research score.
   - It is NOT a price prediction.
   - Update financial inputs after every quarterly result.
========================================================= */

const SITE_CONFIG = {
  brand: "Aman Capital",

  pageTitle: "Top 5 Under ₹10 Stock Watchlist",

  pageSubtitle:
    "Fundamental quality, growth, risk and governance based research scoring",

  updatedOn: "18 July 2026",

  telegramUrl: "https://t.me/chart_wisdom",

  whatsappUrl:
    "https://chat.whatsapp.com/ENVEVv7DLgFJCjlMsjUWfP",

  youtubeUrl:
    "https://www.youtube.com/@AmanCapitalAcademy",

  instagramUrl:
    "https://instagram.com/trader_ammy",

  pdfUrl:
    "top-5-under-10-watchlist.pdf",

  formspreeEndpoint: "",

  dmKeyword: "CROREPATI"
};


/* =========================================================
   AI SCORE WEIGHTS

   Total = 100%

   Financial Strength      20%
   Revenue Growth          15%
   Profit Growth           15%
   Profitability           10%
   Debt Position           10%
   Cash Flow               10%
   Promoter Quality        10%
   Valuation                5%
   Liquidity                5%
========================================================= */

const AI_SCORE_WEIGHTS = {
  financialStrength: 0.20,
  revenueGrowth: 0.15,
  profitGrowth: 0.15,
  profitability: 0.10,
  debtPosition: 0.10,
  cashFlow: 0.10,
  promoterQuality: 0.10,
  valuation: 0.05,
  liquidity: 0.05
};


/* =========================================================
   SCORE CALCULATION
========================================================= */

function calculateAIScore(metrics) {

  let totalScore = 0;

  Object.keys(AI_SCORE_WEIGHTS).forEach(metricName => {

    const metricScore =
      Number(metrics[metricName]) || 0;

    const validScore =
      Math.min(100, Math.max(0, metricScore));

    totalScore +=
      validScore * AI_SCORE_WEIGHTS[metricName];

  });

  return Math.round(totalScore);
}


/* =========================================================
   RISK SCORE CALCULATION

   Higher number = Higher risk
========================================================= */

function calculateRiskScore(riskMetrics) {

  const weights = {
    volatility: 0.20,
    governanceRisk: 0.20,
    debtRisk: 0.15,
    liquidityRisk: 0.15,
    dilutionRisk: 0.10,
    businessRisk: 0.10,
    promoterRisk: 0.10
  };

  let totalRisk = 0;

  Object.keys(weights).forEach(metricName => {

    const metricScore =
      Number(riskMetrics[metricName]) || 0;

    const validScore =
      Math.min(100, Math.max(0, metricScore));

    totalRisk +=
      validScore * weights[metricName];

  });

  return Math.round(totalRisk);
}


/* =========================================================
   AI SCORE RATING
========================================================= */

function getAIScoreRating(score) {

  if (score >= 80) {
    return "Strong Research Score";
  }

  if (score >= 70) {
    return "Above Average";
  }

  if (score >= 60) {
    return "Moderate";
  }

  if (score >= 50) {
    return "Weak";
  }

  return "Very Weak";
}


/* =========================================================
   RISK BADGE
========================================================= */

function getRiskBadge(riskScore) {

  if (riskScore >= 90) {
    return "Extreme Risk";
  }

  if (riskScore >= 80) {
    return "Very High Risk";
  }

  if (riskScore >= 70) {
    return "High Risk";
  }

  if (riskScore >= 55) {
    return "Moderate Risk";
  }

  return "Lower Risk";
}


/* =========================================================
   CONFIDENCE SCORE

   Data completeness determines confidence.

   100 = all important data verified
   50  = incomplete information
========================================================= */

function calculateConfidenceScore(dataQuality) {

  const values = Object.values(dataQuality);

  if (!values.length) {
    return 0;
  }

  const total =
    values.reduce((sum, value) => {
      return sum + Number(value || 0);
    }, 0);

  return Math.round(total / values.length);
}


/* =========================================================
   STOCK DATA

   NOTE:
   Metric values below are EDITORIAL RESEARCH INPUTS.
   Verify and update them using latest quarterly results,
   annual reports and exchange filings before publishing.
========================================================= */

const RAW_STOCKS = [

  /* =======================================================
     1. SARVESHWAR FOODS
  ======================================================= */

  {
    rank: 1,

    name: "Sarveshwar Foods",

    symbol: "NSE:SARVESHWAR",

    sector: "FMCG / Rice Processing",

    price: "Check Latest Price",

    summary:
      "Rice processing, branded food and export-oriented business. The main research angle is whether revenue growth can translate into stronger margins, cash flow and sustainable profitability.",

    financialMetrics: {
      financialStrength: 62,
      revenueGrowth: 76,
      profitGrowth: 68,
      profitability: 54,
      debtPosition: 58,
      cashFlow: 50,
      promoterQuality: 65,
      valuation: 58,
      liquidity: 72
    },

    riskMetrics: {
      volatility: 78,
      governanceRisk: 60,
      debtRisk: 57,
      liquidityRisk: 48,
      dilutionRisk: 65,
      businessRisk: 62,
      promoterRisk: 55
    },

    dataQuality: {
      financialResults: 85,
      annualReport: 85,
      shareholdingData: 90,
      cashFlowData: 75,
      valuationData: 75
    },

    positives: [
      "Exposure to branded and packaged food segment",
      "Rice processing and export business",
      "Potential benefit from improving food demand",
      "Revenue expansion can provide operating leverage"
    ],

    risks: [
      "Commodity-price fluctuations can affect margins",
      "Working-capital requirements may remain high",
      "Low-margin business model",
      "Small-cap and penny-stock volatility"
    ],

    chart: [
      42, 46, 44, 51, 55,
      53, 61, 66, 63, 69
    ],

    sources: [
      {
        name: "NSE company filings",
        url: "https://www.nseindia.com/get-quotes/equity?symbol=SARVESHWAR"
      }
    ]
  },


  /* =======================================================
     2. VIKAS LIFECARE
  ======================================================= */

  {
    rank: 2,

    name: "Vikas Lifecare",

    symbol: "NSE:VIKASLIFE",

    sector: "Polymers / Chemicals / Trading",

    price: "Check Latest Price",

    summary:
      "A highly speculative small-cap business with exposure to polymers, chemicals and multiple business initiatives. The core question is whether business expansion produces consistent profits and operating cash flow.",

    financialMetrics: {
      financialStrength: 38,
      revenueGrowth: 52,
      profitGrowth: 34,
      profitability: 30,
      debtPosition: 48,
      cashFlow: 28,
      promoterQuality: 37,
      valuation: 52,
      liquidity: 63
    },

    riskMetrics: {
      volatility: 95,
      governanceRisk: 84,
      debtRisk: 67,
      liquidityRisk: 64,
      dilutionRisk: 88,
      businessRisk: 85,
      promoterRisk: 82
    },

    dataQuality: {
      financialResults: 75,
      annualReport: 70,
      shareholdingData: 85,
      cashFlowData: 65,
      valuationData: 65
    },

    positives: [
      "Exposure to polymer and chemical products",
      "Multiple potential business verticals",
      "Low nominal share price attracts trading interest",
      "Possible operating leverage if execution improves"
    ],

    risks: [
      "Inconsistent financial performance",
      "Very high share-price volatility",
      "Possible equity dilution risk",
      "Complex business structure",
      "Weak cash-flow visibility"
    ],

    chart: [
      65, 57, 61, 49, 54,
      43, 51, 46, 48, 44
    ],

    sources: [
      {
        name: "NSE corporate filings",
        url: "https://www.nseindia.com/"
      },
      {
        name: "Company disclosures",
        url: "#"
      }
    ]
  },


  /* =======================================================
     3. AKME FINTRADE INDIA
  ======================================================= */

  {
    rank: 3,

    name: "Akme Fintrade India",

    symbol: "NSE:AFIL",

    sector: "NBFC / Retail Lending",

    price: "Check Latest Price",

    summary:
      "A retail-focused NBFC serving vehicle, small-business and secured-loan customers. Asset quality, collection efficiency, capital adequacy and borrowing costs are more important than the low share price.",

    financialMetrics: {
      financialStrength: 66,
      revenueGrowth: 69,
      profitGrowth: 65,
      profitability: 62,
      debtPosition: 56,
      cashFlow: 58,
      promoterQuality: 64,
      valuation: 70,
      liquidity: 52
    },

    riskMetrics: {
      volatility: 82,
      governanceRisk: 58,
      debtRisk: 71,
      liquidityRisk: 72,
      dilutionRisk: 52,
      businessRisk: 68,
      promoterRisk: 55
    },

    dataQuality: {
      financialResults: 90,
      annualReport: 85,
      shareholdingData: 90,
      cashFlowData: 80,
      valuationData: 80
    },

    positives: [
      "Exposure to retail and small-business lending",
      "Potential growth in underserved credit markets",
      "Secured lending can reduce part of credit risk",
      "Operating leverage possible with loan-book growth"
    ],

    risks: [
      "Credit-cost and non-performing-asset risk",
      "Dependence on borrowing availability",
      "Relatively limited listed-market track record",
      "Low trading liquidity can increase volatility"
    ],

    chart: [
      48, 52, 57, 55, 61,
      64, 60, 67, 71, 69
    ],

    sources: [
      {
        name: "NSE company page",
        url: "https://www.nseindia.com/get-quotes/equity?symbol=AFIL"
      },
      {
        name: "Company website",
        url: "https://www.akmefintrade.com/"
      }
    ]
  },


  /* =======================================================
     4. FILATEX FASHIONS
  ======================================================= */

  {
    rank: 4,

    name: "Filatex Fashions",

    symbol: "NSE:FILATFASH",

    sector: "Textiles / Fashion",

    price: "Check Latest Price",

    summary:
      "A speculative textile-category company where governance quality, actual operating performance, cash flow and equity dilution require closer attention than social-media excitement.",

    financialMetrics: {
      financialStrength: 32,
      revenueGrowth: 43,
      profitGrowth: 29,
      profitability: 31,
      debtPosition: 49,
      cashFlow: 25,
      promoterQuality: 30,
      valuation: 48,
      liquidity: 58
    },

    riskMetrics: {
      volatility: 96,
      governanceRisk: 93,
      debtRisk: 66,
      liquidityRisk: 70,
      dilutionRisk: 92,
      businessRisk: 88,
      promoterRisk: 91
    },

    dataQuality: {
      financialResults: 68,
      annualReport: 65,
      shareholdingData: 78,
      cashFlowData: 58,
      valuationData: 60
    },

    positives: [
      "Exposure to textile and apparel demand",
      "Potential turnaround narrative",
      "Low nominal price may attract market attention"
    ],

    risks: [
      "Very high governance and disclosure risk",
      "Weak operating-cash-flow visibility",
      "Possible dilution and capital-structure concerns",
      "Extremely high speculative volatility",
      "Low institutional participation"
    ],

    chart: [
      72, 61, 66, 54, 58,
      47, 52, 44, 40, 38
    ],

    sources: [
      {
        name: "NSE corporate filings",
        url: "https://www.nseindia.com/"
      },
      {
        name: "BSE corporate filings",
        url: "https://www.bseindia.com/"
      }
    ]
  },


  /* =======================================================
     5. EVEXIA LIFECARE
  ======================================================= */

  {
    rank: 5,

    name: "Evexia Lifecare",

    symbol: "BSE:524444",

    sector: "Chemical Trading / Healthcare",

    price: "Check Latest Price",

    summary:
      "A highly speculative company associated with chemical trading and healthcare-related business initiatives. Investors should focus on revenue quality, recurring profits, cash flow and execution rather than the healthcare label alone.",

    financialMetrics: {
      financialStrength: 37,
      revenueGrowth: 48,
      profitGrowth: 35,
      profitability: 32,
      debtPosition: 53,
      cashFlow: 29,
      promoterQuality: 39,
      valuation: 51,
      liquidity: 55
    },

    riskMetrics: {
      volatility: 94,
      governanceRisk: 85,
      debtRisk: 63,
      liquidityRisk: 75,
      dilutionRisk: 86,
      businessRisk: 87,
      promoterRisk: 81
    },

    dataQuality: {
      financialResults: 75,
      annualReport: 70,
      shareholdingData: 80,
      cashFlowData: 62,
      valuationData: 65
    },

    positives: [
      "Exposure to chemical and healthcare-related segments",
      "Possible business-turnaround narrative",
      "Diversified trading activities",
      "Potential operating improvement if execution stabilises"
    ],

    risks: [
      "Highly speculative business profile",
      "Weak earnings-quality visibility",
      "Possible equity-dilution risk",
      "Low liquidity and high volatility",
      "Turnaround execution remains uncertain"
    ],

    chart: [
      56, 51, 54, 46, 49,
      43, 47, 41, 44, 42
    ],

    sources: [
      {
        name: "Company website",
        url: "https://www.evexialifecare.com/"
      },
      {
        name: "BSE corporate filings",
        url: "https://www.bseindia.com/"
      }
    ]
  }

];


/* =========================================================
   FINAL PROCESSED STOCK ARRAY

   app.js will use this STOCKS array.
========================================================= */

const STOCKS = RAW_STOCKS.map(stock => {

  const aiScore =
    calculateAIScore(stock.financialMetrics);

  const risk =
    calculateRiskScore(stock.riskMetrics);

  const confidence =
    calculateConfidenceScore(stock.dataQuality);

  return {

    ...stock,

    aiScore: aiScore,

    risk: risk,

    confidenceScore: confidence,

    aiRating:
      getAIScoreRating(aiScore),

    badge:
      getRiskBadge(risk)

  };

});


/* =========================================================
   NEXT REEL SUGGESTIONS
========================================================= */

const NEXT_REELS = [

  {
    title:
      "₹50 se kam ke 5 growth stocks",

    tag:
      "Next Watchlist",

    url:
      "#"
  },

  {
    title:
      "Penny stocks me operator activity kaise pehchane?",

    tag:
      "Risk Education",

    url:
      "#"
  },

  {
    title:
      "Penny stock analyse karne ka 7-point formula",

    tag:
      "Beginner Guide",

    url:
      "#"
  }

];
