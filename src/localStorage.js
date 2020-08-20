export const checkLocalStorage = (key,fallbackValue) => {
    if(localStorage.getItem(key) != null)
    {
        //convert the item back from a json to a usable variable type.
        return JSON.parse(localStorage.getItem(key));
    }
    else return fallbackValue;
}


export const localStore = (key,value) => {
    //convert the value into a string for storage
    localStorage.setItem(key, JSON.stringify(value));
}
export default checkLocalStorage;