<template>
  <footer id="footer">
    <div id="footer-wrap">
      <!-- 主要页脚内容 -->
      <div id="anzhiyu-footer">
        <div class="footer-group">
          <div class="footer-title">导航页面</div>
          <div class="footer-links">
            <a class="footer-item" title="博客" href="https://blog.zsxcoder.top" target="_blank">博客</a>
            <a class="footer-item" title="主页" href="https://home.zsxcoder.top" target="_blank">主页</a>
            <a class="footer-item" title="导航" href="https://nav.mcyzsx.top" target="_blank">导航</a>
          </div>
        </div>
        
        <div class="footer-group">
          <div class="footer-title">联系我</div>
          <div class="footer-links">
            <a class="footer-item" title="Github" href="https://github.com/zsxcoder" target="_blank">
              <span class="iconify" data-icon="mdi:github" style="margin-right: 4px;"></span>
              Github
            </a>
            <a class="footer-item" title="QQ" href="https://qm.qq.com/q/eLZhXoSonY" target="_blank">
              <span class="iconify" data-icon="ri:qq-fill" style="margin-right: 4px;"></span>
              QQ
            </a>
            <a class="footer-item" title="Mail" href="mailto:3149261770@qq.com" target="_blank">
              <span class="iconify" data-icon="material-symbols:mail" style="margin-right: 4px;"></span>
              电子邮件
            </a>
        <a class="footer-item" title="Telegram" href="https://t.me/zsxcoder_bot" target="_blank">
              <span class="iconify" data-icon="mdi:telegram" style="margin-right: 4px;"></span>
              Telegram
            </a>
        <a class="footer-item" title="Mastodon" href="https://mastodon.social/@zsxcoder" target="_blank">
              <span class="iconify" data-icon="mdi:mastodon" style="margin-right: 4px;"></span>
              Mastodon
            </a>
          </div>
        </div>
        
        <!-- 随机友链 -->
        <div class="footer-group friends-line">
          <div class="footer-title">
            友链
            <button
              class="refresh-button"
              title="刷新友链"
              @click="refreshFeeds"
            >
              <span class="iconify" data-icon="ph:arrow-clockwise-bold" style="font-size: 1rem;"></span>
            </button>
          </div>
          <div class="footer-links">
            <a
              v-for="(f, i) in randomFeeds"
              :key="i"
              class="footer-item"
              :title="f.text"
              :href="f.url"
              target="_blank"
            >
              <img :src="f.avatar" :alt="f.text" class="friend-avatar">
              {{ f.text }}
            </a>
            <a class="footer-item" title="更多" href="https://home.zsxcoder.top/link" target="_blank">
              更多…
            </a>
          </div>
        </div>
      </div>

      <!-- 徽章 -->
      <!-- <p id="ghbdages">
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Ubuntu-E95420?logo=ubuntu&label=Server" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Vue-4FC08D?logo=Vue.js&label=Frame" 
            alt="本站使用安知鱼主题"
          >
        </a>
        <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Vite-blue?logo=vite&label=Build" 
            alt="本站使用安知鱼主题"
          >
        </a> -->
        <!-- <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-EdgeOne-blue?logo=icloud&label=CDN" 
            alt="本站使用安知鱼主题"
          >
        </a> -->
        <!-- <a 
          class="github-badge" 
          target="_blank" 
          href="#" 
          style="margin-inline:5px" 
          data-title="本站使用安知鱼主题" 
          title="本站使用安知鱼主题"
        >
          <img 
            src="https://img.shields.io/badge/zsr-Github-181717?logo=github&label=Source" 
            alt="本站使用安知鱼主题"
          >
        </a> -->
      <!-- </p> -->
    </div>

    <!-- 底部栏 -->
    <div id="footer-bar">
      <div class="footer-bar-links">
        <div class="footer-bar-left">
          <div id="footer-bar-tips">
            <div class="copyright">
              &copy;2025 By 
              <a class="footer-bar-link" href="#" title="钟神秀" target="_blank">钟神秀</a>
            </div>
          </div>
        </div>
        <div class="footer-bar-right">
          <a 
            class="footer-bar-link" 
            target="_blank" 
            href="https://github.com/zsxcoder/homepage" 
            title="源码"
          >源码</a>
          <!-- <a 
            class="footer-bar-link" 
            target="_blank" 
            href="#" 
            title="项目"
          >项目</a>
          <a 
            class="footer-bar-link" 
            target="_blank" 
            href="https://beian.miit.gov.cn/" 
            title="冀ICP备2025110107号-1"
          >冀ICP备2025110107号-1</a> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

