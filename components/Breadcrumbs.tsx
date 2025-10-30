import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs ${className}`}>
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        style={{
          display: 'flex',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          flexWrap: 'wrap'
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li
              key={item.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {!isLast ? (
                <>
                  <Link href={item.url} itemProp="item">
                    <span itemProp="name" style={{ color: '#f15d30', textDecoration: 'none' }}>
                      {item.name}
                    </span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                  <span style={{ margin: '0 8px', color: '#999' }}>
                    <i className="fa fa-chevron-right" />
                  </span>
                </>
              ) : (
                <>
                  <span itemProp="name" style={{ color: '#333' }}>
                    {item.name}
                  </span>
                  <meta itemProp="position" content={String(index + 1)} />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

