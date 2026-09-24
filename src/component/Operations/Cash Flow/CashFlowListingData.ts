// kotListingData.ts

export interface CashFlowOrder {
    id: number;
    name: string;
    amountGiven: number | string;
    amountToGet: number | string;
    settled: boolean;

}

export const CashFlowListingData: CashFlowOrder[] = [
    { id: 1, name: "Aditya", amountGiven: 2000, amountToGet: 2000, settled: true },
    { id: 2, name: "Ramesh", amountGiven: 2000, amountToGet: "", settled: false },



    // Add more orders as needed...
];
