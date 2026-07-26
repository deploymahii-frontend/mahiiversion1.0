import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../constants/routes";

export default function RoleGuard({
  roles = [],
  children,
}) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  if (
    roles.length &&
    !roles.includes(user.role)
  ) {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return children;
}
