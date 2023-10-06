import { AnimatePresence } from 'framer-motion'
import { query, where, orderBy } from 'firebase/firestore'
import { useCollection } from '@/hooks/useCollection'
import { tweetsCollection } from '@/lib/firebase/collections'
import { useUser } from '@/context/UserContext'
import { UserLayout, ProtectedLayout } from '@/components/layout/CommonLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { SEO } from '@/components/common/Seo'
import { UserDataLayout } from '@/components/layout/UserDataLayout'
import { UserHomeLayout } from '@/components/layout/UserHomeLayout'
import { Tweet } from '@/components/tweet/Tweet'
import { Loading } from '@/components/ui/Loading'
import { StatsEmpty } from '@/components/tweet/StatsEmpty'
import type { ReactElement, ReactNode } from 'react'

export default function UserLikes() {
  const { user } = useUser()

  const { id, name, username } = user ?? {}

  const { data: tweets, loading } = useCollection(
    query(tweetsCollection, where('userLikes', 'array-contains', id), orderBy('createdAt', 'desc')),
    { includeUser: true }
  )

  return (
    <section>
      <SEO title={`Tweets liked by ${name as string} (@${username as string}) / Twitter`} />
      {loading ? (
        <Loading className='mt-5' />
      ) : !tweets?.length ? (
        <StatsEmpty
          title={`@${username as string} hasn't liked any Tweets`}
          description='When they do, those Tweets will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {tweets.map(tweet => (
            <Tweet {...tweet} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  )
}

UserLikes.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
)
