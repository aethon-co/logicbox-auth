export const signupAdmin = async (data: any) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/admin/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to signup admin");
    }

    const result = await response.json();
    if (result.token) {
        localStorage.setItem("token", result.token);
    }
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
};

export const loginAdmin = async (data: any) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login admin");
    }

    const result = await response.json();
    if (result.token) {
        localStorage.setItem("token", result.token);
    }
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
};
