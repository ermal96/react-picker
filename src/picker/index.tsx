
import { Body } from "./Body"

import { useMemo, useState } from "react";
import { InputHeader } from "./InputHeader";

export const Picker = () => {
    const dateFormat = useMemo(() => 'dd.MM.yyyy', [])
    const [isBodyOpen, setIsBodyOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [activeDate, setActiveDate] = useState(new Date())

    return (
        <div className="m-10 w-96 relative">
            <InputHeader
                dateFormat={dateFormat}
                selectedDate={selectedDate}
                setActiveDate={setActiveDate}
                setIsBodyOpen={setIsBodyOpen}
                setSelectedDate={setSelectedDate}
            />
            {isBodyOpen && <Body
                selectedDate={selectedDate}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                setSelectedDate={setSelectedDate}
            />}

        </div>

    )
}