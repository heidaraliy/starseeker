import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute = ({ component: Component, ...args }) => {
  console.log('User is accessing a protected route.');
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ProtectedComponent = withAuthenticationRequired(Component);
  return <ProtectedComponent {...args} />;
};

export default ProtectedRoute;
