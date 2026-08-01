"use client";

import React from "react";
import { motion } from "framer-motion";



import { GithubPRCard } from "./GithubPRCard";

export const AnimatedPRList = () => {
  const prs = [
    { 
      repo: "sceptejas/Stray-SDK", prNumber: 20, 
      title: "feat: add support for dynamic routing", 
      comments: 5, reviews: 2, files: 4, additions: 120, deletions: 15, 
      author: "efekrbas", date: "Jul 10, 2026", avatarUrl: "/images/efe.jpg", commits: 3, 
      languageColor: "#3178c6", projectName: "Stray-SDK", href: "https://github.com/sceptejas/Stray-SDK/pull/20" 
    },
    { 
      repo: "rajdeep-singha/StellarPay", prNumber: 44, 
      title: "fix(security): prevent unauthorized access to payment routes", 
      comments: 12, reviews: 0, files: 13, additions: 549, deletions: 3, 
      author: "efekrbas", date: "Jul 12, 2026", avatarUrl: "/images/efe.jpg", commits: 2, 
      languageColor: "#f1e05a", projectName: "StellarPay", href: "https://github.com/rajdeep-singha/StellarPay/pull/44" 
    },
    { 
      repo: "RudranshG07/stello_finance", prNumber: 13, 
      title: "docs: update API documentation for v2", 
      comments: 2, reviews: 1, files: 2, additions: 45, deletions: 10, 
      author: "efekrbas", date: "Jul 14, 2026", avatarUrl: "/images/efe.jpg", commits: 1, 
      languageColor: "#e34c26", projectName: "Stello Finance", href: "https://github.com/RudranshG07/stello_finance/pull/13" 
    },
    { 
      repo: "mericcintosun/riskon", prNumber: 43, 
      title: "feat: implement risk assessment algorithms", 
      comments: 8, reviews: 3, files: 7, additions: 320, deletions: 40, 
      author: "efekrbas", date: "Jul 16, 2026", avatarUrl: "/images/efe.jpg", commits: 5, 
      languageColor: "#3572A5", projectName: "RiskOn", href: "https://github.com/mericcintosun/riskon/pull/43" 
    },
    { 
      repo: "orbitkit-fun/stellar-agent-kit", prNumber: 51, 
      title: "refactor: optimize agent communication protocol", 
      comments: 15, reviews: 4, files: 10, additions: 210, deletions: 350, 
      author: "efekrbas", date: "Jul 18, 2026", avatarUrl: "/images/efe.jpg", commits: 4, 
      languageColor: "#3178c6", projectName: "Stellar Agent Kit", href: "https://github.com/orbitkit-fun/stellar-agent-kit/pull/51" 
    },
    { 
      repo: "gallipolixyz/gallipolixyz.github.io", prNumber: 89, 
      title: "chore: update dependencies and fix vulnerabilities", 
      comments: 1, reviews: 1, files: 3, additions: 15, deletions: 15, 
      author: "efekrbas", date: "Jul 20, 2026", avatarUrl: "/images/efe.jpg", commits: 1, 
      languageColor: "#f1e05a", projectName: "Gallipoli XYZ", href: "https://github.com/gallipolixyz/gallipolixyz.github.io/pull/89" 
    },
    { 
      repo: "gallipolixyz/gallipolixyz.github.io", prNumber: 93, 
      title: "style: improve responsive layout for mobile", 
      comments: 3, reviews: 2, files: 5, additions: 85, deletions: 20, 
      author: "efekrbas", date: "Jul 22, 2026", avatarUrl: "/images/efe.jpg", commits: 2, 
      languageColor: "#563d7c", projectName: "Gallipoli XYZ", href: "https://github.com/gallipolixyz/gallipolixyz.github.io/pull/93" 
    },
  ];

  // Duplicate the array to create a seamless infinite loop
  const duplicatedPrs = [...prs, ...prs, ...prs, ...prs];

  return (
    <div 
      style={{ 
        overflow: "hidden", 
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        padding: "40px 0",
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)"
      }}
    >
      <motion.div 
        animate={{ x: ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        style={{ 
          display: "flex", 
          gap: "24px", 
          width: "max-content",
          perspective: "1000px" 
        }}
      >
        {duplicatedPrs.map((pr, idx) => (
          <GithubPRCard key={idx} {...pr} />
        ))}
      </motion.div>
    </div>
  );
};
