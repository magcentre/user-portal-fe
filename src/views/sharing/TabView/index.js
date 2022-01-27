import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SharedByMe from './SharedByMe';
import SharedWithMe from './SharedWithMe';

export default function FileSharingTabView() {

  const [value, setValue] = React.useState('share-with-me-files');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', marginTop: '10px' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Share with me" value="share-with-me-files" />
            <Tab label="My Shared" value="my-shared-files" />
          </TabList>
        </Box>
        <TabPanel value="shared-with-me" style={{ padding: 0 }}>
          <SharedByMe />
        </TabPanel>
        <TabPanel value="share-with-me-files" style={{ padding: 0 }}>
          <SharedWithMe />
        </TabPanel>
      </TabContext>
    </Box>
  );
}