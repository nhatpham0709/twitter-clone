import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import { Aside } from '@/components/aside/aside';
import { Suggestions } from '@/components/aside/suggestions';
import { Placeholder } from '@/components/common/placeholder';
import type { ReactNode } from 'react';

// import { AsideTrends } from '@/components/aside/aside-trends';


export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps) {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Aside>
        {/* <AsideTrends /> */}
        <Suggestions />
      </Aside>
    </>
  );
}

export function UserLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Aside>
        <Suggestions />
        {/* <AsideTrends /> */}
      </Aside>
    </>
  );
}

export function TrendsLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Aside>
        <Suggestions />
      </Aside>
    </>
  );
}

export function PeopleLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Aside>
        {/* <AsideTrends /> */}
      </Aside>
    </>
  );
}
