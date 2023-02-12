import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import StorageHttpEntity from '../../model/httpEntites/StorageHttpEntity'

/**
 * File sample for Open API generation with tsoa
 */
export const fileExample: FileHttpEntity = {
  uuid: '146fb209-af3b-4c67-863a-a98b641c95e5',
  name: 'picture.jpg',
  mimeType: 'image/jpeg',
  size: 10578,
  hash: '7f4fd6614997f869edf8578d81ceba9f',
  downloadCount: 10,
  createdAt: new Date('2023-01-01T00:00:00.000Z'),
  url: 'https://exemple.com/files/146fb209-af3b-4c67-863a-a98b641c95e5'
}

export const storageExample: StorageHttpEntity = {
  totalSpace: 5368709120,
  usedSpace: 2147483648,
  availableSpace: 3221225472,
  storagePath: '/open-artifactory/data/files'
}
