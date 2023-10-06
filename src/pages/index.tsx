import { AuthLayout } from "@/components/layout/AuthLayout";
import { SEO } from "@/components/common/Seo";
import { LoginMain } from "@/components/login/LoginMain";
import { LoginFooter } from "@/components/login/LoginFooter";
import type { ReactElement, ReactNode } from 'react';

export default function Login() {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Twitter - It’s what’s happening'
        description='From breaking news and entertainment to sports and politics, get the full story with all the live commentary.'
      />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
