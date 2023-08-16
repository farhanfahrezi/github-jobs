import { useAppSelector } from "@/store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const UserDropdown = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            size: "sm",
            color: "primary",
            isBordered: true,
            src: user?.image || "",
          }}
          className="transition-transform"
          description={user?.email}
          name={user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        variant="flat"
        onAction={(actionKey) => {
          switch (actionKey) {
            case "logout":
              signOut();
              break;

            default:
              break;
          }
        }}
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
