import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import DeleteIcon from '@material-ui/icons/Delete'
import HomeIcon from '@material-ui/icons/Home'

import { ContentKind, ContentKindContext } from './App'
import { DRAWER_WIDTH } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: 'transparent',
      borderRight: '0',
      width: DRAWER_WIDTH,
    },
    drawer: {
      width: DRAWER_WIDTH,
    },
    drawerItem: {},
  })
)

const DrawerItems = (): React.ReactElement => {
  const { setKind } = React.useContext(ContentKindContext)

  interface IItem {
    name: string
    icon: React.ReactElement
    func: React.MouseEventHandler
  }
  const items: Array<IItem> = [
    {
      name: 'Home',
      icon: <HomeIcon />,
      func: () => {
        setKind(ContentKind.Home)
      },
    },
    {
      name: 'Trash',
      icon: <DeleteIcon />,
      func: () => {
        setKind(ContentKind.Trash)
      },
    },
  ]

  return (
    <div role="presentation">
      <List>
        {items.map((item) => (
          <ListItem button key={item.name} onClick={item.func}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} color="inherit" />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

type Props = {
  open: boolean
}
const LeftDrawer: React.FC<Props> = ({ open }) => {
  const classes = useStyles()
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      elevation={0}
      classes={{ paper: classes.paper }}
      className={classes.drawer}>
      <Toolbar />
      {DrawerItems()}
    </Drawer>
  )
}

export default LeftDrawer
