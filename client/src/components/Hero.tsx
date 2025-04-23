import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import xrpLogo from '@/assets/icons/xrp-logo.svg';
import suiLogo from '@/assets/icons/sui-logo.svg';

export default function Hero() {
  const { ref: parallaxRef } = useParallax();
  
  return (
    <div className="relative pt-20 pb-32 overflow-hidden bg-primary">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      
      {/* Floating crypto icons */}
      <motion.div 
        className="absolute top-1/4 left-[15%] w-16 h-16 opacity-40"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <img src={xrpLogo} alt="XRP" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-[20%] w-12 h-12 opacity-30"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <img src={suiLogo} alt="SUI" />
      </motion.div>
      
      <div ref={parallaxRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block">Double Your</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              XRP & SUI
            </span>
            <span className="block">Investment</span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Secure, fast, and guaranteed returns. Double your crypto investment within 24 hours.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg px-8">
              <a href="#calculator">
                Calculate Returns
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 group">
              <a href="#how-it-works">
                How It Works
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-10 pt-8 border-t border-gray-700/50 max-w-3xl mx-auto flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-gray-300">Secure Transactions</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-gray-300">Fast Processing</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-300">100% Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}