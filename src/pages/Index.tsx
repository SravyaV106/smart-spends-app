
import Header from '@/components/Header';
import ExpenseTracker from '@/components/ExpenseTracker';
import IncomeTracker from '@/components/IncomeTracker';
import BudgetOverview from '@/components/BudgetOverview';
import TransactionList from '@/components/TransactionList';
import InvestmentChatbot from '@/components/InvestmentChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h2>
          <p className="text-gray-600">Track your income, expenses, and budget all in one place.</p>
        </div>

        {/* Budget Overview */}
        <div className="mb-8">
          <BudgetOverview />
        </div>

        {/* Income and Expense Trackers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncomeTracker />
          <ExpenseTracker />
        </div>

        {/* AI Investment Chatbot and Transaction List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InvestmentChatbot />
          <TransactionList />
        </div>
      </main>
    </div>
  );
};

export default Index;
