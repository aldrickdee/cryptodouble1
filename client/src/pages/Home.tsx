import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Deposit from '@/components/Deposit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-white antialiased">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Calculator />
      <Testimonials />
      <FAQ />
      <Deposit />
      <Footer />
    </div>
  );
}
