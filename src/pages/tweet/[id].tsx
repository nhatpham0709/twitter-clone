import { useRef } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { doc, query, where, orderBy } from 'firebase/firestore'
import { tweetsCollection } from '@/lib/firebase/collections'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'
import { isPlural } from '@/lib/utils'
import { HomeLayout, ProtectedLayout } from '@/components/layout/CommonLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { MainContainer } from '@/components/home/MainContainer'
import { MainHeader } from '@/components/home/MainHeader'
import { Tweet } from '@/components/tweet/Tweet'
import { ViewTweet } from '@/components/view/ViewTweet'
import { SEO } from '@/components/common/Seo'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { ViewParentTweet } from '@/components/view/ViewParentTweet'
import type { ReactElement, ReactNode } from 'react'

export default function TweetId() {
  const {
    query: { id },
    back
  } = useRouter()

  const { data: tweetData, loading: tweetLoading } = useDocument(doc(tweetsCollection, id as string), {
    includeUser: true
  })

  const viewTweetRef = useRef<HTMLElement>(null)

  const { data: repliesData, loading: repliesLoading } = useCollection(
    query(tweetsCollection, where('parent.id', '==', id), orderBy('createdAt', 'desc')),
    { includeUser: true }
  )

  const { text, images } = tweetData ?? {}

  const imagesLength = images?.length ?? 0
  const parentId = tweetData?.parent?.id

  const pageTitle = tweetData
    ? `${tweetData.user.name} on Twitter: "${text ?? ''}${
        images ? ` (${imagesLength} image${isPlural(imagesLength)})` : ''
      }" / Twitter`
    : null

  return (
    <MainContainer className='!pb-[1280px]'>
      <MainHeader useActionButton title={parentId ? 'Thread' : 'Tweet'} action={back} />
      <section>
        {tweetLoading ? (
          <Loading className='mt-5' />
        ) : !tweetData ? (
          <>
            <SEO title='Tweet not found / Twitter' />
            <Error message='Tweet not found' />
          </>
        ) : (
          <>
            {pageTitle && <SEO title={pageTitle} />}
            {parentId && <ViewParentTweet parentId={parentId} viewTweetRef={viewTweetRef} />}
            <ViewTweet viewTweetRef={viewTweetRef} {...tweetData} />
            {tweetData &&
              (repliesLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map(tweet => (
                    <Tweet {...tweet} key={tweet.id} />
                  ))}
                </AnimatePresence>
              ))}
          </>
        )}
      </section>
    </MainContainer>
  )
}

TweetId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
)
