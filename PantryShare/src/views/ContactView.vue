<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-green-500 to-green-700 text-white flex justify-center text-center">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-full mx-auto text-center">
          <h1 class="font-heading text-4xl lg:text-5xl font-bold pb-6">
            Contact Us
          </h1>
          <p class="text-xl lg:text-2xl text-green-100 leading-relaxed">
            We'd love to hear from you. Get in touch with questions, suggestions, or partnership opportunities.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="py-20 bg-gray-50">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div class="p-10">
              <h2 class="font-heading text-3xl font-bold text-gray-800 pb-8">Send us a message</h2>
              
              <form @submit.prevent="submitForm" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  <div>
                    <label for="firstName" class="block text-base font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      required
                      class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-base font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      required
                      class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div class="pb-4">
                  <label for="email" class="block text-base font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div class="pb-4">
                  <label for="phone" class="block text-base font-semibold text-gray-700 mb-2">
                    Phone Number <span class="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div class="pb-4">
                  <label for="organization" class="block text-base font-semibold text-gray-700 mb-2">
                    Organization <span class="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="organization"
                    v-model="form.organization"
                    type="text"
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="Your company or organization"
                  />
                </div>
                
                <div class="pb-4">
                  <label for="subject" class="block text-base font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    v-model="form.subject"
                    required
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 text-lg bg-gray-50 hover:bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="media">Media & Press</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                  </select>
                </div>
                
                <div class="pb-4">
                  <label for="message" class="block text-base font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    required
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <div class="flex items-start">
                  <input
                    id="newsletter"
                    v-model="form.newsletter"
                    type="checkbox"
                    class="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded-lg transition-colors duration-200 mt-1"
                  />
                  <label for="newsletter" class="ml-3 text-base text-gray-600 leading-relaxed">
                    Subscribe to our newsletter for updates on food rescue initiatives and community impact stories
                  </label>
                </div>
                
                <div class="pt-4">
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <span v-if="submitting" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                    <span v-else class="flex items-center justify-center">
                      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div class="p-10">
                <h2 class="font-heading text-3xl font-bold text-gray-800 pb-8">Get in touch</h2>
                
                <div class="space-y-8">
                  <div class="flex items-start pb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center m-6">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div class="px-4">
                      <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">Email</h3>
                      <p class="text-lg text-gray-600">hello@pantryshare.org</p>
                      <p class="text-base text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start pb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-6">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="px-4">
                      <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">Phone</h3>
                      <p class="text-lg text-gray-600">+1 (555) 123-FOOD</p>
                      <p class="text-base text-gray-500 mt-1">Monday-Friday, 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start pb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mr-6">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="px-4">
                      <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">Address</h3>
                      <p class="text-lg text-gray-600">1234 Innovation Drive</p>
                      <p class="text-lg text-gray-600">Tech Valley, NY 12345</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start pb-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mr-6">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="px-4">
                      <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">Office Hours</h3>
                      <p class="text-lg text-gray-600">Monday - Friday: 9AM - 6PM</p>
                      <p class="text-lg text-gray-600">Weekend: Emergency only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div class="p-10">
                <h2 class="font-heading text-3xl font-bold text-gray-800 mb-8">Quick Help</h2>
                
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mr-4">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="px-4">
                        <h3 class="font-semibold text-gray-800">Frequently Asked Questions</h3>
                        <p class="text-sm text-gray-600">Find answers to common questions</p>
                      </div>
                    </div>
                    <router-link to="/faq" class="text-green-600 hover:text-green-700 font-semibold">
                      View FAQ →
                    </router-link>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div class="px-4">
                        <h3 class="font-semibold text-gray-800">User Guide</h3>
                        <p class="text-sm text-gray-600">Learn how to use PantryShare</p>
                      </div>
                    </div>
                    <router-link to="/how-it-works" class="text-green-600 hover:text-green-700 font-semibold">
                      Learn More →
                    </router-link>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center mr-4">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div class="px-4">
                        <h3 class="font-semibold text-gray-800">Report an Issue</h3>
                        <p class="text-sm text-gray-600">Technical problems or bugs</p>
                      </div>
                    </div>
                    <router-link to="/support" class="text-green-600 hover:text-green-700 font-semibold">
                      Get Help →
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div class="p-10">
                <h2 class="font-heading text-3xl font-bold text-gray-800 pb-8">Follow Us</h2>
                
                <div class="flex gap-4 pb-6">
                  <a href="#" class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-200 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                    <a href="#" class="w-12 h-12 bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-colors duration-200 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    </a>
                  <a href="#" class="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center text-white hover:bg-blue-900 transition-colors duration-200 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                
                <p class="text-gray-600 text-lg leading-relaxed">
                  Stay updated with the latest news, success stories, and volunteer opportunities. Join our community of food rescuers!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const submitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  subject: '',
  message: '',
  newsletter: false
})

const submitForm = async () => {
  submitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would submit to the backend
    console.log('Form submitted:', form.value)
    
    alert('Thank you for your message! We will get back to you within 24 hours.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      subject: '',
      message: '',
      newsletter: false
    }
  } catch (error) {
    console.error('Failed to submit form:', error)
    alert('Sorry, there was an error sending your message. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>

      