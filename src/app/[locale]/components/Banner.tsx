"use client";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Banner() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section
      className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-100 py-20"
      style={{
        backgroundImage: "url('/assets/images/lisbet.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px", // Ajusta la altura según sea necesario
      }}
    >
      {/* Fondo semitransparente */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40" // Fondo negro con 50% de opacidad
        aria-hidden="true" // Para mejorar la accesibilidad
      ></div>

      {/* Contenido del banner */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
          {t("home.welcome")}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-lg">
          {t("home.subtitle")}
        </p>
        <Button
          size="lg"
          className="mt-6 rounded-lg bg-custom-gold-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-custom-gold-600 focus:outline-none focus:ring-4 focus:ring-custom-gold-300"
          asChild
        >
          <Link href={`${locale}/schedule`}>{t("cta.bookAppointment")}</Link>
        </Button>
      </div>
    </section>
  );
}
