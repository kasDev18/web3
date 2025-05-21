export const columns = [
    { field: "blockNumber", headerName: "Block Number", width: 150 },
    {
      field: "from",
      headerName: "From",
      width: 350,
    },
    {
      field: "to",
      headerName: "To",
      width: 350,
    },
    {
      field: "timeStamp",
      headerName: "Created At",
      width: 110,
      valueFormatter: (timeStamp: any) => {
        /* Convert timestamp to date string */
        const date = new Date(timeStamp * 1000); /* value is in milliseconds */
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ];