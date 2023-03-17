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




/// store for put on sale state modal
interface PutOnSaleStateInterface {
    putOnSaleState: {
        royaltyOn: boolean
        transfered: boolean
        refAmount: string
    }
    setMyOnSaleState: (onSaleState: any) => void
}

export const usePutOnSaleState = create<PutOnSaleStateInterface>()(persist((set) => ({
    putOnSaleState: {
        royaltyOn: false,
        transfered: false,
        refAmount: "2.5"
    },
    setMyOnSaleState: (myOnSaleState: any) => set(myOnSaleState),
}), { name: 'putOnSaleState', version: 1}))


