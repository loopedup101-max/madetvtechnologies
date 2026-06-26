import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import SubPageLayout from "@/components/hosting/SubPageLayout";
import { base44 } from "@/api/base44Client";

const categoryLabels = {
  getting_started: "Getting Started",
  billing: "Billing",
  technical: "Technical",
  security: "Security",
  migration: "Migration",
  domains: "Domains",
};

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const list = await base44.entities.KnowledgeArticle.filter({ published: true }, "-views", 50);
      setArticles(list || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSelectArticle = async (article) => {
    setSelectedArticle(article);
    try {
      await base44.entities.KnowledgeArticle.update(article.id, { views: (article.views || 0) + 1 });
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = articles.filter(a => {
    const matchesSearch = !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      a.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "all" || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    return (
      <SubPageLayout>
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[#6B6B7B] hover:text-[#4F46E5] transition-colors mb-6 text-sm font-mono min-h-[44px]">
              <ArrowLeft size={16} /> All Articles
            </button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4 block">
                {categoryLabels[selectedArticle.category] || selectedArticle.category}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mb-6">
                {selectedArticle.title}
              </h1>
              <div className="prose prose max-w-none">
                <ReactMarkdown className="text-[#6B6B7B] leading-relaxed text-base lg:text-lg whitespace-pre-wrap">
                  {selectedArticle.content}
                </ReactMarkdown>
              </div>
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#E5E0D8]">
                  {selectedArticle.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-[#D8D2C8] font-mono text-[10px] uppercase tracking-widest text-[#6B6B7B]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </SubPageLayout>
    );
  }

  const categories = ["all", ...Object.keys(categoryLabels).filter(c => articles.some(a => a.category === c))];

  return (
    <SubPageLayout>
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <BookOpen size={24} className="text-[#4F46E5] mx-auto mb-4" />
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#4F46E5] mb-4">Self-Service Resources</p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#1A1A2E] tracking-tight mb-6">KNOWLEDGE BASE</h1>
            <div className="max-w-md mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B7B]/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#D8D2C8] pl-12 pr-5 py-4 text-[#1A1A2E] placeholder:text-[#6B6B7B]/40 font-body focus:outline-none focus:border-[#4F46E5]/50 min-h-[44px]"
              />
            </div>
          </motion.div>

          <div className="flex justify-center gap-1 p-1 bg-white border border-[#E5E0D8] mb-10 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all min-h-[44px] ${activeCategory === cat ? "bg-[#4F46E5] text-[#FAF8F5] font-bold" : "text-[#6B6B7B] hover:text-[#1A1A2E]"}`}
              >
                {cat === "all" ? "All" : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#4F46E5]" size={32} /></div>
          ) : filtered.length === 0 ? (
            <div className="border border-[#E5E0D8] bg-white p-12 text-center">
              <p className="text-[#6B6B7B]">No articles found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((article, i) => (
                <motion.button
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelectArticle(article)}
                  className="text-left border border-[#E5E0D8] bg-white p-6 lg:p-8 hover:border-[#4F46E5]/30 transition-all duration-300 group"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4F46E5] mb-3 block">
                    {categoryLabels[article.category] || article.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#1A1A2E] mb-3 group-hover:text-[#4F46E5] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B6B7B] leading-relaxed line-clamp-2">{article.excerpt}</p>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>
    </SubPageLayout>
  );
}