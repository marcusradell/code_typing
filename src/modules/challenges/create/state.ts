export const state = (
  name: string,
  content: string,
  today: Date,
  id: string
) => {
  const MONDAY = 1;
  let level = 1;

  if (content.length > 100 && content.includes(";")) {
    level = 3;
  } else if (today.getDay() === MONDAY) {
    level = 2;
  }

  return { name, content, id, level };
};
