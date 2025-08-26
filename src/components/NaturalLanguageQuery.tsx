import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface QueryMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface NaturalLanguageQueryProps {
  drugName?: string;
}

const NaturalLanguageQuery: React.FC<NaturalLanguageQueryProps> = ({ drugName }) => {
  const [messages, setMessages] = useState<QueryMessage[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample queries for demonstration
  const sampleQueries = [
    'Can I take this during pregnancy?',
    'What are the most common side effects?',
    'Is this safe to take with alcohol?',
    'How long does it take to work?',
    'Can children take this medication?'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim() || isLoading) return;

    const userMessage: QueryMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuery('');
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call your AI service)
    setTimeout(() => {
      const assistantMessage: QueryMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateMockResponse(currentQuery, drugName),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string, drug?: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('pregnancy')) {
      return `For ${drug || 'this medication'}, pregnancy safety classification should be reviewed with your healthcare provider. The FDA pregnancy categories range from A (safest) to X (contraindicated). Always consult your doctor before taking any medication during pregnancy.`;
    }
    
    if (lowerQuery.includes('side effect')) {
      return `Common side effects of ${drug || 'this medication'} may include nausea, headache, and dizziness. Serious side effects are rare but can include allergic reactions. Contact your healthcare provider if you experience any unusual symptoms.`;
    }
    
    if (lowerQuery.includes('alcohol')) {
      return `Alcohol interactions with ${drug || 'this medication'} should be avoided or limited. Alcohol can increase the risk of side effects and may reduce the medication's effectiveness. Please consult your healthcare provider for specific guidance.`;
    }
    
    if (lowerQuery.includes('how long') || lowerQuery.includes('work')) {
      return `The onset of action for ${drug || 'this medication'} typically varies depending on the condition being treated. Some effects may be noticed within hours, while full therapeutic benefits may take days or weeks. Follow your prescribed dosing schedule for optimal results.`;
    }
    
    if (lowerQuery.includes('children') || lowerQuery.includes('pediatric')) {
      return `Pediatric dosing for ${drug || 'this medication'} is typically based on weight and age. Not all medications are approved for children. Always consult with a pediatrician before giving any medication to children.`;
    }
    
    return `Thank you for your question about ${drug || 'this medication'}. For specific medical advice and detailed information about your particular situation, I recommend consulting with your healthcare provider or pharmacist who can provide personalized guidance based on your medical history and current medications.`;
  };

  const useSampleQuery = (query: string) => {
    setCurrentQuery(query);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Ask Questions</h2>
        {drugName && (
          <span className="text-sm text-gray-500">about {drugName}</span>
        )}
      </div>
      
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">Try asking questions like:</p>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => useSampleQuery(query)}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className={`px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          placeholder="Ask a question about this medication..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!currentQuery.trim() || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      
      <div className="mt-3 text-xs text-gray-500">
        Responses are for informational purposes only. Always consult healthcare professionals for medical advice.
      </div>
    </div>
  );
};

export default NaturalLanguageQuery;