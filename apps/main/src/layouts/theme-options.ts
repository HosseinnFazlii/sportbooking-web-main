// apps/main/src/layouts/theme-options.tsx
import { ThemeOptions, i18n } from '@mf-core/core-ui';
// ** To use core palette, uncomment the below import
// import corePalette from 'src/@core/theme/palette'

// ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
// import { useSettings } from 'src/@core/hooks/useSettings'
export const baseThemeOptions = (): ThemeOptions => {
  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  // const { settings } = useSettings()

  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  // const { mode, skin, themeColor } = settings

  // ** To use core palette, uncomment the below line
  // const palette = corePalette(mode, skin, themeColor)

  return {
    typography: {
      fontFamily:
        'iranyekan, Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    shape: {
      borderRadius: 20,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            borderRadius: 20
          }
        }
      },
      MuiTablePagination: {
        defaultProps: {
          labelRowsPerPage: i18n.t('themeOptions.tablePagination.labelRowsPerPage'),
          labelDisplayedRows: function defaultLabelDisplayedRows({ from, to, count }: { from: number; to: number; count: number }) {
            const countLabel = count !== -1
              ? `${count}`
              : i18n.t('themeOptions.tablePagination.moreThan', { to });

            return i18n.t('themeOptions.tablePagination.labelDisplayedRows', {
              from,
              to,
              countLabel,
            });
          },
        }
      },
      MuiDatePicker: {
        defaultProps: {
          dayOfWeekFormatter: (day: string) => {
            const jalaliTokens: Record<string, string> = {
              'ش': 'jalali.saturday',
              '1': 'jalali.sunday',
              '2': 'jalali.monday',
              '3': 'jalali.tuesday',
              '4': 'jalali.wednesday',
              '5': 'jalali.thursday',
              'ج': 'jalali.friday',
            };
            const gregorianTokens: Record<string, string> = {
              S: 'gregorian.s',
              M: 'gregorian.m',
              T: 'gregorian.t',
              W: 'gregorian.w',
              F: 'gregorian.f',
            };
            const firstChar = day.charAt(0);
            const token = jalaliTokens[firstChar] ?? gregorianTokens[firstChar];
            if (token) {
              const translationKey = `themeOptions.datePicker.weekdays.${token}`;
              const translated = i18n.t(translationKey);
              if (translated !== translationKey) {
                return translated;
              }
            }

            return firstChar;
          },
          slotProps: { textField: { fullWidth: true } }
        }
      },
      MuiDataGrid: {
        defaultProps: {
          autoHeight: true,
          pagination: true,
          paginationMode: 'client',
          pageSizeOptions: [10, 20, 50, 100, 250, 500],
          initialState: {
            pagination: { paginationModel: { pageSize: 10 } },
          },
          disableRowSelectionOnClick: true,
          localeText: {
            noRowsLabel: i18n.t('themeOptions.dataGrid.localeText.noRowsLabel'),
            noResultsOverlayLabel: i18n.t('themeOptions.dataGrid.localeText.noResultsOverlayLabel'),

            // Density selector toolbar button text
            toolbarDensity: i18n.t('themeOptions.dataGrid.localeText.toolbarDensity'),
            toolbarDensityLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarDensityLabel'),
            toolbarDensityCompact: i18n.t('themeOptions.dataGrid.localeText.toolbarDensityCompact'),
            toolbarDensityStandard: i18n.t('themeOptions.dataGrid.localeText.toolbarDensityStandard'),
            toolbarDensityComfortable: i18n.t('themeOptions.dataGrid.localeText.toolbarDensityComfortable'),

            // Columns selector toolbar button text
            toolbarColumns: i18n.t('themeOptions.dataGrid.localeText.toolbarColumns'),
            toolbarColumnsLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarColumnsLabel'),

            // Filters toolbar button text
            toolbarFilters: i18n.t('themeOptions.dataGrid.localeText.toolbarFilters'),
            toolbarFiltersLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarFiltersLabel'),
            toolbarFiltersTooltipHide: i18n.t('themeOptions.dataGrid.localeText.toolbarFiltersTooltipHide'),
            toolbarFiltersTooltipShow: i18n.t('themeOptions.dataGrid.localeText.toolbarFiltersTooltipShow'),
            toolbarFiltersTooltipActive: (count: number) => i18n.t('themeOptions.dataGrid.localeText.toolbarFiltersTooltipActive', { count }),

            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: i18n.t('themeOptions.dataGrid.localeText.toolbarQuickFilterPlaceholder'),
            toolbarQuickFilterLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarQuickFilterLabel'),
            toolbarQuickFilterDeleteIconLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarQuickFilterDeleteIconLabel'),

            // Export selector toolbar button text
            toolbarExport: i18n.t('themeOptions.dataGrid.localeText.toolbarExport'),
            toolbarExportLabel: i18n.t('themeOptions.dataGrid.localeText.toolbarExportLabel'),
            toolbarExportCSV: i18n.t('themeOptions.dataGrid.localeText.toolbarExportCSV'),
            toolbarExportPrint: i18n.t('themeOptions.dataGrid.localeText.toolbarExportPrint'),
            toolbarExportExcel: i18n.t('themeOptions.dataGrid.localeText.toolbarExportExcel'),

            // Columns panel text
            columnsPanelTextFieldLabel: i18n.t('themeOptions.dataGrid.localeText.columnsPanelTextFieldLabel'),
            columnsPanelTextFieldPlaceholder: i18n.t('themeOptions.dataGrid.localeText.columnsPanelTextFieldPlaceholder'),
            columnsPanelDragIconLabel: i18n.t('themeOptions.dataGrid.localeText.columnsPanelDragIconLabel'),
            columnsPanelShowAllButton: i18n.t('themeOptions.dataGrid.localeText.columnsPanelShowAllButton'),
            columnsPanelHideAllButton: i18n.t('themeOptions.dataGrid.localeText.columnsPanelHideAllButton'),

            // Filter panel text
            filterPanelAddFilter: i18n.t('themeOptions.dataGrid.localeText.filterPanelAddFilter'),
            filterPanelRemoveAll: i18n.t('themeOptions.dataGrid.localeText.filterPanelRemoveAll'),
            filterPanelDeleteIconLabel: i18n.t('themeOptions.dataGrid.localeText.filterPanelDeleteIconLabel'),
            filterPanelLogicOperator: i18n.t('themeOptions.dataGrid.localeText.filterPanelLogicOperator'),
            filterPanelOperator: i18n.t('themeOptions.dataGrid.localeText.filterPanelOperator'),
            filterPanelOperatorAnd: i18n.t('themeOptions.dataGrid.localeText.filterPanelOperatorAnd'),
            filterPanelOperatorOr: i18n.t('themeOptions.dataGrid.localeText.filterPanelOperatorOr'),
            filterPanelColumns: i18n.t('themeOptions.dataGrid.localeText.filterPanelColumns'),
            filterPanelInputLabel: i18n.t('themeOptions.dataGrid.localeText.filterPanelInputLabel'),
            filterPanelInputPlaceholder: i18n.t('themeOptions.dataGrid.localeText.filterPanelInputPlaceholder'),

            // Filter operators text
            filterOperatorContains: i18n.t('themeOptions.dataGrid.localeText.filterOperatorContains'),
            filterOperatorEquals: i18n.t('themeOptions.dataGrid.localeText.filterOperatorEquals'),
            filterOperatorStartsWith: i18n.t('themeOptions.dataGrid.localeText.filterOperatorStartsWith'),
            filterOperatorEndsWith: i18n.t('themeOptions.dataGrid.localeText.filterOperatorEndsWith'),
            filterOperatorIs: i18n.t('themeOptions.dataGrid.localeText.filterOperatorIs'),
            filterOperatorNot: i18n.t('themeOptions.dataGrid.localeText.filterOperatorNot'),
            filterOperatorAfter: i18n.t('themeOptions.dataGrid.localeText.filterOperatorAfter'),
            filterOperatorOnOrAfter: i18n.t('themeOptions.dataGrid.localeText.filterOperatorOnOrAfter'),
            filterOperatorBefore: i18n.t('themeOptions.dataGrid.localeText.filterOperatorBefore'),
            filterOperatorOnOrBefore: i18n.t('themeOptions.dataGrid.localeText.filterOperatorOnOrBefore'),
            filterOperatorIsEmpty: i18n.t('themeOptions.dataGrid.localeText.filterOperatorIsEmpty'),
            filterOperatorIsNotEmpty: i18n.t('themeOptions.dataGrid.localeText.filterOperatorIsNotEmpty'),
            filterOperatorIsAnyOf: i18n.t('themeOptions.dataGrid.localeText.filterOperatorIsAnyOf'),
            'filterOperator=': i18n.t('themeOptions.dataGrid.localeText.filterOperatorEqual'),
            'filterOperator!=': i18n.t('themeOptions.dataGrid.localeText.filterOperatorNotEqual'),
            'filterOperator>': i18n.t('themeOptions.dataGrid.localeText.filterOperatorGreaterThan'),
            'filterOperator>=': i18n.t('themeOptions.dataGrid.localeText.filterOperatorGreaterThanOrEqual'),
            'filterOperator<': i18n.t('themeOptions.dataGrid.localeText.filterOperatorLessThan'),
            'filterOperator<=': i18n.t('themeOptions.dataGrid.localeText.filterOperatorLessThanOrEqual'),

            // Header filter operators text
            headerFilterOperatorContains: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorContains'),
            headerFilterOperatorEquals: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorEquals'),
            headerFilterOperatorStartsWith: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorStartsWith'),
            headerFilterOperatorEndsWith: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorEndsWith'),
            headerFilterOperatorIs: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorIs'),
            headerFilterOperatorNot: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorNot'),
            headerFilterOperatorAfter: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorAfter'),
            headerFilterOperatorOnOrAfter: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorOnOrAfter'),
            headerFilterOperatorBefore: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorBefore'),
            headerFilterOperatorOnOrBefore: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorOnOrBefore'),
            headerFilterOperatorIsEmpty: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorIsEmpty'),
            headerFilterOperatorIsNotEmpty: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorIsNotEmpty'),
            headerFilterOperatorIsAnyOf: i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorIsAnyOf'),
            'headerFilterOperator=': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorEqual'),
            'headerFilterOperator!=': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorNotEqual'),
            'headerFilterOperator>': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorGreaterThan'),
            'headerFilterOperator>=': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorGreaterThanOrEqual'),
            'headerFilterOperator<': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorLessThan'),
            'headerFilterOperator<=': i18n.t('themeOptions.dataGrid.localeText.headerFilterOperatorLessThanOrEqual'),

            // Filter values text
            filterValueAny: i18n.t('themeOptions.dataGrid.localeText.filterValueAny'),
            filterValueTrue: i18n.t('themeOptions.dataGrid.localeText.filterValueTrue'),
            filterValueFalse: i18n.t('themeOptions.dataGrid.localeText.filterValueFalse'),

            // Column menu text
            columnMenuLabel: i18n.t('themeOptions.dataGrid.localeText.columnMenuLabel'),
            columnMenuShowColumns: i18n.t('themeOptions.dataGrid.localeText.columnMenuShowColumns'),
            columnMenuManageColumns: i18n.t('themeOptions.dataGrid.localeText.columnMenuManageColumns'),
            columnMenuFilter: i18n.t('themeOptions.dataGrid.localeText.columnMenuFilter'),
            columnMenuHideColumn: i18n.t('themeOptions.dataGrid.localeText.columnMenuHideColumn'),
            columnMenuUnsort: i18n.t('themeOptions.dataGrid.localeText.columnMenuUnsort'),
            columnMenuSortAsc: i18n.t('themeOptions.dataGrid.localeText.columnMenuSortAsc'),
            columnMenuSortDesc: i18n.t('themeOptions.dataGrid.localeText.columnMenuSortDesc'),

            // Column header text
            columnHeaderFiltersTooltipActive: (count: number) => i18n.t('themeOptions.dataGrid.localeText.columnHeaderFiltersTooltipActive', { count }),
            columnHeaderFiltersLabel: i18n.t('themeOptions.dataGrid.localeText.columnHeaderFiltersLabel'),
            columnHeaderSortIconLabel: i18n.t('themeOptions.dataGrid.localeText.columnHeaderSortIconLabel'),

            // Rows selected footer text
            footerRowSelected: (count: number) => i18n.t('themeOptions.dataGrid.localeText.footerRowSelected', { count }),

            // Total row amount footer text
            footerTotalRows: i18n.t('themeOptions.dataGrid.localeText.footerTotalRows'),

            // Total visible row amount footer text
            footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
              i18n.t('themeOptions.dataGrid.localeText.footerTotalVisibleRows', {
                visibleCount: visibleCount.toLocaleString(),
                totalCount: totalCount.toLocaleString(),
              }),

            // Checkbox selection text
            checkboxSelectionHeaderName: i18n.t('themeOptions.dataGrid.localeText.checkboxSelectionHeaderName'),
            checkboxSelectionSelectAllRows: i18n.t('themeOptions.dataGrid.localeText.checkboxSelectionSelectAllRows'),
            checkboxSelectionUnselectAllRows: i18n.t('themeOptions.dataGrid.localeText.checkboxSelectionUnselectAllRows'),
            checkboxSelectionSelectRow: i18n.t('themeOptions.dataGrid.localeText.checkboxSelectionSelectRow'),
            checkboxSelectionUnselectRow: i18n.t('themeOptions.dataGrid.localeText.checkboxSelectionUnselectRow'),

            // Boolean cell text
            booleanCellTrueLabel: i18n.t('themeOptions.dataGrid.localeText.booleanCellTrueLabel'),
            booleanCellFalseLabel: i18n.t('themeOptions.dataGrid.localeText.booleanCellFalseLabel'),

            // Actions cell more text
            actionsCellMore: i18n.t('themeOptions.dataGrid.localeText.actionsCellMore'),

            // Column pinning text
            pinToLeft: i18n.t('themeOptions.dataGrid.localeText.pinToLeft'),
            pinToRight: i18n.t('themeOptions.dataGrid.localeText.pinToRight'),
            unpin: i18n.t('themeOptions.dataGrid.localeText.unpin'),

            // Tree Data
            treeDataGroupingHeaderName: i18n.t('themeOptions.dataGrid.localeText.treeDataGroupingHeaderName'),
            treeDataExpand: i18n.t('themeOptions.dataGrid.localeText.treeDataExpand'),
            treeDataCollapse: i18n.t('themeOptions.dataGrid.localeText.treeDataCollapse'),

            // Grouping columns
            groupingColumnHeaderName: i18n.t('themeOptions.dataGrid.localeText.groupingColumnHeaderName'),
            groupColumn: (name: string) => i18n.t('themeOptions.dataGrid.localeText.groupColumn', { name }),
            unGroupColumn: (name: string) => i18n.t('themeOptions.dataGrid.localeText.unGroupColumn', { name }),

            // Master/detail
            detailPanelToggle: i18n.t('themeOptions.dataGrid.localeText.detailPanelToggle'),
            expandDetailPanel: i18n.t('themeOptions.dataGrid.localeText.expandDetailPanel'),
            collapseDetailPanel: i18n.t('themeOptions.dataGrid.localeText.collapseDetailPanel'),

            // Used core components translation keys
            MuiTablePagination: {},

            // Row reordering text
            rowReorderingHeaderName: i18n.t('themeOptions.dataGrid.localeText.rowReorderingHeaderName'),

            // Aggregation
            aggregationMenuItemHeader: i18n.t('themeOptions.dataGrid.localeText.aggregationMenuItemHeader'),
            aggregationFunctionLabelSum: i18n.t('themeOptions.dataGrid.localeText.aggregationFunctionLabelSum'),
            aggregationFunctionLabelAvg: i18n.t('themeOptions.dataGrid.localeText.aggregationFunctionLabelAvg'),
            aggregationFunctionLabelMin: i18n.t('themeOptions.dataGrid.localeText.aggregationFunctionLabelMin'),
            aggregationFunctionLabelMax: i18n.t('themeOptions.dataGrid.localeText.aggregationFunctionLabelMax'),
            aggregationFunctionLabelSize: i18n.t('themeOptions.dataGrid.localeText.aggregationFunctionLabelSize'),
          }
        }
      }
    },
    palette: {
      primary: {
        light: '#2323AC33',
        main: '#2323AC',
        dark: '#1313BC',
      }
    },
    /*
    palette:{
      primary: {
        light: '#9E69FD',
        main: '#9155FD',
        dark: '#804BDF',
        contrastText: '#FFF'
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          textSizeSmall: {
            padding: '7px 12px'
          },
          textSizeMedium: {
            padding: '9px 16px'
          },
          textSizeLarge: {
            padding: '12px 16px'
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: '16px 24px'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px 24px',
            '&:last-child': {
              paddingBottom: '32px'
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box'
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }
        }
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily:
        '"iranyekan","Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    shadows: mode === 'light' ? [
      'none',
      '0px 2px 1px -1px rgba(58, 53, 65, 0.2), 0px 1px 1px 0px rgba(58, 53, 65, 0.14), 0px 1px 3px 0px rgba(58, 53, 65, 0.12)',
      '0px 3px 1px -2px rgba(58, 53, 65, 0.2), 0px 2px 2px 0px rgba(58, 53, 65, 0.14), 0px 1px 5px 0px rgba(58, 53, 65, 0.12)',
      '0px 4px 8px -4px rgba(58, 53, 65, 0.42)',
      '0px 6px 18px -8px rgba(58, 53, 65, 0.56)',
      '0px 3px 5px -1px rgba(58, 53, 65, 0.2), 0px 5px 8px 0px rgba(58, 53, 65, 0.14), 0px 1px 14px 0px rgba(58, 53, 65, 0.12)',
      '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
      '0px 4px 5px -2px rgba(58, 53, 65, 0.2), 0px 7px 10px 1px rgba(58, 53, 65, 0.14), 0px 2px 16px 1px rgba(58, 53, 65, 0.12)',
      '0px 5px 5px -3px rgba(58, 53, 65, 0.2), 0px 8px 10px 1px rgba(58, 53, 65, 0.14), 0px 3px 14px 2px rgba(58, 53, 65, 0.12)',
      '0px 5px 6px -3px rgba(58, 53, 65, 0.2), 0px 9px 12px 1px rgba(58, 53, 65, 0.14), 0px 3px 16px 2px rgba(58, 53, 65, 0.12)',
      '0px 6px 6px -3px rgba(58, 53, 65, 0.2), 0px 10px 14px 1px rgba(58, 53, 65, 0.14), 0px 4px 18px 3px rgba(58, 53, 65, 0.12)',
      '0px 6px 7px -4px rgba(58, 53, 65, 0.2), 0px 11px 15px 1px rgba(58, 53, 65, 0.14), 0px 4px 20px 3px rgba(58, 53, 65, 0.12)',
      '0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 12px 17px 2px rgba(58, 53, 65, 0.14), 0px 5px 22px 4px rgba(58, 53, 65, 0.12)',
      '0px 7px 8px -4px rgba(58, 53, 65, 0.2), 0px 13px 19px 2px rgba(58, 53, 65, 0.14), 0px 5px 24px 4px rgba(58, 53, 65, 0.12)',
      '0px 7px 9px -4px rgba(58, 53, 65, 0.2), 0px 14px 21px 2px rgba(58, 53, 65, 0.14), 0px 5px 26px 4px rgba(58, 53, 65, 0.12)',
      '0px 8px 9px -5px rgba(58, 53, 65, 0.2), 0px 15px 22px 2px rgba(58, 53, 65, 0.14), 0px 6px 28px 5px rgba(58, 53, 65, 0.12)',
      '0px 8px 10px -5px rgba(58, 53, 65, 0.2), 0px 16px 24px 2px rgba(58, 53, 65, 0.14), 0px 6px 30px 5px rgba(58, 53, 65, 0.12)',
      '0px 8px 11px -5px rgba(58, 53, 65, 0.2), 0px 17px 26px 2px rgba(58, 53, 65, 0.14), 0px 6px 32px 5px rgba(58, 53, 65, 0.12)',
      '0px 9px 11px -5px rgba(58, 53, 65, 0.2), 0px 18px 28px 2px rgba(58, 53, 65, 0.14), 0px 7px 34px 6px rgba(58, 53, 65, 0.12)',
      '0px 9px 12px -6px rgba(58, 53, 65, 0.2), 0px 19px 29px 2px rgba(58, 53, 65, 0.14), 0px 7px 36px 6px rgba(58, 53, 65, 0.12)',
      '0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 20px 31px 3px rgba(58, 53, 65, 0.14), 0px 8px 38px 7px rgba(58, 53, 65, 0.12)',
      '0px 10px 13px -6px rgba(58, 53, 65, 0.2), 0px 21px 33px 3px rgba(58, 53, 65, 0.14), 0px 8px 40px 7px rgba(58, 53, 65, 0.12)',
      '0px 10px 14px -6px rgba(58, 53, 65, 0.2), 0px 22px 35px 3px rgba(58, 53, 65, 0.14), 0px 8px 42px 7px rgba(58, 53, 65, 0.12)',
      '0px 11px 14px -7px rgba(58, 53, 65, 0.2), 0px 23px 36px 3px rgba(58, 53, 65, 0.14), 0px 9px 44px 8px rgba(58, 53, 65, 0.12)',
      '0px 11px 15px -7px rgba(58, 53, 65, 0.2), 0px 24px 38px 3px rgba(58, 53, 65, 0.14), 0px 9px 46px 8px rgba(58, 53, 65, 0.12)'
    ] : [
      'none',
      '0px 2px 1px -1px rgba(19, 17, 32, 0.2), 0px 1px 1px 0px rgba(19, 17, 32, 0.14), 0px 1px 3px 0px rgba(19, 17, 32, 0.12)',
      '0px 3px 1px -2px rgba(19, 17, 32, 0.2), 0px 2px 2px 0px rgba(19, 17, 32, 0.14), 0px 1px 5px 0px rgba(19, 17, 32, 0.12)',
      '0px 4px 8px -4px rgba(19, 17, 32, 0.42)',
      '0px 6px 18px -8px rgba(19, 17, 32, 0.56)',
      '0px 3px 5px -1px rgba(19, 17, 32, 0.2), 0px 5px 8px rgba(19, 17, 32, 0.14), 0px 1px 14px rgba(19, 17, 32, 0.12)',
      '0px 2px 10px 0px rgba(19, 17, 32, 0.1)',
      '0px 4px 5px -2px rgba(19, 17, 32, 0.2), 0px 7px 10px 1px rgba(19, 17, 32, 0.14), 0px 2px 16px 1px rgba(19, 17, 32, 0.12)',
      '0px 5px 5px -3px rgba(19, 17, 32, 0.2), 0px 8px 10px 1px rgba(19, 17, 32, 0.14), 0px 3px 14px 2px rgba(19, 17, 32, 0.12)',
      '0px 5px 6px -3px rgba(19, 17, 32, 0.2), 0px 9px 12px 1px rgba(19, 17, 32, 0.14), 0px 3px 16px 2px rgba(19, 17, 32, 0.12)',
      '0px 6px 6px -3px rgba(19, 17, 32, 0.2), 0px 10px 14px 1px rgba(19, 17, 32, 0.14), 0px 4px 18px 3px rgba(19, 17, 32, 0.12)',
      '0px 6px 7px -4px rgba(19, 17, 32, 0.2), 0px 11px 15px 1px rgba(19, 17, 32, 0.14), 0px 4px 20px 3px rgba(19, 17, 32, 0.12)',
      '0px 7px 8px -4px rgba(19, 17, 32, 0.2), 0px 12px 17px 2px rgba(19, 17, 32, 0.14), 0px 5px 22px 4px rgba(19, 17, 32, 0.12)',
      '0px 7px 8px -4px rgba(19, 17, 32, 0.2), 0px 13px 19px 2px rgba(19, 17, 32, 0.14), 0px 5px 24px 4px rgba(19, 17, 32, 0.12)',
      '0px 7px 9px -4px rgba(19, 17, 32, 0.2), 0px 14px 21px 2px rgba(19, 17, 32, 0.14), 0px 5px 26px 4px rgba(19, 17, 32, 0.12)',
      '0px 8px 9px -5px rgba(19, 17, 32, 0.2), 0px 15px 22px 2px rgba(19, 17, 32, 0.14), 0px 6px 28px 5px rgba(19, 17, 32, 0.12)',
      '0px 8px 10px -5px rgba(19, 17, 32, 0.2), 0px 16px 24px 2px rgba(19, 17, 32, 0.14), 0px 6px 30px 5px rgba(19, 17, 32, 0.12)',
      '0px 8px 11px -5px rgba(19, 17, 32, 0.2), 0px 17px 26px 2px rgba(19, 17, 32, 0.14), 0px 6px 32px 5px rgba(19, 17, 32, 0.12)',
      '0px 9px 11px -5px rgba(19, 17, 32, 0.2), 0px 18px 28px 2px rgba(19, 17, 32, 0.14), 0px 7px 34px 6px rgba(19, 17, 32, 0.12)',
      '0px 9px 12px -6px rgba(19, 17, 32, 0.2), 0px 19px 29px 2px rgba(19, 17, 32, 0.14), 0px 7px 36px 6px rgba(19, 17, 32, 0.12)',
      '0px 10px 13px -6px rgba(19, 17, 32, 0.2), 0px 20px 31px 3px rgba(19, 17, 32, 0.14), 0px 8px 38px 7px rgba(19, 17, 32, 0.12)',
      '0px 10px 13px -6px rgba(19, 17, 32, 0.2), 0px 21px 33px 3px rgba(19, 17, 32, 0.14), 0px 8px 40px 7px rgba(19, 17, 32, 0.12)',
      '0px 10px 14px -6px rgba(19, 17, 32, 0.2), 0px 22px 35px 3px rgba(19, 17, 32, 0.14), 0px 8px 42px 7px rgba(19, 17, 32, 0.12)',
      '0px 11px 14px -7px rgba(19, 17, 32, 0.2), 0px 23px 36px 3px rgba(19, 17, 32, 0.14), 0px 9px 44px 8px rgba(19, 17, 32, 0.12)',
      '0px 11px 15px -7px rgba(19, 17, 32, 0.2), 0px 24px 38px 3px rgba(19, 17, 32, 0.14), 0px 9px 46px 8px rgba(19, 17, 32, 0.12)'
    ],
    zIndex: {
      appBar: 1200,
      drawer: 1100
    } */
  }
}
