// libs/core-ui/src/components/molecules/file-uploader/file-item.tsx
import { FC } from "react";
import {
    Box,
    styled,
    BoxProps,
    Typography,
    IconButton,
    Theme,
    Button,
} from "../../../foundations";
import { CircularLabelProgress, Icon, Link } from "../../atoms";
import { IUploadFile } from "../../../contexts";
import { downloadFile, formatFileSize, imageExts } from "../../../utils";

const FileItemComponent = styled(Box)<BoxProps>(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: "0.2rem",
    alignItems: "center",
    padding: "0.3rem 1rem",
    backgroundColor: theme.palette.mode === "light" ? "#FFFFFF99" : "#00000022",
    borderRadius: "20px",
    overflow: "hidden"
}));

interface IFileItem {
    file: IUploadFile
    sendFileAgain: () => void;
    stopSendFile: () => void;
    removeFile: () => void;
    theme: Theme;
    readOnly?: boolean;
}

export const FileItem: FC<IFileItem> = ({ file, sendFileAgain, stopSendFile, removeFile, theme, readOnly }) => (
    <FileItemComponent key={file.key}>
        {file.errorUploading && (
            <IconButton onClick={sendFileAgain} title="ارسال مجدد"><Icon icon="mdi:progress-upload" /></IconButton>
        )}
        {file.isUploading && (
            <CircularLabelProgress
                stop={stopSendFile}
                color={file.percentCompleted === 0 ? "secondary" : "primary"}
                variant={file.percentCompleted === 0 ? "indeterminate" : "determinate"}
                value={file.percentCompleted}
            />
        )}

        {
            file.thumbURL && typeof file.thumbURL === "string" && imageExts.includes(file.ext.toLowerCase()) ?
                <img src={file.thumbURL} alt={file.name} width="32" height="32" style={{ filter: file.errorUploading ? "grayscale(1)" : "" }} />
                : <Icon icon="mdi:file-document" width="32" height="32" color={theme.palette.primary.main} style={{ filter: file.errorUploading ? "grayscale(1)" : "" }} />
        }
        {file.isUploading ? (
            <Typography variant="caption" color={file.errorUploading ? theme.palette.error.main : theme.palette.text.primary}>{file.name}</Typography>
        ) : (
            readOnly ? (
                <Button
                    onClick={() => downloadFile(file.url || (file.thumbURL && typeof file.thumbURL === "string" ? file.thumbURL : "") || "")}
                    startIcon={<Icon icon="mdi:download" />}
                >
                    <Typography variant="caption" color={file.errorUploading ? theme.palette.error.main : theme.palette.text.primary}>{file.name}</Typography>
                </Button>
            ) : (
                <Button
                    component={Link}
                    target="_blank"
                    // href={file.url || (file.thumbURL && typeof file.thumbURL === "string" ? file.thumbURL : "") || ""}
                    href=""
                    download={file.name}
                    startIcon={<Icon icon="mdi:download" />}
                >
                    <Typography variant="caption" color={file.errorUploading ? theme.palette.error.main : theme.palette.text.primary}>{file.name}</Typography>
                </Button>
            )
        )}
        <Typography variant="caption" color={file.errorUploading ? theme.palette.error.main : theme.palette.text.primary}> ({formatFileSize(file.size)})</Typography>
        {!readOnly && (<IconButton onClick={removeFile}><Icon icon="mdi:close" /></IconButton>)}
    </FileItemComponent>
)