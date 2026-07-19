import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { baseURL, routes } from "@/resources";
import { getDictionary } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { home } = getDictionary(params.locale);
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: `/${params.locale}${home.path}`,
    image: home.image,
  });
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { home, about, person } = getDictionary(params.locale);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      {routes["/blog"] && (
        <RevealFx translateY="16" delay={0.6}>
          <Column fillWidth gap="32" marginBottom="l" horizontal="center" align="center">
            <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
              {params.locale === "en" ? "Latest Posts from Blog" : "Blog'dan Son Yazılar"}
            </Heading>
            <Column maxWidth="s" fillWidth paddingX="20" horizontal="center">
              <Posts range={[1, 2]} columns="1" />
            </Column>
          </Column>
        </RevealFx>
      )}
      <RevealFx translateY="16" delay={0.8}>
        <Projects />
      </RevealFx>

      <Mailchimp />
    </Column>
  );
}
