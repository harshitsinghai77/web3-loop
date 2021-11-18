import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";

export const UploadImage = ({ onImageUploaded }) => {
  const [image, setImage] = useState();

  const convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    //set this buffer -using es6 syntax
    const buffer = await Buffer.from(reader.result);
    return buffer;
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedImage = acceptedFiles[0];
      let previewImage = uploadedImage;
      previewImage["preview"] = URL.createObjectURL(previewImage);
      setImage(previewImage);
      if (!uploadedImage) return;
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(uploadedImage);
      reader.onloadend = async () => {
        const bufferImage = await convertToBuffer(reader);
        onImageUploaded(bufferImage);
      };
    },
    [onImageUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png",
  });

  const thumbs = image && (
    <img className="my-rounded-cirlce" src={image.preview} alt={image.name} />
  );

  return (
    <div {...getRootProps()} className="mb-3">
      <input {...getInputProps()} />
      {isDragActive ? (
        <Button block color="warning" type="button">
          Drop it bitch
        </Button>
      ) : (
        <Button block color="default" type="button">
          Drag and drop profile pic
        </Button>
      )}
      {/* {thumbs} */}
    </div>
  );
};
