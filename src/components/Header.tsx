
import { Calculator, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PiggyBank className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FinanceTracker</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              <Calculator className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" className="text-white hover:bg-blue-700">
              <Wallet className="h-4 w-4 mr-2" />
              Budget
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
