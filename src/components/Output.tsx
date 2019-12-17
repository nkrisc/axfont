import React from 'react';
import Font from './Font';

interface OProps {
    font: Font
}

interface OState {
    output: string,
}

export default class Output extends React.Component<OProps, OState> {
    constructor(props: OProps){
        super(props)
        this.state = {
            output: ''
        }
    }
    componentDidUpdate(prevProps: any) {
        if (prevProps.font === this.props.font) return;
        this.props.font.encodedBuffer()
            .then(buffer => {
                this.setState({
                    output: this._generateOutput(buffer)
                })
            })
    }

    private _generateOutput = (buffer: string): string => {
        var s = '';
        s += `font-family: ${this.props.font.fontFamily};`;
        s += `src: url(data: application${this.props.font.type};charset=utf-8;`;
        s += `base64,${buffer})`;
        s += `format(${this.props.font.extension});`;
        s += `font-weight: ${this.props.font.fontWeight};`;
        s += 'font-style: normal;';
        return s;
    }

    render() {
		const style: React.CSSProperties = {
			width: "100%",
			height: "200px",
			boxSizing: "border-box"
		};

		return <textarea style={style} value={this.state.output} readOnly />;
	}

}