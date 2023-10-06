import Link from 'next/link';
import { UserAvatar } from "@/components/user/Avatar";
import { FollowButton } from "@/components/ui/FollowButton";
import { UserTooltip } from "./Tooltip";
import { UserName } from "./Name";
import { UserFollowing } from "./Following";
import { UserUsername } from "./Username";
import type { User } from '@/lib/types/user';

type UserCardProps = User & {
  modal?: boolean;
  follow?: boolean;
};

export function UserCard(user: UserCardProps) {
  const { id, bio, name, modal, follow, username, verified, photoURL } = user;

  return (
    (<Link
      href={`/user/${username}`}
      className='accent-tab hover-animation grid grid-cols-[auto,1fr] gap-3 px-4
                 py-3 hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'>

      <UserTooltip avatar {...user} modal={modal}>
        <UserAvatar src={photoURL} alt={name} username={username} />
      </UserTooltip>
      <div className='flex flex-col gap-1 truncate xs:overflow-visible'>
        <div className='flex items-center justify-between gap-2 truncate xs:overflow-visible'>
          <div className='flex flex-col justify-center truncate xs:overflow-visible xs:whitespace-normal'>
            <UserTooltip {...user} modal={modal}>
              <UserName
                className='-mb-1'
                name={name}
                username={username}
                verified={verified}
              />
            </UserTooltip>
            <div className='flex items-center gap-1 text-light-secondary dark:text-dark-secondary'>
              <UserTooltip {...user} modal={modal}>
                <UserUsername username={username} />
              </UserTooltip>
              {follow && <UserFollowing userTargetId={id} />}
            </div>
          </div>
          <FollowButton userTargetId={id} userTargetUsername={username} />
        </div>
        {follow && bio && <p className='whitespace-normal'>{bio}</p>}
      </div>

    </Link>)
  );
}