"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const FacebookIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
  </svg>
);
const TwitterIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 512 512"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
    />
  </svg>
);

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
             {/* Dirección */}
  <p className="mb-2 flex items-center gap-2">
    <MapPin className="w-5 h-5 text-[#F6B73C]" />
              <a href="https://maps.app.goo.gl/MTtHzRkvuqBHencR7" className="hover:text-[#F6B73C]" target="_blank">
      5734 S Semoran Blvd, Orlando, Florida 32822
    </a>
  </p>
  
  {/* Teléfono */}
  <p className="mb-2 flex items-center gap-2">
    <Phone className="w-5 h-5 text-[#F6B73C]" />
    <a
      href="https://wa.me/17868708883?text=Hello,%20I%20am%20interested%20in%20one%20of%20your%20services.%20Can%20you%20provide%20more%20information?"
      className="hover:text-[#F6B73C]"
    >
      +1 (786) 870-8883
    </a>
  </p>
  
  {/* Email */}
  <p className="flex items-center gap-2">
    <Mail className="w-5 h-5 text-[#F6B73C]" />
    <a
      href="mailto:info@lpaestheticswellness.com"
      className="hover:text-[#F6B73C]"
    >
      info@lpaestheticswellness.com
    </a>
  </p>
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
                href="https://www.facebook.com/profile.php?id=61572935438673"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookIcon size={24} />
              </a>
              <a
                href="https://www.instagram.com/lpaestheticswellness/"
                target="_blank"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={24} />
              </a>
              <a
                href="https://x.com/LP_Wellness"
                className="text-gray-300 hover:text-[#F6B73C] transition-colors"
                target="_blank"
                aria-label="Twitter"
              >
                <TwitterIcon size={24} />
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
            &copy; {new Date().getFullYear()} LP Aesthetic & Wellness. Power by{" "}
            <Link
              href={"https://strongfreecode.com"}
              className="text-white underline hover:text-[#F6B73C]"
            >
              StrongFreeCode
            </Link>
            {" - "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
