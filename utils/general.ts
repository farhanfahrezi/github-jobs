export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const inputErrorHelper: any = (isError: boolean, errorMsg?: string) => {
    return {
        status: isError ? "error" : "",
        color: isError ? "error" : "",
        helperColor: isError ? "error" : "",
        helperText: isError ? (errorMsg || "required") : "",
    };
}