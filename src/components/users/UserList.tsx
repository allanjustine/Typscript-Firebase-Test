import React from "react";
import { useUserStore } from "../../store/UseUserStore";
import { UseFetchAndUpdate } from "../../hook/UseFetchAndUpdate";
import UserItem from "./UserItem";

const UserList: React.FC = () => {
  const users = useUserStore((state) => state.users);
  const { isLoading } = UseFetchAndUpdate();
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>All Users</h3>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <span className="spinner-border text-primary"></span>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => <UserItem user={user} index={index} />)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
