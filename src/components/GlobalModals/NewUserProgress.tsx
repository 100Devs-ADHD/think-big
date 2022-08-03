import { useState, useEffect, FormEventHandler } from 'react'
import {
	Button,
	Radio,
	Text,
	createStyles,
	Stack,
	Select,
	Loader,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { closeModal } from '@mantine/modals'
import {
	useClasses,
	upsertManyCompletedClassesAPI,
	CompletedClassesInput,
	keyClassStatuses,
} from '~/hooks'
import { DateTime } from 'luxon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useStyles = createStyles((theme) => ({
	radioBtn: {
		'input:checked': {
			backgroundColor: theme.colors.secondary[4],
		},
	},
	comboItem: {
		'&[data-selected]': {
			'&, &:hover': {
				backgroundColor: theme.colors.highlightPrimary[1],
				color: theme.colors.black,
			},
		},

		// applies styles to hovered item (with mouse or keyboard)
		'&[data-hovered]': {},
	},
}))

type FormValues = {
	status: 'new' | 'catchUp' | 'current' | ''
	lastCompleted: number
}
type ComboItems = {
	id: string
	label: string
	value: number
	description: string
	title: string
}

export const NewUserProgressModal = () => {
	const [radioValue, setRadioValue] = useState('')
	const [natSelDisabled, setNatSelDisabled] = useState(true)
	const [selectArr, setSelectArr] = useState<ComboItems[]>([])
	const [selectItems, setSelectItems] = useState({
		data: selectArr,
		updated: false,
	})
	const { classes: styles } = useStyles()
	const { data, isLoading, isFetched } = useClasses()
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const form = useForm<FormValues>({
		initialValues: {
			status: '',
			lastCompleted: null,
		},
	})
	const notifySuccess = (numRecords: number) =>
		showNotification({
			id: 'newUserClassUpdateSuccess',
			title: 'Saved!',
			message: `Successfully updated ${numRecords} records.`,
		})

	useEffect(() => {
		if (!isLoading && data) {
			const transformedData = data.map((item, i) => {
				const date = DateTime.fromISO(item.date.toString()).toLocaleString(
					DateTime.DATE_MED_WITH_WEEKDAY
				)
				return {
					id: item.id,
					label: `Class ${item.classNum} - ${date}`,
					value: i,
					description: item.description,
					title: item.title,
				}
			})
			setSelectArr(transformedData)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, data, isFetched])

	useEffect(() => {
		if (form.values.status === 'catchUp') {
			setNatSelDisabled(false)
		} else {
			setNatSelDisabled(true)
		}
	}, [form.values.status])
	useEffect(() => {
		console.log('form values', form.values)
	}, [form.values])

	const dataAggregator = (lastCompleted: number) => {
		const sliceEnd = +lastCompleted + 1
		const classIdArr: string[] = selectArr
			.slice(0, sliceEnd)
			.map((item) => item.id)
		console.log(classIdArr)
		const response: CompletedClassesInput = {
			userId: session.user.id,
			classes: classIdArr,
		}
		return response
	}

	const dataSubmit = useMutation((dataInput: number) =>
		upsertManyCompletedClassesAPI(dataAggregator(dataInput))
	)
	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		dataSubmit.mutate(form.values.lastCompleted, {
			onSuccess: (data) => {
				const records: number = data.length
				queryClient.invalidateQueries(keyClassStatuses(session.user.id))
				notifySuccess(records)
				closeModal('newUserProgress')
			},
		})
	}

	if (!data && isLoading) return <Loader />

	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing='lg'>
				<Text>
					When you have a moment, please go to your account settings and
					complete your profile. For now, just one quick question.
				</Text>
				<Radio.Group
					value={radioValue}
					onChange={setRadioValue}
					label='Where are you on your 100Devs journey?'
					description='please choose one'
					orientation='vertical'
					required
					spacing='md'
					className={styles.radioBtn}
					{...form.getInputProps('status')}
				>
					<Radio
						value='new'
						label='I am just starting my journey!'
						disabled={dataSubmit.isLoading}
					/>

					<Radio
						value='catchUp'
						label="I've started, but not caught up."
						disabled={dataSubmit.isLoading}
					/>
					{natSelDisabled ? null : (
						<Select
							value={form.values.lastCompleted}
							placeholder={isLoading ? 'Loading data...' : 'Select class'}
							label='Please select your most recently completed class:'
							description={
								!form.values.lastCompleted
									? null
									: `Title: ${selectArr[form.values.lastCompleted]?.title}` ||
									  null
							}
							descriptionProps={{
								sx: {
									fontSize: '.8rem',
									color: 'black',
									paddingLeft: '.35rem',
								},
							}}
							disabled={isLoading || dataSubmit.isLoading}
							classNames={{ item: styles.comboItem }}
							data={selectArr}
							required={!natSelDisabled}
							{...form.getInputProps('lastCompleted')}
						/>
					)}
					<Radio
						value='current'
						label='I am caught up with the most recent class'
						disabled={dataSubmit.isLoading}
					/>

					{/* <Radio value='unsure' label="I'm not sure" disabled={submitting} /> */}
				</Radio.Group>

				<Button
					color='highlightPrimary'
					type='submit'
					loading={dataSubmit.isLoading}
					fullWidth
					sx={{
						root: {
							marginTop: '1rem',
							paddingBottom: '1rem',
						},
					}}
				>
					{dataSubmit.isLoading ? 'Submitting' : 'Submit'}
				</Button>
			</Stack>
		</form>
	)
}
