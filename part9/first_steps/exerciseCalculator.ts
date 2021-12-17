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

export const parseExerciseArguments = (
  target: number,
  dailyExerciseHours: Array<number>
): ExerciseValues => {
  if (!isNaN(target) && !dailyExerciseHours.some(isNaN)) {
    return { target, dailyExerciseHours };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  target: number,
  dailyExerciseHours: Array<number>
): Result => {
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
