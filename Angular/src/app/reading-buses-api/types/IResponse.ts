interface LiveJourneysResponseItem {
  Id: string;
  TimetableId: string;
  Operator: string;
  LineRef: string;
  JourneyPattern: string;
  RunningBoard: string;
  Duty: string;
  JourneyCode: string;
  ScheduledStart: string;
  VehicleCode: string;
  visits: IVisit[];
}
