import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useParallaxElement } from '@/hooks/useParallax';
import { CheckCircle } from 'lucide-react';
import SectionHeading from './ui/section-heading';
import ParallaxSection from './ui/parallax-section';

const stepsData = [
  {
    number: 1,
    title: "Calculate Your Returns",
    description: "Use our investment calculator to see how much you'll receive after doubling your XRP or SUI.",
    features: [
      "Enter your desired investment amount",
      "Choose between XRP or SUI cryptocurrency",
      "See your doubled returns instantly"
    ]
  },
  {
    number: 2,
    title: "Make Your Deposit",
    description: "Send your XRP or SUI to our secure deposit address using your preferred wallet.",
    features: [
      "Copy our verified deposit address",
      "Send your cryptocurrency from any wallet",
      "Receive transaction confirmation"
    ]
  },
  {
    number: 3,
    title: "Receive Double Back",
    description: "Within 24 hours, we'll send back twice the amount of cryptocurrency you deposited.",
    features: [
      "100% doubled return guaranteed",
      "Fast processing within 24 hours",
      "No hidden fees or commissions"
    ]
  }
];

const bgImage = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80';

export default function HowItWorks() {
  const [ref, isInView] = useParallaxElement();

  return (
    <ParallaxSection
      id="how-it-works"
      bgImage={bgImage}
      className="py-20 lg:py-32 bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="How It Works"
          subtitle="Our proven process doubles your XRP and SUI in three simple steps"
          centered
        />
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative bg-secondary/60 backdrop-blur-md p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 50 
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">{step.title}</h3>
              <p className="text-gray-300 mb-6">{step.description}</p>
              <ul className="space-y-2 text-gray-300">
                {step.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
