"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Clínica Estética</h3>
            <p className="mb-2">Dirección: Calle Principal 123, Ciudad</p>
            <p className="mb-2">Teléfono: (123) 456-7890</p>
            <p>Email: info@clinicaestetica.com</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
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
          <p>&copy; 2023 Clínica Estética. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
