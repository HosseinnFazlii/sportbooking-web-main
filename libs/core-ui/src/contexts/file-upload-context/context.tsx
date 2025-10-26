// libs/core-ui/src/contexts/file-upload-context/context.tsx
import { createContext } from "react";
import { defaultFileUploadProvider } from "./defaultFileUploadProvider";
import { FileUploadContextType } from "./types";

export const FileUploadContext = createContext<FileUploadContextType>(defaultFileUploadProvider);
