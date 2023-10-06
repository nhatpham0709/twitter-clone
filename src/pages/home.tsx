import { AnimatePresence } from 'framer-motion'
import { where, orderBy } from 'firebase/firestore'
import { useWindow } from '@/context/WindowContext'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { tweetsCollection } from '@/lib/firebase/collections'
import { HomeLayout, ProtectedLayout } from '@/components/layout/CommonLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { SEO } from '@/components/common/Seo'
import { MainContainer } from '@/components/home/MainContainer'
import { Input } from '@/components/input/Input'
import { UpdateUsername } from '@/components/home/UpdateUsername'
import { MainHeader } from '@/components/home/MainHeader'
import { Tweet } from '@/components/tweet/Tweet'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { type ReactElement } from 'react'

export default function Home() {
  const { isMobile } = useWindow()

  const {
    data: tweets,
    loading,
    LoadMore
  } = useInfiniteScroll(tweetsCollection, [where('parent', '==', null), orderBy('createdAt', 'desc')], {
    includeUser: true,
    allowNull: true,
    preserve: true
  })

  return (
    <MainContainer>
      <SEO title='Home / Twitter' />
      <MainHeader useMobileSidebar title='Home' className='flex items-center justify-between'>
        <UpdateUsername />
      </MainHeader>
      {!isMobile && <Input />}
      <section className='mt-0.5 xs:mt-0'>
        {loading ? (
          <Loading className='mt-5' />
        ) : !tweets?.length ? (
          <Error message='No Tweets' />
        ) : (
          <>
            <AnimatePresence>
              {tweets.map(tweet => (
                <Tweet key={tweet.id} {...tweet} />
              ))}
            </AnimatePresence>

            <LoadMore />
          </>
        )}
      </section>
    </MainContainer>
  )
}

Home.getLayout = (page: ReactElement) => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
)
