import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CryptoDouble</h3>
            <p className="text-gray-400 mb-4">The fastest way to double your SOL and SUI investments. Our platform uses advanced blockchain technology to maximize your cryptocurrency portfolio.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#calculator" className="text-gray-400 hover:text-white transition-colors">Calculator</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#deposit" className="text-gray-400 hover:text-white transition-colors">Deposit Now</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">support@cryptodouble.com</span>
              </li>
              <li className="flex items-start">
                <ShoppingBag className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">24/7 Support Available</span>
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-4">Newsletter</h3>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none" 
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-blue-500 hover:bg-blue-600"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CryptoDouble. All rights reserved. Cryptocurrency investments involve risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
