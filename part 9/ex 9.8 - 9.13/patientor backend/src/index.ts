import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';

const app = express();
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(express.json());
app.use(cors());
app.use('/api/diagnoses/',diagnosesRouter);
app.use('/api/patients/',patientRouter);
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});