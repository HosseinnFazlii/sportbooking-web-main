import { FC, Fragment, useEffect, ReactNode } from 'react'
import { Backdrop, BoxProps, Paper } from '../../../foundations';
import { useSettings } from "../../../hooks";

export type ISidebar = {
  show: boolean;
  onOpen?: () => void;
  children: ReactNode;
  onClose?: () => void;
  hideBackdrop?: boolean;
  backDropClick?: () => void;
  direction?: 'left' | 'right';
}

export const Sidebar: FC<BoxProps & ISidebar> = ({ sx, show, direction, children, hideBackdrop, onOpen, onClose, backDropClick }) => {
  const { settings } = useSettings();
  const handleBackdropClick = () => {
    if (backDropClick) {
      backDropClick()
    }
  }

  useEffect(() => {
    if (show && onOpen) {
      onOpen()
    }
    if (show === false && onClose) {
      onClose()
    }
  }, [onClose, onOpen, show])

  return (
    <Fragment>
      <Paper
        className="paper-sidebar"
        sx={{
          top: 0,
          minHeight: '100%',
          zIndex: 'drawer',
          position: 'absolute',
          transition: 'all 0.25s ease-in-out',
          boxShadow: "none",
          border: "none",
          backgroundColor: settings.mode === "light" ? "#F4F5FA" : (settings.skin === "bordered" ? "#333333" : "#222222"),
          ...(show ? { opacity: 1, overflow: "visible", height: "auto" } : { opacity: 0, overflow: "hidden", height: "100%" }),
          ...(direction === 'right'
            ? { left: 'auto', right: show ? 0 : '-100%' }
            : { right: 'auto', left: show ? 0 : '-100%' }),
          ...sx
        }}
      >
        {children}
      </Paper>
      {hideBackdrop ? null : (
        <Backdrop
          open={show}
          transitionDuration={250}
          onClick={handleBackdropClick}
          sx={{ position: 'absolute', zIndex: theme => theme.zIndex.drawer - 1 }}
        />
      )}
    </Fragment>
  )
}