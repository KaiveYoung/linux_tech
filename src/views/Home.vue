<template>
  <div class="home">
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Linux技术教学课程</h1>
        <p class="hero-subtitle">从基础到进阶的完整Linux学习路径</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">18</span>
            <span class="stat-label">课程</span>
          </div>
          <div class="stat">
            <span class="stat-number">27</span>
            <span class="stat-label">小时</span>
          </div>
          <div class="stat">
            <span class="stat-number">3</span>
            <span class="stat-label">难度等级</span>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="course-overview">
        <h2>课程概览</h2>
        <p class="overview-text">
          本课程专为大一计算机系学生设计，每节课90分钟，从Linux基础开始，逐步掌握系统管理、网络配置、脚本编程等核心技能。
          课程注重理论与实践结合，包含大量动手练习，帮助您建立扎实的Linux基础，为后续的专业课程学习做好准备。
        </p>
        <div class="course-features">
          <div class="feature">
            <span class="feature-icon">⏰</span>
            <h3>标准课时</h3>
            <p>每节课90分钟，符合大学课程安排</p>
          </div>
          <div class="feature">
            <span class="feature-icon">🎯</span>
            <h3>循序渐进</h3>
            <p>从基础到高级，适合初学者</p>
          </div>
          <div class="feature">
            <span class="feature-icon">💻</span>
            <h3>实践导向</h3>
            <p>大量动手练习，巩固学习效果</p>
          </div>
        </div>
      </section>

      <section class="lessons-grid">
        <h2>课程列表</h2>
        <div class="grid grid-3">
          <div 
            v-for="lesson in lessons" 
            :key="lesson.id"
            class="lesson-card card fade-in-up"
            @click="goToLesson(lesson.id)"
          >
            <div class="lesson-header">
              <span class="lesson-number">第{{ lesson.id }}课</span>
              <span class="lesson-difficulty" :class="getDifficultyClass(lesson.difficulty)">
                {{ lesson.difficulty }}
              </span>
            </div>
            <h3 class="lesson-title">{{ lesson.title }}</h3>
            <p class="lesson-description">{{ lesson.description }}</p>
            <div class="lesson-meta">
              <span class="lesson-duration">⏱️ {{ lesson.duration }}</span>
            </div>
            <div class="lesson-topics">
              <span 
                v-for="topic in lesson.topics.slice(0, 3)" 
                :key="topic"
                class="topic-tag"
              >
                {{ topic }}
              </span>
              <span v-if="lesson.topics.length > 3" class="topic-more">
                +{{ lesson.topics.length - 3 }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-path">
        <h2>学习路径</h2>
        <div class="path-container">
          <div class="path-stage" v-for="(stage, index) in learningStages" :key="index">
            <div class="stage-icon">{{ stage.icon }}</div>
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.description }}</p>
            <div class="stage-lessons">
              <span v-for="lessonId in stage.lessons" :key="lessonId" class="lesson-badge">
                第{{ lessonId }}课
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getAllLessons } from '@/utils/lessons'

export default {
  name: 'Home',
  data() {
    return {
      lessons: getAllLessons(),
      learningStages: [
        {
          icon: '🌱',
          title: '基础入门',
          description: '掌握Linux基本概念和常用命令',
          lessons: [1, 2, 3, 4, 5]
        },
        {
          icon: '⚙️',
          title: '系统管理',
          description: '学习用户管理、进程控制、软件安装',
          lessons: [6, 7, 8, 9, 10]
        },
        {
          icon: '🔧',
          title: '高级应用',
          description: '深入系统优化、安全配置、自动化脚本',
          lessons: [11, 12, 13, 14, 15, 16, 17, 18]
        }
      ]
    }
  },
  methods: {
    goToLesson(lessonId) {
      this.$router.push(`/lesson/${lessonId}`)
    },
    getDifficultyClass(difficulty) {
      const classes = {
        '初级': 'difficulty-beginner',
        '中级': 'difficulty-intermediate',
        '高级': 'difficulty-advanced'
      }
      return classes[difficulty] || ''
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.course-overview {
  text-align: center;
  margin-bottom: 60px;
}

.course-overview h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.overview-text {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.8;
}

.course-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.feature h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--text-color);
}

.feature p {
  color: #666;
  line-height: 1.6;
}

.lessons-grid h2 {
  font-size: 2.2rem;
  margin-bottom: 40px;
  text-align: center;
  color: var(--text-color);
}

.lesson-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.lesson-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-8px);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.lesson-number {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.lesson-difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty-beginner {
  background: #d4edda;
  color: #155724;
}

.difficulty-intermediate {
  background: #fff3cd;
  color: #856404;
}

.difficulty-advanced {
  background: #f8d7da;
  color: #721c24;
}

.lesson-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-color);
}

.lesson-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.lesson-meta {
  margin-bottom: 15px;
}

.lesson-duration {
  font-size: 0.9rem;
  color: #888;
}

.lesson-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.topic-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid #dee2e6;
}

.topic-more {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.learning-path {
  margin-top: 80px;
}

.learning-path h2 {
  font-size: 2.2rem;
  margin-bottom: 40px;
  text-align: center;
  color: var(--text-color);
}

.path-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.path-stage {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.stage-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.path-stage h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--text-color);
}

.path-stage p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.stage-lessons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.lesson-badge {
  background: var(--primary-color);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    gap: 30px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .path-container {
    grid-template-columns: 1fr;
  }
}
</style>
