import React from 'react'
import type { GetServerSideProps } from 'next'
import Layout from 'components/Layout'
import Post, { PostProps } from 'components/Post'
import prisma from 'lib/prisma'

const Index = (props) => {
	return <>Hello! I am a placeholder for something much better to come.</>
}

export default Index
