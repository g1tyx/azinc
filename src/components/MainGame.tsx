import * as React from "react";
import { LetterBox } from './LetterBox';
import { Options } from './Options';
import { AltShiftState } from './GameRoot';
import {LetterOptions} from './LetterOptions';
import {MiniButton} from './MiniButton';

export class LetterRecord {
    count: number = 0;
    level: number = 0;
    paused: boolean = false;

    canUpgrade : boolean = true;
    canUpgradeMax : boolean = true;

    mult: number = 1;
    generating : number = 0;
    spending : number = 0;
    change: number = 0;
    baseChange : number = 0;
}

interface MainGameProps {
    letters: Array<LetterRecord>;
    letterOptions: Array<LetterOptions>;
    options: Options;
    altShiftState : AltShiftState;
    onLetterClick: (idx: number) => void;
    onUpgradeClick: (idx: number, count: number, min: number) => void;
    onPauseClick: (idx: number) => void;
    onAscendClick: () => void;
    onLetterOptionsClick: (idx:number)=>void;
    onChangeAltShiftState: (altShiftState : AltShiftState)=>void;
}

const lettersSeq = '∞ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const maxLettersCount = lettersSeq.length;
const lettersPos = [
    2, 2, // ∞ 0
    3, 2, // A 1
    3, 3, // B 2
    3, 4, // C 3
    2, 4, // D 4
    1, 4, // E 5
    0, 4, // F 6
    0, 3, // G 7
    0, 2, // H 8
    0, 1, // I 9
    0, 0, // J 10
    1, 0, // K 11
    2, 0, // L 12
    3, 0, // M 13
    4, 0, // N 14
    5, 0, // O 15
    5, 1, // P 16
    5, 2, // Q 17
    5, 3, // R 18
    5, 4, // S 19
    5, 5, // T 20
    5, 6, // U 21
    4, 6, // V 22
    3, 6, // W 23
    2, 6, // X 24
    1, 6, // X 25
    0, 6  // Z 26
]

class LetterInfo {
    sym: string;
    idx: number;
    constructor(sym: string, idx: number) {
        this.sym = sym;
        this.idx = idx;
    }
}

let lettersArr: Array<Array<LetterInfo>> = [[], [], [], [], [], [], []];
for (let i = 0; i < lettersSeq.length; ++i) {
    lettersArr[lettersPos[i * 2]][lettersPos[i * 2 + 1]] = new LetterInfo(lettersSeq.substr(i, 1), i);
}

export class MainGame extends React.Component<MainGameProps, undefined> {

    onShiftStateClick(){
        let newAltShiftState = new AltShiftState();
        newAltShiftState.shiftDown = !this.props.altShiftState.shiftDown;
        this.props.onChangeAltShiftState(newAltShiftState);
    }

    onAltStateClick(){
        let newAltShiftState = new AltShiftState();
        newAltShiftState.altDown = !this.props.altShiftState.altDown;
        this.props.onChangeAltShiftState(newAltShiftState);
    }

    render() {
        let rows = [];

        let lc = this.props.letters.length;
        let minx = lettersPos[0], maxx = minx;
        let miny = lettersPos[0], maxy = miny;
        for (let i = 0; i < lc; ++i) {
            let x = lettersPos[i * 2 + 1];
            let y = lettersPos[i * 2];
            if (x < minx) minx = x;
            if (x > maxx) maxx = x;
            if (y < miny) miny = y;
            if (y > maxy) maxy = y;
        }

        let rowsCount = maxy - miny + 1;
        let colsCount = maxx - minx + 1;

        let allowAscension = lc >= maxLettersCount && this.props.letters[lc - 1].count >= 10;

        for (let y = 0; y < rowsCount; ++y) {
            let cols = [];
            for (let x = 0; x < colsCount; ++x) {
                let sym = ' ';
                let lInfo = lettersArr[miny + y][minx + x];
                if (lInfo && lInfo.idx < lc) {
                    sym = lInfo.sym;
                    let prvLet = this.props.letters[lInfo.idx - 1];
                    let curLet = this.props.letters[lInfo.idx];
                    let nxtLet = this.props.letters[lInfo.idx + 1];
                    let lo = this.props.letterOptions[lInfo.idx];
                    cols.push(
                        <td key={x + ' ' + y} className="letterTd">
                            <LetterBox
                                sym={sym}
                                idx={lInfo.idx}
                                letter={curLet}
                                letterOptions={lo}
                                options={this.props.options}
                                ascend={allowAscension}
                                altShiftState={this.props.altShiftState}
                                onClick={this.props.onLetterClick}
                                onUpgradeClick={this.props.onUpgradeClick}
                                onPauseClick={this.props.onPauseClick}
                                onAscendClick={this.props.onAscendClick}
                                onLetterOptionsClick={this.props.onLetterOptionsClick}
                            />
                        </td>);
                }
                else {
                    if (this.props.options.showAltShiftIndicator && minx + x == 3 && miny + y == 2) {
                        cols.push(<td key={x + ' ' + y}>
                            <div className="altShiftStateDiv">
                                <MiniButton borderless={!this.props.altShiftState.shiftDown} onClick={() => this.onShiftStateClick()}>Shift</MiniButton>
                            </div>
                            <div className="altShiftStateDiv">
                                <MiniButton borderless={!this.props.altShiftState.altDown} onClick={() => this.onAltStateClick()}>Alt</MiniButton>
                            </div>
                        </td>);
                    }
                    else {
                    cols.push(<td key={x + ' ' + y}></td>);
                    }
                }
                if (x != colsCount - 1) {
                    let nxlInfo = lettersArr[miny + y][minx + x + 1];
                    if (lInfo && nxlInfo && nxlInfo.idx < lc && lInfo.idx < lc) {
                        if (lInfo.idx + 1 == nxlInfo.idx) {
                            cols.push(<td key={x + ' a ' + y} className="arrowTd">▶</td>);
                        }
                        else {
                            cols.push(<td key={x + ' a ' + y} className="arrowTd">◀</td>);
                        }
                    }
                    else {
                        cols.push(<td key={x + ' s ' + y}></td>);
                    }
                }
            }
            rows.push(<tr key={y}>{cols}</tr>);
            if (y != rowsCount - 1) {
                let cols = [];
                for (let x = 0; x < colsCount; ++x) {
                    let lInfo = lettersArr[miny + y][minx + x];
                    let nxlInfo = lettersArr[miny + y + 1][minx + x];
                    if (lInfo && nxlInfo && lInfo.idx < lc && nxlInfo.idx < lc) {
                        if (lInfo.idx + 1 == nxlInfo.idx) {
                            cols.push(<td key={x + ' b ' + y} className="arrowTd">▼</td>);
                        }
                        else {
                            cols.push(<td key={x + ' b ' + y} className="arrowTd">▲</td>);
                        }
                    }
                    else {
                        cols.push(<td key={x + ' t ' + y}></td>);
                    }
                    cols.push(<td key={x + ' r ' + y}></td>);
                }
                rows.push(<tr key={'t ' + y}>{cols}</tr>);
            }
        }
        return (
            <div>
                <table><tbody>{rows}</tbody></table>
            </div>
        );
    }
}