import React, { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../sanity'

/* ---------------------------------------------------------------- helpers */
const paras = (txt: string) =>
  String(txt || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

const STATS = [
  { n: '30+', label: 'Curated itineraries' },
  { n: '5.0', label: 'TripAdvisor rating', sup: '★' },
  { n: '4', label: 'Expert local guides' },
  { n: '4', label: 'Languages spoken' },
]

/* ------------------------------------------------------------------ story */
function Story({ about, img }: any) {
  const body = paras(about?.abouttext)
  return (
    <section className="ftco-section about-story">
      <div className="container">
        <div className="row align-items-center about-story__row">
          <div className="col-lg-6 about-story__media ftco-animate">
            <div className="about-story__frame">
              {img ? (
                <Image
                  src={img}
                  alt="Escorted Morocco Tours"
                  fill
                  sizes="(max-width: 991px) 100vw, 540px"
                  style={{ objectFit: 'cover' }}
                />
              ) : null}
            </div>
          </div>
          <div className="col-lg-6 about-story__text ftco-animate">
            <span className="subheading">{about?.abouttagline || 'Our story'}</span>
            <h2>{about?.abouttitle || 'Escorted Morocco Tours'}</h2>
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="about-stats ftco-animate">
          {STATS.map((s) => (
            <li key={s.label} className="about-stats__item">
              <span className="about-stats__n">
                {s.n}
                {s.sup && <sup>{s.sup}</sup>}
              </span>
              <span className="about-stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- mission/vision */
function MissionVision({ mv }: any) {
  if (!mv) return null
  return (
    <section className="ftco-section about-mv">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 heading-section ftco-animate">
            <span className="subheading">What drives us</span>
            <h2>Purpose &amp; direction</h2>
          </div>
        </div>
        <div className="row about-mv__grid">
          <div className="col-md-6 d-flex ftco-animate">
            <article className="mv-card">
              <span className="mv-card__icon fa fa-compass" aria-hidden="true" />
              <h3>{mv.missiontag || 'Our Mission'}</h3>
              <p>{mv.missiontext}</p>
            </article>
          </div>
          <div className="col-md-6 d-flex ftco-animate">
            <article className="mv-card">
              <span className="mv-card__icon fa fa-flag" aria-hidden="true" />
              <h3>{mv.visiontag || 'Our Vision'}</h3>
              <p>{mv.visiontext}</p>
            </article>
          </div>
        </div>
        {mv.videolink && (
          <div className="text-center ftco-animate">
            <a
              href={mv.videolink}
              target="_blank"
              rel="noopener noreferrer"
              className="about-mv__video"
            >
              <span className="fa fa-play" aria-hidden="true" /> Watch our short film
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- team */
function TeamCard({ member }: any) {
  const [open, setOpen] = useState(false)
  const img = member?.mainimage ? urlFor(member.mainimage).url() : ''
  return (
    <div className="col-sm-6 col-lg-3 d-flex ftco-animate">
      <article className="team-card">
        <div className="team-card__photo">
          {img ? (
            <Image
              src={img}
              alt={member.title || member.role || 'Guide'}
              fill
              sizes="(max-width: 991px) 50vw, 260px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : null}
        </div>
        <div className="team-card__body">
          <h3 className="team-card__name">{member.title || member.alt}</h3>
          <span className="team-card__role">{member.role}</span>
          <p className={`team-card__bio${open ? ' is-open' : ''}`}>{member.paragraph}</p>
          {member.paragraph && member.paragraph.length > 220 && (
            <button
              type="button"
              className="team-card__toggle"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Show less' : 'Read full bio'}
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

function Team({ team }: any) {
  if (!Array.isArray(team) || team.length === 0) return null
  return (
    <section className="ftco-section about-team">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 heading-section ftco-animate">
            <span className="subheading">Meet your guides</span>
            <h2>Born and raised in Morocco</h2>
            <p>
              Our guides grew up in Berber families across the Zagora and Merzouga deserts and the
              medina of Marrakech. They drive, translate, and share the Morocco they know first-hand.
            </p>
          </div>
        </div>
        <div className="row about-team__grid">
          {team.map((m: any, i: number) => (
            <TeamCard key={m._key || i} member={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- exports */
export function AboutStory({ about }: any) {
  const storyImg =
    (about?.coverImage && urlFor(about.coverImage).url()) ||
    (about?.missionvision?.mainimage && urlFor(about.missionvision.mainimage).url()) ||
    ''
  return <Story about={about?.mainabout} img={storyImg} />
}

export function AboutMissionVision({ about }: any) {
  return <MissionVision mv={about?.missionvision} />
}

export function AboutTeam({ about }: any) {
  return <Team team={about?.team} />
}

export default function AboutSections({ about }: any) {
  return (
    <>
      <AboutStory about={about} />
      <AboutMissionVision about={about} />
      <AboutTeam about={about} />
    </>
  )
}
