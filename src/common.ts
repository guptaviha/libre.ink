import { APP_TITLE } from "./constants";
import LZString from "lz-string";

export const setTitle = (postContent: string) => {
    const plainTextFirstLine = postContent.split('\n')[0].replace(/[#*>.`]/g, '').substring(0, 150);
    const title = plainTextFirstLine.trim().length ? `${plainTextFirstLine} - ${APP_TITLE}` : APP_TITLE;
    document.title = title;
};

export function encode(str: string): string {
    return LZString.compressToEncodedURIComponent(str);
}

export function decode(str: string): string {
    return LZString.decompressFromEncodedURIComponent(str);
}

export type PostObject = {
    postContent: string;
    fontSize: string;
};

export function createPostObject(postContent: string, fontSize: string): PostObject {
    return {
        postContent,
        fontSize,
    };
}
