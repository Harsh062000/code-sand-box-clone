import './EditorButton.css'

function EditorButton({ isActive }) {

    function handleClick(){
        //TODO: Implement this in future
    }

  return (
   <>
        <button
            className='editor-button'
            style={{
                color: isActive ? 'white' : "#959eba",
                backgroundColor: isActive ? '#303242' : '#4a4859',
                borderTop: isActive ? '3px solid #0a21eb99' : '3px solid transparent'
            }}
            onClick={handleClick}
        >
            file.js
        </button>
   </>
  )
}

export default EditorButton