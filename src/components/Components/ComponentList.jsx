// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useComponents } from '../../contexts/ComponentsContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { hasPermission } from '../../utils/roleUtils';
// import { PenTool as Tool, Edit, Trash2, Plus, Search } from 'lucide-react';

// const ComponentList = () => {
//   const { components, loading, error, deleteComponent } = useComponents();
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');

//   const canEditComponent = hasPermission(user, 'canEditComponent');
//   const canDeleteComponent = hasPermission(user, 'canDeleteComponent');
//   const canCreateComponent = hasPermission(user, 'canCreateComponent');

//   const handleDelete = async (id, event) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     if (window.confirm('Are you sure you want to delete this component? This will also delete all associated jobs.')) {
//       try {
//         await deleteComponent(id);
//       } catch (err) {
//         console.error('Failed to delete component:', err);
//       }
//     }
//   };

//   // Filter components based on search term
//   const filteredComponents = components.filter(component => 
//     component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     component.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//           <Tool className="mr-2 text-blue-600" size={24} />
//           Components Management
//         </h2>
        
//         <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search components..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
//             />
//           </div>
          
//           {canCreateComponent && (
//             <Link
//               to="/components/new"
//               className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Component
//             </Link>
//           )}
//         </div>
//       </div>

//       {filteredComponents.length === 0 ? (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//           <Tool size={48} className="mx-auto text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-800 mb-2">No components found</h3>
//           <p className="text-gray-600 mb-4">
//             {searchTerm
//               ? "No components match your search criteria. Try a different search term."
//               : "There are no components registered in the system yet."}
//           </p>
//           {canCreateComponent && (
//             <Link
//               to="/components/new"
//               className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <Plus size={16} className="mr-2" />
//               Add Your First Component
//             </Link>
//           )}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Name
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Ship
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Install Date
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Last Maintenance
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredComponents.map((component) => (
//                 <tr 
//                   key={component.id} 
//                   className="hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Link to={`/components/${component.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
//                       {component.name}
//                     </Link>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                     {component.serialNumber}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                     <Link to={`/ships/${component.shipId}`} className="text-blue-600 hover:text-blue-800">
//                       {/* Ship name would be fetched here */}
//                     </Link>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                     {new Date(component.installDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                     {new Date(component.lastMaintenanceDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                     <div className="flex justify-center space-x-2">
//                       <Link
//                         to={`/components/${component.id}`}
//                         className="text-gray-600 hover:text-gray-900"
//                         title="View"
//                       >
//                         <span className="sr-only">View</span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       </Link>
                      
//                       {canEditComponent && (
//                         <Link
//                           to={`/components/edit/${component.id}`}
//                           className="text-indigo-600 hover:text-indigo-900"
//                           title="Edit"
//                         >
//                           <span className="sr-only">Edit</span>
//                           <Edit className="h-5 w-5" />
//                         </Link>
//                       )}
                      
//                       {canDeleteComponent && (
//                         <button
//                           onClick={(e) => handleDelete(component.id, e)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <span className="sr-only">Delete</span>
//                           <Trash2 className="h-5 w-5" />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComponentList; 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComponents } from '../../contexts/ComponentsContext';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/roleUtils';
import { PenTool as Tool, Edit, Trash2, Plus, Search } from 'lucide-react';

const ComponentList = () => {
  const { components, loading, error, deleteComponent } = useComponents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const canEditComponent = hasPermission(user, 'canEditComponent');
  const canDeleteComponent = hasPermission(user, 'canDeleteComponent');
  const canCreateComponent = hasPermission(user, 'canCreateComponent');

  const handleDelete = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (window.confirm('Are you sure you want to delete this component? This will also delete all associated jobs.')) {
      try {
        await deleteComponent(id);
      } catch (err) {
        console.error('Failed to delete component:', err);
      }
    }
  };

  // Filter components based on search term
  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-800 px-5 py-4 rounded-md max-w-xl mx-auto">
        <strong className="block font-semibold mb-1">Error:</strong>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <Tool size={32} className="text-blue-600" />
          Components Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search components by name or serial number..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              aria-label="Search components"
            />
            <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {canCreateComponent && (
            <Link
              to="/components/new"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
            >
              <Plus size={18} />
              Add Component
            </Link>
          )}
        </div>
      </div>

      {/* No results or empty state */}
      {filteredComponents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-3xl mx-auto text-center">
          <Tool size={56} className="text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            {searchTerm ? 'No components match your search.' : 'No components found'}
          </h2>
          <p className="text-gray-500 mb-6 max-w-sm">
            {searchTerm
              ? 'Try changing your search terms or clear the search box to see all components.'
              : 'There are no components registered in the system yet.'}
          </p>
          {canCreateComponent && (
            <Link
              to="/components/new"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
            >
              <Plus size={18} />
              Add Your First Component
            </Link>
          )}
        </div>
      ) : (
        /* Table of components */
        <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {['Name', 'Serial Number', 'Ship', 'Install Date', 'Last Maintenance', 'Actions'].map((heading, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide ${
                      idx === 5 ? 'text-center' : ''
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredComponents.map(component => (
                <tr
                  key={component.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => {} /* Optional: could navigate to details */}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/components/${component.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold truncate max-w-xs block"
                      title={component.name}
                      onClick={e => e.stopPropagation()}
                    >
                      {component.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 truncate max-w-xs">
                    {component.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium truncate max-w-xs">
                    <Link
                      to={`/ships/${component.shipId}`}
                      onClick={e => e.stopPropagation()}
                      title="View Ship Details"
                    >
                      {/* Ship name should be fetched or passed as prop */}
                      Ship #{component.shipId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {new Date(component.installDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {new Date(component.lastMaintenanceDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center items-center gap-4 text-gray-500">
                      <Link
                        to={`/components/${component.id}`}
                        className="hover:text-gray-900"
                        title="View Component"
                        onClick={e => e.stopPropagation()}
                      >
                        <span className="sr-only">View</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Link>

                      {canEditComponent && (
                        <Link
                          to={`/components/edit/${component.id}`}
                          className="hover:text-indigo-600"
                          title="Edit Component"
                          onClick={e => e.stopPropagation()}
                        >
                          <Edit className="h-6 w-6" />
                        </Link>
                      )}

                      {canDeleteComponent && (
                        <button
                          onClick={e => handleDelete(component.id, e)}
                          className="hover:text-red-600"
                          title="Delete Component"
                          aria-label={`Delete component ${component.name}`}
                        >
                          <Trash2 className="h-6 w-6" />
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
    </section>
  );
};

export default ComponentList;
