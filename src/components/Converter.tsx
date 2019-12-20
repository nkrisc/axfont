import React from 'react';
import FileUpload from './FileUpload'
import FileFetch from './FileFetch'
import Output from './Output'
import Font from './Font';
import Warning from './Warning';

type CProps = {}
interface CState {
	font: Font,
	warn: boolean,
	warnMsg: string,
}

class Converter extends React.Component<CProps, CState>{
    state: CState = {
		font: new Font(),
		warn: false,
		warnMsg: '',
    }

    passFont = (buffer: ArrayBuffer, type: string): void => {
		this.processFont(buffer, type)
	}
	
	processFont = (buffer: ArrayBuffer, type: string) => {
		var font: Font = new Font();
            font.init(buffer, type)
            .then(initializedFont => {
                console.log(initializedFont)
                this.setState({font: font})
            }).catch(err => {
                this.setState({warn: true, warnMsg: 'Not a usable font file.'})
            })
	}

    render() {
		//refactor FileInput into generic input
		return (
			<div>
				<Warning
					warn={this.state.warn}
					msg={this.state.warnMsg}
				/>
				<FileUpload
					label={"Choose file"}
					fileHandler={this.passFont}
				/>
				<FileFetch
					fileHandler={this.passFont}
				/>
				<Output
					font={this.state.font}
				/>
			</div>
		);
	}
}

export default Converter