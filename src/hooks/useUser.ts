import { prisma, axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'
import superjson from 'superjson'
import { User } from '@prisma/client'

export const fetchCurrentUser = async (userId: string) => {
	const data = await prisma.user.findUniqueOrThrow({
		where: {
			id: userId,
		},
	})
	return data
}

export const fetchCurrentUserAPI = async () => {
	const client = axiosClient()
	const { data } = await client.get('/api/user/me')
	return data
}

export const useCurrentUser = () => {
	const result = useQuery<User>(['user', 'me'], fetchCurrentUserAPI)
	return result
}
