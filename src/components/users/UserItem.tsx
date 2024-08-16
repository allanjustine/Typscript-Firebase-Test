import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteUser, updateUser } from "../../services/UserService";
import { useUserStore, User } from "../../store/UseUserStore";

interface UserItemProps {
  user: User;
  index: number;
}

const UserItem: React.FC<UserItemProps> = ({ user, index }) => {
  const handleDelete = () => {
    deleteUserMutation.mutate();
  };

  const deleteUserMutation = useMutation(() => deleteUser(user.id), {
    onSuccess: () => {
      useUserStore.getState().deleteUser(user.id);
    },
  });

  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [position, setPosition] = useState(user.position);

  const handleEdit = async () => {
    setIsEdit(true);
  };

  const updateMutation = useMutation(
    ({ id, update }: { id: string; update: Partial<Omit<User, "id">> }) => {
      return updateUser(id, update);
    },
    {
      onSuccess: () => {
        useUserStore.getState().updateUser(user.id, {
          firstName,
          lastName,
          email,
          phone,
          position,
        });
        setIsEdit(false);
      },
    }
  );

  const handleSave = async () => {
    updateMutation.mutate({
      id: user.id,
      update: {
        firstName,
        lastName,
        email,
        phone,
        position,
      },
    });
  };

  return (
    <>
      {isEdit ? (
        <tr>
          <td>{index + 1}</td>
          <td>
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                required
              />
              <label>First Name</label>
            </div>
          </td>
          <td>
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                required
              />
              <label>Last Name</label>
            </div>
          </td>
          <td>
            <div className="form-floating mb-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
              <label>Email</label>
            </div>
          </td>
          <td>
            <div className="form-floating mb-2">
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                required
              />
              <label>Phone</label>
            </div>
          </td>
          <td>
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="form-control"
                required
              />
              <label>Position</label>
            </div>
          </td>
          <td>
            <div className="d-flex justify-space-between gap-1">
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-success btn-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="btn btn-danger btn-sm"
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{index + 1}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.position}</td>
          <td>
            <div className="d-flex justify-space-between gap-1">
              <button onClick={handleEdit} className="btn btn-primary btn-sm">
                Update
              </button>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UserItem;
