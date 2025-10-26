export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const sleep = async (ms: number) => {
    await timeout(ms);
    return;
}