import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Deposit from '@/components/Deposit';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-primary text-white antialiased pb-16 lg:pb-0">
        <Navbar />
        <Hero />
        <Stats />
        <HowItWorks />
        <Calculator />
        <Testimonials />
        <FAQ />
        <Deposit />
        <Footer />
        <MobileNav />
      </div>
    </ParallaxProvider>
  );
}
