/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';


const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res)=> {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try {
    const bmi = bmiCalculator(height,weight);

    res.json({weight, height, bmi});
    } catch (_) {
        res.json({'error': 'malformatted parameters'});
    }
});

app.post('/exercises', (req,res)=> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const body = req.body;

    console.log('body is: ',body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    if (!target || !daily_exercises){
        return res.json( {error: 'parameters missing'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
    if (isNaN(Number(target)) || daily_exercises.every((n: any)=>isNaN(Number(n)))){
        return res.json({ error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const result = exerciseCalculator(daily_exercises,target);
    return res.send(result);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});