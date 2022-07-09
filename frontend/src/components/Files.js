import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {VscTriangleRight} from 'react-icons/vsc';
import {FaFileUpload} from 'react-icons/fa';
import {AiFillFileAdd} from 'react-icons/ai';
import {HiUpload} from 'react-icons/hi';
import $ from "jquery";
import {RiCupFill} from 'react-icons/ri';
import {HiPencil} from 'react-icons/hi';
import {MdOutlineClear} from 'react-icons/md';
import useLocalStorage from '../hooks/useLocalStorage';
import {AiFillFile} from 'react-icons/ai';

const Files = (props) => {

  const [upload_hover, setUploadHover] = useState(false);
  const [file_hover, setFileHover] = useState(false);
  const [file_input, setFileInput] = useState(false);
  const [active_file, setActiveFile] = useLocalStorage('activefile', 'Student.java');
  const [filelist_hover, setFileListHover] = useState("nbs");
  const [files, setFiles] = useLocalStorage('filenames', ['Student.java','Node.java', 'Stack.java', 'Employee.java']);


  const [fn_value, setFnValue] = useState(``);




  return (
    <FilesContainer>
        <CollapseItem>
          <TopItem>
            <CollapseLabel>
              <VscTriangleRight className="triangle_icon"/>
              <p className="files_label">Files</p>
            </CollapseLabel>
            <UploadFiles>
              <AiFillFileAdd className="addfiles_icon" onMouseOver={() => {setFileHover(!file_hover)}} onMouseOut={() => {setFileHover(!file_hover)}} onClick={() => {setFiles([...files, ``])}}/>
              {file_hover ? <p className="file_upload">New File</p>: null}
            </UploadFiles>
          </TopItem>
          <BottomItems>

            {
              files.map(function(item, i){
                if(item.length>0){
                  return (
                    <File key={i} className={active_file==item ? "active_file" : null} onMouseOver={() => {setFileListHover(item)}} onMouseOut={() => {setFileListHover("n"+item)}}>
                    <FileName onClick={() => {
                      setActiveFile(item);
                      window.location.reload();
                      }} >
                      <RiCupFill/>
                      <p>{item}</p>
                    </FileName>
      
                    <UploadFiles className={(filelist_hover==item) ? null : "active_file_icons_inv"} >
                        <div className="cancel_icon">
                        <MdOutlineClear onClick={() =>{
                              let temp_arr = files;
                              var filtered = temp_arr.filter(function(value, index, arr){ 
                                  return value != filelist_hover;
                              });
                              console.log("ftemp: "+temp_arr)
                              console.log("filt: "+filtered)
    
                              setFiles([...filtered]);
                              setFileListHover("n"+item);
                              if(filelist_hover==active_file){
                                setActiveFile("non");
                                window.location.reload();
                              }
                              
                        }}/>
                        </div>
                    </UploadFiles>
                  </File>
      
                  );
                }else{
                  return (
                    <File className={!file_input ? "file_input" : null} onMouseOver={() => {setFileInput(!file_input)}} onMouseOut={() => {setFileInput(!file_input)}}>
                    <FileName>
                      <AiFillFile/>
                      <input type="text" value={fn_value} onChange={e => {
                        setFnValue(`${e.target.value}`);
                        }} onBlur={() => {
                          
                          if(fn_value<1){
                            let temp_arr = files;
                            temp_arr.pop();

                            setFiles([...temp_arr])
                          }
                        } } autoFocus/>
                    </FileName>
      
                    <UploadFiles className={((fn_value.length>0 && String(fn_value).includes(".java"))) ? null : "active_file_icons_inv"} >
                        <div className="pen_icon save_txt" onClick={() => {

                          let temp_arr = files;
                          temp_arr.pop();

                          setFiles([...temp_arr])
                          setFiles([...files, fn_value]);
                          setFnValue(``);
                          setFileInput(false);
                          }}>
                          Save
                        </div>
                    </UploadFiles>
                  </File>
      
                  );
                }

              })
            }
          </BottomItems>
        </CollapseItem>
    </FilesContainer>
  )
}

export default Files

const FilesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    color: #ffffff;
    border-top: 1px solid #343434;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    
`;

const CollapseItem = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

const TopItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #343434;
  padding: 0.7rem 0.7rem 0.7rem 1.1rem;
  
`;
const CollapseLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  


  .files_label {
    margin-left: 7px;
  }

  p {
    font-size: 1rem;
    font-weight: 200;
  }

  .triangle_icon {
    transform: rotate(90deg);
    width: 20px;
    color: #ffffff80;
  }

`;

const UploadFiles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #ffffff80;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  

  .upload_icon {
    margin-right: 20px;
  }

  .hover_upload, .file_upload {
    position: absolute;
    background: #343434;
    border-radius: 4px;
    padding: 8px;
    font-size: 13px;
    color: #ffffff;
    width: max-content;
    top: -40px;
    right: 3px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  }
  .file_upload {
    right: -25px;
  }

  .upload_icon {
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    cursor: pointer;
    &:hover {
      color: #ffffff;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }


  }

  .addfiles_icon {
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    cursor: pointer;
    &:hover {
      color: #ffffff;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }
  }

  .save_txt {
    &:hover {
      color: #ffffff;
    }
  }

`;

const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  .active_file {
    background: #343434;
    p {
      color: #ffffff;
    }
  }

  .file_input {
    background: #343434;
  }
`;

const File = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
  color: #f54336;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  
  .pen_icon, .cancel_icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    & :hover {
      color: #ffffff;
    }
  }

  .active_file_icons_inv {
    display: none;
  }

  .pen_icon {
    margin-right: 8px;
  }
`;

const FileName = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  p {
    font-size: 14px;
    color: #ffffff80;
    margin: 0px;
    margin-left: 10px;
    font-weight: 100;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  }

  input {
    margin-left: 10px;
    background: #343434;
    color: #ffffff;
    border: 1px solid #151515;
    height: 22px;
    text-indent: 6px;

    &:active {
      background: #343434;
      color: #ffffff;
      border: 1px solid #151515;
      border-radius: 1px;
    }

    &:focus {
      outline: -webkit-focus-ring-color auto 0px;
    }

    &:focus-visible {
      outline: -webkit-focus-ring-color auto 0px;
    }
  }

  &:hover {
    p {
      color: #ffffff;
    }
  }
`;
