import Link from 'next/link';
import cn from 'clsx';
import { NextImage } from "@/components/ui/NextImage";

type UserAvatarProps = {
  src: string;
  alt: string;
  size?: number;
  username?: string;
  className?: string;
};

export function UserAvatar({
  src,
  alt,
  size,
  username,
  className
}: UserAvatarProps) {
  const pictureSize = size ?? 48;

  return (
    <Link href={username ? `/user/${username}` : '#'} legacyBehavior>
      <div
        className={cn(
          'blur-picture flex self-start',
          !username && 'pointer-events-none',
          className
        )}
        tabIndex={username ? 0 : -1}
      >
        <NextImage
          useSkeleton
          imgClassName='rounded-full'
          width={pictureSize}
          height={pictureSize}
          src={src}
          alt={alt}
          key={src}
        />
      </div>
    </Link>
  );
}
