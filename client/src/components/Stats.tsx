import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  color: string;
  delay: number;
}

const statsData: StatProps[] = [
  { value: 7500, label: "Successful investments", suffix: "+", color: "text-blue-500", delay: 0 },
  { value: 100, label: "Return rate", suffix: "%", color: "text-purple-500", delay: 0.1 },
  { value: 24, label: "Average process time", suffix: "h", color: "text-blue-500", delay: 0.2 },
  { value: 15, label: "SOL & SUI processed", suffix: "M+", color: "text-purple-500", delay: 0.3 },
];

function StatCounter({ value, label, suffix = "", color, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startValue = 0;
    const duration = 2000; // ms
    const step = Math.ceil(value / (duration / 16)); // 60fps
    
    const timer = setInterval(() => {
      startValue += step;
      
      if (startValue > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(startValue);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div 
      className="flex flex-col items-center"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <p className={`text-3xl md:text-4xl font-bold ${color}`}>
        {formatNumber(count)}{suffix}
      </p>
      <p className="text-gray-400 text-center">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <StatCounter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
