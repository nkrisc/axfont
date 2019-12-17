import React from 'react';
import Font from './Font'

interface FFState {
    failed: Boolean
}

interface FFProps {
    fileHandler: Function
}

interface FontResponse {
    buffer: ArrayBuffer,
    type: string
}

export default class FileFetch extends React.Component<FFProps, FFState> {
    state = {
        failed: false
    }

    handleClick = (e: React.MouseEvent): void => {
        var url = document.querySelector<HTMLInputElement>('#url')!.value;
        this.fetchFont(url).then(res => {
            var font: Font = new Font();
            console.log(res)
            font.init(res.buffer, res.type)
            .then(initializedFont => {
                console.log(initializedFont)
                this.props.fileHandler(initializedFont)
            })
        })
        
    }

    fetchFont = function(url: string): Promise<FontResponse> {
        var type: string;
        return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                type = response.headers.get('content-type') || '';
                return response.body!.getReader()
            }
        })
        .then(result => {
            return result.read()
        })
        .then(result => {
            return {
                buffer: result.value.buffer,
                type: type
            }
        })
    }

    render() {
        return (
            <div>
                <input 
                    id="url"
                />
                <button
                    onClick={this.handleClick}
                >Get font</button>
            </div>
        )
    }
}