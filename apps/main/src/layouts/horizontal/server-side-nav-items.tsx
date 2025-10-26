import { useEffect, useState } from 'react'
import { VerticalNavItemsType, axiosInstance } from '@mf-core/core-ui';

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])

  // useEffect(() => {
  //   axiosInstance.get('/api/vertical-nav/data').then(response => {
  //     const menuArray = response.data

  //     setMenuItems(menuArray)
  //   })
  // }, [])

  return { menuItems }
}

export default ServerSideNavItems
