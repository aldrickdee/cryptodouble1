import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import { ChevronDown } from 'lucide-react';

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
      className="border-b border-gray-700/50 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown 
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-blue-400`} 
          size={20} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const faqItems = [
  {
    question: "How does the cryptocurrency doubling process work?",
    answer: "Our platform uses advanced trading algorithms and strategic market positioning to generate returns. When you deposit XRP or SUI tokens, our system immediately begins executing trades to double your investment, returning the doubled amount to your wallet within 24 hours."
  },
  {
    question: "Is there a minimum investment amount?",
    answer: "Yes, the minimum deposit amount is 10 XRP or 50 SUI. This ensures we have enough volume to execute our doubling strategy effectively."
  },
  {
    question: "How long does it take to receive my doubled cryptocurrency?",
    answer: "You'll receive your doubled XRP or SUI within 24 hours of your initial deposit. In most cases, returns are processed much faster, often within just a few hours."
  },
  {
    question: "Are there any fees for using this service?",
    answer: "There are no additional fees for using our service. What you see is what you get - deposit the amount you want to invest, and receive double that amount back."
  },
  {
    question: "Is my investment secure?",
    answer: "Yes, we employ industry-standard security measures to protect all deposits. Our platform operates on secure servers with advanced encryption to ensure all transactions are safe."
  },
  {
    question: "What happens if the market crashes during my investment period?",
    answer: "Our doubling strategy is market-neutral, meaning it works regardless of market conditions. Even if prices fall dramatically, you'll still receive double your original investment amount."
  },
  {
    question: "Can I make multiple deposits?",
    answer: "Absolutely! You can make as many deposits as you like. Each deposit will be processed separately and doubled within 24 hours."
  },
  {
    question: "Which wallets are compatible with your service?",
    answer: "Our service works with any standard XRP or SUI wallet. As long as you can send and receive XRP or SUI, you can use our cryptocurrency doubling service."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our cryptocurrency doubling service"
          centered
        />
        
        <div className="mt-16 rounded-xl bg-secondary/50 border border-gray-700/50 overflow-hidden divide-y divide-gray-700/50">
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
        
        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Don't see your question answered here? 
            <a href="#contact" className="text-blue-400 hover:text-blue-300 ml-1">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}