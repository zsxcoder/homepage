<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-1000 z-0"
    :class="{ 'opacity-0': !enabled }"
    style="z-index: 0;"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useParticles } from '../../composables/useParticles'

const { particlesEnabled: enabled } = useParticles()
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speedY: number
  speedX: number
  opacity: number
  fadeSpeed: number
  type: 'circle' | 'star'
  rotation: number
  rotationSpeed: number
  update(): void
  reset(initial?: boolean): void
}

let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number = 0
let particles: Particle[] = []
let isDark = false

// Genshin Style Colors - Unified Starry/Magical Feel
const getColors = (dark: boolean) => {
  if (dark) return [
    'rgba(211, 188, 142, 0.6)', // Gold (Primogem-like)
    'rgba(255, 255, 255, 0.5)', // White
    'rgba(66, 133, 244, 0.4)',  // Blue
    'rgba(252, 211, 77, 0.4)',  // Amber
  ]
  return [
    'rgba(180, 83, 9, 0.3)',    // Dark Amber/Gold
    'rgba(59, 130, 246, 0.3)',  // Blue
    'rgba(148, 163, 184, 0.4)'  // Slate
  ]
}

let colors = getColors(isDark)
const particleCount = 35

class ParticleImpl implements Particle {
  x!: number
  y!: number
  size!: number
  color!: string
  speedY!: number
  speedX!: number
  opacity!: number
  fadeSpeed!: number
  type!: 'circle' | 'star'
  rotation!: number
  rotationSpeed!: number

  constructor() {
    this.reset(true)
  }

  reset(initial = false) {
    const canvas = canvasRef.value
    if (!canvas) return

    this.x = Math.random() * canvas.width
    this.y = initial ? Math.random() * canvas.height : canvas.height + 20
    this.size = Math.random() * 5 + 3
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.speedY = Math.random() * -0.5 - 0.1
    this.speedX = (Math.random() - 0.5) * 0.2
    this.opacity = 0
    this.fadeSpeed = Math.random() * 0.01 + 0.005
    this.type = Math.random() > 0.7 ? 'star' : 'circle'
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.02
  }

  draw() {
    const canvas = canvasRef.value
    if (!canvas || !ctx) return

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color

    if (this.type === 'star') {
      ctx.rotate(this.rotation)
      ctx.beginPath()
      const r = this.size * 2
      ctx.moveTo(0, -r)
      ctx.quadraticCurveTo(0.5, -0.5, r, 0)
      ctx.quadraticCurveTo(0.5, 0.5, 0, r)
      ctx.quadraticCurveTo(-0.5, 0.5, -r, 0)
      ctx.quadraticCurveTo(-0.5, -0.5, 0, -r)
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, this.size, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  update() {
    const canvas = canvasRef.value
    if (!canvas) return

    this.y += this.speedY
    this.x += this.speedX
    this.rotation += this.rotationSpeed

    if (this.y < canvas.height * 0.2) {
      this.opacity -= this.fadeSpeed
    } else if (this.opacity < 1) {
      this.opacity += this.fadeSpeed
    }

    if (this.y < -20 || this.opacity <= 0) {
      this.reset()
    }

    this.draw()
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const init = () => {
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new ParticleImpl())
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!ctx || !canvas) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach(p => p.update())
  animationFrameId = requestAnimationFrame(animate)
}

// Observer for Dark Mode changes
let observer: MutationObserver | null = null

const setupObserver = () => {
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const newIsDark = document.documentElement.classList.contains('dark')
        if (newIsDark !== isDark) {
          isDark = newIsDark
          colors = getColors(isDark)
          particles.forEach(p => p.color = colors[Math.floor(Math.random() * colors.length)])
        }
      }
    })
  })

  observer.observe(document.documentElement, { attributes: true })
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  isDark = document.documentElement.classList.contains('dark')
  colors = getColors(isDark)

  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  setupObserver()
  init()
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationFrameId)
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.fixed {
  position: fixed;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.pointer-events-none {
  pointer-events: none;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-1000 {
  transition-duration: 1000ms;
}

.z-0 {
  z-index: 0;
}

.opacity-0 {
  opacity: 0;
}
</style>
