import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

export async function generateStaticParams() {
  const posts = getPosts(["src", "app", "[locale]", "blog", "posts"]);
  const locales = ['tr', 'en'];
  return locales.flatMap(locale => 
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[]; locale: string }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { blog, person } = getDictionary(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "[locale]", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `/${routeParams.locale}${blog.path}/${post.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[]; locale: string }> }) {
  const routeParams = await params;
  const { blog, person, about } = getDictionary(routeParams.locale);
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const allPosts = getPosts(["src", "app", "[locale]", "blog", "posts"]);
  let post = allPosts.find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={
              post.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href={`/${routeParams.locale}/blog`}>
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false, routeParams.locale)}
            </Text>
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
            {post.metadata.subtitle && (
              <Text 
                variant="body-default-l" 
                onBackground="neutral-weak" 
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>
          
          <ShareSection 
            title={post.metadata.title} 
            url={`${baseURL}/${routeParams.locale}${blog.path}/${post.slug}`} 
          />

          {allPosts.length > 1 && (
            <Column fillWidth gap="40" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
                {routeParams.locale === "tr" ? "Son yazılar" : "Recent posts"}
              </Text>
              <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
            </Column>
          )}
          <ScrollToHash />
        </Column>
      </Row>

    </Row>
  );
}
