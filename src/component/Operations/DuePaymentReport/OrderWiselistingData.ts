export interface DuePayment {
    billNo: number;
    customer: string;
    totalBill: number;
    remainingAmount: number;
    billDate: string; // Correct casing
}

export const OrderWiselistingData: DuePayment[] = [
    {
        billNo: 18,
        customer: "Keshav Patel (+91 9878567898)",
        totalBill: 300.0,
        remainingAmount: 300.0,
        billDate: "2024-06-27 17:51:24", // Correct casing
    },
    {
        billNo: 20,
        customer: "Heta Patel (+91 2535262859)",
        totalBill: 150.0,
        remainingAmount: 150.0,
        billDate: "2024-06-27 17:51:24", // Correct casing
    },
    {
        billNo: 25,
        customer: "+91 9878567898",
        totalBill: 450.0,
        remainingAmount: 450.0,
        billDate: "2024-06-27 17:51:24", // Correct casing
    },
    {
        billNo: 8,
        customer: "+91 8584625846",
        totalBill: 600.0,
        remainingAmount: 600.0,
        billDate: "2024-06-27 17:51:24", // Correct casing
    },
];
