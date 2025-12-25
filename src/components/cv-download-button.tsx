"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, FileText } from "lucide-react";
import { DATA } from "@/data/resume";
import { useTranslations } from "@/hooks/use-translations";

interface CVDownloadButtonProps {
  className?: string;
}

export function CVDownloadButton({ className }: CVDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("hero");

  const handleDownload = (language: "en" | "fr") => {
    const cvFile = DATA.cvFiles[language];
    const link = document.createElement("a");
    link.href = cvFile.filePath;
    link.download = cvFile.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="w-5 h-5" />
        <span>{t("downloadCV")}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 z-50 bg-card/95 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-2">
                <motion.button
                  onClick={() => handleDownload("en")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-primary/10 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {t("downloadCVEnglish")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      English Version
                    </p>
                  </div>
                  <span className="ml-auto text-2xl">🇬🇧</span>
                </motion.button>

                <motion.button
                  onClick={() => handleDownload("fr")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-primary/10 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {t("downloadCVFrench")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Version Française
                    </p>
                  </div>
                  <span className="ml-auto text-2xl">🇫🇷</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CVDownloadButton;
