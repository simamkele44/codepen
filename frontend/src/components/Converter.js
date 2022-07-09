import React, { useState, useEffect } from 'react';

export const java_code = `
package DevideAndConqurer;

public class Node {
    public int data;
    Node left_child;
    Node right_child;
    Node parent;

    Node(int data, Node new_node) {
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
`;

export const findClassName = (java_code) =>{
    if(java_code!=undefined){
        let class_index = java_code.indexOf("class");
        let endclass_index = java_code.indexOf(" {");
        let class_name = java_code.substring(class_index+6, endclass_index);
        return class_name;
    }else{
        return ""
    }

    
}

export const findVariables = (java_code) =>{
    if(java_code!== undefined){
        let endclass_index = java_code.indexOf(" {");
        let start_constructor = java_code.indexOf(findClassName(java_code)+"(");
        let varibles_container = java_code.substring(endclass_index+2, start_constructor);
        let variable_arr = varibles_container.split(";");
    
        let temp_obj = {}
        for(let i=0; i<variable_arr.length-1; i++){
            let variable_line = variable_arr[i].split(" ");
            let arrlist_type = variable_line[variable_line.length-2];
            var ds_type = arrlist_type.substring(
                arrlist_type.indexOf("<") + 1, 
                arrlist_type.lastIndexOf(">")
            );

            // Detect data structures
            if(arrlist_type.includes("ArrayList")) {
                temp_obj[variable_line[variable_line.length-1]] = {
                    data_type: ds_type+"[]"
                };
            }else{
                temp_obj[variable_line[variable_line.length-1]] = {
                    data_type: variable_line[variable_line.length-2]
                };
            }

        }
    
        return temp_obj;
    }else{
        return ""
    }

    
}

export const findConstructor = (java_code) => {
    let start_constructor = java_code.indexOf(findClassName(java_code)+"(");
    let end_constructor_params = java_code.indexOf(")", start_constructor+findClassName(java_code).length+1);
    let constructor_params = java_code.substring(start_constructor+findClassName(java_code).length+1, end_constructor_params);
    let params_arr = constructor_params.split(',');

    let temp_obj = {}
    for(let i=0; i<params_arr.length; i++){
        let variable_line = params_arr[i].split(" ");
        temp_obj[variable_line[variable_line.length-1]] = {
            data_type: variable_line[variable_line.length-2]
        };
    }

    return temp_obj;
}

export const getConstructorAssignments = (java_code) =>{
    let start_constructor = java_code.indexOf(findClassName(java_code)+"(");
    let end_constructor_params = java_code.indexOf(")", start_constructor+findClassName(java_code).length+1);
    let start_assigns = java_code.indexOf("{",end_constructor_params);
    let end_assigns = java_code.indexOf("}",start_assigns);
    let assigns_container = java_code.substring(start_assigns+1, end_assigns-1);
    let assigns_arr = assigns_container.split(";");
    
    let temp_obj = {}
    for(let i=0; i<assigns_arr.length-1; i++){
        let variable_line = assigns_arr[i].split(" = ");
        
        temp_obj[variable_line[variable_line.length-2].replace('\n', ' ')] = {
            value: variable_line[variable_line.length-1]
        };
    }

    return temp_obj;

}

const findAllOccurrences = (str, substr) => {
    str = str.toLowerCase();
    
    let result = [];
  
    let idx = str.indexOf(substr)
    
    while (idx !== -1) {
      result.push(idx);
      idx = str.indexOf(substr, idx+1);
    }
    return result;
}

