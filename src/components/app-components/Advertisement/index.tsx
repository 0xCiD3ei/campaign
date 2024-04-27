import React, {useContext, useEffect, useState} from 'react';
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, TextField,
	Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AdError, SubCampaignError} from "../../../types/campaign.type";
import DeleteIcon from "@mui/icons-material/Delete";
import {CampaignContext} from "../../../contexts/CampaignContext";

interface AdvertisementProps {
	subCampaign?: SubCampaignError
}

export default function Advertisement(props: AdvertisementProps) {
	const {handleAddAd, handleUpdateAd, handleDeleteAd} = useContext(CampaignContext);
	const {subCampaign} = props;
	const [rows, setRows] = useState<AdError[]>([]);
	
	useEffect(() => {
		if(subCampaign) {
			setRows(subCampaign.ads);
		}
	}, [subCampaign]);
	const handleAddRow = () => {
		const newRow = {
			id: rows.length + 1,
			name: `Quảng cáo ${rows.length + 1}`,
			quantity: 0,
			nameError: '',
			quantityError: ''
		};
		
		handleAddAd(subCampaign?.id as number, newRow);
	};
	
	const handleDeleteRow = (adId: number) => {
		handleDeleteAd(subCampaign?.id as number, adId);
	}
	
	return (
		<>
			<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
				<Typography variant={"h6"}>Quảng cáo</Typography>
				<IconButton aria-label="add-sub-ad" onClick={handleAddRow}>
					<AddIcon />
				</IconButton>
			</Box>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Tên quảng cáo*</TableCell>
							<TableCell align="center">Số lượng*</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row: AdError, index: number) => (
							<TableRow key={index}>
								<TableCell align="center">
									<TextField
										id="name"
										required
										fullWidth
										variant="standard"
										value={row.name}
										onChange={(e) => {
											handleUpdateAd(subCampaign?.id as number, {
												...row,
												name: e.target.value,
											})
										}}
									/>
								</TableCell>
								<TableCell align="center">
									<TextField
										id="quantity"
										required
										fullWidth
										variant="standard"
										value={row.quantity}
										onChange={(e) => {
											handleUpdateAd(subCampaign?.id as number, {
												...row,
												quantity: +e.target.value,
											})
										}}
									/>
								</TableCell>
								<TableCell align="center">
									<IconButton aria-label="delete-ad" onClick={() => handleDeleteRow(row.id as number)}>
										<DeleteIcon  />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}