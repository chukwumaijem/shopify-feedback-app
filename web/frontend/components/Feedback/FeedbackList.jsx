import { Fragment } from 'react';
import { Card, DataTable } from '@shopify/polaris';

export function FeedbackList({ feedback }) {
  const rows = feedback.map((item) => {
    delete item.id;
    return Object.values(item);
  });

  return (
    <Fragment>
      <Card title="Feedback List" sectioned>
        <DataTable
          columnContentTypes={['text', 'text', 'text']}
          headings={['Name', 'Date', 'Feedback']}
          rows={rows}
        />
      </Card>
    </Fragment>
  );
}
