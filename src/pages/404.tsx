import Error from 'next/error'
import { useTheme } from '@/context/ThemeContext'
import { SEO } from '@/components/common/Seo'

export default function NotFound() {
  const { theme } = useTheme()

  const isDarkMode = ['dim', 'dark'].includes(theme)

  return (
    <>
      <SEO
        title='Page not found / Twitter'
        description='Sorry we couldn’t find the page you were looking for.'
        image='/404.png'
      />
      <Error statusCode={404} withDarkMode={isDarkMode} />
    </>
  )
}
