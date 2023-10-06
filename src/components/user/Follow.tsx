import { query, where } from 'firebase/firestore';
import { useUser } from '@/context/UserContext';
import { useCollection } from '@/hooks/useCollection';
import { usersCollection } from '@/lib/firebase/collections';
import { SEO } from "@/components/common/Seo";
import { UserCards } from "@/components/user/Cards";
import type { User } from '@/lib/types/user';

type UserFollowProps = {
  type: 'following' | 'followers';
};

export function UserFollow({ type }: UserFollowProps) {
  const { user } = useUser();
  const { name, username } = user as User;

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(
        type === 'following' ? 'followers' : 'following',
        'array-contains',
        user?.id
      )
    ),
    { allowNull: true }
  );

  return (
    <>
      <SEO
        title={`People ${
          type === 'following' ? 'followed by' : 'following'
        } ${name} (@${username}) / Twitter`}
      />
      <UserCards follow data={data} type={type} loading={loading} />
    </>
  );
}
