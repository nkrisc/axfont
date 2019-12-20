import React from 'react';
import Warning from './Warning';

interface FIProps {
    label: String,
    fileHandler: Function,
}

interface FIState {
    warn: boolean,
    warnMsg: string,
}

interface HTMLInputEvent extends React.ChangeEvent {
    target: HTMLInputElement & EventTarget;
}

class FileUpload extends React.Component<FIProps, FIState> {
    state = {
        warn: false,
        warnMsg: '',
    }

    handleClick = (): void => {
        var input = document.querySelector<HTMLInputElement>('#file')!;
        input.click()
    }

    handleFileUploaded = (e: HTMLInputEvent): void => {
        this.setState({warn: false, warnMsg: ''})
        let file = e.target.files![0]
        this.readFileAsArrayBuffer(file)
            .then((buf) => {
                this.props.fileHandler(buf, file.name)
            })
            .catch(err => {
                console.log(`Error reading file as buffer: ${err}`)
            })
    }

    readFileAsArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer)
            }
            reader.onerror = () => {
                reject('Reader error in readFileAsArrayBuffer')
            }
            reader.readAsArrayBuffer(file);
        })
    }

    render() {
        const fieldStyle: React.CSSProperties = {
            boxSizing: 'border-box',
            height: '40px',
            //width: '240px',
            flexBasis: '70%',
            border: '1px solid #333',
            borderRadius: '5px 0 0 5px',
            background: '#fff',
            textOverflow: 'elipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            color: '#000',
            fontSize: '16px',
            padding: '8px 5px'
        }
    
        const buttonStyle: React.CSSProperties = {
            boxSizing: 'border-box',
            height: '40px',
            color: '#FFF',
            flexBasis: '30%',
            border: '1px solid #333',
            borderRadius: '0 5px 5px 0',
            background: '#666',
            fontSize: '16px',
            padding: '8px 10px 8px 10px'
        }

        return (
            <div style={{
                display:'flex',
                flexWrap: 'wrap',
                width: '360px',
                marginTop: '20px'
                }}>
                <input
                    type="file"
                    id="file"
                    style={{display: 'none'}}
                    onChange={this.handleFileUploaded}
                />
                <div style={fieldStyle} >

                </div>
                <button
                    onClick={this.handleClick}
                    style={buttonStyle}
                >
                    <span>{this.props.label}</span>
                </button>
                <Warning
                    warn={this.state.warn}
                    msg={this.state.warnMsg}
                />
            </div>
        )
    }
}

export default FileUpload