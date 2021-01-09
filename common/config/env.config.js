module.exports = {
    "port": process.env.PORT,
    "appEndpoint": process.env.APP_ENDPOINT,
    "apiEndpoint": process.env.API_ENDPOINT,
    "jwt_secret": process.env.JWT_SECRET,
    "jwt_expires_in": process.env.JWT_EXPIRES_IN,
    "environment": process.env.NODE_ENV === "development" ? "development" : "production",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048,
    },
};
