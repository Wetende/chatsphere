import React, { memo } from 'react'

const ImageGallery03 = (props) => {
  return (
    <>
      <img width="297" height="297" className="w-full max-w-full h-auto" src={props.data.src} alt="grid" />
      <div className="image-box-wrapper absolute w-full h-full left-0 top-0  flex items-center justify-center py-[50px]">
        <i className="feather-zoom-in  text-[28px] font-light	text-white"></i>
      </div>
    </>
  )
}

export default memo(ImageGallery03)