export const findFunctions = (java_code) =>{
    if(java_code!=undefined){
        let start_constructor = java_code.indexOf(findClassName(java_code)+"(");
        let end_constructor_params = java_code.indexOf(")", start_constructor+findClassName(java_code).length+1);
        let start_assigns = java_code.indexOf("{",end_constructor_params);
        let end_assigns = java_code.indexOf("}",start_assigns);
        let below_contructor = java_code.substring(end_assigns+1);
        let after_close_white_spaces = findAllOccurrences(below_contructor, ") ");
        let below_const_rebuilt = ""; // below ciontructor without any ) { (white space removal)
        for(let i = 0; i < after_close_white_spaces.length; i++) {
            if(i==0){
                below_const_rebuilt += below_contructor.substring(0,after_close_white_spaces[0]+1);
            }else{
                below_const_rebuilt += below_contructor.substring(after_close_white_spaces[i-1]+2,after_close_white_spaces[i]+1);
            }
        }
    
        below_const_rebuilt += below_contructor.substring(after_close_white_spaces[after_close_white_spaces.length-1]+2);
    
        //console.log("rebult: "+below_const_rebuilt);
    
        let potential_methods = findAllOccurrences(below_const_rebuilt, "){");
    
        // find no arguments methods
        let no_args_methods = findAllOccurrences(below_const_rebuilt, "(){");
        let non_args_methods = {};
        for(let i =0; i<no_args_methods.length; i++) {
            let type_and_name = []
            if(i==0){
                type_and_name = below_const_rebuilt.substring(0, no_args_methods[i]).split(" ");
            }else{
                type_and_name = below_const_rebuilt.substring(no_args_methods[i-1]+3, no_args_methods[i]).split(" ");
            }
    
            non_args_methods[type_and_name[type_and_name.length-1]] = {
                return_type: type_and_name[type_and_name.length-2]
            };
        }
    
        // find argumented methods
        // remove all the empty args methods positions
        for(let i =0; i<no_args_methods.length; i++){
            if(potential_methods.includes(no_args_methods[i]+1)){
                let index = potential_methods.indexOf(no_args_methods[i]+1);
                potential_methods.splice(index, 1);
            }
        }
    
        let args_methods = {};
        for(let i =0; i<potential_methods.length; i++){
            let open_brac_pos = 0;
            let count_strs = potential_methods[i];
            while(open_brac_pos==0){
                let current_char = below_const_rebuilt.substring(count_strs, count_strs+1);
                if(current_char=="("){
                    open_brac_pos = count_strs;
                    break;
                }else{
                    count_strs = count_strs-1;
                }
            }
    
            let args_str = below_const_rebuilt.substring(open_brac_pos+1, potential_methods[i]);
            let multi_args_arr = [];
            let single_args_arr = [];
            if(args_str.includes(",")){
                multi_args_arr = args_str.split(",");
            }else{
                single_args_arr = args_str.split(" ");
                let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if(single_args_arr!=undefined){
                    if(!(single_args_arr.length==2 && !specialChars.test(args_str))){
                        single_args_arr = [];
                    }
                }
 
            }
    
            
            
            let endtype_pos = 0;
            let count_sp = open_brac_pos;
            while(endtype_pos<=0){
                let current_char = below_const_rebuilt.substring(count_sp, count_sp+1);
                if(current_char==" "){
                    endtype_pos = endtype_pos+1;
                }else{
                    count_sp = count_sp-1;
                }
            }
    
            let type_and_name = below_const_rebuilt.substring(endtype_pos, open_brac_pos).split(" ");
    
    
            if(single_args_arr.length>0){
                args_methods[type_and_name[type_and_name.length-1]] = {
                    return_type: type_and_name[type_and_name.length-2],
                    arguments: args_str.split(" "),
                };
            }else{
                
                args_methods[type_and_name[type_and_name.length-1]] = {
                    return_type: type_and_name[type_and_name.length-2],
                    arguments: args_str.split(" "),
                };
            }
        }
    
        return [args_methods, non_args_methods]
    }else{
        return []
    }

    //console.log("args methods: "+JSON.stringify(args_methods));

    //console.log("non args methods: "+JSON.stringify(non_args_methods));
    //console.log("trimed: "+below_contructor.replace(/\s/g, ''));
    //console.log(findAllOccurrences(below_contructor, "){"));
}

//console.log("class name: " + findClassName(java_code));
//console.log("all variables: "+JSON.stringify(findVariables()));
//console.log("constructor: "+ JSON.stringify(findConstructor()));
//console.log("assigns: "+JSON.stringify(getConstructorAssignments()));
//findFunctions();