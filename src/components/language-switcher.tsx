"use client";

import { motion } from "framer-motion";
import { Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/components/locale-provider";
import { useTranslations } from "@/hooks/use-translations";

const locales = ["en", "fr"] as const;
type Locale = (typeof locales)[number];

const languageNames = {
  en: "English",
  fr: "Français",
} as const;

const languageFlags = {
  en: "🇺🇸",
  fr: "🇫🇷",
} as const;

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const { locale, setLocale } = useLocale();

  const switchLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <motion.span
            className="text-lg"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            {languageFlags[locale as keyof typeof languageFlags]}
          </motion.span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {languageNames[locale as keyof typeof languageNames]}
          </span>
          <motion.div
            className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-xl"
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none
              ${
                locale === loc
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
              }
            `}
          >
            <motion.span
              className="text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {languageFlags[loc as keyof typeof languageFlags]}
            </motion.span>
            <span className="flex-1 text-sm font-medium">
              {languageNames[loc as keyof typeof languageNames]}
            </span>
            {locale === loc && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50"
              >
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitcherMobile() {
  const t = useTranslations("language");
  const { locale, setLocale } = useLocale();

  const switchLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Languages className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {t("selectLanguage")}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {locales.map((loc) => (
          <motion.button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`
              relative flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
              ${
                locale === loc
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-200 dark:border-blue-700"
                  : "hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              }
            `}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: loc === "en" ? 0 : 0.1 }}
          >
            <motion.span
              className="text-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {languageFlags[loc as keyof typeof languageFlags]}
            </motion.span>
            <span className="flex-1 text-sm font-medium">
              {languageNames[loc as keyof typeof languageNames]}
            </span>
            {locale === loc && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </motion.div>
            )}
            {locale === loc && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
