import cors from 'cors';
import express from 'express';
import { createUsersTable } from './migrations/createUsersTable';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, async () => {
  await createUsersTable();
});
