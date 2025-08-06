<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <div class="badge">
            <span class="badge-dot"></span>
            Live food rescue platform
          </div>
          
          <h1 class="hero-title">
            Turn surplus into
            <span class="highlight-text">sustenance</span>
          </h1>
          
          <p class="hero-description">
            Every day, thousands of meals go to waste while people go hungry
          
        
            We're changing that story, one rescued meal at a time.
          </p>
          
          <div class="hero-actions">
            <button class="btn-primary">
              <span>Start rescuing food</span>
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
            
            <button class="btn-secondary">
              <svg viewBox="0 0 24 24" class="play-icon">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Watch our story
            </button>
          </div>
          
          <div class="trust-indicators">
            <div class="indicator">
              <div class="indicator-value">47K</div>
              <div class="indicator-label">meals saved</div>
            </div>
            <div class="indicator">
              <div class="indicator-value">1.2K</div>
              <div class="indicator-label">active rescuers</div>
            </div>
            <div class="indicator">
              <div class="indicator-value">89%</div>
              <div class="indicator-label">waste reduced</div>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="phone-mockup">
            <div class="phone-screen">
              <div class="app-header">
                <div class="status-bar">
                  <span class="time">9:41</span>
                  <div class="battery"></div>
                </div>
                <div class="nav-bar">
                  <span class="nav-title">Nearby Food</span>
                  <div class="nav-dot"></div>
                </div>
              </div>
              
              <div class="food-cards">
                <div class="food-card active">
                  <div class="food-image"></div>
                  <div class="food-info">
                    <div class="food-title">Fresh bakery items</div>
                    <div class="food-meta">2.3km • Available now</div>
                  </div>
                  <div class="food-status">
                    <div class="status-dot"></div>
                  </div>
                </div>
                
                <div class="food-card">
                  <div class="food-image"></div>
                  <div class="food-info">
                    <div class="food-title">Surplus vegetables</div>
                    <div class="food-meta">1.8km • 2 hours left</div>
                  </div>
                </div>
                
                <div class="food-card">
                  <div class="food-image"></div>
                  <div class="food-info">
                    <div class="food-title">Prepared meals</div>
                    <div class="food-meta">0.9km • Just posted</div>
                  </div>
                </div>
              </div>
              
              <div class="map-view">
                <div class="map-pins">
                  <div class="pin pin-1"></div>
                  <div class="pin pin-2"></div>
                  <div class="pin pin-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Statement -->
    <section class="problem-section">
      <div class="container">
        <div class="problem-content">
          <div class="problem-stat">
            <div class="stat-number">1.3B</div>
            <div class="stat-text">tons of food wasted annually</div>
          </div>
          
          <div class="problem-text">
            <h2>While 828 million people go to bed hungry every night</h2>
            <p>The paradox of our time: abundance and scarcity existing side by side. Traditional food rescue is fragmented, slow, and inefficient. We built PantryShare to bridge this gap with technology that actually works.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2>How it works</h2>
          <p>Three simple steps to make a real difference</p>
        </div>
        
        <div class="steps-grid">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-visual">
              <div :class="`step-icon step-icon-${index + 1}`"></div>
            </div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card main-feature">
            <div class="feature-content">
              <h3>Real-time food tracking</h3>
              <p>See exactly what's available, where, and for how long. Our live map updates every 30 seconds so you never miss an opportunity to help.</p>
              <ul class="feature-list">
                <li>Live inventory updates</li>
                <li>Smart expiry alerts</li>
                <li>Route optimization</li>
              </ul>
            </div>
            <div class="feature-visual">
              <div class="live-indicator">
                <div class="pulse"></div>
                <span>LIVE</span>
              </div>
              <div class="tracking-interface">
                <div class="tracking-item">
                  <div class="item-dot green"></div>
                  <span>Fresh produce • 2h left</span>
                </div>
                <div class="tracking-item">
                  <div class="item-dot orange"></div>
                  <span>Bakery goods • 4h left</span>
                </div>
                <div class="tracking-item">
                  <div class="item-dot red"></div>
                  <span>Prepared meals • 30min left</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <div class="smart-icon"></div>
            </div>
            <h3>Smart matching</h3>
            <p>AI-powered system connects food donations with the right volunteers at the perfect time.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <div class="community-icon"></div>
            </div>
            <h3>Community impact</h3>
            <p>Track your personal contribution and see how your neighborhood is making a difference together.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <div class="secure-icon"></div>
            </div>
            <h3>Safe & verified</h3>
            <p>Food safety protocols and volunteer verification ensure every rescue is secure and legitimate.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Dashboard -->
    <section class="impact-section">
      <div class="container">
        <div class="impact-header">
          <h2>Impact dashboard</h2>
          <p>Real numbers from real communities</p>
        </div>
        
        <div class="impact-grid">
          <div class="impact-card" v-for="(metric, index) in impactMetrics" :key="index">
            <div class="metric-visual">
              <div :class="`metric-chart chart-${index + 1}`">
                <div class="chart-fill" :style="`height: ${metric.percentage}%`"></div>
              </div>
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-label">{{ metric.label }}</div>
              <div class="metric-change">
                <span class="change-indicator">↗</span>
                {{ metric.change }} from last month
              </div>
            </div>
          </div>
        </div>
        
        <div class="impact-story">
          <div class="story-content">
            <h3>"This platform saved my family business"</h3>
            <p>"As a small bakery owner, throwing away day-old bread broke my heart. Now that bread feeds families instead of landfills. PantryShare didn't just reduce our waste—it connected us to our community in ways we never imagined."</p>
            <div class="story-author">
              <div class="author-avatar"></div>
              <div class="author-info">
                <div class="author-name">Maria Santos</div>
                <div class="author-title">Santos Family Bakery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to make a difference?</h2>
          <p>Join thousands of people already rescuing food in their communities. Every meal saved is a step toward a more sustainable future.</p>
          
          <div class="cta-actions">
            <button class="btn-primary large">
              Start rescuing food
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
            
            <div class="cta-meta">
              <div class="meta-item">
                <svg viewBox="0 0 24 24" class="meta-icon">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
                <span>Free to join</span>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 24 24" class="meta-icon">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <span>Instant impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      steps: [
        {
          title: 'Spot surplus food',
          description: 'Restaurants, stores, and events post available food with photos and pickup details.'
        },
        {
          title: 'Connect instantly',
          description: 'Our matching system notifies nearby volunteers and organizations in real-time.'
        },
        {
          title: 'Rescue & redistribute',
          description: 'Volunteers collect and deliver food to those who need it most in the community.'
        }
      ],
      impactMetrics: [
        {
          value: '47,329',
          label: 'Meals rescued',
          change: '+23%',
          percentage: 85
        },
        {
          value: '2,847',
          label: 'Tons CO₂ prevented',
          change: '+31%',
          percentage: 70
        },
        {
          value: '1,284',
          label: 'Active volunteers',
          change: '+18%',
          percentage: 90
        },
        {
          value: '156',
          label: 'Partner locations',
          change: '+42%',
          percentage: 65
        }
      ]
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      // Initialize intersection observer for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.1 });

      // Observe all animatable elements
      document.querySelectorAll('.step, .feature-card, .impact-card').forEach(el => {
        observer.observe(el);
      });
    }
  }
};
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.home-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero-section {
  padding-bottom:90px;
  padding-top:180px ;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
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

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
}

