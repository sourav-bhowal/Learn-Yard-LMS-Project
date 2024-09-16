"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";

// INTERFACE FOR FILE UPLOADER
interface FileUploaderProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

// FILE UPLOADER COMPONENT
export default function FileUploader({
  onChange,
  endpoint,
}: FileUploaderProps) {
  // TOAST
  const { toast } = useToast();
  return (
    // UPLOAD DROPZONE
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res[0]?.url)}
      onUploadError={(error: Error) => {
        toast({
          description: error?.message,
          variant: "destructive",
        });
      }}
    />
  );
}
