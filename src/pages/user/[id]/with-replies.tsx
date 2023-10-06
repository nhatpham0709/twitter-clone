import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@/hooks/useCollection';
import { useDocument } from '@/hooks/useDocument';
import { tweetsCollection } from '@/lib/firebase/collections';
import { useUser } from '@/context/UserContext';
import { UserLayout, ProtectedLayout } from '@/components/layout/CommonLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from "@/components/common/Seo";
import { UserDataLayout } from '@/components/layout/UserDataLayout';
import { UserHomeLayout } from '@/components/layout/UserHomeLayout';
import { Tweet } from "@/components/tweet/Tweet";
import { Loading } from "@/components/ui/Loading";
import { StatsEmpty } from "@/components/tweet/StatsEmpty";
import { TweetWithParent } from "@/components/tweet/TweetWithParent";
import type { ReactElement, ReactNode } from 'react';

export default function UserWithReplies() {
  const { user } = useUser();

  const { id, name, username, pinnedTweet } = user ?? {};

  const { data: pinnedData } = useDocument(
    doc(tweetsCollection, pinnedTweet ?? 'null'),
    {
      disabled: !pinnedTweet,
      allowNull: true,
      includeUser: true
    }
  );

  const { data, loading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  return (
    <section>
      <SEO
        title={`Tweets with replies by ${name as string} (@${
          username as string
        }) / Twitter`}
      />
      {loading ? (
        <Loading className='mt-5' />
      ) : !data ? (
        <StatsEmpty
          title={`@${username as string} hasn't tweeted`}
          description='When they do, their Tweets will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {pinnedData && (
            <Tweet pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          <TweetWithParent data={data} />
        </AnimatePresence>
      )}
    </section>
  );
}

UserWithReplies.getLayout = (page: ReactElement): ReactNode => (
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
