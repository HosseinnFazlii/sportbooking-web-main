// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDescendantProp = (obj: any, desc: string) => desc.split('.').reduce((a, b) => a[b], obj);