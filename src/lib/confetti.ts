import confetti from 'canvas-confetti';

export function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#013328', '#CC8B65', '#0A4538', '#E3DCD2'],
    });
  } catch (err) {
    console.warn('Confetti could not fire', err);
  }
}

