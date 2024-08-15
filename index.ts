class TroyError extends Error {
  constructor(readonly originalError: unknown = 'unknown error') {
    // @ts-ignore
    super(`${originalError}`, { cause: originalError });
    this.name = this.constructor.name;
  }
}

type TrapFn = <Args, RetVal>(cb: (...args: Args[]) => RetVal, ...args: Args[]) => RetVal | Error;
type AsyncTrapFn = <Args, RetVal>(cb: (...args: Args[]) => Promise<RetVal>, ...args: Args[]) => Promise<RetVal | Error>;
type CaughtFn = <T>(val: T | Error) => val is Error;
type TrapUtil = {
  wrap: AsyncTrapFn,
  caught: CaughtFn,
}
type Export = TrapFn & TrapUtil;

const trap: TrapFn = (cb, ...args) => {
  try {
    return cb(...args);
  } catch(e) {
    if(e instanceof Error) return e;
    return new TroyError(e);
  }
};

const wrap: AsyncTrapFn = async (cb, ...args) => {
  try {
    return await cb(...args);
  } catch(e) {
    if(e instanceof Error) return e;
    return new TroyError(e);
  }
};

function caught<T>(val: T | Error): val is Error {
  if(val instanceof Error) return true;
  return false;
}

const utils: TrapUtil = { caught, wrap };

export default Object.assign(trap, utils) satisfies Export;
