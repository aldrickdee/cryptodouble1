import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useParallaxElement } from '@/hooks/useParallax';
import { Star } from 'lucide-react';
import SectionHeading from './ui/section-heading';
import ParallaxSection from './ui/parallax-section';

const testimonials = [
  {
    name: "Michael J.",
    role: "XRP Investor",
    quote: "I was skeptical at first, but I decided to try with a small amount of XRP. To my surprise, I received double the amount back within 12 hours! Now I'm a regular investor.",
    avatarBg: "bg-gray-500",
    rating: 5
  },
  {
    name: "Sarah K.",
    role: "SUI Investor",
    quote: "The doubling process was seamless. I deposited 500 SUI and received 1000 SUI back the next day. The calculator was spot on with the returns I received.",
    avatarBg: "bg-gray-600",
    rating: 5
  },
  {
    name: "Robert T.",
    role: "XRP & SUI Investor",
    quote: "I've been doubling both my XRP and SUI holdings for the past month. The consistency and reliability of the service is impressive. The interface makes it easy to track my investments.",
    avatarBg: "bg-gray-700", 
    rating: 5
  }
];

const bgImage = 'https://images.unsplash.com/photo-1645888759874-7a603ed1cede?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80';

export default function Testimonials() {
  const [ref, isInView] = useParallaxElement();

  return (
    <ParallaxSection
      id="testimonials"
      bgImage={bgImage}
      className="py-20 lg:py-32 bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="What Our Investors Say"
          subtitle="Here's what people are saying about their doubled investments"
          centered
        />
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-secondary/60 backdrop-blur-md p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 50 
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
            >
              <div className="flex items-center mb-4">
                <div className={`h-12 w-12 rounded-full ${testimonial.avatarBg} mr-4 flex items-center justify-center text-white font-bold`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">
                "{testimonial.quote}"
              </p>
              <div className="mt-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
