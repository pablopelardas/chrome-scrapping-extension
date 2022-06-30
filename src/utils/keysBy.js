export function keysBy(array){
    const finalObject = {};
    array.forEach(element => {
        const [key, value] = element.trim().split('=');
        finalObject[key] = value.replace(/"/g, '');
    });
    return finalObject;
}