"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton, Column, Text, Button, IconButton } from "@once-ui-system/core";
import { routes, display } from "@/resources/once-ui.config";

import { useParams } from "next/navigation";
import { getDictionary } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
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

  const handleMobileNav = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
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
          {display.location && <Row s={{ hide: true }}>{person.name}</Row>}
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
                <ToggleButton prefixIcon="home" href={`/${locale}`} selected={pathname === `/${locale}` || pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={`/${locale}/about`}
                      label={about.label}
                      selected={pathname.includes("/about")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href={`/${locale}/about`}
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
                      href={`/${locale}/work`}
                      label={work.label}
                      selected={pathname.includes("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="code"
                      href={`/${locale}/work`}
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
                      href={`/${locale}/opensource`}
                      label={locale === "tr" ? "Açık Kaynak" : "Open Source"}
                      selected={pathname.includes("/opensource")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="github"
                      href={`/${locale}/opensource`}
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
                      href={`/${locale}/blog`}
                      label={blog.label}
                      selected={pathname.includes("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href={`/${locale}/blog`}
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
                      href={`/${locale}/gallery`}
                      label={gallery.label}
                      selected={pathname.includes("/gallery")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="gallery"
                      href={`/${locale}/gallery`}
                      selected={pathname.includes("/gallery")}
                    />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <Row gap="2" vertical="center">
                <ToggleButton
                  href={pathname.replace(new RegExp(`^/${locale}`), '/tr') || '/tr'}
                  label="TR"
                  selected={locale === "tr"}
                />
                <ToggleButton
                  href={pathname.replace(new RegExp(`^/${locale}`), '/en') || '/en'}
                  label="EN"
                  selected={locale === "en"}
                />
              </Row>
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
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
        paddingX="24"
        paddingY="16"
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
        <Text variant="heading-strong-m" onBackground="neutral-strong">
          {person.name}
        </Text>
        <AnimatedHamburger isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
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
              backgroundColor: "rgba(10, 15, 25, 0.95)",
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
                  <Button href={`/${locale}`} prefixIcon="home" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}`)}>
                    {locale === "en" ? "Home" : "Ana Sayfa"}
                  </Button>
                </motion.div>
              )}
              {routes["/about"] && (
                <motion.div variants={itemVariants}>
                  <Button href={`/${locale}/about`} prefixIcon="person" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}/about`)}>
                    {about.label}
                  </Button>
                </motion.div>
              )}
              {routes["/work"] && (
                <motion.div variants={itemVariants}>
                  <Button href={`/${locale}/work`} prefixIcon="code" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}/work`)}>
                    {work.label}
                  </Button>
                </motion.div>
              )}
              {routes["/opensource"] && (
                <motion.div variants={itemVariants}>
                  <Button href={`/${locale}/opensource`} prefixIcon="github" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}/opensource`)}>
                    {locale === "tr" ? "Açık Kaynak" : "Open Source"}
                  </Button>
                </motion.div>
              )}
              {routes["/blog"] && (
                <motion.div variants={itemVariants}>
                  <Button href={`/${locale}/blog`} prefixIcon="book" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}/blog`)}>
                    {blog.label}
                  </Button>
                </motion.div>
              )}
              {routes["/gallery"] && (
                <motion.div variants={itemVariants}>
                  <Button href={`/${locale}/gallery`} prefixIcon="gallery" variant="tertiary" size="l" onClick={(e: any) => handleMobileNav(e, `/${locale}/gallery`)}>
                    {gallery.label}
                  </Button>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ position: "absolute", bottom: "40px", zIndex: 10000 }}
            >
              <Row
                background="page"
                border="neutral-alpha-weak"
                radius="m-4"
                padding="4"
                gap="4"
                vertical="center"
              >
                <ToggleButton
                  href={pathname.replace(new RegExp(`^/${locale}`), '/tr') || '/tr'}
                  label="TR"
                  selected={locale === "tr"}
                />
                <ToggleButton
                  href={pathname.replace(new RegExp(`^/${locale}`), '/en') || '/en'}
                  label="EN"
                  selected={locale === "en"}
                />
                {display.themeSwitcher && (
                  <>
                    <Line background="neutral-alpha-medium" vert maxHeight="24" />
                    <ThemeToggle />
                  </>
                )}
              </Row>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
