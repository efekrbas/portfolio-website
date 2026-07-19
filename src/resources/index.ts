import * as tr from "./content.tr";
import * as en from "./content.en";

export const getDictionary = (locale: string) => {
  return locale === "en" ? en : tr;
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
} from "./once-ui.config";
