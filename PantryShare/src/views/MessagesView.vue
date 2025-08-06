<template>
  <div class="messages-container">
    <!-- Background Elements -->
    <div class="background-elements">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>

    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            Messages
            <div class="title-glow"></div>
          </h1>
          <p class="page-description">Connect with your community • Share resources • Make impact</p>
          <div class="live-indicator">
            <div class="pulse-dot"></div>
            <span>Live messaging</span>
          </div>
        </div>
        <button
          @click="startNewConversation"
          class="btn-primary floating-action"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Start New</span>
        </button>
      </div>

      <div class="messages-grid">
        <!-- Conversations Panel -->
        <div class="conversations-panel">
          <div class="panel-header">
            <h2 class="panel-title">Active Conversations</h2>
            <div class="conversation-count">
              <span>{{ conversations.length }}</span>
            </div>
          </div>
          
          <div class="conversations-list">
            <div v-if="conversations.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-4.79-1.6l-4.21 1.6 1.6-4.21A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>No conversations yet</h3>
              <p>Start connecting with your community</p>
            </div>
            
            <div
              v-for="conversation in conversations"
              :key="conversation.id"
              :class="[
                'conversation-item',
                { 'active': selectedConversation?.id === conversation.id }
              ]"
              @click="selectConversation(conversation)"
            >
              <div class="conversation-avatar">
                <img :src="conversation.avatar" :alt="conversation.name" />
                <div class="avatar-status online"></div>
              </div>
              
              <div class="conversation-content">
                <div class="conversation-header">
                  <h3 class="conversation-name">{{ conversation.name }}</h3>
                  <span class="conversation-time">{{ formatTime(conversation.lastMessage.timestamp) }}</span>
                </div>
                
                <p class="last-message">{{ conversation.lastMessage.text }}</p>
                
                <div class="conversation-meta">
                  <div class="conversation-type" :class="getTypeClass(conversation.type)">
                    {{ conversation.type }}
                  </div>
                  <div v-if="conversation.unreadCount > 0" class="unread-badge">
                    {{ conversation.unreadCount }}
                  </div>
                </div>
              </div>

              <div class="conversation-actions">
                <button class="action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Thread Panel -->
        <div class="message-panel">
          <div v-if="!selectedConversation" class="no-selection">
            <div class="no-selection-content">
              <div class="no-selection-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-4.79-1.6l-4.21 1.6 1.6-4.21A8.013 8.013 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3>Choose a conversation</h3>
              <p>Select someone from your community to start messaging</p>
            </div>
          </div>

          <div v-else class="message-thread">
            <!-- Thread Header -->
            <div class="thread-header">
              <div class="thread-user">
                <div class="thread-avatar">
                  <img :src="selectedConversation.avatar" :alt="selectedConversation.name" />
                  <div class="avatar-status online"></div>
                </div>
                <div class="thread-info">
                  <h3 class="thread-name">{{ selectedConversation.name }}</h3>
                  <p class="thread-status">
                    <span class="status-dot"></span>
                    {{ selectedConversation.type }} • {{ selectedConversation.status }}
                  </p>
                </div>
              </div>
              
              <div class="thread-actions">
                <button class="thread-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="thread-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="thread-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Messages Area -->
            <div class="messages-area" ref="messagesContainer">
              <div
                v-for="message in selectedConversation.messages"
                :key="message.id"
                :class="[
                  'message-item',
                  message.sender === 'me' ? 'sent' : 'received'
                ]"
              >
                <div v-if="message.sender !== 'me'" class="message-avatar">
                  <img :src="selectedConversation.avatar" :alt="selectedConversation.name" />
                </div>
                
                <div class="message-bubble">
                  <p class="message-text">{{ message.text }}</p>
                  <div class="message-meta">
                    <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                    <div v-if="message.sender === 'me'" class="message-status">
                      <svg v-if="message.status === 'read'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        <path d="M19.59 7L21 5.59 19.59 4.18 18.18 5.59 19.59 7z" transform="translate(-4, 0)"/>
                      </svg>
                      <svg v-else-if="message.status === 'delivered'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div v-else class="sending-indicator"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="message-input">
              <form @submit.prevent="sendMessage" class="input-form">
                <div class="input-wrapper">
                  <input
                    v-model="newMessage"
                    type="text"
                    placeholder="Type your message..."
                    class="message-input-field"
                  />
                  <button
                    type="button"
                    class="attachment-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || sending"
                  class="send-btn"
                >
                  <svg v-if="!sending" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div v-else class="loading-spinner"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const conversations = ref([])
