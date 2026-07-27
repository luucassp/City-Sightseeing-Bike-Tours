import { getPopupSettings } from "@/lib/popup";
import PromoPopup from "@/components/PromoPopup";

export default async function PromoPopupLoader() {
  const settings = await getPopupSettings();
  if (!settings.enabled || !settings.title.trim()) return null;

  return <PromoPopup settings={settings} />;
}
