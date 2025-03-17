"use client";

import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Banner() {
  const t = useTranslations();
  const locale = useLocale();
  const [bgImage, setBgImage] = useState("/assets/images/desktop.png");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBgImage("/assets/images/mobile.png"); // Imagen para móvil
      } else {
        setBgImage("/assets/images/desktop.png"); // Imagen para PC
      }
    };

    handleResize(); // Llamar en el montaje
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
  <section
  className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-100 h-screen"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Fondo semitransparente */}
  <div
    className="absolute inset-0 bg-black bg-opacity-40"
    aria-hidden="true"
  ></div>

  {/* Contenido del banner */}
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
      {t("home.welcome")}
    </h1>
    <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
      {t("home.subtitle")}
    </p>
    <Button
      size="lg"
      className="mt-6 rounded-lg border-2 border-custom-gold-500 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] bg-transparent px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-custom-gold-500 hover:text-black focus:outline-none focus:ring-4 focus:ring-custom-gold-300"
      asChild
    >
      <Link href={`https://book.lpaestheticswellness.com/book/d87d9326`}>
        {t("cta.bookAppointment")}
      </Link>
    </Button>
  </div>
</section>

  );
}
