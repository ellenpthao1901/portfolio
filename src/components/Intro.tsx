import LocalTime from './LocalTime'

export default function Intro() {
  return (
    <section className="intro" aria-label="Introduction">
      <div className="identity">
        <h1>Thao Nguyen</h1>
        <p>
          Local time — <LocalTime /> Seattle, WA.{' '}
          <span className="live-dot" aria-label="online" />
        </p>
      </div>
      <p className="statement">
        I designed alongside with data and crafted products that actually matters.
        Shipping live products at SAP and Viettel Digital.
      </p>
    </section>
  )
}
