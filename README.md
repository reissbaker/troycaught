# `troy / caught`

`try/catch` for the Golang fan.

## WHAT

```typescript
import troy from "troycaught";

function mightThrow(a: string, b: string): number {
  // ...
}

// val's type is now number | Error
const val = troy(mightThrow, "hello", "world");

if(troy.caught(val)) {
  // val's type is narrowed to Error
} else {
  // val's type is narrowed to number
}
```

## ASYNC

```typescript
import troy from "troycaught";

async function eventuallyMightThrow(a: string, b: string): number {
  // ...
}

// val's type is now number | Error
const val = await troy.wrap(eventuallyMightThrow, "hello", "world");

if(troy.caught(val)) {
  // val's type is narrowed to Error
} else {
  // val's type is narrowed to number
}
```

## INLINE

```typescript
// val's type is string | Error
const val = troy(() => {
  // ...stuff that might throw
  return "ok";
});
```

```typescript
// val's type is string | Error
const val = await troy.wrap(async () => {
  // ...stuff that might throw
  return "ok";
});
```

## VERY EXPLICIT ALIASES

```typescript
troy.sync  // equivalent to troy(...)
troy.async // equivalent to troy.wrap(...)
```
