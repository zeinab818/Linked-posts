import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast, Button, Input, ToastProvider } from "@heroui/react";
import { UploadProfilePhotoApi } from "../Services/profileServices";

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placement] = useState("top-center");
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", file); // نفس key اللي ال API متوقعه

    const response = await UploadProfilePhotoApi(formData);

    if (response.message) {
        addToast({
              title: "Success",
              description: "Profile Photo is uploaded successfully" ,
              color: "success",
          })
      navigate("/profile");
    } else {
      setError(response.error || "Something went wrong");
    }

    setLoading(false);
  };

  return <>
  <div className="fixed z-[100]">
            <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} />
        </div>
  <div className="flex justify-center items-center min-h-screen">
  <div className="uploadPhoto dark:bg-gray-900 w-full md:w-2/3 lg:w-1/2 max-w-md bg-white py-10 px-6 rounded-2xl shadow-2xl">
    <h1 className="text-3xl mb-4">Upload Profile Photo</h1>

    <Input 
      type="file" 
      onChange={handleFileChange}  
      classNames={{
        inputWrapper: "dark:bg-gray-700"
      }}
      />

    <Button  
      onClick={handleUpload} 
      isLoading={loading} 
      color="primary" 
      className="mt-4 dark:bg-gray-800"
      >
      Upload
    </Button>

    {error && <p className="text-red-800 mt-2">{error}</p>}
  </div>
</div>


      </>
}
