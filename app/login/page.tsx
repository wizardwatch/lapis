import LoginForm from './LoginForm';
import { getUsernames } from '../../lib/notes';

export default function LoginPage() {
  const usernames = getUsernames();
  return <LoginForm usernames={usernames} />;
}

