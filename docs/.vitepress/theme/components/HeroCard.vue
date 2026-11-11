<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
const card = ref<HTMLButtonElement>()
const x = ref(0)
const y = ref(0)
const dragging = ref(false)
const revealed = computed(() => Math.hypot(x.value, y.value) > 60)
const transform = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px) rotate(${x.value / 18}deg)`,
}))

let pointer: number | undefined
let originX = 0
let originY = 0
let frame = 0
let keyboardHeld = false

function stopSpring() {
  cancelAnimationFrame(frame)
  frame = 0
}

function returnHome() {
  stopSpring()
  dragging.value = false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    x.value = y.value = 0
    return
  }

  let vx = 0
  let vy = 0
  let previous = performance.now()
  function step(now: number) {
    const dt = Math.min((now - previous) / 1000, 1 / 30)
    previous = now
    // An underdamped spring settles with a small, natural overshoot.
    vx += (-220 * x.value - 22 * vx) * dt
    vy += (-220 * y.value - 22 * vy) * dt
    x.value += vx * dt
    y.value += vy * dt
    if (Math.hypot(x.value, y.value) < 0.1 && Math.hypot(vx, vy) < 0.5) {
      x.value = y.value = 0
      frame = 0
    } else {
      frame = requestAnimationFrame(step)
    }
  }
  frame = requestAnimationFrame(step)
}

function startDrag(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0 || keyboardHeld) return
  stopSpring()
  pointer = event.pointerId
  originX = event.clientX - x.value
  originY = event.clientY - y.value
  dragging.value = true
  card.value?.setPointerCapture(event.pointerId)
}

function moveDrag(event: PointerEvent) {
  if (event.pointerId !== pointer) return
  const limit = (card.value?.offsetWidth ?? 232) * 1.4
  // Resistance grows toward the edge so the card cannot get lost off-screen.
  x.value = limit * Math.tanh((event.clientX - originX) / limit)
  y.value = limit * Math.tanh((event.clientY - originY) / limit)
}

function endDrag(event: PointerEvent) {
  if (event.pointerId !== pointer) return
  pointer = undefined
  if (card.value?.hasPointerCapture(event.pointerId)) {
    card.value.releasePointerCapture(event.pointerId)
  }
  returnHome()
}

function revealWithKeyboard(event: KeyboardEvent) {
  if (event.key !== ' ' && event.key !== 'Enter') return
  event.preventDefault()
  if (event.repeat || pointer !== undefined) return
  stopSpring()
  keyboardHeld = true
  x.value = (card.value?.offsetWidth ?? 232) * 0.85
  y.value = -24
}

function releaseKeyboard(event?: KeyboardEvent) {
  if (event && event.key !== ' ' && event.key !== 'Enter') return
  if (!keyboardHeld) return
  event?.preventDefault()
  keyboardHeld = false
  returnHome()
}

onBeforeUnmount(stopSpring)
</script>

<template>
  <div class="hero-card-stack">
    <div class="hero-card-note" :aria-hidden="!revealed">
      <span class="note-spark" aria-hidden="true">✧</span>
      <p v-if="chinese">愿每一种心情，<br>都有安放的地方。</p>
      <p v-else>May every mood<br>find a place to rest.</p>
    </div>
    <button
      ref="card"
      class="hero-card-cover"
      :class="{ 'is-dragging': dragging }"
      :style="transform"
      :aria-label="chinese ? '按住并拖动，发现一句祝福；也可按住空格或回车键' : 'Hold and drag to find a wish, or hold Space or Enter'"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @lostpointercapture="endDrag"
      @keydown="revealWithKeyboard"
      @keyup="releaseKeyboard"
      @blur="releaseKeyboard()"
    >
      <img class="hero-logo light" :src="withBase('/logo-light.svg')" alt="Moodiary" draggable="false">
      <img class="hero-logo dark" :src="withBase('/logo-dark.svg')" alt="Moodiary" draggable="false">
    </button>
  </div>
</template>

<style scoped>
.hero-card-stack {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--hero-paper-size);
  height: var(--hero-paper-size);
  transform: translate(-50%, -50%);
}

.hero-card-note,
.hero-card-cover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 28px;
}

.hero-card-note {
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  transform: rotate(-9deg);
  text-align: center;
}

.note-spark {
  color: var(--vp-c-text-3);
  font-size: 28px;
  line-height: 1;
}

.hero-card-note p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: clamp(13px, 1.1vw, 16px);
  line-height: 1.8;
}

.hero-card-cover {
  padding: 0;
  background: linear-gradient(145deg, var(--vp-c-bg), var(--vp-c-bg-alt));
  box-shadow: 0 16px 40px -20px rgb(0 0 0 / 22%);
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.hero-card-cover.is-dragging {
  cursor: grabbing;
}

.hero-card-cover:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 6px;
}

.hero-logo {
  width: var(--hero-logo-size);
  height: var(--hero-logo-size);
  pointer-events: none;
}

.hero-logo.dark,
:global(.dark .hero-card-cover .hero-logo.light) {
  display: none;
}

:global(.dark .hero-card-cover .hero-logo.dark) {
  display: block;
}
</style>
