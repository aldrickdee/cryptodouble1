import { ReactNode } from 'react';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  id?: string;
  children: ReactNode;
  bgImage: string;
  className?: string;
}

export default function ParallaxSection({ 
  id,
  children, 
  bgImage,
  className = ""
}: ParallaxSectionProps) {
  const { scrollY } = useParallax();
  
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          transform: `translateY(${scrollY * 0.25}px)`,
          filter: 'brightness(0.3) blur(3px)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}