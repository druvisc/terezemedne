export const randomInt = (min: number, max: number) => {
  const num = Math.random() * (max - min) + min;

  return Math.round(num);
};
