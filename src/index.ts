import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import appRouter from 'routes';
import { AppDataSource } from 'database/dataSource';
import { errorHandler } from 'middlewares/errorHandler';
import { swaggerDocument } from '../swagger';

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(appRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log(`Database connected successfully. Connection: ${AppDataSource.options}`);
    })
    .catch((err) => console.log(err));
})();
