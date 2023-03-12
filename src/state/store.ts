import { create } from 'zustand'
import { persist }  from 'zustand/middleware'
interface MyNFTStoreInterface {
    myNFT: any
    setMyNFT: (myNFT: any) => void
}


export const useMyNFTStore = create<MyNFTStoreInterface>()(persist((set) => ({
    myNFT: {},
    setMyNFT: (myNFT: any) => set({ myNFT }),
}), { name: 'myNFTStore', version: 1}))


