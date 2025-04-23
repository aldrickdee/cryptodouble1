import { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const heroImage = 'https://images.unsplash.com/photo-1642532094992-31d3150da9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-4 py-16 md:py-0 z-10 gap-8">
        <motion.div 
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-white">Double Your</span>
            <div className="flex flex-wrap gap-x-4">
              <span className="bg-gradient-to-r from-[#23292F] to-[#6BCEFF] text-transparent bg-clip-text">XRP</span>
              <span className="text-white">&</span>
              <span className="bg-gradient-to-r from-[#6BCEFF] to-blue-500 text-transparent bg-clip-text">SUI</span>
            </div>
            <span className="text-white">Investments</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            Maximize your cryptocurrency portfolio with our proven investment strategy. 
            Double your XRP and SUI holdings within our secure platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              asChild
            >
              <a href="#calculator">Calculate Returns</a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-500"></div>
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-600"></div>
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-700"></div>
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-bold">1,500+</span> investors already doubled their assets
            </p>
          </div>
        </motion.div>
        
        <div className="hidden md:flex justify-center items-center relative">
          <div className="absolute h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"></div>
          <Parallax speed={-5} className="w-40 h-40 absolute top-1/4 right-1/3">
            <div className="w-40 h-40 bg-[#23292F] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">XRP</span>
            </div>
          </Parallax>
          <Parallax speed={5} className="w-40 h-40 absolute bottom-1/4 left-1/3">
            <div className="w-40 h-40 bg-[#6BCEFF] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">SUI</span>
            </div>
          </Parallax>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#how-it-works" className="flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-400 mb-1">Scroll Down</span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </a>
      </div>
    </section>
  );
}
