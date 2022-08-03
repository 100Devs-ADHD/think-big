import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { fetchClassStatuses, updateClassStatus } from '~/hooks'
import { z } from 'zod'

interface QueryParams {
	classId: string
	userId: string
	action: 'status' | 'update'
}
const updateClassSchema = z.object({
	newStatus: z.enum(['not_started', 'in_progress', 'done']),
})

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const { classId, userId, action } = req.query as Partial<QueryParams>
	const { method, headers } = req

	if (!session) {
		// res.status(401) // disabled for now during dev.
		// res.end()
		console.log('unauthed req for /api/classes/all')
	}
	try {
		switch (action) {
			case 'status':
				if (method !== 'GET') res.status(400).end()
				const classes = await fetchClassStatuses(userId)
				res.status(200).json(classes)
				break
			case 'update':
				if (method !== 'PUT') res.status(400).end()
				const reqBody = updateClassSchema.parse(req.body)
				console.log(reqBody)
				const statusUpdate = await updateClassStatus(
					userId,
					classId,
					reqBody.newStatus
				)
				res.status(200).json(statusUpdate)
				break
		}
	} catch (error) {
		res.status(500).json(error)
	}
}

export default handler
