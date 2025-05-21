import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import type { TransactionColumns, Transaction } from '../../utils/types/Transaction.types.ts';


type TransactionsProps = {
    transactions: Transaction[];
    columns: TransactionColumns[];
}

export default function Transactions(props: TransactionsProps) {
  return (
    <Box fontStyle={"monospace"} >
      <h2 >Transactions</h2>
      <DataGrid
        getRowId={(row) => row.blockNumber}
        rows={props.transactions}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Box>
  );
}
