import React from 'react'
import { Heart, MapPin, Calendar, Brain, Stethoscope, Shield, Star, Sparkles, Users, Target } from 'lucide-react'

const Health = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="text-rose-500 w-12 h-12 animate-pulse" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
                About Us
              </h1>
              <Sparkles className="text-pink-500 w-12 h-12 animate-bounce" />
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-light text-rose-700 leading-relaxed">
                Welcome to our 
                <span className="font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"> healthcare assistance platform </span>
                — your one-stop solution for quick medical guidance and nearby healthcare access.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Our Key Features
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-1 gap-12 mb-20">
          {/* Feature 1 */}
          <div className="group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-rose-100 hover:border-rose-300 transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-rose-700 mb-4 flex items-center gap-3">
                    1. Find Nearby Hospitals & Book Appointments
                    <Calendar className="w-8 h-8 text-pink-500" />
                  </h3>
                  <p className="text-lg text-rose-600 leading-relaxed font-medium">
                    Easily locate hospitals near your location and book appointments directly from our platform. 
                    We aim to save your time by connecting you to healthcare providers in just a few clicks.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-rose-500 font-semibold">Quick & Convenient</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-rose-100 hover:border-rose-300 transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-rose-700 mb-4 flex items-center gap-3">
                    2. Predict Related Diseases from Symptoms
                    <Sparkles className="w-8 h-8 text-pink-500" />
                  </h3>
                  <p className="text-lg text-rose-600 leading-relaxed font-medium">
                    Not sure what you might be dealing with? Select your symptoms from our list, 
                    and our AI-powered system will suggest possible related diseases so you can take early action.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-rose-500 font-semibold">AI-Powered Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-rose-100 hover:border-rose-300 transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold text-rose-700 mb-4 flex items-center gap-3">
                    3. Get Treatments for Selected Diseases
                    <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                  </h3>
                  <p className="text-lg text-rose-600 leading-relaxed font-medium">
                    Once you know the disease, we help you by providing accurate treatment suggestions 
                    so you can understand the next steps and consult your doctor with confidence.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="text-rose-500 font-semibold">Accurate Guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-rose-100 to-pink-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Users className="text-rose-500 w-12 h-12" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <Target className="text-pink-500 w-12 h-12" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-12"></div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-2 border-rose-200 max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-light text-rose-700 leading-relaxed mb-8">
                Our goal is to make healthcare more 
                <span className="font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"> accessible</span>,
                <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"> faster</span>, and
                <span className="font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"> smarter</span>.
              </p>
              <p className="text-xl text-rose-600 leading-relaxed font-medium">
                Whether you need urgent hospital access, a quick disease prediction, or treatment recommendations, 
                <span className="font-bold text-rose-700"> we're here to guide you</span>.
              </p>
              
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-4 rounded-full shadow-xl">
                  <Heart className="w-6 h-6 animate-pulse" />
                  <span className="font-bold text-lg">Healthcare Made Simple</span>
                  <Sparkles className="w-6 h-6 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-8 opacity-60">
            <Heart className="w-8 h-8 text-rose-400 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300"></div>
            <Stethoscope className="w-8 h-8 text-pink-400" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-pink-300 to-rose-300"></div>
            <Brain className="w-8 h-8 text-rose-400" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300"></div>
            <Shield className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Health