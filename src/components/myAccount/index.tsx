/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import ProfileComponent from "./updateProfile";

import ChangePasswordComponent from "./updatePassword";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useProfile, Status } from "../../hooks/useProfile/useProfile";
import DisableAccountComponent from "./disableAccount";
import { savePathname } from "../../utils/location";

const MyAccountComponent = () => {
  const { setProfileById, profileInfo, status } = useProfile();

  const { user } = React.useContext<any>(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    savePathname();
  }, []);

  React.useEffect(() => {
    if (!user) {
      history.replace("/auth/login");
    } else {
      if (user?._id) {
        setProfileById(user._id);
      }
    }
  }, [user]);
  return !user || status === Status.Loading ? (
    <div className="container">
      <p className="text-white fs-4">Cargando...</p>
    </div>
  ) : (
    <div className="w-100">
      <ProfileComponent profile={profileInfo} />
      <ChangePasswordComponent profile={profileInfo} />
      <DisableAccountComponent profile={profileInfo} />
    </div>
  );
};

export default MyAccountComponent;
