import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const locales = ["en", "tr"];

  const blogs = getPosts(["src", "app", "[locale]", "blog", "posts"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = getPosts(["src", "app", "[locale]", "work", "projects"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}
