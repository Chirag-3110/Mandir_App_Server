import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
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
})

const eventModal = mongoose.model('events', EventSchema)

export default eventModal