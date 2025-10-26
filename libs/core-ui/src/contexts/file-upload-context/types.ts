// libs/core-ui/src/contexts/file-upload-context/types.ts
import { ReactNode } from "react";
import {
    CancelTokenSource,
} from "../../utils";

export interface IUploadFile {
    key: number,
    name: string;
    ext: string;
    thumbURL?: string | ArrayBuffer;
    url?: string;
    file?: File;
    size: number;
    isUploading: boolean;
    percentCompleted: number;
    cancelToken?: CancelTokenSource;
    errorUploading?: boolean;
    serverKey?: string;
}

export interface IFileUploadProvider {
    children: ReactNode;
};


export type FileUploadContextType = {
    files: IUploadFile[];  // Replace 'any' with the appropriate type for your files
    // setFiles: React.Dispatch<React.SetStateAction<IUploadFile[]>>;  // Replace 'any' with the appropriate type for your files
    addFiles: (newFiles: IUploadFile[]) => Promise<void>;
    setFiles: (newFiles: IUploadFile[]) => Promise<void>;
    clear: () => Promise<void>;
    
    addFileList: (fileList: File[]) => Promise<void>;

    updateFile: (updatedFile: IUploadFile) => Promise<void>;
    removeFile: (key: number) => Promise<void>;
    sendFileAgain: (key: number) => Promise<void>;
    stopSendingFile: (key: number) => Promise<void>;
};


