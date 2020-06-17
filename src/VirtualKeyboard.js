import React from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
    Typography
} from "@material-ui/core";


const useStyles = makeStyles(() =>
    createStyles({
        keyRect: {
            fill: "none",
            stroke: "black",
            strokeWidth: 2
        },
        hintKeyRect: {
            fill: "rgb(63, 81, 181)"
        },
        keyText: {
            fontSize: "20px",
            fontFamily: "Roboto, sans-serif"
        }
    }),
);

function buildTranslateString(x, y) {
    return `translate(${x},${y})`;
}

function SquareKeyRect(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <rect
                x="3" y="3" rx="6" ry="6"
                width="56" height="56"
                className={[
                    classes.keyRect,
                    props.isHinted ? classes.hintKeyRect : ""
                ].join(" ")}
            />
            {
                props.additionalChar ?
                    <React.Fragment>
                        <text x="15" y="24" className={classes.keyText}>{props.additionalChar}</text>
                        <text x="15" y="50" className={classes.keyText}>{props.mainChar}</text>
                    </React.Fragment> :
                    <text x="15" y="26" className={classes.keyText}>{props.mainChar}</text>
            }
        </React.Fragment>
    );
}

function createSquareKeyRects(rowSquareChars, x, y, nextChar) {
    return (
        <React.Fragment>{
            rowSquareChars.map(
                (value, index) => <g
                    key={value}
                    transform={buildTranslateString(x + index * 62, y)}
                >
                    <SquareKeyRect
                        isHinted={value.includes(nextChar && nextChar.toUpperCase())}
                        mainChar={value[0]}
                        additionalChar={value[1]}
                    />
                </g>
            )
        }</React.Fragment>
    );
}

