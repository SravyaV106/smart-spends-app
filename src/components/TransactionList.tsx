
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const TransactionList = () => {
  // Mock data for demonstration
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 3000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-01-15',
    },
    {
      id: '2',
      type: 'expense',
      amount: 150,
      category: 'Food & Dining',
      description: 'Grocery shopping',
      date: '2024-01-14',
    },
    {
      id: '3',
      type: 'expense',
      amount: 80,
      category: 'Transportation',
      description: 'Gas station',
      date: '2024-01-13',
    },
    {
      id: '4',
      type: 'income',
      amount: 500,
      category: 'Freelance',
      description: 'Web design project',
      date: '2024-01-12',
    },
    {
      id: '5',
      type: 'expense',
      amount: 45,
      category: 'Entertainment',
      description: 'Movie tickets',
      date: '2024-01-11',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{transaction.category}</Badge>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
