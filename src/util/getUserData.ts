const getUserData = async () : Promise<{ name: string | null; email: string | null } | null> => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        return {
            name: user.displayName,
            email: user.email,
        };
    }
    return null;
}

export default getUserData