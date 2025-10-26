'use client;'

// eslint-disable-next-line no-restricted-globals
export const silentChangeURL = (url: string) => history.pushState({}, "Rismun", url);