import { SVGProps } from 'react'

export const IconeX = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
)

export const IconeLupa = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

export const Icone3Bars = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>

)

export const IconeFlexa = ({ className = "h-3 w-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
)

export const IconGear = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)


export const IconeICon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
    className="text-black dark:text-white shrink-0"
    {...props}
  >
    <path fill="currentColor" d="M1.063 12.75S0 12.75 0 11.687c0-1.062 1.063-4.25 6.375-4.25 5.313 0 6.375 3.188 6.375 4.25 0 1.063-1.063 1.063-1.063 1.063H1.063Zm5.312-6.375a3.187 3.187 0 1 0 0-6.375 3.187 3.187 0 0 0 0 6.375Z" />
  </svg>
)

export const IconePin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    className="text-black dark:text-white shrink-0 -ml-[3px]" // Adicionei -ml-[3px] aqui
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.5 1.063c3.188 0 5.313 2.125 5.313 5.312 0 3.188-3.188 6.375-5.313 9.563-2.125-3.188-5.313-6.376-5.313-9.563 0-3.188 2.126-5.313 5.313-5.313Zm0 2.656a2.656 2.656 0 1 0 0 5.312 2.656 2.656 0 0 0 0-5.312Z"
      clipRule="evenodd"
    />
  </svg>
)


export const IconeData = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    className="text-black dark:text-white shrink-0"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 5.25c0-1.336 0-2.003.415-2.418.415-.415 1.082-.415 2.418-.415h8.5c1.336 0 2.003 0 2.419.415.415.415.415 1.082.415 2.418 0 .334 0 .5-.104.605-.104.103-.272.103-.605.103H.708c-.333 0-.5 0-.605-.103C0 5.75 0 5.583 0 5.25Zm0 6.375c0 1.336 0 2.003.415 2.418.415.415 1.082.415 2.418.415h8.5c1.336 0 2.003 0 2.419-.415.415-.415.415-1.082.415-2.418V8.083c0-.333 0-.5-.104-.605-.104-.103-.272-.103-.605-.103H.708c-.333 0-.5 0-.605.103C0 7.583 0 7.75 0 8.083v3.542Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M3.542 1v2.125M10.625 1v2.125"
    />
  </svg>
)

export const IconeArea = (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} className='-m-[3px]' fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z" /><path d="M12 9h3v3h2V7h-5zM9 12H7v5h5v-2H9z" /></svg>

)

export const IconeCategoria = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
    className="text-black dark:text-white shrink-0"
    {...props}
  >
    <path
      fill="currentColor"
      d="M.708 5.667h4.25a.708.708 0 0 0 .709-.709V.708A.708.708 0 0 0 4.958 0H.708A.708.708 0 0 0 0 .708v4.25a.708.708 0 0 0 .708.709Zm7.084 0h4.25a.708.708 0 0 0 .708-.709V.708A.708.708 0 0 0 12.042 0h-4.25a.708.708 0 0 0-.709.708v4.25a.708.708 0 0 0 .709.709ZM.708 12.75h4.25a.708.708 0 0 0 .709-.708v-4.25a.708.708 0 0 0-.709-.709H.708A.708.708 0 0 0 0 7.792v4.25a.708.708 0 0 0 .708.708Zm9.209 0a2.836 2.836 0 0 0 2.833-2.833 2.836 2.836 0 0 0-2.833-2.834 2.836 2.836 0 0 0-2.834 2.834 2.836 2.836 0 0 0 2.834 2.833Z"
    />
  </svg>
)

export const IconEdit = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
)

export const IconDelete = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
)

export const IconOpen = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>

)
