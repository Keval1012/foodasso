
export interface BillerProfile {
    billername: string;
    billeroriginalname: string;
    type: string;
}


export const BillerProfileListingData: BillerProfile[] = [
    {
        billername: 'Biller',
        billeroriginalname: 'Biller',
        type: "Biller"
    },
    {
        billername: 'Waiter',
        billeroriginalname: 'Waiter',
        type: "Waiter"
    },
                

    // Add more orders as needed...
];
