import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

interface NotesListStoreInterface {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, note: { title: string }) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const useNotesStore = create<NotesListStoreInterface>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note: Note) => {
        const { notes } = get();
        const newNotes = [...notes, note];
        set({
          notes: newNotes,
        });
      },
      updateNote: (id, note) => {
        const { notes: existingNotes } = get();
        const updatedNotes = existingNotes.map((noteItem) => {
          if (id === noteItem.id) {
            const updatedNoteItem = {
              ...noteItem,
              title: note.title,
            };
            return updatedNoteItem;
          }
          return noteItem;
        });
        set({
          notes: updatedNotes,
        });
      },
      deleteNote: (id: string) => {
        const { notes } = get();
        set({
          notes: notes.filter((note) => note.id !== id),
        });
      },
      getNote: (id: string) => {
        const { notes } = get();

        return notes.find((note) => note.id === id);
      },
    }),
    {
      name: 'new-notes-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useNotesStore;
