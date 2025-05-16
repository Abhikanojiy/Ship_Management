import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/roleUtils';
import { Anchor, Edit, Trash2, Plus, Search } from 'lucide-react';

const ShipList = () => {
  const { ships, loading, error, deleteShip } = useShips();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const canEditShip = hasPermission(user, 'canEditShip');
  const canDeleteShip = hasPermission(user, 'canDeleteShip');
  const canCreateShip = hasPermission(user, 'canCreateShip');

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Confirm deletion of this ship and all related data?')) {
      try {
        await deleteShip(id);
      } catch (err) {
        console.error('Error deleting ship:', err);
      }
    }
  };

  const filteredShips = ships.filter(ship =>
    ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.imo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.flag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status) => {
    const base = 'px-2 py-1 text-xs font-semibold rounded-full border';
    switch (status) {
      case 'Active': return `${base} bg-green-50 text-green-700 border-green-300`;
      case 'Under Maintenance': return `${base} bg-yellow-50 text-yellow-700 border-yellow-300`;
      case 'Out of Service': return `${base} bg-red-50 text-red-700 border-red-300`;
      default: return `${base} bg-gray-50 text-gray-600 border-gray-300`;
    }
  };

  if (loading) return <div className="text-center py-10">Loading ships...</div>;
  if (error) return <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <Anchor size={24} className="text-blue-500" />
          Ships Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search ships..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {canCreateShip && (
            <Link
              to="/ships/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Add Ship
            </Link>
          )}
        </div>
      </div>

      {filteredShips.length === 0 ? (
        <div className="text-center bg-gray-50 p-10 rounded-lg border border-gray-200">
          <Anchor size={40} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-800 mb-2">No Ships Found</h2>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? 'Try a different keyword.'
              : 'Start by adding your first ship to the system.'}
          </p>
          {canCreateShip && (
            <Link
              to="/ships/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Plus size={16} className="inline mr-1" /> Add Ship
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">IMO</th>
                <th className="px-6 py-3">Flag</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredShips.map((ship) => (
                <tr key={ship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-blue-600">
                    <Link to={`/ships/${ship.id}`} className="hover:underline">
                      {ship.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{ship.imo}</td>
                  <td className="px-6 py-4 text-gray-700">{ship.flag}</td>
                  <td className="px-6 py-4">
                    <span className={getStatusStyles(ship.status)}>{ship.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link to={`/ships/${ship.id}`} className="text-gray-500 hover:text-gray-800" title="View">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      {canEditShip && (
                        <Link to={`/ships/edit/${ship.id}`} className="text-indigo-500 hover:text-indigo-800" title="Edit">
                          <Edit size={18} />
                        </Link>
                      )}
                      {canDeleteShip && (
                        <button
                          onClick={(e) => handleDelete(ship.id, e)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShipList;