import { FC, useCallback, useRef } from "react";
import { Grid, styled, Paper, Box, Typography, CircularProgress } from "../../../foundations";
import { Actions } from './actions';
import Head from 'next/head'
import { IActionForm } from "./types";
import { useReactToPrint } from "react-to-print";

const FormContainer = styled("form")(({ theme }) => ({}));

export const ActionForm: FC<IActionForm> = ({ title, children, submitButton, backButton, hidePrintButton, disable, loading, helperText, actionButtons, optionActions, headerPrintLogo, afterSubmit }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: title,
        removeAfterPrint: true
    });

    return (
        <Paper component={FormContainer} sx={{ background: "none", boxShadow: "none", border: "none", borderRadius: "none" }}>
            {title && (<Head><title>{title}</title></Head>)}
            <Grid container spacing={2}>
                <Grid item xl={9} md={8} xs={12} sx={{ opacity: disable ? 0.7 : 1 }} className='print-padding print-full-width'>
                    <Box
                        sx={{ width: "100%", maxWidth: "100%", position: "relative" }}
                        ref={componentRef}
                    >
                        {headerPrintLogo && (
                            <div className='print-logo'>
                                <div style={{ display: "flex", flexDirection: "row", width: "210mm", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
                                    {headerPrintLogo}
                                    <Typography variant="h6">{title?.split("-").slice(1).join("-").trim()}</Typography>
                                </div>
                            </div>
                        )}
                        {children}
                        {loading && (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", top: "0px", left: "0px", bottom: "0px", right: "0px", position: "absolute", zIndex:15000 }}>
                                <CircularProgress variant="indeterminate" />
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid item xl={3} md={4} xs={12} className='print-hide'>
                    <Actions
                        submitButton={submitButton}
                        backButton={backButton}
                        hidePrintButton={hidePrintButton}
                        disable={disable}
                        helperText={helperText}
                        actionButtons={actionButtons}
                        optionActions={optionActions}
                        handlePrint={handlePrint}
                        afterSubmit={afterSubmit}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
