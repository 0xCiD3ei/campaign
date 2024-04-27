import React, {useState} from 'react';
import {AdError, Campaign, CampaignError, SubCampaignError} from "../types/campaign.type";

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
	handleAddAd: (subId: number, value: AdError) => void;
	handleUpdateAd: (subId: number, value: AdError) => void;
	handleDeleteAd: (subId: number, adId: number) => void;
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
		const subCampaignIndex = campaign.subCampaigns.findIndex(sub => sub.id === value.id);
		if (subCampaignIndex !== -1) {
			const updatedSubCampaigns = [...campaign.subCampaigns];
			updatedSubCampaigns[subCampaignIndex] = value;
				setCampaign(prevCampaign => ({
					...prevCampaign,
					subCampaigns: updatedSubCampaigns
				}));
		}
	}
	
	const handleAddAd = (subId: number, value: AdError) => {
		const subCampaignIndex = campaign.subCampaigns.findIndex(sub => sub.id === subId);
		if (subCampaignIndex !== -1) {
			const updatedSubCampaigns = [...campaign.subCampaigns];
			updatedSubCampaigns[subCampaignIndex] = {
				...updatedSubCampaigns[subCampaignIndex],
				ads: [
					...updatedSubCampaigns[subCampaignIndex].ads,
					value
				]
			};
			setCampaign(prevCampaign => ({
				...prevCampaign,
				subCampaigns: updatedSubCampaigns
			}));
		}
	}
	
	const handleUpdateAd = (subId: number, updatedAd: AdError) => {
		setCampaign(prevCampaign => ({
			...prevCampaign,
			subCampaigns: prevCampaign.subCampaigns.map(subCampaign => {
				if (subCampaign.id === subId) {
					return {
						...subCampaign,
						ads: subCampaign.ads.map(ad => {
							if (ad.id === updatedAd.id) {
								return {
									...ad,
									name: updatedAd.name,
									quantity: updatedAd.quantity,
								};
							}
							return ad;
						})
					};
				}
				return subCampaign;
			})
		}));
	};
	
	const handleDeleteAd = (subId: number, adId: number) => {
		setCampaign(prevCampaign => ({
			...prevCampaign,
			subCampaigns: prevCampaign.subCampaigns.map(subCampaign => {
				if (subCampaign.id === subId) {
					return {
						...subCampaign,
						ads: subCampaign.ads.filter(ad => ad.id !== adId)
					};
				}
				return subCampaign;
			})
		}));
	};
	
	return (
		<CampaignContext.Provider value={{
			campaign,
			selectedSub,
			handleAddSubCampaign,
			handleListSubCampaign,
			handleUpdateSubCampaign,
			handleOnchangeCampaign,
			handleAddAd,
			handleUpdateAd,
			handleDeleteAd
		}}>
			{children}
		</CampaignContext.Provider>
	)
}