export type DateDetails = {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
    dayOfYear: number;
    dayNumber: number;
  };
  
  export type Campaign = {
    campaignId: string;
    id: number;
    campaignName: string;
    universityId: string;
    universityName: string;
    startDate: DateDetails;
    endDate: DateDetails;
    createDate: string;
    modifyDate: string;
    status: string;
  };
  