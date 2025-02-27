import { motion } from "framer-motion";
import React from "react";

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
    image: "../images/photo.png",
    position: "Нападающий",
    matches: 25,
    goals: 10,
    assists: 7,
    rating: 8.5,
};

export default function PlayerCard() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 w-full">
            <motion.div
                className="w-full max-w-md bg-gray-800 text-white rounded-xl shadow-lg p-6 space-y-4 text-center border border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative flex items-center justify-center">
                    <img
                        src={player.image}
                        alt={player.name}
                        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                    />
                </div>
                <h2 className="text-2xl font-bold tracking-wide">{player.name}</h2>
                <p className="text-gray-400 text-sm font-medium">{player.position}</p>
                <div className="grid grid-cols-3 gap-4 text-center text-gray-300 text-sm w-full">
                    <div className="p-2 bg-gray-700 rounded-md">
                        <p className="text-lg font-bold">{player.matches}</p>
                        <p className="text-xs">Матчи</p>
                    </div>
                    <div className="p-2 bg-gray-700 rounded-md">
                        <p className="text-lg font-bold">{player.goals}</p>
                        <p className="text-xs">Голы</p>
                    </div>
                    <div className="p-2 bg-gray-700 rounded-md">
                        <p className="text-lg font-bold">{player.assists}</p>
                        <p className="text-xs">Передачи</p>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <p className="text-xl font-bold text-blue-400">{player.rating} / 10</p>
                    <p className="text-xs text-gray-400">Рейтинг</p>
                </div>
            </motion.div>
        </div>
    );
}
