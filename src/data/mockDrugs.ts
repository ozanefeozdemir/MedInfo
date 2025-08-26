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
}

export const mockDrugs: { [key: string]: DrugData } = {
  'aspirin': {
    drug_name: 'Aspirin',
    brand_names: ['Bayer Aspirin', 'Excedrin', 'Bufferin', 'Anacin'],
    active_ingredients: ['Acetylsalicylic acid 325mg'],
    excipients: ['Corn starch', 'Hypromellose', 'Powdered cellulose', 'Triacetin'],
    indications: 'Pain relief, fever reduction, inflammation reduction, and cardiovascular protection when used as directed by a healthcare provider.',
    dosage: 'Adults: 325-650mg every 4 hours as needed for pain/fever. For cardiovascular protection: 81mg daily. Maximum daily dose: 4000mg. Take with food to reduce stomach irritation.',
    side_effects: {
      common: ['Stomach upset', 'Heartburn', 'Nausea', 'Vomiting', 'Stomach pain'],
      rare: ['Severe allergic reactions', 'Gastrointestinal bleeding', 'Tinnitus (ringing in ears)', 'Liver damage with overdose', 'Reye\'s syndrome in children']
    },
    contraindications: ['Allergy to salicylates', 'Active peptic ulcer disease', 'Severe liver disease', 'Severe kidney disease', 'Children with viral infections'],
    drug_interactions: ['Warfarin (increased bleeding risk)', 'Methotrexate (increased toxicity)', 'ACE inhibitors (reduced effectiveness)', 'Alcohol (increased GI bleeding risk)'],
    prescription_status: 'OTC',
    warnings: [
      'Increased risk of serious gastrointestinal bleeding, especially in elderly patients',
      'Do not give to children or teenagers with viral infections due to risk of Reye\'s syndrome',
      'May increase risk of bleeding during surgery - discontinue 7 days before elective procedures'
    ],
    special_populations: {
      pregnancy: 'Category D in third trimester. Avoid in late pregnancy due to risk of bleeding and premature closure of ductus arteriosus.',
      pediatric: 'Contraindicated in children under 16 with viral infections. Use only under medical supervision for other conditions.',
      elderly: 'Increased risk of GI bleeding and kidney problems. Start with lower doses and monitor closely.'
    },
    leaflet_pdf_url: 'https://example.com/aspirin-leaflet.pdf',
    source_links: [
      'https://www.fda.gov/drugs/drug-safety-and-availability/aspirin-information',
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aspirin'
    ]
  },
  'ibuprofen': {
    drug_name: 'Ibuprofen',
    brand_names: ['Advil', 'Motrin', 'Nuprin', 'Brufen'],
    active_ingredients: ['Ibuprofen 200mg', 'Ibuprofen 400mg', 'Ibuprofen 600mg'],
    excipients: ['Colloidal silicon dioxide', 'Croscarmellose sodium', 'Magnesium stearate', 'Microcrystalline cellulose'],
    indications: 'Relief of mild to moderate pain, reduction of fever, and treatment of inflammation associated with conditions like arthritis, menstrual cramps, and minor injuries.',
    dosage: 'Adults: 200-400mg every 4-6 hours as needed. Maximum daily dose: 1200mg OTC, 3200mg prescription. Take with food or milk to reduce stomach irritation.',
    side_effects: {
      common: ['Stomach upset', 'Nausea', 'Heartburn', 'Dizziness', 'Headache'],
      rare: ['Severe allergic reactions', 'Gastrointestinal ulceration or bleeding', 'Kidney damage', 'Heart attack or stroke risk', 'Liver problems']
    },
    contraindications: ['Known allergy to ibuprofen or NSAIDs', 'Active peptic ulcer', 'Severe heart failure', 'Severe kidney disease', 'Third trimester of pregnancy'],
    drug_interactions: ['Warfarin (increased bleeding risk)', 'Lithium (increased lithium levels)', 'ACE inhibitors (reduced effectiveness)', 'Methotrexate (increased toxicity)'],
    prescription_status: 'OTC',
    warnings: [
      'Increased risk of cardiovascular events including heart attack and stroke',
      'May cause serious gastrointestinal adverse events including bleeding, ulceration, and perforation',
      'Use lowest effective dose for shortest duration possible'
    ],
    special_populations: {
      pregnancy: 'Category C (first/second trimester), Category D (third trimester). Avoid in third trimester.',
      pediatric: 'Safe for children ≥6 months. Dose based on weight: 5-10mg/kg every 6-8 hours.',
      elderly: 'Increased risk of serious GI, cardiovascular, and renal adverse events. Use with caution.'
    },
    leaflet_pdf_url: 'https://example.com/ibuprofen-leaflet.pdf',
    source_links: [
      'https://www.fda.gov/drugs/drug-safety-and-availability/ibuprofen-information',
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ibuprofen'
    ]
  },
  'metformin': {
    drug_name: 'Metformin',
    brand_names: ['Glucophage', 'Fortamet', 'Glumetza', 'Riomet'],
    active_ingredients: ['Metformin hydrochloride 500mg', 'Metformin hydrochloride 850mg', 'Metformin hydrochloride 1000mg'],
    excipients: ['Povidone', 'Magnesium stearate', 'Hypromellose', 'Macrogol'],
    indications: 'Treatment of type 2 diabetes mellitus as an adjunct to diet and exercise to improve glycemic control. May be used alone or in combination with other antidiabetic agents.',
    dosage: 'Initial: 500mg twice daily or 850mg once daily with meals. Gradually increase based on glucose response. Maximum: 2550mg daily in divided doses. Extended-release: Start 500-1000mg once daily, max 2000mg daily.',
    side_effects: {
      common: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Loss of appetite', 'Metallic taste'],
      rare: ['Lactic acidosis (potentially fatal)', 'Vitamin B12 deficiency with long-term use', 'Severe hypoglycemia when combined with other diabetes medications']
    },
    contraindications: ['Severe kidney disease (eGFR <30)', 'Metabolic acidosis', 'Diabetic ketoacidosis', 'Severe liver disease', 'Heart failure requiring pharmacological treatment'],
    drug_interactions: ['Contrast dye (increased lactic acidosis risk)', 'Alcohol (increased lactic acidosis risk)', 'Cimetidine (increased metformin levels)', 'Furosemide (may increase metformin levels)'],
    prescription_status: 'Prescription',
    warnings: [
      'Risk of potentially fatal lactic acidosis - discontinue if signs of acidosis develop',
      'Temporarily discontinue before surgical procedures or contrast imaging studies',
      'Monitor kidney function regularly - contraindicated in severe renal impairment'
    ],
    special_populations: {
      pregnancy: 'Category B. May be used in pregnancy for gestational diabetes when diet therapy is inadequate.',
      pediatric: 'Approved for children ≥10 years old. Safety and efficacy in younger children not established.',
      elderly: 'Use with caution. Monitor kidney function closely as risk of lactic acidosis increases with age.'
    },
    leaflet_pdf_url: 'https://example.com/metformin-leaflet.pdf',
    source_links: [
      'https://www.fda.gov/drugs/drug-safety-and-availability/metformin-information',
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=metformin'
    ]
  }
};

