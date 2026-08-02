import { Column, Heading, Meta, Schema, Button, Row } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources";
import { Projects } from "@/components/work/Projects";

export function generateMetadata() {
  const { work } = getDictionary();
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const { work, person, about } = getDictionary();
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
      <Row horizontal="center" marginTop="m">
        <Button href="https://github.com/efekrbas?tab=repositories" target="_blank" variant="secondary" prefixIcon="github" arrowIcon size="m">
          Check out my other GitHub projects
        </Button>
      </Row>
    </Column>
  );
}
