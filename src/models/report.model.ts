import { Entity, model, property } from '@loopback/repository';

@model()
export class Report extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  reportID?: number;

  @property({
    type: 'string',
    required: true,
  })
  staffID: string;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;


  constructor(data?: Partial<Report>) {
    super(data);
  }
}

export interface ReportRelations {
  // describe navigational properties here
}

export type ReportWithRelations = Report & ReportRelations;
