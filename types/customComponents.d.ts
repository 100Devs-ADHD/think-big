import type { User } from 'next-auth'
import type { AppProps } from 'next/app'
import React from 'react'

declare interface AuthWrapProps {
	required?: boolean
	children?: AppProps['children']
	role?: User['role']
	loader?: JSX.Element
	// redirectTo?: 'signin' | 'accessdenied'
}

export type ComponentWithAuth<PropsTypes = any> = React.FC<PropsTypes> & {
	auth?: AuthWrapProps
}
