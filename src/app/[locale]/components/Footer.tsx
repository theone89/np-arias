"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4 text-[#F6B73C]">
              LP Aesthetic & Wellness
            </h3>
            <p className="mb-2">Address: Calle Principal 123, Ciudad</p>
            <p className="mb-2">Phone: +1 (786) 870-8883</p>
            <p>Email: info@lpaestheticswellness.com</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-[#F6B73C]">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("navigation.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("navigation.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-[#F6B73C]">
              {t("footer.followUs")}
            </h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#F6B73C]">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("footer.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LP Aesthetic & Wellness.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
