export type PickerState = {
    selectedDate: Date | null,
    activeDate: Date,
    setSelectedDate: (value: Date | null) => void
    setActiveDate: (value: Date) => void
  }
  


export type PickerProps = {
    value: Date
}