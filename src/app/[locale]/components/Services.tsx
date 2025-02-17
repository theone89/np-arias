"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Service() {
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const t = useTranslations();

  // Estado para almacenar los servicios en memoria
  const [servicesData, setServicesData] = useState<{
    [key: string]: {
      title: string;
      services: Array<{
        name: string;
        description: string;
        bookingUrl?: string;
        subServices?: Array<{
          name: string;
          description: string;
          price: string;
          duration: string;
        }> | null;
        price?: string;
        duration?: string;
      }>;
    };
  }>({});

  useEffect(() => {
    const rawServices = t.raw("home.services"); // Accede a "home.services"

    if (rawServices && typeof rawServices === "object") {
      setServicesData(rawServices);

      // Obtener las categorías de servicios (usando las claves de los objetos dentro de "services")
      const categories = Object.keys(rawServices).filter(
        (key) => key !== "title" && key !== "ctaOptions"
      );

      // Si hay categorías y no se ha seleccionado ninguna, selecciona la primera
      if (categories.length > 0 && !selectedCategory) {
        setSelectedCategory(categories[0]);
      }
    }
  }, [t, selectedCategory]);

  // Obtener imágenes aleatorias de Pexels
  useEffect(() => {
    const fetchRandomImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.pexels.com/v1/search?query=medical&per_page=6",
          {
            headers: {
              Authorization:
                "jqo8yuiSNkhLXTBmD65p9mTgTZlJefJE2LCY3GpFqZT8aQRTcyXYHS7F",
            },
          }
        );
        const data = await response.json();
        setRandomImages(data.photos || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    };

    fetchRandomImages();
  }, []);

  // Obtener servicios de la categoría seleccionada
  const selectedServices = selectedCategory
    ? servicesData[selectedCategory]?.services || []
    : [];

  const baseBookingUrl = t("cta.bookingUrl");

  return (
    <section className="py-16 bg-gradient-to-b from-[#fdf4e3] to-[#f7e1c2] dark:from-[#2c1b14] dark:to-[#4e2f25]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          {t("home.services.title")}
        </h2>

        {/* Filtros de categoría */}
        <div className="flex justify-center items-center mb-10 flex-wrap gap-3">
          {Object.keys(servicesData)
            .filter((key) => key !== "title") // Excluir el campo "title"
            .map((category, idx) => {
              const isActive = selectedCategory === category;
              return (
                <React.Fragment key={category}>
                  {idx !== 0 && (
                    <span className="text-gray-400 dark:text-gray-500">|</span>
                  )}
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-md font-medium transition-colors rounded-lg ${
                      isActive
                        ? "text-custom-gold-500 border-b-2 border-custom-gold-500"
                        : "text-gray-600 dark:text-gray-300 hover:text-custom-gold-500"
                    }`}
                  >
                    {servicesData[category].title}
                  </button>
                </React.Fragment>
              );
            })}
        </div>

        {/* Contenido de servicios */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader className="w-10 h-10 text-custom-brown-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedServices.length > 0 ? (
              selectedServices.map((service, index) => {
                const serviceBookingUrl =
                  service.bookingUrl ||
                  `${baseBookingUrl}?service=${encodeURIComponent(
                    service.name
                  )}`;

                return (
                  <Card
                    key={index}
                    className="bg-custom-terracotta-200 shadow-2xl shadow-black dark:bg-gray-800 border-2 border-[#d5a48f] dark:border-[#b8895d]  rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={
                        randomImages[index % randomImages.length]?.src
                          ?.medium || "/placeholder.jpg"
                      }
                      alt={service.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        {service.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {service.description}
                      </p>

                      {/* Mostrar subservicios si existen, de lo contrario, mostrar precio y duración directamente */}
                      {service.subServices && service.subServices.length > 0 ? (
                        <div className="mt-4">
                          <button
                            className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() =>
                              setExpandedService(
                                expandedService === index ? null : index
                              )
                            }
                          >
                            <span> {t("home.services.ctaOptions")}</span>
                            {expandedService === index ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {expandedService === index && (
                            <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner transition-all">
                              {service.subServices.map((sub, idx) => (
                                <div
                                  key={idx}
                                  className="mb-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                                >
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {sub.name}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {sub.description}
                                  </p>
                                  <p className="text-sm text-custom-gold-500 font-semibold">
                                    Precio: {sub.price}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Duración: {sub.duration}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        // Si no hay subservicios, mostrar el precio y duración directamente
                        <div className="mt-4">
                          {service.price && (
                            <p className="text-sm text-custom-gold-500 font-semibold">
                              Precio: {service.price}
                            </p>
                          )}
                          {service.duration && (
                            <p className="text-sm text-gray-500">
                              Duración: {service.duration}
                            </p>
                          )}
                        </div>
                      )}

                      <Link href={serviceBookingUrl}>
                        <button className="w-full mt-4 py-2 px-4 text-white font-semibold bg-custom-gold-500 rounded-lg transition-transform duration-200 hover:bg-custom-gold-600 active:scale-95">
                          {t("cta.bookAppointment")}
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-center text-gray-500">
                {t("home.services.noServices") || "No services found."}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
