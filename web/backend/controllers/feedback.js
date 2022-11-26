import { getShopUrlFromSession } from '../../helpers/getShopUrl.js';
import { Database } from '../database/database.js';

const dummyResponse = [
  {
    id: 1,
    name: 'John Doe',
    date: new Date(Date.now() + 60 * 100).toDateString(),
    feedback:
      'Can you add a product review feature so users can add reviews product. Also can you make it heart shape instead of star?',
  },
  {
    id: 2,
    name: 'Jane Joe',
    date: new Date(Date.now() + 80 * 100).toDateString(),
    feedback:
      'I will like to be able to add comment on a product or see what other people who purchased it before think.',
  },
];

export default function applyFeedbackEndpoints(app) {
  app.get('/api/feedback', async (req, res) => {
    try {
      const shopDomain = await getShopUrlFromSession(req, res);
      const resp = await Database.list(shopDomain);
      res.status(200).json(resp);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
}
