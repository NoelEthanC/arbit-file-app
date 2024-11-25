import React, { useEffect, useRef, useState } from "react";

import {
  File,
  FileAudio,
  FileAudio2,
  Play,
  PlayCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import {
  X,
  Check,
  FileSpreadsheet,
  FileText,
  FileImage,
  FileVideo,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { SheetFooter } from "../ui/sheet";

const FileList = ({
  files,
  onRemoveFile,
}: {
  files: File[];
  onRemoveFile: (index: number) => void;
}) => {
  return (
    <ScrollArea className="h-[85%] w-full rounded-md  px-4 ">
      {files
        .map((file, index) => (
          <div key={file.name + index}>
            <FileItem file={file} onRemove={() => onRemoveFile(index)} />
            {index < files.length - 1 && (
              <Separator className="my-0 bg-[#00E5FF]/0 " />
            )}
          </div>
        ))
        .reverse()}
    </ScrollArea>
  );
};

const FileItem = ({ file }: { file: File }) => {
  const [fileObjectURL, setFileObjectURL] = useState<string>("");
  const [sendProgress, setSendProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSendProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const getFileIcon = () => {
    if (file.type.includes("image"))
      return (
        <Image
          src={fileObjectURL}
          alt="image"
          height={50}
          width={50}
          className="rounded-md w-8 h-8 "
        />
      );
    if (file.type.includes("audio"))
      return <FileAudio className="w-8 h-8 text-[#00E5FF]" />;
    if (file.type.includes("video"))
      return (
        <video
          src={fileObjectURL}
          height={50}
          width={50}
          className="rounded-md w-8 h-8"
        />
      );
    if (file.type === "application/pdf")
      return (
        <iframe
          src={fileObjectURL}
          height={50}
          width={50}
          className="rounded-md w-8 h-8 overflow-x-hidden"
        ></iframe>
      );
    if (file.name.endsWith(".docx"))
      return <FileText className="w-8 h-8 text-[#00E5FF]" />;
    if (file.name.endsWith(".xlsx"))
      return <FileSpreadsheet className="w-8 h-8 text-[#00E5FF]" />;
    if (file.name.endsWith(".pptx"))
      return <FileText className="w-8 h-8 text-[#00E5FF]" />;
    return <File className="w-8 h-8 text-[#00E5FF]" />;
  };

  useEffect(() => {
    console.log(file);
    setFileObjectURL(URL.createObjectURL(file));
    return () => {
      URL.revokeObjectURL(fileObjectURL);
    };
  }, [file]);
  console.log("fileObjectURL", fileObjectURL);
  return (
    <div className=" rounded-lg p-4 mb-2 bg-[#000000] bg-opacity-50">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{getFileIcon()}</div>
        <div className="flex-grow min-w-0">
          <p className="text-[#E5E5E5] text-sm font-medium truncate max-w-[280px]">
            {file.name}
          </p>
          <Progress value={sendProgress} className="w-full h-2 mt-2" />
        </div>
        <div className="flex-shrink-0 space-x-2">
          {sendProgress === 100 ? (
            <Check className="w-6 h-6 text-[#00E5FF] " />
          ) : (
            <X
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileList;
