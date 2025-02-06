export const getApiCheck = async () => {
    try {
        const res = await fetch('http://localhost:8080/api-check', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    } catch (err) {}
}