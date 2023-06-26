import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {createColumnDefs} from "./utils/createColumnDefs.jsx"; // Optional theme CSS

import {fetchAuthorsHandler} from "@src/http/authorsAPI.jsx";

const AuthorsTable = ({fetchDataFn}) => {

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: false,
      filter: false,
    },
    rowModelType: 'infinite',
    paginationPageSize: 10,
    cacheBlockSize: 10,
    cacheOverflowSize: 2,
    maxConcurrentDatasourceRequests: 2,
    infiniteInitialRowCount: 1,
    maxBlocksInCache: 10,
  };

  const columnDefs = [
    { headerName: 'Author', field: 'name', sortable: false, flex: 1  },
    { headerName: 'Birth Date', field: 'birth_date', sortable: false, flex: 1  },
    { headerName: 'Nationality', field: 'nationality', sortable: false, flex: 1  },
  ];

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '490px', width: '1000px' }), []);

  const onGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (params) => {
        const pageNumber = params.startRow / 10 + 1;
        const limit = params.endRow - params.startRow;

        try {
          const response = await fetchAuthorsHandler(limit, pageNumber)
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
    params.api.setDatasource(dataSource);
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
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AuthorsTable;