import { List, concat, } from './list';
import { explode } from './char_list';
import { prefix, suffix } from './list_ops'
/** Determines whether the given character is a vowel. */
const is_latin_vowel = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "aeiouy".indexOf(ch) >= 0;
};

/** Determines whether the given character is a Latin consonant. */
const is_latin_consonant = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "bcdfghjklmnpqrstvwxz".indexOf(ch) >= 0;
};

/** Changes most Latin alphabetic characters to different ones. */
export const next_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "i".charCodeAt(0);
        case "e": return "y".charCodeAt(0);
        case "i": return "u".charCodeAt(0);
        case "o": return "a".charCodeAt(0);
        case "u": return "o".charCodeAt(0);
        case "y": return "e".charCodeAt(0);

        case "b": return "t".charCodeAt(0);
        case "p": return "g".charCodeAt(0); 
        case "j": return "d".charCodeAt(0); 
        case "g": return "j".charCodeAt(0); 
        case "d": return "b".charCodeAt(0); 
        case "t": return "p".charCodeAt(0); 

        case "c": return "z".charCodeAt(0);
        case "k": return "c".charCodeAt(0);
        case "s": return "k".charCodeAt(0);
        case "z": return "s".charCodeAt(0);

        case "f": return "w".charCodeAt(0);
        case "v": return "f".charCodeAt(0);
        case "w": return "v".charCodeAt(0);

        case "h": return "r".charCodeAt(0);
        case "l": return "h".charCodeAt(0);
        case "r": return "l".charCodeAt(0);

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};

/** Inverse of next_char. */
export const prev_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "o".charCodeAt(0); 
        case "e": return "y".charCodeAt(0); 
        case "i": return "a".charCodeAt(0); 
        case "o": return "u".charCodeAt(0); 
        case "u": return "i".charCodeAt(0); 
        case "y": return "e".charCodeAt(0);

        case "b": return "d".charCodeAt(0);
        case "p": return "t".charCodeAt(0);
        case "j": return "g".charCodeAt(0);
        case "g": return "p".charCodeAt(0);
        case "d": return "j".charCodeAt(0);
        case "t": return "b".charCodeAt(0);

        case "c": return "k".charCodeAt(0);
        case "k": return "s".charCodeAt(0);
        case "s": return "z".charCodeAt(0);
        case "z": return "c".charCodeAt(0);

        case "f": return "v".charCodeAt(0);
        case "v": return "w".charCodeAt(0);
        case "w": return "f".charCodeAt(0); 

        case "h": return "l".charCodeAt(0);
        case "l": return "r".charCodeAt(0); 
        case "r": return "h".charCodeAt(0); 

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};


/** x
 * Returns the number of consonants at the start of the given string
 * before the first vowel, or -1 if there are no vowels
 */
export const count_consonants = (L: List<number>): bigint => {
    if (L.kind === "nil") {
        return -1n;
    } else if (is_latin_vowel(L.hd)) {
        return 0n;
    } else if (is_latin_consonant(L.hd)) {
        const n = count_consonants(L.tl);
        if (n === -1n) {
            return -1n;
        } else {
            return n + 1n;
        }
    } else {
        // not a vowel or a consonant
        return -1n;
    }
};


// TODO: add your function declarations in this file for: 
// cipher_encode, cipher_decode crazy_caps_encode, crazy_caps_decode,
// pig_latin_encode, pig_latin_decode

// * Remember to add /** jsdoc */ comments above each function! The contents
//   won't be graded, but a brief description is appropriate (see the above
//   functions for an example)

/**
 * encodes a list of chars using a chiper where each char is replaced by the next latin char.
 * @param L the list of char codes to be encoded
 * @returns the cncoded list of char codes.
 */
export const cipher_encode = (L: List<number>): List<number> => {
    if (L.kind === "nil"){
        return {kind: "nil"};
    }else{
        const encodedHead = next_latin_char(L.hd);
        const encodedTail = cipher_encode(L.tl)
        return {kind: "cons", hd: encodedHead, tl: encodedTail}
    }
};


