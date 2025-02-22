import React, { useState } from "react";

const usersData = [
  { id: 1, name: "Ana López", email: "ana@example.com", active: true },
  { id: 2, name: "Carlos Pérez", email: "carlos@example.com", active: false },
  { id: 3, name: "Luis Gómez", email: "luis@example.com", active: true },
  { id: 4, name: "María Rodríguez", email: "maria@example.com", active: false },
];

export default function Usuarios() {
  const [users, setUsers] = useState(usersData);

  const toggleUserStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl h-full flex flex-col overflow-hidden">
        <h2 className="text-4xl font-bold mb-6 text-center">Estado de Usuarios</h2>
        <div className="flex-1 overflow-y-auto w-full space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.active
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {user.active ? "Activo" : "Inactivo"}
                </span>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`p-2 rounded-full transition-colors ${
                    user.active
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.active ? "✔" : "✖"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
