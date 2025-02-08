"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
};

type CustomButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <button
      {...props}
      className="bg-custom-gold-500 hover:bg-custom-gold-600 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300"
    >
      {children}
    </button>
  );
}

type CustomInputProps = {
  type: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function CustomInput({ icon: Icon, ...props }: CustomInputProps) {
  return (
    <div className="flex items-center border border-custom-gold-300 dark:border-custom-gold-600 rounded px-3 py-2 bg-white dark:bg-custom-brown-800 transition-all duration-300">
      {Icon && (
        <Icon className="text-custom-gold-500 dark:text-custom-gold-400 mr-2" />
      )}
      <input
        {...props}
        className="w-full focus:outline-none bg-transparent text-custom-brown-800 dark:text-custom-ivory-100"
      />
    </div>
  );
}

type CustomCardProps = {
  children: React.ReactNode;
};

function CustomCard({ children }: CustomCardProps) {
  return (
    <div className="bg-custom-ivory-100   dark:bg-custom-brown-900 rounded-xl shadow-2xl p-6 transition-all duration-300">
      {children}
    </div>
  );
}

export default function ScheduleAppointment() {
  const t = useTranslations("Schedule");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedDate: formData.date,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }

      alert(t("successMessage"));
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert(t("errorMessage"));
    }

    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" ">
      <CustomCard>
        <h2 className="text-xl font-bold text-custom-brown-700 dark:text-custom-ivory-100 mb-4">
          {t("title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            type="text"
            name="name"
            icon={User}
            placeholder={t("namePlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="email"
            name="email"
            icon={Mail}
            placeholder={t("emailPlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="tel"
            name="phone"
            icon={Phone}
            placeholder={t("phonePlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomInput
            type="date"
            name="date"
            icon={Calendar}
            placeholder={t("datePlaceholder")}
            onChange={handleChange}
            required
          />
          <CustomButton type="submit" disabled={loading}>
            {loading ? t("loading") : t("cta")}
          </CustomButton>
        </form>
      </CustomCard>
    </motion.div>
  );
}
