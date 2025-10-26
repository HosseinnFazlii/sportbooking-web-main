import { getBase64FromFile } from "./base64-helper";

export const formatFileSize = (size: number) => {
    const kb = 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;
    if (size > gb) {
        return `${(size / gb).toLocaleString('en-US', { maximumFractionDigits: 2 })}gb`;
    }
    if (size > mb) {
        return `${(size / mb).toLocaleString('en-US', { maximumFractionDigits: 2 })}mb`;
    }
    if (size > kb) {
        return `${(size / kb).toLocaleString('en-US', { maximumFractionDigits: 2 })}kb`;
    }
    return `${size.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

export const imageExts = [".jpg", ".jpeg", ".tif", ".tiff", ".gif", ".png", ".svg", ".apng", ".avif", ".webp"];

export const createThumbURL = async (file: File, ext: string) => imageExts.includes(ext) ? await getBase64FromFile(file) : undefined;
