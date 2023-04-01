import { ValidationError } from "../../../client_error";
import { logic } from "./logic";

test("Missing challenge throws ValidationError", () => {
  expect(() => logic(null)).toThrow(ValidationError);
});

test("Challenge returns itself", () => {
  const data = {
    id: "1",
    name: "Valid challenge",
    content: "Content.",
    level: 1,
  };

  expect(logic(data)).toEqual(data);
});
