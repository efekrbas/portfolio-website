import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { gallery } = getDictionary(params.locale);
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: `/${params.locale}${gallery.path}`,
  });
}

export default async function Gallery(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { gallery, person } = getDictionary(params.locale);
  return (
    <Column maxWidth="m" paddingTop="24" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {gallery.title}
      </Heading>
      <GalleryView />
    </Column>
  );
}
