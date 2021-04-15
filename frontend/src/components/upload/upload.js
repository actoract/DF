import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeFromCart, changeCart} from '../../actions/cartAction'

const Uploader = ({item}) => {
    const dispatch = useDispatch()
    /*const handleChange = e => { 
        //e.preventDefault();
        alert(item.type)
        const { files } = e.target;
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
        const file = myFileItemReader.result
        if(file){
            dispatch(changeCart(
                item.id,
                item.product, 
                item.isizeStatus, 
                item.type, 
                item.size, 
                item.countInStock,
                window.URL.createObjectURL(files[0]))
            )}
        }, false)
        myFileItemReader.readAsDataURL(files[0])
    };*/

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            dispatch(changeCart(
                item.id,
                item.product, 
                item.isizeStatus, 
                item.type, 
                item.size, 
                item.countInStock,
                info.file)
            )
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    
    return (
        <Upload
            {...props}
            listType="picture"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
}

export default Uploader;