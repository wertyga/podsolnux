import { config as mainConfig } from '../../../server/common/config'
import path from 'path'

export const config = {
  ...mainConfig,
  bannersUpload: path.join(process.cwd(), './BANNERS')
}