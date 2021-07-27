export type TPublicationType = 'post' | 'story';
export type TPublicationStatus = 'active' | 'deleted';

export class PublicationDTO {
  _id: string;
  user: string;
  descritpion: string;
  pictures: string[];
  publicationType: TPublicationType;

  publishedTimeStamp: string;
  lastChangedTimeStamp: string;
  endTimeStamp: string | undefined;

  siteUrl: string | null;
  status: TPublicationStatus;
}
