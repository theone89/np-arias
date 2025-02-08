"use client";
import { motion } from "framer-motion";
import ScheduleAppointment from "./components/ScheduleAppointment";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("SchedulerConsultation");

  return (
    <>
      <div className="hidden lg:flex min-h-screen flex-row items-stretch relative">
        <div className="w-full lg:w-1/2 flex px-4 flex-col justify-center items-center lg:items-start lg:text-left relative z-10 bg-custom-ivory-300">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center"
          >
            <h1 className="text-5xl font-extrabold mb-4 text-custom-gold-500">
              {t("title")}
            </h1>
            <p className="mb-6 text-lg text-custom-brown-700">{t("cta")}</p>
          </motion.div>
          <div className="w-full">
            <ScheduleAppointment />
          </div>
        </div>
        <div
          className="w-full lg:w-1/2 h-screen bg-cover bg-center relative"
          style={{ backgroundImage: "url('/assets/images/lisbet.jpg')" }}
        ></div>
      </div>
      <div
        className="flex lg:hidden min-h-screen relative bg-cover bg-center p-6"
        style={{ backgroundImage: "url('/assets/images/lisbet.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full max-w-lg mx-auto bg-custom-ivory-100 p-8 rounded-lg shadow-lg text-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold mb-4 text-custom-gold-500">
              {t("title")}
            </h1>
            <p className="mb-6 text-lg text-custom-brown-700">{t("cta")}</p>
          </motion.div>
          <div className="w-full mt-6">
            <ScheduleAppointment />
          </div>
        </div>
      </div>
    </>
  );
}
