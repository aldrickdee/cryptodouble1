import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  color: string;
  delay: number;
}

function StatCounter({ value, label, suffix = "", color, delay }: StatProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startValue = 0;
    const endValue = value;
    const duration = 2000;
    const startTime = Date.now();
    
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
        
        setCount(currentValue);
        
        if (progress === 1) {
          clearInterval(counter);
        }
      }, 20);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return (
    <div>
      <p className={`text-4xl md:text-5xl font-bold mb-2 ${color}`}>
        {formatNumber(count)}{suffix}
      </p>
      <p className="text-gray-400 text-lg">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StatCounter 
            value={25000} 
            label="Total XRP Doubled" 
            color="text-blue-400"
            delay={0}
          />
          <StatCounter 
            value={15000} 
            label="Total SUI Doubled" 
            color="text-purple-400"
            delay={200}
          />
          <StatCounter 
            value={98} 
            label="Success Rate" 
            suffix="%" 
            color="text-green-400"
            delay={400}
          />
          <StatCounter 
            value={1250} 
            label="Happy Investors" 
            color="text-yellow-400"
            delay={600}
          />
        </motion.div>
      </div>
    </section>
  );
}