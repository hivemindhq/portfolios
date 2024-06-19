import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
  import type { ProfilePictureFileRouter } from "@/server/pic/uploadthing";
   
  export const UploadThingButton = generateUploadButton<ProfilePictureFileRouter>();
  export const UploadThingDropzone = generateUploadDropzone<ProfilePictureFileRouter>();