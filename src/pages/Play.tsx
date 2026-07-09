import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'

type PlayItem = {
  title: string
  tools: string
  variant: 'tickets' | 'projectube'
  assets: {
    primary: string
    secondary: string
  }
}

type PlayImage = {
  src: string
  alt: string
}

type ActivePlayImage = {
  mode: 'ticket'
  front: PlayImage
  back: PlayImage
  side: 'front' | 'back'
}

const PLAY_ITEMS: PlayItem[] = [
  {
    title: 'Creative Design - Invitation to Club Retreat as a type of a ticket ✦',
    tools: 'Adobe Illustrator + Canva',
    variant: 'tickets',
    assets: {
      primary: '/assets/play/retreat-front.webp',
      secondary: '/assets/play/retreat-back.webp',
    },
  },
  {
    title: 'Brand Design - 3D logo for Projectube ✦',
    tools: 'Blender + Adobe Illustrator',
    variant: 'projectube',
    assets: {
      primary: '/assets/play/projectube-process.webp',
      secondary: '/assets/play/projectube-logo.webp',
    },
  },
]

export default function Play() {
  const [activeImage, setActiveImage] = useState<ActivePlayImage | null>(null)
  const isTicketFlippingRef = useRef(false)
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearFlipLock = () => {
    isTicketFlippingRef.current = false
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current)
      flipTimeoutRef.current = null
    }
  }

  const openTicketImage = (
    ticket: { front: PlayImage; back: PlayImage },
    side: 'front' | 'back',
    source: string,
  ) => {
    const image = ticket[side]
    console.log(`${source} clicked`, image.src)
    clearFlipLock()
    setActiveImage({ mode: 'ticket', ...ticket, side })
  }

  const flipTicketImage = () => {
    if (isTicketFlippingRef.current) return

    isTicketFlippingRef.current = true
    setActiveImage((current) => {
      if (!current || current.mode !== 'ticket') return current

      const nextSide = current.side === 'front' ? 'back' : 'front'
      console.log(`Expanded ticket flipped to ${nextSide}`, current[nextSide].src)
      return { ...current, side: nextSide }
    })
    flipTimeoutRef.current = setTimeout(() => {
      isTicketFlippingRef.current = false
      flipTimeoutRef.current = null
    }, 760)
  }

  const handleImageKeyDown = (
    event: ReactKeyboardEvent,
    action: () => void,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    action()
  }

  const closeActiveImage = () => {
    clearFlipLock()
    setActiveImage(null)
  }

  useEffect(() => {
    return () => clearFlipLock()
  }, [])

  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeActiveImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  return (
    <main className="home play-page" aria-label="Thao Nguyen play page">
      <section className="play-section play-section--page" aria-label="Play projects">
        {PLAY_ITEMS.map((item) => (
          <article key={item.title} className="play-row">
            <div className="play-copy">
              <h2 className="play-title">{item.title}</h2>
              <p className="play-tools">{item.tools}</p>
            </div>

            <div className={`play-visual play-visual--${item.variant}`}>
              {item.variant === 'tickets' ? (
                <div className="play-ticket-area">
                  <div className="play-ticket-stack">
                    <img
                      src={item.assets.primary}
                      alt="Front side of the club retreat invitation ticket"
                      className="play-ticket play-clickable-image"
                      role="button"
                      tabIndex={0}
                      onClick={() => openTicketImage({
                        front: {
                          src: item.assets.primary,
                          alt: 'Front side of the club retreat invitation ticket',
                        },
                        back: {
                          src: item.assets.secondary,
                          alt: 'Back side of the club retreat invitation ticket',
                        },
                      }, 'front', 'Play ticket front image')}
                      onKeyDown={(event) => handleImageKeyDown(event, () => openTicketImage({
                        front: {
                          src: item.assets.primary,
                          alt: 'Front side of the club retreat invitation ticket',
                        },
                        back: {
                          src: item.assets.secondary,
                          alt: 'Back side of the club retreat invitation ticket',
                        },
                      }, 'front', 'Play ticket front image'))}
                    />
                    <img
                      src={item.assets.secondary}
                      alt="Back side of the club retreat invitation ticket"
                      className="play-ticket play-clickable-image"
                      role="button"
                      tabIndex={0}
                      onClick={() => openTicketImage({
                        front: {
                          src: item.assets.primary,
                          alt: 'Front side of the club retreat invitation ticket',
                        },
                        back: {
                          src: item.assets.secondary,
                          alt: 'Back side of the club retreat invitation ticket',
                        },
                      }, 'back', 'Play ticket back image')}
                      onKeyDown={(event) => handleImageKeyDown(event, () => openTicketImage({
                        front: {
                          src: item.assets.primary,
                          alt: 'Front side of the club retreat invitation ticket',
                        },
                        back: {
                          src: item.assets.secondary,
                          alt: 'Back side of the club retreat invitation ticket',
                        },
                      }, 'back', 'Play ticket back image'))}
                    />
                  </div>
                  <img
                    src="/assets/play/clickme.webp"
                    alt="Click me"
                    className="play-ticket-cta-image"
                    role="button"
                    tabIndex={0}
                    onClick={() => openTicketImage({
                      front: {
                        src: item.assets.primary,
                        alt: 'Front side of the club retreat invitation ticket',
                      },
                      back: {
                        src: item.assets.secondary,
                        alt: 'Back side of the club retreat invitation ticket',
                      },
                    }, 'front', 'Play ticket CTA image')}
                    onKeyDown={(event) => handleImageKeyDown(event, () => openTicketImage({
                      front: {
                        src: item.assets.primary,
                        alt: 'Front side of the club retreat invitation ticket',
                      },
                      back: {
                        src: item.assets.secondary,
                        alt: 'Back side of the club retreat invitation ticket',
                      },
                    }, 'front', 'Play ticket CTA image'))}
                  />
                </div>
              ) : (
                <div className="play-projectube-showcase">
                  <div className="play-projectube-process-wrap">
                    <img
                      src={item.assets.primary}
                      alt="Projectube logo process shown inside Blender"
                      className="play-projectube-process"
                    />
                  </div>
                  <div className="play-projectube-logo-wrap">
                    <img
                      src={item.assets.secondary}
                      alt="Final 3D Projectube logo"
                      className="play-projectube-logo"
                    />
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
      {activeImage ? (
        <div
          className="play-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded play image"
          onClick={closeActiveImage}
        >
          <button
            type="button"
            className={`play-lightbox-flip-card${activeImage.side === 'back' ? ' is-back' : ''}`}
            aria-label={`Flip ticket to ${activeImage.side === 'front' ? 'back' : 'front'} side`}
            onClick={(event) => {
              event.stopPropagation()
              flipTicketImage()
            }}
          >
            <span className="play-lightbox-flip-inner">
              <img
                src={activeImage.front.src}
                alt={activeImage.front.alt}
                className="play-lightbox-face play-lightbox-face--front"
              />
              <img
                src={activeImage.back.src}
                alt={activeImage.back.alt}
                className="play-lightbox-face play-lightbox-face--back"
              />
            </span>
          </button>
        </div>
      ) : null}
    </main>
  )
}
