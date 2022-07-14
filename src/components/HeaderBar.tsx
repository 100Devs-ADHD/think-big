import { Icon } from '@iconify/react'
import { Center, Group, Image, createStyles, TextInput } from '@mantine/core'
import { NavbarLink, UserMenu } from './'
import { fakeUser } from 'mockdata'
const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.colors[theme.primaryColor][9],
		padding: '0 10px',
	},
	logo: {
		marginTop: theme.spacing.sm,
		marginBottom: theme.spacing.sm,
		height: 60,
		width: 60,
	},
	searchContainer: {
		flexGrow: 1,
	},
	searchBox: {
		width: 400,
	},
}))

export const HeaderBar = () => {
	const { classes } = useStyles()

	return (
		// <Header className={classes.header} height={80}>
		<Group className={classes.header}>
			<Image
				src='/logo-temp.png'
				className={classes.logo}
				alt='logo placeholder'
				height={60}
				width={60}
			/>
			<Center className={classes.searchContainer}>
				<TextInput
					aria-label='Search'
					placeholder='Search'
					rightSection={<Icon icon='tabler:search' />}
					className={classes.searchBox}
				/>
			</Center>
			<UserMenu name={fakeUser.name} image={fakeUser.image} />
		</Group>
		// </Header>
	)
}
