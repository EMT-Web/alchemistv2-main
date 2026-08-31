import React from 'react'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../sanity'

/**
 * Shared render config for CMS rich-text bodies (tour itineraries, destination
 * and blog articles).
 *
 * The CMS stores some in-body headings with an `h1`/`h2` style. On a page that
 * already has a single hero <h1> and a section <h2> above the body, rendering
 * those as real <h1>/<h2> creates multiple <h1>s and breaks the outline.
 * So every body heading is demoted one level: h1->h3, h2->h3, h3->h4, h4->h5.
 * (Merged with @portabletext/react's defaults, so normal/blockquote/lists are
 * still handled.)
 */
export const bodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const url = urlFor(value).url()
      return url ? <img src={url} alt={value?.alt || ''} loading="lazy" /> : null
    },
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: any) => <h3>{children}</h3>,
    h2: ({ children }: any) => <h3>{children}</h3>,
    h3: ({ children }: any) => <h4>{children}</h4>,
    h4: ({ children }: any) => <h5>{children}</h5>,
  },
}
