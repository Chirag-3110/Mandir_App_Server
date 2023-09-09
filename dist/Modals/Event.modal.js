"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    eventName: {
        type: String,
        default: null,
    },
    eventImage: {
        type: String,
        default: null,
    },
    startDate: {
        type: Date,
        default: null,
    },
    endDate: {
        type: Date,
        default: null,
    },
    time: {
        type: Date,
        default: null,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});
const eventModal = mongoose_1.default.model('events', EventSchema);
exports.default = eventModal;
//# sourceMappingURL=Event.modal.js.map