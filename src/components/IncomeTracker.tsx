
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: string;
}

const IncomeTracker = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const sources = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Rental',
    'Gift',
    'Other'
  ];

  const addIncome = () => {
    if (!amount || !source || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newIncome: Income = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      source,
      description,
      date: new Date().toLocaleDateString(),
    };

    setIncomes([newIncome, ...incomes]);
    setAmount('');
    setSource('');
    setDescription('');

    toast({
      title: "Income Added",
      description: `Added $${amount} income from ${source}`,
    });
  };

  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span>Add Income</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income-amount">Amount ($)</Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="source">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((src) => (
                  <SelectItem key={src} value={src}>
                    {src}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="income-description">Description</Label>
          <Input
            id="income-description"
            placeholder="Source of income"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={addIncome} className="w-full bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Income
        </Button>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeTracker;
