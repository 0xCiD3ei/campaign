import {Box, IconButton, Toolbar, Tooltip, Typography, useTheme} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, {useContext} from "react";
import {AdError, SubCampaignError} from "../../../../types/campaign.type";
import {CampaignContext} from "../../../../contexts/CampaignContext";
import { v4 as uuidv4 } from 'uuid';
interface EnhancedTableToolbarProps {
	numSelected: number;
	selectedId?: string[];
	subCampaign?: SubCampaignError;
	rows: AdError[];
	onDeleteAds: () => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const {handleAddAd, handleDeleteAllAds} = useContext(CampaignContext);
	const { numSelected, selectedId, subCampaign, rows, onDeleteAds } = props;
	const theme = useTheme();
	
	const handleAddRow = () => {
		const newRow = {
			id: uuidv4(),
			name: `Quảng cáo ${rows.length + 1}`,
			quantity: 0,
			nameError: '',
			quantityError: ''
		};
		
		handleAddAd(subCampaign?.id as number, newRow);
	};
	
	return (
		<Toolbar sx={{
			paddingRight: theme.spacing(8)
		}}>
			<div style={{flex: "0 0 auto"}}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="h6">
						{numSelected} đã chọn
					</Typography>
				) : (
					<Typography variant="h6" id="tableTitle">
						Quảng cáo
					</Typography>
				)}
			</div>
			<div style={{flex: "1 1 100%"}} />
			<Box sx={{
				color: theme.palette.text.secondary
			}}>
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton aria-label="Delete" onClick={onDeleteAds}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Add advertisement">
						<IconButton aria-label="add-sub-ad" onClick={handleAddRow}>
							<AddIcon />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</Toolbar>
	);
};