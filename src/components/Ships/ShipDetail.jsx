

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Anchor, Calendar, Clipboard, Edit, ArrowLeft, PenTool as Tool, Plus } from 'lucide-react';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useJobs } from '../../contexts/JobsContext';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/roleUtils';
import { getShipById } from '../../utils/localStorageUtils';

const ShipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshShips } = useShips();
  const { components, getComponentsByShipId, refreshComponents } = useComponents();
  const { jobs, getJobsByShipId, refreshJobs } = useJobs();
  const { user } = useAuth();

  const [ship, setShip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  const canEditShip = hasPermission(user, 'canEditShip');
  const canCreateComponent = hasPermission(user, 'canCreateComponent');
  const canCreateJob = hasPermission(user, 'canCreateJob');

  const shipComponents = useMemo(() => getComponentsByShipId(id) || [], [components, id]);
  const shipJobs = useMemo(() => getJobsByShipId(id) || [], [jobs, id]);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const shipData = getShipById(id);
        if (shipData) {
          setShip(shipData);
        } else {
          navigate('/ships');
        }

        await Promise.all([
          refreshShips(),
          refreshComponents(),
          refreshJobs()
        ]);
      } catch (error) {
        console.error('Failed to load ship data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const getBadgeClass = (type, value) => {
    const badgeClasses = {
      status: {
        Active: 'bg-green-100 text-green-800 border-green-200',
        'Under Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Out of Service': 'bg-red-100 text-red-800 border-red-200',
      },
      jobStatus: {
        Open: 'bg-blue-100 text-blue-800 border-blue-200',
        'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Completed: 'bg-green-100 text-green-800 border-green-200',
        Cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
      },
      priority: {
        Low: 'bg-green-100 text-green-800 border-green-200',
        Medium: 'bg-blue-100 text-blue-800 border-blue-200',
        High: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Critical: 'bg-red-100 text-red-800 border-red-200',
      },
    };
    return badgeClasses[type]?.[value] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!ship) {
    return (
      <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded">
        Ship not found.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/ships')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold flex items-center text-gray-800">
              <Anchor className="mr-2 text-blue-600" size={24} />
              {ship.name}
            </h2>
            <div className="text-sm text-gray-600 mt-1 flex items-center">
              <span>IMO: {ship.imo}</span>
              <span className="mx-2">•</span>
              <span>Flag: {ship.flag}</span>
              <span className="mx-2">•</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeClass('status', ship.status)}`}>
                {ship.status}
              </span>
            </div>
          </div>
        </div>

        {canEditShip && (
          <Link
            to={`/ships/edit/${ship.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Edit size={16} className="mr-2" />
            Edit Ship
          </Link>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <nav className="border-b border-gray-200 flex">
          {[
            { key: 'general', icon: Clipboard, label: 'General Information' },
            { key: 'components', icon: Tool, label: 'Components', count: shipComponents.length },
            { key: 'maintenance', icon: Calendar, label: 'Maintenance History', count: shipJobs.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} className="mr-2" />
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Ship Details</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <Detail label="Name" value={ship.name} />
                  <Detail label="IMO Number" value={ship.imo} />
                  <Detail label="Flag" value={ship.flag} />
                  <Detail
                    label="Status"
                    value={
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBadgeClass('status', ship.status)}`}>
                        {ship.status}
                      </span>
                    }
                  />
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Summary</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <Detail label="Total Components" value={shipComponents.length} />
                  <Detail label="Total Maintenance Jobs" value={shipJobs.length} />
                  <Detail label="Open Jobs" value={shipJobs.filter(job => job.status === 'Open').length} />
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div>
              <HeaderWithAction
                title="Components"
                canCreate={canCreateComponent}
                createLink={`/components/new/${ship.id}`}
                buttonText="Add Component"
              />
              <ItemGrid items={shipComponents} type="component" />
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <HeaderWithAction
                title="Maintenance History"
                canCreate={canCreateJob}
                createLink={`/jobs/new/${ship.id}`}
                buttonText="Create Job"
              />
              <ItemGrid items={shipJobs} type="job" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="sm:col-span-1">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

const HeaderWithAction = ({ title, canCreate, createLink, buttonText }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-medium">{title}</h3>
    {canCreate && (
      <Link
        to={createLink}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <Plus size={16} className="mr-1" />
        {buttonText}
      </Link>
    )}
  </div>
);

const ItemGrid = ({ items, type }) => {
  if (!items.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {type === 'job' ? 'maintenance jobs' : 'components'} found for this ship.
      </div>
    );
  }

  return (
    <div className={type === 'component' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
      {items.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h4 className="font-medium text-gray-900">{item.name || item.title}</h4>
          {type === 'component' ? (
            <>
              <p className="text-sm text-gray-500 mt-1">Serial: {item.serialNumber}</p>
              <div className="mt-2 text-sm">
                <p>Install Date: {new Date(item.installDate).toLocaleDateString()}</p>
                <p>Last Maintenance: {new Date(item.lastMaintenanceDate).toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-600 mt-2">
              <p>Status: <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeClass('jobStatus', item.status)}`}>{item.status}</span></p>
              <p>Priority: <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeClass('priority', item.priority)}`}>{item.priority}</span></p>
              <p className="mt-1">Scheduled Date: {new Date(item.scheduledDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShipDetail;




