import React, {useContext} from 'react';
import './App.css';
import {Box, Button, Card, Tab, Tabs, Typography} from "@mui/material";
import CustomTabPanel from "./components/share-components/CustomTabPanel";
import {navigationConfigs} from "./configs/app.config";
import Campaign from "./components/app-components/Campaign";
import SubCampaign from "./components/app-components/SubCampaign";
import {CampaignContext} from "./contexts/CampaignContext";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tab, setTab] = React.useState(0);
  const {campaign} = useContext(CampaignContext);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  
  const handleSubmit = () => {
    alert(JSON.stringify(campaign));
  }
  
  return (
    <div className="app">
      <Typography className="title" variant="h4">campaign</Typography>
      <Card sx={{  maxWidth: 500, margin: '0 auto'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="tab-campaign">
            {navigationConfigs.map(ele => (
              <Tab key={ele.id} label={ele.label} {...a11yProps(ele.id)} />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          <Campaign />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <SubCampaign />
        </CustomTabPanel>
      </Card>
      <Box sx={{ margin: '16px auto 0', textAlign: 'center'}}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
}



export default App;
