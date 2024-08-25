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
        const userImages = data.results.map((user) => ({
          before: user.picture.large,
          after: user.picture.medium, // Usar una imagen diferente para "después"
        }));
        setImages(userImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <section className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-6">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-6 rounded-lg bg-background p-4 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl md:flex-row"
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
              handleColor="#fff"
              hover
            />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Desliza para ver el antes y después
            </p>
          </div>
          <div className="space-y-2 md:w-1/2">
            <h3 className="text-xl font-bold">{t(`work${index + 1}.title`)}</h3>
            <p className="text-muted-foreground">
              {t(`work${index + 1}.description`)}
            </p>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t(`work${index + 1}.date`)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
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
