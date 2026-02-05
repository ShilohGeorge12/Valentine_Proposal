import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

const QUESTION_GIF = 'https://i.pinimg.com/originals/74/97/4e/74974e68289b66fe5b9af8b6ac5c332c.gif';
const SUCCESS_GIF_URL = 'https://c.tenor.com/Rxz2fN_-PrQAAAAd/tenor.gif';

function App() {
	const [noCount, setNoCount] = useState(0);
	const [yesScale, setYesScale] = useState(1);
	const [noScale, setNoScale] = useState(1);
	const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
	const [accepted, setAccepted] = useState(false);
	const maxNoClicks = 6;

	const handleNoClick = () => {
		if (noCount >= maxNoClicks) return;
		const newCount = noCount + 1;
		setNoCount(newCount);

		// Yes gets bigger
		setYesScale(1 + newCount * 0.35);

		// No gets smaller
		setNoScale(Math.max(0.3, 1 - newCount * 0.18));

		// Move No button (bigger range on mobile for fun)
		const randomX = (Math.random() * 300 - 150) * (window.innerWidth < 640 ? 0.7 : 1);
		const randomY = (Math.random() * 240 - 120) * (window.innerWidth < 640 ? 0.6 : 1);
		setNoPosition({ x: randomX, y: randomY });

		if (newCount >= maxNoClicks) {
			setTimeout(() => setAccepted(true), 400);
		}
	};

	const handleYesClick = () => {
		setAccepted(true);
		confetti({
			particleCount: 120,
			spread: 70,
			origin: { y: 0.6 },
			colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffffff'],
		});
	};

	useEffect(() => {
		if (accepted) {
			setTimeout(() => {
				confetti({
					particleCount: 200,
					spread: 100,
					origin: { y: 0.4 },
				});
			}, 300);
		}
	}, [accepted]);

	if (accepted) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-50 p-4 text-center">
				<h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-8 animate-bounce">Yayyyy! ❤️❤️❤️</h1>
				<img
					src={SUCCESS_GIF_URL}
					alt="Happy celebration"
					className="w-64 md:w-96 mb-8 rounded-2xl shadow-2xl"
				/>
				<p className="text-3xl md:text-5xl font-playful text-pink-700 mb-4">You're officially my Valentine!</p>
				<p className="text-xl md:text-2xl text-gray-700 max-w-md">Stuart and I are so happy right now 😭💕 Can't wait to spoil you!</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden heart-bg">
			<h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6 text-center font-playful leading-tight">Will you be my Valentine? 💖</h1>

			<img
				src={QUESTION_GIF}
				alt="Stuart the Minion looking cute"
				className="w-56 md:w-80 mb-10 rounded-3xl shadow-xl border-8 border-white"
			/>

			<div className="flex flex-col sm:flex-row gap-10 md:gap-24 items-center justify-center w-full max-w-4xl">
				{/* Yes button - always in flow */}
				<button
					onClick={handleYesClick}
					style={{ transform: `scale(${yesScale})` }}
					className="bg-green-500 hover:bg-green-600 text-white text-3xl md:text-5xl font-bold py-6 px-16 rounded-full shadow-2xl transition-all duration-300 active:scale-110 z-10">
					Yes 😍
				</button>

				{/* No button - no absolute, just transform for movement */}
				<button
					onClick={handleNoClick}
					style={{
						transform: `scale(${noScale}) translate(${noPosition.x}px, ${noPosition.y}px)`,
						transition: 'all 0.4s ease-out',
					}}
					className={`bg-red-500 hover:bg-red-600 text-white text-xl md:text-3xl font-bold py-4 px-10 rounded-full shadow-lg ${
						noCount >= maxNoClicks ? 'opacity-0 pointer-events-none' : ''
					}`}>
					No 😔
				</button>
			</div>

			{noCount > 0 && noCount < maxNoClicks && (
				<p className="mt-12 text-xl md:text-2xl text-pink-700 font-medium animate-pulse">
					{noCount === 1 && 'Ehn? Stuart says think again! 😂'}
					{noCount === 2 && 'Are you teasing me? 🥺💔'}
					{noCount === 3 && 'No is running away ooo...'}
					{noCount >= 4 && 'See? Even No knows the answer is Yes! 😏❤️'}
				</p>
			)}
		</div>
	);
}

export default App;
