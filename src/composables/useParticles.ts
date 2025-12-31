import { ref, watch } from 'vue'

const particlesEnabled = ref(true)

// 从 localStorage 读取初始状态
const savedState = localStorage.getItem('particlesEnabled')
if (savedState !== null) {
  particlesEnabled.value = savedState === 'true'
}

// 监听变化并保存到 localStorage
watch(particlesEnabled, (newValue) => {
  localStorage.setItem('particlesEnabled', String(newValue))
})

export function useParticles() {
  const toggleParticles = () => {
    particlesEnabled.value = !particlesEnabled.value
  }

  return {
    particlesEnabled,
    toggleParticles
  }
}
