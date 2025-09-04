import React from 'react';
import { Pill, Search, Camera, List, HeartPulse, PiIcon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'upload' | 'all' | 'symptoms';
  onTabChange: (tab: 'search' | 'upload' | 'all' | 'symptoms') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedInfoTR</h1>
              <p className="text-xs text-gray-500">Ozan Efe Özdemir</p>
            </div>
          </div>
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('search')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search Drug</span>
            </button>
            <button
              onClick={() => onTabChange('upload')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Photo ID</span>
            </button>
            <button
              onClick={() => onTabChange('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Tüm İlaçlar</span>
            </button>
            <button
              onClick={() => onTabChange('symptoms')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'symptoms'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Belirtiler</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;