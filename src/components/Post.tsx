import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import { MDXProvider } from '@mdx-js/react'

export type PostProps = {
	id: number
	title: string
	author: {
		name: string
		email: string
	} | null
	content: string
	published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
	const authorName = post.author ? post.author.name : 'Unknown author'
	return (
		<div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
			<h2>{post.title}</h2>
			<small>By {authorName}</small>
			<MDXProvider>{post.content}</MDXProvider>
			<style jsx>{`
				div {
					color: inherit;
					padding: 2rem;
				}
			`}</style>
		</div>
	)
}

export default Post
