import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';

import { FeedbackList } from '../components';

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Feedback Collector" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <FeedbackList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
