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

export const IconeFlexa = (tamanho = 6) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-${tamanho} w-${tamanho}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
)

export const IconeICon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none" {...props}>
        <path fill="#000" d="M1.063 12.75S0 12.75 0 11.687c0-1.062 1.063-4.25 6.375-4.25 5.313 0 6.375 3.188 6.375 4.25 0 1.063-1.063 1.063-1.063 1.063H1.063Zm5.312-6.375a3.187 3.187 0 1 0 0-6.375 3.187 3.187 0 0 0 0 6.375Z" />
    </svg>
)

export const IconePin = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={17}
        height={17}
        fill="none"
        {...props}
    >
        <path
            fill="#000"
            fillRule="evenodd"
            d="M8.5 1.063c3.188 0 5.313 2.125 5.313 5.312 0 3.188-3.188 6.375-5.313 9.563-2.125-3.188-5.313-6.376-5.313-9.563 0-3.188 2.126-5.313 5.313-5.313Zm0 2.656a2.656 2.656 0 1 0 0 5.312 2.656 2.656 0 0 0 0-5.312Z"
            clipRule="evenodd"
        />
    </svg>
)

export const IconeData = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M0 5.25c0-1.336 0-2.003.415-2.418.415-.415 1.082-.415 2.418-.415h8.5c1.336 0 2.003 0 2.419.415.415.415.415 1.082.415 2.418 0 .334 0 .5-.104.605-.104.103-.272.103-.605.103H.708c-.333 0-.5 0-.605-.103C0 5.75 0 5.583 0 5.25Zm0 6.375c0 1.336 0 2.003.415 2.418.415.415 1.082.415 2.418.415h8.5c1.336 0 2.003 0 2.419-.415.415-.415.415-1.082.415-2.418V8.083c0-.333 0-.5-.104-.605-.104-.103-.272-.103-.605-.103H.708c-.333 0-.5 0-.605.103C0 7.583 0 7.75 0 8.083v3.542Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M3.542 1v2.125M10.625 1v2.125"
    />
  </svg>
)

export const IconeCategoria = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M.708 5.667h4.25a.708.708 0 0 0 .709-.709V.708A.708.708 0 0 0 4.958 0H.708A.708.708 0 0 0 0 .708v4.25a.708.708 0 0 0 .708.709Zm7.084 0h4.25a.708.708 0 0 0 .708-.709V.708A.708.708 0 0 0 12.042 0h-4.25a.708.708 0 0 0-.709.708v4.25a.708.708 0 0 0 .709.709ZM.708 12.75h4.25a.708.708 0 0 0 .709-.708v-4.25a.708.708 0 0 0-.709-.709H.708A.708.708 0 0 0 0 7.792v4.25a.708.708 0 0 0 .708.708Zm9.209 0a2.836 2.836 0 0 0 2.833-2.833 2.836 2.836 0 0 0-2.833-2.834 2.836 2.836 0 0 0-2.834 2.834 2.836 2.836 0 0 0 2.834 2.833Z"
    />
  </svg>
)