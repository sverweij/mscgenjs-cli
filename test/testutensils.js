"use strict";

const fs     = require('fs');
const chai   = require("chai");
const expect = chai.expect;

chai.use(require("chai-xml"));

module.exports = (
    () => ({
        assertequalFileJSON (pFoundFileName, pExpectedFileName){
            expect(
                JSON.parse(
                    fs.readFileSync(pFoundFileName, {"encoding":"utf8"})
                )
            ).to.deep.equal(
                JSON.parse(
                    fs.readFileSync(pExpectedFileName, {"encoding": "utf8"})
                )
            );
        },

        assertequalToFile (pExpectedFileName, pFoundFileName){
            expect(
                fs.readFileSync(pFoundFileName, {"encoding":"utf8"})
            ).to.equal(
                fs.readFileSync(pExpectedFileName, {"encoding":"utf8"})
            );
        }
    })
)();

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
