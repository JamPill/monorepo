'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import './header.css'

interface NavItem {
  link: {
    type?: ('reference' | 'custom') | null
    label: string
    reference?: {
      relationTo: 'posts'
      value: any // number or Post object
    } | null
    url?: string | null
    newTab?: boolean | null
  }
}

interface HeaderProps {
  data: {
    logo?: any
    navItems?: NavItem[] | null
  }
}

export const NavbarClient: React.FC<HeaderProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if background should be shown
      setIsScrolled(currentScrollY > 20)

      // Determine visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const { logo, navItems } = data

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}>
      <div className="header-container">
        <Link href="/" className="logo">
          {logo?.url ? (
            <img src={logo.url} alt={logo.alt || 'Logo'} className="logo-img" />
          ) : (
            <span className="logo-text">JamPill</span>
          )}
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            {navItems?.map((item, i) => {
              const href =
                item.link.type === 'reference'
                  ? `/posts/${item.link.reference?.value?.slug || item.link.reference?.value}`
                  : item.link.url || '#'

              return (
                <li key={i} className="nav-item">
                  <Link
                    href={href}
                    target={item.link.newTab ? '_blank' : undefined}
                    className="nav-link"
                  >
                    {item.link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
