import { Database } from '../../database/database.js';

export default function applyPublicFeedbackEndpoints(app) {
  app.post('/api/feedback', async (req, res) => {
    try {
      const body = req.body;
      // validate request body.
      const id = await Database.create(body);
      res.status(200).json({ success: true, id });
    } catch (error) {
      console.error(error);
      res.status(200).json({ success: false });
    }
  });
}
