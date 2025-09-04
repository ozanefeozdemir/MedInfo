import React, { useEffect, useState } from "react";
import "./DrugList.css";
import { DrugData } from "./DrugInformation";
import DrugDetailModal from "./DrugDetailModal";

const DrugList: React.FC = () => {
  const [drugs, setDrugs] = useState<DrugData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState<DrugData[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<DrugData | null>(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/drugs")
      .then((res) => res.json())
      .then((data) => {
        setDrugs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredDrugs(drugs);
    } else {
      const lower = search.toLowerCase();
      setFilteredDrugs(
        drugs.filter(
          (drug) =>
            (drug.drug_name && drug.drug_name.toLowerCase().includes(lower)) ||
            (drug.active_ingredients &&
              drug.active_ingredients
                .join(", ")
                .toLowerCase()
                .includes(lower)) ||
            (drug.indications && drug.indications.toLowerCase().includes(lower))
        )
      );
    }
    setCurrentPage(1); // arama yapıldığında hep 1. sayfadan başlasın
  }, [search, drugs]);

  // Pagination hesaplama
  const totalPages = Math.ceil(filteredDrugs.length / pageSize);
  const paginatedDrugs = filteredDrugs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="drug-registration-form">
      <h2>Tüm İlaçlar</h2>
      <input
        type="text"
        placeholder="İlaç adı, etkin madde veya endikasyon ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          margin: "16px 0 24px 0",
          padding: "12px",
          borderRadius: 8,
          border: "1px solid #bdbdbd",
          fontSize: "1rem",
        }}
      />
      {loading ? (
        <p>Yükleniyor...</p>
      ) : paginatedDrugs.length === 0 ? (
        <p>Aramanıza uygun ilaç bulunamadı.</p>
      ) : (
        <>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">İlaç Adı</th>
                <th className="border px-4 py-2 text-left">Etkin Maddeler</th>
                <th className="border px-4 py-2 text-left">Endikasyon</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDrugs.map((drug, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50 cursor-pointer"
                  onClick={() => setSelectedDrug(drug)}
                >
                  <td className="border px-4 py-2">{drug.drug_name}</td>
                  <td className="border px-4 py-2">
                    {drug.active_ingredients?.join(", ")}
                  </td>
                  <td className="border px-4 py-2">{drug.indications}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Kontrolleri */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Önceki
            </button>
            <span>
              Sayfa {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </>
      )}

      {/* Seçili ilaç detay tabı */}
      

      {selectedDrug && (
        <DrugDetailModal
          drug={selectedDrug}
          onClose={() => setSelectedDrug(null)}
        />
      )}
    </div>
  );
};

export default DrugList;
