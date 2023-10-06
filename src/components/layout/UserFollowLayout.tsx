import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Loading } from "@/components/ui/Loading";
import { UserNav } from "@/components/user/Nav";
import { variants } from "@/components/user/Header";
import type { LayoutProps } from './CommonLayout';

export function UserFollowLayout({ children }: LayoutProps) {
  const { user: userData, loading } = useUser();

  return (
    <>
      {!userData ? (
        <motion.section {...variants}>
          {loading ? (
            <Loading className='mt-5 w-full' />
          ) : (
            <div className='w-full p-8 text-center'>
              <p className='text-3xl font-bold'>This account doesn’t exist</p>
              <p className='text-light-secondary dark:text-dark-secondary'>
                Try searching for another.
              </p>
            </div>
          )}
        </motion.section>
      ) : (
        <>
          <UserNav follow />
          {children}
        </>
      )}
    </>
  );
}
