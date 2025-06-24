import React from "react";

const UserForm = ({ formData, handleChange, handleSubmit, editUserId }) => {
  return (
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
          maxLength={20}
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
          maxLength={20}
          placeholder='Enter City'
          value={formData.city}
          onChange={handleChange}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
          type='submit'
          disabled={!(formData.name && formData.age && formData.city)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