/* 随机友链 */
const randomFeeds = ref<any[]>([])
async function initializeRandomFeeds() {
  try {
    const r = await fetch('https://checking-link.mcyzsx.top/friends.json')
    const data = await r.json()
    
    if (data.friends && Array.isArray(data.friends)) {
      const allFriends = data.friends.map((f: any) => ({
        text: f[0],
        url: f[1],
        avatar: f[2]
      }))
      randomFeeds.value = [...allFriends].sort(() => 0.5 - Math.random()).slice(0, 4)
    }
  }
  catch (error) {
    console.error('Failed to fetch friends:', error)
  }
}

/* 刷新友链 */
async function refreshFeeds() {
  await initializeRandomFeeds()
}

/* 初始化 */
onMounted(() => {
  initializeRandomFeeds()
})
</script>

<style scoped>
/* 页脚样式 - 严格按照安知鱼官方规范 */
#footer {
  position: relative;
  background: linear-gradient(180deg, var(--anzhiyu-card-bg-none) 0, var(--anzhiyu-card-bg) 25%);
  background-attachment: scroll;
  background-position: bottom;
  background-size: cover;
  margin-top: 60px;
}

#footer-wrap {
  position: relative;
  padding: 40px 20px 0;
  color: var(--anzhiyu-secondtext);
}

#anzhiyu-footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 1rem auto;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 2rem;
}

.footer-group {
  min-width: 120px;
}

.footer-title {
  color: var(--anzhiyu-secondtext);
  font-size: 1rem;
  text-align: left;
  font-weight: 600;
  margin: 1rem 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

.footer-item {
  font-size: 1rem;
  line-height: 1rem;
  margin: 8px 0;
  color: var(--anzhiyu-fontcolor);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 120px;
  cursor: pointer;
  padding: 2px 0;
  text-decoration: none;
  transition: .3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-item:hover {
  color: var(--anzhiyu-main);
}

/* 刷新按钮 */
.refresh-button {
  padding: 0.16em;
  border: none;
  border-radius: 0.3em;
  background: none;
  color: var(--anzhiyu-secondtext);
  cursor: pointer;
  transition: background-color 0.2s, color 0.1s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
}

.refresh-button:hover {
  background-color: var(--anzhiyu-card-bg);
  color: var(--anzhiyu-main);
}

/* 友链头像 */
.friend-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

/* 友链行样式 */
.friends-line {
  display: flex;
  flex-direction: column;
}

.friends-line .footer-title {
  display: flex;
  align-items: center;
}

.friends-line .footer-links {
  flex-direction: column;
  gap: 0.5rem;
}

.friends-line .footer-item {
  max-width: none;
  margin: 0;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  font-size: 0.9em;
  background-color: var(--anzhiyu-card-bg-none);
  transition: background-color 0.2s, color 0.1s;
}

.friends-line .footer-item:hover {
  background-color: var(--anzhiyu-card-bg);
}

#ghbdages {
  margin: 20px 0;
  text-align: center;
}

.github-badge {
  display: inline-block;
  margin: 4px;
  text-decoration: none;
}

.github-badge img {
  height: 20px;
  border-radius: 4px;
}

#footer-bar {
  padding: 1rem;
  color: var(--anzhiyu-fontcolor);
  margin-top: 1rem;
  background: var(--anzhiyu-secondbg);
  display: flex;
  overflow: hidden;
  z-index: 1002;
  transition: .3s;
}

#footer-bar a:hover {
  color: var(--anzhiyu-lighttext);
}

.footer-bar-link {
  margin: 8px 1rem 8px 0;
  color: var(--anzhiyu-fontcolor);
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  transition: .3s;
}

.footer-bar-link:hover {
  color: var(--anzhiyu-main);
}

.footer-bar-links {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1;
}

.footer-bar-left {
  display: flex;
  flex-wrap: wrap;
  min-height: 32px;
  align-items: center;
}

.footer-bar-right {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.copyright {
  color: var(--anzhiyu-fontcolor);
  font-size: 0.9rem;
}

/* 移动端响应式 */
@media screen and (max-width: 768px) {
  #footer {
    z-index: 3;
    margin-top: -1px;
  }

  #footer-wrap {
    padding: 20px 16px 0;
  }

  #anzhiyu-footer {
    flex-direction: row;
    padding: 0 1rem;
  }

  .footer-title {
    text-align: left;
  }

  .footer-bar-links {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .footer-bar-left {
    justify-content: center;
    margin-bottom: 10px;
  }

  .footer-bar-right {
    justify-content: center;
  }
}
</style>