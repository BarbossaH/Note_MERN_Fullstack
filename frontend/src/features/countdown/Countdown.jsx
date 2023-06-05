import React, { useEffect, useState } from 'react';

function CountdownPage() {
  const targetDate = new Date('2023-06-06T00:00:00'); // 目标时间点
  const [countdown, setCountdown] = useState(calculateCountdown()); // 初始剩余时间

  useEffect(() => {
    // 定义倒计时逻辑
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown();
      setCountdown(newCountdown);

      // 当倒计时结束时清除定时器
      if (newCountdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  function calculateCountdown() {
    const currentTime = new Date();
    const timeDiff = targetDate - currentTime;
    return Math.max(0, Math.floor(timeDiff / 1000)); // 将剩余时间转换为秒，并确保不为负值
  }

  function formatTime(unit, label) {
    return `${unit} ${label}${unit > 1 ? 's' : ''}`; // 格式化时间单位，如果大于1，则加上复数形式
  }

  function renderCountdown() {
    if (countdown <= 0) {
      return <h1>Countdown: 0 seconds</h1>; // 倒计时结束时显示特定内容
    }

    let timeString = '';

    const days = Math.floor(countdown / (60 * 60 * 24));
    const hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countdown % (60 * 60)) / 60);
    const seconds = countdown % 60;

    if (days > 0) {
      timeString =
        formatTime(days, 'day') +
        ', ' +
        formatTime(hours, 'hour') +
        ', ' +
        formatTime(minutes, 'minute');
    } else {
      timeString =
        formatTime(hours, 'hour') +
        ', ' +
        formatTime(minutes, 'minute') +
        ', ' +
        formatTime(seconds, 'second');
    }

    return <h1>Countdown: {timeString}</h1>;
  }

  return <div className="countdown-container">{renderCountdown()}</div>;
}

export default CountdownPage;
