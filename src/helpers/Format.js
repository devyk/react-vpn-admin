export default class Format
{
    /**
     * Returns TB represendation for bytes
     * @param value
     * @returns {string}
     */
    static bytes(value) {
        if (value < 500000000000) {
            return value + ' bytes'
        }
        return (value/1000000000000).toPrecision(2) + ' TB'
    }
}