"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

const CAL_COM_USERNAME = process.env.NEXT_PUBLIC_CAL_COM_USERNAME || "";
const CAL_COM_EVENT_TYPE =
  process.env.NEXT_PUBLIC_CAL_COM_EVENT_TYPE || "30min";

export default function SchedulePage() {
  const t = useTranslations("schedule");

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <BlurFade delay={0.1}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 mb-6"
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              {t("title") || "Schedule a Meeting"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle") ||
                "Pick a time that works for you, and let's connect!"}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <Card className="overflow-hidden min-h-[400px] flex items-center justify-center">
            <CardContent className="p-0 w-full">
              {CAL_COM_USERNAME ? (
                <iframe
                  src={`https://cal.com/${CAL_COM_USERNAME}/${CAL_COM_EVENT_TYPE}?embed=true&theme=auto`}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="rounded-lg"
                />
              ) : (
                <div className="text-center p-8 py-12">
                  <p className="text-muted-foreground mb-6 text-lg">
                    {t("notConfigured") ||
                      "Scheduling is currently available via email only."}
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="font-semibold">
                      {t("contactMe") || "Contact Me"}
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              {t("preferEmail") || "Prefer email?"}{" "}
              <Link href="/contact" className="text-primary hover:underline">
                {t("contactMe") || "Contact me directly"}
              </Link>
            </p>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
