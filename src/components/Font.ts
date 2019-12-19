const opentype = require('opentype.js')
//import  opentype from 'opentype.js';

enum Extension {
    eot   = 'eot',
    woff  = 'woff',
    woff2 = 'woff2',
    otf   = 'otf',
    ttf   = 'ttf',
    svg   = 'svg',
    sfnt  = 'sfnt',
    NONE = ''
}

enum MIMEType {
    eot   = "application/vnd.ms-fontobject",
    woff  =  "application/font-woff",
    woff2 = "application/font-woff2",
    otf   = "application/x-font-opentype",
    ttf   = "application/x-font-truetype",
    svg   = "application/svg+xml",
    sfnt  = "application/font-sfnt",
    NONE  = ''
}

export default class Font {
    buffer: ArrayBuffer;
    type: MIMEType;
    extension: Extension;
    src: string;
    fullName: string;
    fontFamily: string;
    fontWeight: string;
    initialized: boolean;

    constructor() {
        this.buffer = new ArrayBuffer(0);
        this.type = MIMEType.NONE;
        this.extension = Extension.NONE;
        this.src = '';
        this.fullName = '';
        this.fontFamily = '';
        this.fontWeight = '';
        this.initialized = false;
    }

    init(buffer: ArrayBuffer, src: string): Promise<Font> {
        return new Promise((resolve, reject) => {
            try {
                this.buffer = buffer;
                var ot: opentype.Font = opentype.parse(this.buffer)
                this.fontFamily = ot.names.fontFamily.en;
                this.fontWeight = ot.names.fontSubfamily.en;
                this.fullName = ot.names.fullName.en;
                this.src = src;
                this.extension = this._getExtensionFromSrc(this.src);
                this.type = this._getMIMETypeFromExtension(this.extension);
                this.initialized = true;
                resolve(this)
            } catch(err) {
                reject(err);
            }
        })
    }

    private _getExtensionFromSrc = (src: string): Extension => {
        var re = /(?:\.|\/)([a-zA-Z0-9]*)$/
        var match = src.match(re);
        switch (match![1]) {
            case 'eot':   return Extension.eot;
            case 'woff':  return Extension.woff;
            case 'woff2': return Extension.woff2;
            case 'otf':   return Extension.otf;
            case 'ttf':   return Extension.ttf;
            case 'SVG':   return Extension.svg;
            case 'SFNT':  return Extension.sfnt;
            default: return Extension.NONE
        }
    }

    private _getMIMETypeFromExtension(ext: Extension): MIMEType {
        return MIMEType[ext as keyof typeof Extension]
    }

    encodedBuffer = (): Promise<string> => {
        return new Promise((resolve,reject) => {
            var reader = new FileReader();
            reader.onload = (): void => {
                var encoded = reader.result as string;
                resolve(encoded.split(',')[1])
            }
            reader.onerror = (): void => {
                reject('Reader error in encodeBase64')
            }
            reader.readAsDataURL(new Blob([this.buffer]))
        })
    }
}