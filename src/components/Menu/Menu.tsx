import { Transition, Menu } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, MenuButton, MenuItemButton, MenuItems } from './MenuStyles';


export interface MenuComponentProps {
    setSortBy: (sortBy: "PriceHigh" | "PriceLow" | "DateOld" | "DateNew") => void;
 }

const MenuComponent = ({ setSortBy } : MenuComponentProps) => {    
    const { t, i18n } = useTranslation(); 

    return (
        <>
            <Menu as="div" className="mb-[2.2rem] relative inline-block text-left w-[90%] z-10">
                {({ open }) => (
                    <>
                        <MenuButton >
                            {t("mainPage.sortBy")}
                            <ChevronDown open={open}/>
                        </MenuButton>
                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems>
                                <Menu.Item>
                                    {({ active }) => (
                                        <MenuItemButton onClick={() => setSortBy("PriceLow")} active={active}>{t("mainPage.lowToHigh")}</MenuItemButton>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <MenuItemButton onClick={() => setSortBy("PriceHigh")} active={active}>{t("mainPage.highToLow")}</MenuItemButton>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <MenuItemButton onClick={() => setSortBy("DateNew")} active={active}>{t("mainPage.newFirst")}</MenuItemButton>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <MenuItemButton onClick={() => setSortBy("DateOld")} active={active}>{t("mainPage.oldFirst")}</MenuItemButton>
                                    )}
                                </Menu.Item>
                            </MenuItems>
                        </Transition>
                    </>
                )}
            </Menu>
        </>
    )
}

export default MenuComponent;