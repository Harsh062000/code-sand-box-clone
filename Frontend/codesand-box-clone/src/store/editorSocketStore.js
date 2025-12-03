import { create } from "zustand";

export const useEditorSocketStore = create((set) => {
    return {
        editorSocket: null,
        setEditorSocket: (incommingSocket) => {
        set({
            editorSocket: incommingSocket
        });
    }
    }
});