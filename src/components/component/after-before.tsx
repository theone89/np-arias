import { useTranslations } from "next-intl";
import Image from "next/image";
interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {}

export function AfterBefore() {
  const t = useTranslations("AfterBefore");

  return (
    <section className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-6">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-6 rounded-lg bg-background p-4 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl md:flex-row"
        >
          <Image
            src="/placeholder.svg"
            alt={t(`work${index}.title`)}
            width={400}
            height={300}
            className="h-full max-h-[300px] w-full max-w-[400px] rounded-lg object-cover md:w-1/2"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="space-y-2 md:w-1/2">
            <h3 className="text-xl font-bold">{t(`work${index}.title`)}</h3>
            <p className="text-muted-foreground">
              {t(`work${index}.description`)}
            </p>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t(`work${index}.date`)}
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
