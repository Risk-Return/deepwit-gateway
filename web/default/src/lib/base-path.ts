/**
 * Returns the application base path.
 * Detects from window.location (most reliable) or meta tag.
 * Falls back to '/' when neither is present (dev mode).
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/gateway/') || path === '/gateway') {
      return '/gateway/'
    }
    const base = document.querySelector('meta[name="base-path"]')?.getAttribute('content')
    if (base) {
      return base.endsWith('/') ? base : base + '/'
    }
  }
  return '/'
}

/**
 * Returns the gateway prefix (without trailing slash) for URL construction.
 * Used by axios interceptor to prepend to relative API paths.
 */
export function getGatewayPrefix(): string {
  return getBasePath().replace(/\/$/, '')
}
