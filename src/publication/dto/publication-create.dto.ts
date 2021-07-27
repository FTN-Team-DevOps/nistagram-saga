import { TPublicationType } from './publication.dto';

export class PublicationCreateDTO {
  descritpion: string;
  pictures: string[];
  publicationType: TPublicationType;
  endTimeStamp?: string;
  siteUrl?: string;
}
