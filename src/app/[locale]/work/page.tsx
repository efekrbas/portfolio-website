import { Column, Heading, Meta, Schema, Button, Row } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { work } = getDictionary(params.locale);
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: `/${params.locale}${work.path}`,
  });
}

export default async function Work(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { work, person, about } = getDictionary(params.locale);
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
        <Button href={`/${params.locale}/opensource`} variant="secondary" prefixIcon="github" arrowIcon size="m">
          {params.locale === 'tr' ? 'Diğer açık kaynak GitHub projelerimi inceleyin' : 'Check out my other open source GitHub projects'}
        </Button>
      </Row>
    </Column>
  );
}
