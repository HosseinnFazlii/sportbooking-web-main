
export const getBase64FromFile = (file: File): Promise<string | ArrayBuffer | undefined> => {
    const reader = new FileReader();
    return new Promise(resolve => {
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            resolve(ev.target ? (ev.target.result || undefined) : undefined);
        }
        reader.readAsDataURL(file);
    })
};

export const getBase64FromBuffer = (buffer: Buffer): string => {
    return buffer.toString('base64');
};