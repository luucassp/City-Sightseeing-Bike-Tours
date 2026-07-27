import { Suspense } from "react";
import { getPopupSettings } from "@/lib/popup";
import { effectivePercent, getPromotion } from "@/lib/promotion";
import PromoPopup from "@/components/PromoPopup";

export default async function PromoPopupLoader() {
  const [settings, promotion] = await Promise.all([
    getPopupSettings(),
    getPromotion(),
  ]);
  if (!settings.title.trim()) return null;

  return (
    <Suspense fallback={null}>
      <PromoPopup
        settings={settings}
        discountPercent={effectivePercent(promotion)}
      />
    </Suspense>
  );
}
