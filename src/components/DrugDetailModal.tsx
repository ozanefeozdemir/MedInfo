import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { DrugData } from "./DrugInformation";

interface Props {
  drug: DrugData;
  onClose: () => void;
}

const DrugDetailModal: React.FC<Props> = ({ drug, onClose }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">{drug.drug_name}</h2>

        {/* Tekil alanlar */}
        <p><strong>Endikasyon:</strong> {drug.indications}</p>
        <p><strong>Dozaj:</strong> {drug.dosage}</p>
        <p><strong>Reçete Durumu:</strong> {drug.prescription_status}</p>
        <p><strong>Uyarılar:</strong> {drug.warnings?.join(", ")}</p>
        <p><strong>PDF Bilgi:</strong> <a href={drug.leaflet_pdf_url} target="_blank" className="text-blue-600 underline">{drug.leaflet_pdf_url}</a></p>

        {/* Çoklu alanlar */}
        {drug.symptomes && (
          <div className="mt-4">
            <button
              onClick={() => toggle("symptomes")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Symptomes
              {expanded === "symptomes" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "symptomes" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.symptomes.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        )}
        {drug.brand_names && (
          <div className="mt-4">
            <button
              onClick={() => toggle("brands")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Markalar
              {expanded === "brands" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "brands" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.brand_names.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        )}

        {drug.active_ingredients && (
          <div className="mt-4">
            <button
              onClick={() => toggle("ingredients")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Etkin Maddeler
              {expanded === "ingredients" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "ingredients" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.active_ingredients.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            )}
          </div>
        )}

        {drug.excipients && (
          <div className="mt-4">
            <button
              onClick={() => toggle("excipients")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Yardımcı Maddeler
              {expanded === "excipients" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "excipients" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.excipients.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}

        {drug.side_effects && (
          <div className="mt-4">
            <button
              onClick={() => toggle("sideEffects")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Yan Etkiler
              {expanded === "sideEffects" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "sideEffects" && (
              <div className="ml-4 mt-2">
                <p><strong>Sık:</strong></p>
                <ul className="ml-6 list-disc">
                  {drug.side_effects.common?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
                <p className="mt-2"><strong>Nadir:</strong></p>
                <ul className="ml-6 list-disc">
                  {drug.side_effects.rare?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {drug.contraindications && (
          <div className="mt-4">
            <button
              onClick={() => toggle("contraindications")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Kontrendikasyonlar
              {expanded === "contraindications" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "contraindications" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.contraindications.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            )}
          </div>
        )}

        {drug.drug_interactions && (
          <div className="mt-4">
            <button
              onClick={() => toggle("interactions")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              İlaç Etkileşimleri
              {expanded === "interactions" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "interactions" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                {drug.drug_interactions.map((i, idx) => <li key={idx}>{i}</li>)}
              </ul>
            )}
          </div>
        )}

        {drug.special_populations && (
          <div className="mt-4">
            <button
              onClick={() => toggle("specialPopulations")}
              className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
            >
              Özel Popülasyonlar
              {expanded === "specialPopulations" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expanded === "specialPopulations" && (
              <ul className="ml-4 mt-2 list-disc text-gray-700">
                <li><strong>Gebelik:</strong> {drug.special_populations.pregnancy}</li>
                <li><strong>Çocuk:</strong> {drug.special_populations.pediatric}</li>
                <li><strong>Yaşlı:</strong> {drug.special_populations.elderly}</li>
              </ul>
            )}
          </div>
        )}

        {drug.source_links && (
          <div className="mt-4">
            <p className="font-semibold">Kaynaklar:</p>
            <ul className="ml-4 list-disc text-blue-600">
              {drug.source_links.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default DrugDetailModal;
