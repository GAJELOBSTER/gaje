"use client";

import Image from "next/image";

type AvatarSizeType = "large" | "small" | "tiny";

export interface IAvatarProps {
  /** 이미지 링크 */
  image: string;
  /** 칩 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: AvatarSizeType;
}

export default function Avatar({ size = "small", ...props }: IAvatarProps) {
  const avatarSize: Record<AvatarSizeType, number> = {
    large: 40,
    small: 24,
    tiny: 20,
  };

  return (
    <Image
      className="rounded-[100%] border-1 border-border-enabled"
      src={props.image}
      width={avatarSize[size]}
      height={avatarSize[size]}
      alt={""}
    />
  );
}
