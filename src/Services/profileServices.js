import axios from "axios";

export async function getUserPostsApi(userId) {
    try {
        let { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${userId}/posts`,
        {
            headers: {
            token: localStorage.getItem("token"),
            },
            params: {
                limit : 200,
                sort : '-createdAt',
            },
        }
        );
        console.log("User Posts API response:", data);
        return data;
    } catch(err){
        console.log(err.response.data);
        return err.response.data;
        
    }
}



export async function UploadProfilePhotoApi(formData) {
    try {
        let { data } = await axios.put(
        `https://linked-posts.routemisr.com/users/upload-photo`,formData,
        {
            headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
            },

        }
        );
        console.log("User Posts API response:", data);
        return data;
    } catch (err) {
        console.log(err.response?.data || err.message);
        return { message: false };
    }
}



export async function userChangePasswordApi(userOldPassword, userNewPassword) {
    try {
        const { data } = await axios.patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        {
            password: userOldPassword,
            newPassword: userNewPassword,
        },
        {
            headers: {
            token: localStorage.getItem("token"),
            },
        }
        );

        console.log("Change Password API response:", data);
        return data;
    } catch (err) {
        
        console.log(err.response.data);
        return err.response.data;
        
    }
}
