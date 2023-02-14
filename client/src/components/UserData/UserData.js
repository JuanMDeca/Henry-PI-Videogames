import { useAuth0 } from "@auth0/auth0-react";

const UserData = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      {isLoading ? (
        <div>carga</div>
      ) : (
        isAuthenticated ?? (
          <div>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
          </div>
        )
      )}
    </div>
  );
};

export default UserData;
