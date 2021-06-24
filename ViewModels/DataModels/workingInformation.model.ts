export interface WorkingInformation {
    companyName: string;
    position: string;
    location: string;
    description: string;
    timePeriod: {
        type: string;
        fromTime: Date;
        toTime: Date;
    };
}
