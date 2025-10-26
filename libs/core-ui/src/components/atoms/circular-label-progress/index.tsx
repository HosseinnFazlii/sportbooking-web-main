import { useState, FC } from "react";
import { Box, CircularProgress, CircularProgressProps, IconButton, Typography, circularProgressClasses } from "../../../foundations";
import { Icon } from "../icon";

export const CircularLabelProgress: FC<CircularProgressProps & { value: number, stop: () => void }> = (
    { value, stop, ...props }
) => {
    const [displayStop, setDisplayStop] = useState<boolean>(false);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={() => setDisplayStop(true)} onMouseLeave={() => setDisplayStop(false)}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant={value > 0 ? "determinate" : "indeterminate"}
                disableShrink={value > 0 ? false : true}
                sx={{
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                thickness={4}
                {...props}
                value={value}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {displayStop ? (
                    <IconButton onClick={stop} title="توقف"><Icon icon="mdi:stop" /></IconButton>
                ) : (
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >{`${Math.round(value)}%`}</Typography>
                )}
            </Box>
        </Box>
    );
}