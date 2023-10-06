import { useRouter } from 'next/router';
import { query, where, limit } from 'firebase/firestore';
import { UserContextProvider } from '@/context/UserContext';
import { useCollection } from '@/hooks/useCollection';
import { usersCollection } from '@/lib/firebase/collections';
import { SEO } from "@/components/common/Seo";
import { MainContainer } from "@/components/home/MainContainer";
import { MainHeader } from "@/components/home/MainHeader";
import { UserHeader } from "@/components/user/Header";
import type { LayoutProps } from './CommonLayout';

export function UserDataLayout({ children }: LayoutProps) {
  const {
    query: { id },
    back
  } = useRouter();

  const { data, loading } = useCollection(
    query(usersCollection, where('username', '==', id), limit(1)),
    { allowNull: true }
  );

  const user = data ? data[0] : null;

  return (
    <UserContextProvider value={{ user, loading }}>
      {!user && !loading && <SEO title='User not found / Twitter' />}
      <MainContainer>
        <MainHeader useActionButton action={back}>
          <UserHeader />
        </MainHeader>
        {children}
      </MainContainer>
    </UserContextProvider>
  );
}
