import { UserLayout, ProtectedLayout } from '@/components/layout/CommonLayout'
import { MainLayout } from '@/components/layout/MainLayout'
import { UserDataLayout } from '@/components/layout/UserDataLayout'
import { UserFollowLayout } from '@/components/layout/UserFollowLayout'
import { UserFollow } from '@/components/user/Follow'
import type { ReactElement, ReactNode } from 'react'

export default function UserFollowers() {
  return <UserFollow type='followers' />
}

UserFollowers.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserFollowLayout>{page}</UserFollowLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
)
