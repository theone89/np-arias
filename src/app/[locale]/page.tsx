import { useTranslations } from "next-intl";
import { AfterBefore } from "@/components/component/after-before";
import Banner from "./components/Banner";
import Testimonial from "./components/Testimonial";
import Promotion from "./components/Promotion";
import Service from "./components/Services";

const HomePage: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col min-h-screen bg-custom-teal-500 dark:bg-gray-900 transition-colors duration-200">
      <main className="flex-grow">
        <section>
          <Banner />
        </section>

        <section>
          <AfterBefore />
        </section>
        <section id="services">
          <Service />
        </section>
        {/*  <section>
          <Testimonial />
        </section>
        <section>
          <Promotion />
        </section> */}
      </main>
    </div>
  );
};

export default HomePage;
