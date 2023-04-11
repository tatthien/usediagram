import ActionButton from '@/components/ActionButton'
import DownloadIcon from '@/components/icons/DownloadIcon'
import MinusIcon from '@/components/icons/MinusIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import RefreshIcon from '@/components/icons/RefreshIcon'
import mermaid from 'mermaid'
import type { MermaidConfig } from 'mermaid'
import { useRef, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface IPreviewProps {
  content: string
}

export default function Preview({ content }: IPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  mermaid.mermaidAPI.initialize({
    startOnLoad: true,
    securityLevel: 'strict',
    theme: 'neutral',
    flowchart: {
      useMaxWidth: false,
    },
    htmlLabels: true,
  } as MermaidConfig)

  useEffect(() => {
    if (content && previewRef.current) {
      mermaid.mermaidAPI.render('preview', content).then(({ svg }) => {
        if (previewRef.current !== null) {
          previewRef.current.innerHTML = svg
        }
      })
    }
  }, [content])

  function btnDownloadSVGHandler() {
    if (previewRef.current) {
      const svg = previewRef.current.querySelector('svg')
      const blob = new Blob([String(svg?.outerHTML)], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      const date = new Date()
      downloadLink.download = `mermaid-${date.getTime().toString()}.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className='relative h-full bg-gray-50'>
      <TransformWrapper minScale={0.5} centerZoomedOut={true} centerOnInit={true}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent contentClass='tr-comp' wrapperClass='tr-wrapper'>
              <div className='flex h-full w-full items-center justify-center'>
                <div ref={previewRef} key='preview'></div>
              </div>
            </TransformComponent>
            <div className='absolute right-[1rem] top-[1rem]'>
              <div className='flex gap-1'>
                <ActionButton
                  onClick={btnDownloadSVGHandler}
                  variant='secondary'
                  icon={<DownloadIcon />}
                  displayText={true}
                  text='SVG'
                />
              </div>
            </div>
            <div className='absolute bottom-[1rem] left-[1rem]'>
              <div className='flex flex-col gap-1'>
                <ActionButton
                  onClick={() => zoomIn()}
                  variant='secondary'
                  icon={<PlusIcon />}
                  text='Zoom in'
                />
                <ActionButton
                  onClick={() => zoomOut()}
                  variant='secondary'
                  icon={<MinusIcon />}
                  text='Zoom out'
                />
                <ActionButton
                  onClick={() => resetTransform()}
                  variant='secondary'
                  icon={<RefreshIcon />}
                  text='Reset'
                />
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}
