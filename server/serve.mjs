import { createRequestHandler } from '@remix-run/express';
import express from 'express';

import serverBuild from '../build/index.js';

const port = parseInt(process.env.PORT || '3000');
const app = express();

app.disable('x-powered-by');

app.use(
  express.static('public', {
    maxAge: '1h',
  })
);

app.all(
  '*',
  createRequestHandler({
    build: serverBuild,
    mode: 'production',
  })
);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Remix Server is listening on port ${port}`);
});

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.once(signal, () => server.close(console.error));
});
