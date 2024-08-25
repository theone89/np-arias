"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Service() {
  const [randomImages, setRandomImages] = useState<any[]>([]);
  const t = useTranslations();
  const services = [
    "Maquillaje Profesional",
    "Tratamiento de Piel",

    "Depilación",
    "Masajes Relajantes",
  ];

  useEffect(() => {
    const fetchRandomImages = async () => {
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=medical&per_page=3",
        {
          headers: {
            Authorization:
              "jqo8yuiSNkhLXTBmD65p9mTgTZlJefJE2LCY3GpFqZT8aQRTcyXYHS7F",
          },
        }
      );
      const data = await response.json();
      setRandomImages(data.photos);
    };

    fetchRandomImages();
  }, []);
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
          {t("home.services.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomImages.map((image, index) => (
            <Card
              key={index}
              className="bg-gray-50 dark:bg-gray-800 shadow-lg overflow-hidden"
            >
              <Image
                src={image.src.medium}
                alt={image.photographer}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {services[index % services.length]}{" "}
                  {/* Usar el nombre del servicio */}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("home.services.description")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
