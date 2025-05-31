import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useStatistics } from './useStatistics';
import Chart from './Chart';

function App() {
  const staticData = useStaticData();
  const [activeView, setActiveView] = useState<View>('CPU');
  const statistics = useStatistics(10);
  const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics]);
  const ramUsages = useMemo(() => statistics.map((stat) => stat.ramUsage), [statistics]);
  const storageUsages = useMemo(() => statistics.map((stat) => stat.storageData), [statistics]);
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, [])

  return (
    <div className='App'>
      <div>
        <Header />
        <div className='main'>
          <div>
            <SelectOption title="CPU" subTitle={staticData?.cpuModel} data={cpuUsages} onClick={() => setActiveView("CPU")} view="CPU" />
            <SelectOption title="RAM" subTitle={staticData?.totalMemoryGB.toString() + "GB"} data={ramUsages} onClick={() => setActiveView("RAM")} view="RAM" />
            <SelectOption title="STORAGE" subTitle={staticData?.totalStorage.toString() + "GB"} data={storageUsages} onClick={() => setActiveView("STORAGE")} view="STORAGE" />
          </div>
          <div className='mainGrid'>
            <Chart data={activeUsages} maxDataPoints={10} selectedView={activeView} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SelectOptionProps {
  title: string;
  view: View;
  subTitle: string | undefined;
  data: number[]
  onClick: () => void;
}

function SelectOption({ title, subTitle, data, onClick, view }: SelectOptionProps) {
  return (
    <button className='selectOption' onClick={onClick}>
      <div className='selectOptionTitle'>
        <div>{title}</div>
        <div>{subTitle ?? ""}</div>
      </div>
      <div className='selectOptionChart'>
        <Chart data={data} maxDataPoints={10} selectedView={view}/>
      </div>
    </button>
  );
}

function Header() {
  const onButtonClick = (action: FrameWindowAction) => {
    window.electron.sendFrameAction(action)
  }
  return (
    <header>
      <button id="close" onClick={() => onButtonClick("CLOSE")} />
      <button id="minimize" onClick={() => onButtonClick("MINIMIZE")} />
      <button id="maximize" onClick={() => onButtonClick("MAXIMIZE")} />
    </header>
  );
}

function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);
  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData())
    })();
  }, []);
  return staticData;
}

export default App
