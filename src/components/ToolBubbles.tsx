import { useRef, useCallback } from 'react'
import { useSprings, animated } from '@react-spring/web'

// Figma positions (px) — origin is top-left of the group
// Each bubble: { label, src, x (left), y (top) }
// Bubble size in Figma: 195.446px → we scale to 80px display size
// Scale factor: 80 / 195.446 ≈ 0.4093
// Canvas in Figma: ~1140 × 956 → we display at ~380px wide

const FIGMA_SIZE = 195.446
const DISPLAY_SIZE = 80
const SCALE = DISPLAY_SIZE / FIGMA_SIZE

const FIGMA_BUBBLES = [
  // label,                    src,                                          figma_left, figma_top
  { label: 'Claude',    src: '/assets/about/tool-claude.png',    x: 0,       y: 337.72  },
  { label: 'Adobe',     src: '/assets/about/tool-adobe.png',     x: 195.43,  y: 142.29  },
  { label: 'Figma',     src: '/assets/about/tool-figma.png',     x: 408.42,  y: 0       },
  { label: 'Blender',   src: '/assets/about/tool-blender.png',   x: 230.55,  y: 398.06  },
  { label: 'AI',        src: '/assets/about/tool-ai.png',        x: 652.93,  y: 106.27  },
  { label: 'ProtoPie',  src: '/assets/about/tool-protopie.png',  x: 678.6,   y: 389.06  },
  { label: 'Miro',      src: '/assets/about/tool-miro.png',      x: 446.25,  y: 253.52  },
  { label: 'Codex',     src: '/assets/about/tool-codex.png',     x: 85.11,   y: 610.6   },
  { label: 'Photoshop', src: '/assets/about/tool-ps.png',        x: 887.54,  y: 253.52  },
  { label: 'Google',    src: '/assets/about/tool-google.png',    x: 943.38,  y: 483.62  },
  { label: 'Canva',     src: '/assets/about/tool-canva.png',     x: 320.16,  y: 718.23  },
  { label: 'FigJam',    src: '/assets/about/tool-figjam.png',    x: 555.22,  y: 760.55  },
  { label: 'GitHub',    src: '/assets/about/tool-github.png',    x: 750.65,  y: 620.51  },
]

// Scale all positions to display size
const BUBBLES = FIGMA_BUBBLES.map(b => ({
  ...b,
  x: b.x * SCALE,
  y: b.y * SCALE,
}))

// Canvas dimensions (max figma x + size, max figma y + size) × SCALE
const CANVAS_W = Math.ceil((943.38 + FIGMA_SIZE) * SCALE)
const CANVAS_H = Math.ceil((760.55 + FIGMA_SIZE) * SCALE)

const PUSH_RADIUS = 120   // px — how far mouse influence reaches
const PUSH_STRENGTH = 28  // max px displacement

export default function ToolBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [springs, api] = useSprings(BUBBLES.length, i => ({
    x: BUBBLES[i].x,
    y: BUBBLES[i].y,
    config: { mass: 1, tension: 180, friction: 22 },
  }))

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    api.start(i => {
      const ox = BUBBLES[i].x + DISPLAY_SIZE / 2
      const oy = BUBBLES[i].y + DISPLAY_SIZE / 2
      const dx = ox - mx
      const dy = oy - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < PUSH_RADIUS && dist > 0) {
        const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH
        return {
          x: BUBBLES[i].x + (dx / dist) * force,
          y: BUBBLES[i].y + (dy / dist) * force,
          config: { mass: 1, tension: 300, friction: 20 },
        }
      }
      return {
        x: BUBBLES[i].x,
        y: BUBBLES[i].y,
        config: { mass: 1, tension: 180, friction: 26 },
      }
    })
  }, [api])

  const onMouseLeave = useCallback(() => {
    api.start(i => ({
      x: BUBBLES[i].x,
      y: BUBBLES[i].y,
      config: { mass: 1.2, tension: 140, friction: 28 },
    }))
  }, [api])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: 'relative', width: CANVAS_W, height: CANVAS_H }}
    >
      {BUBBLES.map((b, i) => (
        <animated.div
          key={b.label}
          title={b.label}
          style={{
            position: 'absolute',
            width: DISPLAY_SIZE,
            height: DISPLAY_SIZE,
            borderRadius: '50%',
            background: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            x: springs[i].x,
            y: springs[i].y,
          }}
        >
          <img
            src={b.src}
            alt={b.label}
            style={{ width: 50, height: 50, objectFit: 'cover', pointerEvents: 'none' }}
          />
        </animated.div>
      ))}
    </div>
  )
}
