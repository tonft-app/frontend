import { Menu } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"
import styled from "styled-components"


export const MenuButton = styled(Menu.Button)`
	display: flex;;
	justify-content: center;
	align-items: center;
	border: 1px solid #E5E8EB;
	color: #000;
	cursor: pointer;
	font-size: 1.7rem;
	font-weight: 700;
    padding: .8rem 2.5rem;
	background-color: #fff;
    border-radius: 10px;;

	&:hover {
		opacity: 0.8;
	}
`

export const ChevronDown = styled(ChevronDownIcon)<{open: boolean}>`
    transform: ${({open}) => open ? 'rotate(180deg)' : 'rotate(0deg)'};
	margin-left: 1rem;
	height: 2.4rem;
	width: 2.4rem;
`

export const MenuItems = styled(Menu.Items)`
	position: absolute;
    border: 1px solid #E5E8EB;
    border-radius: 10px;
    margin-top: 0.5rem;
	transform-origin: top right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
`
export const MenuItemButton = styled.button<{ active: boolean }>`
	background: #fff;
	border: none;
	border-radius: 10px;
    padding: 1.2rem 2.5rem;
    margin-right: 2rem;
    font-size: 1.7rem;
    font-weight: 700;
	color: ${({ active }) => active ? '#0088CC' : '#000'};
	font-size: 1.7rem;
    align-self: flex-start;
`