import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserList = ({
  users,
  currentUsers,
  searchTerm,
  setSearchTerm,
  filterCity,
  setFilterCity,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className='bg-white p-6 rounded shadow flex flex-col justify-between'>
      <h3 className='text-xl font-semibold mb-4 text-green-600'>User List</h3>

      {/* Search + Filter */}
      <div className='grid grid-cols-3 gap-3 p-3 bg-gray-100'>
        <input
          type="text"
          placeholder='Search by name...'
          className='border p-2 w-full mb-4'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='border p-2 w-full mb-4 bg-white text-gray-900'
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {[...new Set(users?.map(user => user.city))].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

          <button
          className="bg-gray-300 p-2 w-full mb-4 rounded hover:bg-gray-400"
          onClick={() => {
            setSearchTerm("");
            setFilterCity("");
  
          }}
          >
            Reset Filters
          </button>

      </div>

      {/* Table */}
      {currentUsers.length === 0 ? (
        <p className='text-gray-500'>No Users Yet</p>
      ) : (
        <div className='overflow-auto max-h-[460px]'>
          <table className='table-auto w-full border'>
            <thead className='bg-sky-50 sticky top-0 z-10 shadow-md'>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Age</th>
                <th className='border px-4 py-2'>City</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className='text-center'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.age}</td>
                  <td className='border px-4 py-2'>{user.city}</td>
                  <td className='border px-4 py-2 space-x-2'>
                    <button
                      onClick={() => handleEdit(user)}
                      className='bg-yellow-400 p-2 text-white rounded hover:bg-yellow-500'
                      title='Edit'
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
                      title='Delete'
                    >
                      <FaTrash />
                    </button>
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

export default UserList;
