import express from "express";
import { parseBmiArguments, calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    res.status(400);
    res.json({
      error: "malformatted parameters",
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
      res.send(err.message);
    }
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
