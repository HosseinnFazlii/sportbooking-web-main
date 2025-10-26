// libs/core-ui/src/components/molecules/file-uploader/helper.ts
import { IUploadFile } from "./types";
import {
    axiosInstance,
    createCancelTokenSource,
    getURLWithVersion
} from "../../utils";

export const sendFile = async (fileToUpload: IUploadFile, updateFile: (file: IUploadFile) => void) => {
    const file = { ...fileToUpload };
    try {
        if (!file.file)
            return;
        const formData = new FormData();
        formData.append("files", file.file);
        const cancelTokenSource = createCancelTokenSource();
        file.isUploading = true;
        file.cancelToken = cancelTokenSource;

        await updateFile(file);

        const response = await axiosInstance.post<Array<{ code: string, filename: string, size: number }>>(getURLWithVersion("ticket/upload"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: async (progressEvent) => {
                // console.log(progressEvent);
                const percentCompleted = progressEvent.total && progressEvent.total > 0 ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                file.percentCompleted = percentCompleted;

                await updateFile(file);
            },
            cancelToken: cancelTokenSource.token,
            timeout: 10 * 60 * 1000
        });

        if (response.data && response.data[0] && response.data[0].code) {
            file.serverKey = response.data[0].code;
        }
    } catch (error) {
        file.errorUploading = true;
        console.error("Error uploading files:", error);
        // Handle errors
    } finally {
        file.isUploading = false;
        file.percentCompleted = 100;
        file.cancelToken = undefined;
        await updateFile(file);
    }
};