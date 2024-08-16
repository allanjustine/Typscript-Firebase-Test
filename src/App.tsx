import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AddUser from "./components/users/AddUser";
import UserList from "./components/users/UserList";
import { UseFetchAndUpdate } from "./hook/UseFetchAndUpdate";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

const AppContent: React.FC = () => {
  UseFetchAndUpdate();
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-lg-3 col-sm-3">
          <AddUser />
        </div>
        <div className="col-lg-9 col-sm-9">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default App;
