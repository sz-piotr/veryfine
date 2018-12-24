import { fail } from '../fail';

export function validateSatisfy(
  value: any,
  negated: boolean,
  fn: (value: any) => any,
) {
  const name = (fn as any).name || 'toSatisfy';

  let result: any;
  try {
    result = fn(value);
  } catch (e) {
    if (!negated) {
      throw e;
    }
    return;
  }

  if (result && typeof result.then === 'function') {
    return result.then(
      (success: any) => processResult(success, negated, name),
      (error: any) => {
        if (!negated) {
          throw error;
        }
      },
    );
  }
  processResult(result, negated, name);
}

function processResult(result: any, negated: boolean, name: string) {
  if (result !== true && !negated) {
    fail(`${name} check failed`);
  } else if (result === true && negated) {
    fail(`${name} check succeded, but was expected to fail`);
  }
}
