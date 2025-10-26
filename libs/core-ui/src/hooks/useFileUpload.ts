// libs/core-ui/src/utils/hooks/useFileUpload.ts
import { useContext } from 'react';
import { FileUploadContext } from '../contexts';

export const useFileUpload = () => {
    const context = useContext(FileUploadContext);

    if (!context) {
        throw new Error('useFileUpload must be used within an FileUploadProvider');
    }

    return context;
}