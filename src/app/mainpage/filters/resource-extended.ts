import { Resource } from '../monitors/resource';

export interface ResourceExtended extends Resource {
  monitorName: string;
}
