import { Map } from '@/components/Map/Map.tsx';
import { Panel } from '@/components/Panel/Panel.tsx';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';

export const Main = () => {
  return (
    <>
      <Sidebar />
      <Panel />
      <Map />
    </>
  );
};
