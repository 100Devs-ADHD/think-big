import React, { useState } from 'react'
import {
	Navbar,
	Tooltip,
	UnstyledButton,
	createStyles,
	Group,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { mocknav } from 'mockdata/nav'

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.white,
		opacity: 0.85,

		'&:hover': {
			opacity: 1,
			backgroundColor: theme.colors.primary[5],
		},
	},
	active: {
		opacity: 1,
		'&, &:hover': {
			backgroundColor: theme.colors.primary[7],
		},
	},
	icon: {
		fontSize: '2rem',
	},
}))

interface NavbarLinkProps {
	icon: string
	label: string
	active?: boolean
	onClick?(): void
}

export function NavbarLink({ icon, label, active, onClick }: NavbarLinkProps) {
	const { classes, cx } = useStyles()
	return (
		<Tooltip label={label} position='right' withArrow transitionDuration={0}>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon icon={icon} className={classes.icon} />
			</UnstyledButton>
		</Tooltip>
	)
}

const useNavbarStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colors.primary[9],
		margin: 'none',
	},
}))

export function SideNav() {
	const [active, setActive] = useState(2)
	const { classes } = useNavbarStyles()

	const links = mocknav.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	))

	return (
		<Navbar width={{ base: 80 }} p='md' className={classes.navbar}>
			<Group direction='column' align='center' spacing={0}>
				{links}
			</Group>
		</Navbar>
	)
}
