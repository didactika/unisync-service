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
}