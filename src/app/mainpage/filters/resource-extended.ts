import { Resource } from '../monitors/Resource';

export interface ResourceExtended extends Resource {
  monitorName: string;
}
