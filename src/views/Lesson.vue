<template>
  <div class="lesson-page">
    <router-link to="/" class="back-button">← 返回主页</router-link>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载课程内容中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <h2>课程加载失败</h2>
      <p>{{ error }}</p>
      <button @click="loadLesson" class="btn">重新加载</button>
    </div>
    
    <div v-else class="lesson-content">
      <div class="lesson-header">
        <h1>{{ lesson.title }}</h1>
        <div class="lesson-meta">
          <span class="lesson-number">第{{ lesson.id }}课</span>
          <span class="lesson-duration">⏱️ {{ lesson.duration }}</span>
          <span class="lesson-difficulty" :class="getDifficultyClass(lesson.difficulty)">
            {{ lesson.difficulty }}
          </span>
        </div>
      </div>
      
      <div class="lesson-description">
        <p>{{ lesson.description }}</p>
      </div>
      
      <div class="lesson-topics">
        <h3>学习要点</h3>
        <div class="topics-grid">
          <span v-for="topic in lesson.topics" :key="topic" class="topic-item">
            {{ topic }}
          </span>
        </div>
      </div>
      
              <div class="presentation-container">
          <div class="presentation-header">
            <div class="presentation-controls">
              <button @click="previousSlide" class="control-btn" :disabled="currentSlide === 0">
                ← 上一页
              </button>
              <span class="slide-counter">{{ currentSlide + 1 }} / {{ slides.length }}</span>
              <button @click="nextSlide" class="control-btn" :disabled="currentSlide === slides.length - 1">
                下一页 →
              </button>
            </div>
            <div class="presentation-actions">
              <button @click="toggleFullscreen" class="action-btn">
                {{ isFullscreen ? '退出全屏' : '全屏模式' }}
              </button>
              <button @click="togglePresentationMode" class="action-btn">
                {{ isPresentationMode ? '退出演示' : '演示模式' }}
              </button>
            </div>
          </div>
          
          <div class="slide-container" :class="{ 'fullscreen': isFullscreen, 'presentation-mode': isPresentationMode }">
            <div class="slide" v-html="slides[currentSlide]"></div>
          </div>
          
          <div class="slide-navigation" v-show="!isFullscreen && !isPresentationMode">
            <div class="slide-dots">
              <span 
                v-for="(slide, index) in slides" 
                :key="index"
                :class="['dot', { active: index === currentSlide }]"
                @click="goToSlide(index)"
              ></span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getLessonById } from '@/utils/lessons'

