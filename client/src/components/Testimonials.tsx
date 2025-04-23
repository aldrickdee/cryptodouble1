import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "James Wilson",
    title: "XRP Investor",
    testimonial: "I was skeptical at first, but after receiving double my XRP investment, I'm a true believer! The process was smooth and exactly as described.",
    avatar: "JW",
    stars: 5,
    crypto: "xrp"
  },
  {
    name: "Sophia Chen",
    title: "Crypto Enthusiast",
    testimonial: "Doubled my SUI tokens within 24 hours. This service is incredible! I've recommended it to all my friends in the crypto space.",
    avatar: "SC",
    stars: 5,
    crypto: "sui"
  },
  {
    name: "Marcus Johnson",
    title: "Day Trader",
    testimonial: "Been trading crypto for years, and this is one of the most reliable services I've found. Doubled my XRP exactly as promised.",
    avatar: "MJ",
    stars: 4,
    crypto: "xrp"
  },
  {
    name: "Emma Thompson",
    title: "SUI Investor",
    testimonial: "Quick, secure, and reliable. I've used the service multiple times to double my SUI investments, and it's been perfect every time.",
    avatar: "ET",
    stars: 5,
    crypto: "sui"
  },
  {
    name: "David Rodriguez",
    title: "Blockchain Developer",
    testimonial: "As someone who works in the blockchain space, I was impressed by the efficiency of this service. My XRP doubled just as advertised.",
    avatar: "DR",
    stars: 4,
    crypto: "xrp"
  },
  {
    name: "Olivia Park",
    title: "Long-term Investor",
    testimonial: "I've been using this service to grow my SUI portfolio steadily. It's become an essential part of my investment strategy.",
    avatar: "OP",
    stars: 5,
    crypto: "sui"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  
  const updateDisplayCount = useCallback(() => {
    if (window.innerWidth < 768) {
      setDisplayCount(1);
    } else if (window.innerWidth < 1024) {
      setDisplayCount(2);
    } else {
      setDisplayCount(3);
    }
  }, []);
  
  useEffect(() => {
    updateDisplayCount();
    
    window.addEventListener('resize', updateDisplayCount);
    return () => window.removeEventListener('resize', updateDisplayCount);
  }, [updateDisplayCount]);
  
  const maxIndex = Math.max(0, testimonials.length - displayCount);
  
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + displayCount);
  
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Users Say"
          subtitle="Hear from investors who have doubled their XRP and SUI with our service"
          centered
        />
        
        <div className="mt-16 relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x: `calc(-${activeIndex * 100}% / ${displayCount})` 
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`bg-primary rounded-xl p-6 flex-shrink-0 border border-gray-700/50 shadow-lg`}
                  style={{ width: `calc(100% / ${displayCount})` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="mb-6 text-gray-300">
                    "{testimonial.testimonial}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 text-white font-semibold ${
                      testimonial.crypto === 'xrp' ? 'bg-[#23292F]' : 'bg-[#6BCEFF]'
                    }`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.title}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext} 
              disabled={activeIndex >= maxIndex}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}