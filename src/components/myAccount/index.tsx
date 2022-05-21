/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import ProfileComponent from "./updateProfile";

import ChangePasswordComponent from "./updatePassword";
import { useUsers, Status } from "../../hooks/useUsers";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const MyAccountComponent = () => {
  const { setUserById, userInfo, status } = useUsers();

  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    if (!user) {
      history.push("/auth/login");
    } else {
      if (user?._id) {
        setUserById(user._id);
      }
    }
  }, [user]);
  return !user || status === Status.Loading ? (
    <div className="container">
      <p className="text-white fs-3">Cargando...</p>
    </div>
  ) : (
    <div className="w-100">
      <ProfileComponent profile={userInfo} />
      <ChangePasswordComponent profile={userInfo} />
    </div>
  );
};

export default MyAccountComponent;
