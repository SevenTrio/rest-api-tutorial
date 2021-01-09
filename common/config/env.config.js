module.exports = {
    "port": process.env.PORT,
    "appEndpoint": process.env.APP_ENDPOINT,
    "apiEndpoint": process.env.API_ENDPOINT,
    "jwt_secret": process.env.JWT_SECRET,
    "jwt_expiration_in_seconds": process.env.JWT_EXPIRATION_IN_SECONDS,
    "environment": process.env.NODE_ENV === "development" ? "development" : "production",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048,
    },
};
