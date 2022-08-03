/* eslint-disable react/no-unescaped-entities */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Container, Text } from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import { useCurrentUser } from '~/hooks'
import { CenterLoader, JsonViewDevTool } from '~/components'
export default function ProfilePage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	const { data: session, status } = useSession()
	const { data, isLoading } = useCurrentUser()

	const { query } = useRouter()
	useEffect(() => {
		if (query?.newuser)
			openContextModal({
				modal: 'newUserProgress',
				title: 'Welcome!',
				innerProps: {},
			})
	}, [query])

	return (
		<Container fluid>
			<Text>This is where the profile edit page will go</Text>
			<Text>Here's some jumbly JSON of what your user profile looks like</Text>
			{!isLoading && data ? <JsonViewDevTool data={data} /> : <CenterLoader />}
		</Container>
	)
}

ProfilePage.auth = {
	required: true,
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}
