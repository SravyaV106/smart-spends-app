
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const InvestmentChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI investment advisor. I can help you with investment strategies, risk assessment, and financial planning. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const investmentResponses = {
    'risk': "Risk management is crucial for successful investing. Consider diversifying your portfolio across different asset classes (stocks, bonds, real estate). A common rule is to subtract your age from 100 to determine your stock allocation percentage.",
    'diversification': "Diversification helps reduce risk by spreading investments across different sectors, geographic regions, and asset types. Consider index funds or ETFs for instant diversification.",
    'emergency fund': "Before investing, ensure you have 3-6 months of expenses in an emergency fund. This prevents you from having to sell investments during market downturns.",
    'retirement': "For retirement planning, maximize employer 401(k) matching first, then consider IRAs. Time is your biggest asset - start early and let compound interest work for you.",
    'stocks': "When investing in individual stocks, research the company's fundamentals, P/E ratio, debt levels, and growth prospects. Consider dollar-cost averaging to reduce timing risk.",
    'bonds': "Bonds provide steady income and portfolio stability. Government bonds are safer but offer lower returns, while corporate bonds offer higher yields with more risk.",
    'default': "That's a great question! For personalized investment advice, consider consulting with a financial advisor. Generally, focus on low-cost index funds, diversification, and long-term thinking."
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(investmentResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return investmentResponses.default;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-500" />
          <span>AI Investment Advisor</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-4">
        <ScrollArea className="flex-1 mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 mt-1 text-blue-500" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-1" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about investments, risk, diversification..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isTyping || !inputMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentChatbot;
