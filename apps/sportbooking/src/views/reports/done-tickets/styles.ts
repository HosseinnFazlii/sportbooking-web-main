import { CardContent, TableCell, styled } from "@mf-core/core-ui";

export const FirstPageContent = styled(CardContent)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}));

export const PageContent = styled(CardContent)(() => ({
    display: "flex",
    flexDirection: "column",
}));

export const RowNumberCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "1.5rem"
});

export const IdCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "3rem"
});

export const TitleCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "13rem"
});

export const CreatorCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "5rem"
});

export const DateCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "5rem"
});

export const TimeCellHead = styled("div")({
    textOverflow: "ellipsis",
    width: "2rem"
});

export const TimeCell = styled("div")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "2rem"
});

export const StyledTableCell = styled(TableCell)(() => ({
    color: "#333 !important",
    borderColor:"#3333331f !important"
}));