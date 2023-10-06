import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { sleep } from '@/lib/utils'
import { Placeholder } from '@/components/common/Placeholder'
import type { LayoutProps } from './CommonLayout'

export function AuthLayout({ children }: LayoutProps) {
  const [pending, setPending] = useState(true)

  const { user, loading } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true)

      if (user) {
        await sleep(500)
        void replace('/home')
      } else if (!loading) {
        await sleep(500)
        setPending(false)
      }
    }

    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  if (loading || pending) return <Placeholder />

  return <>{children}</>
}
