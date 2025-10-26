import { FC } from "react";
import { FileUploadProvider } from "../../../contexts";
import { FileUploader, IFileUploader } from "./file-uploader";

export const FileUploaderProvider: FC<IFileUploader> = (props) => (
    <FileUploadProvider>
        <FileUploader {...props} />
    </FileUploadProvider>
);