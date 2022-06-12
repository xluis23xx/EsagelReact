import * as React from "react";
import { FirebaseContext } from "../firebase";

interface UseFileUploadsProps {
  directory?: string;
  timerMessage?: number;
}

export const useFileUpload = ({
  directory = "",
  timerMessage = 3000,
}: UseFileUploadsProps) => {
  const { firebase } = React.useContext(FirebaseContext);

  // state para las imagenes
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlDocument, setUrlDocument] = React.useState<string | null>("");
  const [showDocument, setShowDocument] = React.useState<string | null>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>("");

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
    if (urlDocument) {
      setUrlDocument("");
    }
  };

  const handleUploadError = (error: string) => {
    setUploading(false);
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, timerMessage);
  };

  const handleUploadSuccess = async (name: string | null) => {
    setProgress(100);
    setUploading(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref(directory)
      .child(name)
      .getDownloadURL();

    setUrlDocument(url);
    setTimeout(() => {
      setUrlDocument("");
    }, timerMessage);
    setShowDocument(url);
  };

  const handleProgress = (progress: number) => {
    setProgress(progress);
  };

  return {
    setShowDocument,
    uploading,
    progress,
    urlDocument,
    showDocument,
    errorMessage,
    handleUploadStart,
    handleProgress,
    handleUploadError,
    handleUploadSuccess,
  };
};
