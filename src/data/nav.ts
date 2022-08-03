type NavItem = {
	icon: string
	label: string
	url: string
}

export const nav: NavItem[] = [
	{ icon: 'fa6-solid:gauge-high', label: 'Home', url: '/dashboard' },
	{ icon: 'fa6-solid:calendar-days', label: 'Calendar', url: '/calendar' },
	{ icon: 'fa6-solid:book', label: 'Assignments', url: '/assignment' },
	{ icon: 'fa6-solid:graduation-cap', label: 'Classes', url: '/class' },
]
