export const GRAPHQL = '/bitflow/graphql';

export enum DownloadStatus {
  Queued = 'QUEUED',
  Downloading = 'DOWNLOADING',
  Failed = 'FAILED',
  Completed = 'COMPLETED',
}
