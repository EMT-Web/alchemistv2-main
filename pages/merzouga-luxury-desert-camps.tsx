import { GetStaticProps } from 'next'
import GuidePage, { GUIDE_TOUR_QUERY } from '../components/GuidePage'
import { getGuide } from '../data/guides'
import { sanityClient } from '../sanity'

const SLUG = 'merzouga-luxury-desert-camps'

export default function Page({ tours }: { tours: any[] }) {
  return <GuidePage guide={getGuide(SLUG)!} tours={tours} />
}

export const getStaticProps: GetStaticProps = async () => {
  const guide = getGuide(SLUG)!
  const found = await sanityClient.fetch(GUIDE_TOUR_QUERY, { slugs: guide.tourSlugs })
  // Keep the order chosen in the guide.
  const tours = guide.tourSlugs.map((s) => found.find((t: any) => t.slug?.current === s)).filter(Boolean)
  if (tours.length !== guide.tourSlugs.length) throw new Error(`Guide ${SLUG}: missing tours`)
  return { props: { tours } }
}
