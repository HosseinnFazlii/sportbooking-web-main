// libs/core-ui/src/contexts/file-upload-context/defaultFileUploadProvider.ts
import { FileUploadContextType, IUploadFile } from './types';

export const defaultFileUploadProvider: FileUploadContextType = {
    files: [] as IUploadFile[],
    addFiles: (newFiles: IUploadFile[]) => Promise.resolve(),
    setFiles: (newFiles: IUploadFile[]) => Promise.resolve(),
    clear: () => Promise.resolve(),

    addFileList: (fileList: File[]) => Promise.resolve(),

    updateFile: (updatedFile: IUploadFile) => Promise.resolve(),
    removeFile: (key: number) => Promise.resolve(),
    sendFileAgain: (key: number) => Promise.resolve(),
    stopSendingFile: (key: number) => Promise.resolve(),
};
