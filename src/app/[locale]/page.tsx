"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, MenuIcon, SunIcon, MoonIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { AfterBefore } from "@/components/component/after-before";

export default function HomePage() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
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

      <main className="flex-grow">
        <section className="relative bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {t("home.welcome")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300">
              {t("home.subtitle")}
            </p>
            <Button
              size="lg"
              className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              asChild
            >
              <Link href="/reservas">{t("cta.bookAppointment")}</Link>
            </Button>
          </div>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=1600"
              alt="Clínica Estética"
              width={1600}
              height={600}
              className="object-cover w-full h-full opacity-20"
            />
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
              {t("home.servicesTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: t("navigation.services"),
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  name: t("navigation.services"),
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  name: t("navigation.services"),
                  image: "/placeholder.svg?height=200&width=300",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 shadow-lg overflow-hidden"
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {service.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t("home.serviceDescription")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section>
          <AfterBefore></AfterBefore>
        </section>
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
              {t("home.testimonialsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "María G.",
                  text: "Excelente atención y resultados increíbles. ¡Totalmente recomendado!",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  name: "Carlos R.",
                  text: "Profesionales altamente calificados. Me siento mucho más seguro ahora.",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-700 shadow-lg"
                >
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        &quot;{testimonial.text} &quot;
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {testimonial.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-500 dark:bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
              {t("home.promotionsTitle")}
            </h2>
            <p className="text-lg md:text-xl mb-8">
              {t("home.promotionsDescription")}
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              asChild
            >
              <Link href="/promociones">{t("home.seeAllOffers")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Clínica Estética</h3>
              <p>Dirección: Calle Principal 123, Ciudad</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: info@clinicaestetica.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.quickLinks")}
              </h3>
              <ul>
                <li>
                  <Link href="/sobre-nosotros" className="hover:text-blue-400">
                    {t("navigation.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/servicios" className="hover:text-blue-400">
                    {t("navigation.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-400">
                    {t("navigation.blog")}
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-blue-400">
                    {t("navigation.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.followUs")}
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  Facebook
                </a>
                <a href="#" className="hover:text-blue-400">
                  Instagram
                </a>
                <a href="#" className="hover:text-blue-400">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Clínica Estética. {t("footer.allRightsReserved")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
