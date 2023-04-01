export const MONDAY = 1;

export const logic = (args: {
  id: string;
  name: string;
  content: string;
  todayWeekday: number;
}) => {
  const { id, name, content, todayWeekday } = args;

  let level = 1;

  if (content.length > 100 && content.includes(";")) {
    level = 3;
  } else if (todayWeekday === MONDAY) {
    level = 2;
  }

  return { name, content, id, level };
};
