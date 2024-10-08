import { useState, useEffect, useRef } from 'react';

const doomsdayData = {
  // 注意！！仮データ！！
  1947: 23.9,
  1948: 23.7,
  1950: 23.5,
  2000: 23.58,
  2024: 23.55,
};

const AnalogClock = ({ hour, minute }) => {
  const hourRotation = (hour % 12) * 30 + minute * 0.5; // 1時間＝30度, 1分＝0.5度
  const minuteRotation = minute * 6; // 1分＝6度

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%', border: '2px solid black' }}>
      <div
        style={{
          position: 'absolute',
          width: '4px',
          height: '50px',
          backgroundColor: 'black',
          top: '50px',
          left: '98px',
          transformOrigin: 'bottom',
          transform: `rotate(${hourRotation}deg)`,
          transition: 'transform 0.5s linear', // 針のスムーズな動き
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '70px',
          backgroundColor: 'red',
          top: '30px',
          left: '99px',
          transformOrigin: 'bottom',
          transform: `rotate(${minuteRotation}deg)`,
          transition: 'transform 0.5s linear', // 針のスムーズな動き
        }}
      />
    </div>
  );
};

const App = () => {
  const [year, setYear] = useState(1947);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  const currentMinutes = doomsdayData[year] || 0;
  const hour = Math.floor(currentMinutes);
  const minute = Math.floor((currentMinutes - hour) * 60);

  useEffect(() => {
    if (isPlaying) {
      const updateClock = () => {
        setYear((prevYear) => (prevYear < 2024 ? prevYear + 1 : 1947));
        animationRef.current = requestAnimationFrame(updateClock);
      };
      animationRef.current = requestAnimationFrame(updateClock);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const handleSliderChange = (e) => {
    setYear(Number(e.target.value));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Doomsday Clock</h1>
      <AnalogClock hour={hour} minute={minute} />
      <input
        type="range"
        min="1947"
        max="2024"
        value={year}
        onChange={handleSliderChange}
        style={{ width: '80%', margin: '20px 0' }}
      />
      <div>{year}</div>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default App;