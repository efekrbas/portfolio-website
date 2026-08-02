import { Column, Meta, Schema, Heading } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL } from "@/resources";
import { getDictionary } from "@/resources";

export function generateMetadata() {
  const { gallery } = getDictionary();
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  const { gallery, person } = getDictionary();
  return (
    <Column maxWidth="m" fillWidth>
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
      <Heading marginBottom="m" variant="heading-strong-xl" align="center">
        {gallery.title}
      </Heading>
      <GalleryView />
    </Column>
  );
}
