import { Card, Page, Layout, TextContainer, Heading } from '@shopify/polaris';
import { TitleBar, useNavigate } from '@shopify/app-bridge-react';

export default function HowToPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar
        title="Guide"
        primaryAction={{
          content: 'Home',
          onAction: () => navigate('/'),
        }}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
