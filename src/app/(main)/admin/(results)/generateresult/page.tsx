import GenerateResultForm from '@/components/forms/generate-pdf-form'
import React from 'react'



const page = () => {
  return (
    <div className="px-4 w-[600px] mx-auto">
        <h1 className="text-2xl text-purple-200 tracking-wide font-bold">
            Generate Result!
        </h1>
        <span className="text-xs sm:text-sm text-purple-400 tracking-wide">
            Generate result for the selected class.
        </span>
        <div className='mt-4'>
        <GenerateResultForm></GenerateResultForm>
        </div>
    </div>
  )
}

export default page