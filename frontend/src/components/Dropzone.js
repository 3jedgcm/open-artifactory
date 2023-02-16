import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Dropzone({ onDropFile }) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ maxFiles: 1, onDropAccepted: (files) => { if (files.length > 0) { onDropFile(files[0])} } });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);


    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some artifact here, or click to select artifact</p>
            </div>
        </div>
    );
}
