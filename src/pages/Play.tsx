type PlayItem = {
  title: string
  tools: string
  variant: 'tickets' | 'projectube'
  assets: {
    primary: string
    secondary: string
  }
}

const PLAY_ITEMS: PlayItem[] = [
  {
    title: 'Creative Design - Invitation to Club Retreat as a type of a ticket ✦',
    tools: 'Adobe Illustrator + Canva',
    variant: 'tickets',
    assets: {
      primary: '/assets/play/retreat-front.png',
      secondary: '/assets/play/retreat-back.png',
    },
  },
  {
    title: 'Brand Design - 3D logo for Projectube ✦',
    tools: 'Blender + Adobe Illustrator',
    variant: 'projectube',
    assets: {
      primary: '/assets/play/projectube-process.png',
      secondary: '/assets/play/projectube-logo.png',
    },
  },
]

export default function Play() {
  return (
    <main className="home" aria-label="Thao Nguyen play page">
      <section className="play-section play-section--page" aria-label="Play projects">
        {PLAY_ITEMS.map((item) => (
          <article key={item.title} className="play-row">
            <div className="play-copy">
              <h2 className="play-title">{item.title}</h2>
              <p className="play-tools">{item.tools}</p>
            </div>

            <div className={`play-visual play-visual--${item.variant}`}>
              {item.variant === 'tickets' ? (
                <div className="play-ticket-stack">
                  <img
                    src={item.assets.primary}
                    alt="Front side of the club retreat invitation ticket"
                    className="play-ticket play-ticket--front"
                  />
                  <img
                    src={item.assets.secondary}
                    alt="Back side of the club retreat invitation ticket"
                    className="play-ticket play-ticket--back"
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
    </main>
  )
}
