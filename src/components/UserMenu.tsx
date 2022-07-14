import {
	UnstyledButton,
	Group,
	Avatar,
	Menu,
	createStyles,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import styles from './UserMenu.module.scss'

// This is Typescript stuff - don't worry about it.
interface UserMenuProps {
	image: string
	name: string
}
// end Typescript stuff

const useStyles = createStyles((theme) => ({
	userMenu: {
		// [ theme.fn.smallerThan( 'xs' ) ]: {
		//     display: 'none',
		// },
	},
	user: {
		color: theme.colors.primary[0], //theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',
		'&:hover': {
			backgroundColor: theme.colors.primary[5],
			// theme.colorScheme === 'dark'
			// 	? theme.colors.dark[8]
			// 	: theme.colors.primary[6],
		},
	},
	userActive: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},
	name: {
		color: theme.colors.primary[0],
	},
}))

export const UserMenu = ({ image, name, ...others }: UserMenuProps) => {
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { classes, cx, theme } = useStyles()
	return (
		<Menu
			size={260}
			placement='end'
			transition='pop-top-right'
			className={classes.userMenu}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			control={
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar
							src={image}
							radius='xl'
							alt={name}
							className={styles.avatarShadow}
						/>
						<Icon icon='tabler:chevron-down' />
					</Group>
				</UnstyledButton>
			}
		>
			<Menu.Item>Item 1</Menu.Item>
			<Menu.Item>Item 2</Menu.Item>
		</Menu>
	)
}
