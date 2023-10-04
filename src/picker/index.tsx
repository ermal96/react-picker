
import { format, isValid, parse } from "date-fns";
import { Body } from "./Body"
import { usePickerStore } from "./store";
import { useCallback, useMemo, useState } from "react";

export const Picker = () => {
    const dateFormat = useMemo(() => 'dd/MM/yyyy', [])
    const [isDateValid, setIsDateValid] = useState<boolean>()

    const { selectedDate, setSelectedDate, setActiveDate } = usePickerStore();
    const [date, setDate] = useState(format(selectedDate, dateFormat))

    const getFormmatedDate = useCallback((date: string) => {
        const parsed = parse(date, dateFormat, new Date());
        if (isValid(parsed)) {
            return parsed;
        }
        return 0;
    }, [dateFormat]);


    const handleInputChange = useCallback((e: { target: { value: string; }; }) => {
        const date = getFormmatedDate(e.target.value)

        setDate(e.target.value)

        if (date) {
            setSelectedDate(date)
            setActiveDate(date)
        }

    }, [getFormmatedDate, setActiveDate, setSelectedDate]);


    const handleOnblur = useCallback(() => {
        console.log(date)
        if (getFormmatedDate(date)) {
            setIsDateValid(true)
        } else {
            setIsDateValid(false)
        }
    }, [date, getFormmatedDate])

    return (
        <div>
            <input
                onBlur={handleOnblur}
                className={`border rounded ${isDateValid === undefined ? '' : isDateValid === false ? 'border-red-700' : ''}`}
                onChange={handleInputChange}
                type="text"
                defaultValue={format(getFormmatedDate(date), dateFormat)}
                placeholder={dateFormat}
            />
            <Body />
        </div>

    )
}