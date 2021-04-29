import { useState } from 'react';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';

const signOutHandler = (e) => {
    e.preventDefault();
    signOut();
};

const Dropdown = ({ children, isVisible }) => (
    <div
        className={`${
            isVisible || 'hidden'
        } text-xs origin-top-right absolute right-0 mt-2 w-25 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
    >
        {children}
    </div>
);

const MenuItem = ({ name, children }) => (
    <div className="py-1" role="menuitem" id={`user-menu-item-${name}`}>
        <div className="text-gray-700 block px-4 py-2">{children}</div>
    </div>
);

const ClickableItem = ({ onClickHandler, name, children }) => (
    <div className="py-1 text-gray-700 hover:text-white hover:bg-gray-700">
        <a
            id={`user-menu-item-${name}`}
            href="#"
            className="block px-4 py-2"
            role="menuitem"
            tabIndex="-1"
            onClick={onClickHandler}
        >
            {children}
        </a>
    </div>
);

const ProfileMenu = () => {
    const [session, loading] = useSession();

    if (loading || !session) return null;

    const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

    const toggleIsProfileMenuVisible = () => {
        setIsProfileMenuVisible((prev) => !prev);
    };

    return (
        <div className="ml-3 relative">
            <div className="pl-2">
                <img
                    role="button"
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    onClick={toggleIsProfileMenuVisible}
                    id="user-menu-button"
                    aria-expanded={isProfileMenuVisible}
                    aria-haspopup="true"
                />
            </div>
            <Dropdown isVisible={isProfileMenuVisible}>
                <MenuItem name="name">{session.user.name}</MenuItem>
                <MenuItem name="email">{session.user.email}</MenuItem>
                <ClickableItem onClickHandler={signOutHandler} name="sign-out">
                    Sign Out
                </ClickableItem>
            </Dropdown>
        </div>
    );
};

export default ProfileMenu;
