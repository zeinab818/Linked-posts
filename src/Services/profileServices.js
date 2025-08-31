import axios from "axios";

export  function getUserPostsApi(userId) {
      return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`,
        {
            headers: {
            token: localStorage.getItem("token"),
            },
            params: {
                // limit : 200,
                // sort : '-createdAt'
            },
        }
        );
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



export async function userChangePasswordApi({ oldPassword, newPassword }) {
  try {
    const { data } = await axios.patch(
      `https://linked-posts.routemisr.com/users/change-password`,
      {
        password: oldPassword,
        newPassword,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;
  } catch (err) {
    return err.response.data;
  }
}

