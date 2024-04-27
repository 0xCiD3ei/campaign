import {Box, TextField} from "@mui/material";
import {CampaignContext} from "../../../contexts/CampaignContext";
import {useContext} from "react";

export default function Campaign() {
	const {campaign, handleOnchangeCampaign} = useContext(CampaignContext)
	return (
		<Box component="form">
			<TextField
				margin="normal"
				id="name"
				required
				fullWidth
				error={!!campaign.information.error}
				helperText={campaign.information.error}
				label="Tên chiến dịch"
				variant="outlined"
				value={campaign.information.name}
				onChange={(e) => handleOnchangeCampaign(e.target.value, "name")}
				autoFocus
			/>
			<TextField
				margin="normal"
				id="describe"
				fullWidth
				label="Mô tả chiến dịch"
				variant="outlined"
				multiline
				value={campaign.information.describe}
				onChange={(e) => handleOnchangeCampaign(e.target.value, "describe")}
				rows={4}
			/>
		</Box>
	)
}