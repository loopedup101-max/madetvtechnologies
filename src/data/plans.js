const sharedFeatures = [
  "Free SSL + CDN",
  "24/7 chat + phone support",
];

function plan(name, tagline, monthlyPrice, annualPrice, features, popular = false) {
  const calc = (a, m) => Math.round((1 - parseFloat(a) / parseFloat(m)) * 100) + "%";
  const isFree = monthlyPrice === "0";
  return {
    name,
    tagline,
    popular,
    isFree,
    prices: {
      monthly: { price: monthlyPrice, savings: "0%", renewPrice: monthlyPrice },
      annual: { price: annualPrice, savings: isFree ? "0%" : calc(annualPrice, monthlyPrice), renewPrice: annualPrice },
    },
    features,
  };
}

export const madeCraftPlans = [
  plan("Free", "Start exploring AI-powered building at no cost", "0", "0", [
    "30 AI credits",
    "3 projects",
    "Community support",
  ]),
  plan("Starter", "Perfect for individuals building their first AI-powered sites", "9.99", "7.99", [
    "300 AI credits/month",
    "Unlimited websites",
    "Code generation",
    "Visual builder",
    "Custom domains",
    ...sharedFeatures,
  ]),
  plan("Pro", "For developers needing advanced AI tools and integrations", "19.99", "15.99", [
    "1,000 AI credits/month",
    "AI agents",
    "Full code export",
    "GitHub integration",
    "Priority generation",
    ...sharedFeatures,
  ], true),
  plan("Business", "Scale your team with collaboration and API access", "29.99", "23.99", [
    "3,000 AI credits/month",
    "Team collaboration",
    "Shared workspaces",
    "API access",
    "Advanced analytics",
    ...sharedFeatures,
  ]),
  plan("Enterprise", "Enterprise-grade infrastructure with unlimited everything", "49.99", "39.99", [
    "Unlimited AI credits",
    "Unlimited projects",
    "Dedicated support",
    "SSO",
    "White-label options",
    "Custom integrations",
    ...sharedFeatures,
  ]),
];

export const checkoutUrl = "https://hosting.com/hosting/";