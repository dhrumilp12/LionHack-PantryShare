<template>
  <div class="about-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="badge">
          <span class="badge-dot"></span>
          About our mission
        </div>
        
        <h1 class="hero-title">
          Building a <span class="highlight-text">better</span> future
        </h1>
        
        <p class="hero-description">
          Connecting communities to rescue surplus food and fight hunger through innovative technology that brings people together.
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2>Our Mission</h2>
            <p>PantryShare was created to address two critical issues: food waste and food insecurity. We believe that by connecting those with surplus food to those in need, we can create a more sustainable and equitable food system for everyone.</p>
          </div>
          
          <div class="mission-grid">
            <div class="mission-card">
              <div class="mission-icon">
                <div class="heart-icon"></div>
              </div>
              <div class="mission-content">
                <h3>Feed Communities</h3>
                <p>Connect surplus food with families, shelters, and individuals who need it most.</p>
              </div>
            </div>
            
            <div class="mission-card">
              <div class="mission-icon">
                <div class="reduce-icon"></div>
              </div>
              <div class="mission-content">
                <h3>Reduce Waste</h3>
                <p>Prevent perfectly good food from ending up in landfills and reduce environmental impact.</p>
              </div>
            </div>
            
            <div class="mission-card">
              <div class="mission-icon">
                <div class="community-icon"></div>
              </div>
              <div class="mission-content">
                <h3>Build Community</h3>
                <p>Foster connections between neighbors, schools, and local organizations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Our Story</h2>
            <div class="story-paragraphs">
              <p>PantryShare was born during LionHacks Summer 2025, when we realized that 40% of food produced goes to waste while 1 in 8 people face food insecurity.</p>
              <p>We saw an opportunity to leverage technology to bridge this gap, starting with high school communities where cafeterias often have surplus food that could benefit local families and shelters.</p>
              <p>What started as a hackathon project has grown into a platform that empowers communities to make a real difference, one meal at a time.</p>
            </div>
          </div>
          
          <div class="stats-card">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">15K+</div>
                <div class="stat-label">Meals Rescued</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">39K</div>
                <div class="stat-label">kg CO₂ Saved</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">2K+</div>
                <div class="stat-label">Community Members</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Partner Schools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2>Meet the Team</h2>
          <p>Passionate students committed to solving real-world problems</p>
        </div>
        
        <div class="team-grid">
          <div class="team-card">
            <div class="team-avatar">
              <span>D</span>
              <div class="avatar-glow"></div>
            </div>
            <div class="team-info">
              <h3>Dhrumil Patel</h3>
              <div class="team-role">Full-Stack Developer</div>
              <p>Computer Science student passionate about social impact through technology.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="values-bg">
        <div class="floating-orb orb-4"></div>
        <div class="floating-orb orb-5"></div>
      </div>
      
      <div class="container">
        <div class="values-content">
          <h2>Our Values</h2>
          
          <div class="values-grid">
            <div class="value-card">
              <div class="value-emoji">🤝</div>
              <h3>Community First</h3>
              <p>We prioritize community needs and foster meaningful connections.</p>
            </div>
            
            <div class="value-card">
              <div class="value-emoji">🌱</div>
              <h3>Sustainability</h3>
              <p>Every action we take considers environmental impact and sustainability.</p>
            </div>
            
            <div class="value-card">
              <div class="value-emoji">⚡</div>
              <h3>Innovation</h3>
              <p>We use technology to create simple, effective solutions for complex problems.</p>
            </div>
            
            <div class="value-card">
              <div class="value-emoji">🎯</div>
              <h3>Impact</h3>
              <p>We measure success by the positive change we create in communities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Join Our Mission</h2>
          <p>Whether you're a student, volunteer, or organization, there's a place for you in the PantryShare community.</p>
          
          <div class="cta-actions">
            <router-link to="/register" class="btn-primary">
              Get Started Today
              <svg viewBox="0 0 24 24" class="btn-icon">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </router-link>
            
            <router-link to="/contact" class="btn-secondary">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
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
      document.querySelectorAll('.mission-card, .team-card, .value-card').forEach(el => {
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

.about-container {
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
  padding: 120px 0;
  min-height: 60vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  width: 150px;
  height: 150px;
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.orb-2 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.orb-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 70%;
  animation-delay: 4s;
}

.orb-4 {
  width: 120px;
  height: 120px;
  top: 10%;
  right: 10%;
  animation-delay: 1s;
}

.orb-5 {
  width: 90px;
  height: 90px;
  bottom: 20%;
  left: 20%;
  animation-delay: 3s;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
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
  font-size: clamp(36px, 5vw, 56px);
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
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
}

/* Mission Section */
.mission-section {
  padding: 120px 0;
  background: white;
}

.mission-content {
  text-align: center;
}

.mission-text {
  margin-bottom: 80px;
}

.mission-text h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.mission-text p {
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.mission-card {
  background: white;
  padding: 40px 32px;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.mission-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: #00ff88;
}

.mission-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.heart-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  border-radius: 50%;
  position: relative;
}

.heart-icon::after {
  content: '❤️';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

.reduce-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 50%;
  position: relative;
}

.reduce-icon::after {
  content: '♻️';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

.community-icon {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  position: relative;
}

.community-icon::after {
  content: '👥';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

.mission-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.mission-card p {
  color: #666;
  line-height: 1.6;
}

/* Story Section */
.story-section {
  padding: 120px 0;
  background: #f8f9fa;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.story-text h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #1a1a1a;
}

.story-paragraphs p {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 24px;
}

.stats-card {
  background: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

/* Team Section */
.team-section {
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

.team-grid {
  display: grid;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

.team-card {
  background: white;
  padding: 48px 32px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.team-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: #00ff88;
}

.team-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.team-avatar span {
  font-size: 48px;
  font-weight: 800;
  color: white;
  z-index: 2;
  position: relative;
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  animation: glow 3s ease-in-out infinite;
}

.team-info h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.team-role {
  font-size: 16px;
  color: #00ff88;
  font-weight: 600;
  margin-bottom: 16px;
}

.team-info p {
  color: #666;
  line-height: 1.6;
}

/* Values Section */
.values-section {
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.values-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.values-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.values-content h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 80px;
  color: white;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.value-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 40px 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);
}

.value-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.value-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-8px);
  border-color: #00ff88;
}

.value-emoji {
  font-size: 48px;
  margin-bottom: 24px;
}

.value-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
}

.value-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 14px;
}

/* CTA Section */
.cta-section {
  padding: 120px 0;
  background: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.cta-content p {
  font-size: 20px;
  margin-bottom: 48px;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: white;
  color: #00ff88;
  border: 2px solid #00ff88;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-secondary:hover {
  background: #00ff88;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
}

.btn-icon {
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

@keyframes glow {
  0%, 100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .mission-text h2,
  .story-text h2,
  .section-header h2,
  .values-content h2,
  .cta-content h2 {
    font-size: 32px;
  }
  
  .story-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .mission-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .hero-section,
  .mission-section,
  .story-section,
  .team-section,
  .values-section,
  .cta-section {
    padding: 80px 0;
  }
}

@media (max-width: 480px) {
  .btn-primary,
  .btn-secondary {
    padding: 16px 32px;
    font-size: 16px;
  }
  
  .stats-card {
    padding: 32px 24px;
  }
  
  .team-avatar {
    width: 100px;
    height: 100px;
  }
  
  .team-avatar span {
    font-size: 36px;
  }
}
</style>