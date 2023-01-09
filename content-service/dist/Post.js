"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let PostSchema = new mongoose_1.default.Schema({
    userName: String,
    title: String,
    description: String,
    ImageName: String,
    userId: String,
    fileType: String
}, {
    timestamps: true
});
PostSchema.plugin(mongoose_paginate_1.default);
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
