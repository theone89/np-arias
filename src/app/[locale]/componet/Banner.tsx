"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Banner() {
  const t = useTranslations();
  return (
    <section
      className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&h=600)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px", // Ajusta la altura según sea necesario
        opacity: 0.6, // Aplicamos opacidad a la imagen de fondo
      }}
    >
      <div className="absolute inset-0 bg-black "></div>{" "}
      {/* Capa oscura adicional para mejorar la legibilidad del texto */}
      <div className="container mx-auto px-4 text-center relative z-10">
        {" "}
        {/* Añadimos z-10 para que el contenido esté por encima de la capa oscura */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
          {t("home.welcome")}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-lg">
          {t("home.subtitle")}
        </p>
        <Button
          size="lg"
          className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg"
          asChild
        >
          <Link href="/reservas">{t("cta.bookAppointment")}</Link>
        </Button>
      </div>
    </section>
  );
}
