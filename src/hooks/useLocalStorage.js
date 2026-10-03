import { useState } from "react";

function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {

        const storedValue =
            localStorage.getItem(key);

        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch {
                return initialValue;
            }
        }

        return initialValue;

    });


    const updateValue = (newValue) => {

        setValue(newValue);

        localStorage.setItem(
            key,
            JSON.stringify(newValue)
        );

    };


    return [value, updateValue];

}

export default useLocalStorage;