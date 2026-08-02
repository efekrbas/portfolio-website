import { Column, Heading, Button, Flex } from "@once-ui-system/core";
import { AnimatedPRList } from "./AnimatedPRList";

export default function OpenSource() {
  const title = "Open Source Contributions";
  const description = "My contributions and Pull Requests to open source projects.";

  return (
    <Column maxWidth="m" paddingTop="24" fillWidth gap="m">
      <Heading variant="heading-strong-xl" align="center">
        {title}
      </Heading>
      
      <AnimatedPRList />
    </Column>
  );
}
