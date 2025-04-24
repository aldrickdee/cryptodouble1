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
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from './ui/section-heading';
import { ArrowDown } from 'lucide-react';
import { calculateDouble, walletAddresses } from '@/lib/utils';

// SVG Icons
const SolanaIcon = () => (
  <div className="w-10 h-10 mr-3 rounded-full bg-black flex items-center justify-center">
    <span className="font-bold text-[#00FFA3]">SOL</span>
  </div>
);

const SUIIcon = () => (
  <div className="w-10 h-10 mr-3 rounded-full bg-[#6BCEFF] flex items-center justify-center">
    <span className="font-bold text-white">SUI</span>
  </div>
);

const calculatorSchema = z.object({
  investmentAmount: z.coerce
    .number()
    .min(1, { message: "Investment amount must be at least 1" })
    .max(1000000, { message: "Investment amount must be less than 1,000,000" }),
  walletAddress: z.string().optional(),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

export default function Calculator() {
  const [selectedCrypto, setSelectedCrypto] = useState<'solana' | 'sui'>('solana');
  const [calculatedAmount, setCalculatedAmount] = useState<number>(200);
  
  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      investmentAmount: 100,
      walletAddress: '',
    },
  });

  function onSubmit(data: CalculatorFormValues) {
    setCalculatedAmount(calculateDouble(data.investmentAmount));
  }
  
  // Handler for mobile view button
  function handleMobileCalculate() {
    const amount = form.getValues('investmentAmount');
    if (amount) {
      setCalculatedAmount(calculateDouble(amount));
    }
  }
  
  const minDeposit = selectedCrypto === 'solana' ? 1 : 100;

  return (
    <section id="calculator" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Calculate Your Returns"
          subtitle="Use our investment calculator to see how much you'll receive when you double your Solana or SUI"
          centered
        />
        
        {/* Mobile View */}
        <div className="lg:hidden mt-10">
          <div className="space-y-6 rounded-2xl overflow-hidden">
            {/* Mobile Tabs */}
            <div className="flex rounded-xl bg-secondary/50 p-1">
              <button
                className={`flex-1 flex items-center justify-center py-3 rounded-lg text-sm font-medium ${
                  selectedCrypto === 'solana' 
                    ? 'bg-black text-[#00FFA3] shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedCrypto('solana')}
              >
                <SolanaIcon />
                <span className="ml-2">Solana</span>
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
            
            {/* Mobile Results Card */}
            <Card className="bg-secondary border-0 shadow-lg overflow-hidden">
              <div className="px-5 py-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Your Investment</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCrypto === 'solana' ? 'bg-black/20 text-[#00FFA3]' : 'bg-[#6BCEFF]/20 text-white'
                  }`}>
                    {selectedCrypto.toUpperCase()}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span className="text-gray-400">Amount:</span>
                    </div>
                    <input
                      type="number"
                      value={form.watch('investmentAmount') || 100}
                      onChange={(e) => form.setValue('investmentAmount', Number(e.target.value))}
                      className="w-full pl-24 pr-12 py-4 rounded-xl bg-primary/60 border-none text-right text-xl font-bold focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className="text-gray-400">{selectedCrypto.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center mb-2">
                      <ArrowDown className="h-5 w-5 text-blue-500 mr-2" />
                      <p className="text-sm text-blue-400">Doubled Return</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <motion.span 
                        className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                        animate={{ 
                          scale: [1, 1.03, 1],
                          transition: { duration: 0.4 }
                        }}
                        key={calculatedAmount}
                      >
                        {calculatedAmount}
                      </motion.span>
                      <span className="text-lg text-blue-500">{selectedCrypto.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing Time:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Fee:</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Minimum Deposit:</span>
                      <span className="font-medium">{minDeposit} {selectedCrypto.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleMobileCalculate} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 py-6 rounded-xl text-white font-bold text-lg shadow-lg"
                  >
                    Calculate Returns
                  </Button>
                </div>
                
                <div className="mt-6">
                  <a 
                    href="#deposit"
                    className="block w-full text-center text-blue-500 font-medium py-2"
                  >
                    Double My Investment Now
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 items-start mt-16">
          <Card className="lg:col-span-3 bg-secondary border-secondary">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-300">Select Cryptocurrency</div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className={`flex items-center justify-start p-4 h-auto ${
                          selectedCrypto === 'solana' ? 'bg-black/10 border-[#00FFA3]' : ''
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
                  
                  <FormField
                    control={form.control}
                    name="investmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="100" 
                              {...field} 
                              type="number"
                              className="pr-16"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <span className="text-gray-500 sm:text-sm">{selectedCrypto.toUpperCase()}</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Wallet Address (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your wallet address" 
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-sm text-gray-400 mt-2">You can also provide your wallet address later</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    Calculate Returns
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2 bg-secondary border-secondary">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Your Investment Results</h3>
              
              <div className="space-y-6">
                <div className="bg-primary/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">You Send</p>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{form.watch('investmentAmount') || 100}</span>
                    <span className="text-lg">{selectedCrypto.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowDown className="h-8 w-8 text-blue-500" />
                </div>
                
                <motion.div 
                  className="bg-blue-500/20 p-4 rounded-lg border border-blue-500"
                  animate={{ 
                    scale: [1, 1.03, 1],
                    transition: { duration: 0.4 }
                  }}
                  key={calculatedAmount}
                >
                  <p className="text-sm text-blue-500 mb-1">You Receive (Doubled)</p>
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold text-blue-500">{calculatedAmount}</span>
                    <span className="text-lg text-blue-500">{selectedCrypto.toUpperCase()}</span>
                  </div>
                </motion.div>
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing Time:</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fee:</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Minimum Deposit:</span>
                    <span className="font-medium">{minDeposit} {selectedCrypto.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  asChild
                >
                  <a href="#deposit">Double My Investment Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
