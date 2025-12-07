import { create } from "zustand";

export const useFileContextMenuStore = create((set) => ({
    x: null,
    y: null,
    isOpen: false,
    file: null,
    setX: (incommingX) => {
        set({
            x: incommingX
        });
    },
    setY: (incommingY) => {
        set({
            y: incommingY
        });
    },
    setIsOpen: (incommingIsOpen) => {
        set({
            isOpen: incommingIsOpen
        });
    },
    setFile: (incommingFile) => {
        set({
            file: incommingFile
        })
    }
}));
