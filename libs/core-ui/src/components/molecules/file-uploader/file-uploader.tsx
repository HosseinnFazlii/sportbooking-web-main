// libs/core-ui/src/components/molecules/file-uploader/file-uploader.tsx
import { useState, useRef, FC, DragEvent, useEffect } from "react";
import {
    Box,
    useTheme,
    Grid,
    Typography,
    Button,
    Container,
    Stack,
} from "../../../foundations";
import { Icon } from "../../atoms";
import {
    formatFileSize,
} from "../../../utils";
import { IUploadFile } from "../../../contexts";
import { FileItem } from "./file-item";
import { useFileUpload } from '../../../hooks';

export interface IFileUploader {
    title: string;
    hideFooter?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    defaultFiles?: IUploadFile[];
}

export const FileUploader: FC<IFileUploader> = ({ title, readOnly, defaultFiles, disabled }) => {
    const { files, addFileList, removeFile, setFiles, sendFileAgain, stopSendingFile } = useFileUpload();
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();


    useEffect(() => {
        if (defaultFiles) {
            setFiles(defaultFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetFileInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    if (readOnly && (!defaultFiles || defaultFiles.length === 0)) {
        return null;
    }
    const handleFileUpload = async (fileList: FileList | null) => {
        if (!fileList) {
            return;
        }

        addFileList(Array.from(fileList));
        resetFileInput();
    };

    const handleDrag = function (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files);
        }
    };

    const onButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveFile = (key: number) => () => {
        resetFileInput();
        removeFile(key);
    }

    const handleSendFileAgain = (key: number) => () => {
        sendFileAgain(key);
    }

    const stopSendFile = (key: number) => () => {
        stopSendingFile(key);
    }

    return (
        <Grid
            container
            onDragEnter={!readOnly && !disabled ? handleDrag : undefined}
            onDragLeave={!readOnly && !disabled ? handleDrag : undefined}
            onDragOver={!readOnly && !disabled ? handleDrag : undefined}
            onDrop={!readOnly && !disabled ? handleDrop : undefined}
            sx={{ borderRadius: "20px", position: "relative", backgroundColor: dragActive ? "#00000022" : "#00000000" }}
        >
            <input
                ref={inputRef}
                hidden
                accept="*/*"
                type="file"
                multiple={true}
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={readOnly || disabled}
            />
            {!readOnly && (
                <Grid item xs={12} xl={12}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography variant="h6">{title}</Typography>

                        <Button
                            variant="outlined"
                            startIcon={<Icon icon='mdi:plus' fontSize={20} />}
                            onClick={onButtonClick}
                            disabled={readOnly || disabled}
                        >
                            پیوست جدید
                        </Button>

                    </Box>
                </Grid>
            )}
            <Grid item xs={12} xl={12} sx={{ padding: "1rem" }}>
                <Container sx={{ width: "100%", minHeight: readOnly ? "auto" : "5rem", height: readOnly ? "auto" : "100%", position: "relative" }}>
                    {!readOnly && files.length === 0 && (
                        <Typography variant="caption" sx={{ textAlign: "center", pt: "0rem", position: "absolute", width: "100%" }}>فایل خود را به اینجا بکشید و رها کنید</Typography>
                    )}
                    <Stack direction="column" alignItems="start" spacing={2} sx={{ minHeight: readOnly ? "auto" : "5rem", pb: readOnly ? "none" : "3rem" }}>
                        {files.length > 0 ? files.map((f, i) => (
                            <FileItem
                                key={`FileUploader_${f.key}_${i}`}
                                file={f}
                                sendFileAgain={handleSendFileAgain(f.key)}
                                stopSendFile={stopSendFile(f.key)}
                                removeFile={handleRemoveFile(f.key)}
                                theme={theme}
                                readOnly={readOnly}
                            />
                        )) : null}
                    </Stack>
                </Container>
            </Grid>
            {!readOnly && (
                <Grid item xs={12} xl={12} sx={{ padding: "1rem", backgroundColor: theme.palette.mode === "light" ? "#FFFFFF99" : "#00000022", position: "absolute", bottom: "0px", borderRadius: "20px", width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography variant="caption" sx={{ pt: "0rem" }}>تعداد فایل‌های انتخاب شده: {files.length}</Typography>
                        <Typography variant="caption" sx={{ pt: "0rem" }}>حجم فایل‌های انتخاب شده: {formatFileSize(files.reduce((a, c) => a + c.size, 0))}</Typography>
                    </Box>
                </Grid>
            )}

        </Grid>
    );
}