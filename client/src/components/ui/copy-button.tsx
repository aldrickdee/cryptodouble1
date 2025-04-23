import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy}
            className="bg-secondary px-4 py-4 h-auto rounded-none hover:bg-gray-700 transition-colors"
          >
            {copied ? 
              <Check className="h-5 w-5" /> : 
              <Copy className="h-5 w-5" />
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
