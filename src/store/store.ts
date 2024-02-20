import { create } from 'zustand';

export interface AttendanceRecord {
    _id: string;
    netID: string;
    uin: string;
    classId: string;
    takenBy: string;
    shortcode: string;
    date: Date;
}

interface AttendanceState {
    records: AttendanceRecord[];
    setRecords: (records: AttendanceRecord[]) => void;
    addRecord: (record: AttendanceRecord) => void;
    removeRecord: (id: string) => void; // Assuming each record has a unique identifier, like an _id from MongoDB.
}

export const useStore = create<AttendanceState>((set) => ({
    records: [],
    setRecords: (records) => set(() => ({ records })),
    addRecord: (record) => set((state) => ({ records: [...state.records, record] })),
    removeRecord: (id) => set((state) => ({ records: state.records.filter(record => record._id !== id) })), // Example uses netID as a unique identifier; adjust as needed.
}));

