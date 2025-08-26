import React, { useState } from 'react';
import Header from './components/Header';
import SearchInterface from './components/SearchInterface';
import DrugInformation from './components/DrugInformation';
import NaturalLanguageQuery from './components/NaturalLanguageQuery';
import { searchDrug, identifyDrugFromImage } from './data/mockDrugs';

interface DrugData {
  drug_name: string;
  brand_names: string[];
  active_ingredients: string[];
  excipients: string[];
  indications: string;
  dosage: string;
  side_effects: {
    common: string[];
    rare: string[];
  };
  contraindications: string[];
  drug_interactions: string[];
  prescription_status: string;
  warnings: string[];
  special_populations: {
    pregnancy: string;
    pediatric: string;
    elderly: string;
  };
  leaflet_pdf_url: string;
  source_links: string[];
  image_confidence_score?: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'upload'>('search');
  const [currentDrug, setCurrentDrug] = useState<DrugData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, 5);
      return newHistory;
    });
    
    // Simulate API call delay
    setTimeout(() => {
      const result = searchDrug(query);
      setCurrentDrug(result);
      setIsLoading(false);
      
      if (!result) {
        // Show error message or suggestions
        console.log('Drug not found');
      }
    }, 1000);
  };

  const handlePhotoUpload = async (file: File) => {
    setIsLoading(true);
    
    try {
      const result = await identifyDrugFromImage(file);
      setCurrentDrug(result.drug);
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Search Interface */}
          <div className="lg:col-span-1 space-y-6">
            <SearchInterface
              activeTab={activeTab}
              onSearch={handleSearch}
              onPhotoUpload={handlePhotoUpload}
            />
            
            {/* Search History */}
            {searchHistory.length > 0 && activeTab === 'search' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(item)}
                      className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Natural Language Query */}
            {currentDrug && (
              <NaturalLanguageQuery drugName={currentDrug.drug_name} />
            )}
          </div>
          
          {/* Right Column - Drug Information */}
          <div className="lg:col-span-2">
            <DrugInformation 
              drugData={currentDrug} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Important Notice</h3>
              <p className="text-xs text-gray-600">
                This platform provides educational information only and should not replace 
                professional medical advice. Always consult with qualified healthcare 
                professionals before making medication decisions.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Data Sources</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• FDA Drug Information</li>
                <li>• European Medicines Agency</li>
                <li>• PubMed Medical Literature</li>
                <li>• WHO Essential Medicines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-xs text-gray-600">
                For technical support or data corrections, please contact our 
                medical information team through the appropriate channels.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 MedInfo Pro. All rights reserved. Information is for educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;