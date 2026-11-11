import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const User =
  mongoose.models.users || mongoose.model('users', UserSchema);

const blacklistSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);
blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Blacklist =
  mongoose.models.blacklistTokens ||
  mongoose.model('blacklistTokens', blacklistSchema);

const questionSchema = new mongoose.Schema(
  { question: String, intention: String, answer: String },
  { _id: false }
);
const reportSchema = new mongoose.Schema(
  {
    jobDescription: { type: String, required: true },
    resume: String,
    selfDescription: String,
    matchScore: Number,
    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillGaps: [
      {
        skill: String,
        severity: { type: String, enum: ['low', 'medium', 'high'] },
      },
    ],
    preparationPlan: [{ day: Number, focus: String, tasks: [String] }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true },
  },
  { timestamps: true }
);
export const InterviewReport =
  mongoose.models.InterviewReport ||
  mongoose.model('InterviewReport', reportSchema);

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true }
);
feedbackSchema.index({ updatedAt: -1 });
export const Feedback =
  mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
