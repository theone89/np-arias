"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const locale = useLocale()
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(`/${locale}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSubmissionStatus(data.error || "Error desconocido");
    }
  } catch (error) {
    setSubmissionStatus("Error al enviar el mensaje");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="px-6 py-12 bg-custom-ivory-100 dark:bg-custom-terracotta-900 text-center">
      <h1 className="text-4xl font-bold mb-4 text-custom-brown-800 dark:text-custom-ivory-500">
        {t("contact.contactFormTitle")}
      </h1>
      <p className="mb-8 text-lg text-custom-brown-600 dark:text-custom-ivory-300">
        {t("contact.contactFormSubtitle")}
      </p>

      {submissionStatus === "success" ? (
        <div className="inline-flex flex-col items-center p-4 bg-green-500 text-white rounded-lg">
  <p className="mb-2 text-center">{t("contact.formSuccess")}</p>
  <Link href={"/"} className="flex items-center justify-center">
    <HomeIcon className="w-6 h-6 " /> 
  </Link>
</div>

      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <div>
            <label className="block text-left text-lg text-custom-brown-800 dark:text-custom-ivory-500 mb-2">
              {t("contact.formNameLabel")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-white dark:bg-custom-terracotta-200 text-custom-brown-800 dark:text-custom-ivory-500 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-left text-lg text-custom-brown-800 dark:text-custom-ivory-500 mb-2">
              {t("contact.formEmailLabel")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white dark:bg-custom-terracotta-200 text-custom-brown-800 dark:text-custom-ivory-500 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-left text-lg text-custom-brown-800 dark:text-custom-ivory-500 mb-2">
              {t("contact.formMessageLabel")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-white dark:bg-custom-terracotta-200 text-custom-brown-800 dark:text-custom-ivory-500 border border-gray-300 rounded-md"
              rows={4}
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-custom-gold-500 text-white rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("contact.submitting") : t("contact.submitButton")}
          </Button>
        </form>
      )}
    </div>
  );
}
