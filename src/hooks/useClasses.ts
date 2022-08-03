import { prisma, axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'
import superjson from 'superjson'

/**
 * It fetches all the classes from the database and returns them
 * @returns An array of objects with the following properties:
 * 	id: true,
 * 	title: true,
 * 	classNum: true,
 * 	date: true,
 * 	description: true,
 * 	materialLinks: true,
 * 	tags: true,
 */
export const fetchClasses = async () => {
	try {
		const classes: ClassRecord[] = await prisma.class.findMany({
			select: {
				id: true,
				title: true,
				classNum: true,
				date: true,
				description: true,
				materialLinks: true,
				tags: true,
			},
		})
		return classes
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches all the classes from the server and returns them as an array of ClassRecord objects
 * @returns An array of ClassRecord objects
 */
export const fetchClassesAPI = async (): Promise<ClassRecord[]> => {
	const fetch = axiosClient()
	const { data } = await fetch.get('/api/class/all')
	return data
}

/**
 * `useClasses` is a React hook that returns the result of a query for all classes
 * @returns The result of the useQuery hook.
 */
export const useClasses = () => {
	const result = useQuery<ClassRecord[]>(['classes'], fetchClassesAPI)
	return result
}

export interface CompletedClassesInput {
	userId?: string
	classes?: string[]
}

/* Taking a payload of completed classes, and then it sends that payload to the server, which then
 * updates the database with the new completed classes */
export const upsertManyCompletedClasses = async (
	data: CompletedClassesInput
) => {
	const { userId, classes } = data
	const classCount = classes.length
	const payload = classes.map((classId) =>
		prisma.classStatus.upsert({
			where: {
				classId_userId: {
					classId,
					userId,
				},
			},
			update: {
				status: 'done',
			},
			create: {
				userId,
				classId,
				status: 'done',
			},
		})
	)
	const result = await prisma.$transaction(payload)
	return result
}

/**
 * It takes a payload of completed classes, and then it sends that payload to the server, which then
 * updates the database with the new completed classes
 * @param {CompletedClassesInput} payload - CompletedClassesInput
 * @returns An array of completed classes
 */
export const upsertManyCompletedClassesAPI = async (
	payload: CompletedClassesInput
) => {
	const client = axiosClient()
	const { data } = await client.post(
		`/api/user/${payload.userId}/class/massupdate/`,
		{ data: superjson.serialize(payload) }
	)
	return data
}
