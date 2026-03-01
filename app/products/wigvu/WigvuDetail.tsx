"use client";

import { useLanguage } from "@/lib/i18n";
import { PRODUCT_DETAILS } from "@/constants/products";
import { Footer } from "@/components/sections/Footer";
import {
  ProductDetailNav,
  ProductHero,
  ProductProblem,
  ProductFeatures,
  ProductStats,
  ProductTechStack,
  ProductCTA,
} from "@/components/products";

export function WigvuDetail() {
  const { t } = useLanguage();
  const product = PRODUCT_DETAILS.wigvu;
  const pd = t.productDetail;
  const pt = pd.wigvu;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <ProductDetailNav />

      <ProductHero
        product={product}
        translations={pt}
        ctaLabel={pd.comingSoon}
      />

      <ProductProblem
        label={pd.theProblem}
        text={pt.problem}
      />

      <ProductFeatures
        label={pd.theSolution}
        solutionText={pt.solution}
        features={product.features}
        featureTranslations={pd.features}
      />

      <ProductStats
        label={pd.keyMetrics}
        stats={product.stats}
        statTranslations={pd.stats}
      />

      <ProductTechStack
        label={pd.techStack}
        techStack={product.techStack}
      />

      <ProductCTA
        product={product}
        tagline={pt.tagline}
        ctaLabel={pd.comingSoon}
        backToHomeLabel={pd.backToHome}
      />

      <Footer />
    </div>
  );
}
