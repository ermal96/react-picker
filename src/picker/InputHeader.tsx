import React, { ChangeEvent } from 'react';
import { parse, isValid, format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarIcon } from "./CalendarIcon";

type InputHeaderProps = {
    dateFormat: string;
    selectedDate: Date | null;
    setSelectedDate: (value: Date | null) => void;
    setActiveDate: (value: Date) => void;
    setIsBodyOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputHeader = ({ dateFormat, selectedDate, setSelectedDate, setActiveDate, setIsBodyOpen }: InputHeaderProps) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [isDateValid, setIsDateValid] = useState<boolean>()
    const [isInputChanging, setIsIputChanging] = useState(false);

    const getValidDate = useCallback((date: string) => {
        const parsed = parse(date, dateFormat, new Date());
        if (isValid(parsed)) {
            return parsed;
        }
        return 0;
    }, [dateFormat]);


    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setIsIputChanging(true)
        const validDate = getValidDate(e.target.value)
        if (!validDate) {
            setIsDateValid(false)
            setSelectedDate(null)
        } else {
            setIsDateValid(true)
            setSelectedDate(validDate)
            setActiveDate(validDate)
        }


    }, [getValidDate, setActiveDate, setSelectedDate]);


    const handleOnblur = useCallback(() => {
        setIsIputChanging(false)
    }, [])


    useEffect(() => {
        if (!isInputChanging && inputRef.current && isValid(selectedDate)) {
            inputRef.current.value = format(selectedDate as Date, dateFormat)
            setIsDateValid(true)
        }
    }, [dateFormat, isInputChanging, selectedDate])


    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                onBlur={handleOnblur}
                className={`border rounded-xl mb-3 px-3 w-full py-4 ${isDateValid === undefined ? '' : isDateValid === false ? 'border-red-700' : ''}`}
                onChange={handleInputChange}
                type="text"
                defaultValue={isValid(selectedDate) ? format(selectedDate as Date, dateFormat) : ''}
                placeholder={dateFormat}
            />
            <button onClick={() => setIsBodyOpen((prev) => !prev)} className="absolute top-4 right-4">
                <CalendarIcon />
            </button>
        </div>
    )
}