
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const BudgetOverview = () => {
  // Mock data for demonstration
  const totalIncome = 5000;
  const totalExpenses = 3200;
  const savings = totalIncome - totalExpenses;
  const savingsRate = (savings / totalIncome) * 100;

  const budgetCategories = [
    { name: 'Food & Dining', budget: 800, spent: 650, color: 'bg-blue-500' },
    { name: 'Transportation', budget: 500, spent: 480, color: 'bg-green-500' },
    { name: 'Entertainment', budget: 300, spent: 420, color: 'bg-red-500' },
    { name: 'Shopping', budget: 400, spent: 280, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Savings</p>
                <p className="text-2xl font-bold text-blue-600">${savings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-purple-600">{savingsRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs. Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
                  <div className="text-sm text-gray-600">
                    {percentage.toFixed(1)}% of budget used
                    {isOverBudget && (
                      <span className="text-red-600 ml-2">
                        (${category.spent - category.budget} over budget)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;
