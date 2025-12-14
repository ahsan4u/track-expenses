'use client'

import { createContext, useContext, useEffect, useState } from "react";
export const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('records') || '[]');
        setData(storedData);
    }, []);

    function addRecord(record) {
        const storedRecord = JSON.parse(localStorage.getItem('records') || '[]');
        if(!record) return setData(storedRecord);
        if (storedRecord.some(r => r.date === record.date)) return;

        const updated = [record, ...storedRecord];
        setData(updated);
        localStorage.setItem('records', JSON.stringify(updated));
    }

    // delete record by date
    function deleteData(date) {
        const storedRecord = JSON.parse(localStorage.getItem('records') || '[]');
        const updatedRecords = storedRecord.filter(r => r.date !== date);
        setData(updatedRecords);
        localStorage.setItem('records', JSON.stringify(updatedRecords));
    }
    

    return (
        <AppContext.Provider value={{data, addRecord, deleteData}}>
            {children}
        </AppContext.Provider>
    );
}