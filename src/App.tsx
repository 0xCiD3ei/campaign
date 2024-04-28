import React, {useContext, useEffect} from 'react';
import './App.css';
import {Box, Button, Card, Tab, Tabs, Typography} from "@mui/material";
import CustomTabPanel from "./components/share-components/CustomTabPanel";
import {navigationConfigs} from "./configs/app.config";
import Campaign from "./components/app-components/Campaign";
import SubCampaign from "./components/app-components/SubCampaign";
import {CampaignContext} from "./contexts/CampaignContext";
import {CampaignInformation, SubCampaign as SubCampaignType} from "./types/campaign.type";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tab, setTab] = React.useState(0);
  const {campaign, handleValidation, removeValidation} = useContext(CampaignContext);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  
  useEffect(() => {
    if(campaign.hasError) {
      alert('Vui lòng điền đúng và đầy đủ thông tin');
      removeValidation();
    }
  }, [campaign.hasError]);
  
  useEffect(() => {
    if(campaign.validation) {
      alert(JSON.stringify(showDataCampaign()));
      removeValidation();
    }
  }, [campaign.validation]);
  const showDataCampaign = () => {
    const { name, describe } = campaign.information;
    const information: CampaignInformation = { name, describe };
    const subCampaigns: SubCampaignType[] = campaign.subCampaigns.map((sub) => {
      const { ads, name, status } = sub;
      const adsFormat = ads.map(({ name, quantity }) => ({ name, quantity }));
      return { name, status, ads: adsFormat };
    });
    return { information, subCampaigns };
  }
  
  const handleSubmit = () => {
    handleValidation();
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
