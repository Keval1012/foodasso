// WithdrawalListingData.ts

export interface WithdrawalOrder {
    date: string;
    totalWithdrawalreported: string; // Ensure this matches the expected interface
}

export const WithdrawalListingData: WithdrawalOrder[] = [
    {
        date: "27-05-2024",
        totalWithdrawalreported: "8000.00", // Correct property name
    },
    {
        date: "28-05-2024",
        totalWithdrawalreported: "9000.00",
    },
    {
        date: "29-05-2024",
        totalWithdrawalreported: "8890.00",
    },
    {
        date: "07-05-2024",
        totalWithdrawalreported: "800.00",
    },
    {
        date: "02-05-2024",
        totalWithdrawalreported: "9000.00",
    },
    // Add more data as needed...
];
