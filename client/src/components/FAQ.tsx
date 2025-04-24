import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import SectionHeading from './ui/section-heading';

const faqItems = [
  {
    question: "How does the doubling process work?",
    answer: "Our investment platform utilizes advanced blockchain technology and market strategies to double your SOL and SUI cryptocurrency. When you deposit your assets, our system immediately allocates them to our proprietary trading algorithm that leverages market inefficiencies to generate returns. Within 24 hours, we return double your initial investment to your wallet."
  },
  {
    question: "Is there a minimum or maximum investment amount?",
    answer: "The minimum investment amount is 1 SOL or 100 SUI. This ensures that transaction fees don't significantly impact your returns. While there's no hard maximum, for larger investments (over 1,000 SOL or 50,000 SUI), we recommend contacting our team directly for personalized handling of your investment."
  },
  {
    question: "How long does it take to receive my doubled returns?",
    answer: "In most cases, you'll receive your doubled cryptocurrency within 24 hours. The exact time can vary depending on network congestion and the size of your investment. Smaller investments typically process faster, often within 6-12 hours. You can always check the status of your investment in your account dashboard."
  },
  {
    question: "Are there any fees for using this service?",
    answer: "No, there are no fees associated with our doubling service. You'll receive exactly double the amount you deposit. The only costs you might incur are the standard blockchain network fees for transferring cryptocurrency, which are not charged by us but are part of the blockchain infrastructure."
  },
  {
    question: "How is the platform able to guarantee double returns?",
    answer: "Our platform leverages a combination of cryptocurrency arbitrage, yield farming on DeFi protocols, and strategic market positioning. We've developed a sophisticated system that takes advantage of price discrepancies across various exchanges and liquidity pools. This allows us to generate consistent returns that fund our double-your-investment promise."
  }
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function AccordionItem({ question, answer, isOpen, onClick, index }: AccordionItemProps) {
  return (
    <motion.div 
      className="bg-secondary rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <button 
        className="w-full flex justify-between items-center p-6 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-bold">{question}</span>
        <ChevronUp 
          className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <p className="text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about doubling your SOL and SUI"
          centered
        />
        
        <div className="space-y-6 mt-16">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleAccordion(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
