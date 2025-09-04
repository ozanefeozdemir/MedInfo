import React, { useState, useRef } from 'react';
import { Search, Upload, X, AlertCircle } from 'lucide-react';

interface SearchInterfaceProps {
  activeTab: 'search' | 'upload';
  onSearch: (query: string) => void;
  onPhotoUpload: (file: File) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  activeTab,
  onSearch,
  onPhotoUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onPhotoUpload(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  if (activeTab === 'search') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Search Drug Information</h2>
          <p className="text-sm text-gray-600">Enter the generic or brand name of the medication</p>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter drug name (e.g., Aspirin, Ibuprofen, Metformin)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
          
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Search Drug Information
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Medical Disclaimer</p>
              <p className="text-blue-800 mt-1">This information is for educational purposes only. Always consult with a healthcare professional before making medication decisions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Photo Identification</h2>
        <p className="text-sm text-gray-600">Upload a clear photo of the pill, tablet, or package</p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {dragOver ? 'Drop image here' : 'Upload Drug Image'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop an image, or click to select
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <h4 className="font-medium mb-2">Tips for best results:</h4>
        <ul className="space-y-1">
          <li>• Take photos in good lighting</li>
          <li>• Ensure text on packages is clearly visible</li>
          <li>• Include both sides of pills if possible</li>
          <li>• Avoid blurry or low-resolution images</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchInterface;