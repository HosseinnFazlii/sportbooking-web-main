
import { FC, ReactNode } from 'react';
import { Box, Button, TextField } from '../../../foundations';
import { Link, Icon, IconifyIcon } from "../../atoms";

interface IGridHeader {
  // selectedRows: GridRowId[]
  handleSearch: (val: string) => void;
  handlePrint: () => void;
  handleExportExcel: () => Promise<void>;
  handleReload: () => void;
  hidePrintButton?: boolean;
  hideExportExcelButton?: boolean;
  hideFastSearch?: boolean;
  hideReloadButton?: boolean;
  exporting?: boolean;
  newRecordButton?: {
    url: string,
    label: string,
    icon?: string | IconifyIcon
  }
  actionsComponent?: ReactNode;
  searchPlaceHolder?: string;
  displayInsideView?: boolean;
  showInsideView: () => void;
  t: (key: string) => string;
}

export const GridHeader: FC<IGridHeader> = ({ t, newRecordButton, handleSearch, handlePrint, handleExportExcel, handleReload, hidePrintButton, hideExportExcelButton, hideFastSearch, hideReloadButton, exporting, actionsComponent, searchPlaceHolder, displayInsideView, showInsideView }) => {
  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      className='print-hide'
    >
      {!hideFastSearch && (
        <TextField
          sx={{ minWidth: "30%", height: "100%", borderRadius: "0px", border: "none" }}
          label={t("grid.fast_search")}
          placeholder={searchPlaceHolder}
          onChange={e => handleSearch(e.target.value)}
        />)}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {!hideReloadButton && (<Button sx={{ mr: 4, mb: 2 }} variant="outlined" onClick={handleReload} startIcon={<Icon icon="mdi:reload" />}>{t("grid.reload")}</Button>)}
        {!hidePrintButton && (<Button sx={{ mr: 4, mb: 2 }} variant="outlined" onClick={handlePrint} startIcon={<Icon icon="mdi:printer-outline" />}>{t("grid.print")}</Button>)}
        {!hideExportExcelButton && (<Button disabled={Boolean(exporting)} sx={{ mr: 4, mb: 2 }} variant="outlined" onClick={handleExportExcel} startIcon={<Icon icon="mdi:file-excel-outline" />}>{t("grid.export_excel")}</Button>)}
        {newRecordButton && (
          <Button
            variant='contained'
            sx={{ mr: 4, mb: 2 }}
            {...(displayInsideView ? {
              onClick: showInsideView
            } : {
              component: Link,
              href: newRecordButton.url
            })}
            startIcon={<Icon icon={newRecordButton.icon || "mdi:plus"} />}
          >
            {newRecordButton.label}
          </Button>
        )}
        {actionsComponent}
      </Box>
    </Box>
  )
}
