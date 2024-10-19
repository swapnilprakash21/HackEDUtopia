"use client"


const DashboardMain = () => {
  return (
      <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
        {/* Sidebar */}
        <div className="flex flex-row min-h-screen">
          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {/* Quizzes Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 00-8 0v4H5a1 1 0 000 2h14a1 1 0 000-2h-3V7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold ml-4">Quizzes</h2>
                </div>
                <p className="text-gray-600 mt-4">Interactive quizzes to test your knowledge and boost learning.</p>
              </div>

              {/* Edu Games Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center">
                  <div className="bg-yellow-500 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L8.5 15.25m0 0l-1.25-2.25L8.5 10m5.75 5L13 13m0 0l-1.25-2.25L13 8m4.5 6.25l-1.25-2.25M15 10.75L13 8m6.75 9.25L21 13m0 0l-1.25-2.25L21 8" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold ml-4">Edu Games</h2>
                </div>
                <p className="text-gray-600 mt-4">Educational games to make learning fun and engaging for all ages.</p>
              </div>

              {/* VR Videos Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center">
                  <div className="bg-purple-500 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-4.528 4.53a1 1 0 01-1.414 0l-4.53-4.53m12.02-3.75h2.25a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 013 18.668v-9A2.25 2.25 0 015.25 7.42h2.25" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold ml-4">VR Videos</h2>
                </div>
                <p className="text-gray-600 mt-4">Experience immersive learning with our cutting-edge VR videos.</p>
              </div>

              {/* AI Chatbot Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-1 8a7 7 0 100-14 7 7 0 000 14zm-4 0h1.705a7 7 0 0011.59-6.105A5.978 5.978 0 0112 12.12" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold ml-4">AI Chatbot</h2>
                </div>
                <p className="text-gray-600 mt-4">Chat with our AI to get instant answers and personalized learning tips.</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            {/* Quizzes Section */}
            <section className="mb-12 bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 00-8 0v4H5a1 1 0 000 2h14a1 1 0 000-2h-3V7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold ml-4">Quizzes</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our Quizzes section provides a variety of interactive quizzes designed to test your knowledge and solidify your understanding of different topics. Each quiz is crafted to challenge learners at different levels and provide instant feedback to facilitate learning. Enjoy a personalized learning experience by attempting quizzes tailored to your pace and skill level, with real-time performance tracking to help identify areas for improvement.
              </p>
            </section>

            {/* Edu Games Section */}
            <section className="mb-12 bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-500 text-white p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L8.5 15.25m0 0l-1.25-2.25L8.5 10m5.75 5L13 13m0 0l-1.25-2.25L13 8m4.5 6.25l-1.25-2.25M15 10.75L13 8m6.75 9.25L21 13m0 0l-1.25-2.25L21 8" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold ml-4">Edu Games</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Edu Games offer an engaging way to learn complex concepts while having fun. These educational games are designed to make learning interactive, helping you to retain information more effectively. They are ideal for learners of all ages, turning traditionally challenging subjects into enjoyable activities, thereby promoting sustained interest in learning.
              </p>
            </section>

            {/* VR Videos Section */}
            <section className="mb-12 bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-purple-500 text-white p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-4.528 4.53a1 1 0 01-1.414 0l-4.53-4.53m12.02-3.75h2.25a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 013 18.668v-9A2.25 2.25 0 015.25 7.42h2.25" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold ml-4">VR Videos</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Experience immersive learning with our VR Videos. This section allows you to virtually explore topics in a completely new dimension, bringing abstract concepts to life. From historical tours to interactive science experiments, VR videos offer a hands-on approach to understanding subjects that would otherwise be difficult to visualize. Enhance your learning journey by stepping into the world of virtual reality, making education both informative and exhilarating.
              </p>
            </section>

            {/* AI Chatbot Section */}
            <section className="mb-12 bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 text-white p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-1 8a7 7 0 100-14 7 7 0 000 14zm-4 0h1.705a7 7 0 0011.59-6.105A5.978 5.978 0 0112 12.12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold ml-4">AI Chatbot</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The AI Chatbot is your personalized learning assistant, available 24/7 to provide instant answers to your questions. Whether you need help understanding a complex concept or are just looking for learning tips, our AI-powered chatbot is here to assist. It uses advanced natural language processing to provide relevant responses, making learning support easily accessible at any time.
              </p>
            </section>
          </main>
        </div>
      </div>
      );
};


export default DashboardMain