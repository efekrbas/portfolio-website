"use client";

import { Media, Row, Flex } from "@once-ui-system/core";
import { useParams } from "next/navigation";
import { getDictionary } from "@/resources";

export default function GalleryView() {
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const { gallery } = getDictionary(locale);

  return (
    <Row gap="16" fillWidth>
      {gallery.images.map((image, index) => (
        <Flex flex={1} key={index}>
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
          />
        </Flex>
      ))}
    </Row>
  );
}
