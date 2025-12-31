<template>
  <div class="author-content">
    <div class="create-site-post author-content-item single">
      <div class="author-content-item-tips">心路历程</div>
      欢迎来到我的个人主页 😝，这里是我的介绍页面，不是简历🙌，你能在这里看到我比较广泛的兴趣而不是那种正式的简历。目前就读于南京 
      <strong>{{ personalInfo.school }}</strong> 的 <strong>{{ personalInfo.major }}</strong> 专业，
      不是经常更新文章，但是更新文章是一件很好的事情，但是我很懒于是更新的很慢但，
      我会尽量每月至少更新一篇文章，然后不断地学习和完善自己的知识，最近黑眼圈又重了 
      <span class="psw">肯定又熬夜了</span> 
      <del>不要学我，老是熬夜会长痘</del> 
      最后给大家推荐一本小说：
      <div class="site-card-group">
        <a class="site-card" target="_blank" href="https://book.douban.com/subject/33424453/" @click.prevent>
          <img 
            class="no-lightbox" 
            src="https://cdn.statically.io/gh/zsxcoder/picx-images-hosting@master/cover/anime-gmzz.webp" 
            alt="诡秘之主"
          >
          <div class="site-card-info">
            <div class="site-card-title">诡秘之主</div>
            <div class="site-card-desc">一本既慢又快的小说</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonalData } from '../../composables/useData'

const { personalInfo } = usePersonalData()
</script>

<style scoped>
/* 心路历程样式 */
.author-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
  animation: slide-in 0.6s 0.5s backwards;
}

.create-site-post {
  grid-column: 1 / -1;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--anzhiyu-fontcolor);
  background: linear-gradient(135deg, var(--anzhiyu-card-bg), var(--anzhiyu-card-bg));
}

.create-site-post strong {
  color: var(--anzhiyu-main);
  font-weight: 600;
}

.psw {
  color: var(--anzhiyu-secondtext);
  font-style: italic;
}

del {
  color: var(--anzhiyu-red);
  text-decoration: line-through;
}

.site-card-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.site-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: var(--anzhiyu-card-bg);
  border: 1px solid var(--anzhiyu-card-border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--anzhiyu-fontcolor);
  transition: all 0.3s ease;
  max-width: 300px;
  /* animation: slide-in 0.6s 0.5s backwards; */
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--anzhiyu-shadow-blackdeep);
}

.site-card img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.site-card-info {
  flex: 1;
}

.site-card-title {
  font-weight: 600;
  color: var(--anzhiyu-fontcolor);
  margin-bottom: 5px;
}

.site-card-desc {
  font-size: 0.9rem;
  color: var(--anzhiyu-secondtext);
}

.author-content-item-tips {
  opacity: 0.8;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

/* 动画效果 */
@keyframes slide-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>