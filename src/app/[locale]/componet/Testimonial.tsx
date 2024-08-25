// src/components/Testimonial.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { Testimonial, Users, Result } from "../types/types";
export default function Testimonial() {
  const t = useTranslations();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://randomuser.me/api/?results=4");
        const data: Users = await response.json();
        const userTestimonials: Testimonial[] = data.results.map(
          (user: Result) => ({
            name: `${user.name.first} ${user.name.last}`,
            text: "Excelente atención y resultados increíbles. ¡Totalmente recomendado!", // Puedes generar textos aleatorios si lo deseas
            image: user.picture.large,
          })
        );
        setTestimonials(userTestimonials);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
          {t("home.testimonials.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-700 shadow-lg">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    &quot;{testimonial.text} &quot;
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
