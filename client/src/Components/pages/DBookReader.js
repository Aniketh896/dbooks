import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import {
	EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
	EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
	ReactReader, // A simple epub-reader with left/right button and chapter navigation
	ReactReaderStyle, // Styles for the epub-reader it you need to customize it
	ReaderContainer,
	FontSizeButton,
} from 'react-reader'

const storage = global.localStorage || null

export default function DBookReader({ url, title }) {
	const [location, setLocation] = useState(
		storage && storage.getItem('epub-location') ? storage.getItem('epub-location') : 1
	)

	const [rendition, setRendition] = useState()
	const [largeText, setLargeText] = useState(false)

	const getRendition = rendition => {
		setRendition(rendition)
		rendition.themes.fontSize(largeText ? '140%' : '100%')
	}

	const onToggleFontSize = () => {
		setLargeText(!largeText)
		rendition.fontSize(largeText ? '140%' : '100%')
	}

	useEffect(() => {
		storage && storage.setItem('epub-location', location)
	}, [location])

	return (
		<div style={{ position: 'relative', height: '100%', paddingTop: 64 }}>
			<ReactReader
				url={url}
				title={title}
				location={location}
				locationChanged={setLocation}
				getRendition={getRendition}
			/>
			<Button
				variant='contained'
				style={{ position: 'absolute', bot: 100, left: 100, color: '#b3b3b3' }}
				onClick={onToggleFontSize}>
				Toggle font-size
			</Button>
		</div>
	)
}
