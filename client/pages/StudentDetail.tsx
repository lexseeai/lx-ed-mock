import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock student data - in a real app, this would come from an API
const mockStudentData = {
  id: '23',
  name: 'Alex',
  subject: 'Math tutoring',
  avatar: 'A',
  observations: [
    'Practiced rounding to 1 decimal place using a place value chart to boost fluency and accuracy.',
    'Reviewed recalled formulas for 2D shapes: circle, rectangle, square.',
    'Demonstrated improved accuracy in identifying decimal positions with visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.',
    'Made progress toward independent problem-solving with fewer rounding errors.',
    'Joined the session late but used remaining time effectively to reinforce key math skills.',
    'Worked on comparing fractions using visual models and practiced breaking down multi-step word problems. Demonstrated initial understanding with support and is building confidence in applying strategies.'
  ],
  nextSessionTasks: [
    'Reinforce rounding to 1 decimal place with timed practice to boost fluency and accuracy.',
    'Apply 2D shape formulas in word problems to build real-world problem-solving skills.',
    'Introduce multi-step problems involving both perimeter/area and decimal rounding.'
  ],
  dates: {
    current: { month: 'Jul', day: '28', weekday: 'Mon' },
    next: { month: 'August', day: '4', weekday: 'Mon' }
  }
};

export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("snapshot");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // In a real app, you'd fetch student data based on studentId
  const student = mockStudentData;

  const handleBackClick = () => {
    navigate('/');
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Student not found</h1>
          <p className="text-gray-600 mb-4">The student you're looking for doesn't exist.</p>
          <Button variant="outline" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-lg">
                  {student.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
                <p className="text-sm text-gray-600">{student.subject}</p>
              </div>
            </div>
          </div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Actions
            <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {['Snapshot', 'Goals', 'Session notes', 'Assignments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.toLowerCase().replace(' ', '')
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'snapshot' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Dates */}
              <div className="col-span-3">
                <div className="space-y-8">
                  {/* Current Date */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">{student.dates.current.month}</div>
                    <div className="text-3xl font-bold text-gray-900">{student.dates.current.day}</div>
                    <div className="text-sm text-gray-500">{student.dates.current.weekday}</div>
                    <div className="text-xs text-gray-400 mt-2">5:00-5:45AM</div>
                  </div>

                  {/* Next Date */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">{student.dates.next.month}</div>
                    <div className="text-3xl font-bold text-gray-900">{student.dates.next.day}</div>
                    <div className="text-sm text-gray-500">{student.dates.next.weekday}</div>
                    <div className="text-xs text-gray-400 mt-2">5:00-5:45AM</div>
                    <div className="text-xs text-blue-600 mt-1">Your notes</div>
                    <div className="text-xs text-blue-600">Add notes</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="col-span-9 space-y-8">
                {/* Observations Section */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredSection('observations')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      📊 Observations
                    </h2>
                    {hoveredSection === 'observations' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(student.observations.join('\n\n'))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {student.observations.map((observation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{observation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* For Next Session Section */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredSection('nextSession')}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      📋 For next session
                    </h2>
                    {hoveredSection === 'nextSession' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(student.nextSessionTasks.join('\n\n'))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    )}
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-4 font-medium">
                      From 07/28/2025 • 5:00-5:45
                    </p>
                    <div className="space-y-3">
                      {student.nextSessionTasks.map((task, index) => (
                        <label key={index} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700 leading-relaxed">{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tab content placeholders */}
        {activeTab === 'goals' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Goals content coming soon...</p>
          </div>
        )}

        {activeTab === 'sessionnotes' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Session notes content coming soon...</p>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Assignments content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
