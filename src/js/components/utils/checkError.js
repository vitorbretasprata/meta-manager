const checkError = (response) => {
    try {

        if(response.data && response.data.error) {
            const { error } = response.data;
            return error;
        }

        const { data } = response;

        return data;

    } catch (error) {
        return error;
    }
}

export default checkError;