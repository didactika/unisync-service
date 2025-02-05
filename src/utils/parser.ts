/**
 * @class Parser
 */
export default class Parser {
    /**
     * @method ParseUnicodeCharacters
     * @description Parse unicode characters from text
     * @param {string} text text to parse
     * @memberof Parser
     */
    public static ParseUnicodeCharacters(text: string): string {
        return text.replace(/u00([a-f\d]{2})/gi, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
    }

    /**
     * @method ParseNumber
     * @description Parses a string into a number with validation options
     * @param {string} text The text to parse
     * @param {Object} options Parsing options
     * @param {boolean} options.allowFloats Whether floating point numbers are allowed (default: false)
     * @param {boolean} options.allowNegatives Whether negative numbers are allowed (default: false)
     * @returns {number | string} The parsed number or an empty string if invalid
     */
    public static ParseNumber(
        text: string,
        options: { allowFloats?: boolean ; allowNegatives?: boolean } = {allowFloats: true, allowNegatives: true}) {

        if (!text.trim()) return "";

        const number = Number(text);

        if (isNaN(number)) return "";
        if (!options.allowFloats && text.includes(".")) return "";
        if (!options.allowNegatives && number < 0) return "";
        if (!Number.isInteger(number) && !options.allowFloats) return "";

        return number;
    }

}