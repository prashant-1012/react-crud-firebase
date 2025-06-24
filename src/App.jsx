
// ===================== Splited above code into components (UserForm, UserList, Pagination) ========================
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import Pagination from "./Components/Pagination";
import { db } from "./firebase";
import { ref, onValue, push, set, update, remove } from "firebase/database";

function App() {
  const [formData, setFormData] = useState({ name: "", age: "", city: "" });
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.city) {
      if (editUserId) {
        const userRef = ref(db, `users/${editUserId}`);
        update(userRef, formData).then(() => {
          setFormData({ name: "", age: "", city: "" });
          setEditUserId(null);
          toast.success("User updated successfully ✅");
        });
      } else {
        const newUserRef = push(ref(db, "users"));
        set(newUserRef, formData).then(() => {
          setFormData({ name: "", age: "", city: "" });
          toast.success("User added successfully 🎉");
        });
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, age: user.age, city: user.city });
    setEditUserId(user.id);
  };

  const handleDelete = (id) => {
    const userRef = ref(db, `users/${id}`);
    remove(userRef).then(() => {
      if (editUserId === id) {
        setFormData({ name: "", age: "", city: "" });
        setEditUserId(null);
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cityMatch = filterCity === "" || user.city.toLowerCase() === filterCity.toLowerCase();
    return searchMatch && cityMatch;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='grid grid-cols-2 gap-6 p-5 min-h-screen bg-gray-100'>
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editUserId={editUserId}
        />
        <div>
          <UserList
            users={users}
            currentUsers={currentUsers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCity={filterCity}
            setFilterCity={setFilterCity}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}

export default App;
