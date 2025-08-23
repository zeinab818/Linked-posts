// Schema/ChangePassword.js
import * as zod from "zod";

export const schemaChangePassword = zod.object({
  oldPassword: zod.string().min(6, "Old password must be at least 6 characters"),
  newPassword: zod.string().min(6, "New password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain uppercase, lowercase, number, and special character")
})
.refine((data) => data.oldPassword !== data.newPassword, {
  message: "New password cannot be the same as the old password",
  path: ["newPassword"],
});
