import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Shield, Users, Clock, ExternalLink } from 'lucide-react';

export interface DrugData {
  drug_name?: string;
  brand_names?: string[];
  active_ingredients?: string[];
  excipients?: string[];
  indications?: string;
  dosage?: string;
  side_effects?: {
    common?: string[];
    rare?: string[];
  };
  contraindications?: string[];
  drug_interactions?: string[];
  prescription_status?: string;
  warnings?: string[];
  special_populations?: {
    pregnancy?: string;
    pediatric?: string;
    elderly?: string;
  };
  leaflet_pdf_url?: string;
  source_links?: string[];
  image_confidence_score?: number;
  symptomes?: string[]; // Yeni eklendi
}

interface DrugInformationProps {
  drugData: DrugData | null;
  isLoading: boolean;
}

const DrugInformation: React.FC<DrugInformationProps> = ({ drugData, isLoading }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const ExpandableSection: React.FC<{
    id: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    priority?: 'high' | 'medium' | 'low';
  }> = ({ id, title, icon, children, priority = 'low' }) => {
    const isExpanded = expandedSections.has(id);
    
    const priorityStyles = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-gray-200 bg-white'
    };

    return (
      <div className={`rounded-lg border ${priorityStyles[priority]} overflow-hidden`}>
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-4 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!drugData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-500">
          <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Drug Information</h3>
          <p className="text-sm">Search for a drug or upload an image to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{drugData.drug_name}</h1>
            {drugData.brand_names && drugData.brand_names.length > 0 && (
              <p className="text-sm text-gray-600">
                Brand names: {drugData.brand_names.join(', ')}
              </p>
            )}
          </div>
          {drugData.image_confidence_score && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Confidence:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                drugData.image_confidence_score > 0.8
                  ? 'bg-green-100 text-green-800'
                  : drugData.image_confidence_score > 0.6
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {(drugData.image_confidence_score * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <span className={`px-3 py-1 rounded-full font-medium ${
            drugData.prescription_status === 'OTC'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {drugData.prescription_status === 'OTC' ? 'Over the Counter' : 'Prescription Required'}
          </span>
        </div>
      </div>

      {/* Critical Warnings */}
      {drugData.warnings && drugData.warnings.length > 0 && (
        <ExpandableSection
          id="warnings"
          title="Important Warnings"
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          priority="high"
        >
          <div className="mt-4 space-y-2">
            {drugData.warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">{warning}</p>
              </div>
            ))}
          </div>
        </ExpandableSection>
      )}

      {/* Overview */}
      <ExpandableSection
        id="overview"
        title="Drug Overview"
        icon={<Shield className="w-5 h-5 text-blue-600" />}
      >
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Active Ingredients</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {drugData.active_ingredients && drugData.active_ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Indications</h4>
            <p className="text-sm text-gray-700">{drugData.indications}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Dosage & Administration</h4>
            <p className="text-sm text-gray-700">{drugData.dosage}</p>
          </div>
        </div>
      </ExpandableSection>

      {/* Side Effects */}
      <ExpandableSection
        id="side-effects"
        title="Side Effects"
        icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
        priority="medium"
      >
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Common Side Effects</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {drugData.side_effects?.common && drugData.side_effects.common.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>
          
          {drugData.side_effects?.rare && drugData.side_effects.rare.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Rare but Serious Side Effects</h4>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {drugData.side_effects.rare.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ExpandableSection>

      {/* Special Populations */}
      <ExpandableSection
        id="populations"
        title="Special Populations"
        icon={<Users className="w-5 h-5 text-purple-600" />}
      >
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Pregnancy</h4>
            <p className="text-sm text-purple-800">{drugData.special_populations?.pregnancy}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Pediatric Use</h4>
            <p className="text-sm text-blue-800">{drugData.special_populations?.pediatric}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Elderly Use</h4>
            <p className="text-sm text-green-800">{drugData.special_populations?.elderly}</p>
          </div>
        </div>
      </ExpandableSection>

      {/* Drug Interactions */}
      {drugData.drug_interactions && drugData.drug_interactions.length > 0 && (
        <ExpandableSection
          id="interactions"
          title="Drug Interactions"
          icon={<Clock className="w-5 h-5 text-orange-600" />}
          priority="high"
        >
          <div className="mt-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-800">
                <strong>Important:</strong> Always inform your healthcare provider about all medications, 
                supplements, and herbal products you are taking.
              </p>
            </div>
            <ul className="space-y-2">
              {drugData.drug_interactions.map((interaction, index) => (
                <li key={index} className="flex items-start space-x-3 p-3 bg-white border border-orange-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{interaction}</span>
                </li>
              ))}
            </ul>
          </div>
        </ExpandableSection>
      )}

      {/* Additional Resources */}
      <ExpandableSection
        id="resources"
        title="Additional Resources"
        icon={<ExternalLink className="w-5 h-5 text-gray-600" />}
      >
        <div className="mt-4 space-y-4">
          {drugData.leaflet_pdf_url && (
            <a
              href={drugData.leaflet_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official Drug Leaflet (PDF)</span>
            </a>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Trusted Sources</h4>
            <ul className="space-y-2">
              {drugData.source_links && drugData.source_links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Reference Source {index + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ExpandableSection>
    </div>
  );
};

export default DrugInformation;