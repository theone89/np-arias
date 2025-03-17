"use client";
import { useLocale, useTranslations } from "next-intl";
import ReactCompareImage from "react-compare-image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {}

export function AfterBefore() {
  const t = useTranslations("AfterBefore");
  const locale = useLocale();

  // Imágenes locales ubicadas en la carpeta "public/images"
  const images = [
    { before: "/assets/beforeafter/before1.jpg", after: "/assets/beforeafter/after1.jpg" },
    { before: "/assets/beforeafter/before2.jpg", after: "/assets/beforeafter/after2.jpg" },
    { before: "/assets/beforeafter/before4.jpg", after: "/assets/beforeafter/after4.jpg" },
    { before: "/assets/beforeafter/before3.jpg", after: "/assets/beforeafter/after3.jpg" },
  ];

  return (
    <div className="px-6 py-12 bg-custom-ivory-100 dark:bg-custom-terracotta-900 text-center">
      {/* Encabezado con animación al entrar en el viewport */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center p-4"
      >
        <h1 className="text-4xl font-bold mb-4 text-custom-brown-800 dark:text-custom-ivory-500">
          {t("title")}
        </h1>
        <p className="mb-8 text-lg text-custom-brown-600 dark:text-custom-ivory-300">
          {t("subtitle")}
        </p>
        <Link
          href={`https://book.lpaestheticswellness.com/book/d87d9326`}
          className="px-6 py-3 bg-custom-gold-500 text-white rounded-lg shadow-lg hover:bg-custom-gold-600 inline-flex items-center"
        >
          <Calendar className="w-5 h-5 mr-2" />
          {t("cta")}
        </Link>
      </motion.div>

      {/* Galería de imágenes */}
      <section className="mt-10 grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col items-center shadow-2xl rounded-lg bg-custom-ivory-100 border-custom-gold-500 border-spacing-2 border-2 dark:bg-custom-terracotta-200 p-6 shadow-custom-ivory-700 transition-transform duration-300 ease-in-out hover:-translate-y-2 md:flex-row"
          >
            <div className="md:w-1/2 w-full h-72 flex items-center justify-center">
              <ReactCompareImage
                leftImage={image.before}
                rightImage={image.after}
                leftImageAlt={t(`work${index + 1}.title`)}
                rightImageAlt={t(`work${index + 1}.title`)}
                sliderLineWidth={2}
                sliderLineColor="#fff"
                handleSize={30}
                hover
             
              />
              <p className="mt-2 text-center text-sm text-teal-800 dark:text-teal-950">
                {t("sliderText")}
              </p>
            </div>
            <div className="mt-4 space-y-2 md:mt-0 md:w-1/2 md:pl-6">
              <h3 className="text-xl font-bold text-custom-brown-900 dark:text-custom-gold-700">
                {t(`work${index + 1}.title`)}
              </h3>
              <p className="text-custom-brown-600 dark:text-custom-brown-900">
                {t(`work${index + 1}.description`)}
              </p>
              <div className="flex items-center gap-2 text-custom-brown-500 dark:text-custom-brown-900">
                <CalendarIcon className="h-5 w-5" />
                <span className="text-sm">{t(`work${index + 1}.date`)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

function CalendarIcon(props: CalendarIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
