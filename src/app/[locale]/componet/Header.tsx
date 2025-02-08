"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Corinthia, Noto_Sans } from "next/font/google";

// Configurar Corinthia
const corinthia = Corinthia({
  subsets: ["latin"],
  weight: ["700"],
});

// Configurar Noto Sans
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-custom-ivory-100 dark:bg-custom-terracotta-900/80 backdrop-blur-md shadow-md"
          : "bg-custom-ivory-100 dark:bg-custom-terracotta-900"
      }`}
    >
      <div className="container mx-auto px-4 py-4  flex justify-between items-center">
        <div className=" p-2 rounded-lg ">
          <Link
            href="/"
            className="text-2xl items-center font-bold flex space-x-2 text-center flex-rows text-custom-brown-900 dark:text-custom-ivory-100"
          >
            <Image
              src={"/assets/images/lp icono.webp"}
              alt=""
              width={35}
              height={35}
              quality={100}
              className="items-center"
            />
            <div className="items-start">
              <p
                className={`${corinthia.className} text-md font-bold text-custom-gold-500 dark:text-custom-gold-300`}
              >
                Aesthetic
              </p>
              <p
                className={`${notoSans.className} text-xs -mt-2 text-custom-brown-700 dark:text-custom-ivory-200`}
              >
                & wellness
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/sobre-nosotros"
                className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
              >
                {t("navigation.about")}
              </Link>
            </li>
            <li>
              <Link
                href="/servicios"
                className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
              >
                {t("navigation.services")}
              </Link>
            </li>
            <li>
              <Link
                href="/testimonios"
                className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
              >
                {t("navigation.testimonials")}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
              >
                {t("navigation.blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
              >
                {t("navigation.contact")}
              </Link>
            </li>
          </ul>
          <Button
            className="rounded-lg bg-custom-gold-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-custom-gold-600 focus:outline-none focus:ring-4 focus:ring-custom-gold-300"
            asChild
          >
            <Link href="/reservas">{t("cta.bookAppointment")}</Link>
          </Button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-custom-ivory-200 dark:bg-custom-brown-600"
            aria-label={darkMode ? t("darkMode.light") : t("darkMode.dark")}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-custom-brown-700" />
            )}
          </button>
        </nav>
        <button
          className="md:hidden text-custom-brown-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-custom-ivory-100 dark:bg-gray-800 py-2">
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                >
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                >
                  {t("navigation.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonios"
                  className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                >
                  {t("navigation.testimonials")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                >
                  {t("navigation.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
              <li>
                <Button
                  className="w-full mt-2 bg-custom-teal-500 text-white hover:bg-custom-teal-600 dark:bg-custom-teal-600 dark:hover:bg-custom-teal-700"
                  asChild
                >
                  <Link href="/reservas">{t("cta.bookAppointment")}</Link>
                </Button>
              </li>
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full mt-2 p-2 rounded-md bg-custom-ivory-200 dark:bg-custom-brown-600 flex items-center justify-center"
                  aria-label={
                    darkMode ? t("darkMode.light") : t("darkMode.dark")
                  }
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-custom-brown-700 mr-2" />
                  )}
                  {darkMode ? t("darkMode.light") : t("darkMode.dark")}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
