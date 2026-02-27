import { AppFactory } from './appFactory.js';

const app = AppFactory.create();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
