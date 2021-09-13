import React, { useMemo, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import ReactPlayer from "react-player/lazy"
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons"
import { getFileExt } from "helper/getExt"
import "./styles.scss"

const isVideo = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) === null

const MediaCard = ({
  url = "",
  playing = false,
  preview = true,
  frame = false,
  className,
  ...rest
}) => {
  const [isPlaying, setPlay] = useState(playing)
  const [isPreview, setLoadVideo] = useState(preview)
  const [mouseLeave, setMouseLeave] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)

  const uri = useMemo(() => {
    if (!url) {
      return `${process.env.REACT_APP_IMAGEHOST}/coming-soon.gif`
    }
    if (url?.match(/^\.|^(http)/)) {
      return url
    }
    return `${process.env.REACT_APP_IMAGEHOST}/${url}`
  }, [url])

  const getImgUrl = (imgUrl) => {
    const ext = getFileExt(imgUrl)
    if (!ext || ext === "mp4") {
      return `${imgUrl}.png`
    }
    return imgUrl
  }

  const setPlayMovie = (status) => {
    setPlay(status)
    if (preview) {
      setLoadVideo(false)
    }
  }
  const handleMouseLeave = () => {
    setMouseLeave(true)
    setMouseOver(false)
  }
  const handleMouseOver = () => {
    setMouseOver(true)
    setMouseLeave(false)
  }
  const handleFocus = () => {
    console.log("focus")
  }
  const classes = useMemo(() => {
    let base = "videoControlButton"
    if (mouseLeave && isPlaying) {
      base = `${base} leave`
    }
    if (mouseOver) {
      base = `${base} over`
    }
    return base
  }, [mouseLeave, mouseOver, isPlaying])
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      onFocus={handleFocus}
      className={`player-wrapper ${className} ${frame && "frame"}`}
      {...rest}
    >
      {(isPreview && !playing) || !isVideo(uri) ? (
        <div className="video-card">
          <LazyLoadImage
            alt="lazy-loading-card"
            src={getImgUrl(uri)}
            width="100%"
            height="100%"
            className={className}
            {...rest}
          />
        </div>
      ) : (
        <ReactPlayer
          className="video-card"
          url={uri}
          playing={isPlaying}
          muted
          loop
          width="100%"
          height="100%"
          onClickPreview={() => setPlay(true)}
        />
      )}

      {/* when it is only a video section */}
      {isVideo(uri) && !playing && (
        <div className={classes}>
          {isPlaying ? (
            <PauseCircleOutlined onClick={() => setPlayMovie(false)} />
          ) : (
            <PlayCircleOutlined onClick={() => setPlayMovie(true)} />
          )}
        </div>
      )}
    </div>
  )
}

export default MediaCard
