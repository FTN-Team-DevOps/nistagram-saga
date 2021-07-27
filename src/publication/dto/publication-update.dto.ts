import { TPublicationType } from './publication.dto';

export class PublicationUpdateDTO {
  descritpion?: string;
  pictures?: string[];
  publicationType?: TPublicationType;
  endTimeStamp?: string;
  siteUrl?: string;
}
