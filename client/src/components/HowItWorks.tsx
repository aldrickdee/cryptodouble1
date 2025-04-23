import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import { Wallet, ArrowRightLeft, Clock, CreditCard } from 'lucide-react';

const steps = [
  {
    title: "Select Your Crypto",
    description: "Choose whether you want to double your XRP or SUI cryptocurrency investment.",
    icon: <Wallet className="h-8 w-8 text-blue-400" />,
    delay: 0
  },
  {
    title: "Make a Deposit",
    description: "Send your XRP or SUI to our secure wallet address. Minimum deposit varies by crypto.",
    icon: <CreditCard className="h-8 w-8 text-purple-400" />,
    delay: 0.1
  },
  {
    title: "Wait for Confirmation",
    description: "Our system processes your transaction and prepares your doubled amount.",
    icon: <Clock className="h-8 w-8 text-green-400" />,
    delay: 0.2
  },
  {
    title: "Receive Double Back",
    description: "Within 24 hours, we'll send double the amount back to your wallet address.",
    icon: <ArrowRightLeft className="h-8 w-8 text-yellow-400" />,
    delay: 0.3
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="Our simple 4-step process to double your XRP and SUI investments"
          centered
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-secondary/50 rounded-xl p-6 relative z-10 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true }}
            >
              <div className="h-14 w-14 rounded-lg bg-primary flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-8 h-2 transform -translate-x-4">
                  <div className="h-0.5 bg-blue-500/50 w-full mt-1.5"></div>
                  <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
              )}
              
              <div className="absolute -top-3 -right-3 bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center">
              <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-5/6 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-blue-400">Important Information</h3>
              <p className="text-gray-300">
                Our system requires a minimum deposit of 10 XRP or 50 SUI. All transactions are processed on the blockchain and can be verified. 
                For optimal results, please ensure you provide your correct wallet address for return payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}