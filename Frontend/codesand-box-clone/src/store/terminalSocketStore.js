import { create } from 'zustand';

export const useTerminalsocketStore = create((set) => {
     return {
        terminalsocket: null,
        setTerminalSocket: (incomingSocket) => {
            set({
                terminalsocket: incomingSocket
            })
        }
     }
});