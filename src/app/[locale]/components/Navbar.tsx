"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Corinthia, Noto_Sans } from "next/font/google";
import { usePathname } from "next/navigation";

const corinthia = Corinthia({ subsets: ["latin"], weight: ["700"] });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-custom-ivory-100 bg-opacity-80 dark:bg-[rgba(86,33,33,0.8)] backdrop-blur-md shadow-md"
          : "bg-custom-ivory-100 dark:bg-custom-terracotta-900"
      }`}
    >
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="p-2 rounded-lg">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center space-x-2 text-custom-brown-900 dark:text-custom-ivory-100"
          >
            <Image
              src="/assets/images/lp icono.webp"
              alt="Logo"
              width={35}
              height={35}
              quality={100}
            />
            <div className="items-start">
              <p
                className={`${corinthia.className} text-md font-bold text-custom-gold-500 dark:text-custom-gold-300`}
              >
                Aesthetics
              </p>
              <p
                className={`${notoSans.className} text-xs -mt-2 text-custom-brown-700 dark:text-custom-ivory-200`}
              >
                & wellness
              </p>
            </div>
          </Link>
        </div>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-4">
            {["about", "services", "testimonials", "blog", "contact"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/#`}
                    className="text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                  >
                    {t(`navigation.${item}`)}
                  </Link>
                </li>
              )
            )}
          </ul>
          {pathname !== `/${locale}/schedule` && (
            <Button className="rounded-lg bg-custom-gold-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-custom-gold-600">
              <Link
                href={`https://book.lpaestheticswellness.com/book/50a4ad48`}
              >
                {t("cta.bookAppointment")}
              </Link>
            </Button>
          )}
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
        </div>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden text-custom-brown-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-custom-ivory-100 dark:bg-gray-800 py-2">
          <div className="container mx-auto px-4">
            <ul className="space-y-2">
              {["about", "services", "testimonials", "blog", "contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item === "about" ? "sobre-nosotros" : item}`}
                      className="block text-custom-brown-700 dark:text-gray-300 hover:text-custom-teal-500 dark:hover:text-custom-teal-400"
                    >
                      {t(`navigation.${item}`)}
                    </Link>
                  </li>
                )
              )}
              <li>
                {pathname !== `/${locale}/schedule` && (
                  <Button className="w-full mt-2 bg-custom-teal-500 text-white hover:bg-custom-teal-600 dark:bg-custom-teal-600 dark:hover:bg-custom-teal-700">
                    <Link href={`/${locale}/schedule`}>
                      {t("cta.bookAppointment")}
                    </Link>
                  </Button>
                )}
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
          </div>
        </div>
      )}
    </nav>
  );
}
