export default function handleErrors(response) {
    console.log('handleErrors:' + response)
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}