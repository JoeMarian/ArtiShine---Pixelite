import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const ImageUploader = ({ onImageSelect, preview }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0] && onImageSelect) onImageSelect(files[0]);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
      }`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-warm" />
          <p className="text-muted-foreground">Image uploaded successfully!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">Upload your craft image</p>
            <p className="text-muted-foreground">Drag and drop or click to select</p>
          </div>
          <PrimaryButton variant="outline">
            <Camera className="mr-2 h-4 w-4" />
            Choose Image
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


