import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import axios from 'axios';

const apiurl = process.env.REACT_APP_API_URL;

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const userToken = localStorage.getItem('authKey');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl + '/api/initial_applications/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('authKey')}`,
          }
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  

  // Define a default UI for column filter
  function DefaultColumnFilter({
    column: { filterValue, setFilter },
  }) {
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search...`}
      />
    );
  }

  const columns = useMemo(() => [
    { Header: 'Id', accessor: 'id', Filter: DefaultColumnFilter },
    { Header: 'Name', accessor: 'name', Filter: DefaultColumnFilter },       
    { Header: 'Job Post', accessor: 'job_posting', Filter: DefaultColumnFilter },
    { Header: 'Curr.Salary', accessor: 'current_salary', Filter: DefaultColumnFilter },
    { Header: 'Exp.Salary', accessor: 'expected_salary', Filter: DefaultColumnFilter },
    { Header: 'Resume', accessor: 'ts_ex', Filter: DefaultColumnFilter },
    { Header: 'Applied', accessor: 'applied_on', Filter: DefaultColumnFilter },
    { Header: 'Notice Period', accessor: 'notice_period_length', Filter: DefaultColumnFilter },
    { Header: 'Tot.Exp', accessor: 'total_years_exp', Filter: DefaultColumnFilter },
    { Header: 'Email', accessor: 'email', Filter: DefaultColumnFilter },
    { Header: 'Phone', accessor: 'phone_number', Filter: DefaultColumnFilter },
    { Header: 'Resume', accessor: 'resume', Filter: DefaultColumnFilter },
    { Header: 'Status', accessor: 'user_current_status', Filter: DefaultColumnFilter },
    { Header: 'Comments', accessor: 'comments', Filter: DefaultColumnFilter },
    
    
    // Add more columns as needed
  ], []);

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
      data: candidates,
      initialState: { pageIndex: 0 },
    },
    useFilters, // This hook is for column filters
    useSortBy,   // This hook is for sorting columns
    usePagination // This hook is for pagination
  );

  // Pagination controls component
  const Pagination = () => (
    <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map(size => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <table {...getTableProps()} className='table table-striped' style={{tablelayout: 'fixed'}}>
        <thead style={{border: '1px solid#ccc'}}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{fontSize:'12px'}}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Render the column filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{fontSize:'14px'}}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default CandidateList;
