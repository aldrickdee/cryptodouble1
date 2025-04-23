import { Calculator, Home, Settings, DollarSign, HelpCircle } from 'lucide-react';

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-lg border-t border-gray-800 p-2 z-40 lg:hidden">
      <div className="flex justify-around items-center">
        <a 
          href="#" 
          className="flex flex-col items-center p-2 rounded-lg hover:bg-primary/30 active:bg-primary/50 text-gray-400 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </a>
        
        <a 
          href="#calculator" 
          className="flex flex-col items-center p-2 rounded-lg hover:bg-primary/30 active:bg-primary/50 text-gray-400 hover:text-white transition-colors"
        >
          <Calculator className="h-5 w-5" />
          <span className="text-xs mt-1">Calculate</span>
        </a>
        
        <a 
          href="#deposit" 
          className="flex flex-col items-center p-3 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white -mt-5 shadow-lg relative z-10"
        >
          <DollarSign className="h-6 w-6" />
          <span className="text-xs mt-1 font-medium">Deposit</span>
        </a>
        
        <a 
          href="#testimonials" 
          className="flex flex-col items-center p-2 rounded-lg hover:bg-primary/30 active:bg-primary/50 text-gray-400 hover:text-white transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Stats</span>
        </a>
        
        <a 
          href="#faq" 
          className="flex flex-col items-center p-2 rounded-lg hover:bg-primary/30 active:bg-primary/50 text-gray-400 hover:text-white transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Help</span>
        </a>
      </div>
    </div>
  );
}