import React from 'react'
import { inject } from 'mobx-react'

const mapState = ({ execContextStore: { requestContext } }) => ({
  isMobile: requestContext.isMobile,
  isServer: requestContext.isServer,
  isClient: !requestContext.isServer,
})

const MobileComponent = ({ children, isMobile }) => isMobile ? children : null
const DesktopComponent = ({ children, isMobile }) => !isMobile ? children : null

export const Mobile = inject(mapState)(MobileComponent)
export const Desktop = inject(mapState)(DesktopComponent)