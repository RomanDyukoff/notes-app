import { useState } from "react";

export const useLocalStorageState = <T>(initValue: T) => {
    const [value, setValue] = useState();

    const getValue = (key: string) => {
        const storValue = localStorage.getItem(key);
        setValue(storValue ? JSON.parse(storValue) : initValue);
    }

    const updateValue = (key: string, data: T) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    return [value, getValue, updateValue] as const
}