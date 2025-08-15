import React, { useState } from 'react'
import axios from 'axios'
import symptomsList from '../assets/symptoms.js'

const Disease = () => {
  const [selectedSymptoms ,setSelectedSymptoms] = useState([])
  const [predictions , setPredictions] = useState([])
  const [error , setError] = useState('')
   const [searchTerm, setSearchTerm] = useState('')
  const toggleSymptom = (key) => {
    setSelectedSymptoms(prev => prev.includes(key) ? prev.filter(item=> item!==key):[...prev , key])
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    setPredictions([])
    try {
      const res = await axios.post('http://localhost:5000/predict' , {
        symptoms : selectedSymptoms
      })
      setPredictions(res.data.predictions)
    } catch (err) {
      setError(err.res?.data?.error || 'Server error')
    }
  }
  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-rose-800 mb-2">
            Select Your Symptoms
          </h2>
          <p className="text-rose-600 text-lg">
            Choose the symptoms you're experiencing for accurate disease prediction
          </p>
        </div>

        <div className="space-y-8">
          {/* Search Box */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <div className="text-rose-400 text-xl">🔍</div>
              </div>
              <input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-pink-200 rounded-full shadow-md focus:outline-none focus:border-rose-400 focus:shadow-lg transition-all duration-300 text-gray-800 placeholder-rose-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-rose-400 hover:text-rose-600 transition-colors duration-200"
                >
                  <div className="text-xl">✕</div>
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2 text-center text-sm text-rose-600">
                Found {filteredSymptoms.length} symptom{filteredSymptoms.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          {/* Symptoms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredSymptoms.map(({ key, name, icon }) => (
              <label
                key={key}
                className={`relative cursor-pointer group transition-all duration-300 transform hover:scale-105 ${
                  selectedSymptoms.includes(key)
                    ? 'scale-105'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(key)}
                  onChange={() => toggleSymptom(key)}
                  className="sr-only"
                />
                <div
                  className={`relative bg-white rounded-xl border-2 p-4 shadow-md transition-all duration-300 hover:shadow-lg ${
                    selectedSymptoms.includes(key)
                      ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-pink-100 shadow-rose-200'
                      : 'border-pink-200 hover:border-rose-300'
                  }`}
                >
                  {/* Selection indicator */}
                  {selectedSymptoms.includes(key) && (
                    <div className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-lg">
                      ✓
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="text-3xl bg-gradient-to-br from-rose-100 to-pink-200 rounded-full w-14 h-14 flex items-center justify-center shadow-sm">
                      {icon}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="text-center">
                    <div className={`text-xs font-medium leading-tight px-1 ${
                      selectedSymptoms.includes(key)
                        ? 'text-rose-800'
                        : 'text-gray-700'
                    }`}>
                      {name}
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </label>
            ))}
          </div>

          {/* No Results Message */}
          {searchTerm && filteredSymptoms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-rose-600 text-lg font-medium">
                No symptoms found for "{searchTerm}"
              </div>
              <div className="text-rose-400 text-sm mt-2">
                Try searching with different keywords
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              disabled={selectedSymptoms.length === 0}
            >
              🔍 Predict Disease
            </button>
          </div>
        </div>

        {/* Selected Symptoms Counter */}
        {selectedSymptoms.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-rose-100 text-rose-800 px-4 py-2 rounded-full font-medium">
              {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              ⚠️ {error}
            </div>
          </div>
        )}

        {/* Predictions Results */}
        {predictions.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-rose-200 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-4">
                <h3 className="text-xl font-bold text-center">
                  🏥 Prediction Results
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {predictions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">
                        {idx + 1}
                      </div>
                      <div className="text-rose-800 font-semibold text-lg">
                        {item.disease}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Disease