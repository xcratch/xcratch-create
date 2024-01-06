import { describe, it } from "mocha";
import { expect } from "chai";
import { blockClass } from "../../src/vm/extensions/block/index.js";

describe("blockClass", () => {
    const runtime = {
        formatMessage: function (msg) {
            return msg.default;
        }
    };
    it("should create an instance of blockClass", () => {
        const block = new blockClass(runtime);
        expect(block).to.be.an.instanceOf(blockClass);
    });

    it("doIt('3 + 4') should return 7", () => {
        const block = new blockClass(runtime);
        const result = block.doIt({SCRIPT: "3 + 4"});
        expect(result).to.equal(7);
    });
});
