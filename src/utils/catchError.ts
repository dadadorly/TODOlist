export async function catchAsyncError(fn: Function) {
  try {
    await fn();
  } catch (er: any) {
    return er;
  }
}
