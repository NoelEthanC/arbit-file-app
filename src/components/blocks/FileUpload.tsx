import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FileList from "./UploadedFileList";
import { Upload } from "lucide-react";

const FileUpload = ({
  // handleFileUpload,
  setIsHome,
  selectedDevice,
  toast,
}: {
  // handleFileUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  setIsHome: (isHome: boolean) => void;
  selectedDevice: DetectedDevice | null;
  toast: any;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: any) => {
    event.preventDefault();
    let selectedFiles: File[] = [];

    selectedFiles = event.target.files;
    if (selectedFiles) {
      console.log("selected file", selectedFiles);
    } else {
      selectedFiles = event.dataTransfer.files;
      console.log("dropped files", selectedFiles);
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  return (
    <Card className="w-full max-w-xl bg-[#000000] bg-opacity-50  border-yellow-400/0 mx-auto   my-10">
      <CardContent className="p-6 h-[400px] ">
        {/* <h2 className="text-xl font-bold text-center mb-4 text-white  ">
          Send files to {selectedDevice?.name}
        </h2> */}
        {selectedFiles.length ? (
          <FileList files={selectedFiles} onRemoveFile={() => {}} />
        ) : (
          <div
            className="border-2  flex flex-col my-auto border-dashed border-yellow-400 rounded-lg justify-center h-full bg-opacity-60 text-center cursor-pointer hover:border-[#00E5FF] transition-colors duration-300"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileUpload}
          >
            <>
              <Upload className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-[#E5E5E5]">
                <span className="text-yellow-400 font-semibold">
                  Drag and drop{" "}
                </span>
                files here, or{" "}
                <span className="text-yellow-400 font-semibold">Click </span>
                to select files
              </p>
              <input
                id="fileInput"
                type="file"
                ref={fileInputRef}
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <CardFooter className="flex items-center gap-x-4 relative bott">
            <Button
              variant={"outline"}
              className="w-full mt-4 border border-yellow-400 bg-transparent hover:bg-[#00E5FF] text-[#E5E5E5] transition-colors duration-300"
              onClick={() => {
                console.log(fileInputRef.current);

                fileInputRef.current?.click();
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-full mt-4 bg-yellow-600 hover:bg-[#00E5FF] text-[#E5E5E5] transition-colors duration-300"
              onClick={() => {
                console.log(fileInputRef.current);

                fileInputRef.current?.click();
              }}
            >
              Add Files
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
