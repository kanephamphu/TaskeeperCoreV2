export interface EducationInformation {
    trainingCompanyName: string;
    position: string;
    location: string;
    description: string;
    timePeriod: {
        type: string;
        fromTime: Date;
        toTime: Date;
    };
}
