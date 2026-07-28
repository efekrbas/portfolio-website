import { Column, Heading, Button, Flex } from "@once-ui-system/core";
import { AnimatedPRList } from "./AnimatedPRList";

export default async function OpenSource(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale || "tr";
  
  const title = locale === "tr" ? "Açık Kaynak Katkılarım" : "Open Source Contributions";
  const description = locale === "tr" 
    ? "Açık kaynak projelere yaptığım katkılar ve Pull Request'lerim." 
    : "My contributions and Pull Requests to open source projects.";

  return (
    <Column maxWidth="m" paddingTop="24" fillWidth gap="m">
      <Heading variant="heading-strong-xl" align="center">
        {title}
      </Heading>
      
      <AnimatedPRList />
    </Column>
  );
}