const selectedConversation = ref(null)
const newMessage = ref('')
const sending = ref(false)

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    type: 'Food Pickup',
    status: 'Active',
    unreadCount: 2,
    lastMessage: {
      text: 'I can pick up the sandwiches around 3 PM today.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      sender: 'other'
    },
    messages: [
      {
        id: '1',
        text: 'Hi! I\'m interested in the sandwich donation from your school.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sender: 'other'
      },
      {
        id: '2',
        text: 'Great! They\'re fresh from today\'s lunch service. When would you like to pick them up?',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        sender: 'me'
      },
      {
        id: '3',
        text: 'I can pick up the sandwiches around 3 PM today.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        sender: 'other'
      }
    ]
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    type: 'Volunteer',
    status: 'Available',
    unreadCount: 0,
    lastMessage: {
      text: 'Thanks for coordinating the pickup!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      sender: 'other'
    },
    messages: [
      {
        id: '1',
        text: 'I can help transport the bakery items to the community center.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        sender: 'other'
      },
      {
        id: '2',
        text: 'That would be amazing! I\'ll coordinate with the bakery.',
        timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
        sender: 'me'
      },
      {
        id: '3',
        text: 'Thanks for coordinating the pickup!',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        sender: 'other'
      }
    ]
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    type: 'Food Request',
    status: 'Pending',
    unreadCount: 1,
    lastMessage: {
      text: 'Is the fruit still available?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      sender: 'other'
    },
    messages: [
      {
        id: '1',
        text: 'Is the fruit still available?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        sender: 'other'
      }
    ]
  }
]

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  conversation.unreadCount = 0
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return

  sending.value = true

  try {
    const message = {
      id: Date.now().toString(),
      text: newMessage.value.trim(),
      timestamp: new Date().toISOString(),
      sender: 'me',
      status: 'sending'
    }

    selectedConversation.value.messages.push(message)
    selectedConversation.value.lastMessage = message
    newMessage.value = ''

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    message.status = 'delivered'

  } catch (error) {
    console.error('Failed to send message:', error)
  } finally {
    sending.value = false
  }
}

const startNewConversation = () => {
  alert('New conversation feature would open a user selection dialog.')
}

const getTypeClass = (type) => {
  return {
    'food-pickup': type === 'Food Pickup',
    'volunteer': type === 'Volunteer',
    'food-request': type === 'Food Request'
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

onMounted(() => {
  conversations.value = mockConversations
})
</script>

<style scoped>
.messages-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.background-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  position: relative;
  z-index: 1;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  color: white;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.title-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.3;
  animation: glow 2s ease-in-out infinite alternate;
}

.page-description {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 16px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.floating-action {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  border-radius: 20px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
}

.btn-primary {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 50px rgba(0, 255, 136, 0.4);
}

.btn-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.messages-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  height: calc(100vh - 200px);
}

/* Conversations Panel */
.conversations-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
}

.panel-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.conversation-count {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}

.conversations-list {
  height: calc(100% - 80px);
  overflow-y: auto;
  padding: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #666;
  padding: 40px 20px;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 4px;
  position: relative;
  overflow: hidden;
}

.conversation-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.conversation-item:hover::before {
  transform: translateX(100%);
}

.conversation-item:hover {
  background: rgba(0, 255, 136, 0.1);
  transform: translateY(-2px);
}

.conversation-item.active {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  transform: scale(1.02);
}

.conversation-avatar {
  position: relative;
  flex-shrink: 0;
}

.conversation-avatar img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid white;
}

.avatar-status.online {
  background: #00ff88;
}

.conversation-content {
  flex: 1;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.conversation-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  truncate: true;
}

.conversation-time {
  font-size: 12px;
  opacity: 0.7;
}

.last-message {
  font-size: 14px;
  opacity: 0.8;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversation-type {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
}

.conversation-type.food-pickup {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.conversation-type.volunteer {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.conversation-type.food-request {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
}

.unread-badge {
  background: #ff4757;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
}

.conversation-actions {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.conversation-item:hover .conversation-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #666;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
}

/* Message Panel */
.message-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.no-selection-content {
  text-align: center;
  color: #666;
}

.no-selection-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  opacity: 0.5;
}

.no-selection-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

.no-selection-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.no-selection-content p {
  font-size: 16px;
  opacity: 0.8;
}

.message-thread {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.thread-header {
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
}

.thread-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.thread-avatar {
  position: relative;
}

.thread-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.thread-name {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #1a1a1a;
}

.thread-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* The user's provided Vue.js messaging interface HTML, script, and style was detailed.
This response will now finish the last part of the CSS where the `.status-dot` and the rest of the message UI is incomplete. */

/* Continue from .status-dot */

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00ff88;
}

.thread-actions {
  display: flex;
  gap: 12px;
}

.thread-action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #666;
  transition: all 0.3s ease;
}

.thread-action-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.thread-action-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.messages-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.message-item.sent {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.message-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.message-bubble {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  background: #f0f0f0;
  position: relative;
  color: #333;
}

.message-item.sent .message-bubble {
  background: #00ff88;
  color: white;
}

.message-text {
  margin: 0 0 8px 0;
  word-wrap: break-word;
}

.message-meta {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
}

.message-status svg {
  width: 16px;
  height: 16px;
  margin-left: 6px;
  color: #fff;
}

.sending-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  animation: pulse 1.5s infinite;
}

.message-input {
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}

.input-form {
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 8px 16px;
  border: 1px solid #ddd;
}

.message-input-field {
  border: none;
  flex: 1;
  font-size: 16px;
  padding: 8px;
  outline: none;
}

.attachment-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #888;
}

.attachment-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.send-btn {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border: none;
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  color: white;
}

.send-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top: 2px solid #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  from { opacity: 0.3; }
  to { opacity: 0.8; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .messages-grid {
    grid-template-columns: 1fr;
  }

  .conversations-panel {
    height: 400px;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .floating-action {
    bottom: 20px;
    right: 20px;
  }
}

</style>