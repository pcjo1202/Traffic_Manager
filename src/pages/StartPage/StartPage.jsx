import logo from '../../images/logo.png';
import * as React from 'react';
import styles from './StartPage.module.css';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'SUITE-Bold',
  },
});

function Header() {
  return (
    <header className={styles.App_header}>
      <img src={logo} className={styles.App_logo} alt='logo' />
    </header>
  );
}
function Main() {
  return (
    <React.Fragment>
      <main className={styles.App_main}>
        <Container
          disableGutters
          maxWidth='lg'
          component='main'
          sx={{ pt: 0, pb: 1 }}
        >
          <Typography
            variant='h3'
            align='center'
            color='text.primary'
            gutterBottom
          >
            길을 찾는 새로운 방식,
          </Typography>
          <Typography
            variant='h1'
            align='center'
            color='text.primary'
            gutterBottom
          >
            Traffic Manager
          </Typography>
          <hr
            style={{
              background: 'black',
              color: 'black',
              borderColor: 'black',
              height: '1px',
              width: 500,
            }}
          />
          <br />
          <Typography
            variant='h4'
            align='center'
            color='text.secondary'
            component='p'
          >
            실시간 대중교통 혼잡도를 확인하고 최적의 경로를 선택하세요.
            <br />더 나은 이동 경험의 시작,
            <br />
            트래픽 매니저와 함께라면 당신의 시간을 효율적으로 활용할 수
            있을거예요.
          </Typography>
          <br />
          <Link
            to='/login'
            variant='outlined'
            color='secondary'
            style={{ width: 150, height: 50, fontSize: 24 }}
          >
            시작하기
          </Link>
        </Container>
      </main>
    </React.Fragment>
  );
}
function StartPage() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Main></Main>
      </ThemeProvider>
    </div>
  );
}

export default StartPage;
