import React from 'react'
import appwriteService from "../AppWrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id,Title,featuredImage}) {
  return (
    <Link
    to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img
                src={appwriteService.getFileView(featuredImage)}
                alt={Title}
                className='rounded-xl'
                >
                </img>
            </div>
            <h2
            className='text-xl font-bold '>{Title}</h2>
        </div>
    </Link>
  )
}

export default PostCard