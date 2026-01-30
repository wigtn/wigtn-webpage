"use client";

import { useLanguage } from "@/lib/i18n";
import { useBudouX } from "@/lib/hooks/useBudouX";

const PRODUCTS = [
  {
    id: "wigvu",
    name: "WIGVU",
    tagline: "See your ideas come to life",
    features: ["Instant visual prototyping", "Natural language input", "Export to code"],
    status: "Coming Soon",
    gradient: "from-violet to-purple-400",
  },
  {
    id: "wigex",
    name: "WIGEX",
    tagline: "Execute with precision",
    features: ["AI-powered code generation", "Production-ready output", "Continuous iteration"],
    status: "Coming Soon",
    gradient: "from-indigo-500 to-violet",
  },
];

export function Products() {
  const { t } = useLanguage();
  const { processText } = useBudouX();

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <span className="text-sm font-semibold text-violet mb-6 block tracking-wide">PRODUCTS</span>
        <h2 className="text-section text-foreground mb-4">Our Apps</h2>
        <p className="text-lg text-gray-600">App-based services built with AI-native development.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-4">
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-violet/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-5">
              {/* App Icon - Small like App Store */}
              <div className={`w-16 h-16 md:w-[72px] md:h-[72px] flex-shrink-0 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-sm`}>
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {product.name.charAt(0)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-violet transition-colors">
                    {product.name}
                  </h3>
                  <span className="px-2 py-0.5 text-xs text-violet bg-violet/10 rounded-full font-medium">
                    {product.status}
                  </span>
                </div>
                <p className="text-violet text-sm mb-2">{product.tagline}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {processText(t.products.items[index])}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5">
                  {product.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs text-gray-500 bg-gray-100 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
