"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
          ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 dark:text-blue-400"
        >
          Logo Clínica
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/sobre-nosotros"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {t("navigation.about")}
              </Link>
            </li>
            <li>
              <Link
                href="/servicios"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {t("navigation.services")}
              </Link>
            </li>
            <li>
              <Link
                href="/testimonios"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {t("navigation.testimonials")}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {t("navigation.blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {t("navigation.contact")}
              </Link>
            </li>
          </ul>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            asChild
          >
            <Link href="/reservas">{t("cta.bookAppointment")}</Link>
          </Button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-label={darkMode ? t("darkMode.light") : t("darkMode.dark")}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </nav>
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-2">
          <nav className="container mx-auto px-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {t("navigation.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonios"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {t("navigation.testimonials")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {t("navigation.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
              <li>
                <Button
                  className="w-full mt-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  asChild
                >
                  <Link href="/reservas">{t("cta.bookAppointment")}</Link>
                </Button>
              </li>
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full mt-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  aria-label={
                    darkMode ? t("darkMode.light") : t("darkMode.dark")
                  }
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-700 mr-2" />
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
