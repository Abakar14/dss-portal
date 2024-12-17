import { ReportType } from "./enums/report-type";

export interface ReportRequest {

    studentIds: number[];
    columnsToDisplay: string[];
    type: ReportType;
}
