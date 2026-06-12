import { useReducer, useRef } from 'react'
import { useSprings, useSpring, to, animated } from '@react-spring/web'

interface PhotoShuffleProps {
  images: string[]
}

const ROTATIONS = [0, -12, 8, -6]
const SCALES    = [1, 0.94, 0.91, 0.95]
const Y_OFFSETS = [0, 8, 14, 10]
const STAGGER   = [0, 40, 80]

function restingStyle(stackPos: number, total: number) {
  if (stackPos < 0 || stackPos >= total)
    return { x: 0, y: 60, rotate: 0, scale: 0.88, opacity: 0, zIndex: 0 }
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

  const orderRef    = useRef<number[]>(images.map((_, i) => i))
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)
  const flippingRef = useRef(false)
  const dirRef      = useRef<1 | -1>(1)

  const [springs, api] = useSprings(n, i => ({
    ...restingStyle(orderRef.current.indexOf(i), visible),
    immediate: true,
  }))

  const [hoverSpring, hoverApi] = useSpring(() => ({
    hoverScale: 1, hoverY: 0,
    config: { mass: 1, tension: 260, friction: 22 },
  }))

  const handleClick = () => {
    if (flippingRef.current || n < 2) return
    flippingRef.current = true
    hoverApi.start({ hoverScale: 1, hoverY: 0, immediate: true })

    const frontImg = orderRef.current[0]
    const dir = dirRef.current
    dirRef.current = dir === 1 ? -1 : 1

    api.start(i => {
      if (i !== frontImg) return {}
      return { x: dir * 240, y: -70, rotate: dir * 40, scale: 0.74, opacity: 0,
        config: { mass: 1.2, tension: 180, friction: 24 } }
    })

    api.start(i => {
      const sp = orderRef.current.indexOf(i)
      if (sp <= 0 || sp >= visible) return {}
      return { ...restingStyle(sp - 1, visible), delay: STAGGER[sp - 1] ?? 0,
        config: { mass: 1.1, tension: 140, friction: 28 } }
    })

    setTimeout(() => {
      const newOrder = [...orderRef.current.slice(1), orderRef.current[0]]
      const backPos = newOrder.indexOf(frontImg)

      api.start(i => {
        if (i !== frontImg) return {}
        return { ...restingStyle(backPos, visible), opacity: 0, immediate: true }
      })

      api.start(i => {
        if (i === frontImg) return {}
        const sp = newOrder.indexOf(i)
        return { ...restingStyle(sp, visible), config: { mass: 1.1, tension: 140, friction: 28 } }
      })

      orderRef.current = newOrder

      setTimeout(() => {
        api.start(i => {
          if (i !== frontImg) return {}
          return { ...restingStyle(backPos, visible), config: { mass: 1.1, tension: 140, friction: 28 } }
        })
        flippingRef.current = false
        forceUpdate()
      }, 32)
    }, 440)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => { if (!flippingRef.current) hoverApi.start({ hoverScale: 1.04, hoverY: -6 }) }}
      onMouseLeave={() => hoverApi.start({ hoverScale: 1, hoverY: 0 })}
      role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      aria-label="Click to shuffle photos"
      style={{ position: 'relative', width: 260, height: 340,
        cursor: flippingRef.current ? 'default' : 'pointer', userSelect: 'none' }}
    >
      {images.map((src, i) => {
        const stackPos = orderRef.current.indexOf(i)
        if (stackPos >= visible) return null
        const isFront = stackPos === 0
        return (
          <animated.div key={i} style={{
            position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden',
            x: springs[i].x,
            y: isFront
              ? to([springs[i].y, hoverSpring.hoverY], (y: number, hy: number) => y + hy)
              : springs[i].y,
            rotate: springs[i].rotate,
            scale: isFront
              ? to([springs[i].scale, hoverSpring.hoverScale], (s: number, hs: number) => s * hs)
              : springs[i].scale,
            opacity: springs[i].opacity,
            
            // FIX: Round the zIndex so the browser never drops it mid-animation
            zIndex: springs[i].zIndex.to(z => Math.round(z)),
            
            boxShadow: isFront
              ? '0 28px 64px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.3)'
              : '0 8px 24px rgba(0,0,0,0.3)',
            transformOrigin: 'center bottom',
          }}>
            <img src={src} alt="" draggable={false} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center', display: 'block',
              filter: isFront ? 'none' : `brightness(${0.5 + stackPos * 0.15})`,
              pointerEvents: 'none',
            }} />
          </animated.div>
        )
      })}
    </div>
  )
}