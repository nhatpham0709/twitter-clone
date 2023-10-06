import { doc, query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { useCollection } from '@/hooks/useCollection';
import { useDocument } from '@/hooks/useDocument';
import { tweetsCollection } from '@/lib/firebase/collections';
import { mergeData } from '@/lib/merge';
import { UserLayout, ProtectedLayout } from '@/components/layout/CommonLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { UserDataLayout } from '@/components/layout/UserDataLayout';
import { UserHomeLayout } from '@/components/layout/UserHomeLayout';
import { StatsEmpty } from "@/components/tweet/StatsEmpty";
import { Loading } from "@/components/ui/Loading";
import { Tweet } from "@/components/tweet/Tweet";
import type { ReactElement, ReactNode } from 'react';

export default function UserTweets() {
  const { user } = useUser();

  const { id, username, pinnedTweet } = user ?? {};

  const { data: pinnedData } = useDocument(
    doc(tweetsCollection, pinnedTweet ?? 'null'),
    {
      disabled: !pinnedTweet,
      allowNull: true,
      includeUser: true
    }
  );

  const { data: ownerTweets, loading: ownerLoading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '==', id),
      where('parent', '==', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const { data: peopleTweets, loading: peopleLoading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '!=', id),
      where('userRetweets', 'array-contains', id)
    ),
    { includeUser: true, allowNull: true }
  );

  const mergedTweets = mergeData(true, ownerTweets, peopleTweets);

  return (
    <section>
      {ownerLoading || peopleLoading ? (
        <Loading className='mt-5' />
      ) : !mergedTweets ? (
        <StatsEmpty
          title={`@${username as string} hasn't tweeted`}
          description='When they do, their Tweets will show up here.'
        />
      ) : (
        <AnimatePresence>
          {pinnedData && (
            <Tweet pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          {mergedTweets.map((tweet) => (
            <Tweet {...tweet} profile={user} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserTweets.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
);
