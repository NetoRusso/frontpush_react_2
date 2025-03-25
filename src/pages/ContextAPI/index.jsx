import User from "../../components/User";
import UserProvider from "../../contexts/user";

const ContextAPI = () => {



  return (
    <UserProvider>
      <div className="context-api">
        <h2>Context API</h2>
        <br />
        <User />
      </div>
    </UserProvider>
  )
};

export default ContextAPI;