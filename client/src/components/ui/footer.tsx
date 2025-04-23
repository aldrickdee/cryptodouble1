import { Heart } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <a href="#how-it-works" className="text-gray-400 hover:text-gray-300">
              How It Works
            </a>
            <a href="#calculator" className="text-gray-400 hover:text-gray-300">
              Calculator
            </a>
            <a href="#deposit" className="text-gray-400 hover:text-gray-300">
              Deposit
            </a>
            <a href="#faq" className="text-gray-400 hover:text-gray-300">
              FAQ
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 flex flex-col sm:flex-row justify-center md:justify-start items-center">
            <Link href="/" className="text-blue-500 text-xl font-bold">
              CryptoDouble
            </Link>
            <p className="mt-2 sm:mt-0 sm:ml-4 text-center text-sm text-gray-400">
              &copy; {currentYear} CryptoDouble. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}