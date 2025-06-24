import { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios

function App() {
  const [formData, setFormData] = useState({ name: "", age: "", city: ""});
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  // Get Users on First Load (GET API call) - This can also be changed to Axios
  useEffect(() => {
    // Axios GET request
    axios.get("http://localhost:3001/users")
      .then((res) => setUsers(res.data)) // Axios automatically parses JSON to res.data
      .catch((error) => console.error("Error fetching users:", error)); // Axios handles HTTP errors directly in .catch
  }, []);

  //Handle Input Change
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form Submit (POST or Patch API call) - add or update user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.age && formData.city) {
      if (editUserId) {
        // Update existing user (PATCH API call) with Axios
        axios.patch(`http://localhost:3001/users/${editUserId}`, formData) // Axios automatically strings JSON and sets Content-Type
          .then((res) => {
            const updatedUser = res.data; // Axios response data is already parsed
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
            setFormData({ name: "", age: "", city: ""});
            setEditUserId(null);
          })
          .catch((error) => console.error("Error updating user:", error)); // Axios catches HTTP errors here

      } else {
        // Add new user (POST API call) with Axios
        axios.post("http://localhost:3001/users", formData) // Axios automatically strings JSON and sets Content-Type
          .then((res) => {
            const newUser = res.data; // Axios response data is already parsed
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setFormData({ name: "", age: "", city: ""});
          })
          .catch((error) => console.error("Error adding user:", error)); // Axios catches HTTP errors here
      }
    }
  };

  // ... (rest of your code, handleEdit and handleDelete remain the same if you only change the fetch calls)

  // Handle Edit button (when clicked)
  const handleEdit = (user) => {
    setFormData({ name: user.name, age: user.age, city: user.city});
    setEditUserId(user.id);
  };

  // Handle Delete button (when clicked) - You could also change this to Axios
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`) // Axios delete method
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        if (editUserId === id) {
          setFormData({ name: "", age: "", city: ""});
          setEditUserId(null);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };


  return (
    <div className='grid grid-cols-2 gap-6 p-6 min-h-screen bg-gray-100'>
      {/* ✍️ Form Section */}
      <div className='bg-white p-6 rounded shadow'>
        <h2 className='text-2xl font-semibold mb-4 text-blue-600'>
          {editUserId ? "Edit User ✏️" : "Add User 🧍"}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            className='border p-2 w-full'
            type='text'
            name='name'
            placeholder='Enter Name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className='border p-2 w-full'
            type='number'
            name='age'
            placeholder='Enter Age'
            value={formData.age}
            onChange={handleChange}
          />
          <input
            className='border p-2 w-full'
            type='text'
            name='city'
            placeholder='Enter City'
            value={formData.city}
            onChange={handleChange}
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 '
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>

      {/* 📋 User Table Section */}
      <div className='bg-white p-6 rounded shadow overflow-auto'>
        <h3 className='text-xl font-semibold mb-4 text-green-600'>
          User List
        </h3>
        {users.length === 0 ? (
          <p className='text-gray-500'>No Users Yet</p>
        ) : (
          <table className='table-auto w-full border'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Age</th>
                <th className='border px-4 py-2'>City</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='text-center'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.age}</td>
                  <td className='border px-4 py-2'>{user.city}</td>
                  <td className='border px-4 py-2 space-x-2'>
                    <button
                      onClick={() => handleEdit(user)}
                      className='bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;