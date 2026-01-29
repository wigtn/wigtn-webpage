import { CONTENT } from "@/constants";

export function Products() {
  const { label, title, description, items } = CONTENT.products;

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <span className="text-sm font-semibold text-violet dark:text-violet-light mb-6 block tracking-wide">{label}</span>
        <h2 className="text-section text-foreground dark:text-white mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {/* Products with content-width dividers */}
      <div className="max-w-4xl mx-auto px-6">
        {items.map((product, index) => (
          <div
            key={product.id}
            className={index !== 0 ? "border-t border-slate-200 dark:border-gray-800 pt-12 mt-12" : ""}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Image placeholder - 20% */}
              <div className="md:w-1/5 flex-shrink-0">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-300 dark:text-gray-600">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Description - 80% */}
              <div className="md:w-4/5">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-semibold text-foreground dark:text-white">
                    {product.name}
                  </h3>
                  <span className="px-2 py-0.5 text-xs text-violet dark:text-violet-light bg-violet/10 dark:bg-violet/20 rounded-full">
                    {product.status}
                  </span>
                </div>
                <p className="text-violet dark:text-violet-light mb-4">{product.tagline}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
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
