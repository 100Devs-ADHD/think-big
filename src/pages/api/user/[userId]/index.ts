import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import { fetchCurrentUser } from '~/hooks'

type ErrorMessage = {
	message?: string
}

type Data = {
	name?: string
}

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorMessage>
) => {
	const session = await getServerSession(req, res)
	const { method, query } = req
	if (!session)
		res.status(401).json({ message: 'You must be logged in to do that.' })
	try {
		if (query.userId === 'me' && method === 'GET') {
			const currentUserProfile = await fetchCurrentUser(session.user.id)
			res.status(200).json(currentUserProfile)
		}
	} catch (error) {
		res.status(500).json(error)
	}
}
export default handler
