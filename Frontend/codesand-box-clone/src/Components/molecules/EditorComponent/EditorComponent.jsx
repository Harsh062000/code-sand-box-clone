import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';


function EditorComponent() {

    const [editorState, setEditorState] = useState({
        theme: null
    });

    const { editorSocket } = useEditorSocketStore();
    const { setActiveFileTab, activeFileTab } = useActiveFileTabStore();

    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    editorSocket?.on("readFileSuccess", (data) => {
        console.log("REad file success data", data);
        setActiveFileTab(data.path, data.value);
    });

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
            height={"99vh"}
            width={"100%"}
            defaultLanguage={undefined}
            defaultValue='// welcome to the editor'
            options={{
                fontSize: 18,
                fontFamily: 'monospace'
            }}

            value={activeFileTab?.value ? activeFileTab.value : '// welcome to the editor' }
            onMount={handleEditorTheme}
        />}
    </>
  )
}

export default EditorComponent