export default {
  name: 'Lesson',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      lesson: null,
      loading: true,
      error: null,
      slides: [],
      currentSlide: 0,
      isFullscreen: false,
      isPresentationMode: false
    }
  },
  async mounted() {
    await this.loadLesson()
    // 添加键盘事件监听器
    document.addEventListener('keydown', this.handleKeydown)
  },
  
  beforeUnmount() {
    // 移除键盘事件监听器
    document.removeEventListener('keydown', this.handleKeydown)
    // 恢复body样式
    document.body.style.overflow = ''
  },
  methods: {
    async loadLesson() {
      try {
        this.loading = true
        this.error = null
        
        // 获取课程信息
        this.lesson = getLessonById(this.id)
        if (!this.lesson) {
          throw new Error('课程不存在')
        }
        
        // 加载markdown内容
        await this.loadMarkdownContent()
        
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    
    async loadMarkdownContent() {
      try {
        // 尝试加载对应的markdown文件
        const response = await fetch(`/markdown/lesson${this.id.toString().padStart(2, '0')}.md`)
        if (!response.ok) {
          throw new Error('课程内容文件不存在')
        }
        const markdown = await response.text()
        
        // 解析markdown内容为幻灯片
        this.parseMarkdownToSlides(markdown)
        
      } catch (err) {
        // 如果文件不存在，生成默认内容
        this.generateDefaultContent()
      }
    },
    
    parseMarkdownToSlides(markdown) {
      // 使用 --- 分隔符分割幻灯片
      const slideTexts = markdown.split('---').filter(text => text.trim())
      
      this.slides = slideTexts.map(slideText => {
        // 简单的markdown到HTML转换
        let html = slideText.trim()
        
        // 转换标题
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
        
        // 转换列表
        html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        
        // 转换代码块
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        
        // 转换行内代码
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // 转换粗体
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        // 转换换行
        html = html.replace(/\n/g, '<br>')
        
        return html
      })
      
      // 如果没有幻灯片，创建默认幻灯片
      if (this.slides.length === 0) {
        this.generateDefaultContent()
      }
    },
    
    generateDefaultContent() {
      this.slides = [
        `<h1>${this.lesson.title}</h1><h3>Linux技术教学课程</h3><p><small>课程内容正在准备中...</small></p>`,
        `<h2>课程简介</h2><p>${this.lesson.description}</p>`,
        `<h2>学习要点</h2><ul>${this.lesson.topics.map(topic => `<li>${topic}</li>`).join('')}</ul>`,
        `<h2>课程信息</h2><p>预计学习时间：${this.lesson.duration}</p><p>难度等级：${this.lesson.difficulty}</p>`,
        `<h2>敬请期待</h2><p>详细的课程内容正在制作中，敬请期待！</p>`
      ]
    },
    
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++
      }
    },
    
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    
    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentSlide = index
      }
    },
    
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
      if (this.isFullscreen) {
        this.isPresentationMode = false
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    
    togglePresentationMode() {
      this.isPresentationMode = !this.isPresentationMode
      if (this.isPresentationMode) {
        this.isFullscreen = false
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    
    // 键盘快捷键支持
    handleKeydown(event) {
      if (this.isFullscreen || this.isPresentationMode) {
        switch(event.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault()
            this.previousSlide()
            break
          case 'ArrowRight':
          case 'ArrowDown':
          case ' ':
            event.preventDefault()
            this.nextSlide()
            break
          case 'Escape':
            event.preventDefault()
            if (this.isFullscreen) this.toggleFullscreen()
            if (this.isPresentationMode) this.togglePresentationMode()
            break
        }
      }
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
.lesson-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error h2 {
  color: #dc3545;
  margin-bottom: 10px;
}

.lesson-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.lesson-header {
  background: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 20px;
  text-align: center;
}

.lesson-header h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 20px;
}

.lesson-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.lesson-number {
  background: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.lesson-duration {
  background: #e9ecef;
  color: #495057;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.lesson-difficulty {
  padding: 8px 16px;
  border-radius: 20px;
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

.lesson-description {
  background: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.lesson-description p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  text-align: center;
}

.lesson-topics {
  background: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.lesson-topics h3 {
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
}

.topics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.topic-item {
  background: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.presentation-container {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.presentation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  flex-wrap: wrap;
  gap: 15px;
}

.presentation-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.presentation-actions {
  display: flex;
  gap: 10px;
}

.control-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.control-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.action-btn {
  background: var(--secondary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.slide-counter {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.slide-container {
  min-height: 500px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.slide-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
  padding: 60px;
  min-height: 100vh;
}

.slide-container.presentation-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px;
  min-height: 100vh;
}

.slide {
  text-align: center;
  max-width: 800px;
  width: 100%;
  transition: all 0.3s ease;
}

.slide-container.fullscreen .slide,
.slide-container.presentation-mode .slide {
  max-width: 1200px;
  width: 100%;
}

.slide-container.presentation-mode .slide {
  color: white;
}

.slide-container.presentation-mode .slide h1,
.slide-container.presentation-mode .slide h2,
.slide-container.presentation-mode .slide h3 {
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.slide-container.presentation-mode .slide p,
.slide-container.presentation-mode .slide li {
  color: rgba(255,255,255,0.9);
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.slide h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 20px;
}

.slide h2 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 20px;
}

.slide h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 15px;
}

.slide p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
}

.slide ul {
  text-align: left;
  display: inline-block;
  margin: 20px 0;
}

.slide li {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.6;
}

.slide code {
  background: #f8f9fa;
  color: #e83e8c;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.slide pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  overflow-x: auto;
  margin: 20px 0;
}

.slide pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.slide-navigation {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.slide-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background: var(--primary-color);
}

.dot.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .lesson-header h1 {
    font-size: 2rem;
  }
  
  .lesson-meta {
    flex-direction: column;
    align-items: center;
  }
  
  .presentation-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .presentation-controls,
  .presentation-actions {
    justify-content: center;
  }
  
  .slide-container {
    padding: 20px;
    min-height: 400px;
  }
  
  .slide-container.fullscreen,
  .slide-container.presentation-mode {
    padding: 40px 20px;
  }
  
  .slide h1 {
    font-size: 2rem;
  }
  
  .slide h2 {
    font-size: 1.5rem;
  }
  
  .action-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
