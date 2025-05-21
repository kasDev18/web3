export type Transaction = {
    blockNumber: string;
    from: string;
    to: string;
    timeStamp: string;
}

export type TransactionColumns = {
    field: string;
    headerName: string;
    width: number;
    editable?: boolean;
}

export type TransactionRows = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
}