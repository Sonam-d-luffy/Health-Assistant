import axios from 'axios'
import React, { useState } from 'react'
import diseases from '../assets/diseases'
import { Search, Heart, Sparkles } from 'lucide-react'

const Treatment = () => {
    const [treatment , setTreatment] = useState([])
    const [disease , setDisease] = useState('')
    const [error , setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

     const handleCheck = (selected) => {
    if (disease === selected) {
      // double click simulation: uncheck
      setDisease('');
    } else {
      setDisease(selected);
    }
  };
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            if(!disease) {
                setError('Please select a disease')
                return
            }
            const res = await axios.post( 'http://localhost:5000/predict_treatment', {
                query : disease
            })
             if (res.data && res.data.treatment) {
      setTreatment(formatTreatmentPoints(res.data.treatment)); // ✅ use treatment string
    } else {
      setError('No treatment found');
    }
        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
    }
const formatTreatmentPoints = (treatmentText) => {
  if (!treatmentText) return [];
  return treatmentText
    .split(",") // split by commas
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
};
  // Filter diseases based on search term
    const filteredDiseases = diseases.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="text-rose-500 w-8 h-8" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
                            Disease Treatment Finder
                        </h1>
                        <Sparkles className="text-pink-500 w-8 h-8" />
                    </div>
                    <p className="text-rose-700 text-lg font-medium">
                        Discover personalized treatment recommendations with elegance
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-2xl shadow-lg">
                        <p className="text-red-700 font-semibold text-center">{error}</p>
                    </div>
                )}

                {/* Search Box */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search diseases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg font-medium text-rose-700 bg-white/80 backdrop-blur-sm border-2 border-rose-200 rounded-2xl shadow-lg focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300 placeholder-rose-400"
                        />
                    </div>
                </div>

                {/* Disease Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {filteredDiseases.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => handleCheck(item.name)}
                            className={`relative p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                disease === item.name
                                    ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white border-2 border-rose-300 shadow-2xl scale-105'
                                    : 'bg-white/90 backdrop-blur-sm text-rose-700 border-2 border-rose-100 hover:bg-white hover:border-rose-200'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={disease === item.name}
                                readOnly
                                className="absolute top-3 right-3 w-5 h-5 text-rose-500 bg-transparent border-2 border-current rounded focus:ring-0"
                            />
                            <div className="flex flex-col items-center text-center space-y-2">
                                <span className="text-3xl">{item.icon}</span>
                                <span className={`font-semibold text-sm leading-tight ${
                                    disease === item.name ? 'text-white' : 'text-rose-700'
                                }`}>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleSubmit}
                        className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    >
                        Get Treatment
                    </button>
                </div>

                {/* Treatment Results */}
                {treatment.length > 0 && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-rose-200">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                Treatment for {disease}
                            </h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto"></div>
                        </div>
                        <div className="grid gap-4">
                            {treatment.map((point, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-l-4 border-rose-400 shadow-md"
                                >
                                    <p className="text-rose-800 font-medium leading-relaxed">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Treatment
