"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/components/locale-provider";

type Messages = Record<string, any>;

export function useTranslations(namespace?: string) {
  const { locale } = useLocale();
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messageModule = await import(`../../messages/${locale}.json`);
        setMessages(messageModule.default);
      } catch (error) {
        console.error("Failed to load messages:", error);
        // Fallback to English
        try {
          const fallbackModule = await import(`../../messages/en.json`);
          setMessages(fallbackModule.default);
        } catch (fallbackError) {
          console.error("Failed to load fallback messages:", fallbackError);
        }
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split(".");
    let value = namespace ? messages[namespace] : messages;

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value !== "string") {
      return key;
    }

    // Simple parameter replacement
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return value;
  };

  return t;
}
