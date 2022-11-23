import { Fragment } from 'react';
import { Card, TextContainer, EmptyState } from '@shopify/polaris';
import { useAppQuery } from '../../hooks';

const feedback = [];

export function FeedbackList() {
  const { data, isLoading } = useAppQuery({
    url: '/api/products/count',
  });

  return (
    <Fragment>
      {!isLoading && !feedback.length && (
        <Card sectioned>
          <EmptyState
            heading="No feedback submiited yet."
            secondaryAction={{
              content: 'Learn more',
              url: '/howto',
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <TextContainer spacing="loose">
              <p>
                Add the feedback block to your pages to start collecting
                feedback from customers.
              </p>
            </TextContainer>
          </EmptyState>
        </Card>
      )}
    </Fragment>
  );
}
