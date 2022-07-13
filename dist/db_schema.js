"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scriptSchema = new mongoose_1.default.Schema({
    'id': { type: 'number', required: true },
    'name': { type: 'number', required: true },
    'script': { type: 'number', required: true },
    'username': { type: 'number', required: true },
    'date': { type: 'number', default: Date.now() },
});
module.exports = mongoose_1.default.model('Script', scriptSchema);
//# sourceMappingURL=db_schema.js.map