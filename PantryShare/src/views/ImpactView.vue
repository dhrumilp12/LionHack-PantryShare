<template>
  <div class="impact-container">
    <!-- Hero Section -->
    <section class="impact-hero">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="badge">
          <span class="badge-dot"></span>
          Real-time impact tracking
        </div>
        
        <h1 class="hero-title">
          Measuring our
          <span class="highlight-text">collective impact</span>
        </h1>
        
        <p class="hero-description">
          Every rescued meal, every volunteer hour, every partnership creates ripples of positive change. See how we're transforming communities together.
        </p>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" v-for="(stat, index) in keyStats" :key="index">
            <div class="stat-visual">
              <div :class="`stat-icon stat-icon-${index + 1}`">
                <div class="icon-content">{{ stat.icon }}</div>
              </div>
              <div class="stat-trend">
                <span class="trend-arrow">↗</span>
                <span class="trend-value">+{{ stat.growth }}</span>
              </div>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-subtitle">{{ stat.subtitle }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Environmental Impact -->
    <section class="environmental-section">
      <div class="container">
        <div class="section-header">
          <h2>Environmental footprint</h2>
          <p>The planet thanks you for every meal rescued</p>
        </div>
        
        <div class="environmental-grid">
          <div class="env-card main-card">
            <div class="card-header">
              <h3>Carbon impact reduction</h3>
              <div class="impact-badge">
                <span class="badge-dot green"></span>
                Live tracking
              </div>
            </div>
            
            <div class="impact-visual">
              <div class="carbon-meter">
                <div class="meter-fill" :style="`width: 75%`"></div>
                <div class="meter-label">4,850 tons CO₂ saved</div>
              </div>
              <div class="comparison">
                <div class="comparison-item">
                  <div class="comparison-icon">🚗</div>
                  <span>= 1,053 cars off road for 1 year</span>
                </div>
                <div class="comparison-item">
                  <div class="comparison-icon">🌱</div>
                  <span>= 125,000 tree seedlings grown</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="env-card">
            <div class="env-icon water-icon"></div>
            <h3>Water conservation</h3>
            <div class="env-number">1.2B</div>
            <div class="env-label">Gallons saved</div>
            <p class="env-description">Enough to supply 3,680 homes for a year</p>
          </div>
          
          <div class="env-card">
            <div class="env-icon waste-icon"></div>
            <h3>Waste diverted</h3>
            <div class="env-number">2.3M</div>
            <div class="env-label">Pounds from landfills</div>
            <p class="env-description">Preventing methane emissions and soil contamination</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Stories -->
    <section class="stories-section">
      <div class="container">
        <div class="section-header">
          <h2>Stories from the field</h2>
          <p>Real people, real impact, real change</p>
        </div>
        
        <div class="stories-grid">
          <div class="story-card featured" v-for="(story, index) in communityStories" :key="index">
            <div class="story-header">
              <div class="story-avatar">
                <img :src="story.avatar" :alt="story.name" />
              </div>
              <div class="story-info">
                <h4>{{ story.name }}</h4>
                <p>{{ story.role }}</p>
              </div>
              <div class="story-impact">
                <span class="impact-number">{{ story.impactValue }}</span>
                <span class="impact-metric">{{ story.impactMetric }}</span>
              </div>
            </div>
            
            <blockquote class="story-quote">
              "{{ story.quote }}"
            </blockquote>
            
            <div class="story-stats">
              <div class="story-stat">
                <span class="stat-value">{{ story.stat1Value }}</span>
                <span class="stat-label">{{ story.stat1Label }}</span>
              </div>
              <div class="story-stat">
                <span class="stat-value">{{ story.stat2Value }}</span>
                <span class="stat-label">{{ story.stat2Label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Growth Timeline -->
    <section class="growth-section">
      <div class="container">
        <div class="section-header">
          <h2>Our journey</h2>
          <p>From a simple idea to a movement</p>
        </div>
        
        <div class="timeline">
          <div class="timeline-item" v-for="(milestone, index) in growthMilestones" :key="index">
            <div class="timeline-marker">
              <div class="marker-dot"></div>
              <div class="marker-line" v-if="index < growthMilestones.length - 1"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3>{{ milestone.title }}</h3>
              <div class="milestone-stats">
                <div class="milestone-stat" v-for="stat in milestone.stats" :key="stat.label">
                  <span class="milestone-value">{{ stat.value }}</span>
                  <span class="milestone-label">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future Goals -->
    <section class="goals-section">
      <div class="container">
        <div class="goals-content">
          <div class="goals-text">
            <h2>The road ahead</h2>
            <p>We're just getting started. Our vision extends far beyond today's achievements.</p>
            
            <div class="goals-list">
              <div class="goal-item" v-for="(goal, index) in futureGoals" :key="index">
                <div class="goal-icon">
                  <div class="icon-bg">{{ goal.icon }}</div>
                </div>
                <div class="goal-content">
                  <h4>{{ goal.title }}</h4>
                  <p>{{ goal.description }}</p>
                </div>
                <div class="goal-target">{{ goal.target }}</div>
              </div>
            </div>
          </div>
          
          <div class="goals-visual">
            <div class="vision-card">
              <div class="vision-header">
                <h3>2030 Vision</h3>
                <div class="vision-badge">
                  <span class="badge-dot pulse"></span>
                  Our moonshot
                </div>
              </div>
              <div class="vision-stats">
                <div class="vision-stat">
                  <div class="vision-number">50M</div>
                  <div class="vision-label">Pounds prevented from landfills</div>
                </div>
                <div class="vision-stat">
                  <div class="vision-number">300M</div>
                  <div class="vision-label">Meals provided to communities</div>
                </div>
                <div class="vision-stat">
                  <div class="vision-number">100%</div>
                  <div class="vision-label">Of North America covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="impact-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Be part of the next chapter</h2>
          <p>Your contribution, no matter how small, creates waves of positive change. Join thousands who are already making a difference.</p>
          
          <div class="cta-actions">
            <button class="btn-primary large">
              Start making impact
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
            
            <button class="btn-secondary">
              Share our story
              <svg viewBox="0 0 24 24" class="share-icon">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16,6 12,2 8,6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
          </div>
          
          <div class="cta-meta">
            <div class="meta-item">
              <svg viewBox="0 0 24 24" class="meta-icon">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
              <span>Join for free</span>
            </div>
            <div class="meta-item">
              <svg viewBox="0 0 24 24" class="meta-icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span>Immediate impact</span>
            </div>
            <div class="meta-item">
              <svg viewBox="0 0 24 24" class="meta-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-3-3m0 0-3-3m3 3 3 3m-3-3v-6"/>
              </svg>
              <span>Growing community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const keyStats = ref([
  {
    value: '2.3M',
    label: 'Pounds rescued',
    subtitle: 'Since 2022',
    icon: '🥘',
    growth: '23%'
  },
  {
    value: '180K',
    label: 'Meals provided',
    subtitle: 'This year',
    icon: '🍽️',
    growth: '31%'
  },
  {
    value: '5.2K',
    label: 'Active users',
    subtitle: 'Growing community',
    icon: '👥',
    growth: '18%'
  },
  {
    value: '$890K',
    label: 'Value saved',
    subtitle: 'Economic impact',
    icon: '💚',
    growth: '42%'
  }
]);

const communityStories = ref([
  {
    name: 'Maria Gonzalez',
    role: 'Food Bank Director',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    quote: 'PantryShare has revolutionized how we source food for our community. Last month alone, we rescued 15,000 pounds of perfectly good food.',
    impactValue: '15K',
    impactMetric: 'lbs rescued',
    stat1Value: '40%',
    stat1Label: 'more families served',
    stat2Value: '200+',
    stat2Label: 'weekly pickups'
  },
  {
    name: 'David Kim',
    role: 'Restaurant Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    quote: 'Now I know that our surplus food goes directly to families who need it. It has given our business a greater sense of purpose.',
    impactValue: '800',
    impactMetric: 'meals/month',
    stat1Value: '95%',
    stat1Label: 'waste reduction',
    stat2Value: '$2.3K',
    stat2Label: 'cost savings'
  },
  {
    name: 'Sarah Thompson',
    role: 'Community Volunteer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    quote: 'In six months, I helped coordinate over 5,000 pounds of food distribution. The platform makes connecting with people so easy.',
    impactValue: '5K',
    impactMetric: 'lbs coordinated',
    stat1Value: '150',
    stat1Label: 'volunteer hours',
    stat2Value: '50+',
    stat2Label: 'families helped'
  },
  {
    name: 'James Wilson',
    role: 'Shelter Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    quote: 'The consistent supply of fresh food has improved the nutritional quality of meals we provide to our 200 daily residents.',
    impactValue: '200',
    impactMetric: 'daily residents',
    stat1Value: '85%',
    stat1Label: 'nutrition improvement',
    stat2Value: '365',
    stat2Label: 'days of service'
  }
]);

const growthMilestones = ref([
  {
    year: '2022',
    title: 'Foundation laid',
    stats: [
      { value: '3', label: 'Cities' },
      { value: '500+', label: 'Users' },
      { value: '250K', label: 'Lbs rescued' },
      { value: '50', label: 'Partners' }
    ]
  },
  {
    year: '2023',
    title: 'Rapid expansion',
    stats: [
      { value: '12', label: 'Cities' },
      { value: '2.5K+', label: 'Users' },
      { value: '950K', label: 'Lbs rescued' },
      { value: '150', label: 'Partners' }
    ]
  },
  {
    year: '2024',
    title: 'Scale achieved',
    stats: [
      { value: '25+', label: 'Cities' },
      { value: '5.2K+', label: 'Users' },
      { value: '1.1M', label: 'Lbs rescued' },
      { value: '300+', label: 'Partners' }
    ]
  }
]);

const futureGoals = ref([
  {
    icon: '🎯',
    title: 'Rescue 3M pounds',
    description: 'Triple our food rescue capacity',
    target: '2025'
  },
  {
    icon: '🌍',
    title: 'Expand nationwide',
    description: 'Reach all 50 states',
    target: '2026'
  },
  {
    icon: '👥',
    title: '10K active users',
    description: 'Double our community size',
    target: '2025'
  },
  {
    icon: '🤝',
    title: '500+ partnerships',
    description: 'Build stronger networks',
    target: '2025'
  }
]);

onMounted(() => {
  initAnimations();
});

const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stat-card, .env-card, .story-card, .timeline-item').forEach(el => {
    observer.observe(el);
  });
};
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.impact-container {
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
.impact-hero {
  padding: 180px 0 120px;
  min-height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
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
  max-width: 800px;
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

.badge-dot.green {
  background: #00ff88;
}

.badge-dot.pulse {
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: clamp(42px, 5vw, 64px);
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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Statistics Section */
.stats-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.stat-card {
  background: white;
  padding: 40px 32px;
  border-radius: 24px;
  border: 1px solid #e5e5e5;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.stat-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.stat-visual {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-icon-1 { background: linear-gradient(45deg, #ff6b6b, #ffa500); }
.stat-icon-2 { background: linear-gradient(45deg, #00ff88, #00d4ff); }
.stat-icon-3 { background: linear-gradient(45deg, #667eea, #764ba2); }
.stat-icon-4 { background: linear-gradient(45deg, #f093fb, #f5576c); }

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #00ff88;
  font-size: 14px;
  font-weight: 600;
}

.trend-arrow {
  font-size: 16px;
}

.stat-number {
  font-size: 48px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.stat-subtitle {
  font-size: 14px;
  color: #666;
}

/* Environmental Section */
.environmental-section {
  padding: 120px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.section-header p {
  font-size: 20px;
  color: #666;
}

.environmental-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 24px;
  height: 500px;
}

.env-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 24px;
  padding: 32px;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.env-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.env-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.main-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.card-header h3 {
  font-size: 24px;
  font-weight: 700;
}

.impact-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.carbon-meter {
  width: 100%;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  position: relative;
  margin-bottom: 32px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 12px;
  transition: width 2s ease;
  position: relative;
}

.meter-label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.comparison {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 14px;
}

.comparison-icon {
  font-size: 20px;
}

.env-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 24px;
}

.water-icon {
  background: linear-gradient(45deg, #00d4ff, #0099cc);
}

.water-icon::after {
  content: '💧';
  font-size: 24px;
}

.waste-icon {
  background: linear-gradient(45deg, #ffa500, #ff8c00);
}

.waste-icon::after {
  content: '♻️';
  font-size: 24px;
}

.env-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.env-number {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.env-label {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin-bottom: 16px;
}

.env-description {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

/* Stories Section */
.stories-section {
  padding: 120px 0;
  background: #f8f9fa;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.story-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid #e5e5e5;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.story-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.story-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.story-info {
  flex: 1;
  margin-left: 16px;
}

.story-info h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.story-info p {
  font-size: 14px;
  color: #666;
}

.story-impact {
  text-align: right;
}

.impact-number {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #00ff88;
}

.impact-metric {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.story-quote {
  font-size: 16px;
  line-height: 1.6;
  color: #1a1a1a;
  font-style: italic;
  margin-bottom: 24px;
  position: relative;
  padding-left: 24px;
}

.story-quote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -8px;
  font-size: 48px;
  color: #00ff88;
  font-family: Georgia, serif;
  line-height: 1;
}

.story-stats {
  display: flex;
  gap: 32px;
}

.story-stat {
  text-align: center;
}

.story-stat .stat-value {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.story-stat .stat-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Growth Timeline */
.growth-section {
  padding: 120px 0;
  background: white;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.6s ease;
}

.timeline-item.animate {
  opacity: 1;
  transform: translateX(0);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
}

.marker-dot {
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  z-index: 2;
  position: relative;
}

.marker-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(180deg, #667eea, #764ba2);
  margin-top: 8px;
}

.timeline-content {
  flex: 1;
  background: white;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #e5e5e5;
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 24px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid white;
  z-index: 2;
}

.timeline-content::after {
  content: '';
  position: absolute;
  left: -13px;
  top: 24px;
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid #e5e5e5;
  z-index: 1;
}

.timeline-year {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}

.timeline-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.milestone-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.milestone-stat {
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.milestone-value {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.milestone-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Goals Section */
.goals-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.goals-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.goals-text h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
}

.goals-text p {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 48px;
}

.goals-list {
  space-y: 32px;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.goal-icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.icon-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.goal-content {
  flex: 1;
}

.goal-content h4 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.goal-content p {
  opacity: 0.8;
  font-size: 16px;
}

.goal-target {
  padding: 8px 16px;
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.vision-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
}

.vision-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.vision-header h3 {
  font-size: 28px;
  font-weight: 700;
}

.vision-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.vision-stats {
  space-y: 24px;
}

.vision-stat {
  margin-bottom: 24px;
}

.vision-number {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.vision-label {
  opacity: 0.9;
  line-height: 1.4;
}

/* CTA Section */
.impact-cta {
  padding: 120px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 48px;
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
  text-decoration: none;
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
  text-decoration: none;
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

.share-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.cta-meta {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
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
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
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

/* Responsive Design */
@media (max-width: 1024px) {
  .environmental-grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .goals-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
  
  .milestone-stats {
    grid-template-columns: 1fr;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .timeline-content::before,
  .timeline-content::after {
    display: none;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .section-header h2,
  .cta-content h2,
  .goals-text h2 {
    font-size: 32px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .story-stats {
    justify-content: space-around;
  }
}

@media (max-width: 480px) {
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .cta-meta {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .goal-item {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .story-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .story-info {
    margin-left: 0;
  }
}
</style>