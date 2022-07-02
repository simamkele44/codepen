import React, { useState, useEffect, useRef  } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from '../hooks/useLocalStorage';
import {FaJava} from 'react-icons/fa';
import {MdClear} from 'react-icons/md';
import {SiTypescript} from 'react-icons/si';
import {findClassName, findVariables,findFunctions} from './Converter';
import lottie from 'lottie-web';
import styled from 'styled-components';


export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props
  const [open, setOpen] = useState(true)

  const [active_file, setActiveFile] = useLocalStorage('activefile', 'Student.java');
  const [files_data, setFilesData] = useLocalStorage('filesdata',{
    'Student.java': `
      package com.javacodeexamples.common;
  
      public class Student {
      
          /* Student properties */
          private String rollNumber;
          private String name;
          private String standard;
          private int totalMarks;
          
          //default constructor
          public Student(){
              
          }
          
          /*
          * overloaded constructor to set all 
          * student object properties at once
          */
          
          public Student(String rollNumber, String name, String standard, int totalMarks){
              
              /*
              * this.variable_name always refer to class level properties
              */
              
              //set object properties from the arguments/parameters
              this.rollNumber = rollNumber;
              this.name = name;
              this.standard = standard;
              this.totalMarks = totalMarks;
          }
          
          /* Methods to get and set the student properties */
          public String getRollNumber() {
              return rollNumber;
          }
      
          public void setRollNumber(String rollNumber) {
              this.rollNumber = rollNumber;
          }
      
          public String getName() {
              return name;
          }
          
          public void setName(String name) {
              this.name = name;
          }
          
          public String getStandard() {
              return standard;
          }
          
          public void setStandard(String standard) {
              this.standard = standard;
          }
          
          public int getTotalMarks() {
              return totalMarks;
          }
          
          public void setTotalMarks(int totalMarks) {
              this.totalMarks = totalMarks;
          }
          
          /*
          * This method will product nice summary of Student object
          * when printed using System.out.println in the format below
          * 
          * [01 : Raj : 10th : 200]
          */
          public String toString(){
              
              StringBuilder sbStudent = new StringBuilder();
              
              sbStudent.append("[");
              
              sbStudent.append(getRollNumber());
              sbStudent.append(" : ");
              sbStudent.append(getName());
              sbStudent.append(" : ");
              sbStudent.append(getStandard());
              sbStudent.append(" : ");
              sbStudent.append(getTotalMarks());
              
              sbStudent.append("]");
              
              return sbStudent.toString();
          }
          
      }
    `,
    'Node.java': `
    package DevideAndConqurer;

    public class Node {
        public int data;
        Node left_child;
        Node right_child;
        Node parent;

        Node(int data) {
            this.data = data;
            left_child = null;
            right_child = null;
            parent = null;
        }


        public int getData() {
            return data;
        }

        public void doStuff(int data) {
            int ab = data;
        }

        public int doStuffAgain(int data, int left, int right) {
            int abc = data;
            return abc;
        }

        public Node getLeftChild() {
            return left_child;
        }

        public Node getRightChild() {
            return right_child;
        }

    }

    `, 
    'Stack.java': `
    package DevideAndConqurer;
    import java.util.ArrayList;
    
    public class Stack {
        private ArrayList<Node> stack;
    
        Stack(){
            stack = new ArrayList<Node>();
        }
    
        public void push(Node data) {
            stack.add(data);
        }
    
        public Node peek() {
            return stack.get(stack.size()-1);
        }
    
        public int getSize(){
            return stack.size();
        }
    
        public Node pop(){
            Node top = stack.get(stack.size()-1);
            stack.remove(stack.size()-1);
            return top;
        }
    
        public void show() {
            for(int i=0; i<stack.size(); i++){
                System.out.println(stack.get(i));
            }
        }
    
        public Boolean isEmpty() {
            if(stack.size()==0){
                return true;
            }else{
                return false;
            }
        }
    
    }
    
    `, 
    'Employee.java': `
      import java.io.*;
      public class Employee {
      
        String name;
        int age;
        String designation;
        double salary;
      
        // This is the constructor of the class Employee
        public Employee(String name) {
            this.name = name;
        }
      
        // Assign the age of the Employee  to the variable age.
        public void empAge(int empAge) {
            age = empAge;
        }
      
        /* Assign the designation to the variable designation.*/
        public void empDesignation(String empDesig) {
            designation = empDesig;
        }
      
        /* Assign the salary to the variable	salary.*/
        public void empSalary(double empSalary) {
            salary = empSalary;
        }
      
        /* Print the Employee details */
        public void printEmployee() {
            System.out.println("Name:"+ name );
            System.out.println("Age:" + age );
            System.out.println("Designation:" + designation );
            System.out.println("Salary:" + salary);
        }
      }
    `});
  const [java_editor, setJavaEditorData] = useState('');

  // TypeScript interface
  const [ts_editor, setTsEditor] = useState(`ts`);


  String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
  }

  function handleChange(editor, data, value) {
    onChange(value);
    const template = '${text}';
    let code_val = template.interpolate({
      text: value
    });
    handleUpdate(active_file,code_val);
  }

  const handleUpdate = (fn_value, filedata) => {
    files_data[fn_value] = filedata;
    setFilesData({ ...files_data });
  }

  // Set edito to its file
  useEffect(() => {
    setJavaEditorData(files_data[active_file]);
  }, )


  // Convertor
  //console.log(Converter());
  useEffect(() => {
    try {
      if(java_editor!=null || java_editor!=undefined) {
        updateInterface(java_editor);
      }
    }
    catch(err) {
      console.log(err)
    }

    
  }, )

  const updateInterface = (java_code) => {
    let class_name = findClassName(java_code);
    let final_str = ``;

    // class construction
    let interface_line = "interface "+class_name+" {"+"\r\n";
    let last_line = "}"

    // Attributes construction
    let final_attrs = ``;

    let attrs = findVariables(java_code);
    for (var key of Object.keys(attrs)) {
      let attr_name = key;
      let attr_type = "";
      let att = attrs[key]
      for (var key of Object.keys(att)) {
        attr_type = att[key];
      }

      if(attr_type=="int" || attr_type=="float" || attr_type=="double" || attr_type=="Double"){
        attr_type = "number"
      }

      if(attr_type=="String"){
        attr_type = "string"
      }

      if(attr_type=="Boolean"){
        attr_type = "boolean"
      }

      let attr_line = "   "+attr_name+": "+attr_type+";"+"\r\n";

      final_attrs = final_attrs+attr_line;
      
    }

    // Methods Construction
    let final_methods = ``;

    let all_methods = findFunctions(java_code);
    let non_args_methods = all_methods[1];
    let args_methods = all_methods[0];

    for (var key of Object.keys(non_args_methods)) {
      let attr_name = key;
      let attr_type = "";
      let att = non_args_methods[key]
      for (var key of Object.keys(att)) {
        attr_type = att[key];
      }

      let attr_line = "   "+attr_name+": () => "+attr_type+";"+"\r\n";

      final_methods = final_methods+attr_line;

    }


    for (var key of Object.keys(args_methods)) {
      let attr_name = key;
      let attr_type = "";
      let return_type = "";
      let att = args_methods[key]
      for (var key of Object.keys(att)) {
        if(key=="return_type"){
          return_type = att[key];
        }else{
          attr_type = att[key];

          
        }
      }

      let args_str = "";
      for(let i=0; i<attr_type.length; i = i+2){
        let the_type = attr_type[i];

        if(the_type=="int" || the_type=="float" || the_type=="double" || the_type=="Double"){
          the_type = "number"
        }

        if(the_type=="String"){
          the_type = "string"
        }

        if(the_type=="Boolean"){
          the_type = "boolean"
        }

        let argu = "";
        if(attr_type[i+1]!=undefined){
          argu = attr_type[i+1].replace(',', '')+": "+the_type+", ";
          if(i+2==attr_type.length){
            argu = attr_type[i+1].replace(',', '')+": "+the_type+"";
          }
        }else{
          argu = attr_type[i+1]+": "+the_type+", ";
          if(i+2==attr_type.length){
            argu = attr_type[i+1]+": "+the_type+"";
          }
        }

        
        args_str = args_str+argu;
      }
      //console.log("args str: "+args_str);

      let attr_line = "   "+attr_name+": ("+args_str+") => "+return_type+";"+"\r\n";
      //console.log("i: "+attr_line);

      let garbarge_stuff = attr_line.includes("undefined") || attr_line.includes("if(") || attr_line.includes("for(") || attr_line.includes("i++") || attr_line.includes("==");
      if(!garbarge_stuff){
        final_methods = final_methods+attr_line;
      }

      

    }


    // Final construction
    final_str = interface_line+"\r\n"+final_attrs+"\r\n"+final_methods+"\r\n"+last_line+"\r\n";
    setTsEditor(final_str);
  }


  // Animations
  const container = useRef(null);
  const [loading, setLoading] = useState(true);

  // LoadingOverlay


  useEffect(() => {
      lottie.loadAnimation({
          container: container.current,
          render: 'svg',
          loop: true,
          autoplay: true,
          animationData: require('../animations/scan.json')
      })
  }, []);


  setTimeout(() => {
      setLoading(false);
  }, 3000);





  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      {(props.ts &&String.active_file!=="non")?
      
        <div className="editor-subtitle-container">
          <div className="editor-subtitle">
            <SiTypescript className="lang_icon ts_icon"/>
            {String(active_file.substring(0, String(active_file).indexOf(".java")))+"Interface.ts"}
          </div>
        </div>
      :
        (String(active_file)!=="non")? 
        <div className="editor-subtitle-container">
          <div className="editor-subtitle">
            <FaJava className="lang_icon"/>
            {active_file}
            <MdClear className="rvmfile_btn" onClick={() => {
              setActiveFile("non");
              window.location.reload();
            }}/>
          </div>
          <div>
            <RunBtn onClick={() => window.location.reload()}>
              Scan
            </RunBtn>
          </div>
        </div>
        :
        null
        

      }


      {props.ts?
        (loading?
          null
        :
        <ControlledEditor
          onBeforeChange={handleChange}
          value={ts_editor}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true
          }}
        />
        )

      :
      (loading?
        <>
        <LoadingOverlay>
          <div ref={container}></div>
        </LoadingOverlay>
          <ControlledEditor
          onBeforeChange={handleChange}
          value={java_editor}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true
          }}
        />
        </>
      :
      <ControlledEditor
        onBeforeChange={handleChange}
        value={java_editor}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      /> 
      )

      }

    </div>
  )
}

const LoadingOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 12;
    align-self: center;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    div {
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        align-self: self-start;
        margin-top: 80px;
        width: 40%;
    }
`;

const RunBtn = styled.div`
    font-size: 12px;
    border-radius: 4px;
    padding: 8px 12px;
    background: #0971f1;
    color: #ffffff;
    margin-right: 15px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      opacity: 0.8;
    }
`;