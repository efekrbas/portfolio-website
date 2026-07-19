import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const locales = ["en", "tr"];

  const resolvePath = (locale: string, path: string) => {
    return locale === "en" ? `/en${path === "/" ? "" : path}` : path || "/";
  };

  const blogs = getPosts(["src", "app", "[locale]", "blog", "posts"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}${resolvePath(locale, `/blog/${post.slug}`)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const works = getPosts(["src", "app", "[locale]", "work", "projects"]).flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}${resolvePath(locale, `/work/${post.slug}`)}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseURL}${resolvePath(locale, route)}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...routes, ...blogs, ...works];
}
