import 'dotenv/config';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { dbCreateConnection } from 'database/dbCreateConnection';

export const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
