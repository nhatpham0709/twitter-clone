import { AnimatePresence } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { useCollection } from '@/hooks/useCollection';
import { tweetsCollection } from '@/lib/firebase/collections';
import { useUser } from '@/context/UserContext';
import { mergeData } from '@/lib/merge';
import { UserLayout, ProtectedLayout } from '@/components/layout/CommonLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from "@/components/common/Seo";
import { UserDataLayout } from '@/components/layout/UserDataLayout';
import { UserHomeLayout } from '@/components/layout/UserHomeLayout';
import { Tweet } from "@/components/tweet/Tweet";
import { Loading } from "@/components/ui/Loading";
import { StatsEmpty } from "@/components/tweet/StatsEmpty";
import type { ReactElement, ReactNode } from 'react';

export default function UserMedia() {
  const { user } = useUser();

  const { id, name, username } = user ?? {};

  const { data, loading } = useCollection(
    query(
      tweetsCollection,
      where('createdBy', '==', id),
      where('images', '!=', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const sortedTweets = mergeData(true, data);

  return (
    <section>
      <SEO
        title={`Media Tweets by ${name as string} (@${
          username as string
        }) / Twitter`}
      />
      {loading ? (
        <Loading className='mt-5' />
      ) : !sortedTweets ? (
        <StatsEmpty
          title={`@${username as string} hasn't Tweeted Media`}
          description='Once they do, those Tweets will show up here.'
          imageData={{ src: '/assets/no-media.png', alt: 'No media' }}
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {sortedTweets.map((tweet) => (
            <Tweet {...tweet} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserMedia.getLayout = (page: ReactElement): ReactNode => (
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
