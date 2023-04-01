import { MONDAY, logic } from "./logic";

test("Simple challenge is scored as level 1", () => {
  const args = {
    id: "qwfp-0099",
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
    id: "456-arst",
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

test("Hard challenge is scored as level 3", () => {
  const args = {
    id: "123-abc",
    name: "Hard challenge",
    content: `Lorem ipsum dolor sit amet;
    consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut;`,
    todayWeekday: MONDAY + 2,
  };

  const result = logic(args);

  expect(result).toEqual({
    id: args.id,
    name: args.name,
    content: args.content,
    level: 3,
  });
});
