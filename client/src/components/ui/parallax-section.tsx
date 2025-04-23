import { ReactNode } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { cn } from '@/lib/utils';

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
  className 
}: ParallaxSectionProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <Parallax speed={-10} className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </Parallax>
      {children}
    </section>
  );
}
