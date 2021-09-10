import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import PushPinOutlinedIcon from '@material-ui/icons/PushPinOutlined'

import { MemoContext, MemosContext } from './ContentRegion'
import { IMemo, IMemoUpdate, MemoFactory } from '../model/Memo'
import { ApiProps, ConnectApi } from '../utility/ApiConnection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      '&:hover': {
        border: 'solid 1px dimgray',
        margin: '-1px',
      },
    },
    actionArea: {
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
    focusHighlight: {
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    fab: {
      position: 'absolute',
      top: theme.spacing(0.5),
      right: theme.spacing(0.5),
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    hidden: {
      display: 'none',
    },
  })
)

type Props = { memo: IMemo }
const MemoCard: React.FC<Props> = ({ memo }) => {
  const classes = useStyles()
  const [isMouseOver, setIsMouseOver] = React.useState(false)
  const { setMemos } = React.useContext(MemosContext)
  const removeMemo = (removedMemo: IMemo) => {
    setMemos((prev) => prev.filter((item) => item !== removedMemo))
  }
  const { setMemo } = React.useContext(MemoContext)
  const handleOpen = () => {
    setMemo(MemoFactory({ id: memo.id, text: memo.contents }))
  }

  const handleMouseEnter = () => {
    setIsMouseOver(true)
  }
  const handleMouseLeave = () => {
    setIsMouseOver(false)
  }

  const handlePinClicked = (event: React.MouseEvent) => {
    console.log('Push pin is clicked')
    // Prevent click events from going to layers below the icon
    event.stopPropagation()
  }

  const handleDeleteButton = () => {
    const memoUpdate: IMemoUpdate = {
      contents: memo.contents,
      reference: memo.reference,
      removed: true,
    }
    const props: ApiProps = {
      endpoint: `/memos/${memo.id}`,
      method: 'put',
      data: { memo: memoUpdate },
      callback: () => removeMemo(memo),
    }
    ConnectApi(props)
  }

  return (
    <Card
      className={classes.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea
        onClick={handleOpen}
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.focusHighlight,
        }}>
        <CardContent>
          <Typography display="inline" style={{ whiteSpace: 'pre-line' }}>
            {memo.contents}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isMouseOver ? (
        <div>
          <CardActions>
            <IconButton size="small" onClick={handleDeleteButton}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
          <Fab
            aria-label="delete"
            color="inherit"
            onClick={handlePinClicked}
            size="small"
            className={classes.fab}>
            <PushPinOutlinedIcon fontSize="small" />
          </Fab>
        </div>
      ) : (
        <></>
      )}
    </Card>
  )
}

export default MemoCard
