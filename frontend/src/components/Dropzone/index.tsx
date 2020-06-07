import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(files);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(files);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="imagem" />
      ) : (
        <p>
          <FiUpload />
          Imagem do Estabelicemento
        </p>
      )}
    </div>
  );
};
export default Dropzone;
