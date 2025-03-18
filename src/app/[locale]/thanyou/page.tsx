"use client";

import { useTranslations } from "next-intl"; // Importar hook de i18n

export default function ThankYou() {
  const t = useTranslations(); // Traducciones dinámicas

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-ivory-100 dark:bg-custom-terracotta-900">
      <div className="text-center p-6 bg-white dark:bg-custom-terracotta-700 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-custom-brown-800 dark:text-custom-ivory-500">
          {t("contact.thankYouTitle")}
        </h1>
        <p className="text-lg text-custom-brown-600 dark:text-custom-ivory-300 mt-4">
          {t("contact.thankYouMessage")}
        </p>
      </div>
    </div>
  );
}
