interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

export const parseBmiArguments = (
  heightInCm: number,
  weightInKg: number
): BmiValues => {
  if (!isNaN(heightInCm) && !isNaN(weightInKg)) {
    return { heightInCm: heightInCm, weightInKg: weightInKg };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (
  heightInCm: number,
  weightInKg: number
): string => {
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
