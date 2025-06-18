
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Other'
  ];

  const addExpense = () => {
    if (!amount || !category || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([newExpense, ...expenses]);
    setAmount('');
    setCategory('');
    setDescription('');

    toast({
      title: "Expense Added",
      description: `Added $${amount} expense for ${category}`,
    });
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Receipt className="h-5 w-5 text-red-500" />
          <span>Add Expense</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={addExpense} className="w-full bg-red-500 hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
        
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
