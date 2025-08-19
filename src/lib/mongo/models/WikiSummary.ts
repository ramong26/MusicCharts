import { Schema, model, models } from 'mongoose';

const wikiSummarySchema = new Schema({
  title: { type: String, required: true },
  extract: { type: String, required: true },
  extract_ko: { type: String },
});

export const WikiSummary = models.WikiSummary || model('WikiSummary', wikiSummarySchema);
