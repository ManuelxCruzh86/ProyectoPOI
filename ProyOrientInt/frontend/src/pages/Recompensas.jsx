import { useState } from "react";

const rewardsData = [
  { id: 1, user: "Juan Pérez", reward: "Medalla de Oro", points: 500 },
  { id: 2, user: "Ana Gómez", reward: "Insignia de Platino", points: 400 },
  { id: 3, user: "Carlos López", reward: "Trofeo de Esfuerzo", points: 300 },
];

export default function RewardsSystem() {
  const [rewards, setRewards] = useState(rewardsData);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      <nav className="p-4 bg-gray-800 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/conexxo.png" className="h-24 w-24 object-contain" alt="Logo" />
          <h1 className="text-3xl font-bold">ConneXXo</h1>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">🏆 Sistema de Recompensas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Recompensa
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Puntos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {rewards.map((reward) => (
                  <tr key={reward.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {reward.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                        {reward.reward}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {reward.points} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}