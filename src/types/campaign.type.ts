export interface Ad {
	name: string;
	quantity?: number;
}

export interface SubCampaign {
	name: string;
	status: boolean;
	ads: Ad[];
}

export interface CampaignInformation {
	name: string;
	describe?: string;
}

export interface Campaign {
	information: CampaignInformation;
	subCampaigns: SubCampaign[];
}

export interface Error {
	error: string;
}

export interface AdError extends Ad {
	id?: string;
	nameError?: string;
	quantityError?: string;
}

export interface CampaignInformationError extends CampaignInformation, Error {}

export interface SubCampaignError extends SubCampaign, Error {
	id: number,
	ads: AdError[]
}

export interface CampaignError  {
	information: CampaignInformationError;
	subCampaigns: SubCampaignError[];
	validation: boolean;
	hasError: boolean;
}





