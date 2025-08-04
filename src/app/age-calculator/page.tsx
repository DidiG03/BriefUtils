'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, CakeIcon } from '@heroicons/react/24/outline';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import { AD_SLOTS } from '@/lib/ads';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    date: Date;
    daysUntil: number;
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);

  // Update current time every second for live calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate age whenever birthDate or currentTime changes
  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate, currentTime]);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = currentTime;

    if (birth > now) {
      setAgeResult(null);
      return;
    }

    // Calculate age components
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total time units
    const totalMilliseconds = now.getTime() - birth.getTime();
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calculate time within current day
    const hours = now.getHours() - birth.getHours();
    const minutes = now.getMinutes() - birth.getMinutes();
    const seconds = now.getSeconds() - birth.getSeconds();

    // Calculate next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setAgeResult({
      years,
      months,
      days,
      hours: Math.abs(hours),
      minutes: Math.abs(minutes),
      seconds: Math.abs(seconds),
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: {
        date: nextBirthday,
        daysUntil: daysUntilBirthday,
      },
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getZodiacSign = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19], emoji: '♑' },
      { name: 'Aquarius', start: [1, 20], end: [2, 18], emoji: '♒' },
      { name: 'Pisces', start: [2, 19], end: [3, 20], emoji: '♓' },
      { name: 'Aries', start: [3, 21], end: [4, 19], emoji: '♈' },
      { name: 'Taurus', start: [4, 20], end: [5, 20], emoji: '♉' },
      { name: 'Gemini', start: [5, 21], end: [6, 20], emoji: '♊' },
      { name: 'Cancer', start: [6, 21], end: [7, 22], emoji: '♋' },
      { name: 'Leo', start: [7, 23], end: [8, 22], emoji: '♌' },
      { name: 'Virgo', start: [8, 23], end: [9, 22], emoji: '♍' },
      { name: 'Libra', start: [9, 23], end: [10, 22], emoji: '♎' },
      { name: 'Scorpio', start: [10, 23], end: [11, 21], emoji: '♏' },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21], emoji: '♐' },
    ];

    for (const sign of signs) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign;
      }
    }

    return signs[0]; // Default to Capricorn
  };

  const clearData = () => {
    setBirthDate('');
    setAgeResult(null);
  };

  const setToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setBirthDate(`${year}-${month}-${day}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Age Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your exact age in years, months, days, hours, minutes, and seconds. 
            Find out when your next birthday is and discover interesting facts about your birth date.
          </p>
        </div>

        {/* Top Banner Ad */}
        <AdBanner slot={AD_SLOTS.TOOL_TOP_BANNER} size="large" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
            {/* Date Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CalendarDaysIcon className="h-6 w-6 mr-2" />
                Enter Your Birth Date
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={setToday}
                    className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Set to Today
                  </button>
                  <button
                    onClick={clearData}
                    className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Current Time Display */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Current Time
              </h3>
              <div className="text-center">
                <div className="text-2xl font-mono text-blue-600 dark:text-blue-400 mb-2">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* Birth Date Info */}
            {birthDate && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Birth Date Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(birthDate))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Day of Week:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Zodiac Sign:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getZodiacSign(new Date(birthDate)).emoji} {getZodiacSign(new Date(birthDate)).name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

              {/* Results Section */}
              <div className="space-y-6">
            {ageResult ? (
              <>
                {/* Main Age Display */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CakeIcon className="h-6 w-6 mr-2" />
                    Your Age
                  </h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {ageResult.years}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {ageResult.months}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Months</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {ageResult.days}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        {ageResult.hours}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Hours</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-xl font-bold text-red-600 dark:text-red-400">
                        {ageResult.minutes}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                    </div>
                    <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                      <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
                        {ageResult.seconds}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Total Time Lived */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Total Time Lived
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Days</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {ageResult.totalDays.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Hours</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {ageResult.totalHours.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Minutes</span>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {ageResult.totalMinutes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">Seconds</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {ageResult.totalSeconds.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Birthday */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🎉 Next Birthday
                  </h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                      {ageResult.nextBirthday.daysUntil === 0 
                        ? "🎂 Happy Birthday!" 
                        : `${ageResult.nextBirthday.daysUntil} days`
                      }
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(ageResult.nextBirthday.date)}
                    </div>
                    {ageResult.nextBirthday.daysUntil === 0 && (
                      <div className="mt-3 text-lg">🎈 🎁 🎊</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="text-center py-12">
                  <CalendarDaysIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Select Your Birth Date
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your birth date to calculate your exact age and see interesting statistics
                  </p>
                </div>
              </div>
              )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <AdSidebar slot={AD_SLOTS.TOOL_SIDEBAR} className="mb-8" />
      </div>
    </div>

    {/* Features */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Precise Calculation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get your exact age down to the second with real-time updates.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CakeIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Birthday Countdown
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Find out exactly how many days until your next birthday.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Detailed Statistics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              See total time lived in days, hours, minutes, and seconds.
            </p>
          </div>
        </div>

    {/* Bottom Banner Ad */}
    <AdBanner slot={AD_SLOTS.TOOL_BOTTOM_BANNER} size="large" className="mt-12" />
  </div>
</div>
);
}