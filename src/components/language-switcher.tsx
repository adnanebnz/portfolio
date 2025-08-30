"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/config";

const languageNames = {
  en: "English",
  fr: "Français",
  ar: "العربية",
} as const;

const languageFlags = {
  en: "🇺🇸",
  fr: "🇫🇷",
  ar: "🇩🇿",
} as const;

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as any)) {
      segments.splice(1, 1);
    }

    const newPath =
      newLocale === "en"
        ? segments.join("/") || "/"
        : `/${newLocale}${segments.join("/") || ""}`;

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 hover:bg-primary/10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1"
          >
            <span className="text-lg">
              {languageFlags[locale as keyof typeof languageFlags]}
            </span>
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`flex items-center space-x-3 cursor-pointer ${
              locale === loc ? "bg-primary/10" : ""
            }`}
          >
            <span className="text-lg">
              {languageFlags[loc as keyof typeof languageFlags]}
            </span>
            <span className="flex-1">
              {languageNames[loc as keyof typeof languageNames]}
            </span>
            {locale === loc && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitcherMobile() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as any)) {
      segments.splice(1, 1);
    }

    const newPath =
      newLocale === "en"
        ? segments.join("/") || "/"
        : `/${newLocale}${segments.join("/") || ""}`;

    router.push(newPath);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground">
        <Languages className="w-4 h-4" />
        <span>{t("selectLanguage")}</span>
      </div>
      {locales.map((loc) => (
        <motion.button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-primary/10 transition-colors ${
            locale === loc ? "bg-primary/10 text-primary" : ""
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">
            {languageFlags[loc as keyof typeof languageFlags]}
          </span>
          <span className="flex-1">
            {languageNames[loc as keyof typeof languageNames]}
          </span>
          {locale === loc && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
