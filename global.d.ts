declare global
{
  interface Document
  {
    _flowerInt: {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      Init: (main: any) => void
    }
  }
}

export { };
