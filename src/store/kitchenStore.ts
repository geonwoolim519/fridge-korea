import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_TOOLS } from '../data/kitchenTools';

interface KitchenState {
  selectedIngredients: string[];
  selectedTools: string[];
  savedIds: string[];
  toggleIngredient: (id: string) => void;
  clearIngredients: () => void;
  toggleTool: (id: string) => void;
  resetTools: () => void;
  toggleSaved: (id: string) => void;
}

export const useKitchenStore = create<KitchenState>()(
  persist(
    (set, get) => ({
      selectedIngredients: [],
      selectedTools: DEFAULT_TOOLS,
      savedIds: [],
      toggleIngredient: (id) => {
        const current = get().selectedIngredients;
        set({
          selectedIngredients: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
        });
      },
      clearIngredients: () => set({ selectedIngredients: [] }),
      toggleTool: (id) => {
        const current = get().selectedTools;
        set({
          selectedTools: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
        });
      },
      resetTools: () => set({ selectedTools: DEFAULT_TOOLS }),
      toggleSaved: (id) => {
        const current = get().savedIds;
        set({
          savedIds: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
        });
      },
    }),
    { name: 'fridge-korea-kitchen' },
  ),
);
