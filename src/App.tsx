import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { PrepStudio } from './pages/PrepStudio';
import { GradeIntelligence } from './pages/GradeIntelligence';
import { GrowthStudio } from './pages/GrowthStudio';
import { StudentPulse } from './pages/StudentPulse';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ai-lesson-prep" element={<PrepStudio />} />
        <Route path="/ai-grade" element={<GradeIntelligence />} />
        <Route path="/ai-coaching" element={<GrowthStudio />} />
        <Route path="/ai-student" element={<StudentPulse />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
