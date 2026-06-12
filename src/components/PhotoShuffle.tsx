import { useState, useEffect, useRef } from 'react'
import { useSprings, useSpring, animated } from '@react-spring/web'

interface PhotoShuffleProps {
  images: string[]
}

const ROTATIONS = [0, -12, 8, -6]
const SCALES    = [1, 0.94, 0.91, 0.95]
const Y_OFFSETS = [0, 8, 14, 10]
const STAGGER   = [0, 0, 40, 80] // delay per stack position

function getRestingStyle(stackPos: number, total: number) {
  if (stackPos >= total) return { x: 0, y: 60, rotate: 0, scale: 0.88, opacity: 0, zIndex: 0 }
  return {
    x: 0,
    y: Y_OFFSETS[stackPos] ?? 12,
    rotate: ROTATIONS[stackPos] ?? 0,
    scale: SCALES[stackPos] ?? 0.9,
    opacity: 1,
    zIndex: total - stackPos,
  }
}

export default function PhotoShuffle({ images }: PhotoShuffleProps) {
  const n = images.length
  const visible = Math.min(4, n)
  const [order, setOrder] = useState(() => images.map((_, i) => i))
  const [flipping, setFlipping] = useState(false)
  // Alternate direction each flip instead of random (workflow-safe, also feels more intentional)
  const dirRef = useRef<1 | -1>(1)

  // ── Stack springs ──────────────────────────────────────────────────────────
  const [springs, api] = useSprings(n, i => {
    const stackPos = order.indexOf(i)
    return { ...getRestingStyle(stackPos, visible), immediate: true }
  })

  // Sync all cards to resting positions when order changes
  useEffect(() => {
    api.start(i => {
      const stackPos = order.indexOf(i)
      return {
        ...getRestingStyle(stackPos, visible),
        immediate: false,
        config: { mass: 1.1, tension: 140, friction: 28 },
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  // ── Hover spring (front card lift only) ────────────────────────────────────
  const [hoverSpring, hoverApi] = useSpring(() => ({
    hoverScale: 1,
    hoverY: 0,
    config: { mass: 1, tension: 260, friction: 22 },
  }))

  const handleMouseEnter = () => {
    if (flipping) return
    hoverApi.start({ hoverScale: 1.04, hoverY: -6 })
  }
  const handleMouseLeave = () => {
    hoverApi.start({ hoverScale: 1, hoverY: 0 })
  }

  // ── Click handler ──────────────────────────────────────────────────────────
  const handleClick = () => {
    if (flipping || n < 2) return
    setFlipping(true)

    // Reset hover immediately so fly-out starts from neutral position
    hoverApi.start({ hoverScale: 1, hoverY: 0, immediate: true })

    const frontImg = order[0]
    const dir = dirRef.current
    dirRef.current = dir === 1 ? -1 : 1

    // 1. Fly front card off
    api.start(i => {
      if (i !== frontImg) return {}
      return {
        x: dir * 230,
        y: -65,
        rotate: dir * 38,
        scale: 0.76,
        opacity: 0,
        config: { mass: 1.2, tension: 180, friction: 24 },
      }
    })

    // 2. Staggered promotion of back cards
    api.start(i => {
      const stackPos = order.indexOf(i)
      if (stackPos === 0 || stackPos >= visible) return {}
      return {
        ...getRestingStyle(stackPos - 1, visible),
        delay: STAGGER[stackPos] ?? 0,
        config: { mass: 1.1, tension: 140, friction: 28 },
      }
    })

    setTimeout(() => {
      const newOrder = [...order.slice(1), order[0]]
      const backPos = newOrder.indexOf(frontImg)

      // 3. Snap outgoing card below the stack (invisible) — useEffect will slide it in
      api.start(i => {
        if (i !== frontImg) return {}
        return {
          x: 0,
          y: 80,
          rotate: ROTATIONS[backPos] ?? 0,
          scale: SCALES[backPos] ?? 0.9,
          opacity: 0,
          zIndex: 0,
          immediate: true,
        }
      })

      setOrder(newOrder)
      setFlipping(false)
    }, 420)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      aria-label="Click to shuffle photos"
      style={{
        position: 'relative',
        width: 260,
        height: 340,
        cursor: flipping ? 'default' : 'pointer',
        userSelect: 'none',
      }}
    >
      {images.map((src, i) => {
        const stackPos = order.indexOf(i)
        if (stackPos >= visible) return null
        const isFront = stackPos === 0

        return (
          <animated.div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 20,
              overflow: 'hidden',
              // Front card gets hover spring layered on top of stack spring
              x: springs[i].x,
              y: isFront
                ? springs[i].y.to((y: number) => y + hoverSpring.hoverY.get())
                : springs[i].y,
              rotate: springs[i].rotate,
              scale: isFront
                ? springs[i].scale.to((s: number) => s * hoverSpring.hoverScale.get())
                : springs[i].scale,
              opacity: springs[i].opacity,
              zIndex: springs[i].zIndex,
              boxShadow: isFront
                ? '0 28px 64px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.3)'
                : '0 8px 24px rgba(0,0,0,0.3)',
              transformOrigin: 'center bottom',
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: isFront ? 'none' : `brightness(${0.5 + stackPos * 0.15})`,
                pointerEvents: 'none',
              }}
            />
          </animated.div>
        )
      })}
    </div>
  )
}
