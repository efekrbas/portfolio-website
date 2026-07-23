"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Fade, Flex, Line, Row, ToggleButton, Column, Text, Button, IconButton } from "@once-ui-system/core";
import { routes, display } from "@/resources/once-ui.config";

import { useParams } from "next/navigation";
import { getDictionary } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { ChatbotToggle } from "./ChatbotToggle";
import styles from "./Header.module.scss";
import { motion, AnimatePresence, Variants } from "framer-motion";

const AnimatedHamburger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "3rem",
        height: "3rem",
        borderRadius: "var(--radius-m)",
        cursor: "pointer",
        border: "none",
        background: "transparent",
      }}
      aria-label="Toggle menu"
    >
      <div style={{ position: "relative", width: "1.5rem", height: "1.5rem" }}>
        <motion.span
          style={{
            position: "absolute",
            height: "2px",
            width: "1.5rem",
            backgroundColor: "var(--neutral-on-background-strong, #ffffff)",
            borderRadius: "9999px",
            left: "50%",
          }}
          initial={{ x: "-50%", y: "-50%" }}
          animate={{
            top: isOpen ? "50%" : "35%",
            rotate: isOpen ? 45 : 0,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          style={{
            position: "absolute",
            height: "2px",
            width: "1.5rem",
            backgroundColor: "var(--neutral-on-background-strong, #ffffff)",
            borderRadius: "9999px",
            left: "50%",
          }}
          initial={{ x: "-50%", y: "-50%" }}
          animate={{
            top: isOpen ? "50%" : "65%",
            rotate: isOpen ? -45 : 0,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
};

const itemVariants: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const { person, about, blog, work, gallery } = getDictionary(locale);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const resolveHref = (path: string) => {
    if (locale === "en") return `/en${path === "/" ? "" : path}`;
    return path || "/";
  };

  const handleMobileNav = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent ghost clicks during animation and navigation
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 600);

    setIsMobileMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 350);
  };

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        m={{ hide: true }}
        s={{ hide: true }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s" s={{ hide: true }}>
          {display.location && (
            <Row s={{ hide: true }}>
              <Link href={resolveHref("/")} style={{ textDecoration: "none", color: "inherit" }}>
                {person.name}
              </Link>
            </Row>
          )}
        </Row>
        
        {/* Desktop Menu */}
        <Row fillWidth horizontal="center" s={{ hide: true }}>
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href={resolveHref("/")} selected={pathname === `/${locale}` || pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={resolveHref("/about")}
                      label={about.label}
                      selected={pathname.includes("/about")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={resolveHref("/about")}
                      selected={pathname.includes("/about")}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="code"
                      href={resolveHref("/work")}
                      label={work.label}
                      selected={pathname.includes("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="code"
                      href={resolveHref("/work")}
                      selected={pathname.includes("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/opensource"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="github"
                      href={resolveHref("/opensource")}
                      label={locale === "tr" ? "Açık Kaynak" : "Open Source"}
                      selected={pathname.includes("/opensource")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="github"
                      href={resolveHref("/opensource")}
                      selected={pathname.includes("/opensource")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={resolveHref("/blog")}
                      label={blog.label}
                      selected={pathname.includes("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={resolveHref("/blog")}
                      selected={pathname.includes("/blog")}
                    />
                  </Row>
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href={resolveHref("/gallery")}
                      label={gallery.label}
                      selected={pathname.includes("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href={resolveHref("/gallery")}
                      selected={pathname.includes("/gallery")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                  <ChatbotToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>



        <Flex fillWidth horizontal="end" vertical="center" s={{ hide: true }}>
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone="Europe/Istanbul" />}
            </Flex>
          </Flex>
        </Flex>
      </Row>

      {/* Mobile Top Navbar (Fixed Top) */}
      <Row
        as="header"
        fillWidth
        paddingX="16"
        paddingY="12"
        horizontal="between"
        vertical="center"
        hide
        m={{ hide: false }}
        s={{ hide: false }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100000,
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--neutral-alpha-weak)",
        }}
      >
        <Link href={resolveHref("/")} style={{ textDecoration: "none" }}>
          <Text variant="heading-strong-m" onBackground="neutral-strong">
            {person.name}
          </Text>
        </Link>
        <Row gap="12" vertical="center">
          {display.themeSwitcher && <ThemeToggle />}
          <ChatbotToggle />
          <AnimatedHamburger isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </Row>
      </Row>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999,
              backgroundColor: "var(--page-background)",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}
            >
              {routes["/"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="home" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/"))}>
                    {locale === "en" ? "Home" : "Ana Sayfa"}
                  </Button>
                </motion.div>
              )}
              {routes["/about"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="person" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/about"))}>
                    {about.label}
                  </Button>
                </motion.div>
              )}
              {routes["/work"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="code" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/work"))}>
                    {work.label}
                  </Button>
                </motion.div>
              )}
              {routes["/opensource"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="github" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/opensource"))}>
                    {locale === "tr" ? "Açık Kaynak" : "Open Source"}
                  </Button>
                </motion.div>
              )}
              {routes["/blog"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="book" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/blog"))}>
                    {blog.label}
                  </Button>
                </motion.div>
              )}
              {routes["/gallery"] && (
                <motion.div variants={itemVariants}>
                  <Button prefixIcon="gallery" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, resolveHref("/gallery"))}>
                    {gallery.label}
                  </Button>
                </motion.div>
              )}
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
