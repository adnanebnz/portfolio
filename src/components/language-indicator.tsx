"use client";

import { useLocale } from "@/components/locale-provider";
import { useTranslations } from "@/hooks/use-translations";
import { Badge } from "@/components/ui/badge";

export function LanguageIndicator() {
  const { locale } = useLocale();
  const t = useTranslations("hero");

  const languageNames = {
    en: "English",
    fr: "Français",
    ar: "العربية",
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Badge variant="secondary" className="flex items-center gap-2">
        <span className="text-xs">Current Language:</span>
        <span className="font-semibold">{languageNames[locale]}</span>
      </Badge>
      <div className="mt-2 p-2 bg-card border rounded-md shadow-sm">
        <p className="text-sm font-medium">{t("greeting")}</p>
        <p className="text-xs text-muted-foreground">{t("title")}</p>
      </div>
    </div>
  );
}
