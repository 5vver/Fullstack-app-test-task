import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import {fetchBooksWithAuthorsHandler} from "@src/http/booksAPI.jsx";
import CreateBookTab from "./book-helpers/CreateBookTab.jsx";
import {Grid} from "@mui/material";
import DeleteBookButton from "./book-helpers/DeleteBookButton.jsx";
import UpdateBookTab from "./book-helpers/UpdateBookTab.jsx";

const BooksTable = () => {

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: false,
      filter: false,
    },
    rowModelType: 'infinite',
    pagination: true,
    paginationPageSize: 10,
    cacheBlockSize: 10,
    rowSelection: 'single',
    suppressRowDeselection: true
  };

  const columnDefs = [
    { headerName: 'Book Title', field: 'title', sortable: false, flex: 1 },
    { headerName: 'Publication Date', field: 'publication_date', sortable: false, flex: 1 },
    { headerName: 'Pages', field: 'pages', sortable: false, flex: 1 },
    { headerName: 'Price', field: 'price', sortable: false, flex: 1 },
    { headerName: 'Author', field: 'name', sortable: false, flex: 1 },
  ];

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '540px', width: '1000px' }), []);

  const onGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (params) => {
        const pageNumber = params.startRow / 10 + 1;
        const limit = params.endRow - params.startRow;

        try {
          const response = await fetchBooksWithAuthorsHandler(limit, pageNumber)
          if (response.rows.length > 0) {
            let lastRow = -1;
            if (response.count <= params.endRow) {
              lastRow = params.startRow + response.rows.length;
            }
            params.successCallback(response.rows, lastRow);
          } else {
            console.warn('Received empty response from server');
          }

        } catch (error) {
          params.failCallback();
        }
      },

      destroy: () => {
        console.log('Datasource destroyed');
      },
    };

    setGridColumnApi(params.columnApi);
    setGridApi(params.api)
    params.api.setDatasource(dataSource);
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);

  const cellClickedListener = useCallback( event => {
    setSelectedRow(event)
  }, []);

  return (
    <div style={containerStyle}>
      <div
        className="ag-theme-alpine"
        style={gridStyle}
      >
        <AgGridReact
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          onCellClicked={cellClickedListener}
        ></AgGridReact>
      </div>
      <Grid container spacing={1}>
        <Grid item>
          <CreateBookTab gridApi={gridApi} />
        </Grid>
        <Grid item>
          <DeleteBookButton selectedRow={selectedRow} setSelectedRow={setSelectedRow} gridApi={gridApi} />
        </Grid>
        <Grid item>
          <UpdateBookTab selectedRow={selectedRow} setSelectedRow={setSelectedRow} gridApi={gridApi} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BooksTable;