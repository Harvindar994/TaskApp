export type UserType = {
    /**
     * User ID.
     */
    $id: string;
    /**
     * User creation date in ISO 8601 format.
     */
    $createdAt: string;
    /**
     * User update date in ISO 8601 format.
     */
    $updatedAt: string;
    /**
     * User name.
     */
    name: string;
    /**
     * Hashed user password.
     */
    password?: string;
    /**
     * Password hashing algorithm.
     */
    hash?: string;
    /**
     * Password hashing algorithm configuration.
     */
    hashOptions?: object;
    /**
     * User registration date in ISO 8601 format.
     */
    registration: string;
    /**
     * User status. Pass `true` for enabled and `false` for disabled.
     */
    status: boolean;
    /**
     * Labels for the user.
     */
    labels: string[];
    /**
     * Password update time in ISO 8601 format.
     */
    passwordUpdate: string;
    /**
     * User email address.
     */
    email: string;
    /**
     * User phone number in E.164 format.
     */
    phone: string;
    /**
     * Email verification status.
     */
    emailVerification: boolean;
    /**
     * Phone verification status.
     */
    phoneVerification: boolean;
    /**
     * Multi factor authentication status.
     */
    mfa: boolean;
    /**
     * Most recent access date in ISO 8601 format. This attribute is only updated again after 24 hours.
     */
    accessedAt: string;
};