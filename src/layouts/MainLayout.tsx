import { AppShell } from '@mantine/core'
import { SideNav, HeaderBar } from '~/components'

export const MainLayout = ({ children }) => {
	return (
		<AppShell padding='md' navbar={<SideNav />} header={<HeaderBar />}>
			{children}
		</AppShell>
	)
}
