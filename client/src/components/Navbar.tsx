import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Calculator", href: "#calculator" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    setLocation(href);
  };

  return (
    <nav className={cn(
      "fixed w-full z-50 py-3 px-4 md:px-8 transition-all duration-300",
      isScrolled ? "bg-secondary/90 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-blue-500 text-2xl font-bold">CryptoDouble</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#deposit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Start Now
          </a>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-gradient-to-b from-secondary/95 to-primary/95 backdrop-blur-lg p-4 space-y-3 overflow-auto z-50 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full">
            <div className="space-y-2 py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-3 text-base font-medium hover:text-blue-500 transition-colors rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="ml-2">{item.name}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-auto pb-8 pt-4">
              <a
                href="#deposit"
                className="block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-4 rounded-xl text-center font-medium text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Start Doubling Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
