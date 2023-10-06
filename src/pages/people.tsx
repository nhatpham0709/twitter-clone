import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { where } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { usersCollection } from '@/lib/firebase/collections';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import {
  PeopleLayout,
  ProtectedLayout
} from '@/components/layout/CommonLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/common/Seo';
import { MainHeader } from '@/components/home/MainHeader';
import { MainContainer } from '@/components/home/MainContainer';
import { UserCard } from '@/components/user/Card';
import { Loading } from '@/components/ui/Loading';
import { Error } from '@/components/ui/Error';
import { variants } from '@/components/aside/AsideTrends';
import type { ReactElement, ReactNode } from 'react';

export default function People() {
  const { user } = useAuth();

  const { data, loading, LoadMore } = useInfiniteScroll(
    usersCollection,
    [where('id', '!=', user?.id)],
    { allowNull: true, preserve: true },
    { marginBottom: 500 }
  );

  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO title='People / Twitter' />
      <MainHeader useActionButton title='People' action={back} />
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='No users' />
        ) : (
          <>
            <motion.div className='mt-0.5' {...variants}>
              {data?.map((userData) => (
                <UserCard {...userData} key={userData.id} follow />
              ))}
            </motion.div>
            <LoadMore />
          </>
        )}
      </section>
    </MainContainer>
  );
}

People.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <PeopleLayout>{page}</PeopleLayout>
    </MainLayout>
  </ProtectedLayout>
);
