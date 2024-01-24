import React from 'react';

const DynamicTable = ({ data }) => {
debugger;
    if (data && data.error) {
        return <div>Error: {data.error}</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    // Extract column headers (keys of the object)
    const columns = Object.keys(data[0]);

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;
