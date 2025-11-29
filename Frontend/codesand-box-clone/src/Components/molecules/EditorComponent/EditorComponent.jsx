import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';

function EditorComponent() {

    const [editorState, setEditorState] = useState({
        theme: null
    });

    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    useEffect(() => {

        async function loadTheme() {
            const response = await fetch('/Dracula.json');
            const data = await response.json();
            setEditorState(prev => ({ ...prev, theme: data }));
        }

        loadTheme();
    }, []);

  return (
    <>
        { editorState.theme && <Editor 
            height={"80vh"}
            width={"100%"}
            defaultLanguage='javascript'
            defaultValue='// welcome to the editor'
            options={{
                fontSize: 18,
                fontFamily: 'monospace'
            }}
            onMount={handleEditorTheme}
        />}
    </>
  )
}

export default EditorComponent