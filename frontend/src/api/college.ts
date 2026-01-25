export const signupCollege = async (data: any) => {
    const response = await fetch("http://localhost:3001/api/v1/college/signup", {
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
