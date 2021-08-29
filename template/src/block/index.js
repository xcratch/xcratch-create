const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const cast = require('../../util/cast');
// const log = require('../../util/log');

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {*} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const EXTENSION_ID = '<<extensionID>>';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://<<account>>.github.io/<<repo>>/dist/<<extensionID>>.mjs';

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUh7+0MHpgUESLFhLWSsMKpDZBRlggEWbQa6PXV6B2ufdGRNugrVAQtem1qL+gtkHrICiKINoFrYvalNzOVUGJPMOZ881v5hxmzoAtklGyer0PsjlDCwcDrvmFRZfjFTsObHTiiSq6OjYzE6KmfT1QZ8U7r1Wr9rl/rTme0BWoaxQeVVTNEJ4UDq0bqsW7wh1KOhoXPhf2aHJB4XtLj5X4zeJUiX8s1iLhcbC1CbtSVRyrYiWtZYXl5bizmTWlfB/rJS2J3NysxB7xbnTCBAngYooJxvEzwIjMfrwM0i8rauT7ivnTrEquIrPKBhorpEhj4BF1TaonJCZFT8jIsGH1/29f9eTQYKl6SwAaXkzzoxccO1DIm+b3sWkWTsD+DFe5Sv7qEQx/ip6vaO5DcG7BxXVFi+3B5TZ0PalRLVqU7OK2ZBLez6B1AdpvoWmp1LPyPqePENmUr7qB/QPok/PO5V8gz2fGkateTgAAAAlwSFlzAAALEwAACxMBAJqcGAAACQxJREFUWIXtmGt0VdURx39zzrkX8oLwSIhY3iAokYURsBBsQCO2aitraavL1mWF2pZVUFFpfdtWHtaqYMUlaGm11epCq/XRWqmIAUHDS40QgzwUECQYSCCQ1z3nTD/sc869NwkBvrD6obPW+bBnz+z579lnZs9s+B8nOdUGVfV04GLgwoB1APgAeFFEEqcaTyowR1XvVVVX26fdqnpta72T8qCq5gNXAP0AF9gHLBWR/cfRiwNvAhdEvMYD4DUh8RyId0kVv0lE/nAyuFDVXFV9UVW9dnaeUNXnVTX3GLqWqj4QCvs1mzWxYoY2vzDOfEtLNLF2rvoNX6eu+d1Q/7geVNUzgDeAIRHTbQSxwO6UKloJXCIiO1N0beAR4BeArXXbSLx9A3gtbexI7mBiFy4CJwNgPTBGRLRDgKrqAOuAkQD+npV4lc+gtZ8BguQOxi78CVbvcaHKF8AoETmgqt2B54FJAHpoB+67N6FNBw2gnD5ITl/8mk3QcggAe+hV2CNvDNcqFpE1VkcAgZ+H4Lyq53DfuwM9WAXqg3po7RbcVbPwPv1rKN8fWKqqhUB5BK5uG+7KWyNwVsFoYhctwTn/QWITH41Owv+qPNX2EIDjAZwKoA3VeBWLI6ZkFSA5faKxV7EIf+eycHgBsBEYDODvfofE2z9DG0wcSe5gnOJ5EMsKxkOQWDYAeuRLs3lDvQGcYyFT1U5AIYC//TVQz+x+0GScUbNAfbzKp/E2LQHAXTePWE5fpPswgBjq4236I17lM8mN5Q7BOf/B8D8zdup3oy2HzXzXQebfNlQNHXuwT7SBRH3EtAdcElizsIdPwer/bTP2WkiU3YIe2g5uI+7qu9LAWX1LiZUuRjLzkxZa6nFXzQLf5GfrtLGp9ldABx4EdgM+YKXu2K9ej91jeDR2Rt9Oon4XeqASWg6ReGc60ikXrd+V3MjZP8U+s1UOVh93zV1o/W4j1qUf9pk/Cmc/FJHPoQMPikgzsB3AGnBZ5HoTxVuSglaMWMl8pNvQwCuHk+CcTJzieW3BtRzGLZuJX73BjONdUo9eMcFJhwADWgwmJVgDLjMcrxn3vTuguS4pFcsmNmEBkjs4ucGs04iVLsI6fXzaglq3jcSyKfjV66MNOsVzkexvhCL3iMjaaJ2O0AWBUgX0x2smsXxa5D3pcRaxCY+Ck5lUaD5EYsV0iOcQK54Hnbqmred/+S5u+f3gNhlGvCtO8Rys/HNCkeeAa0VETwhgALIEWA7Y2rAf9z9T0KZao9xzBLGSR9KiErfB5DWx09bxNv8Zb/OfojQiuUNwxs9Dsk4LRZYBl4tIU6reCRULqjodeAxAa7eQWHEjJI6YBfJGEit5GOzO7St7LbhrZ+PvWh6xrD4X4Jx3V6rOs8ANrcGdDEDBeHEigNZUkFgxA3zXGOxVhFOyoI3XtLnO3CAHqyKePXwKduGU0LQCvwQeTj3WVDpekIQ0LQSH12TyWwAOywmi3G6jJLHsZHQH5Fevj668AOU1wMBjGT6Rf/AmYAEAiSMkVs5CayrMpB3HGXt/m0htTf72V3E3zo8SsmT0xBl3P9JzRChyGLheRF4+KYCqeiXwIoA21eKWzUTrtppJJxNn/ANYvc5NB7N/I5LTH8nonr7WgU24q+80hSqYBD5iGvbQq1OvtwXAr0QkqseOCVBVv4m5bjqTOGJSzKEdZjLehVjJw0j3s9LBff4G7rrfIZ274xTPQXoUpq/ZeAB3zd3JEwCs3sU4592dWlWXA5eJSM0xAarqQEwjk4efwF15a5T1JaMHTskCpGv6b+NteQHvo4WY/x6TgItmYg26vNXiPl7FE3hVz0eyktkLZ9xspEe04feAUhFpbgNQVbsBa4BhoLhrH8D//I2k50oXIzl908F98lRQGLQNRGvQZJyimWClX/v+3tW45bMhqGSwHJzRt2P1/04o8riITE8DGDQ3bwETALzKv+B9sjjySGzCAiRvZDq4jfPxtr4Uje1hP0QTR/G3/yPiSc+zTVBk5KU74+g+3DX3oAcrkzYufALpfiZAA1AQ5YYg1y0BJgP4u97G2/BQaAJnzJ2tolVxy+fg73gtCW7ENOzCqVi9i5HMPPx95ebmaNiP/8W/TXGafXoSeDwbe8AlaFONaSPUR+t3Yg+4FCAGbEnNg3cD14FJxG757KTh4dcn677Qcx89hv/Fm8kNjJqVWi5hDfwesYkLkYyehhEkbe+Tp1KrZnO0594Wede0FF44O9AKvHcR8FswZXdi1e3JIrLfxdiFU9PA+dtextuyNMBm4Yy9D2vQ5HB6B7ABgqOd9DRWwejA6aYKd8tuTk3WYMXAjgeLJ8BrjpxsB63hS0ABLfW4K2ZAY9A/5I0kVjw3NU/hf/V+4F3jBbvoZuyBURtbgfl/Hwd6AqPFycDqNwnERvd/aHAe/QrduQzpnAvxrvifLcX/sszY7HYG9pArw/VeEVWdDLwCpvkJOzTJ6Uus9EmI50TgtG4bieXTTMUC2Gd8H/ucm8Ppj4GJIlIbyateAzwJZIG55rwPfh1VQ+2RM+aOsPZUoI8FFAHgNuJt/buRsjvhfOuhdHCNNaZ/CMBZvYtTe9g9wKWp4ABE5G/AKGAzgNVrFM6kZ7AKxrQLzh56dbIwhrdEZI8DDANMZxUazz8nLdpwG3FXzUq2jt2G4oz9TXj0RwJwe9ozKiJVqjoGc+w/Nol+Pv7+jfg7XjfFazwbe/AVYUcYbngqmKYpaNmSKVGP7DGRJLZpbt6/L3hNAMnMT+0ffOAqEfm4XZckQTYA16tqGTAfyLXyi7Dyi9oT34spXPeCKbdMxGXmRXer1u/GLZuJ9+mzJN66Dn/vaqPqZOKc//tk6oAZIvKvjsC1Avo0pqFfCBxtNV0LzAGGisiGSCd4HKoEbH9fOe7K29LzVEh23FQvBeeFnPkicsuJgmtNqmphnvH6A1uBPe0VrRIIPwLMBPCr1+GuuTd5RxJc5uPnpRafrwJXiIjHqSBVzVHVj6PXOa9F/a8r1Nv+uvoHq1S9ROrb3T9VNeuUAGsFMktVXzjG82xIi4MnuVNGrasZAcYCPwBKA3YLpmFaIiJV/J/S6b82VDQYGIn3DAAAAABJRU5ErkJggg==';

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class <<extensionClass>> {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return '<<extensionName>>';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * Construct a set of blocks for <<extensionName>>.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        this.setupTranslations();
        return {
            id: <<extensionClass>>.EXTENSION_ID,
            name: <<extensionClass>>.EXTENSION_NAME,
            extensionURL: <<extensionClass>>.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'do-it',
                    blockType: BlockType.REPORTER,
                    blockAllThreads: false,
                    text: formatMessage({
                        id: '<<extensionID>>.doIt',
                        default: 'do it [SCRIPT]',
                        description: 'execute javascript for example'
                    }),
                    func: 'doIt',
                    arguments: {
                        SCRIPT: {
                            type: ArgumentType.STRING,
                            defaultValue: '3 + 4'
                        }
                    }
                }
            ],
            menus: {
            },
            // eslint-disable-next-line no-use-before-define
            translationMap: extensionTranslations
        };
    }

    doIt (args) {
        const func = new Function(`return (${args.SCRIPT})`);
        return func.call(this);
    }


    /**
     * Setup format-message for this extension.
     */
    setupTranslations () {
        const localeSetup = formatMessage.setup();
        if (localeSetup && localeSetup.translations[localeSetup.locale]) {
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                // eslint-disable-next-line no-use-before-define
                extensionTranslations[localeSetup.locale]
            );
        }
    }
}

const extensionTranslations = {
    'ja': {
        '<<extensionID>>.doIt': '[SCRIPT] を実行する'
    },
    'ja-Hira': {
        '<<extensionID>>.doIt': '[SCRIPT] をじっこうする'
    }
};

module.exports = <<extensionClass>>;
