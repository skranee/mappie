import '@/assets/styles/global.css';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import { Panel } from '@/components/Panel/Panel.tsx';

export const App = () => {
  return (
    <>
      <Sidebar />
      <Panel />
    </>
  );
};
