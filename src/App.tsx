import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchInterface from "./components/SearchInterface";
import DrugInformation, { DrugData } from "./components/DrugInformation";
import DrugList from "./components/DrugList";
import Symptoms from "./components/Symptoms";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [activeTab, setActiveTab] = useState<
    "search" | "upload" | "all" | "symptoms"
  >("search");
  const [currentDrug, setCurrentDrug] = useState<DrugData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [allDrugs, setAllDrugs] = useState<DrugData[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  // Karanlık modun etkisini body'e uygula
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      setToken(token);
    }
    if (username) {
      setUsername(username);
    }
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // İlaçları backend'den çek
  useEffect(() => {
    fetch("http://localhost:5000/api/drugs")
      .then((res) => res.json())
      .then((data) => setAllDrugs(data));
  }, []);

  // Arama fonksiyonu
  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchHistory((prev) => {
      const newHistory = [
        query,
        ...prev.filter((item) => item !== query),
      ].slice(0, 5);
      return newHistory;
    });
    setTimeout(() => {
      const result = allDrugs.find(
        (drug: any) =>
          (drug.drug_name &&
            drug.drug_name.toLowerCase().includes(query.toLowerCase())) ||
          (drug.indications &&
            drug.indications.toLowerCase().includes(query.toLowerCase()))
      );
      setCurrentDrug(result || null);
      setIsLoading(false);
    }, 500);
  };

  // Fotoğrafla arama fonksiyonu (örnek, backend'de destek yoksa dummy bırakılabilir)
  const handlePhotoUpload = async (file: File) => {
    setIsLoading(true);
    // Burada backend'e dosya gönderip eşleşen ilacı bulabilirsiniz
    setTimeout(() => {
      setCurrentDrug(null);
      setIsLoading(false);
    }, 1000);
  };

  if (!token) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <div>
        <Login
          onLogin={(t, u) => {
            setToken(t);
            setUsername(u);
          }}
        />
        <button onClick={() => setShowRegister(true)} style={{ marginTop: 16 }}>
          Kayıt Ol
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex items-center space-x-3" style={{ position: "fixed", top: 15, right: 10 }}>
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
          <span className="font-medium text-gray-800">{username}</span>
        </div>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => {
            setToken(null);
            setUsername(null);
            localStorage.removeItem("token");
            localStorage.removeItem("username");
          }}
        >
          Çıkış
        </button>
      </div>
      <main className="flex-1 flex items-center justify-center">
        {(activeTab === "search" || activeTab === "upload") && (
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <SearchInterface
                activeTab={activeTab}
                onSearch={handleSearch}
                onPhotoUpload={handlePhotoUpload}
              />
              {/* Arama geçmişi ve diğer bileşenler */}
            </div>
            <div className="lg:col-span-2">
              <DrugInformation drugData={currentDrug} isLoading={isLoading} />
            </div>
          </div>
        )}
        {activeTab === "all" && (
          <div className="w-full flex flex-col items-center py-16">
            <DrugList />
          </div>
        )}
        {activeTab === "symptoms" && (
          <div className="w-full flex flex-col items-center py-16">
            <Symptoms />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
