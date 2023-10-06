import { useAuth } from '@/context/AuthContext';

type UserFollowingProps = {
  userTargetId: string;
};

export function UserFollowing({ userTargetId }: UserFollowingProps) {
  const { user } = useAuth();

  const isOwner =
    user?.id !== userTargetId && user?.followers.includes(userTargetId);

  if (!isOwner) return null;

  return (
    <p className='rounded bg-main-search-background px-1 text-xs'>
      Follows you
    </p>
  );
}
