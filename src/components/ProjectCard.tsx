"use client";

import { useParams } from "next/navigation";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Button,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const params = useParams();
  const locale = (params?.locale as string) || "tr";

  return (
    <Column fillWidth gap="m" align="center" horizontal="center" paddingBottom="24">
      {images && images.length > 0 && (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      )}
      <Column fillWidth paddingX="s" paddingTop="12" gap="16" horizontal="center" align="center">
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-xl" align="center">
            {title}
          </Heading>
        )}
        {link && (
          <Button
            href={link}
            variant="secondary"
            size="l"
            prefixIcon={link.includes("github.com") ? "github" : undefined}
            suffixIcon="arrowRight"
          >
            {link.includes("github.com") 
              ? (locale === "tr" ? "GitHub'da İncele" : "View on GitHub") 
              : (locale === "tr" ? "Canlı Demoyu İncele" : "View Live Demo")}
          </Button>
        )}
      </Column>
    </Column>
  );
};
