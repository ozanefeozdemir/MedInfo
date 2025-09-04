import React, { useEffect, useState } from "react";
import "./DrugList.css";

interface DrugData {
  drug_name?: string;
  indications?: string;
  symptomes?: string[];
  [key: string]: any;
}

const Symptoms: React.FC = () => {
  const [allDrugs, setAllDrugs] = useState<DrugData[]>([]);
  const [allSymptoms, setAllSymptoms] = useState<string[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [suggestedDrugs, setSuggestedDrugs] = useState<DrugData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/drugs")
      .then((res) => res.json())
      .then((data: DrugData[]) => {
        setAllDrugs(data);
        // Tüm semptomları topla ve benzersiz yap
        const symptomsSet = new Set<string>();
        data.forEach((drug) => {
          drug.symptomes?.forEach((s) => symptomsSet.add(s));
        });
        setAllSymptoms(Array.from(symptomsSet));
      });
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSymptom(value);
    if (value) {
      const filtered = allDrugs.filter(
        (drug) => drug.symptomes && drug.symptomes.includes(value)
      );
      setSuggestedDrugs(filtered);
    } else {
      setSuggestedDrugs([]);
    }
  };

  return (
    <div className="drug-registration-form">
      <h2>Belirtilere Göre İlaç Önerisi</h2>
      <div style={{ marginBottom: 24 }}>
        <select
          value={selectedSymptom}
          onChange={handleSelect}
          style={{
            padding: "12px",
            borderRadius: 8,
            border: "1px solid #bdbdbd",
            fontSize: "1rem",
            minWidth: 220,
          }}
        >
          <option value="baş ağrısı">baş ağrısı</option>
          <option value="karın ağrısı">karın ağrısı</option>
          {allSymptoms.map((symptom, idx) => (
            <option key={idx} value={symptom}>
              {symptom}
            </option>
          ))}
        </select>
      </div>
      {selectedSymptom && suggestedDrugs.length === 0 && (
        <p>Bu semptom için uygun ilaç bulunamadı.</p>
      )}
      {suggestedDrugs.length > 0 && (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>İlaç Adı</th>
              <th>Endikasyon</th>
            </tr>
          </thead>
          <tbody>
            {suggestedDrugs.map((drug, idx) => (
              <tr key={idx}>
                <td>{drug.drug_name}</td>
                <td>{drug.indications}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Symptoms;
