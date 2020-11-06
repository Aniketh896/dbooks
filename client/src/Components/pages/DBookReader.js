import { Button } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { ReactReader } from 'react-reader'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const storage = global.localStorage || null

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

export default function DBookReader() {
	const [location, setLocation] = useState(
		storage && storage.getItem('epub-location') ? storage.getItem('epub-location') : 1
	)

	const query = useQuery()
	const url = `https://cloudflare-ipfs.com/ipfs/${query.get('ipfsHash')}/dbook.epub`
	const DBReaderRef = useRef()

	useEffect(() => {
		const reader = new FileReader();

		reader.addEventListener("load", function() {
			console.log('[DEBUG] reader.result: ', reader.result)
			const dbook = new window.ePub(reader.result);
			console.log('[DEBUG] dbook: ', dbook)
			// dbook.renderTo(DBReaderRef, { flow: "paginated"})
		}, false);

		axios.get(url, {
			responseType: 'blob',
		}).then(response => {
			console.log('[DEBUG] response: ', response)
			console.log('[DEBUG] response.data: ', response.data)
			if (response.data) {
				reader.readAsArrayBuffer(response.data);
				// DBReaderRef.src = URL.createObjectURL(response.data)
			}
		});
	}, [])

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
		console.log('[DEBUG] url: ', url)
	}, [])

	useEffect(() => {
		storage && storage.setItem('epub-location', location)
	}, [location])

	return (
		<div style={{ position: 'relative', height: '100%', paddingTop: 64 }}>
			<ReactReader
				url={url || '/alice.epub'}
				title={query.get('title')}
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
