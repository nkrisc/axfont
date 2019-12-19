import React from 'react';

interface WProps {
    warn: boolean,
    msg?: string
}

export default class Warning extends React.Component<WProps, {}> {

    render() {
        if (!this.props.warn) return null;

        const style: React.CSSProperties = {
            width: '100%',
            height: '20px',
            flexBasis: '100%',
            background: 'red',
            color: 'white',
            fontSize: '12px'
        }

        return (
            <div style={style} >
                <span>{this.props.msg}</span>
            </div>
        )
    }
}