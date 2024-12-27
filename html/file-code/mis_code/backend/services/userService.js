const User = require('../models/user');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
     await user.save();
     return user
  } catch (error) {
     throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
    try{
      const users = await User.find()
      return users
    }catch(error){
        throw new Error(`Error getting users: ${error.message}`);
    }
}
const getUserById = async(id)=>{
    try {
       const user = await User.findById(id);
       return user;
    } catch (error) {
       throw new Error(`Error getting user: ${error.message}`);
    }
  }
const updateUser = async (id, updateData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
       throw new Error(`Error updating user: ${error.message}`);
    }
  };

  const deleteUser = async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
  };

  const getUserByUsername = async (username) => {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  };

module.exports = { createUser, getAllUsers,getUserById, updateUser, deleteUser, getUserByUsername };