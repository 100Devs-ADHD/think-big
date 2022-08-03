import {
	UnstyledButton,
	Group,
	Avatar,
	Menu,
	Button,
	Text,
	createStyles,
	Center,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './UserMenu.module.scss'
import { useRouter } from 'next/router'

// This is Typescript stuff - don't worry about it.
interface LoggedInProps {
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
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '',
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
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '',
	},
	icon: {
		// fontSize: '2.5rem',
		marginRight: '2rem',
	},
}))

const LoggedInUser = ({ image, name }: LoggedInProps) => {
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { classes } = useStyles()
	const router = useRouter()

	return (
		<Menu
			position='bottom'
			transition='scale-y'
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			width={200}
		>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar
							src={image}
							radius='xl'
							size='lg'
							alt={name}
							className={styles.avatarShadow}
						/>
						<Icon icon='fa6-solid:chevron-down' height='18' />
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					component={NextLink}
					href='/dashboard/profile'
					icon={<Icon icon='fa6-solid:user-pen' height='20' />}
				>
					<Center>Profile</Center>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					onClick={() => signOut({ callbackUrl: '/' })}
					icon={<Icon icon='fa6-solid:door-open' height='20' />}
				>
					<Center>Logout</Center>
				</Menu.Item>
				{/* <Menu.Item>Item 2</Menu.Item> */}
			</Menu.Dropdown>
		</Menu>
	)
}

const SignUpLoginButtons = () => {
	const { classes, theme } = useStyles()
	return (
		<Group>
			<Button
				variant='outline'
				color='highlightPrimary'
				onClick={() => signIn('discord', null, { prompt: 'consent' })}
			>
				Sign Up with Discord
			</Button>
			<Button
				onClick={() => signIn('discord', null, { prompt: 'none' })}
				variant='filled'
				color='highlightPrimary'
			>
				Log In with Discord
			</Button>
		</Group>
	)
}

export const UserMenu = () => {
	const { classes } = useStyles()
	const { data: session, status } = useSession()
	const { name, image } = session?.user || { name: '', image: '' }
	const menuControl = () => {
		if (status === 'authenticated') {
			return <LoggedInUser name={name} image={image} />
			// return <></>
		}
		if (status === 'unauthenticated') {
			return <SignUpLoginButtons />
		}
		return <Text>Loading...</Text>
	}
	return menuControl()
}
