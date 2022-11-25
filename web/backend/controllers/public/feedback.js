export default function applyPublicFeedbackEndpoints(app) {
  app.post('/api/feedback', async (req, res) => {
    try {
      const body = req.body;

      console.log('==body==', body);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  });
}
