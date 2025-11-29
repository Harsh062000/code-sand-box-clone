import { create } from 'zustand';

export const useActiveFileTabStore = create((set) => ({
    activeFileTab: null,
    setActiveFileTab: (path, value, extention) => {
        set({
            activeFileTab: {
                path: path,
                value: value,
                extention: extention
            }
        })
    }
}))