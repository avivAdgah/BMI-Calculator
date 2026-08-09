export const WEIGHT_LIMITS = { min: 1, max: 200 };
export const HEIGHT_LIMITS = { min: 50, max: 250 };

export const BMI_CATEGORIES = [
  { key: 'underweight', label: 'תת משקל', color: '#3b82f6', max: 18.5 },
  { key: 'normal', label: 'משקל תקין', color: '#22c55e', max: 25 },
  { key: 'overweight', label: 'עודף משקל', color: '#f59e0b', max: 30 },
  { key: 'obese', label: 'השמנה', color: '#ef4444', max: Infinity },
];

export function calculateBmi(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

export function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find((category) => bmi < category.max) ?? BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
