
import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon, PlayIcon, PauseIcon, StopIcon } from '../assets/icons';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
      active ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const formatTime = (timeInMs: number) => {
  const totalSeconds = Math.floor(timeInMs / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = (timeInMs % 1000).toString().padStart(3, '0').slice(0, 2);
  return { hours, minutes, seconds, milliseconds };
};

const WorldClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl font-bold tracking-widest">{time.toLocaleTimeString()}</div>
      <div className="text-lg text-gray-400">{time.toDateString()}</div>
    </div>
  );
};

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      countRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(countRef.current!);
    }
    return () => clearInterval(countRef.current!);
  }, [isActive]);

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="font-mono text-7xl">
        <span>{hours}:{minutes}:{seconds}</span>
        <span className="text-4xl text-gray-400">.{milliseconds}</span>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setIsActive(!isActive)} className="bg-blue-600 hover:bg-blue-700 rounded-full p-4">
          {isActive ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
        <button onClick={() => { setTime(0); setIsActive(false); }} className="bg-gray-600 hover:bg-gray-700 rounded-full p-4">
          <StopIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const Timer: React.FC = () => {
    const [duration, setDuration] = useState(300); // 5 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);
    const isTimeUp = timeLeft <= 0 && !isRunning && duration > 0;

    useEffect(() => {
        if (isRunning) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current!);
    }, [isRunning]);

    const handleStartPause = () => {
        if (timeLeft <= 0) {
            setTimeLeft(duration);
        }
        setIsRunning(!isRunning);
    };
    
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(duration);
    };
    
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mins = parseInt(e.target.value, 10);
        if (!isNaN(mins) && !isRunning) {
            const newDuration = mins * 60;
            setDuration(newDuration);
            setTimeLeft(newDuration);
        }
    }

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className={`font-mono text-7xl transition-colors ${isTimeUp ? 'text-green-400' : ''}`}>
                <span>{minutes}:{seconds}</span>
            </div>
            {!isRunning && timeLeft === duration && (
                <div className="flex items-center gap-2">
                    <input type="number" value={duration/60} onChange={handleDurationChange} className="w-24 bg-gray-700 text-white p-2 rounded text-center text-lg"/>
                    <span>minutes</span>
                </div>
            )}
             {timeLeft > 0 && !isRunning && timeLeft !== duration && (
                <div className="text-2xl text-yellow-400">Paused</div>
            )}
            {isTimeUp && (
                <div className="text-2xl text-green-400">Time's Up!</div>
            )}
            <div className="flex gap-4">
                <button onClick={handleStartPause} className="bg-blue-600 hover:bg-blue-700 rounded-full p-4">
                    {isRunning ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                </button>
                <button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 rounded-full p-4">
                  <StopIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};


const Clock: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Clock');

  return (
    <div className="h-full w-full flex flex-col bg-[#202020] text-white">
      <div className="flex-shrink-0 border-b border-gray-700 flex justify-center">
        <TabButton active={activeTab === 'Clock'} onClick={() => setActiveTab('Clock')}>Clock</TabButton>
        <TabButton active={activeTab === 'Stopwatch'} onClick={() => setActiveTab('Stopwatch')}>Stopwatch</TabButton>
        <TabButton active={activeTab === 'Timer'} onClick={() => setActiveTab('Timer')}>Timer</TabButton>
      </div>
      <div className="flex-grow">
        {activeTab === 'Clock' && <WorldClock />}
        {activeTab === 'Stopwatch' && <Stopwatch />}
        {activeTab === 'Timer' && <Timer />}
      </div>
    </div>
  );
};

export default Clock;