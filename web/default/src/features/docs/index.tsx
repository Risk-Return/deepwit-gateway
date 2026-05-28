import { useMemo, useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { cn } from '@/lib/utils'
import { DocsEn, DocsZh, SECTIONS } from './content'

export function DocsPage() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language?.startsWith('zh') ?? false
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }, [])

  return (
    <PublicLayout>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Header */}
        <div className='mb-10'>
          <h1 className='text-3xl font-bold tracking-tight'>
            {isZh ? 'API 网关文档' : 'API Gateway Documentation'}
          </h1>
          <p className='text-muted-foreground mt-2 max-w-2xl'>
            {isZh
              ? '了解如何使用 DeepWit AI 网关统一管理所有 AI 模型访问。'
              : 'Learn how to use DeepWit AI Gateway to manage all your AI model access through a single endpoint.'}
          </p>
        </div>

        {/* Two-column layout */}
        <div className='flex gap-10 lg:gap-16'>
          {/* Sidebar nav */}
          <aside className='hidden lg:block w-52 flex-shrink-0'>
            <nav className='sticky top-24 space-y-0.5'>
              <p className='text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3'>
                {isZh ? '目录' : 'On this page'}
              </p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type='button'
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    'block w-full text-left text-sm py-1.5 px-2.5 rounded-md transition-colors',
                    'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  {isZh ? section.labelZh : section.labelEn}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className='min-w-0 flex-1'>
            {isZh ? <DocsZh /> : <DocsEn />}
          </main>
        </div>
      </div>
    </PublicLayout>
  )
}
