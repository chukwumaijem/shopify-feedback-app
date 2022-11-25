import { Fragment } from 'react';
import { Card, IndexTable, TextStyle } from '@shopify/polaris';

/* A function to truncate long strings */
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '…' : str;
}

export function FeedbackList({ feedback }) {
  const resourceName = {
    singular: 'Feedback',
    plural: 'Feedback',
  };
  return (
    <Fragment>
      <Card title="Feedback List" sectioned>
        <IndexTable
          resourceName={resourceName}
          itemCount={feedback.length}
          headings={[
            { title: 'Name' },
            { title: 'Date' },
            { title: 'Feedback' },
          ]}
        >
          {feedback.map((item, index) => (
            <IndexTable.Row id={item.id} key={item.id} position={index}>
              <IndexTable.Cell>
                <p>{item.name}</p>
              </IndexTable.Cell>
              <IndexTable.Cell>{item.date}</IndexTable.Cell>
              <IndexTable.Cell>
                <TextStyle>{truncate(item?.feedback, 25)}</TextStyle>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Fragment>
  );
}
