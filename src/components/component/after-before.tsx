"use client";
import { useTranslations } from "next-intl";
import ReactCompareImage from "react-compare-image";
import { useEffect, useState } from "react";

interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {}

export function AfterBefore() {
  const t = useTranslations("AfterBefore");
  const [images, setImages] = useState<{ before: string; after: string }[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://randomuser.me/api/?results=4");
        const data = await response.json();
        const userImages = data.results.map((user: any) => ({
          before: user.picture.large,
          after: user.picture.medium,
        }));
        setImages(userImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="px-6 py-12 bg-custom-ivory-100 dark:bg-custom-terracotta-900 text-center">
      <h2 className="text-3xl font-extrabold text-custom-brown-900 dark:text-custom-gold-100 md:text-4xl">
        {t("title")}
      </h2>
      <h3 className="mt-4 text-xl text-custom-gold-500 dark:text-custom-gold-300">
        {t("subtitle")}
      </h3>
      <button className="mt-6 rounded-lg bg-custom-gold-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-custom-gold-600 focus:outline-none focus:ring-4 focus:ring-custom-gold-300 dark:bg-custom-gold-600 dark:hover:bg-custom-gold-700">
        {t("cta")}
      </button>
      <section className="mt-10 grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center  shadow-2xl rounded-lg bg-custom-ivory-100 border-custom-gold-500 border-spacing-2 border-2 dark:bg-custom-terracotta-200 p-6 shadow-custom-ivory-700 transition-transform duration-300 ease-in-out hover:-translate-y-2  md:flex-row"
          >
            <div className="md:w-1/2">
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
          </div>
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
