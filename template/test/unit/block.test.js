import { blockClass } from "../../src/vm/extensions/block/index.js";

describe("blockClass", () => {
    const runtime = {
        formatMessage: function (msg) {
            return msg.default;
        }
    };

    test("should create an instance of blockClass", () => {
        const block = new blockClass(runtime);
        expect(block).toBeInstanceOf(blockClass);
    });

    test("doIt('3 + 4') should return 7", () => {
        const block = new blockClass(runtime);
        const result = block.doIt({SCRIPT: "3 + 4"});
        expect(result).toBe(7);
    });
});
