import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check, ArrowRight, Clock } from 'lucide-react';
import { walletAddresses } from '@/lib/utils';

// Generate a random amount between min and max with decimals
const randomAmount = (min: number, max: number, decimals: number = 2) => {
  const rand = Math.random() * (max - min) + min;
  return Number(rand.toFixed(decimals));
};

// Generate a random wallet address
const generateWalletAddress = (type: 'solana' | 'sui') => {
  if (type === 'solana') {
    return Array.from({ length: 44 }, () => 
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[
        Math.floor(Math.random() * 58)
      ]
    ).join('');
  } else {
    return '0x' + Array.from({ length: 64 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  }
};

// Generate a random transaction
const generateTransaction = () => {
  const cryptoType = Math.random() > 0.5 ? 'solana' : 'sui';
  const isDeposit = Math.random() > 0.3;
  const amount = cryptoType === 'solana' 
    ? randomAmount(1, 10) 
    : randomAmount(100, 1000);
  const timeAgo = Math.floor(Math.random() * 30) + 1;
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    type: cryptoType,
    status: isDeposit ? 'pending' : 'completed',
    amount: amount,
    receiverAddress: isDeposit ? walletAddresses[cryptoType] : generateWalletAddress(cryptoType),
    senderAddress: generateWalletAddress(cryptoType),
    timeAgo: timeAgo, // seconds ago
    isDeposit: isDeposit
  };
};

const formatWalletAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default function LiveTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    // Add initial transactions
    const initialTransactions = Array.from({ length: 5 }, () => generateTransaction());
    setTransactions(initialTransactions);
    
    // Add a new transaction every 1-3 seconds
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTransaction = generateTransaction();
        const updated = [newTransaction, ...prev];
        
        // Keep only the latest 20 transactions
        if (updated.length > 20) {
          return updated.slice(0, 20);
        }
        return updated;
      });
    }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-primary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Live Transactions</h2>
          <p className="text-white max-w-3xl mx-auto">
            Watch real-time as users from around the world double their cryptocurrency investments
          </p>
        </div>
        
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 overflow-hidden">
          <div className="flex justify-between text-sm text-white mb-4 px-4 font-medium">
            <span className="hidden sm:block flex-1">Type</span>
            <span className="flex-1">Amount</span>
            <span className="hidden md:block flex-1">From</span>
            <span className="hidden md:block flex-1">To</span>
            <span className="flex-1 text-right">Status</span>
          </div>
          
          <div className="space-y-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 text-sm hover:bg-gray-800/70 transition-colors"
                >
                  <div className="hidden sm:flex flex-1 items-center">
                    {tx.type === 'solana' ? (
                      <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-white">SOL</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#6BCEFF] flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-white">SUI</span>
                      </div>
                    )}
                    <span>{tx.type === 'solana' ? 'Solana' : 'SUI'}</span>
                  </div>
                  
                  <div className="flex-1 font-medium">
                    {tx.isDeposit ? (
                      <span className="text-green-400">+{tx.amount} {tx.type === 'solana' ? 'SOL' : 'SUI'}</span>
                    ) : (
                      <span className="text-purple-400">x2 {tx.amount * 2} {tx.type === 'solana' ? 'SOL' : 'SUI'}</span>
                    )}
                  </div>
                  
                  <div className="hidden md:block flex-1 text-gray-400 font-mono text-xs">
                    {formatWalletAddress(tx.senderAddress)}
                  </div>
                  
                  <div className="hidden md:block flex-1 text-gray-400 font-mono text-xs">
                    {formatWalletAddress(tx.receiverAddress)}
                  </div>
                  
                  <div className="flex-1 flex justify-end">
                    {tx.status === 'pending' ? (
                      <div className="flex items-center text-yellow-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-xs">Processing</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs">Completed</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}