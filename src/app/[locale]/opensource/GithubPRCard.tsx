"use client";

import React from "react";
import { Column, Flex, Row, Text, Avatar, SmartLink } from "@once-ui-system/core";
import { MessageSquare, Eye, FileCode2, GitCommitHorizontal, ExternalLink, GitPullRequest } from "lucide-react";
import { motion } from "framer-motion";

export interface GithubPRCardProps {
  repo: string;
  prNumber: number;
  title: string;
  comments: number;
  reviews: number;
  files: number;
  additions: number;
  deletions: number;
  author: string;
  date: string;
  avatarUrl: string;
  commits: number;
  languageColor: string;
  projectName: string;
  href: string;
}

export const GithubPRCard: React.FC<GithubPRCardProps> = ({
  repo,
  prNumber,
  title,
  comments,
  reviews,
  files,
  additions,
  deletions,
  author,
  date,
  avatarUrl,
  commits,
  languageColor,
  projectName,
  href,
}) => {
  // Generate random green/red blocks to mimic GitHub's diff visualization
  const totalDiff = additions + deletions;
  const blocks = 5;
  const greenBlocks = Math.max(1, Math.round((additions / totalDiff) * blocks));
  const diffSquares = Array.from({ length: blocks }).map((_, i) => (
    <div
      key={i}
      style={{
        width: "6px",
        height: "6px",
        backgroundColor: i < greenBlocks ? "#2ea043" : "#da3633",
        marginRight: "2px",
        display: "inline-block",
        borderRadius: "1px"
      }}
    />
  ));

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <SmartLink href={href} style={{ textDecoration: "none" }}>
        <Column
          background="surface"
          border="neutral-medium"
          radius="l"
          style={{
            width: "380px",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0
          }}
        >
          {/* Main Content Area */}
          <Column padding="24" gap="16" flex={1}>
            <Row horizontal="between" vertical="start">
              <Column gap="4" flex={1}>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {repo}
                </Text>
                <Text variant="heading-strong-m" onBackground="neutral-strong" style={{ lineHeight: "1.3" }}>
                  <span style={{ color: "var(--brand-alpha-strong)" }}>#{prNumber}</span> {title}
                </Text>
              </Column>
              <Avatar src={avatarUrl} size="l" style={{ marginLeft: "16px", flexShrink: 0 }} />
            </Row>

            {/* Stats Row */}
            <Row gap="16" vertical="center" style={{ flexWrap: "wrap", marginTop: "8px" }}>
              <Row gap="4" vertical="center">
                <MessageSquare size={12} color="var(--neutral-alpha-medium)" />
                <Text variant="body-default-xs" onBackground="neutral-weak">{comments} comments</Text>
              </Row>
              <Row gap="4" vertical="center">
                <Eye size={12} color="var(--neutral-alpha-medium)" />
                <Text variant="body-default-xs" onBackground="neutral-weak">{reviews} reviews</Text>
              </Row>
              <Row gap="4" vertical="center">
                <FileCode2 size={12} color="var(--neutral-alpha-medium)" />
                <Text variant="body-default-xs" onBackground="neutral-weak">{files} files</Text>
              </Row>
              <Row gap="8" vertical="center">
                <Text variant="body-default-xs" style={{ color: "#2ea043" }}>+{additions}</Text>
                <Text variant="body-default-xs" style={{ color: "#da3633" }}>-{deletions}</Text>
                <Row>{diffSquares}</Row>
              </Row>
            </Row>

            {/* Author Row */}
            <Row gap="8" vertical="center" marginTop="8">
              <Avatar src={avatarUrl} size="xs" />
              <Text variant="body-default-xs" onBackground="neutral-weak">
                <strong style={{ color: "var(--neutral-on-background)" }}>{author}</strong> • {date} • <GitCommitHorizontal size={10} style={{ display: "inline" }}/> {commits} commits
              </Text>
            </Row>
          </Column>

          {/* Language Color Bar */}
          <div style={{ height: "4px", width: "100%", backgroundColor: languageColor }} />

          {/* Footer Area */}
          <Column paddingX="24" paddingY="16" background="neutral-alpha-weak" borderTop="neutral-medium">
            <Row horizontal="between" vertical="center">
              <Row gap="8" vertical="center">
                <GitPullRequest size={16} color="var(--neutral-on-background)" />
                <Column>
                  <Text variant="body-default-xs" onBackground="neutral-weak">{repo}#{prNumber}</Text>
                  <Text variant="label-strong-s" onBackground="neutral-strong">{projectName}</Text>
                </Column>
              </Row>
              <ExternalLink size={16} color="var(--neutral-alpha-medium)" />
            </Row>
          </Column>
        </Column>
      </SmartLink>
    </motion.div>
  );
};
