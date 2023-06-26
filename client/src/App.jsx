// project import
import Routes from './routes/index.jsx';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop.jsx';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
