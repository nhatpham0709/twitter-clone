import { useRouter } from 'next/router';
import {
  TrendsLayout,
  ProtectedLayout
} from '@/components/layout/CommonLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from "@/components/common/Seo";
import { MainHeader } from "@/components/home/MainHeader";
import { MainContainer } from "@/components/home/MainContainer";
import { Button } from "@/components/ui/Button";
import { ToolTip } from "@/components/ui/Tooltip";
import { HeroIcon } from '@/components/ui/HeroIcon';
import type { ReactElement, ReactNode } from 'react';

export default function Bookmarks() {
  const { back } = useRouter();

  return (
    <MainContainer>
      <SEO title='Trends / Twitter' />
      <MainHeader useActionButton title='Trends' action={back}>
        <Button
          className='dark-bg-tab group relative ml-auto cursor-not-allowed p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='Cog8ToothIcon' />
          <ToolTip tip='Settings' />
        </Button>
      </MainHeader>
      {/* <AsideTrends inTrendsPage /> */}
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
