import { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { storage} from '../app/_db/Firebase'; // Adjust the import based on your project structure


const useFileUpload = (options: UploadFileOptions) => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectedRef = useRef<string | null>("")

    // Function to handle the file upload process
        const uploadFile = async (file: File, blockId?: string | undefined): Promise<string | Record<string, any>> => {
          const storageRef = ref(storage, `${options.storagePath}/${new Date().getTime()}${file.name}`);
          console.log("File to upload:", storageRef);
          const uploadTask = uploadBytesResumable(storageRef, file);
     
          return new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Update progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
              },
              (error) => {
                // Handle errors
                console.error(error);
                setError("Error uploading file");
                reject(error);
              },
              () => {
                // On successful upload, get download URL and resolve promise
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // Invoke the success callback, if provided
                  if (options.onUploadSuccess) {
                    options.onUploadSuccess(downloadURL);
                  }
                  resolve(downloadURL);
                });
              }
            );
          });
        };

return {
    uploadFile
    }
}

export default useFileUpload;