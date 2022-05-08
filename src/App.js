import { Landing } from './pages';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './components';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
