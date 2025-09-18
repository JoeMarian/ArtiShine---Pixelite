import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const BackgroundLottie = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/Small-waves-[remix].json',
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    });
    return () => anim?.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.20] md:opacity-[0.25]"
      aria-hidden="true"
    />
  );
};

export default BackgroundLottie;



