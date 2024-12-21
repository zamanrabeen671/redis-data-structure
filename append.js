app.get('/log-event', async (req, res) => {
    try {
      const event = 'User clicked button';
      await client.append('user:123:log', ` ${event}`);
      res.send('Event logged successfully.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error logging event.');
    }
});
  
app.post('/chat/:roomId', async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const message = `User1: ${req.body.message}`;
      await client.append(`chat:room:${roomId}`, ` ${message}`);
      res.send('Message added to chat room.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error appending message to chat room.');
    }
  });
  
  //chat:room:roomId. This builds the chat transcript.
  app.get('/log-error', async (req, res) => {
    try {
      const errorMessage = 'Error 500: Internal Server Error';
      await client.append('error:log', ` ${errorMessage}`);
      res.send('Error logged successfully.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error logging error.');
    }
  });
  

  app.get('/analytics', async (req, res) => {
    try {
      const pageView = 'Page view: 1';
      await client.append('analytics:realtime', ` ${pageView}`);
      res.send('Page view recorded.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error appending analytics data.');
    }
  });

  app.post('/audit/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const action = `Logged in at ${new Date().toISOString()}`;
      await client.append(`audit:user:${userId}`, ` ${action}`);
      res.send('Action logged for audit trail.');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error logging audit action.');
    }
  });
  

