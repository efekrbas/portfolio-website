"use client";

import { Card, Column, Media, Row, Avatar, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import { getDictionary } from "@/resources";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const { person } = getDictionary(locale);

  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={"Thumbnail of " + post.metadata.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth horizontal="center">
        <Column paddingY="24" paddingX="l" gap="20" vertical="center" horizontal="center" align="center">
          <Row gap="24" vertical="center" horizontal="center">
            <Row vertical="center" gap="16" horizontal="center">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s" align="center">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
              {formatDate(post.metadata.publishedAt, false, locale)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance" align="center">
            {post.metadata.title}
          </Text>
          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak" align="center">
              {post.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
