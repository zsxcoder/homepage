import { ref, onMounted } from 'vue'

const THEME_KEY = 'anzhiyu-theme'

export function useTheme() {
  const isDark = ref(false)

  // 初始化主题
  function initTheme() {
    // 从localStorage读取保存的主题
    const savedTheme = localStorage.getItem(THEME_KEY)

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // 如果没有保存的主题，根据系统偏好设置
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    applyTheme()
  }

  // 切换主题
  function toggleTheme() {
    isDark.value = !isDark.value
    console.log('Theme toggled:', isDark.value ? 'dark' : 'light')
    applyTheme()
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
  }

  // 应用主题到DOM
  function applyTheme() {
    if (isDark.value) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // 监听系统主题变化
  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在没有手动设置主题时才跟随系统
      if (!localStorage.getItem(THEME_KEY)) {
        isDark.value = e.matches
        applyTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
    watchSystemTheme
  }
}
