import { TPublicationType } from './publication.dto';

export class PublicationSearchDTO {
  _id?: string;
  user?: string;
  publicationType?: TPublicationType;
}
