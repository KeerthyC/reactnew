import { GridToolbarContainer, GridToolbar } from '@mui/x-data-grid-pro';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CustomToolbarWithDropdown({ jobTitles, onJobTitleChange }) {
  return (
    <GridToolbarContainer>
      <GridToolbar />
      <Select
        label="Job Title"
        onChange={(event) => onJobTitleChange(event.target.value)}
        defaultValue=""
        style={{ marginLeft: 16 }} // Add some spacing
      >
        <MenuItem value="">All</MenuItem>
        {jobTitles.map((jobTitle, index) => (
          <MenuItem key={index} value={jobTitle}>{jobTitle}</MenuItem>
        ))}
      </Select>
      {/* You can add more custom toolbar items here if needed */}
    </GridToolbarContainer>
  );
}
