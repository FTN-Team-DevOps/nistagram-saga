type TPublicationType = 'post' | 'story';
type TPublicationStatus = 'active' | 'deleted';

export class PublicationDTO {
  id: string;
  user: string;
  descritpion: string;
  pictures: string[];
  publicationType: TPublicationType;

  publishedTimeStamp: string;
  lastChangedTimeStamp: string;
  endTimeStamp: string | undefined;

  locations: string[];
  siteUrl: string | null;
  status: TPublicationStatus;
}
