import Link from 'next/link'
import { motion } from 'framer-motion'
import { doc, limit, query, orderBy, documentId, where } from 'firebase/firestore'
import { useCollection } from '@/hooks/useCollection'
import { useDocument } from '@/hooks/useDocument'
import { usersCollection } from '@/lib/firebase/collections'
import { UserCard } from '@/components/user/Card'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { variants } from './AsideTrends'
import { useAuth } from '@/context/AuthContext'

export function Suggestions() {
  const { data: adminData, loading: adminLoading } = useDocument(doc(usersCollection, 'Twt0A27bx9YcG4vu3RTsR7ifJzf2'))

  const { user } = useAuth()

  const { data: suggestionsData, loading: suggestionsLoading } = useCollection(
    query(usersCollection, where(documentId(), '!=', user?.id), orderBy(documentId()), limit(2))
  )

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      {adminLoading || suggestionsLoading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {adminData && <UserCard {...adminData} />}
          {suggestionsData?.length === 0 ? (
            <>
              <Error message="You've followed everyone" />
            </>
          ) : (
            <>
              {suggestionsData?.map(userData => (
                <UserCard {...userData} key={userData.id} />
              ))}
              <Link
                href='/people'
                className='custom-button accent-tab hover-card block w-full rounded-2xl
                       rounded-t-none text-center text-main-accent'
              >
                Show more
              </Link>
            </>
          )}
        </motion.div>
      )}
    </section>
  )
}
