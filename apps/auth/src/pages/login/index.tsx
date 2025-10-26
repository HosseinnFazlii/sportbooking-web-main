import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Icon,
  BlankLayout,
  useAuth,
  Card as MuiCard,
  CardProps,
  InputLabel,
  CardContent,
  FormControl,
  OutlinedInput,
  styled,
  AxiosErrorType,
  LoginParams,
  IPage,
  CourticLogo,
  Typography,
  TypographyProps,
  FormHelperText,
  toast,
  i18n,
  useSettings,
} from "@mf-core/core-ui";

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
  backgroundColor: `${theme.palette.background.default}EE`,
  position: "relative"
}));

const CardHeadTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
  backgroundColor: `${theme.palette.primary.main}EE`,
  color: "#FFF",
  padding: "10px",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "20px",
  right: "0px",
  top: "0px",
  position: "absolute",
  display: "block",
  width: "fit-content !important",
  fontWeight: "bold"
}));

const Login: React.FC<IPage> = () => {
  const { isReady, push } = useRouter();
  const { user, login } = useAuth();
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>({});
  const [values, setValues] = useState<LoginParams>({
    mobile: 0,
    password: '',
    rememberMe: true
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isAuthenticated = !!(user && user.id);
  const { settings } = useSettings();

  useEffect(() => {
    // If user is not authenticated and the path is not public, redirect to login
    // console.log(isReady , isAuthenticated);
    if (isReady && isAuthenticated) {
      push("/sportbooking/dashboard");
    }
  }, [isAuthenticated, isReady, push]);

  if (isAuthenticated) {
    return null;
  }

  const validate = () => {
    const tempErrors = {} as { mobile?: string, password?: string };

    // Validate mobile
    if (!values.mobile) tempErrors.mobile = "لطفا شماره موبایل را وارد کنید.";
    else if (values.mobile.toString().length < 10 || !values.mobile.toString().startsWith('9'))
      tempErrors.mobile = "شماره موبایل می بایست با 9 شروع شود.";

    // Validate password
    if (!values.password) tempErrors.password = "لطفا رمز عبور را وارد کنید.";
    else if (values.password.length < 6) tempErrors.password = "رمز عبور صحیح نمی باشد.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // return true if no errors
  };

  const handleChange = (prop: keyof LoginParams) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = prop === "mobile" ? parseInt(event.target.value) * 1 : event.target.value;

    setValues({ ...values, [prop]: value });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const submit = async () => {
    if (validate()) {
      // localStorage.setItem("user-authenticated", "true");
      await login(values, (err: AxiosErrorType) => {
        console.error(err);
        toast.error("کاربر مورد نظر وجود ندارد.");
      });
      // if (isLogged) {
      //   push("/sportbooking/dashboard");
      // }
    } else {
      toast.error("لطفا نام کاربری و رمزعبور را به صورت صحیح وارد کنید.");
    }
  }

  return (
    <BlankLayout style={{ backgroundImage: "", backgroundSize: "cover", backgroundPosition: "bottom" }}>
      <Head>
        <title>{`${i18n.t(settings.name)} - ${i18n.t("login")}`}</title>
      </Head>
      <video autoPlay muted loop controls={false} src="/videos/auth-tennis-v3.mp4" style={{ position: "absolute", right: 0, bottom: 0, minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", zIndex: -1 }} />
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardHeadTitle variant='caption'>{i18n.t("login")}</CardHeadTitle>
          <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 6, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
              <CourticLogo themeBasedColor="auto" width={260} />
              {/* <Typography variant='h6'>پنل مشتریان</Typography> */}
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <TextField
                autoFocus
                fullWidth
                id='mobile'
                onChange={handleChange('mobile')}
                label='شماره موبایل'
                sx={{ mb: 4, "& .MuiInputBase-root": {} }}
                required={true}
                error={Boolean(errors.mobile)}
                helperText={errors.mobile}
                value={values.mobile || ""}
                inputProps={{ maxLength: 10 }}
              />
              <FormControl fullWidth sx={{ "& .MuiInputBase-root": {} }} required={true} error={Boolean(errors.password)}>
                <InputLabel htmlFor='auth-login-password'>رمزعبور</InputLabel>
                <OutlinedInput
                  label='رمزعبور'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
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
                <FormHelperText>{errors.password}</FormHelperText>
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7, marginTop: "1.5rem" }} onClick={submit}>
                ورود
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </BlankLayout>
  )
}

export default Login

