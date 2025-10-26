// libs/core-ui/src/components/pages/error-page/index.ts
import { FC } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, styled, BoxProps } from '../../../foundations/mui';
import { BlankLayout } from "../../../layouts/blank-layout";
import { httpCodes } from "../../../configs";
import { Link } from "../../atoms";

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: '90vw'
    }
}))

const Img = styled('img')(({ theme }) => ({
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('lg')]: {
        height: 450,
        marginTop: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
        height: 400
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(13)
    }
}))

interface IErrorPage {
    message?: string;
}

interface IErrorPageWithCode extends IErrorPage {
    code: number;
}

/**
 * ErrorPage is a unified error page component that can be used to display various HTTP error codes.
 * Takes an errorCode, url, and an optional message as props and displays them in a user-friendly format.
 */
export const ErrorPage: FC<IErrorPageWithCode> = ({ code, message }) => {
    const router = useRouter();

    return (
        <BlankLayout>
            <Box className='content-center'>
                <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <BoxWrapper>
                        <Typography variant='h1'>{code}</Typography>
                        <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
                            {httpCodes[code].titleFa}
                        </Typography>
                        <Typography variant='caption'>{router.asPath}</Typography>
                        <Typography variant='body2'>{httpCodes[code].descriptionFa}. به خانه بروید!</Typography>
                        {!!message && (<Typography variant='body2'>{message}</Typography>)}
                    </BoxWrapper>
                    <Img height='487' alt='error-illustration' src={httpCodes[code].imagePath || "/images/pages/error.png"} />
                    <Button href='/home' component={Link} variant='contained' sx={{ px: 5.5 }}>
                        بازگشت به خانه
                    </Button>
                </Box>
            </Box>
        </BlankLayout>
    );
};

export const Page400: FC<IErrorPage> = ({ message }) => <ErrorPage code={400} message={message} />
export const Page401: FC<IErrorPage> = ({ message }) => <ErrorPage code={401} message={message} />
export const Page403: FC<IErrorPage> = ({ message }) => <ErrorPage code={403} message={message} />
export const Page404: FC<IErrorPage> = ({ message }) => <ErrorPage code={404} message={message} />
export const Page408: FC<IErrorPage> = ({ message }) => <ErrorPage code={408} message={message} />
export const Page500: FC<IErrorPage> = ({ message }) => <ErrorPage code={500} message={message} />
export const Page502: FC<IErrorPage> = ({ message }) => <ErrorPage code={502} message={message} />
export const Page503: FC<IErrorPage> = ({ message }) => <ErrorPage code={503} message={message} />
export const Page504: FC<IErrorPage> = ({ message }) => <ErrorPage code={504} message={message} />