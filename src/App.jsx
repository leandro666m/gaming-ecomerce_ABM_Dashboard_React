import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminShell } from './components/layout/AdminShell';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AdminShell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
