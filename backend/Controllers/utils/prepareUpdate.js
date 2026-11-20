import bcrypt from "bcryptjs";

// Fields a user must never be able to change through the profile update endpoints
const PROTECTED_FIELDS = [
    "_id",
    "email",
    "role",
    "isApproved",
    "appointments",
    "reviews",
    "averageRating",
    "totalRating",
];

// Builds a safe update object from the request body:
// - strips protected fields (e.g. a patient making themselves "admin",
//   or a doctor approving themselves)
// - hashes a new password, or ignores an empty one, so login keeps working
export const prepareUpdate = async (body) => {
    const update = { ...body };

    PROTECTED_FIELDS.forEach((field) => delete update[field]);

    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    } else {
        delete update.password;
    }

    if (update.gender && !["male", "female", "other"].includes(update.gender)) {
        delete update.gender;
    }

    return update;
};
