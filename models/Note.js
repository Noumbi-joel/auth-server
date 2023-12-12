const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ticket: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.pre("save", async function (next) {
  if (!this.ticket) {
    // Manually increment the 'ticket' field before saving
    const lastNote = await this.constructor.findOne({}, {}, { sort: { ticket: -1 } });
    this.ticket = lastNote ? lastNote.ticket + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Note", noteSchema);
