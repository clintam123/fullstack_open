interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { heightInCm: Number(args[2]), weightInKg: Number(args[3]) };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const heightInMeters = heightInCm / 100;
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi >= 16 && bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi >= 17 && bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi >= 18.5 && bmi < 25:
      return "Normal weight";
    case bmi > 25 && bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi >= 30 && bmi < 35:
      return "Obese (Class I)";
    case bmi >= 35 && bmi < 40:
      return "Obese (Class II)";
    default:
      return "Obese (Class III)";
  }
};

try {
  const { heightInCm, weightInKg } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
