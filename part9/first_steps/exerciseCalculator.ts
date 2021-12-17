interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = parseFloat(args[2]);
  const dailyExerciseHours = args
    .slice(3, args.length)
    .map((a) => parseFloat(a));

  if (!isNaN(target) && !dailyExerciseHours.some(isNaN)) {
    return { target, dailyExerciseHours };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  target: number,
  dailyExerciseHours: Array<number>
) => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target ? true : false;
  let rating, ratingDescription;
  if (average < target) {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  } else if (average === target) {
    rating = 2;
    ratingDescription = "ok";
  } else {
    rating = 3;
    ratingDescription = "good";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
