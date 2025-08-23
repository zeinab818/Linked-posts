import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import { UploadProfilePhotoApi } from "../Services/profileServices";

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      navigate("/profile"); // بعد ما تغير الصورة ارجعي للصفحة الشخصية
    } else {
      setError(response.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="uploadPhoto lg:w-1/2 md:w-2/3 sl:w-full mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl min-w-md">
      <h1 className="text-3xl mb-4">Upload Profile Photo</h1>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} isLoading={loading} color="primary" className="mt-4">
        Upload
      </Button>
      {error && <p className="text-red-800 mt-2">{error}</p>}
    </div>
  );
}
