import { ChangeEvent, FC, useState, MouseEvent } from "react";
import { FormControl, FormHelperText, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, SxProps, Theme } from "@mf-core/core-ui"

export interface IPasswordBox {
    value: string;
    label: string;
    error?: boolean;
    helper?: string;
    size?: 'small' | 'medium';
    sx?: SxProps<Theme> | undefined;
    onChange?: (newValue: string) => void;
}

export const PasswordBox: FC<IPasswordBox> = ({ value, error, onChange, label, helper, size, sx }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <FormControl
            fullWidth
            sx={sx ? { ...sx } : {}}
            required={true}
            error={error}
            size={size || "medium"}
        >
            <InputLabel htmlFor='auth-login-password' sx={{ marginTop: size === "small" ? "6px" : "8px" }}>{label}</InputLabel>
            <OutlinedInput
                label={label}
                value={value}
                id='auth-login-password'
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: 30 }}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            aria-label='toggle password visibility'
                        >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                    </InputAdornment>
                }
            />
            {helper && (<FormHelperText>{helper}</FormHelperText>)}
        </FormControl >
    )
}