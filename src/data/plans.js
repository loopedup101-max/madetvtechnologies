const sharedFeatures = [
  "Free domain + SSL + CDN",
  "Malware scan & removal",
  "Domain privacy (1yr)",
  "24/7 chat + phone support",
];

const serverFeatures = [
  "Free SSL + CDN",
  "DDoS protection",
  "Full root access",
  "24/7 chat + phone support",
];

const aiFeatures = [
  "Free SSL + CDN",
  "GPU acceleration",
  "API access",
  "24/7 chat + phone support",
];

function plan(name, tagline, price12, price36, renew, features, popular = false) {
  const calc = (p) => Math.round((1 - parseFloat(p) / parseFloat(renew)) * 100) + "%";
  return {
    name,
    tagline,
    popular,
    prices: {
      "12": { price: price12, savings: calc(price12), renewPrice: renew },
      "36": { price: price36, savings: calc(price36), renewPrice: renew },
    },
    features,
  };
}

export const planCategories = {
  standard: {
    label: "Standard",
    checkoutUrl: "https://hosting.com/hosting/",
    plans: [
      plan("Starter", "Perfect for personal sites and small projects getting started online", "3.99", "2.99", "5.99", ["20GB SSD storage", "1x CPU power", "1 website", "~25k monthly visits", ...sharedFeatures]),
      plan("Basic", "Ideal for small businesses launching their first web presence", "5.99", "4.99", "8.99", ["50GB SSD storage", "2x CPU power", "1 website", "~50k monthly visits", ...sharedFeatures]),
      plan("Plus", "Great for growing sites that need more resources and flexibility", "7.99", "6.99", "11.99", ["100GB SSD storage", "3x CPU power", "5 websites", "~100k monthly visits", ...sharedFeatures], true),
      plan("Choice", "Everything you need for multiple sites and higher traffic", "10.99", "8.99", "14.99", ["100GB SSD storage", "4x CPU power", "100 websites", "~200k monthly visits", ...sharedFeatures]),
    ],
  },
  high_performance: {
    label: "High Performance",
    checkoutUrl: "https://hosting.com/hosting/platforms/wordpress-hosting/",
    plans: [
      plan("Pro", "Crafted for growing companies needing power and flexibility", "12.99", "9.99", "16.99", ["100GB NVMe storage", "5x more CPU power", "100 websites", "~400k monthly visits", ...sharedFeatures]),
      plan("Premium", "Built for sites and apps prioritizing storage and CPU performance", "16.99", "13.99", "20.99", ["150GB NVMe storage", "6x more CPU power", "100 websites", "~400k monthly visits", ...sharedFeatures], true),
      plan("Enhanced", "For intensive sites and apps requiring powerful tools and storage", "19.99", "16.99", "24.99", ["200GB NVMe storage", "8x more CPU power", "100 websites", "~400k monthly visits", ...sharedFeatures]),
      plan("Elite", "For brands needing enterprise-grade infrastructure and performance", "22.99", "19.99", "28.99", ["250GB NVMe storage", "10x more CPU power", "100 websites", "~400k monthly visits", ...sharedFeatures]),
    ],
  },
  commerce: {
    label: "Commerce",
    checkoutUrl: "https://hosting.com/hosting/platforms/wordpress-hosting/",
    plans: [
      plan("Starter", "Launch your online store with optimized WooCommerce hosting", "15.99", "11.99", "19.99", ["100GB NVMe storage", "5x more CPU power", "100 websites", "~400k monthly visits", "WooCommerce optimized", ...sharedFeatures]),
      plan("Growth", "Scale your e-commerce business with enhanced performance", "19.99", "15.99", "24.99", ["150GB NVMe storage", "6x more CPU power", "100 websites", "~500k monthly visits", "WooCommerce optimized", ...sharedFeatures]),
      plan("Scale", "Handle high-traffic stores with dedicated resources", "25.99", "21.99", "29.99", ["200GB NVMe storage", "8x more CPU power", "100 websites", "~600k monthly visits", "WooCommerce optimized", ...sharedFeatures], true),
      plan("Enterprise", "Enterprise commerce infrastructure for unlimited scale", "34.99", "29.99", "39.99", ["250GB NVMe storage", "10x more CPU power", "100 websites", "~1M monthly visits", "WooCommerce optimized", ...sharedFeatures]),
    ],
  },
  vps: {
    label: "VPS",
    checkoutUrl: "https://hosting.com/hosting/vps-hosting/managed/linux/",
    plans: [
      plan("Entry", "Entry-level VPS for developers and small applications", "12.99", "9.99", "14.99", ["1GB RAM", "1 vCPU", "25GB NVMe storage", "1TB bandwidth", ...serverFeatures]),
      plan("Standard", "Balanced VPS resources for growing applications and sites", "22.99", "17.99", "27.99", ["4GB RAM", "2 vCPU", "50GB NVMe storage", "2TB bandwidth", ...serverFeatures]),
      plan("Elite", "High-performance VPS for demanding workloads", "34.99", "29.99", "42.99", ["8GB RAM", "4 vCPU", "100GB NVMe storage", "4TB bandwidth", ...serverFeatures], true),
      plan("Ultimate", "Maximum VPS power for resource-intensive applications", "59.99", "49.99", "69.99", ["16GB RAM", "8 vCPU", "200GB NVMe storage", "8TB bandwidth", ...serverFeatures]),
    ],
  },
  dedicated: {
    label: "Dedicated",
    checkoutUrl: "https://hosting.com/hosting/dedicated-server-hosting/",
    plans: [
      plan("Express", "Dedicated hardware for businesses that need full control", "99.99", "79.99", "119.99", ["4-core CPU", "8GB RAM", "1TB NVMe storage", "10TB bandwidth", ...serverFeatures]),
      plan("Advanced", "Powerful dedicated servers for high-traffic applications", "139.99", "119.99", "159.99", ["8-core CPU", "16GB RAM", "2TB NVMe storage", "20TB bandwidth", ...serverFeatures], true),
      plan("Elite", "Enterprise-grade dedicated infrastructure", "189.99", "169.99", "209.99", ["16-core CPU", "32GB RAM", "2TB NVMe storage", "30TB bandwidth", ...serverFeatures]),
      plan("Ultimate", "Maximum performance for mission-critical workloads", "259.99", "229.99", "289.99", ["32-core CPU", "64GB RAM", "4TB NVMe storage", "50TB bandwidth", ...serverFeatures]),
    ],
  },
  ai_tools: {
    label: "AI Tools",
    checkoutUrl: "https://hosting.com/hosting/platforms/ai-application-studio/",
    plans: [
      plan("Starter", "Get started with AI-powered development tools and APIs", "19.99", "14.99", "24.99", ["50GB storage", "Shared GPU", "10k API calls/mo", ...aiFeatures]),
      plan("Developer", "Enhanced AI capabilities for active developers", "29.99", "24.99", "34.99", ["100GB storage", "Shared GPU", "50k API calls/mo", ...aiFeatures], true),
      plan("Professional", "Dedicated GPU resources for professional AI workloads", "59.99", "49.99", "69.99", ["250GB storage", "Dedicated GPU", "200k API calls/mo", ...aiFeatures]),
      plan("Enterprise", "Multi-GPU infrastructure for enterprise AI applications", "119.99", "99.99", "139.99", ["500GB storage", "Multi-GPU", "Unlimited API calls", ...aiFeatures]),
    ],
  },
  agency: {
    label: "Agency",
    checkoutUrl: "https://hosting.com/hosting/hosting-by-service/reseller-hosting/",
    plans: [
      plan("Starter", "Manage multiple client sites with consolidated hosting", "39.99", "29.99", "49.99", ["25 sites", "250GB NVMe storage", "Client management dashboard", ...sharedFeatures]),
      plan("Growth", "Scale your agency with more sites and resources", "59.99", "49.99", "69.99", ["50 sites", "500GB NVMe storage", "Client management dashboard", ...sharedFeatures], true),
      plan("Scale", "Enterprise agency hosting for large client portfolios", "119.99", "99.99", "139.99", ["150 sites", "1TB NVMe storage", "Client management dashboard", ...sharedFeatures]),
      plan("Enterprise", "Unlimited sites and resources for large agencies", "249.99", "199.99", "279.99", ["Unlimited sites", "2TB NVMe storage", "Client management dashboard", ...sharedFeatures]),
    ],
  },
};

export const categoryKeys = Object.keys(planCategories);