import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { extensionToFileType } from '../../../utils/extentionToFileType';


function EditorComponent() {

    let timerId;

    const [editorState, setEditorState] = useState({
        theme: null
    });

    const { activeFileTab } = useActiveFileTabStore();

    const { editorSocket } = useEditorSocketStore();

    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    function handleChange(value) {

        //clear old thimer
        if(timerId !== null){
            clearTimeout(timerId);
        }

        //set the new timer
        timerId = setTimeout(() => {
            const editorContent = value;
            console.log("editor started");
        
            editorSocket?.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab.path
            });
        }, 2000);
        
    }

    // let lang = extensionToFileType(activeFileTab?.extention)

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
            defaultLanguage={ undefined }
            defaultValue='// welcome to the editor'
            options={{
                fontSize: 18,
                fontFamily: 'monospace'
            }}
            language={extensionToFileType(activeFileTab?.extention)}
            onChange={handleChange}
            value={activeFileTab?.value ? activeFileTab.value : '// welcome to the editor' }
            onMount={handleEditorTheme}
        />}
    </>
  )
}

export default EditorComponent