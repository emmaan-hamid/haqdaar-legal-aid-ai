import { Cursor } from "@/components/haqdaar/Cursor";
import { QuickExit } from "@/components/haqdaar/QuickExit";
import { Navbar } from "@/components/haqdaar/Navbar";
import { Hero } from "@/components/haqdaar/Hero";
import { Stats } from "@/components/haqdaar/Stats";
import { Process } from "@/components/haqdaar/Process";
import { Features } from "@/components/haqdaar/Features";
import { WhoFor } from "@/components/haqdaar/WhoFor";
import { Categories } from "@/components/haqdaar/Categories";
import { Faq } from "@/components/haqdaar/Faq";
import { Testimonials } from "@/components/haqdaar/Testimonials";
import { Banner } from "@/components/haqdaar/Banner";
import { Comparison } from "@/components/haqdaar/Comparison";
import { Impact } from "@/components/haqdaar/Impact";
import { Safety } from "@/components/haqdaar/Safety";
import { Footer } from "@/components/haqdaar/Footer";
import { useReveal } from "@/components/haqdaar/useReveal";

const Index = () => {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <QuickExit />
      <Navbar />
      <Hero />
      <Stats />
      <Process />
      <Features />
      <WhoFor />
      <Categories />
      <Faq />
      <Comparison />
      <Impact />
      <Safety />
      <Testimonials />
      <Banner />
      <Footer />
    </main>
  );
};

export default Index;
