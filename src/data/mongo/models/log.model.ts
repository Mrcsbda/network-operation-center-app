import mongoose from 'mongoose';
import { LogSeverityLevel } from '../../../domain/entities/log.entity';


const logSchema = new mongoose.Schema({
    message: { type: String, required: true },
    level: { type: String, enum: Object.values(LogSeverityLevel), default: LogSeverityLevel.LOW },
    origin: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const LogModel = mongoose.model('Log', logSchema);