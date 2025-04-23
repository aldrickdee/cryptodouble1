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
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background with overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Mobile floating coins for visual appeal (only visible on mobile) */}
      <div className="absolute inset-0 z-1 md:hidden">
        <motion.div 
          className="w-20 h-20 absolute top-[20%] right-[15%] opacity-70"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <div className="w-full h-full bg-[#23292F] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">XRP</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-24 h-24 absolute bottom-[30%] left-[10%] opacity-70"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ 
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          <div className="w-full h-full bg-[#6BCEFF] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-white">SUI</span>
          </div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-4 py-24 md:py-0 z-10 gap-8">
        <motion.div 
          className="space-y-6 md:space-y-8 pt-8 md:pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile optimization for heading - larger on desktop, easier to read on mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-white">Double Your</span>
            <div className="flex flex-wrap gap-x-4 mt-1">
              <span className="bg-gradient-to-r from-[#23292F] to-[#6BCEFF] text-transparent bg-clip-text">XRP</span>
              <span className="text-white">&</span>
              <span className="bg-gradient-to-r from-[#6BCEFF] to-blue-500 text-transparent bg-clip-text">SUI</span>
            </div>
            <span className="text-white">Investments</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl">
            Maximize your cryptocurrency portfolio with our proven investment strategy. 
            Double your XRP and SUI holdings within our secure platform.
          </p>
          
          {/* Mobile-friendly button layout - stacked on small screens */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white py-6 rounded-xl text-base sm:text-lg font-medium shadow-lg"
              asChild
            >
              <a href="#calculator">Calculate Returns</a>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-xl py-6"
              asChild
            >
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
          
          {/* Investor avatars with animation on mobile */}
          <motion.div 
            className="flex items-center space-x-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white font-bold overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-white font-bold overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white font-bold overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-bold">1,500+</span> investors already doubled their assets
            </p>
          </motion.div>
        </motion.div>
        
        {/* Desktop parallax coins */}
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
