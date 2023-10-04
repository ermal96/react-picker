import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths
} from "date-fns";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type BodyProps = {
    activeDate: Date
    selectedDate: Date | null;
    setSelectedDate: (value: Date | null) => void;
    setActiveDate: (value: Date) => void;
}


export const Body = ({ activeDate, selectedDate, setActiveDate, setSelectedDate }: BodyProps) => {

    const getHeader = () => {
        return (
            <div className="flex items-center justify-between">

                <h2 className="font-medium text-xl text-black">{format(activeDate, "MMMM yyyy")}</h2>
                <div className="flex gap-2">

                    <AiOutlineLeft
                        className="p-2 rounded-md shadow cursor-pointer bg-white w-10 h-10"
                        onClick={() => setActiveDate(subMonths(activeDate, 1))}
                    />
                    <AiOutlineRight
                        className="p-2 rounded-md shadow cursor-pointer bg-white w-10 h-10"
                        onClick={() => setActiveDate(addMonths(activeDate, 1))}
                    /></div>
            </div>
        );
    };

    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            weekDays.push(
                <div className="flex items-center justify-center font-medium w-14 h-12">
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            );
        }
        return <div className="grid grid-cols-7 gap-2">{weekDays}</div>;
    };

    const generateDatesForCurrentWeek = (date: Date, selectedDate: number | Date, activeDate: number | Date) => {
        let currentDate = date;
        const week = [];
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            week.push(
                <div
                    className={`flex items-center justify-center w-14 h-12 cursor-pointer shadow rounded-md hover:bg-blue-600 hover:text-white  transition-all 
                    ${isSameMonth(currentDate, activeDate) ? "" : "text-gray-300 bg-transparent shadow-none pointer-events-none"} 
                    ${isSameDay(currentDate, selectedDate) ? "bg-blue-600 text-white" : ""}
                   `}
                    onClick={() => {
                        setSelectedDate(cloneDate);
                    }}
                >
                    {format(currentDate, "d")}
                </div>
            );
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {

            allWeeks.push(
                generateDatesForCurrentWeek(currentDate, selectedDate || new Date(), activeDate)
            );


            currentDate = addDays(currentDate, 7);
        }

        return <div className="grid grid-cols-7 gap-1">{allWeeks}</div>;
    };

    return (
        <section className="bg-neutral-50 border absolute top-16 w-max p-4 rounded-2xl">
            {getHeader()}
            {getWeekDaysNames()}
            {getDates()}
        </section>
    );
};