export default function VirtualKeyboard(props) {
    const classes = useStyles();

    const nextChar = props.nextChar; // Either a character or `undefined`.
    const layout = props.layout;

    if (['enUSAQ', 'ukUAAЙ', 'ruRUAЙ'].indexOf(layout) === -1) {
        return <Typography>Unrecognised layout.</Typography>;
    }

    const firstRowSquareChars = new Map([
        ["enUSAQ", [
            "`~", "1!", "2@", "3#", "4$", "5%", "6^",
            "7&", "8*", "9(", "0)", "-_", "+="
        ]],
        ["ukUAAЙ", [
            "'ʼ", "1!", "2\"", "3№", "4;", "5%", "6:",
            "7?", "8*", "9(", "0)", "-_", "=+"
        ]],
        ["ruRUAЙ", [
            "ёЁ", "1!", "2\"", "3№", "4;", "5%", "6:",
            "7?", "8*", "9(", "0)", "-_", "=+"
        ]]
    ]).get(layout);

    const secondRowSquareChars = new Map([
        ["enUSAQ", [
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[{", "]}"
        ]],
        ["ukUAAЙ", [
            "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ї"
        ]],
        ["ruRUAЙ", [
            "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"
        ]]
    ]).get(layout);

    const thirdRowSquareChars = new Map([
        ["enUSAQ", [
            "A", "S", "D", "F", "G", "H", "J", "K", "L", ";:", "'\""
        ]],
        ["ukUAAЙ", [
            "Ф", "І", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Є"
        ]],
        ["ruRUAЙ", [
            "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"
        ]]
    ]).get(layout);

    const fourthRowSquareChars = new Map([
        ["enUSAQ", [
            "Z", "X", "C", "V", "B", "N", "M", ",<", ".>", "/?"
        ]],
        ["ukUAAЙ", [
            "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".,"
        ]],
        ["ruRUAЙ", [
            "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".,"
        ]]
    ]).get(layout);

    const backslashKeyChars = new Map([
        ["enUSAQ", "\\|"],
        ["ukUAAЙ", "ґҐ"],
        ["ruRUAЙ", "\\/"],
    ]).get(layout);

    const leftShiftChars = new Map([
        ["enUSAQ", "^&*()_+|YUIOP{}HJKL:\"NM<>?"],
        ["ukUAAЙ", ":?*()_+ҐНГШЩЗХЇРОЛДЖЄТЬБЮ,"],
        ["ruRUAЙ", ":?*()_+/НГШЩЗХЪРОЛДЖЭТЬБЮ,"],
    ]).get(layout);

    const rightShiftChars = new Map([
        ["enUSAQ", "~!@#$%QWERTASDFGZXCVB"],
        ["ukUAAЙ", "ʼ!\"№;%ЙЦУКЕФІВАПЯЧСМИ"],
        ["ruRUAЙ", "Ё!\"№;%ЙЦУКЕФЫВАПЯЧСМИ"],
    ]).get(layout);

    return (
    <React.Fragment>
        <svg
            width="100%"
            viewBox="0 0 912 310"
        >
            {
                createSquareKeyRects(firstRowSquareChars, 0, 0, nextChar)
            }
            <g transform={buildTranslateString(13 * 62, 0)}>
                <rect x="3" y="3" rx="6" ry="6" width="102" height="56" className={classes.keyRect} />
                <text x="46" y="40" className={classes.keyText}>←</text>
            </g>

            <g transform={buildTranslateString(0, 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="88" height="56" className={classes.keyRect} />
                <text x="15" y="40" className={classes.keyText}>Tab</text>
            </g>
            {
                createSquareKeyRects(secondRowSquareChars, 94, 62, nextChar)
            }
            <g transform={buildTranslateString(94 + 12 * 62, 62)}>
                <rect
                    x="3" y="3" rx="6" ry="6" width="68" height="56"
                    className={[
                        classes.keyRect,
                        backslashKeyChars.includes(nextChar) ? classes.hintKeyRect : ""
                    ].join(" ")}
                />
                <text x="15" y="24" className={classes.keyText}>{backslashKeyChars[1]}</text>
                <text x="15" y="50" className={classes.keyText}>{backslashKeyChars[0]}</text>
            </g>

            <g transform={buildTranslateString(0, 2 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="109" height="56" className={classes.keyRect} />
                <text x="10" y="40" className={classes.keyText}>Caps Lock</text>
            </g>
            {
                createSquareKeyRects(thirdRowSquareChars, 115, 2 * 62, nextChar)
            }
            <g transform={buildTranslateString(115 + 11 * 62, 2 * 62)}>
                <rect
                    x="3" y="3" rx="6" ry="6" width="109" height="56"
                    className={[
                        classes.keyRect,
                        nextChar === "\n" ? classes.hintKeyRect : ""
                    ].join(" ")}
                />
                <text x="15" y="40" className={classes.keyText}>Enter</text>
            </g>

            <g transform={buildTranslateString(0, 3 * 62)}>
                <rect
                    x="3" y="3" rx="6" ry="6" width="140" height="56"
                    className={[
                        classes.keyRect,
                        leftShiftChars.includes(nextChar) ? classes.hintKeyRect : ""
                    ].join(" ")}
                />
                <text x="15" y="40" className={classes.keyText}>Shift</text>
            </g>
            {
                createSquareKeyRects(fourthRowSquareChars, 146, 3 * 62, nextChar)
            }
            <g transform={buildTranslateString(146 + 10 * 62, 3 * 62)}>
                <rect
                    x="3" y="3" rx="6" ry="6" width="140" height="56"
                    className={[
                        classes.keyRect,
                        rightShiftChars.includes(nextChar) ? classes.hintKeyRect : ""
                    ].join(" ")}
                />
                <text x="15" y="40" className={classes.keyText}>Shift</text>
            </g>

            <g transform={buildTranslateString(0, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="90" height="56" className={classes.keyRect} />
                <text x="15" y="40" className={classes.keyText}>Ctrl</text>
            </g>
            <g transform={buildTranslateString(96, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="72" height="56" className={classes.keyRect} />
            </g>
            <g transform={buildTranslateString(96 + 78, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="90" height="56" className={classes.keyRect} />
            </g>
            <g transform={buildTranslateString(96 + 78 + 96, 4 * 62)}>
                <rect
                    x="3" y="3" rx="6" ry="6" width="366" height="56"
                    className={[
                        classes.keyRect,
                        nextChar === " " ? classes.hintKeyRect : ""
                    ].join(" ")}
                />
            </g>
            <g transform={buildTranslateString(96 + 78 + 96 + 372, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="90" height="56" className={classes.keyRect} />
            </g>
            <g transform={buildTranslateString(96 + 78 + 96 + 372 + 96, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="72" height="56" className={classes.keyRect} />
            </g>
            <g transform={buildTranslateString(96 + 78 + 96 + 372 + 96 + 78, 4 * 62)}>
                <rect x="3" y="3" rx="6" ry="6" width="90" height="56" className={classes.keyRect} />
                <text x="15" y="40" className={classes.keyText}>Ctrl</text>
            </g>
        </svg>
    </React.Fragment>
);
}