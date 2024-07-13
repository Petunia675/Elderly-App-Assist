"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
describe('Login Controller', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGO_URI);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany({});
    }));
    it('should log in a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash('password123', 10);
        yield User_1.default.create({ name: 'John Doe', email: 'john@example.com', password });
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/login')
            .send({ email: 'john@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    }));
    it('should return 400 for invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/login')
            .send({ email: 'john@example.com', password: 'wrongpassword' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid Credentials');
    }));
});