.highlight-text {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
}

.btn-primary.large {
  padding: 20px 40px;
  font-size: 18px;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.play-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.trust-indicators {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.indicator {
  text-align: left;
}

.indicator-value {
  font-size: 32px;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.indicator-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Phone Mockup */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  width: 300px;
  height: 600px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 8px;
  position: relative;
  transform: rotate(-5deg);
  animation: float 4s ease-in-out infinite;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 32px;
  overflow: hidden;
  position: relative;
}

.app-header {
  padding: 16px 20px;
  background: #f8f9fa;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.battery {
  width: 24px;
  height: 12px;
  border: 1px solid #333;
  border-radius: 2px;
  position: relative;
}

.battery::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 3px;
  width: 2px;
  height: 6px;
  background: #333;
  border-radius: 0 1px 1px 0;
}

.nav-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.nav-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.food-cards {
  padding: 20px;
  space-y: 16px;
}

.food-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.food-card.active {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  transform: scale(1.02);
}

.food-image {
  width: 48px;
  height: 48px;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  border-radius: 12px;
}

.food-info {
  flex: 1;
}

.food-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.food-meta {
  font-size: 14px;
  opacity: 0.7;
}

.food-status {
  width: 12px;
  height: 12px;
}

.status-dot {
  width: 100%;
  height: 100%;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.map-view {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 0 0 32px 32px;
  position: relative;
  overflow: hidden;
}

.map-pins {
  position: relative;
  width: 100%;
  height: 100%;
}

.pin {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #00ff88;
  border-radius: 50%;
  animation: bounce 2s infinite;
}

.pin-1 { top: 30%; left: 25%; animation-delay: 0s; }
.pin-2 { top: 50%; right: 30%; animation-delay: 0.5s; }
.pin-3 { bottom: 25%; left: 60%; animation-delay: 1s; }

/* Problem Section */
.problem-section {
  padding: 120px 0;
  background: #1a1a1a;
  color: white;
}

.problem-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: center;
}

.problem-stat {
  text-align: center;
}

.stat-number {
  font-size: 80px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.stat-text {
  font-size: 18px;
  opacity: 0.8;
}

.problem-text h2 {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

.problem-text p {
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.9;
}

/* How It Works */
.how-it-works {
  padding: 120px 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 20px;
  color: #666;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
}

.step {
  text-align: center;
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

.step.animate {
  opacity: 1;
  transform: translateY(0);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  z-index: 2;
}

.step-visual {
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  position: relative;
}

.step-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.step-icon-1 {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
}

.step-icon-2 {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
}

.step-icon-3 {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.step-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

/* Features Section */
.features-section {
  padding: 120px 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  height: 600px;
}

.feature-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 24px;
  padding: 32px;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.feature-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.main-feature {
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.feature-content h3 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.feature-content p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.9;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 8px 0;
  position: relative;
  padding-left: 24px;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #00ff88;
  font-weight: bold;
}

.feature-visual {
  margin-top: 40px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.pulse {
  width: 12px;
  height: 12px;
  background: #ff4757;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.live-indicator span {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.tracking-interface {
  space-y: 16px;
}

.tracking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  margin-bottom: 16px;
}

.item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.item-dot.green { background: #00ff88; }
.item-dot.orange { background: #ffa500; }
.item-dot.red { background: #ff6b6b; }
    .feature-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.smart-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 16px;
  position: relative;
}

.smart-icon::after {
  content: '🤖';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}

.community-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 16px;
  position: relative;
}

.community-icon::after {
  content: '🤝';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}

.secure-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  border-radius: 16px;
  position: relative;
}

.secure-icon::after {
  content: '🔒';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Impact Section */
.impact-section {
  padding: 120px 0;
  background: #f8f9fa;
}

.impact-header {
  text-align: center;
  margin-bottom: 80px;
}

.impact-header h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.impact-header p {
  font-size: 20px;
  color: #666;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

.impact-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid #e5e5e5;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.impact-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.impact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.metric-visual {
  margin-bottom: 24px;
}

.metric-chart {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  background: #e5e5e5;
  overflow: hidden;
}

.chart-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: height 2s ease;
  border-radius: 50%;
}

.chart-1 .chart-fill {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
}

.chart-2 .chart-fill {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.chart-3 .chart-fill {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
}

.chart-4 .chart-fill {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.metric-value {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.metric-change {
  font-size: 14px;
  color: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.change-indicator {
  font-weight: bold;
}

.impact-story {
  background: white;
  padding: 48px;
  border-radius: 24px;
  border: 1px solid #e5e5e5;
  max-width: 800px;
  margin: 0 auto;
}

.story-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.story-content p {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 32px;
  font-style: italic;
}

.story-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  position: relative;
}

.author-avatar::after {
  content: 'MS';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.author-title {
  font-size: 14px;
  color: #666;
}

/* CTA Section */
.cta-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
}

.cta-content p {
  font-size: 20px;
  margin-bottom: 48px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.cta-meta {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.meta-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .phone-mockup {
    width: 250px;
    height: 500px;
    transform: rotate(0deg);
  }
  
  .problem-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }
  
  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .section-header h2,
  .impact-header h2,
  .cta-content h2 {
    font-size: 32px;
  }
  
  .problem-text h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .impact-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .trust-indicators {
    justify-content: center;
    text-align: center;
  }
  
  .cta-meta {
    flex-direction: column;
    gap: 16px;
  }
} 
</style>
