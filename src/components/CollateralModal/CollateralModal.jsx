/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "@components/Button/Button"

const OptionType = {
  UniswapLP: "UniswapLP",
  CurveLP: "CurveLP",
  AToken: "AToken",
  CToken: "CToken"
}

const options = [
  {
    name: "Uniswap V3 LP Position NFTs",
    type: OptionType.UniswapLP,
    // TODO: load image from public folder, don't use URLs
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1200px-Uniswap_Logo.svg.png"
  },

  {
    name: "Aave aToken",
    type: OptionType.AToken,
    imageUrl: "https://cryptologos.cc/logos/aave-aave-logo.png"
  },

  {
    name: "Compound cToken",
    type: OptionType.CToken,
    imageUrl: "https://cryptologos.cc/logos/compound-comp-logo.png?v=025"
  },
  {
    name: "Curve LP",
    type: OptionType.CurveLP,
    imageUrl: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.png"
  }
]

// TODO: this is hardcoded temporarily
const base64 = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDI5MCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPjxkZWZzPjxmaWx0ZXIgaWQ9ImYxIj48ZmVJbWFnZSByZXN1bHQ9InAwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMG5Namt3SnlCb1pXbG5hSFE5SnpVd01DY2dkbWxsZDBKdmVEMG5NQ0F3SURJNU1DQTFNREFuSUhodGJHNXpQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeWMrUEhKbFkzUWdkMmxrZEdnOUp6STVNSEI0SnlCb1pXbG5hSFE5SnpVd01IQjRKeUJtYVd4c1BTY2paak13WkRCakp5OCtQQzl6ZG1jKyIvPjxmZUltYWdlIHJlc3VsdD0icDEiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwbk1qa3dKeUJvWldsbmFIUTlKelV3TUNjZ2RtbGxkMEp2ZUQwbk1DQXdJREk1TUNBMU1EQW5JSGh0Ykc1elBTZG9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5YytQR05wY21Oc1pTQmplRDBuTWpRd0p5QmplVDBuTVRBd0p5QnlQU2N4TWpCd2VDY2dabWxzYkQwbkl6RTVNVFl3TUNjdlBqd3ZjM1puUGc9PSIvPjxmZUltYWdlIHJlc3VsdD0icDIiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwbk1qa3dKeUJvWldsbmFIUTlKelV3TUNjZ2RtbGxkMEp2ZUQwbk1DQXdJREk1TUNBMU1EQW5JSGh0Ykc1elBTZG9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5YytQR05wY21Oc1pTQmplRDBuTVRNM0p5QmplVDBuTXpBMkp5QnlQU2N4TWpCd2VDY2dabWxzYkQwbkkyVmhOVEl6T1NjdlBqd3ZjM1puUGc9PSIgLz48ZmVJbWFnZSByZXN1bHQ9InAzIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMG5Namt3SnlCb1pXbG5hSFE5SnpVd01DY2dkbWxsZDBKdmVEMG5NQ0F3SURJNU1DQTFNREFuSUhodGJHNXpQU2RvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeWMrUEdOcGNtTnNaU0JqZUQwbk1UUTBKeUJqZVQwbk16WXlKeUJ5UFNjeE1EQndlQ2NnWm1sc2JEMG5JekF3TnpoaU9TY3ZQand2YzNablBnPT0iIC8+PGZlQmxlbmQgbW9kZT0ib3ZlcmxheSIgaW49InAwIiBpbjI9InAxIiAvPjxmZUJsZW5kIG1vZGU9ImV4Y2x1c2lvbiIgaW4yPSJwMiIgLz48ZmVCbGVuZCBtb2RlPSJvdmVybGF5IiBpbjI9InAzIiByZXN1bHQ9ImJsZW5kT3V0IiAvPjxmZUdhdXNzaWFuQmx1ciBpbj0iYmxlbmRPdXQiIHN0ZERldmlhdGlvbj0iNDIiIC8+PC9maWx0ZXI+IDxjbGlwUGF0aCBpZD0iY29ybmVycyI+PHJlY3Qgd2lkdGg9IjI5MCIgaGVpZ2h0PSI1MDAiIHJ4PSI0MiIgcnk9IjQyIiAvPjwvY2xpcFBhdGg+PHBhdGggaWQ9InRleHQtcGF0aC1hIiBkPSJNNDAgMTIgSDI1MCBBMjggMjggMCAwIDEgMjc4IDQwIFY0NjAgQTI4IDI4IDAgMCAxIDI1MCA0ODggSDQwIEEyOCAyOCAwIDAgMSAxMiA0NjAgVjQwIEEyOCAyOCAwIDAgMSA0MCAxMiB6IiAvPjxwYXRoIGlkPSJtaW5pbWFwIiBkPSJNMjM0IDQ0NEMyMzQgNDU3Ljk0OSAyNDIuMjEgNDYzIDI1MyA0NjMiIC8+PGZpbHRlciBpZD0idG9wLXJlZ2lvbi1ibHVyIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMjQiIC8+PC9maWx0ZXI+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVwIiB4MT0iMSIgeDI9IjAiIHkxPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwLjAiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjEiIC8+PHN0b3Agb2Zmc2V0PSIuOSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZC1kb3duIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwLjAiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjEiIC8+PHN0b3Agb2Zmc2V0PSIwLjkiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiIC8+PC9saW5lYXJHcmFkaWVudD48bWFzayBpZD0iZmFkZS11cCIgbWFza0NvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11cCkiIC8+PC9tYXNrPjxtYXNrIGlkPSJmYWRlLWRvd24iIG1hc2tDb250ZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtZG93bikiIC8+PC9tYXNrPjxtYXNrIGlkPSJub25lIiBtYXNrQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiIC8+PC9tYXNrPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZC1zeW1ib2wiPjxzdG9wIG9mZnNldD0iMC43IiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIxIiAvPjxzdG9wIG9mZnNldD0iLjk1IiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwIiAvPjwvbGluZWFyR3JhZGllbnQ+PG1hc2sgaWQ9ImZhZGUtc3ltYm9sIiBtYXNrQ29udGVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3Qgd2lkdGg9IjI5MHB4IiBoZWlnaHQ9IjIwMHB4IiBmaWxsPSJ1cmwoI2dyYWQtc3ltYm9sKSIgLz48L21hc2s+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNjb3JuZXJzKSI+PHJlY3QgZmlsbD0iZjMwZDBjIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI5MHB4IiBoZWlnaHQ9IjUwMHB4IiAvPjxyZWN0IHN0eWxlPSJmaWx0ZXI6IHVybCgjZjEpIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI5MHB4IiBoZWlnaHQ9IjUwMHB4IiAvPiA8ZyBzdHlsZT0iZmlsdGVyOnVybCgjdG9wLXJlZ2lvbi1ibHVyKTsgdHJhbnNmb3JtOnNjYWxlKDEuNSk7IHRyYW5zZm9ybS1vcmlnaW46Y2VudGVyIHRvcDsiPjxyZWN0IGZpbGw9Im5vbmUiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjkwcHgiIGhlaWdodD0iNTAwcHgiIC8+PGVsbGlwc2UgY3g9IjUwJSIgY3k9IjBweCIgcng9IjE4MHB4IiByeT0iMTIwcHgiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuODUiIC8+PC9nPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyOTAiIGhlaWdodD0iNTAwIiByeD0iNDIiIHJ5PSI0MiIgZmlsbD0icmdiYSgwLDAsMCwwKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIC8+PC9nPjx0ZXh0IHRleHQtcmVuZGVyaW5nPSJvcHRpbWl6ZVNwZWVkIj48dGV4dFBhdGggc3RhcnRPZmZzZXQ9Ii0xMDAlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiB4bGluazpocmVmPSIjdGV4dC1wYXRoLWEiPjB4MTkxNjAwNDU2YmMwMmMzZGQxNGIwNzg2MTMxMjAxNDA3YjAwNzhiOSDigKIgV0JUQyA8YW5pbWF0ZSBhZGRpdGl2ZT0ic3VtIiBhdHRyaWJ1dGVOYW1lPSJzdGFydE9mZnNldCIgZnJvbT0iMCUiIHRvPSIxMDAlIiBiZWdpbj0iMHMiIGR1cj0iMzBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz48L3RleHRQYXRoPiA8dGV4dFBhdGggc3RhcnRPZmZzZXQ9IjAlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMHB4IiB4bGluazpocmVmPSIjdGV4dC1wYXRoLWEiPjB4MTkxNjAwNDU2YmMwMmMzZGQxNGIwNzg2MTMxMjAxNDA3YjAwNzhiOSDigKIgV0JUQyA8YW5pbWF0ZSBhZGRpdGl2ZT0ic3VtIiBhdHRyaWJ1dGVOYW1lPSJzdGFydE9mZnNldCIgZnJvbT0iMCUiIHRvPSIxMDAlIiBiZWdpbj0iMHMiIGR1cj0iMzBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4gPC90ZXh0UGF0aD48dGV4dFBhdGggc3RhcnRPZmZzZXQ9IjUwJSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSInQ291cmllciBOZXcnLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTBweCIgeGxpbms6aHJlZj0iI3RleHQtcGF0aC1hIj4weGYzMGQwY2YxNGMxOTc1MWY4ZTQzN2U4MDY5NjgyMTFlZjRlYTUyMzkg4oCiIFVTREMgPGFuaW1hdGUgYWRkaXRpdmU9InN1bSIgYXR0cmlidXRlTmFtZT0ic3RhcnRPZmZzZXQiIGZyb209IjAlIiB0bz0iMTAwJSIgYmVnaW49IjBzIiBkdXI9IjMwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+PC90ZXh0UGF0aD48dGV4dFBhdGggc3RhcnRPZmZzZXQ9Ii01MCUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXNpemU9IjEwcHgiIHhsaW5rOmhyZWY9IiN0ZXh0LXBhdGgtYSI+MHhmMzBkMGNmMTRjMTk3NTFmOGU0MzdlODA2OTY4MjExZWY0ZWE1MjM5IOKAoiBVU0RDIDxhbmltYXRlIGFkZGl0aXZlPSJzdW0iIGF0dHJpYnV0ZU5hbWU9InN0YXJ0T2Zmc2V0IiBmcm9tPSIwJSIgdG89IjEwMCUiIGJlZ2luPSIwcyIgZHVyPSIzMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPjwvdGV4dFBhdGg+PC90ZXh0PjxnIG1hc2s9InVybCgjZmFkZS1zeW1ib2wpIj48cmVjdCBmaWxsPSJub25lIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI5MHB4IiBoZWlnaHQ9IjIwMHB4IiAvPiA8dGV4dCB5PSI3MHB4IiB4PSIzMnB4IiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC13ZWlnaHQ9IjIwMCIgZm9udC1zaXplPSIzNnB4Ij5VU0RDL1dCVEM8L3RleHQ+PHRleHQgeT0iMTE1cHgiIHg9IjMycHgiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlIiBmb250LXdlaWdodD0iMjAwIiBmb250LXNpemU9IjM2cHgiPjAuMyU8L3RleHQ+PC9nPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjI1OCIgaGVpZ2h0PSI0NjgiIHJ4PSIyNiIgcnk9IjI2IiBmaWxsPSJyZ2JhKDAsMCwwLDApIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgLz48ZyBtYXNrPSJ1cmwoI25vbmUpIiBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSg3MnB4LDE4OXB4KSI+PHJlY3QgeD0iLTE2cHgiIHk9Ii0xNnB4IiB3aWR0aD0iMTgwcHgiIGhlaWdodD0iMTgwcHgiIGZpbGw9Im5vbmUiIC8+PHBhdGggZD0iTTEgMUM5IDgxIDY1IDEzNyAxNDUgMTQ1IiBzdHJva2U9InJnYmEoMCwwLDAsMC4zKSIgc3Ryb2tlLXdpZHRoPSIzMnB4IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+PC9nPjxnIG1hc2s9InVybCgjbm9uZSkiIHN0eWxlPSJ0cmFuc2Zvcm06dHJhbnNsYXRlKDcycHgsMTg5cHgpIj48cmVjdCB4PSItMTZweCIgeT0iLTE2cHgiIHdpZHRoPSIxODBweCIgaGVpZ2h0PSIxODBweCIgZmlsbD0ibm9uZSIgLz48cGF0aCBkPSJNMSAxQzkgODEgNjUgMTM3IDE0NSAxNDUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPjwvZz48Y2lyY2xlIGN4PSI3M3B4IiBjeT0iMTkwcHgiIHI9IjRweCIgZmlsbD0id2hpdGUiIC8+PGNpcmNsZSBjeD0iMjE3cHgiIGN5PSIzMzRweCIgcj0iNHB4IiBmaWxsPSJ3aGl0ZSIgLz4gPGcgc3R5bGU9InRyYW5zZm9ybTp0cmFuc2xhdGUoMjlweCwgMzg0cHgpIj48cmVjdCB3aWR0aD0iOTFweCIgaGVpZ2h0PSIyNnB4IiByeD0iOHB4IiByeT0iOHB4IiBmaWxsPSJyZ2JhKDAsMCwwLDAuNikiIC8+PHRleHQgeD0iMTJweCIgeT0iMTdweCIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMnB4IiBmaWxsPSJ3aGl0ZSI+PHRzcGFuIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSI+SUQ6IDwvdHNwYW4+NjU4Mjg8L3RleHQ+PC9nPiA8ZyBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSgyOXB4LCA0MTRweCkiPjxyZWN0IHdpZHRoPSIxMzNweCIgaGVpZ2h0PSIyNnB4IiByeD0iOHB4IiByeT0iOHB4IiBmaWxsPSJyZ2JhKDAsMCwwLDAuNikiIC8+PHRleHQgeD0iMTJweCIgeT0iMTdweCIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMnB4IiBmaWxsPSJ3aGl0ZSI+PHRzcGFuIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSI+TWluIFRpY2s6IDwvdHNwYW4+NTI5ODA8L3RleHQ+PC9nPiA8ZyBzdHlsZT0idHJhbnNmb3JtOnRyYW5zbGF0ZSgyOXB4LCA0NDRweCkiPjxyZWN0IHdpZHRoPSIxMzNweCIgaGVpZ2h0PSIyNnB4IiByeD0iOHB4IiByeT0iOHB4IiBmaWxsPSJyZ2JhKDAsMCwwLDAuNikiIC8+PHRleHQgeD0iMTJweCIgeT0iMTdweCIgZm9udC1mYW1pbHk9IidDb3VyaWVyIE5ldycsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMnB4IiBmaWxsPSJ3aGl0ZSI+PHRzcGFuIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSI+TWF4IFRpY2s6IDwvdHNwYW4+NTg1NjA8L3RleHQ+PC9nPjxnIHN0eWxlPSJ0cmFuc2Zvcm06dHJhbnNsYXRlKDIyNnB4LCA0MzNweCkiPjxyZWN0IHdpZHRoPSIzNnB4IiBoZWlnaHQ9IjM2cHgiIHJ4PSI4cHgiIHJ5PSI4cHgiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiAvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTggOUM4LjAwMDA0IDIyLjk0OTQgMTYuMjA5OSAyOCAyNyAyOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgLz48Y2lyY2xlIHN0eWxlPSJ0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMjFweCwgMjdweCwgMHB4KSIgY3g9IjBweCIgY3k9IjBweCIgcj0iNHB4IiBmaWxsPSJ3aGl0ZSIvPjwvZz48L3N2Zz4=`

export default function Example() {
  const [open, setOpen] = useState(true)
  const [showOptionDetail, setShowOptionDetail] = useState(false)
  const [selectedOptionType, setSelectedOptionType] = useState(null)

  const renderUniswapLPOption = () => {
    return (
      <div>
        <h2 className="mb-8">Your positions</h2>
        <img src={base64} className="w-full h-72" alt="alt" />
      </div>
    )
  }

  const renderOptionDetail = () => {
    if (selectedOptionType === OptionType.UniswapLP) {
      return renderUniswapLPOption()
    }
  }

  const onSelectOption = (optionType) => {
    setSelectedOptionType(optionType)
    setShowOptionDetail(true)
  }

  const renderOptions = () => {
    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          {options.map((option) => (
            <div
              key={option.email}
              className="relative flex items-center space-x-3 rounded-lg border px-3 py-1 shadow-sm hover:opacity-70"
              onClick={() => onSelectOption(option.type)}
            >
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={option.imageUrl} alt="" />
              </div>
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-white-900">{option.name}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 opacity-60 transition-opacity bg-operacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 bg-card">
                {!showOptionDetail && renderOptions()}
                {showOptionDetail && renderOptionDetail()}
                <div className="mt-5 sm:mt-6 w-full">
                  <Button text="Close" className={"w-full"} onClick={() => setOpen(false)} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
