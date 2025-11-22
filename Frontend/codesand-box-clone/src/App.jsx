import './App.css'
import usePing from './hooks/apis/queries/usePing'

function App() {

  const {
        isLoading,
        isError,
        data,
        error
      } = usePing();

  if(isLoading){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <h2>
        this is conel project {data.message}
      </h2>
    </>
  )
}

export default App
