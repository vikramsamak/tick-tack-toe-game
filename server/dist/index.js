"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = process.env.PORT || 4000;
(0, server_1.startServer)(Number(PORT));
