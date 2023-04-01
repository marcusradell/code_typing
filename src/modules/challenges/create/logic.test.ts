import { MONDAY, logic } from "./logic";

test("Simple challenge is scored as level 1", () => {
  const args = {
    id: "",
    name: "Simple challenge",
    content: "logger.info('Hi!')",
    todayWeekday: MONDAY + 1,
  };

  const result = logic(args);

  expect(result).toEqual({
    id: args.id,
    name: args.name,
    content: args.content,
    level: 1,
  });
});

test("Simple challenge on a Monday is scored as level 2", () => {
  const args = {
    id: "",
    name: "Simple Monday challenge",
    content: "logger.info('Hello!')",
    todayWeekday: MONDAY,
  };

  const result = logic(args);

  expect(result).toEqual({
    id: args.id,
    name: args.name,
    content: args.content,
    level: 2,
  });
});
