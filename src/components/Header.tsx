import { UserService } from "../API/UserService";

const Header = () => {
  const user = UserService.getLoggedUser();

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center rounded-md">
      <div>
        <span className="font-bold">Zalogowany:</span> {user.firstName}{" "}
        {user.lastName}
      </div>
    </header>
  );
};

export default Header;
