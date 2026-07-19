import { Column, Heading, Button, Flex } from "@once-ui-system/core";

export default async function OpenSource(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale || "tr";
  
  const title = locale === "tr" ? "Açık Kaynak Katkılarım" : "Open Source Contributions";
  const description = locale === "tr" 
    ? "Açık kaynak projelere yaptığım katkılar ve Pull Request'lerim." 
    : "My contributions and Pull Requests to open source projects.";

  return (
    <Column maxWidth="m" paddingTop="24" fillWidth gap="xl">
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {title}
      </Heading>
      
      <Column gap="16" horizontal="center">
        <Button href="https://github.com/sceptejas/Stray-SDK/pull/20" variant="secondary" prefixIcon="github" size="m" style={{ width: "320px", justifyContent: "flex-start" }}>
          Stray-SDK (PR #20)
        </Button>
        <Button href="https://github.com/rajdeep-singha/StellarPay/pull/44" variant="secondary" prefixIcon="github" size="m" style={{ width: "320px", justifyContent: "flex-start" }}>
          StellarPay (PR #44)
        </Button>
        <Button href="https://github.com/RudranshG07/stello_finance/pull/13" variant="secondary" prefixIcon="github" size="m" style={{ width: "320px", justifyContent: "flex-start" }}>
          stello_finance (PR #13)
        </Button>
        <Button href="https://github.com/mericcintosun/riskon/pull/43" variant="secondary" prefixIcon="github" size="m" style={{ width: "320px", justifyContent: "flex-start" }}>
          riskon (PR #43)
        </Button>
        <Button href="https://github.com/orbitkit-fun/stellar-agent-kit/pull/51" variant="secondary" prefixIcon="github" size="m" style={{ width: "320px", justifyContent: "flex-start" }}>
          stellar-agent-kit (PR #51)
        </Button>
      </Column>
    </Column>
  );
}
