'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'underline' : ''} px-8`} href="/">
        GTFS API
      </Link>
 
      <Link
        className={`link ${pathname === '/futar' ? 'underline' : ''}`}
        href="/futar"
      >
        FUTÁR API
      </Link>
    </nav>
  )
}