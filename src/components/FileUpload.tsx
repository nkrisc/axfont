import React from 'react';
import Font from './Font';

interface FIProps {
    label: String,
    fileHandler: Function,
}

interface FIState {
    font: Font
}

interface HTMLInputEvent extends React.ChangeEvent {
    target: HTMLInputElement & EventTarget;
}

class FileUpload extends React.Component<FIProps, FIState> {
    state = {
        font: new Font()
    }

    handleButtonClick = (): void => {
        var input = document.querySelector<HTMLInputElement>('#file')!;
        input.click()
    }

    handleFileUploaded = (e: HTMLInputEvent): void => {
        let file = e.target.files![0]
        var buf;
        this.readFileAsArrayBuffer(file)
            .then((value) => {
                buf = value;
                let font = new Font();
                font.init(buf, file.name)
                .then(initializedFont => {
                    this.setState({font: initializedFont})
                    this.props.fileHandler(initializedFont)
                })
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
            width: '240px',
            border: '1px solid #333',
            borderRadius: '5px 0 0 0',
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
            border: '1px solid #333',
            borderRadius: '0 5px 0 0',
            background: '#666',
            fontSize: '16px',
            padding: '8px 10px 8px 10px'
        }

        return (
            <div style={{display:'flex', marginTop: '20px'}}>
                <input
                    type="file"
                    id="file"
                    style={{display: 'none'}}
                    onChange={this.handleFileUploaded}
                />
                <div style={fieldStyle} >
                    {this.state.font ? this.state.font.src : ''}
                </div>
                <div
                    onClick={this.handleButtonClick}
                    style={buttonStyle}
                >
                    <span>{this.props.label}</span>
                </div>
            </div>
        )
    }
}

export default FileUpload