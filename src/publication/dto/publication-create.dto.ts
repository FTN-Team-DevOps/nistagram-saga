import { TPublicationType } from './publication.dto';

export class PublicationCreateDTO {
  description: string;
  pictures: string[];
  publicationType: TPublicationType;
  endTimeStamp?: string;
  siteUrl?: string;
}
