"use server"

import { writeFile } from "fs/promises";
import uniqid from "uniqid";
import {uploadOnCloudinary} from "./cloudinary"


let imageArr=[]
export const UploadImage=async (req)=>{
    const data = await req;
    for (const entry of data.entries()){
        const[name,value]=entry;
        const file=data.get(name)
        if(file){
            const ext=file.name.split(".").slice(-1);
            const newFileName='the_anant.com'+uniqid()+"."+ext;
            const byteData=await file.arrayBuffer();
            const buffer=Buffer.from(byteData);
            const path=`./public/${newFileName}`;
            writeFile(path,buffer);
            const imageUrl=await uploadOnCloudinary(path)
            imageArr.push(imageUrl)
            console.log(imageUrl)
        }
    }
    return imageArr;
}


