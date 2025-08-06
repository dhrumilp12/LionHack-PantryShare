<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-green-500 to-green-700 text-white flex justify-center text-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="font-heading text-4xl lg:text-5xl font-bold mb-6">
            About PantryShare
          </h1>
          <p class="text-xl lg:text-2xl text-green-100">
            Connecting communities to rescue surplus food and fight hunger through technology
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-white flex justify-center text-center">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="w-full mx-auto">
          <div class="text-center mb-16">
            <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-6 py-4">
              Our Mission
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed py-4">
              PantryShare was created to address two critical issues: food waste and food insecurity. 
              We believe that by connecting those with surplus food to those in need, we can create 
              a more sustainable and equitable food system for everyone.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex flex-col items-center text-center animate-slideUp group">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="font-heading text-xl font-semibold mb-4">Feed Communities</h3>
              <p class="text-gray-600">
                Connect surplus food with families, shelters, and individuals who need it most.
              </p>
            </div>
            
            <div class="flex flex-col items-center text-center animate-slideUp group">
              <div class="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="font-heading text-xl font-semibold mb-4">Reduce Waste</h3>
              <p class="text-gray-600">
                Prevent perfectly good food from ending up in landfills and reduce environmental impact.
              </p>
            </div>
            
            <div class="flex flex-col items-center text-center animate-slideUp group">
              <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="font-heading text-xl font-semibold mb-4">Build Community</h3>
              <p class="text-gray-600">
                Foster connections between neighbors, schools, and local organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-gray-50 flex justify-center text-center">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="font-heading text-3xl font-bold text-gray-800 mb-6 py-4">
                Our Story
              </h2>
              <div class="space-y-4 text-gray-600">
                <p>
                  PantryShare was born during LionHacks Summer 2025, when we realized that 
                  40% of food produced goes to waste while 1 in 8 people face food insecurity.
                </p>
                <p>
                  We saw an opportunity to leverage technology to bridge this gap, starting 
                  with high school communities where cafeterias often have surplus food that 
                  could benefit local families and shelters.
                </p>
                <p>
                  What started as a hackathon project has grown into a platform that empowers 
                  communities to make a real difference, one meal at a time.
                </p>
              </div>
            </div>
            
            <div class="bg-white rounded-lg p-8 shadow-lg">
              <div class="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div class="text-3xl font-bold text-green-500">15K+</div>
                  <div class="text-gray-600">Meals Rescued</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-emerald-500">39K kg</div>
                  <div class="text-gray-600">CO₂ Saved</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-orange-500">2K+</div>
                  <div class="text-gray-600">Community Members</div>
                </div>
                <div>
                  <div class="text-3xl font-bold text-yellow-500">50+</div>
                  <div class="text-gray-600">Partner Schools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white flex justify-center text-center">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16 py-4">
            <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Meet the Team
            </h2>
            <p class="text-lg text-gray-600 py-4">
              Passionate students committed to solving real-world problems
            </p>
          </div>
            <!-- Team Member 1 -->
            <div class="flex flex-col items-center text-center animate-slideUp group">
              <div class="w-32 h-32 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span class="text-white text-2xl font-bold">D</span>
              </div>
              <h3 class="font-heading text-xl font-semibold mb-2">Dhrumil Patel</h3>
              <p class="text-gray-600 mb-4">Full-Stack Developer</p>
              <p class="text-sm text-gray-500">
                Computer Science student passionate about social impact through technology.
              </p>
            </div>
            
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gradient-to-r from-green-500 to-green-700 text-white flex justify-center text-center">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto text-center">
          <h2 class="font-heading text-3xl lg:text-4xl font-bold pb-8">
            Our Values
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div class="text-4xl mb-4">🤝</div>
              <h3 class="font-heading text-lg font-semibold mb-2">Community First</h3>
              <p class="text-green-100 text-sm">
                We prioritize community needs and foster meaningful connections.
              </p>
            </div>
            
            <div>
              <div class="text-4xl mb-4">🌱</div>
              <h3 class="font-heading text-lg font-semibold mb-2">Sustainability</h3>
              <p class="text-green-100 text-sm">
                Every action we take considers environmental impact and sustainability.
              </p>
            </div>
            
            <div>
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="font-heading text-lg font-semibold mb-2">Innovation</h3>
              <p class="text-green-100 text-sm">
                We use technology to create simple, effective solutions for complex problems.
              </p>
            </div>
            
            <div>
              <div class="text-4xl mb-4">🎯</div>
              <h3 class="font-heading text-lg font-semibold mb-2">Impact</h3>
              <p class="text-green-100 text-sm">
                We measure success by the positive change we create in communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white flex justify-center text-center">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-heading text-3xl lg:text-4xl font-bold text-gray-800 mb-6 pb-6">
          Join Our Mission
        </h2>
        <p class="text-lg text-gray-600 pb-8  mx-auto">
          Whether you're a student, volunteer, or organization, there's a place for you in the PantryShare community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/register" 
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            Get Started Today
          </router-link>
          <router-link 
            to="/contact" 
            class="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-bold text-lg rounded-2xl shadow-lg hover:bg-green-50 hover:border-green-600 transform hover:scale-[1.02] transition-all duration-200"
          >
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  HeartIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>