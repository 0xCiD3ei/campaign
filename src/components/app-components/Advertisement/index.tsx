import React, {useContext, useEffect, useState} from 'react';
import {
	Checkbox,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, TextField,
} from "@mui/material";
import {AdError, SubCampaignError} from "../../../types/campaign.type";
import DeleteIcon from "@mui/icons-material/Delete";
import {CampaignContext} from "../../../contexts/CampaignContext";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

interface AdvertisementProps {
	subCampaign?: SubCampaignError
}

export default function Advertisement(props: AdvertisementProps) {
	const { handleUpdateAd, handleDeleteAd, handleDeleteAllAds} = useContext(CampaignContext);
	const {subCampaign} = props;
	const [rows, setRows] = useState<AdError[]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	
	useEffect(() => {
		if(subCampaign) {
			setRows(subCampaign.ads);
		}
	}, [subCampaign]);
	
	const handleDeleteRow = (adId: number) => {
		handleDeleteAd(subCampaign?.id as number, adId);
	}
	
	const handleClick = (id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];
		
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		
		setSelected(newSelected)
	};
	
	const handleSelectAllClick = () => {
		if (selected.length !== rows.length) {
			setSelected(rows.map(row => row.id) as number[]);
		} else {
			setSelected([]);
		}
	};
	
	const isSelected = (id: number) => selected.indexOf(id) !== -1;
	
	const handleDeleteAllRows = () => {
		handleDeleteAllAds(subCampaign?.id as number)
		setSelected([])
	}
	
	return (
		<>
			<EnhancedTableToolbar
				selectedId={selected}
				numSelected={selected.length}
				rows={rows}
				subCampaign={subCampaign}
				onDeleteAds={handleDeleteAllRows}
			/>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={selected.length > 0 && selected.length < rows.length}
									checked={selected.length === rows.length && selected.length > 0}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							<TableCell>Tên quảng cáo*</TableCell>
							<TableCell align="center">Số lượng*</TableCell>
							<TableCell align="center">Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row: AdError, index: number) => {
							const itemSelected = isSelected(row.id as number);
							return (
							<TableRow key={index}>
								<TableCell padding="checkbox">
									<Checkbox
										aria-checked={itemSelected}
										key={row.id}
										checked={itemSelected}
										onClick={() => handleClick(row?.id as number)}
									/>
								</TableCell>
								<TableCell align="center">
									<TextField
										id="name"
										required
										fullWidth
										variant="standard"
										value={row.name}
										error={!!row.nameError}
										helperText={row.nameError}
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
										error={!!row.quantityError}
										helperText={row.quantityError}
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
						)})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}