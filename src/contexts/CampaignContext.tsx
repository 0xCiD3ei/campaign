import React, {useState} from 'react';
import {Campaign, CampaignError, SubCampaignError} from "../types/campaign.type";

interface CampaignProviderProps {
	children: React.ReactNode
}

interface CampaignContextProps {
	campaign: CampaignError;
	selectedSub: number;
	handleAddSubCampaign: () => void;
	handleListSubCampaign: (id: number) => void;
	handleUpdateSubCampaign: (value: SubCampaignError) => void;
	handleOnchangeCampaign: (value: string, name: string) => void;
}


export const CampaignContext = React.createContext<CampaignContextProps>({} as CampaignContextProps);

const initializeCampaign: CampaignError = {
	information: {
		name: "",
		describe: "",
		error: "",
	},
	subCampaigns: [{
		id: 1,
		name: "Chiến dịch con 1",
		status: true,
		error: "",
		ads: [
			{
				id: 1,
				name: "Quảng cáo 1",
				quantity: 0,
				nameError: "",
				quantityError: "",
			},
		],
	}],
	validation: false,
	hasError: false,
}
export const CampaignProvider = ({children}: CampaignProviderProps) => {
	const [campaign, setCampaign] = useState<CampaignError>(initializeCampaign);
	const [selectedSub, setSelectedSub] = useState<number>(1);
	
	console.log("campaign-----", campaign);
	
	// const handleAddAd = (index: number) => {
	// 	const newAd: Ad = { name: `Quảng cáo `, quantity: 0 };
	// 	const newSubCampaigns = [...campaign.subCampaigns];
	// 	newSubCampaigns[index].ads.push(newAd);
	// 	setCampaign({ ...campaign, subCampaigns: newSubCampaigns });
	// };
	
	const handleOnchangeCampaign = (value: string, name: string) => {
		setCampaign({ ...campaign, information: { ...campaign.information, [name]: value }});
	}
	
	const handleAddSubCampaign = () => {
		setCampaign((prev) => ({
			...prev,
			subCampaigns: [
				...prev.subCampaigns,
				{
					id: prev.subCampaigns.length + 1,
					name: `Chiến dịch con ${prev.subCampaigns.length + 1}`,
					status: true,
					error: "",
					ads: [
						{
							id: 1,
							name: "Quảng cáo 1",
							quantity: 0,
							nameError: "",
							quantityError: "",
						},
					],
				},
			]}
		))
		
		setSelectedSub(campaign.subCampaigns.length + 1);
	};
	
	const handleListSubCampaign = (id: number) => {
		setSelectedSub(id)
	}
	
	const handleUpdateSubCampaign = (value: any) => {
		console.log(value);
		const subCampaignIndex = campaign.subCampaigns.findIndex(sub => sub.id === value.id);
		if (subCampaignIndex !== -1) {
			const updatedSubCampaigns = [...campaign.subCampaigns];
			updatedSubCampaigns[subCampaignIndex] = value;
			console.log(updatedSubCampaigns);
				setCampaign(prevCampaign => ({
					...prevCampaign,
					subCampaigns: updatedSubCampaigns
				}));
		}
	}
	
	return (
		<CampaignContext.Provider value={{
			campaign,
			selectedSub,
			handleAddSubCampaign,
			handleListSubCampaign,
			handleUpdateSubCampaign,
			// handleAddAd,
			handleOnchangeCampaign
		}}>
			{children}
		</CampaignContext.Provider>
	)
}