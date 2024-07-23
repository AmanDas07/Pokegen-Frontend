import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import BattlePage from './pages/BattlePage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<BattlePage />} />
    </Routes>
  );
}

export default App;
