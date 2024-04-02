import react, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import soundOnIcon from './assets/soundOn.svg';
import soundOffIcon from './assets/soundOff.svg';
import arrowIcon from './assets/arrow.svg';
import confetti from 'canvas-confetti';

function Html() {
  const [sound, setSound] = useState(false);

  const [active, setActive] = useState(false);

  const musicRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (sound) {
      musicRef.current?.pause();
    } else {
      musicRef.current?.play();
      if (active == false) {
        frame();
        setActive(true);
      }
    }
    setSound(!sound);
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const frame = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;
    let timeLeft = animationEnd - Date.now();
    let ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  };
useEffect(()=>{
  handleClick();
},[])
  return (
    <>
      <div className="sound">
        {!active && (
          <span className="tips">
            音楽を
            <img src={arrowIcon} className="icon" alt="" />
          </span>
        )}
        <img
          src={sound ? soundOnIcon : soundOffIcon}
          className="icon"
          onClick={handleClick}
        />
      </div>

      <audio
        loop
        src="/we-wish-you-a-merry-christmas-125995.mp3"
        ref={musicRef}
      />

      <div className="content">
      <div className="title">米酱！！</div>
        <div className="title">メリークリスマス！！！</div>

        <div className="other">
          Music by
          <a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=126685">
            Justin Biber!
          </a>
        </div>

        <div className="other">
          Made with <span>💗</span> by エリン！
        </div>
        <div className="other">
          Do you think of me?
        </div>
      </div>
    </>
  );
}

export default Html;
