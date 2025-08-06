<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Impact</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Together, we're making a real difference in our communities by reducing food waste and fighting hunger.
        </p>
      </div>

      <!-- Key Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">2.3M</div>
          <div class="text-sm text-gray-600">Pounds of Food Rescued</div>
          <div class="text-xs text-gray-500 mt-1">Since 2022</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">180K</div>
          <div class="text-sm text-gray-600">Meals Provided</div>
          <div class="text-xs text-gray-500 mt-1">This year</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">5,200</div>
          <div class="text-sm text-gray-600">Active Users</div>
          <div class="text-xs text-gray-500 mt-1">Donors, recipients & volunteers</div>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div class="text-4xl font-bold text-green-600 mb-2">$890K</div>
          <div class="text-sm text-gray-600">Food Value Saved</div>
          <div class="text-xs text-gray-500 mt-1">Economic impact</div>
        </div>
      </div>

      <!-- Environmental Impact -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Environmental Impact</h2>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">CO2 Emissions Reduced</h3>
              <div class="text-3xl font-bold text-green-600 mb-2">4,850</div>
              <div class="text-sm text-gray-600">Tons of CO2 equivalent</div>
              <p class="text-xs text-gray-500 mt-2">Equal to taking 1,053 cars off the road for a year</p>
            </div>
            <div class="text-center">
              <div class="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Water Saved</h3>
              <div class="text-3xl font-bold text-blue-600 mb-2">1.2B</div>
              <div class="text-sm text-gray-600">Gallons of water</div>
              <p class="text-xs text-gray-500 mt-2">Enough to supply 3,680 homes for a year</p>
            </div>
            <div class="text-center">
              <div class="mx-auto h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Landfill Waste Diverted</h3>
              <div class="text-3xl font-bold text-orange-600 mb-2">2.3M</div>
              <div class="text-sm text-gray-600">Pounds diverted</div>
              <p class="text-xs text-gray-500 mt-2">Reducing methane emissions from decomposition</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Community Stories -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Community Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
                alt="Maria Gonzalez"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Maria Gonzalez</p>
                <p class="text-xs text-gray-500">Food Bank Director</p>
              </div>
            </div>
            <blockquote class="text-gray-600 italic">
              "PantryShare has revolutionized how we source food for our community. Last month alone, we were able to rescue 15,000 pounds of perfectly good food that would have otherwise gone to waste. This has allowed us to serve 40% more families in need."
            </blockquote>
            <div class="mt-4 text-sm text-gray-500">
              <strong>Impact:</strong> 15,000 lbs rescued, 40% more families served
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                alt="David Kim"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">David Kim</p>
                <p class="text-xs text-gray-500">Restaurant Owner</p>
              </div>
            </div>
            <blockquote class="text-gray-600 italic">
              "As a restaurant owner, I used to feel terrible about throwing away surplus food at the end of each day. Now, through PantryShare, I know that food is going directly to families who need it. It's given our business a greater sense of purpose."
            </blockquote>
            <div class="mt-4 text-sm text-gray-500">
              <strong>Impact:</strong> 800 meals donated monthly
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
                alt="Sarah Thompson"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">Sarah Thompson</p>
                <p class="text-xs text-gray-500">Community Volunteer</p>
              </div>
            </div>
            <blockquote class="text-gray-600 italic">
              "Volunteering with PantryShare has been incredibly rewarding. In just six months, I've helped coordinate the pickup and distribution of over 5,000 pounds of food. The platform makes it so easy to connect with people who need help."
            </blockquote>
            <div class="mt-4 text-sm text-gray-500">
              <strong>Impact:</strong> 5,000 lbs coordinated, 150 volunteer hours
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                alt="James Wilson"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">James Wilson</p>
                <p class="text-xs text-gray-500">Homeless Shelter Manager</p>
              </div>
            </div>
            <blockquote class="text-gray-600 italic">
              "The consistent supply of fresh food through PantryShare has improved the nutritional quality of meals we can provide. Our residents now have access to fresh fruits, vegetables, and quality proteins that we couldn't afford to purchase regularly."
            </blockquote>
            <div class="mt-4 text-sm text-gray-500">
              <strong>Impact:</strong> 200 residents served daily
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Progress -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Growth Over Time</h2>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">2022 Highlights</h3>
              <ul class="space-y-2 text-gray-600">
                <li>• Platform launched in 3 cities</li>
                <li>• 500+ users in first 6 months</li>
                <li>• 250,000 lbs of food rescued</li>
                <li>• 50 partner organizations</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">2023 Growth</h3>
              <ul class="space-y-2 text-gray-600">
                <li>• Expanded to 12 cities</li>
                <li>• 2,500+ active users</li>
                <li>• 950,000 lbs of food rescued</li>
                <li>• 150 partner organizations</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">2024 Milestones</h3>
              <ul class="space-y-2 text-gray-600">
                <li>• Operating in 25+ cities</li>
                <li>• 5,200+ active users</li>
                <li>• 1.1M lbs rescued this year</li>
                <li>• 300+ partner organizations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Future Goals -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Looking Ahead</h2>
        <div class="bg-green-50 rounded-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">2025 Goals</h3>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Rescue 3 million pounds of food</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Expand to 50 cities nationwide</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Reach 10,000 active users</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">Partner with 500+ organizations</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Long-term Vision</h3>
              <p class="text-gray-700 mb-4">
                We envision a future where food waste is virtually eliminated through efficient redistribution networks, 
                and no one in our communities goes hungry when there's abundant food available.
              </p>
              <p class="text-gray-700">
                By 2030, we aim to prevent 50 million pounds of food from entering landfills and provide 
                300 million meals to those in need across North America.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Get Involved -->
      <div class="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Be Part of Our Impact</h2>
        <p class="text-gray-600 mb-6">
          Every donation, every volunteer hour, and every rescued meal makes a difference. Join us in creating a more sustainable and equitable food system.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/volunteer"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Volunteer Today
          </router-link>
          <router-link
            to="/listings/create"
            class="inline-flex items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Donate Food
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// This component is purely presentational, no reactive data needed
</script>
