"use client";

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

  return (
    <Column fillWidth gap="m" paddingBottom="24">
      {images && images.length > 0 && (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      )}
      <Flex
        fillWidth
        direction="row"
        m={{ direction: "column" }}
        paddingX="s"
        paddingTop="12"
        gap="l"
      >
        <Column flex={3} gap="24">
          {title && (
            <Heading as="h2" id={title.replace(/\s+/g, '-').toLowerCase()} data-exclude-nav wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          )}
        </Column>
        <Column flex={4} gap="24">
          {avatars && avatars.length > 0 && (
            <AvatarGroup avatars={avatars} size="m" />
          )}
          {description && (
            <Text
              wrap="balance"
              variant="body-default-s"
              onBackground="neutral-weak"
            >
              {description}
            </Text>
          )}
          <Flex gap="24" vertical="center">
            {href && (
              <SmartLink
                href={href}
                suffixIcon="chevronRight"
                style={{ margin: "0" }}
              >
                Read case study
              </SmartLink>
            )}
            {link && (
              <SmartLink
                href={link}
                suffixIcon="arrowUpRight"
                style={{ margin: "0" }}
              >
                View project
              </SmartLink>
            )}
          </Flex>
        </Column>
      </Flex>
    </Column>
  );
};
