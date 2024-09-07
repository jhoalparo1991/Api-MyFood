import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      length: 50,
    },
    type_doc: {
      type: String,
      require: true,
      enum: {
        values: ["CC", "TI", "CE", "DNI", "PASAPORTE", "NIT"],
        message: "{VALUE} is not a valid type of document",
      },
    },
    document: {
      type: String,
      required: true,
      length: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      require: true,
      enum: {
        values: [
          "SUPER_ADMIN",
          "ADMIN",
          "COORDINADOR",
          "SUPERVISOR",
          "CAJERO",
          "MESERO",
          "INVITADO",
        ],
        message: "{VALUE} is not a valid rol",
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON : ({virtuals:false})
  }
);



export const userModel = mongoose.model('user',UserSchema);

// module.exports = userModel;