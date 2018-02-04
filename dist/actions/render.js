"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
function cookEvalFunction(pAST, pOptions) {
    return `const lReplaceMe = document.getElementById('replaceme');
        lReplaceMe.setAttribute("data-language", "json");
        lReplaceMe.setAttribute("data-named-style", "${pOptions.namedStyle}");
        lReplaceMe.setAttribute("data-mirror-entities", ${pOptions.mirrorEntities});
        lReplaceMe.setAttribute(
            "data-regular-arc-text-vertical-alignment",
            "${pOptions.regularArcTextVerticalAlignment}"
        );
        lReplaceMe.innerHTML = \`${pAST.replace(/\\/g, "\\\\")}\``;
}
function renderTheShizzle(pAST, pOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        let browser = {};
        try {
            browser = yield puppeteer.launch({
                headless: true,
            });
            const page = yield browser.newPage();
            yield page.goto(`file:///${__dirname}/template.html`, {
                waitUntil: "networkidle2",
            });
            yield page.evaluate(cookEvalFunction(pAST, pOptions));
            yield page.addScriptTag({
                path: require.resolve("mscgenjs-inpage"),
            });
            yield page.waitFor("mscgen#replaceme[data-renderedby='mscgen_js']", { timeout: 10000 });
            if (pOptions.outputType === "svg") {
                return yield page.evaluate(() => {
                    const lSVGElement = document.getElementById("mscgenjsreplaceme");
                    if (lSVGElement) {
                        return Promise.resolve(lSVGElement.outerHTML);
                    }
                    return Promise.reject("Couldn't render the SVG.");
                });
            }
            else {
                yield page.setViewport({
                    deviceScaleFactor: 2,
                    height: 1,
                    isMobile: false,
                    width: 1,
                });
                return yield page.screenshot({
                    fullPage: true,
                    omitBackground: false,
                    type: pOptions.outputType,
                });
            }
        }
        catch (pError) {
            return pError;
        }
        finally {
            if (Boolean(browser) && typeof browser.close === "function") {
                browser.close();
            }
        }
    });
}
exports.renderTheShizzle = renderTheShizzle;
/*
    This file is part of mscgenjs-cli.
    mscgenjs-cli is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    mscgen_js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with mscgenjs-cli.  If not, see <http://www.gnu.org/licenses/>.
*/
