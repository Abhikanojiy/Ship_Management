import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Anchor, Save, ArrowLeft } from 'lucide-react';
import { useShips } from '../../contexts/ShipsContext';

const ShipForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships, addShip, updateShip } = useShips();

  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const ship = ships.find(ship => ship.id === id);
      if (ship) {
        setFormData({
          name: ship.name,
          imo: ship.imo,
          flag: ship.flag,
          status: ship.status
        });
      } else {
        navigate('/ships');
      }
    }
  }, [isEditing, id, ships, navigate]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Ship name is required';
    if (!formData.imo.trim()) {
      errs.imo = 'IMO number is required';
    } else if (!/^\d{7}$/.test(formData.imo)) {
      errs.imo = 'IMO number must be exactly 7 digits';
    }
    if (!formData.flag.trim()) errs.flag = 'Flag is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateShip({ id, ...formData });
      } else {
        await addShip(formData);
      }
      navigate('/ships');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: 'Unable to save ship details. Please retry.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-8 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/ships')}
          className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-semibold text-slate-800 flex items-center">
          <Anchor className="mr-2 text-indigo-600" size={26} />
          {isEditing ? 'Edit Ship' : 'Register New Ship'}
        </h2>
      </div>

      {errors.submit && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md mb-4 shadow-sm">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ship Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* IMO */}
        <div>
          <label htmlFor="imo" className="block text-sm font-medium text-gray-700 mb-1">
            IMO Number
          </label>
          <input
            id="imo"
            name="imo"
            type="text"
            value={formData.imo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.imo ? 'border-red-400' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.imo && <p className="text-sm text-red-600 mt-1">{errors.imo}</p>}
          <p className="text-xs text-gray-500 mt-1">Must be exactly 7 digits.</p>
        </div>

        {/* Flag */}
        <div>
          <label htmlFor="flag" className="block text-sm font-medium text-gray-700 mb-1">
            Flag (Country)
          </label>
          <input
            id="flag"
            name="flag"
            type="text"
            value={formData.flag}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.flag ? 'border-red-400' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.flag && <p className="text-sm text-red-600 mt-1">{errors.flag}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Operational Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/ships')}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition ${
              isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <Save size={16} />
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Ship' : 'Save Ship'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ShipForm;
