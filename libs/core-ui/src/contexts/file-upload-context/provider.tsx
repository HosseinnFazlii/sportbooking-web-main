// libs/core-ui/src/contexts/file-upload-context/provider.tsx
import { useState, FC, useCallback, useRef, useEffect } from 'react';
import { IFileUploadProvider, IUploadFile } from './types';
import { sendFile } from './helper';
import { FileUploadContext } from './context';
import { createThumbURL } from '../../utils';

export const FileUploadProvider: FC<IFileUploadProvider> = ({ children }) => {
    const [files, setFiles] = useState([] as IUploadFile[]);
    const newFileIndex = useRef<number>(1);
    const filesRef = useRef(files);

    useEffect(() => {
        filesRef.current = files;
    }, [files]);

    useEffect(() => {
        return () => {
            if (filesRef.current && filesRef.current.length > 0) {
                filesRef.current.filter(f => f.isUploading && f.cancelToken).forEach(f => {
                    if (f.cancelToken) {
                        f.cancelToken.cancel();
                    }
                })
            }
        }
    }, []);

    const getNewKey = () => newFileIndex.current++;

    const addFiles = async (newFiles: IUploadFile[]) => {
        // Add new files to the state
        const updatedFiles = [
            ...files,
            ...newFiles
        ];
        await setFiles(updatedFiles);
        // console.log(updatedFiles);
        // Start uploading the new files
        setTimeout(() => {
            newFiles.forEach(file => {
                sendFile(file, updateFile);
            });
        }, 300);
    };

    const updateFile = useCallback(async (updatedFile: IUploadFile) => {
        return setFiles(prevFiles => {
            const newFiles = prevFiles.map(file =>
                file.key === updatedFile.key ? updatedFile : file
            );
            return newFiles;
        });
    }, []);

    const removeFile = async (key: number) => {
        const file = files.filter(f => f.key === key).pop();
        if (file) {
            if (file.cancelToken) {
                file.cancelToken.cancel();
            }
            const updatedFiles = files.filter(file => file.key !== key);
            setFiles(updatedFiles);
        }
    };

    const clear = async () => {
        setFiles([]);
    };

    const handleSetFiles = async (newFiles: IUploadFile[]) => {
        setFiles(newFiles);
    };

    const sendFileAgain = async (key: number) => {
        const file = files.filter(f => f.key === key).pop();
        if (file) {
            file.errorUploading = false;
            file.isUploading = true;
            file.percentCompleted = 0;
            await updateFile(file);

            sendFile(file, updateFile);
        }
    }

    const stopSendingFile = async (key: number) => {
        const file = files.filter(f => f.key === key).pop();
        if (file) {
            file.errorUploading = true;
            file.isUploading = false;
            file.percentCompleted = 0;
            if (file.cancelToken) {
                file.cancelToken.cancel();
            }
            await updateFile(file);
        }
    }

    const addFileList = async (fileList: File[]) => {
        const newFiles: IUploadFile[] = await Promise.all(fileList.map(async (f) => {
            const ext = `.${f.name.split(".").slice(1).join(".")}`.toLowerCase();
            return {
                key: getNewKey(),
                name: f.name,
                ext: ext,
                thumbURL: await createThumbURL(f, ext),
                file: f,
                size: f.size || 0,
                isUploading: true,
                percentCompleted: 0,
            }
        }));

        if (newFiles.length > 0) {
            await addFiles(newFiles);
        }
    };

    return (
        <FileUploadContext.Provider value={{
            files,
            addFiles,
            setFiles: handleSetFiles,
            clear,

            addFileList,

            updateFile,
            removeFile,
            sendFileAgain,
            stopSendingFile,
        }}>
            {children}
        </FileUploadContext.Provider>
    );
};
