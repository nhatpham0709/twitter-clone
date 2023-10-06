import { motion } from 'framer-motion';
import cn from 'clsx';
import { variants } from "@/components/user/Header";
import { UserNavLink } from "./NavLink";

type UserNavProps = {
  follow?: boolean;
};

const allNavs = [
  [
    { name: 'Tweets', path: '' },
    { name: 'Tweets & replies', path: 'with-replies' },
    { name: 'Media', path: 'media' },
    { name: 'Likes', path: 'likes' }
  ],
  [
    { name: 'Following', path: 'following' },
    { name: 'Followers', path: 'followers' }
  ]
] as const;

export function UserNav({ follow }: UserNavProps) {
  const userNav = allNavs[+!!follow];

  return (
    <motion.nav
      className={cn(
        `hover-animation flex justify-between overflow-y-auto
         border-b border-light-border dark:border-dark-border`,
        follow && 'mb-0.5 mt-1'
      )}
      {...variants}
      exit={undefined}
    >
      {userNav.map(({ name, path }) => (
        <UserNavLink name={name} path={path} key={name} />
      ))}
    </motion.nav>
  );
}
