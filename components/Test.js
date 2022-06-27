import  { useSSE } from 'use-sse'
export default function Test() {
  const [data, error ] =  useSSE(() => { 
    return fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(response =>  response.json())
  },[])



    return <div>{JSON.stringify(data)}</div>;
  }
  