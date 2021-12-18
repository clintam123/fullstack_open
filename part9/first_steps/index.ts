import express from "express";
import { parseBmiArguments, calculateBmi } from "./bmiCalculator";
import {
  parseExerciseArguments,
  calculateExercises,
} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    res.status(400);
    res.json({
      error: "parameters missing",
    });
  } else {
    try {
      const { heightInCm, weightInKg } = parseBmiArguments(
        Number(height),
        Number(weight)
      );
      res.json({
        weight: weightInKg,
        height: heightInCm,
        bmi: calculateBmi(heightInCm, weightInKg),
      });
    } catch (err) {
      res.status(400);
      res.json({ error: "malformatted parameters" });
    }
  }
});

interface RequestBody {
  target: number;
  daily_exercises: Array<number>;
}

app.post("/exercises", (req, res) => {
  const body = req.body as RequestBody;
  const req_target = body.target,
    daily_exercises = body.daily_exercises;
  if (!req_target || !daily_exercises) {
    res.status(400);
    res.json({ error: "parameters missing" });
  } else {
    try {
      const { target, dailyExerciseHours } = parseExerciseArguments(
        req_target,
        daily_exercises
      );
      res.json(calculateExercises(target, dailyExerciseHours));
    } catch (err) {
      res.status(400);
      res.json({ error: "malformatted parameters" });
    }
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
