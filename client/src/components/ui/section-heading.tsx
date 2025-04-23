import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <motion.div 
      className={`mb-16 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}
