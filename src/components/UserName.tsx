import { User } from '../types/User';

interface UserNameProps {
  user: User;
}

export function UserName({ user }: UserNameProps) {
  return (
    <div>
      <h3>Witaj, {user.firstName} {user.lastName}</h3>
    </div>
  );
}