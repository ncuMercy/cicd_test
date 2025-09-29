import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskManagementApp from './presentation/pages/task-management.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskManagementApp />
  </StrictMode>,
)
