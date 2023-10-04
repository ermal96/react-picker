export type PickerState = {
    selectedDate: Date,
    activeDate: Date,
    setSelectedDate: (value: Date) => void
    setActiveDate: (value: Date) => void
  }
  


export type PickerProps = {
    value: Date
}