import app from './src/server.js';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('MyTasks is running!');
});
