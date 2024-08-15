import { it, expect, vi } from "vitest";
import troy from "../index";

let shouldThrow: boolean;
function mayThrow(x: number) {
  if(shouldThrow) throw "uh oh";
  return x;
}

it("catches errors", () => {
  shouldThrow = true;
  const val = troy(mayThrow, 5);
  expect(val).toBeInstanceOf(Error);
});

it("returns values when no error is thrown", () => {
  shouldThrow = false;
  const val = troy(mayThrow, 5);
  expect(val).toBe(5);
});

it("successfully guards types when errors are thrown", () => {
  shouldThrow = true;
  const val = troy(mayThrow, 5);
  const fn = vi.fn();
  if(troy.caught(val)) fn(val.message);
  expect(fn).toHaveBeenCalledWith("uh oh");
});

it("successfully guards types when no error is thrown", () => {
  shouldThrow = false;
  const val = troy(mayThrow, 5);
  const fn = vi.fn();
  if(!troy.caught(val)) fn(val.valueOf());
  expect(fn).toHaveBeenCalledWith(5);
});