/**
 * Decods a list of char codes using a cipher where each car is replaced by the previous latin char
 * @param L this is the list of char codes that are to be decoded
 * @returns a decoded list of the char codes.
 */

export const cipher_decode = (L: List<number>): List<number> => {
    if (L.kind === "nil"){
        return {kind: "nil"};
    }else{
        const decodedHead = prev_latin_char(L.hd);
        const decodedTail = cipher_decode(L.tl)
        return {kind: "cons", hd: decodedHead, tl: decodedTail}
    }
}


/**
 * encode a list of chars with every other char starting with the secodn being upper case
 * @param L the list of chars to be encoded
 * @returs the encoded list of char codes
 */
export const crazy_caps_encode = (L: List<number>): List<number> => {
    if (L.kind === "nil") {
        return { kind: "nil" };
    } else {
        const encodedHead = L.hd;
        const encodedTail = crazy_caps_encode_helper(L.tl, 1n);
        return { kind: "cons", hd: encodedHead, tl: encodedTail };
    }
}
const crazy_caps_encode_helper = (L: List<number>, index: bigint): List<number> => {
    if (L.kind === "nil") {
        return { kind: "nil" };
    } else {
        const encodedHead = (index % 2n === 0n) ? L.hd : String.fromCharCode(L.hd).toUpperCase().charCodeAt(0);
        const encodedTail = crazy_caps_encode_helper(L.tl, index + 1n);
        return { kind: "cons", hd: encodedHead, tl: encodedTail };
    }
}

/**
 * decode a list of characters from crazy_caps_encode
 *@param L the list of chars to be decoded
 *@returs the decoded list of chars
 * 
 */
export const crazy_caps_decode = (L: List<number>): List<number> => {
    if (L.kind === "nil") {
        return { kind: "nil" };
    } else {
        const decodedHead = L.hd;
        const decodedTail = crazy_caps_decode_helper(L.tl, 1n);
        return { kind: "cons", hd: decodedHead, tl: decodedTail };
    }
};

const crazy_caps_decode_helper = (L: List<number>, index: bigint): List<number> => {
    if (L.kind === "nil") {
        return { kind: "nil" };
    } else {
        const decodedHead = (index % 2n === 0n) ? L.hd : String.fromCharCode(L.hd).toLowerCase().charCodeAt(0);
        const decodedTail = crazy_caps_decode_helper(L.tl, index + 1n);
        return { kind: "cons", hd: decodedHead, tl: decodedTail };
    }
};





/**
 * translate a list of chars into frog latin
 * @param L this list of chars that need to be encoded
 * @returns the encoded list of chars
 */
export const frog_latin_encode = (L: List<number>): List<number> => {
    const cc = count_consonants(L);
    if (cc === -1n) {
        return L; 
    } else if (cc === 0n) {
        // Begins with a vowel
        const suffix = concat({ kind: "cons", hd: "f".charCodeAt(0), tl: { kind: "nil" } }, L);
        return concat(suffix, explode("rog"));
    } else {
     
        const suffixList = suffix(cc, L);
        const prefixList = prefix(cc, L);
        const encodedSuffix = frog_latin_encode(suffixList);
        return concat(encodedSuffix, concat(prefixList, explode("rog")));
    }
};

/**
 * decode alist of char from frog latin 
 * @parm L the list of chars that need to be decoded
 * @returns the decoded list of chars
 */

export const frog_latin_decode = (L: List<number>): List<number> => {
    const cc = count_consonants(L)
    if (cc === -1n){
        return L
    }else if(cc === 0n){
        const suffix = concat({ kind: "cons", hd: "f".charCodeAt(0), tl: { kind: "nil" } }, L);
        return concat(suffix, explode("rog"));
    }else{
        const suffixList = suffix(cc,L)
        const prefixList = prefix(cc,L)
        const encodedSuffix = frog_latin_encode(suffixList)
        return concat(encodedSuffix, concat(prefixList, explode("rog")))
    }


}