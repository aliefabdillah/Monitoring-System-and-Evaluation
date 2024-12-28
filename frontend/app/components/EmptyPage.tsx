import Image from "next/image";
import React from "react";

export default function EmptyPage({
  item,
  image,
  size,
}: {
  item: string;
  image: string;
  size: number;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image src={image} alt="404" width={size} height={size} unoptimized priority/>
      <p className="text-center font-poppins text-2xl font-semibold">
        {item} Not Found!
      </p>
    </div>
  );
}
