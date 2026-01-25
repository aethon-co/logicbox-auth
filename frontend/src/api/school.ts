export const signupSchool = async (data: any) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/school/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to signup");
    }

    return response.json();
};
