import filesize from '@/services/filesize';

export default function(value: number) {
  return filesize(value);
}
