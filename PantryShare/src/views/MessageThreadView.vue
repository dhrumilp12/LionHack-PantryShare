<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button and Header -->
      <div class="mb-6">
        <button
          @click="$router.back()"
          class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Messages
        </button>
        
        <div v-if="conversation" class="flex items-center space-x-3">
          <img
            :src="conversation.avatar"
            :alt="conversation.name"
            class="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ conversation.name }}</h1>
            <p class="text-sm text-gray-500">{{ conversation.type }} • {{ conversation.status }}</p>
          </div>
        </div>
      </div>

      <!-- Message Thread -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-96">
        <!-- Thread Header -->
        <div v-if="conversation" class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-medium text-gray-900">{{ conversation.subject || 'General Discussion' }}</h2>
              <p class="text-xs text-gray-500">Started {{ formatDate(conversation.startDate) }}</p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="archiveConversation"
                class="text-xs text-gray-500 hover:text-gray-700"
              >
                Archive
              </button>
              <button
                @click="blockUser"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Block
              </button>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainer">
          <div v-if="!conversation" class="flex items-center justify-center h-full">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-4.79-1.6l-4.21 1.6 1.6-4.21A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Conversation not found</h3>
              <p class="mt-1 text-sm text-gray-500">This conversation may have been deleted or you don't have access to it.</p>
            </div>
          </div>

          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-xs lg:max-w-md',
                message.sender !== 'me' ? 'flex items-start space-x-3' : ''
              ]"
            >
              <img
                v-if="message.sender !== 'me'"
                :src="conversation?.avatar"
                :alt="conversation?.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <div
                :class="[
                  'px-4 py-2 rounded-lg',
                  message.sender === 'me'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                ]"
              >
                <p class="text-sm">{{ message.text }}</p>
                <div class="flex items-center justify-between mt-1">
                  <p
                    :class="[
                      'text-xs',
                      message.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                    ]"
                  >
                    {{ formatTime(message.timestamp) }}
                  </p>
                  <div
                    v-if="message.sender === 'me'"
                    :class="[
                      'text-xs',
                      message.status === 'delivered' ? 'text-green-200' :
                      message.status === 'read' ? 'text-green-100' : 'text-green-300'
                    ]"
                  >
                    {{ message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓' : '○' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="otherUserTyping" class="flex justify-start">
            <div class="flex items-start space-x-3">
              <img
                :src="conversation?.avatar"
                :alt="conversation?.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <div class="bg-gray-100 px-4 py-2 rounded-lg">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="px-6 py-4 border-t border-gray-200">
          <form @submit.prevent="sendMessage" class="flex space-x-3">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              @input="handleTyping"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim() || sending"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <svg v-if="!sending" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <svg v-else class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <!-- Related Information -->
      <div v-if="conversation && conversation.relatedListing" class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Related Food Listing</h3>
        <div class="flex items-start space-x-4">
          <img
            :src="conversation.relatedListing.image"
            :alt="conversation.relatedListing.title"
            class="h-16 w-16 rounded-lg object-cover"
          />
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-900">{{ conversation.relatedListing.title }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ conversation.relatedListing.description }}</p>
            <div class="flex items-center space-x-4 mt-2">
              <span class="text-xs text-gray-500">{{ conversation.relatedListing.location }}</span>
              <span
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                  conversation.relatedListing.status === 'available' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                ]"
              >
                {{ conversation.relatedListing.status }}
              </span>
            </div>
          </div>
          <button
            @click="viewListing"
            class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-green-600 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View Listing
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const conversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const sending = ref(false)
const otherUserTyping = ref(false)
const messagesContainer = ref(null)

// Mock conversation data
const mockConversations = {
  '1': {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://wallpapercave.com/wp/wp8907719.jpg',
    type: 'Food Pickup',
    status: 'Active',
    subject: 'Sandwich Pickup Arrangement',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    relatedListing: {
      id: '1',
      title: 'Fresh Sandwiches from School Cafeteria',
      description: '20 assorted sandwiches from today\'s lunch service',
      image: 'https://wallpapercave.com/wp/wp8907719.jpg',
      location: 'Green Valley Elementary',
      status: 'available'
    }
  },
  '2': {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    type: 'Volunteer',
    status: 'Available',
    subject: 'Volunteer Transportation Help',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
}

const mockMessages = {
  '1': [
    {
      id: '1',
      text: 'Hi! I\'m interested in the sandwich donation from your school.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sender: 'other',
      status: 'read'
    },
    {
      id: '2',
      text: 'Great! They\'re fresh from today\'s lunch service. When would you like to pick them up?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      sender: 'me',
      status: 'read'
    },
    {
      id: '3',
      text: 'I can pick up the sandwiches around 3 PM today. Is that okay?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      sender: 'other',
      status: 'read'
    },
    {
      id: '4',
      text: 'Perfect! I\'ll be waiting at the main entrance. Look for the person with the PantryShare volunteer badge.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      sender: 'me',
      status: 'delivered'
    }
  ],
  '2': [
    {
      id: '1',
      text: 'I can help transport the bakery items to the community center.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      sender: 'other',
      status: 'read'
    },
    {
      id: '2',
      text: 'That would be amazing! I\'ll coordinate with the bakery and let you know the pickup time.',
      timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
      sender: 'me',
      status: 'read'
    },
    {
      id: '3',
      text: 'Thanks for coordinating the pickup! The transport went smoothly.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      sender: 'other',
      status: 'read'
    }
  ]
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  sending.value = true

  try {
    const message = {
      id: Date.now().toString(),
      text: newMessage.value.trim(),
      timestamp: new Date().toISOString(),
      sender: 'me',
      status: 'sending'
    }

    messages.value.push(message)
    newMessage.value = ''

    // Scroll to bottom
    await nextTick()
    scrollToBottom()

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update message status
    message.status = 'delivered'
    
    // Simulate other user typing
    setTimeout(() => {
      otherUserTyping.value = true
      setTimeout(() => {
        otherUserTyping.value = false
        // Simulate response
        if (Math.random() > 0.5) {
          const response = {
            id: Date.now().toString() + '_response',
            text: getRandomResponse(),
            timestamp: new Date().toISOString(),
            sender: 'other',
            status: 'read'
          }
          messages.value.push(response)
          nextTick().then(scrollToBottom)
        }
      }, 2000)
    }, 500)

  } catch (error) {
    console.error('Failed to send message:', error)
  } finally {
    sending.value = false
  }
}

const handleTyping = () => {
  // In a real app, this would send typing indicators to the other user
  console.log('User is typing...')
}

const archiveConversation = () => {
  if (confirm('Are you sure you want to archive this conversation?')) {
    // In a real app, this would archive the conversation
    alert('Conversation archived.')
    router.push({ name: 'messages' })
  }
}

const blockUser = () => {
  if (confirm('Are you sure you want to block this user?')) {
    // In a real app, this would block the user
    alert('User blocked.')
    router.push({ name: 'messages' })
  }
}

const viewListing = () => {
  if (conversation.value?.relatedListing) {
    router.push({ 
      name: 'listing-detail', 
      params: { id: conversation.value.relatedListing.id } 
    })
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getRandomResponse = () => {
  const responses = [
    'Sounds good!',
    'Thank you for your help!',
    'I appreciate it.',
    'Perfect timing.',
    'Let me know if you need anything else.',
    'Great work!',
    'See you then!'
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    conversation.value = mockConversations[newId] || null
    messages.value = mockMessages[newId] || []
    nextTick().then(scrollToBottom)
  }
}, { immediate: true })

onMounted(() => {
  const conversationId = route.params.id
  if (conversationId) {
    conversation.value = mockConversations[conversationId] || null
    messages.value = mockMessages[conversationId] || []
    nextTick().then(scrollToBottom)
  }
})
</script>
