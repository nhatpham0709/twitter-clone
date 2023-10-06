import { SEO } from '@/components/common/Seo'
import { useAuth } from '@/context/AuthContext'
import { HomeLayout, ProtectedLayout } from '@/components/layout/CommonLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { StatsEmpty } from '@/components/tweet/StatsEmpty'
import { MainContainer } from '@/components/home/MainContainer'

export default function NotFound() {
  const { user } = useAuth()


  const Content = () => {
    return (
      <>
        <SEO
          title='Page not found / Twitter'
          description='Sorry we couldn’t find the page you were looking for.'
          image='/404.png'
        />

        <StatsEmpty
          title='Page not found'
          description='Sorry we couldn’t find the page you were looking for'
          imageData={{ src: '/assets/no-bookmarks.png', alt: 'No bookmarks' }}
        />
      </>
    )
  }

  if (!user) return <Content />

  return (
    <>
      <ProtectedLayout>
        <MainLayout>
          <HomeLayout>
            <MainContainer>
              <Content />
            </MainContainer>
          </HomeLayout>
        </MainLayout>
      </ProtectedLayout>
    </>
  )
}
