import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import axios from 'axios';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';



const apiurl = process.env.REACT_APP_API_URL;
const proddomain = process.env.REACT_APP_PROD_URL;



function TestsList() {
  const [products, setProducts] = useState([]);
debugger;
  // Fetch the products data

  const [tooltipText, setTooltipText] = useState('Click to copy link');


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(apiurl+'/api/testlists/');
        setProducts(response.data); // Assuming the response body is the array above
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        // Handle error state as needed
      }
    };

    fetchQuizzes();
  }, []);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );



  const handleCopy = (row) => {
    navigator.clipboard.writeText(`${proddomain}/?t=${row.original.token}`);
    setTooltipText('Copied');
    setTimeout(() => setTooltipText('Click to copy link'), 2000); // Reset tooltip text after 2 seconds
  };


  // Define a default UI for our filter
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        disableFilters: true, // disable filters for this column
      },
      {
        Header: 'Test Name',
        accessor: 'name',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Questions',
        accessor: 'question_count',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Time',
        accessor: 'time_limit',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Token',
        accessor: 'token',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Action',
        id: 'copy',
        accessor: (str) => 'copy', // This accessor is required because the cell uses row values to render custom component
        Cell: ({ row }) => (
          <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleCopy(row)}
          >
            Copy Link
          </button>
        </OverlayTrigger>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 }, // Pass our initial page index to useTable
    },
    useFilters, // This hook will add filtering functionality
    usePagination // This hook will add pagination functionality
  );

  // Render the UI for your table
  return (
    <div className="App">
      <table {...getTableProps()} className='table table-striped'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TestsList;
