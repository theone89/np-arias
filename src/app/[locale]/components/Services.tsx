"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";

export default function Service() {
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  // Obtener categorías de servicios desde la traducción
  const serviceCategories = Object.keys(t.raw("home.services")).filter(
    (key) => key !== "title"
  );

  // Seleccionar una categoría al azar si no hay ninguna seleccionada
  useEffect(() => {
    if (!selectedCategory && serviceCategories.length > 0) {
      setSelectedCategory(serviceCategories[0]);
    }
  }, [serviceCategories, selectedCategory]);

  // Obtener imágenes aleatorias
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

  // Obtener servicios filtrados
  const filteredServices =
    selectedCategory && t.raw(`home.services.${selectedCategory}.services`)
      ? t.raw(`home.services.${selectedCategory}.services`)
      : [];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          {t("home.services.title")}
        </h2>

        {/* Filtros con separador | */}
        <div className="flex justify-center items-center mb-10 flex-wrap gap-3">
          {serviceCategories.map((category, idx) => {
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
                  {t(`home.services.${category}.title`)}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader className="w-10 h-10 text-custom-brown-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map(
                (
                  service: { name: string; description: string },
                  index: number
                ) => (
                  <Card
                    key={index}
                    className="bg-custom-terracotta-100 dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
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
                      <p className="text-gray-700 dark:text-gray-300">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              )
            ) : (
              <p className="text-center text-gray-500">
                {t("home.services.noServices")}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
