import { TPublicationType } from './publication.dto';

export class PublicationUpdateDTO {
  description?: string;
  pictures?: string[];
  publicationType?: TPublicationType;
  endTimeStamp?: string;
  siteUrl?: string;
}
