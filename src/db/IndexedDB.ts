import { INotesItem } from "../components/NotesItem/NotesItem";

const DB_NAME: string = "store";
const DB_VERSION: number = 1;
const OBJECT_STORE_NAME: string = "my-notes";

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise<IDBDatabase>((res, rej) => {
        const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (e) => {
            console.error('Error opening IndexedDB:', e);
            rej(new Error('Error opening IndexedDB'));
        }

        request.onsuccess = (e) => {
            const db = (e.target as IDBRequest<IDBDatabase>).result;
            res(db);
        }
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest<IDBDatabase>).result;
            db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        };
    });
};

const settingDB = async (storeName: string, type: 'readonly' | 'readwrite') => {
    const db: IDBDatabase = await initDB();
    const transaction: IDBTransaction = db.transaction([storeName], type);
    const objectStore: IDBObjectStore = transaction.objectStore(storeName);

    return [objectStore, transaction] as const
};

export async function actionNotes(prop: INotesItem[]): Promise<void>
export async function actionNotes(prop: INotesItem): Promise<void>
export async function actionNotes(prop: string): Promise<void>
export async function actionNotes(prop: INotesItem[] | INotesItem | string): Promise<void> {

    const [objectStore] = await settingDB(OBJECT_STORE_NAME, 'readwrite');

    if (Array.isArray(prop)) {
        for (const note of prop) {
            objectStore.add(note);
        }
    }

    if (typeof prop === "object" && !Array.isArray(prop)) {
        objectStore.put(prop);
    }

    if (typeof prop === "string") {
        objectStore.delete(prop);
    }
}

export async function getAllNotes(): Promise<INotesItem[]> {
    const [objectStore, transaction] = await settingDB(OBJECT_STORE_NAME, 'readonly');
    const data: INotesItem[] = [];

    return new Promise<INotesItem[]>((resolve, reject) => {
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {
                return resolve(data);
            }
        };

        transaction.onerror = (e: Event) => {
            console.error('Error', e);
            reject(new Error('Error from IndexedDB'));
        };
    });
}

export async function getNoteById(id: string): Promise<INotesItem | null> {
    const [objectStore, transaction] = await settingDB(OBJECT_STORE_NAME, 'readonly');
    
    return new Promise<INotesItem | null>((resolve, reject) => {
        const getRequest = objectStore.get(id);
        
        getRequest.onsuccess = (event) => {
            const item: INotesItem | null = (event.target as IDBRequest).result;
            resolve(item);
        };
        
        getRequest.onerror = (e: Event) => {
            console.error('Error', e);
            reject(new Error('Error from IndexedDB'));
        };
        
        transaction.onerror = (e: Event) => {
            console.error('Error', e);
            reject(new Error('Error from IndexedDB'));
        };
    });
}
