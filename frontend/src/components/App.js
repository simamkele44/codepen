import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import Files from './Files';
import {AiOutlineScan} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';
import {BsGithub} from 'react-icons/bs';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [java, setJava] = useLocalStorage('java', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${java}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, java, js]);

  return (
    <>
      <div className="pane btns_container">
        <div className="top_panel">
            <AiOutlineScan className="scan_icon"/>
            <p>Scanner Codepen</p>
        </div>
        <div className="top_panel">
          <p>Generate TypeScript Interface from a Java Object Orientated Program</p>
          <AiFillHeart className="heart_icon"/>
        </div>
        <div className="top_panel">
        <a href={`https://google.com`} className="git_icon_container" target='_blank'><BsGithub className="git_icon"/></a>
          
        </div>
      </div>
      <div className="pane top-pane">
        <Files/>
        <Editor
          language="text/x-java"
          displayName="Java OOP"
          value={java}
          onChange={setJava}
        />
        <Editor
          language="text/typescript"
          displayName="TypeScript Interface"
          value={js}
          onChange={setJs}
          ts={true}
        />
      </div>

    </>
  )
}

export default App;
