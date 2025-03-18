"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Importa el hook

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function ContactForm() {
  const t = useTranslations(); // Traducciones dinámicas
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/gracias");
    } else {
      alert("Error al enviar el mensaje");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-custom-ivory-100 dark:bg-custom-terracotta-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-custom-brown-800 dark:text-custom-ivory-500 mb-4">
        {t("common.form")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-custom-brown-700 dark:text-custom-ivory-400 font-semibold">
            {t("contact.name")}
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full p-3 border border-custom-gold-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold-300"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-custom-brown-700 dark:text-custom-ivory-400 font-semibold">
            {t("contact.email")}
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-custom-gold-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold-300"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-custom-brown-700 dark:text-custom-ivory-400 font-semibold">
            {t("contact.message")}
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full p-3 border border-custom-gold-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-gold-300"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-custom-gold-500 text-white font-bold rounded-lg shadow-md hover:bg-custom-gold-600 transition"
          disabled={loading}
        >
          {loading ? t("contact.sending") : t("contact.submit")}
        </button>
      </form>
    </div>
  );
}
