//@ts-check

import { truncateString } from "@buildtheearth/bot-utils";

export default function diffParser(text) {
    return truncateString(text, 2048);
}