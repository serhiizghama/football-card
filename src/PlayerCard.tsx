import { motion } from "framer-motion";

interface Player {
    name: string;
    image: string;
    position: string;
    matches: number;
    goals: number;
    assists: number;
    rating: number;
}

const player: Player = {
    name: "Сергей Rush",
    image: "/images/photo.png",
    position: "Нападающий",
    matches: 25,
    goals: 10,
    assists: 7,
    rating: 8.5,
};

export default function PlayerCard() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 w-full">
            <motion.div
                className="w-full max-w-md flex flex-col items-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={player.image}
                    alt={player.name}
                    className="w-32 h-32 rounded-full shadow-lg object-cover"
                />
                <h2 className="text-3xl font-bold">{player.name}</h2>
                <p className="text-lg text-gray-400">{player.position}</p>
                <div className="flex justify-between w-full max-w-sm text-center text-gray-300 text-lg">
                    <div className="flex flex-col">
                        <p className="font-bold">{player.matches}</p>
                        <p className="text-sm">Матчи</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold">{player.goals}</p>
                        <p className="text-sm">Голы</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold">{player.assists}</p>
                        <p className="text-sm">Передачи</p>
                    </div>
                </div>
                <p className="text-xl font-bold text-blue-400">{player.rating} / 10</p>
                <p className="text-sm text-gray-400">Рейтинг</p>
            </motion.div>
        </div>
    );
}
