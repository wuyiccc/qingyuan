import { create } from 'zustand'

class ZustandDB {
  public static useBearStore = create<{
    bears: number
    increasePopulation: () => void
  }>(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }))
}

export default ZustandDB
