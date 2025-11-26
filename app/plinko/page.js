'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlinkoPage() {
  const canvasRef = React.useRef(null);
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);
  const [bet, setBet] = useState(10);
  const [multipliers] = useState([58.88, 28.88, 18.88, 8.88, 1.88, 3.88, 5.88, 18.88, 58.88]);
  const animationRef = React.useRef(null);

  const rows = 10;
  const cols = 9;
  const pegRadius = 3;
  const ballRadius = 5;
  const spacing = 30;
  const startX = 50;
  const startY = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pegs
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - (row % 2); col++) {
          const x = startX + col * spacing + (row % 2) * (spacing / 2);
          const y = startY + row * spacing;

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, pegRadius);
          gradient.addColorStop(0, '#ffd700');
          gradient.addColorStop(1, '#b8860b');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, pegRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#d4af37';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw multiplier boxes
      const boxWidth = spacing;
      const boxHeight = 30;
      const boxY = startY + rows * spacing + 20;
      multipliers.forEach((mult, i) => {
        const boxX = startX + i * spacing - boxWidth / 2;
        // Color based on multiplier value
        let color;
        if (mult >= 50) color = '#ff0000';      // Red for 58.88x
        else if (mult >= 25) color = '#ff6600'; // Orange for 28.88x
        else if (mult >= 15) color = '#ffaa00'; // Light orange for 18.88x
        else if (mult >= 8) color = '#ffff00';  // Yellow for 8.88x
        else if (mult >= 5) color = '#00ff00';  // Green for 5.88x
        else if (mult >= 3) color = '#00ffff';  // Cyan for 3.88x
        else color = '#888888';                 // Gray for 1.88x

        ctx.fillStyle = color;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${mult}x`, boxX + boxWidth / 2, boxY + boxHeight / 2 + 4);
      });

      // Update balls physics
      setBalls(prevBalls => {
        return prevBalls.map(ball => {
          if (ball.landed) {
            ball.animationTime = (ball.animationTime || 0) + 1;
            return ball;
          }

          // Apply gravity (reduced for slower fall)
          ball.vy += 0.05;
          ball.x += ball.vx * 0.3;
          ball.y += ball.vy * 0.3;

          // Check collision with pegs
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - (row % 2); col++) {
              const pegX = startX + col * spacing + (row % 2) * (spacing / 2);
              const pegY = startY + row * spacing;
              const dx = ball.x - pegX;
              const dy = ball.y - pegY;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < ballRadius + pegRadius) {
                const angle = Math.atan2(dy, dx);
                ball.x = pegX + Math.cos(angle) * (ballRadius + pegRadius);
                ball.y = pegY + Math.sin(angle) * (ballRadius + pegRadius);

                const normalX = dx / distance;
                const normalY = dy / distance;
                const dotProduct = ball.vx * normalX + ball.vy * normalY;

                ball.vx = (ball.vx - 2 * dotProduct * normalX) * 0.8;
                ball.vy = (ball.vy - 2 * dotProduct * normalY) * 0.8;

                ball.vx += (Math.random() - 0.5) * 2;
              }
            }
          }

          // Check if ball landed in multiplier box
          if (ball.y >= boxY && !ball.landed) {
            const boxIndex = Math.floor((ball.x - (startX - spacing / 2)) / spacing);
            if (boxIndex >= 0 && boxIndex < multipliers.length) {
              ball.landed = true;
              ball.landedIndex = boxIndex;
              ball.animationTime = 0;
              const winAmount = ball.betAmount * multipliers[boxIndex];
              setScore(prev => prev + winAmount);
            }
          }

          // Bounce off walls
          if (ball.x < ballRadius) {
            ball.x = ballRadius;
            ball.vx *= -0.8;
          }
          if (ball.x > canvas.width - ballRadius) {
            ball.x = canvas.width - ballRadius;
            ball.vx *= -0.8;
          }

          return ball;
        }).filter(ball => !ball.landed || ball.animationTime < 30);
      });

      // Draw balls AFTER updating state
      balls.forEach(ball => {
        const gradient = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 0, ball.x, ball.y, ballRadius);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.3, ball.color);
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [balls, multipliers]);

  const dropBall = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const newBall = {
      x: startX + (cols / 2) * spacing + (Math.random() - 0.5) * 10,
      y: startY - 20,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      landed: false,
      animationTime: 0,
      betAmount: bet
    };
    setBalls(prev => [...prev, newBall]);
  };

  return (
    <div className="plinko-page-container">
      <Link href="/" className="plinko-page-back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>

      <div className="plinko-page-header">
        <Link href="/">
          <img
            className="plinko-page-logo"
            src="https://golden88a.com/media/27c7b222e2a861a6d972e.gif"
            alt="Golden88 Logo"
          />
        </Link>
        <h1 className="plinko-page-title">Plinko Ball Game</h1>
        <p className="plinko-page-subtitle">Drop the ball and win big multipliers!</p>
      </div>

      <div className="plinko-page-content">
        <div className="plinko-game-card">
          <div className="plinko-stats">
            <div className="plinko-stat-item">
              <span className="plinko-stat-label">Total Winnings:</span>
              <span className="plinko-stat-value">AUD {score.toFixed(2)}</span>
            </div>
            <div className="plinko-stat-item">
              <span className="plinko-stat-label">Bet Amount:</span>
              <div className="plinko-bet-controls">
                <button onClick={() => setBet(Math.max(1, bet - 5))} className="plinko-bet-btn">-</button>
                <span className="plinko-stat-value">AUD {bet}</span>
                <button onClick={() => setBet(bet + 5)} className="plinko-bet-btn">+</button>
              </div>
            </div>
          </div>

          <div className="plinko-canvas-container">
            <canvas ref={canvasRef} width={320} height={380} className="plinko-page-canvas" />
          </div>

          <button className="plinko-page-drop-btn" onClick={dropBall}>
            Drop Ball (Bet: AUD {bet})
          </button>

          <div className="plinko-instructions">
            <h3>How to Play:</h3>
            <ul>
              <li>Set your bet amount using the +/- buttons</li>
              <li>Click "Drop Ball" to release a ball</li>
              <li>Watch as it bounces through the golden pegs</li>
              <li>Land in a multiplier zone to win!</li>
              <li>Higher multipliers (100x, 50x) are at the edges</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="plinko-page-footer">
        <p>© 2024 GOLDEN88. ALL RIGHTS RESERVED.</p>
        <p>YOUR GOLDEN GATEWAY TO BIG WINS.</p>
      </div>
    </div>
  );
}
