import React, { ReactNode } from 'react'

interface SideMenuDTO {
  label: string
  key: string
  icon: ReactNode
  children?: SideMenuDTO[]
}

export default SideMenuDTO