export const searchDrug = (query: string): DrugData | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct match
  if (mockDrugs[normalizedQuery]) {
    return mockDrugs[normalizedQuery];
  }
  
  // Search by brand name
  for (const [key, drug] of Object.entries(mockDrugs)) {
    if (drug.brand_names.some(brand => 
      brand.toLowerCase().includes(normalizedQuery) || 
      normalizedQuery.includes(brand.toLowerCase())
    )) {
      return drug;
    }
  }
  
  // Partial match on drug name
  for (const [key, drug] of Object.entries(mockDrugs)) {
    if (drug.drug_name.toLowerCase().includes(normalizedQuery) || 
        normalizedQuery.includes(drug.drug_name.toLowerCase())) {
      return drug;
    }
  }
  
  return null;
};

export const identifyDrugFromImage = (file: File): Promise<{ drug: DrugData | null; confidence: number }> => {
  return new Promise((resolve) => {
    // Simulate image processing delay
    setTimeout(() => {
      // Mock image recognition - randomly select a drug with confidence score
      const drugs = Object.values(mockDrugs);
      const randomDrug = drugs[Math.floor(Math.random() * drugs.length)];
      const confidence = 0.75 + Math.random() * 0.2; // Random confidence between 75-95%
      
      resolve({
        drug: { ...randomDrug, image_confidence_score: confidence },
        confidence
      });
    }, 2000);
  });
};