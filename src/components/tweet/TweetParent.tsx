import { useMemo, useEffect } from 'react'
import { doc } from 'firebase/firestore'
import { useDocument } from '@/hooks/useDocument'
import { tweetsCollection } from '@/lib/firebase/collections'
import { getRandomId } from '@/lib/random'
import { Tweet } from './Tweet'
import type { LoadedParents } from './TweetWithParent'

type TweetParentProps = {
  parentId: string
  loadedParents: LoadedParents
  addParentId: (parentId: string, componentId: string) => void
}

export function TweetParent({ parentId, loadedParents, addParentId }: TweetParentProps) {
  const componentId = useMemo(getRandomId, [])

  const isParentAlreadyLoaded = loadedParents.some(child => child.childId === componentId)

  const { data, loading } = useDocument(doc(tweetsCollection, parentId), {
    includeUser: true,
    allowNull: true,
    disabled: isParentAlreadyLoaded
  })

  useEffect(() => {
    addParentId(parentId, componentId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading || !isParentAlreadyLoaded || !data) return null

  return <Tweet parentTweet {...data} />
}
