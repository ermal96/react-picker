import { create } from 'zustand'
import { PickerState } from './types'

export const usePickerStore = create<PickerState>((set) => ({
    selectedDate:  new Date(),
    activeDate:  new Date(),
    setActiveDate: (value) => set({activeDate: value}),
    setSelectedDate: (value) => set({selectedDate: value})
}))


