import React, {useContext, useEffect, useState} from 'react';
import {
	Box,
	Checkbox,
	FormControlLabel, IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
	TextField,
	Typography
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon  from '@mui/icons-material/Delete';
import {CampaignContext} from "../../../contexts/CampaignContext";
import {AdError, SubCampaignError} from "../../../types/campaign.type";
import Advertisement from "../Advertisement";

export default function SubCampaign() {
	const {
		campaign,
		selectedSub,
		handleAddSubCampaign,
		handleListSubCampaign,
		handleUpdateSubCampaign
	} = useContext(CampaignContext);
	const [activeSubCampaign, setActiveSubCampaign] = useState<SubCampaignError | undefined>();
	useEffect(() => {
		const subCampaign = campaign.subCampaigns.find(ele => ele.id === selectedSub);
		if (subCampaign) {
			setActiveSubCampaign(subCampaign);
		}
	}, [campaign.subCampaigns, selectedSub]);
	
	
	
	const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		handleUpdateSubCampaign({
			...activeSubCampaign,
			name: e.target.value
		} as SubCampaignError);
	}
	
	const handleOnChangeStatus = (checked: boolean) => {
		handleUpdateSubCampaign({
			...activeSubCampaign,
			status: checked
		} as SubCampaignError);
	}
	
	const isError = (subCampaign: SubCampaignError) => {
		let error = false;
		if (subCampaign.error !== "") {
			error = true;
		};
		subCampaign.ads.forEach((ads) => {
			if (ads.nameError !== "" || ads.quantityError !== "") {
				error = true;
			}
		});
		
		return error;
	};
	
	return (
		<>
			<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
				<Typography variant={"h6"}>Danh sách</Typography>
				<IconButton aria-label="add-sub-campaign" onClick={handleAddSubCampaign}>
					<AddIcon />
				</IconButton>
			</Box>
			<List sx={{ width: '100%', cursor: "pointer"}}>
				{
					campaign.subCampaigns.map(ele => (
						<ListItem
							sx={{border: isError(ele) ? '1px solid red' : ''}}
							key={ele.id}
							selected={selectedSub === ele.id}
							alignItems="flex-start" onClick={() => handleListSubCampaign(ele.id)}
						>
							<ListItemAvatar>
								<CheckCircleOutlineIcon sx={{color: ele.status ?  "green" : "grey"}} />
							</ListItemAvatar>
							<ListItemText
								primary={ele.name}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											Số lượng:
											{ele.ads.reduce((total, ad: any) => total + ad?.quantity as number, 0)}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
					))
				}
			</List>
			<Box component="form">
				<Typography variant={"h6"}>Chiến dịch con</Typography>
				<TextField
					value={activeSubCampaign?.name || ''}
					margin="normal"
					id="name"
					required
					fullWidth
					label="Tên chiến dịch con"
					variant= "standard"
					onChange={(e) => handleOnChangeInput(e)}
					autoFocus
					error={!!activeSubCampaign?.error}
					helperText={activeSubCampaign?.error}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={activeSubCampaign?.status || false}
							name="status"
						/>
					}
					label="Đang hoạt động"
					onChange={(_, checked) => handleOnChangeStatus(checked)}
				/>
			</Box>
			<Advertisement subCampaign={activeSubCampaign} />
		</>
	)
}