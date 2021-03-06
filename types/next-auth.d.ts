import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

declare module 'next-auth' {
	interface DiscordGuild {
		id: string
	}

	interface AxiosResponse {
		data: DiscordGuild[]
	}

	interface Session {
		user: {
			id: User['id']
			role: User['role']
			name: User['name']
			image: User['image']
			discordTag: User['discordId']
		}
	}
	interface User {
		id?: string
		role?: 'USER' | 'MOD' | 'ADMIN'
		name?: string
		discordId?: string
		discordTag?: string
	}
}

declare module 'next-auth/providers/discord' {
	interface DiscordProfile {
		discordId: string
	}
}
