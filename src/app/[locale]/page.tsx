import { useTranslations } from "next-intl";
import { AfterBefore } from "@/components/component/after-before";
import Service from "@/components/component/Services";
import Header from "./componet/Header";
import Banner from "./componet/Banner";
import Testimonial from "./componet/Testimonial";
import Promotion from "./componet/Promotion";
import Footer from "./componet/Footer";

const HomePage: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      <main className="flex-grow">
        <section>
          <Banner />
        </section>
        <section>
          <Service />
        </section>
        <section>
          <AfterBefore />
        </section>
        <section>
          <Testimonial />
        </section>
        <section>
          <Promotion />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
