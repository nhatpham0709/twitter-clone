import { Input } from '@/components/input/Input'
import { Tweet } from '@/components/tweet/Tweet'
import type { TweetProps } from '@/components/tweet/Tweet'

type TweetReplyModalProps = {
  tweet: TweetProps
  closeModal: () => void
}

export function TweetReplyModal({ tweet, closeModal }: TweetReplyModalProps) {
  return (
    <Input modal replyModal parent={{ id: tweet.id, username: tweet.user.username }} closeModal={closeModal}>
      <Tweet modal parentTweet {...tweet} />
    </Input>
  )
}
