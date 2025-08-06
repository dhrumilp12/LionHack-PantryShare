<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-green-500 to-green-700 text-white">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto text-center">
          <h1 class="font-heading text-4xl lg:text-5xl font-bold mb-6">
            How PantryShare Works
          </h1>
          <p class="text-xl lg:text-2xl text-green-100 leading-relaxed">
            Learn how our platform connects food donors, recipients, and volunteers to reduce waste and fight hunger in our communities.
          </p>
        </div>
      </div>
    </section>

    <!-- Process Overview -->
    <section class="py-20 bg-white">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center pb-16">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Simple Steps to Make a Difference
          </h2>
          <p class="text-xl text-gray-600 mx-auto">
            Our streamlined process makes it easy for everyone to participate in fighting food waste
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group flex flex-col items-center text-center animate-slideUp group">
            <div class="relative mx-auto h-24 w-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
            </div>
            <h3 class="pt-2 font-heading text-2xl font-bold text-gray-800 mb-4">List Surplus Food</h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Restaurants, schools, and individuals post surplus food available for pickup with photos and details.
            </p>
          </div>
          
          <div class="text-center group flex flex-col items-center text-center animate-slideUp group">
            <div class="relative mx-auto h-24 w-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            </div>
            <h3 class="pt-2 font-heading text-2xl font-bold text-gray-800 mb-4">Find & Match</h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Community members and organizations browse and claim food that meets their needs using our interactive map.
            </p>
          </div>
          
          <div class="text-center group flex flex-col items-center text-center animate-slideUp group">
            <div class="relative mx-auto h-24 w-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
            </div>
            <h3 class="pt-2 font-heading text-2xl font-bold text-gray-800 mb-4">Deliver Impact</h3>
            <p class="text-lg text-gray-600 leading-relaxed">
              Food is collected and distributed to those in need, reducing waste and fighting hunger in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- For Donors -->
    <section class="py-20 bg-gray-50">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            For Food Donors
          </h2>
          <p class="text-xl text-gray-600">
            Turn your surplus food into community nourishment
          </p>
        </div>
        
        <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div class="p-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 pb-6">Who Can Donate?</h3>
                <ul class="space-4 ">
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Restaurants and cafeterias with daily surplus</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Schools and universities with leftover meals</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Grocery stores with near-expiry items</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Event organizers with excess catering</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Individuals with home-cooked surplus</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 pb-6">How to Donate</h3>
                <ol class="space-y-4">
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">1</div>
                    <span class="text-lg text-gray-600">Create your account and verify your organization</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">2</div>
                    <span class="text-lg text-gray-600">Post your food listing with photos and details</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">3</div>
                    <span class="text-lg text-gray-600">Set pickup times and location preferences</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">4</div>
                    <span class="text-lg text-gray-600">Coordinate with volunteers for seamless pickup</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">5</div>
                    <span class="text-lg text-gray-600">Track your impact and see meals rescued</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For Recipients -->
    <section class="py-20 bg-white">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            For Food Recipients
          </h2>
          <p class="text-xl text-gray-600">
            Access fresh, quality food for your community
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl border border-blue-200 overflow-hidden">
          <div class="p-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Who Can Receive?</h3>
                <ul class="space-y-4">
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Food banks and pantries</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Homeless shelters and community centers</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Families and individuals in need</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Senior centers and assisted living facilities</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Youth programs and after-school centers</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">How to Receive</h3>
                <ol class="space-y-4">
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">1</div>
                    <span class="text-lg text-gray-600">Register as a recipient organization or individual</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">2</div>
                    <span class="text-lg text-gray-600">Browse available food listings in your area</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">3</div>
                    <span class="text-lg text-gray-600">Claim items that meet your community's needs</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">4</div>
                    <span class="text-lg text-gray-600">Coordinate pickup or delivery with volunteers</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">5</div>
                    <span class="text-lg text-gray-600">Distribute food to those who need it most</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For Volunteers -->
    <section class="py-20 bg-gray-50">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            For Volunteers
          </h2>
          <p class="text-xl text-gray-600">
            Be the bridge between surplus food and hungry families
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-xl border border-purple-200 overflow-hidden">
          <div class="p-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Volunteer Opportunities</h3>
                <ul class="space-y-4">
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Food pickup and delivery coordination</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Community outreach and education</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Food safety and handling assistance</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Technology support and platform training</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-lg text-gray-600">Event coordination and community events</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Getting Started</h3>
                <ol class="space-y-4">
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">1</div>
                    <span class="text-lg text-gray-600">Sign up as a volunteer and complete your profile</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">2</div>
                    <span class="text-lg text-gray-600">Complete our brief food safety training</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">3</div>
                    <span class="text-lg text-gray-600">Browse volunteer opportunities in your area</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">4</div>
                    <span class="text-lg text-gray-600">Connect with donors and recipients for coordination</span>
                  </li>
                  <li class="flex items-center gap-4 pb-1">
                    <div class="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">5</div>
                    <span class="text-lg text-gray-600">Track your volunteer hours and impact metrics</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Safety and Guidelines -->
    <section class="py-20 bg-white">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Safety and Guidelines
          </h2>
          <p class="text-xl text-gray-600">
            Ensuring safe and responsible food sharing practices
          </p>
        </div>
        
        <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-xl border border-red-200 overflow-hidden">
          <div class="p-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Food Safety</h3>
                <ul class="space-y-3 text-gray-600">
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Only share food that's safe for consumption</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Maintain proper temperature control during transport</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Label all food items with contents and allergen information</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Follow local health department guidelines</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Use proper sanitation and hygiene practices</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Platform Guidelines</h3>
                <ul class="space-y-3 text-gray-600">
                  <li class="flex items-center gap-4 ">
                    <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Be respectful and professional in all communications</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Provide accurate descriptions and photos of food items</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Confirm pickup arrangements and be punctual</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Report any issues or concerns to our support team</span>
                  </li>
                  <li class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span>Maintain confidentiality and respect privacy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Get Started -->
    <section class="py-20 bg-gradient-to-r from-green-500 to-green-700 text-white">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-heading text-3xl lg:text-4xl font-bold pb-6">Ready to Get Started?</h2>
        <p class="text-xl text-green-100 pb-12 mx-auto">
          Join thousands of community members working together to reduce food waste and fight hunger.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link
            to="/register"
            class="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-2xl shadow-xl hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200"
          >
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Sign Up Now
          </router-link>
          <router-link
            to="/listings"
            class="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white/10 transform hover:scale-[1.02] transition-all duration-200"
          >
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Food Listings
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// This component is purely presentational, no reactive data needed
</script>

      