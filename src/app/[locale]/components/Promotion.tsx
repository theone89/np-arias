"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Promotion() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-blue-500 dark:bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          {t("home.promotions.title")}
        </h2>
        <p className="text-lg md:text-xl mb-8">
          {t("home.promotions.description")}
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="bg-white text-blue-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          asChild
        >
          <Link href="/promociones">{t("home.promotions.cta")}</Link>
        </Button>
      </div>
    </section>
  );
}
