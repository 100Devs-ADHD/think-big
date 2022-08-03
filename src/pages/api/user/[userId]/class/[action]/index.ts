import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import { upsertManyCompletedClasses } from '~/hooks'
import * as z from 'zod'
import superjson from 'superjson'

type Data = {
	[key: string]: any
}
interface QueryParams {
	userId: string
	action: 'massupdate'
}

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const session = await getServerSession(req, res)
	const { userId, action } = req.query as Partial<QueryParams>
	const { body, method } = req
	const massUpdateSchema = z.object({
		userId: z.literal(userId, { invalid_type_error: 'Invalid userId' }),
		classes: z.array(z.string()).nonempty(),
	})
	const payload = superjson.deserialize(body.data)
	if (!session) res.status(401).json({ message: 'Unauthorized' })

	try {
		if (method !== 'POST' || action !== 'massupdate')
			res.status(400).json({ message: 'Invalid request' })
		const validatedPayload = massUpdateSchema.safeParse(payload)
		if (validatedPayload.success === false)
			throw validatedPayload.error.format()
		const mutation = await upsertManyCompletedClasses(validatedPayload.data)
		res.status(200).json(mutation)
	} catch (error) {
		res.status(500).json(error)
	}
}
export default handler
