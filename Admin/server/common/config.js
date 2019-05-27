import { config as mainConfig } from '../../../server/common/config'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

export const config = {
  ...mainConfig,
  bannersUpload: path.join(process.cwd(), isDev ? './BANNERS' : './podsolnux/BANNERS')
}