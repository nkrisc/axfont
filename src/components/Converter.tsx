import React from 'react';
import FileUpload from './FileUpload'
import FileFetch from './FileFetch'
import Output from './Output'
import Font from './Font';

type CProps = {}
interface CState {
    font: Font
}

class Converter extends React.Component<CProps, CState>{
    state: CState = {
        font: new Font()
    }

    passFont = (font: Font): void => {
        this.setState({font: font})
    }

    render() {
		//refactor FileInput into generic input
		return (
			<div>
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