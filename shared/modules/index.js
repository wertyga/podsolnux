import loadable from '@loadable/component'

export const Initial = loadable(() => import('./Home/Home'))
export const About = loadable(() => import('./About/About'))
export const NotFound = loadable(() => import('./404/404'))