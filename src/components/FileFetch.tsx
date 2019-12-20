import React from 'react';
import Warning from './Warning';

interface FFState {
    warn: boolean,
    warnMsg: string,
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
        warn: false,
        warnMsg: '',
    }

    handleClick = (e: React.MouseEvent): void => {
        this.setState({warn: false})
        var url = document.querySelector<HTMLInputElement>('#url')!.value;
        if (!url) return;
        this.fetchFont(url).then(res => {
            this.props.fileHandler(res.buffer, res.type)
        }).catch(err => {
            console.log(err)
            this.setState({warn: true, warnMsg: 'Couldn\'t find font file.'})
        })    
    }

    fetchFont = function(url: string): Promise<FontResponse> {
        //Check for protocol, and if not, add //
        var type: string;
        return fetch(url.indexOf('//') >= 0 ? url : '//' + url)
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
                <Warning 
                    warn={this.state.warn}
                    msg={this.state.warnMsg}
                />
            </div>
        )
    }
}