import { it, expect, vi } from "vitest";
import troy from "../index";

let shouldThrow: boolean;
async function mayThrow(x: number) {
  if(shouldThrow) throw "uh oh";
  return x;
}

it("catches errors", async () => {
  shouldThrow = true;
  const val = await troy.wrap(mayThrow, 5);
  expect(val).toBeInstanceOf(Error);
});

it("returns values when no error is thrown", async () => {
  shouldThrow = false;
  const val = await troy.wrap(mayThrow, 5);
  expect(val).toBe(5);
});

it("successfully guards types when errors are thrown", async () => {
  shouldThrow = true;
  const val = await troy.wrap(mayThrow, 5);
  const fn = vi.fn();
  if(troy.caught(val)) fn(val.message);
  expect(fn).toHaveBeenCalledWith("uh oh");
});

it("successfully guards types when no error is thrown", async () => {
  shouldThrow = false;
  const val = await troy.wrap(mayThrow, 5);
  const fn = vi.fn();
  if(!troy.caught(val)) fn(val.valueOf());
  expect(fn).toHaveBeenCalledWith(5);
});
